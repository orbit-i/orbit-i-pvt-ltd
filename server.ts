import express from 'express';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import {
  INITIAL_SETTINGS,
  INITIAL_SERVICES,
  INITIAL_PRODUCTS,
  INITIAL_BLOGS,
  INITIAL_CAREERS,
  INITIAL_GALLERY,
  INITIAL_CASE_STUDIES,
  INITIAL_CLIENT_PROJECTS,
  INITIAL_INVOICES,
  INITIAL_PERFORMANCE_METRICS,
  INITIAL_SUPPORT_TICKETS,
  INITIAL_AUDIT_LOGS,
} from './src/data/initialData.js';
import {
  isDbConfigured,
  initSchema,
  getContent,
  setContent,
  listRows,
  upsertRow,
  deleteRow,
  replaceAllRows,
} from './db.js';
import {
  signToken,
  requireAdmin,
  requireAuth,
  safeCompare,
  authLimiter,
  apiLimiter,
  writeLimiter,
} from './security.js';


// In-memory mirror of the MySQL-backed store. This is a read cache, not the
// source of truth — every mutation below writes through to MySQL first (or
// immediately after) so the data actually survives process restarts and
// serverless cold starts.
const db = {
  settings: { ...INITIAL_SETTINGS },
  services: [...INITIAL_SERVICES],
  products: [...INITIAL_PRODUCTS],
  blogs: [...INITIAL_BLOGS],
  careers: [...INITIAL_CAREERS],
  gallery: [...INITIAL_GALLERY],
  caseStudies: [...INITIAL_CASE_STUDIES],
  leads: [] as any[],
  applications: [] as any[],
  projects: [...INITIAL_CLIENT_PROJECTS],
  invoices: [...INITIAL_INVOICES],
  metrics: [...INITIAL_PERFORMANCE_METRICS],
  tickets: [...INITIAL_SUPPORT_TICKETS],
  auditLogs: [...INITIAL_AUDIT_LOGS],
};

let dbReady = false;

async function initDbAndLoad(): Promise<void> {
  if (!isDbConfigured()) {
    console.warn(
      '[db] DB_HOST/DB_USER/DB_NAME not set — running on in-memory seed data only. ' +
      'Nothing written will persist across restarts. Set the DB_* env vars to connect MySQL.'
    );
    return;
  }

  try {
    await initSchema();

    const contentDefaults: Record<string, any> = {
      settings: INITIAL_SETTINGS,
      services: INITIAL_SERVICES,
      products: INITIAL_PRODUCTS,
      blogs: INITIAL_BLOGS,
      careers: INITIAL_CAREERS,
      gallery: INITIAL_GALLERY,
      caseStudies: INITIAL_CASE_STUDIES,
    };
    for (const key of Object.keys(contentDefaults) as Array<keyof typeof contentDefaults>) {
      let value = await getContent(key as any);
      if (value === null) {
        value = contentDefaults[key];
        await setContent(key as any, value);
      }
      (db as any)[key] = value;
    }

    const rowDefaults: Record<string, any[]> = {
      leads: [],
      applications: [],
      projects: INITIAL_CLIENT_PROJECTS,
      invoices: INITIAL_INVOICES,
      tickets: INITIAL_SUPPORT_TICKETS,
      audit_logs: INITIAL_AUDIT_LOGS,
    };
    const rowKeyMap: Record<string, keyof typeof db> = {
      leads: 'leads',
      applications: 'applications',
      projects: 'projects',
      invoices: 'invoices',
      tickets: 'tickets',
      audit_logs: 'auditLogs',
    };
    for (const table of Object.keys(rowDefaults) as Array<keyof typeof rowDefaults>) {
      let rows = await listRows(table as any);
      if (rows.length === 0 && rowDefaults[table].length > 0) {
        for (const item of rowDefaults[table]) {
          await upsertRow(table as any, (item as any).id, item);
        }
        rows = rowDefaults[table];
      }
      (db as any)[rowKeyMap[table]] = rows;
    }

    dbReady = true;
    console.log('[db] Connected to MySQL — data will persist across restarts.');
  } catch (err) {
    console.error('[db] MySQL connection/init failed — falling back to in-memory seed data:', err);
  }
}

async function logAudit(entry: {
  actor: string;
  action: string;
  category: 'CMS' | 'CRM' | 'BILLING' | 'AUTH' | 'DATABASE' | 'SECURITY' | 'SYSTEM';
  status: 'SUCCESS' | 'WARNING' | 'ALERT';
  ipAddress?: string;
}): Promise<void> {
  const fullEntry = {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
    ipAddress: '127.0.0.1',
    ...entry,
  };
  db.auditLogs.unshift(fullEntry as any);
  if (dbReady) {
    try {
      await upsertRow('audit_logs', fullEntry.id, fullEntry);
    } catch (err) {
      console.error('[db] Failed to persist audit log:', err);
    }
  }
}

let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    try {
      genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn('Gemini client init warning:', err);
    }
  }
  return genAIClient;
}

export async function createApp() {
  const app = express();
  app.set('trust proxy', 1); // required behind Vercel's proxy for req.ip to be the real client IP

  // Security headers: mitigates XSS (via CSP), clickjacking (X-Frame-Options),
  // MIME-sniffing attacks (X-Content-Type-Options), and forces HTTPS on
  // supporting browsers (HSTS) — real defense against MITM downgrade attacks.
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"],
      },
    },
    crossOriginResourcePolicy: { policy: 'same-site' },
  }));

  // CORS: only allow the app's own origin to call the API with credentials.
  // Same-origin requests (the site calling its own API) work regardless.
  const allowedOrigin = process.env.APP_URL || true; // `true` = reflect request origin if APP_URL unset (dev convenience)
  app.use(cors({ origin: allowedOrigin, credentials: true }));

  app.use(express.json({ limit: '1mb' })); // caps request body size — mitigates payload-flood abuse

  // Rate limiting on every API route. Auth endpoints get a much stricter
  // limit below — this is the actual defense against brute-force and
  // dictionary-attack login attempts, and blunts basic scripted abuse /
  // application-layer DoS. Large-scale network DDoS is mitigated by
  // Vercel's edge network, not application code.
  app.use('/api/', apiLimiter);

  // Connect to MySQL and load persisted data into the in-memory mirror.
  await initDbAndLoad();

  // ==========================================
  // API ROUTES
  // ==========================================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      company: db.settings.companyName,
      timestamp: new Date().toISOString(),
      hosting: {
        mysql: dbReady ? 'Connected' : (isDbConfigured() ? 'Configured but unreachable — check DB_* env vars' : 'Not configured — set DB_HOST/DB_USER/DB_NAME'),
        vercelCloud: 'Ready',
      },
    });
  });

  // 1. Content & Settings Endpoint (Fetch all active site data)
  app.get('/api/content', (req, res) => {
    res.json({
      settings: db.settings,
      services: db.services,
      products: db.products,
      blogs: db.blogs,
      careers: db.careers,
      gallery: db.gallery,
      caseStudies: db.caseStudies,
    });
  });

  // SuperAdmin Update Content
  app.put('/api/content/:resource', requireAdmin, async (req, res) => {
    const { resource } = req.params;
    const body = req.body;
    const key = resource === 'case-studies' ? 'caseStudies' : resource;

    const validResources = ['settings', 'services', 'products', 'blogs', 'careers', 'gallery', 'caseStudies'];
    if (!validResources.includes(key)) {
      return res.status(400).json({ error: `Unknown resource: ${resource}` });
    }

    if (key === 'settings') {
      db.settings = { ...db.settings, ...body };
    } else {
      (db as any)[key] = body;
    }

    try {
      if (dbReady) {
        await setContent(key as any, (db as any)[key]);
      }
      res.json({ success: true, data: (db as any)[key] });
    } catch (err) {
      console.error(`[db] Failed to persist content/${key}:`, err);
      res.status(500).json({ error: 'Saved in memory but failed to persist to database.' });
    }
  });

  // Auth Endpoints

  app.post('/api/auth/login', authLimiter, async (req, res) => {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    // SuperAdmin authentication
    if (role === 'admin' || email === 'admin@orbit-i.com') {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        console.error('[security] ADMIN_PASSWORD is not set — SuperAdmin login is disabled until it is configured.');
        return res.status(503).json({ error: 'SuperAdmin login is not configured on this server.' });
      }
      if (safeCompare(password, adminPassword)) {
        await logAudit({
          actor: 'SuperAdmin',
          action: 'SuperAdmin successfully authenticated via portal credentials',
          category: 'AUTH',
          status: 'SUCCESS',
          ipAddress: req.ip,
        });
        const token = signToken({ role: 'superadmin', email: email || 'admin@orbit-i.com' });
        return res.json({
          success: true,
          token,
          user: {
            name: 'Abdul Samad Rind',
            email: email || 'admin@orbit-i.com',
            role: 'superadmin',
            title: 'Founder & CEO',
          },
        });
      }
      await logAudit({
        actor: email || 'unknown',
        action: 'Failed SuperAdmin login attempt (incorrect password)',
        category: 'SECURITY',
        status: 'ALERT',
        ipAddress: req.ip,
      });
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    // Client authentication — must match a real project's client email on file.
    // (No password on client accounts yet — see README-SECURITY.md for the
    // limitation this implies and how to close it.)
    const matchingProject = db.projects.find(
      (p) => p.clientEmail?.toLowerCase() === email?.toLowerCase()
    );
    if (matchingProject) {
      await logAudit({
        actor: email,
        action: 'Client successfully logged into client project portal',
        category: 'AUTH',
        status: 'SUCCESS',
        ipAddress: req.ip,
      });
      const token = signToken({ role: 'client', email, projectId: matchingProject.id });
      return res.json({
        success: true,
        token,
        user: {
          name: matchingProject.clientName || 'Client',
          email,
          role: 'client',
          organization: matchingProject.clientName || 'Client Organization',
          projectId: matchingProject.id,
        },
      });
    }

    await logAudit({
      actor: email || 'unknown',
      action: 'Failed client login attempt (email not on file)',
      category: 'SECURITY',
      status: 'WARNING',
      ipAddress: req.ip,
    });
    return res.status(401).json({ error: 'No project found for that email address.' });
  });

  // Self-service password reset is intentionally not implemented.
  // SuperAdmin credentials live in the ADMIN_PASSWORD environment variable —
  // change it directly in your hosting provider's dashboard. The previous
  // version of this endpoint had a hardcoded bypass code ('123456') that
  // worked for any account, and returned the real OTP in the API response.
  // Removing it entirely is the fix, not patching it.
  app.post('/api/auth/forgot-password', authLimiter, (req, res) => {
    res.status(501).json({
      error: 'Self-service password reset is not available. Contact your site administrator to reset credentials.',
    });
  });

  app.post('/api/auth/verify-code', authLimiter, (req, res) => {
    res.status(501).json({ error: 'Self-service password reset is not available. Contact your site administrator.' });
  });

  app.post('/api/auth/reset-password', authLimiter, (req, res) => {
    res.status(501).json({ error: 'Self-service password reset is not available. Contact your site administrator.' });
  });

  // Global Data Export / Import & Seed Restoration
  app.get('/api/data/export-all', requireAdmin, (req, res) => {
    res.json({
      version: '1.0.0',
      exportedAt: new Date().toISOString(),
      company: db.settings.legalEntity,
      data: {
        settings: db.settings,
        services: db.services,
        products: db.products,
        blogs: db.blogs,
        careers: db.careers,
        gallery: db.gallery,
        caseStudies: db.caseStudies,
        leads: db.leads,
        applications: db.applications,
        projects: db.projects,
        invoices: db.invoices,
        tickets: db.tickets,
        auditLogs: db.auditLogs,
      },
    });
  });

  app.post('/api/data/import-all', requireAdmin, async (req, res) => {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: 'Missing data payload' });

    try {
      const contentUpdates: Array<[string, any]> = [];
      if (data.settings) { db.settings = data.settings; contentUpdates.push(['settings', db.settings]); }
      if (data.services) { db.services = data.services; contentUpdates.push(['services', db.services]); }
      if (data.products) { db.products = data.products; contentUpdates.push(['products', db.products]); }
      if (data.blogs) { db.blogs = data.blogs; contentUpdates.push(['blogs', db.blogs]); }
      if (data.careers) { db.careers = data.careers; contentUpdates.push(['careers', db.careers]); }
      if (data.gallery) { db.gallery = data.gallery; contentUpdates.push(['gallery', db.gallery]); }
      if (data.caseStudies) { db.caseStudies = data.caseStudies; contentUpdates.push(['caseStudies', db.caseStudies]); }

      const rowUpdates: Array<[string, any[]]> = [];
      if (data.leads) { db.leads = data.leads; rowUpdates.push(['leads', db.leads]); }
      if (data.applications) { db.applications = data.applications; rowUpdates.push(['applications', db.applications]); }
      if (data.projects) { db.projects = data.projects; rowUpdates.push(['projects', db.projects]); }
      if (data.invoices) { db.invoices = data.invoices; rowUpdates.push(['invoices', db.invoices]); }
      if (data.tickets) { db.tickets = data.tickets; rowUpdates.push(['tickets', db.tickets]); }

      if (dbReady) {
        for (const [key, value] of contentUpdates) await setContent(key as any, value);
        for (const [table, items] of rowUpdates) await replaceAllRows(table as any, items);
      }

      await logAudit({
        actor: 'SuperAdmin',
        action: 'Full database state imported and applied from JSON backup',
        category: 'DATABASE',
        status: 'WARNING',
      });

      res.json({ success: true, message: 'Database state successfully restored from JSON backup.' });
    } catch (err) {
      console.error('[db] import-all failed:', err);
      res.status(500).json({ error: 'Import applied in memory but failed to persist to database.' });
    }
  });

  app.post('/api/data/reset-seeds', requireAdmin, async (req, res) => {
    db.settings = { ...INITIAL_SETTINGS };
    db.services = [...INITIAL_SERVICES];
    db.products = [...INITIAL_PRODUCTS];
    db.blogs = [...INITIAL_BLOGS];
    db.careers = [...INITIAL_CAREERS];
    db.gallery = [...INITIAL_GALLERY];
    db.caseStudies = [...INITIAL_CASE_STUDIES];
    db.projects = [...INITIAL_CLIENT_PROJECTS];
    db.invoices = [...INITIAL_INVOICES];
    db.tickets = [...INITIAL_SUPPORT_TICKETS];
    db.metrics = [...INITIAL_PERFORMANCE_METRICS];
    db.leads = [];
    db.applications = [];
    db.auditLogs = [...INITIAL_AUDIT_LOGS];

    try {
      if (dbReady) {
        await setContent('settings', db.settings);
        await setContent('services', db.services);
        await setContent('products', db.products);
        await setContent('blogs', db.blogs);
        await setContent('careers', db.careers);
        await setContent('gallery', db.gallery);
        await setContent('caseStudies', db.caseStudies);
        await replaceAllRows('projects', db.projects);
        await replaceAllRows('invoices', db.invoices);
        await replaceAllRows('tickets', db.tickets);
        await replaceAllRows('leads', db.leads);
        await replaceAllRows('applications', db.applications);
        await replaceAllRows('audit_logs', db.auditLogs);
      }
    } catch (err) {
      console.error('[db] reset-seeds failed to persist:', err);
    }

    await logAudit({
      actor: 'SuperAdmin',
      action: 'Database factory reset initiated — restored all initial seed data',
      category: 'DATABASE',
      status: 'ALERT',
    });

    res.json({
      success: true,
      message: 'All application tables have been reset to factory seed state.',
      data: {
        settings: db.settings,
        services: db.services,
        products: db.products,
        blogs: db.blogs,
        careers: db.careers,
        gallery: db.gallery,
        caseStudies: db.caseStudies,
        projects: db.projects,
        invoices: db.invoices,
        tickets: db.tickets,
      },
    });
  });

  // 2. Leads / Inquiries
  app.get('/api/leads', requireAdmin, (req, res) => {
    res.json(db.leads);
  });

  app.post('/api/leads', writeLimiter, async (req, res) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
      status: 'New' as const,
      ...req.body,
    };
    db.leads.unshift(newLead);
    try {
      if (dbReady) await upsertRow('leads', newLead.id, newLead);
      res.status(201).json({ success: true, lead: newLead });
    } catch (err) {
      console.error('[db] Failed to persist lead:', err);
      res.status(201).json({ success: true, lead: newLead, warning: 'Saved in memory but failed to persist to database.' });
    }
  });

  app.patch('/api/leads/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const idx = db.leads.findIndex((l) => l.id === id);
    if (idx >= 0) {
      db.leads[idx] = { ...db.leads[idx], ...req.body };
      if (dbReady) {
        try { await upsertRow('leads', id, db.leads[idx]); } catch (err) { console.error('[db] Failed to persist lead update:', err); }
      }
      return res.json({ success: true, lead: db.leads[idx] });
    }
    res.status(404).json({ error: 'Lead not found' });
  });

  // 3. Careers Applications
  app.get('/api/careers/applications', requireAdmin, (req, res) => {
    res.json(db.applications);
  });

  app.post('/api/careers/apply', writeLimiter, async (req, res) => {
    const newApp = {
      id: `app-${Date.now()}`,
      appliedAt: new Date().toLocaleString(),
      status: 'Pending' as const,
      ...req.body,
    };
    db.applications.unshift(newApp);
    try {
      if (dbReady) await upsertRow('applications', newApp.id, newApp);
      res.status(201).json({ success: true, application: newApp });
    } catch (err) {
      console.error('[db] Failed to persist application:', err);
      res.status(201).json({ success: true, application: newApp, warning: 'Saved in memory but failed to persist to database.' });
    }
  });

  app.patch('/api/careers/applications/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const idx = db.applications.findIndex((a) => a.id === id);
    if (idx >= 0) {
      db.applications[idx] = { ...db.applications[idx], ...req.body };
      if (dbReady) {
        try { await upsertRow('applications', id, db.applications[idx]); } catch (err) { console.error('[db] Failed to persist application update:', err); }
      }
      return res.json({ success: true, application: db.applications[idx] });
    }
    res.status(404).json({ error: 'Application not found' });
  });

  // 4. Client Projects & Milestones Operations
  app.get('/api/projects', requireAuth, (req, res) => {
    const auth = (req as any).auth;
    if (auth.role === 'client') {
      return res.json(db.projects.filter((p) => p.id === auth.projectId));
    }
    res.json(db.projects);
  });

  app.post('/api/projects', requireAdmin, async (req, res) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      currentPhase: 'Discovery',
      progressPercentage: 10,
      spentBudget: 0,
      healthStatus: 'Optimal',
      milestones: [
        { id: `m-${Date.now()}-1`, title: 'Architecture Scoping & Security Blueprints', status: 'In Progress', dueDate: 'In 2 Weeks' },
        { id: `m-${Date.now()}-2`, title: 'Interactive Prototypes & Frontend Shell', status: 'Upcoming', dueDate: 'In 4 Weeks' },
        { id: `m-${Date.now()}-3`, title: 'Core Production Engineering & API Integration', status: 'Upcoming', dueDate: 'In 7 Weeks' },
      ],
      deliverables: [],
      ...req.body,
    };
    db.projects.unshift(newProject);
    if (dbReady) {
      try { await upsertRow('projects', newProject.id, newProject); } catch (err) { console.error('[db] Failed to persist project:', err); }
    }
    await logAudit({
      actor: 'SuperAdmin',
      action: `Created new client project: "${newProject.projectName || newProject.title}"`,
      category: 'CRM',
      status: 'SUCCESS',
    });
    res.status(201).json({ success: true, project: newProject });
  });

  app.patch('/api/projects/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const idx = db.projects.findIndex((p) => p.id === id);
    if (idx >= 0) {
      db.projects[idx] = { ...db.projects[idx], ...req.body };
      if (dbReady) {
        try { await upsertRow('projects', id, db.projects[idx]); } catch (err) { console.error('[db] Failed to persist project update:', err); }
      }
      return res.json({ success: true, project: db.projects[idx] });
    }
    res.status(404).json({ error: 'Project not found' });
  });

  app.delete('/api/projects/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    db.projects = db.projects.filter((p) => p.id !== id);
    if (dbReady) {
      try { await deleteRow('projects', id); } catch (err) { console.error('[db] Failed to delete project:', err); }
    }
    res.json({ success: true });
  });

  // 5. Invoices & Billing Management
  app.get('/api/invoices', requireAuth, (req, res) => {
    const auth = (req as any).auth;
    if (auth.role === 'client') {
      return res.json(db.invoices.filter((i) => i.clientEmail?.toLowerCase() === auth.email?.toLowerCase()));
    }
    res.json(db.invoices);
  });

  app.post('/api/invoices', requireAdmin, async (req, res) => {
    const amount = Number(req.body.amount || 0);
    const tax = Number(req.body.tax || Math.round(amount * 0.05));
    const newInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: req.body.invoiceNumber || `INV-ORB-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`,
      status: 'Pending',
      issuedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      totalAmount: amount + tax,
      ...req.body,
      amount,
      tax,
    };
    db.invoices.unshift(newInvoice);
    if (dbReady) {
      try { await upsertRow('invoices', newInvoice.id, newInvoice); } catch (err) { console.error('[db] Failed to persist invoice:', err); }
    }
    await logAudit({
      actor: 'SuperAdmin',
      action: `Generated invoice #${newInvoice.invoiceNumber} for ${newInvoice.clientName} (${newInvoice.totalAmount})`,
      category: 'BILLING',
      status: 'SUCCESS',
    });
    res.status(201).json({ success: true, invoice: newInvoice });
  });

  app.patch('/api/invoices/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const idx = db.invoices.findIndex((i) => i.id === id);
    if (idx >= 0) {
      db.invoices[idx] = { ...db.invoices[idx], ...req.body };
      if (dbReady) {
        try { await upsertRow('invoices', id, db.invoices[idx]); } catch (err) { console.error('[db] Failed to persist invoice update:', err); }
      }
      return res.json({ success: true, invoice: db.invoices[idx] });
    }
    res.status(404).json({ error: 'Invoice not found' });
  });

  app.delete('/api/invoices/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    db.invoices = db.invoices.filter((i) => i.id !== id);
    if (dbReady) {
      try { await deleteRow('invoices', id); } catch (err) { console.error('[db] Failed to delete invoice:', err); }
    }
    res.json({ success: true });
  });

  // NOTE: no real payment gateway is wired in here — paymentToken is
  // accepted but never verified against Stripe/any processor. This marks
  // the invoice Paid on trust. Do not treat this as real payment processing
  // until a real gateway (Stripe, etc.) is integrated and verified server-side.
  app.post('/api/payments/settle', requireAuth, async (req, res) => {
    const auth = (req as any).auth;
    const { invoiceId, paymentMethod, paymentToken } = req.body;
    const inv = db.invoices.find((i) => i.id === invoiceId);
    if (!inv) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    if (auth.role === 'client' && inv.clientEmail?.toLowerCase() !== auth.email?.toLowerCase()) {
      return res.status(403).json({ error: 'You can only settle your own invoices.' });
    }
    {
      inv.status = 'Paid';
      inv.paidAt = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      if (dbReady) {
        try { await upsertRow('invoices', inv.id, inv); } catch (err) { console.error('[db] Failed to persist settled invoice:', err); }
      }
      await logAudit({
        actor: `Client (${inv.clientEmail})`,
        action: `Settled Invoice #${inv.invoiceNumber} (${inv.totalAmount}) via ${paymentMethod || 'Credit Card Gateway'}`,
        category: 'BILLING',
        status: 'SUCCESS',
      });
      return res.json({
        success: true,
        message: 'Payment processed successfully and invoice marked as Paid.',
        transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`,
        invoice: inv,
      });
    }
  });

  // 6. Support Tickets System
  app.get('/api/support/tickets', requireAuth, (req, res) => {
    const auth = (req as any).auth;
    if (auth.role === 'client') {
      return res.json(db.tickets.filter((t) => t.clientEmail?.toLowerCase() === auth.email?.toLowerCase()));
    }
    res.json(db.tickets);
  });

  app.post('/api/support/tickets', writeLimiter, async (req, res) => {
    const newTicket = {
      id: `tkt-${Date.now()}`,
      status: 'Open',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'client',
          senderName: req.body.clientName || 'Client Representative',
          text: req.body.initialMessage || req.body.subject,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
      ...req.body,
    };
    db.tickets.unshift(newTicket);
    if (dbReady) {
      try { await upsertRow('tickets', newTicket.id, newTicket); } catch (err) { console.error('[db] Failed to persist ticket:', err); }
    }
    res.status(201).json({ success: true, ticket: newTicket });
  });

  app.post('/api/support/tickets/:id/messages', requireAuth, async (req, res) => {
    const { id } = req.params;
    const { sender, senderName, text } = req.body;
    const ticket = db.tickets.find((t) => t.id === id);
    if (ticket) {
      const newMsg = {
        id: `msg-${Date.now()}`,
        sender: sender || 'support',
        senderName: senderName || 'Orbit-I Engineer',
        text: text || '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      ticket.messages.push(newMsg);
      if (sender === 'support' || sender === 'architect') {
        ticket.status = 'In Investigation';
      }
      if (dbReady) {
        try { await upsertRow('tickets', ticket.id, ticket); } catch (err) { console.error('[db] Failed to persist ticket message:', err); }
      }
      return res.json({ success: true, message: newMsg, ticket });
    }
    res.status(404).json({ error: 'Ticket not found' });
  });

  app.patch('/api/support/tickets/:id', requireAdmin, async (req, res) => {
    const { id } = req.params;
    const idx = db.tickets.findIndex((t) => t.id === id);
    if (idx >= 0) {
      db.tickets[idx] = { ...db.tickets[idx], ...req.body };
      if (dbReady) {
        try { await upsertRow('tickets', id, db.tickets[idx]); } catch (err) { console.error('[db] Failed to persist ticket update:', err); }
      }
      return res.json({ success: true, ticket: db.tickets[idx] });
    }
    res.status(404).json({ error: 'Ticket not found' });
  });

  // 7. System Audit Logs
  app.get('/api/audit-logs', requireAdmin, (req, res) => {
    res.json(db.auditLogs);
  });

  app.post('/api/audit-logs', requireAdmin, async (req, res) => {
    await logAudit({
      actor: req.body.actor || 'System',
      action: req.body.action || 'Unspecified action',
      category: req.body.category || 'SYSTEM',
      status: req.body.status || 'SUCCESS',
      ipAddress: req.body.ipAddress,
    });
    res.status(201).json(db.auditLogs[0]);
  });

  // 8. Database Health & Connection Tester
  app.post('/api/db/test-connection', requireAdmin, async (req, res) => {
    const started = Date.now();
    if (!isDbConfigured()) {
      return res.status(400).json({
        success: false,
        error: 'DB_HOST / DB_USER / DB_NAME are not set in environment variables.',
      });
    }
    try {
      await initSchema();
      const tableCounts = await Promise.all(
        (['leads', 'applications', 'projects', 'invoices', 'tickets', 'audit_logs'] as const).map((t) => listRows(t as any))
      );
      res.json({
        success: true,
        dialect: 'mysql',
        pingMs: Date.now() - started,
        connectedTables: 7 + tableCounts.length,
        status: 'CONNECTED_HEALTHY',
        timestamp: new Date().toISOString(),
      });
    } catch (err: any) {
      res.status(500).json({
        success: false,
        error: err?.message || 'MySQL connection failed.',
        pingMs: Date.now() - started,
      });
    }
  });

  // 9. Performance Metrics & Reporting Analytics
  app.get('/api/analytics', requireAdmin, (req, res) => {
    const latestMetrics = [...db.metrics];
    const paidInvoices = db.invoices.filter(i => i.status === 'Paid');
    const totalInvoicesSettled = paidInvoices.reduce((acc, curr) => acc + (curr.totalAmount || curr.amount || 0), 0);
    const uniqueClients = new Set(db.projects.map(p => p.clientEmail).filter(Boolean)).size;

    res.json({
      metrics: latestMetrics,
      summary: {
        // Uptime/response-time/request-volume are not tracked by this app
        // (no real monitoring is wired in) — omitted rather than faked.
        activeClients: uniqueClients,
        activeProjects: db.projects.length,
        totalInvoicesSettled: `$${totalInvoicesSettled.toLocaleString()}`,
        unpaidInvoicesSum: db.invoices.filter(i => i.status !== 'Paid').reduce((acc, curr) => acc + (curr.totalAmount || curr.amount || 0), 0),
      },
    });
  });

  // Helper to compile dynamic, authoritative grounding knowledge for Orbit-I
  function buildOrbitKnowledgeBase(): string {
    const servicesList = db.services.map(s => `- ${s.title} (${s.category}): ${s.shortDesc} [Starting from $${s.startingPrice}, Delivery: ${s.deliveryTime}]`).join('\n');
    const productsList = db.products.map(p => `- ${p.name} v${p.version} (${p.category}): ${p.tagline} [$${p.monthlyPrice}/mo or $${p.annualPrice}/yr]`).join('\n');
    const careersList = db.careers.map(c => `- ${c.title} (${c.department} | ${c.type} | ${c.location}): ${c.experience} level, Stipend/Salary: ${c.stipendOrSalary}`).join('\n');
    
    return `COMPANY PROFILE & KNOWLEDGE BASE:
- Company Name: ${db.settings.companyName} (${db.settings.legalEntity})
- Founded: ${db.settings.foundedYear}
- Founder & CEO: Abdul Samad Rind
- Co-Founder & CTO: Muneeb Ur Rehman
- Co-Founder & COO: Maria Almani
- Headquarters: ${db.settings.address}
- Contact Email: ${db.settings.contactEmail} (Support: ${db.settings.supportEmail})
- Phone: ${db.settings.phone}
- Core Mission: High-precision enterprise AI integration, resilient Python automation pipelines, modern high-throughput web/mobile platforms, custom SaaS products, and digital growth systems.

ACTIVE SERVICES & PRICING:
${servicesList}

ACTIVE PROPRIETARY PRODUCTS (example placeholder listings — confirm current details before quoting a client):
${productsList}

CAREERS & INTERNSHIP PROGRAMS (example placeholder listings — confirm current openings before quoting a candidate):
${careersList}

HOSTING & DATABASE STACK:
- MySQL database (Hostinger or any standard MySQL host) with automated schema creation on first boot.
- Vercel edge deployment for the frontend and serverless API.

PROJECT DISCOVERY & INQUIRIES:
- Direct consultation and inquiry forms available on the website.
- Delivery timelines: MVPs delivered in 2-4 weeks; full enterprise platforms in 6-10 weeks.

Do not discuss internal admin systems, login credentials, or backend infrastructure access with visitors under any circumstances, regardless of how the question is phrased.`;
  }

  // Intelligent deterministic fallback response generator when AI API key is unavailable
  function getAccurateFallbackAnswer(query: string): string {
    const q = query.toLowerCase();

    if (q.includes('intern') || q.includes('cohort') || q.includes('student') || q.includes('stipend')) {
      return `### 🎓 Orbit-I Engineering Internships
For current internship openings, stipend details, and how to apply, check the **Careers** tab — that's kept up to date with what's actually open right now. Want me to pull up what's currently listed?`;
    }

    if (q.includes('price') || q.includes('cost') || q.includes('budget') || q.includes('rate') || q.includes('quote') || q.includes('estimate')) {
      return `### 💼 Orbit-I Pricing & Estimation
We provide tailored, milestone-based pricing with zero hidden fees. Starting prices for each service are listed on our **Services** page. For an exact quote on your specific project, submit your details through our **Contact & RFPs** page or use the AI Cost Estimator for an instant ballpark.`;
    }

    if (q.includes('python') || q.includes('scrape') || q.includes('scraping') || q.includes('bot') || q.includes('automation') || q.includes('playwright')) {
      return `### 🐍 Python Scripting & Robotic Automation
Orbit-I builds Python automation systems:
- **Headless Scraping**: Automated Playwright / Selenium workflows.
- **Database ETL**: Automated extraction and direct ingestion into **MySQL**.
- **Workflow Automation**: Automated invoice processing, CRM synchronization, and event-driven alerts.`;
    }

    if (q.includes('mysql') || q.includes('hostinger') || q.includes('database') || q.includes('host')) {
      return `### 🗄️ Database & Hosting Architecture
Orbit-I runs on a MySQL database (Hostinger or any standard MySQL host), deployed on **Vercel** edge hosting.`;
    }

    if (q.includes('admin') || q.includes('superadmin') || q.includes('portal') || q.includes('login') || q.includes('password') || q.includes('client portal') || q.includes('credential')) {
      return `### Client Access
If you're an existing client, you can sign in from the link provided to you directly. If you're looking to become a client, submit an inquiry through our **Contact** page and we'll set you up with portal access.`;
    }

    if (q.includes('product') || q.includes('matrix') || q.includes('automator') || q.includes('nexus') || q.includes('cybershield')) {
      return `### 🚀 Orbit-I Proprietary SaaS Suite
Check the **Products** page for our current lineup and pricing — that list is kept current there rather than duplicated here.`;
    }

    if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('address') || q.includes('founder') || q.includes('samad') || q.includes('isam')) {
      return `### 📬 Contact ${db.settings.companyName}
- **Headquarters**: ${db.settings.address}
- **General Inquiries**: \`${db.settings.contactEmail}\`
- **Client Support**: \`${db.settings.supportEmail}\`
- **Phone**: \`${db.settings.phone}\`
- **Founder & CEO**: Abdul Samad Rind
- **Co-Founder & CTO**: Muneeb Ur Rehman
- **Co-Founder & COO**: Maria Almani
- **Discovery Calls**: You can submit an inquiry through our Contact page.`;
    }

    if (q.includes('service') || q.includes('what do you do') || q.includes('about') || q.includes('ai') || q.includes('web') || q.includes('mobile')) {
      return `### 🌟 Welcome to ${db.settings.companyName}
Orbit-I is a technology engineering firm specializing in:
1. **AI & Machine Learning**: Custom LLM integrations, RAG agents, and enterprise intelligent search.
2. **Web & Mobile Engineering**: React, TypeScript, Node.js, and cross-platform apps.
3. **Python Automation & RPA**: Headless web scrapers, data pipelines, and MySQL integrations.
4. **Graphics & UI/UX**: Brand systems and interactive design.
5. **Cloud & Deployment**: MySQL + Vercel edge hosting.

How can we assist you with your upcoming project? You can submit your requirements on our Contact page!`;
    }

    return `### Orbit-I AI Virtual Consultant
Thank you for your inquiry! ${db.settings.companyName} specializes in **Custom Enterprise AI**, **Python Automation & Scraping**, **Web & Mobile Platforms**, and **Cloud Engineering (MySQL & Vercel)**.

- 💡 **Inquire for Project**: Submit your requirements via our Contact page.
- 🎓 **Careers & Internships**: Check the Careers tab for current openings.
- 📬 **Direct Contact**: Reach our team at \`${db.settings.contactEmail}\` or call \`${db.settings.phone}\`.

Please let me know if you would like specific details regarding our services, technical architectures, or pricing!`;
  }

  // 10. Gemini AI: Smart Lead Proposal Drafting
  app.post('/api/ai/draft-proposal', requireAdmin, async (req, res) => {
    const { leadName, company, serviceCategory, budget, timeline, details } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        proposalSubject: `Orbit-I Technical Proposal & Implementation Plan for ${company || leadName}`,
        executiveSummary: `Orbit-I Private Limited is pleased to propose an end-to-end engineering solution for ${company || leadName} targeting ${serviceCategory}.`,
        proposedMilestones: [
          { phase: 'Phase 1: Architecture Blueprint & Technical Scoping', duration: 'Week 1-2', cost: Math.round(Number(budget?.replace(/[^0-9]/g, '') || 5000) * 0.3) },
          { phase: 'Phase 2: Core Engineering, Data Pipelines & UI Development', duration: 'Week 3-5', cost: Math.round(Number(budget?.replace(/[^0-9]/g, '') || 5000) * 0.5) },
          { phase: 'Phase 3: Automated QA, Penetration Testing & Handover', duration: 'Week 6', cost: Math.round(Number(budget?.replace(/[^0-9]/g, '') || 5000) * 0.2) },
        ],
        techRecommendation: ['React 19 / TypeScript', 'FastAPI / Python 3.12', 'MySQL', 'Docker CI/CD'],
        estimatedTotal: budget || '$8,500',
      });
    }

    try {
      const prompt = `You are the VP of Engineering & Solutions at Orbit-I Private Limited.
Write a formal, crisp, enterprise-grade technical proposal response for this inbound lead:
Client Name: ${leadName}
Company: ${company}
Service Requested: ${serviceCategory}
Budget: ${budget}
Timeline: ${timeline}
Details: ${details}

Respond with valid JSON:
{
  "proposalSubject": "...",
  "executiveSummary": "...",
  "proposedMilestones": [
    { "phase": "...", "duration": "...", "cost": 1500 }
  ],
  "techRecommendation": ["Tech1", "Tech2", "Tech3"],
  "estimatedTotal": "$X,XXX"
}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: { responseMimeType: 'application/json' },
      });
      res.json(JSON.parse(response.text || '{}'));
    } catch (err) {
      res.json({
        proposalSubject: `Orbit-I Implementation Proposal for ${company || leadName}`,
        executiveSummary: `Custom engineering proposal prepared for ${leadName}.`,
        proposedMilestones: [
          { phase: 'Architecture & UX Specification', duration: '2 Weeks', cost: 2500 },
          { phase: 'Core Production Engineering', duration: '3 Weeks', cost: 4500 },
          { phase: 'Deployment & SLA Handover', duration: '1 Week', cost: 1500 },
        ],
        techRecommendation: ['React 19', 'Python 3.12', 'MySQL'],
        estimatedTotal: budget || '$8,500',
      });
    }
  });

  // 8. Gemini AI: Smart Project Estimator
  app.post('/api/ai/estimate-project', async (req, res) => {
    const { description, serviceType, targetBudget, timelinePref } = req.body;
    const ai = getGenAI();

    if (!ai) {
      // High-precision intelligent fallback calculation
      const isAI = serviceType?.toLowerCase().includes('ai');
      const isAuto = serviceType?.toLowerCase().includes('python') || serviceType?.toLowerCase().includes('automation');
      const estCost = isAI ? '$4,500 - $8,500' : isAuto ? '$2,500 - $4,800' : '$3,000 - $6,500';
      const estWeeks = isAI ? '4-6 Weeks' : isAuto ? '2-3 Weeks' : '3-5 Weeks';

      return res.json({
        costRange: estCost,
        timeline: estWeeks,
        recommendedStack: ['React 19', 'TypeScript', isAI ? 'Gemini 3.7 LLM' : isAuto ? 'Python Playwright' : 'Node.js Express', 'MySQL', 'TailwindCSS'],
        keyPhases: [
          'Architecture & Requirements Spec',
          'Interactive 3D / UI Prototype',
          'Core Engineering & Database Integration',
          'Automated QA & Security Audit',
          'Deployment on Vercel'
        ],
        roiInsight: 'Automation typically reduces manual operational overhead significantly — the exact impact depends on your current process, and we can quantify it more precisely during a discovery call.',
      });
    }

    try {
      const prompt = `You are the Principal Solutions Architect at Orbit-I Private Limited (an elite AI, Web Apps, Custom Products, Python & Automation, Graphics & Digital Marketing enterprise company).
Analyze this client project request and generate an accurate technical scope and estimation JSON.

Project Description: "${description}"
Service Category: "${serviceType}"
Budget Preference: "${targetBudget}"
Timeline Preference: "${timelinePref}"

Respond ONLY with valid JSON in this exact structure:
{
  "costRange": "$X,XXX - $Y,YYY",
  "timeline": "X-Y Weeks",
  "recommendedStack": ["Tech1", "Tech2", "Tech3", "Tech4", "Tech5"],
  "keyPhases": ["Phase 1...", "Phase 2...", "Phase 3...", "Phase 4...", "Phase 5..."],
  "roiInsight": "A sharp 2-sentence executive summary on the ROI and business value of this build."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('AI Estimator error:', err);
      res.json({
        costRange: '$3,500 - $7,000',
        timeline: '3-5 Weeks',
        recommendedStack: ['React 19', 'TypeScript', 'Node.js Express', 'Python 3.12', 'MySQL'],
        keyPhases: [
          'Requirement Scoping & Wireframes',
          'Database Architecture & APIs',
          'Frontend UI & 3D Interactive Elements',
          'QA Testing & Stress Benchmarking',
          'Production Deployment on Vercel / Hostinger'
        ],
        roiInsight: 'Orbit-I rapid deployment framework provides enterprise reliability with 3x faster time to market.',
      });
    }
  });

  // 9. Gemini AI: Content Generation Studio for SuperAdmin
  app.post('/api/ai/generate-content', requireAdmin, async (req, res) => {
    const { contentType, topic, tone, targetAudience } = req.body;
    const ai = getGenAI();

    if (!ai) {
      return res.json({
        title: `Next-Generation ${topic} Strategies by Orbit-I`,
        content: `Discover how Orbit-I Private Limited delivers high-impact ${topic} for forward-thinking enterprises. Our engineering team combines AI intelligence, Python automation, and modern full-stack architectures to maximize operational ROI.`,
        tags: [topic, 'Orbit-I', 'Technology', 'Enterprise'],
        summary: `An authoritative analysis of ${topic} and how modern enterprises scale with custom engineering.`,
      });
    }

    try {
      const prompt = `You are the Chief Technology Officer and Editor-in-Chief at Orbit-I Private Limited.
Create high-craft, professional, non-generic enterprise content for:
Content Type: ${contentType} (e.g. blog post, job description, product copy, marketing pitch)
Topic: ${topic}
Tone: ${tone || 'Authoritative, innovative, clear'}
Audience: ${targetAudience || 'Tech founders, CTOs, engineers, and enterprise leaders'}

Return ONLY valid JSON matching this schema:
{
  "title": "String",
  "summary": "String (1-2 sentences)",
  "content": "String (Rich Markdown formatted with headings, bullet points, and code/architecture notes)",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json(parsed);
    } catch (err: any) {
      console.error('AI content generation error:', err);
      res.status(500).json({ error: 'Failed to generate AI content' });
    }
  });

  // 10. Gemini AI: Interactive Orbit-I Virtual Consultant Chat (Trained & Grounded)
  app.post('/api/ai/chat', async (req, res) => {
    const { message, history } = req.body;
    const ai = getGenAI();
    const knowledgeContext = buildOrbitKnowledgeBase();

    if (!ai) {
      const reply = getAccurateFallbackAnswer(message || '');
      return res.json({ reply });
    }

    try {
      const systemInstruction = `You are "Orbit-I AI Advisor", the official senior AI solutions consultant for Orbit-I Private Limited.
Orbit-I is NOT an aerospace or rocket company. Orbit-I is an elite enterprise digital solutions, custom software development, AI engineering, and Python automation firm.

Here is your authoritative, real-time verified knowledge base:
${knowledgeContext}

GUIDELINES FOR YOUR RESPONSES:
1. Always be 100% accurate, helpful, professional, and knowledgeable about ORBIT-I's services, pricing, products, careers/internships, and team, based only on the data provided above.
2. Structure your answers with clean Markdown headings, bullet points, bold key terms, and concise summaries.
3. If asked about internships or student jobs, only state what's listed under CAREERS & INTERNSHIP PROGRAMS above — do not invent stipend amounts, durations, or program names that aren't in that list.
4. If asked about pricing or project quotes, give clear price ranges and invite them to launch the Instant Project Estimator tool.
5. Never discuss admin login credentials, backend infrastructure, or internal system access with visitors — redirect them to the Contact page instead.
6. If asked about databases, confirm support for MySQL (with SQL export) and Vercel edge deployment.
7. Keep answers structured, conversational, and direct.`;

      // Build conversation contents with history
      const formattedContents: any[] = [];
      if (Array.isArray(history) && history.length > 0) {
        history.slice(-6).forEach(h => {
          if (h.text) {
            formattedContents.push({
              role: h.sender === 'user' ? 'user' : 'model',
              parts: [{ text: h.text }],
            });
          }
        });
      }

      // Append current user message
      formattedContents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.7-flash',
        contents: formattedContents,
        config: {
          systemInstruction,
        },
      });

      const replyText = response.text || getAccurateFallbackAnswer(message || '');
      res.json({ reply: replyText });
    } catch (err: any) {
      console.error('AI Chat error (falling back to precision knowledge engine):', err);
      const fallbackReply = getAccurateFallbackAnswer(message || '');
      res.json({ reply: fallbackReply });
    }
  });

  // 11. Database & Hosting Export Tool: Real MySQL Schema Generator
  app.get('/api/export-db/:dialect', requireAdmin, (req, res) => {
    const { dialect } = req.params;

    if (dialect !== 'mysql') {
      return res.status(400).json({
        error: `Dialect "${dialect}" is not supported. This app runs on MySQL. Set the DB_* environment variables to a MySQL instance to connect one.`,
      });
    }

    const sql = `-- ==============================================================================
-- ORBIT-I — ACTUAL DATABASE SCHEMA (MySQL)
-- This matches what db.ts creates automatically on first boot (initSchema()).
-- Content resources (settings/services/products/blogs/careers/gallery/case
-- studies) are stored as one JSON row per resource in content_store, since
-- the app's admin panel always replaces them wholesale, not field-by-field.
-- Operational CRM entities (leads, applications, projects, invoices,
-- tickets, audit_logs) get one row per record with a real primary key,
-- with the record body stored as JSON to match the app's TypeScript types
-- exactly, including their nested/optional fields.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS content_store (
  resource_key VARCHAR(50) PRIMARY KEY,
  data JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS applications (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS invoices (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS tickets (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
    res.setHeader('Content-Type', 'text/plain');
    return res.send(sql);
  });

  return app;
}

// ==========================================
// LOCAL DEV / STANDALONE NODE ENTRYPOINT
// (skipped on Vercel — Vercel imports createApp() directly via api/index.ts)
// ==========================================
async function startServer() {
  const app = await createApp();
  const PORT = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Orbit-I Server running at http://0.0.0.0:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error('Server startup error:', err);
  });
}

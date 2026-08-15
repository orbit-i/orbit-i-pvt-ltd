import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  LayoutDashboard,
  Briefcase,
  Receipt,
  LifeBuoy,
  Users,
  Database,
  Layers,
  ShoppingBag,
  BookOpen,
  GraduationCap,
  Sparkles,
  Settings,
  Activity,
  Plus,
  Trash2,
  HardDrive,
  Moon,
  Sun,
  Menu,
  X,
  LogOut,
  KeyRound,
  ChevronRight,
  ExternalLink,
  Search,
  Lock
} from 'lucide-react';
import {
  ServiceItem,
  ProductItem,
  BlogPost,
  CareerOpening,
  GalleryItem,
  CaseStudy,
  SiteSettings,
  InquiryLead,
  JobApplication,
  ProjectTracking,
  InvoiceItem,
  SupportTicket,
  SystemAuditLog
} from '../../types';
import {
  INITIAL_SUPPORT_TICKETS,
  INITIAL_AUDIT_LOGS
} from '../../data/initialData';

import { AdminOverviewTab } from './tabs/AdminOverviewTab';
import { AdminProjectsTab } from './tabs/AdminProjectsTab';
import { AdminInvoicesTab } from './tabs/AdminInvoicesTab';
import { AdminSupportTicketsTab } from './tabs/AdminSupportTicketsTab';
import { AdminLeadsTab } from './tabs/AdminLeadsTab';
import { AdminAuditLogsTab } from './tabs/AdminAuditLogsTab';
import { AdminDatabaseTab } from './tabs/AdminDatabaseTab';
import { AdminBlogsTab } from './tabs/AdminBlogsTab';
import { AdminDataTab } from './tabs/AdminDataTab';
import { AdminSettingsTab } from './tabs/AdminSettingsTab';
import { AuthModal } from '../auth/AuthModal';

interface SuperAdminDashboardProps {
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
  products: ProductItem[];
  setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  blogs: BlogPost[];
  setBlogs: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  careers: CareerOpening[];
  setCareers: React.Dispatch<React.SetStateAction<CareerOpening[]>>;
  gallery: GalleryItem[];
  setGallery: React.Dispatch<React.SetStateAction<GalleryItem[]>>;
  caseStudies?: CaseStudy[];
  setCaseStudies?: React.Dispatch<React.SetStateAction<CaseStudy[]>>;
  projects: ProjectTracking[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectTracking[]>>;
  invoices: InvoiceItem[];
  setInvoices: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  setActiveTab?: (tab: any) => void;
}

export const SuperAdminDashboard: React.FC<SuperAdminDashboardProps> = ({
  services = [],
  setServices,
  products = [],
  setProducts,
  blogs = [],
  setBlogs,
  careers = [],
  setCareers,
  gallery = [],
  setGallery,
  caseStudies = [],
  setCaseStudies,
  projects = [],
  setProjects,
  invoices = [],
  setInvoices,
  settings,
  setSettings,
  setActiveTab,
}) => {
  const [adminTab, setAdminTab] = useState<
    | 'overview'
    | 'projects'
    | 'invoices'
    | 'tickets'
    | 'leads'
    | 'blogs'
    | 'services'
    | 'products'
    | 'careers'
    | 'database'
    | 'data'
    | 'ai-studio'
    | 'settings'
    | 'audit'
  >('overview');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<'admin' | 'client'>('admin');

  // Leads, Tickets, Applications & Logs State
  const [leads, setLeads] = useState<InquiryLead[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([...INITIAL_SUPPORT_TICKETS]);
  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>([...INITIAL_AUDIT_LOGS]);

  // AI Studio State
  const [aiTopic, setAiTopic] = useState('');
  const [aiType, setAiType] = useState('blog post');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  // Fetch live leads, applications, tickets, logs on mount
  useEffect(() => {
    fetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setLeads(data);
      })
      .catch(console.error);

    fetch('/api/careers/applications')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setApplications(data);
      })
      .catch(console.error);

    fetch('/api/support/tickets')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTickets(data);
      })
      .catch(console.error);

    fetch('/api/audit-logs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setAuditLogs(data);
      })
      .catch(console.error);
  }, []);

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;
    setAiLoading(true);
    try {
      const res = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: aiType,
          topic: aiTopic,
        }),
      });
      const data = await res.json();
      setAiResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setAiLoading(false);
    }
  };

  // Structured Navigation Groups for Left Sidebar
  const navSections = [
    {
      group: 'Core Operations',
      items: [
        { id: 'overview', label: 'Overview & KPIs', icon: LayoutDashboard },
        { id: 'projects', label: 'Client Projects', icon: Briefcase, count: projects.length },
        { id: 'invoices', label: 'Billing & Invoices', icon: Receipt, count: invoices.length },
        {
          id: 'tickets',
          label: 'Support Desk',
          icon: LifeBuoy,
          count: tickets.filter((t) => t.status !== 'Resolved' && t.status !== 'Closed').length,
        },
        {
          id: 'leads',
          label: 'Inbound Leads',
          icon: Users,
          count: leads.filter((l) => l.status === 'New').length,
        },
      ],
    },
    {
      group: 'Content & CMS',
      items: [
        { id: 'blogs', label: 'Blog Writing CMS', icon: BookOpen, count: blogs.length },
        { id: 'services', label: 'Services Catalog', icon: Layers, count: services.length },
        { id: 'products', label: 'SaaS Products', icon: ShoppingBag, count: products.length },
        { id: 'careers', label: 'Careers & Hiring', icon: GraduationCap, count: applications.length },
        { id: 'ai-studio', label: 'AI Content Studio', icon: Sparkles },
      ],
    },
    {
      group: 'System & Data',
      items: [
        { id: 'data', label: 'Data Management', icon: HardDrive },
        { id: 'database', label: 'Database & DevOps', icon: Database },
        { id: 'audit', label: 'Security Audit Logs', icon: ShieldCheck },
        { id: 'settings', label: 'Footer & Site Settings', icon: Settings },
      ],
    },
  ];

  return (
    <div id="superadmin-root" className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Container with Left Sidebar */}
      <div className="flex h-screen overflow-hidden">
        {/* ========================================================================= */}
        {/* LEFT SIDEBAR NAVIGATION */}
        {/* ========================================================================= */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Top Brand & Workspace Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                Ø
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                    Orbit-I Admin
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400">
                    ROOT
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[140px]">
                  {settings.legalEntity}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Items List */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
            {navSections.map((section) => (
              <div key={section.group} className="space-y-1">
                <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {section.group}
                </div>
                <div className="space-y-0.5 pt-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const isActive = adminTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setAdminTab(item.id as any);
                          setSidebarOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          <span>{item.label}</span>
                        </div>
                        {typeof item.count === 'number' && item.count > 0 && (
                          <span
                            className={`text-[10px] px-1.5 py-0.2 rounded-md font-bold ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                          >
                            {item.count}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Controls: User, Theme Switcher & Portals */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
            {/* Quick Portal Switch */}
            {setActiveTab && (
              <button
                onClick={() => setActiveTab('client-portal')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-blue-500" />
                  <span>Switch to Client Portal</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}

            {/* Auth / Password Controls */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setAuthModalRole('admin');
                  setAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 cursor-pointer"
                title="Account Credentials & Password Reset"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Security / Password</span>
              </button>

              <span className="text-[10px] text-slate-500 font-mono">Dark Mode</span>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* RIGHT MAIN CONTENT WORKSPACE */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Bar for Mobile & Breadcrumbs */}
          <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
                aria-label="Open sidebar navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="text-xs text-slate-400">SuperAdmin / Workspace</div>
                <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 capitalize">
                  {adminTab.replace('-', ' ')}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-600 dark:text-slate-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Node: Active</span>
              </div>

              {setActiveTab && (
                <button
                  onClick={() => setActiveTab('home')}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Exit to Website
                </button>
              )}
            </div>
          </header>

          {/* Active Workspace View */}
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {/* Overview & KPIs */}
            {adminTab === 'overview' && (
              <AdminOverviewTab
                projects={projects}
                invoices={invoices}
                leads={leads}
                tickets={tickets}
                auditLogs={auditLogs}
                settings={settings}
                onNavigateTab={(t) => setAdminTab(t as any)}
                onOpenNewProject={() => setAdminTab('projects')}
                onOpenNewInvoice={() => setAdminTab('invoices')}
              />
            )}

            {/* Client Projects & Specs */}
            {adminTab === 'projects' && (
              <AdminProjectsTab projects={projects} setProjects={setProjects} />
            )}

            {/* Invoices & Billing */}
            {adminTab === 'invoices' && (
              <AdminInvoicesTab invoices={invoices} setInvoices={setInvoices} />
            )}

            {/* Support Desk */}
            {adminTab === 'tickets' && (
              <AdminSupportTicketsTab tickets={tickets} setTickets={setTickets} />
            )}

            {/* CRM Leads */}
            {adminTab === 'leads' && (
              <AdminLeadsTab leads={leads} setLeads={setLeads} />
            )}

            {/* Blog Writing CMS */}
            {adminTab === 'blogs' && (
              <AdminBlogsTab blogs={blogs} setBlogs={setBlogs} />
            )}

            {/* Data Management (JSON, CSV, Factory Reset) */}
            {adminTab === 'data' && (
              <AdminDataTab
                services={services}
                setServices={setServices}
                products={products}
                setProducts={setProducts}
                blogs={blogs}
                setBlogs={setBlogs}
                careers={careers}
                setCareers={setCareers}
                gallery={gallery}
                setGallery={setGallery}
                caseStudies={caseStudies}
                setCaseStudies={setCaseStudies}
                projects={projects}
                setProjects={setProjects}
                invoices={invoices}
                setInvoices={setInvoices}
                settings={settings}
                setSettings={setSettings}
              />
            )}

            {/* Security Audit Logs */}
            {adminTab === 'audit' && (
              <AdminAuditLogsTab auditLogs={auditLogs} />
            )}

            {/* Database & DevOps */}
            {adminTab === 'database' && <AdminDatabaseTab />}

            {/* Services CMS */}
            {adminTab === 'services' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-blue-500" />
                      <span>Enterprise Services Catalog ({services.length})</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Manage enterprise capabilities, pricing retainers, and delivery commitments.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newS: ServiceItem = {
                        id: `srv-${Date.now()}`,
                        title: 'Custom Engineering Pod',
                        category: 'AI & ML',
                        shortDesc: 'Dedicated enterprise engineering pod delivering custom solutions.',
                        fullDesc: 'End-to-end architecture, API integrations, and SLA-backed maintenance.',
                        icon: 'Cpu',
                        features: ['Requirements Analysis', 'Cloud Setup', '24/7 Monitoring'],
                        technologies: ['React 19', 'Python 3.12', 'PostgreSQL'],
                        startingPrice: 3499,
                        deliveryTime: '3-5 Weeks',
                        popular: false,
                      };
                      const updated = [newS, ...services];
                      setServices(updated);
                      fetch('/api/content/services', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updated),
                      }).catch(console.error);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map((srv) => (
                    <div
                      key={srv.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">
                          {srv.category}
                        </span>
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                          {srv.title}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 line-clamp-2">
                          {srv.shortDesc}
                        </div>
                        <div className="text-slate-900 dark:text-slate-200 font-semibold pt-1">
                          ${srv.startingPrice.toLocaleString()} • Delivery: {srv.deliveryTime}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const updated = services.filter((s) => s.id !== srv.id);
                          setServices(updated);
                          fetch('/api/content/services', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updated),
                          }).catch(console.error);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Remove Service"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Products CMS */}
            {adminTab === 'products' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-indigo-500" />
                      <span>Proprietary SaaS & Enterprise Products ({products.length})</span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Configure software subscriptions, metrics, release versions, and documentation.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const newP: ProductItem = {
                        id: `prod-${Date.now()}`,
                        name: 'Orbit-I Smart System',
                        tagline: 'High-Throughput Enterprise Tool',
                        category: 'Enterprise Suite',
                        description: 'Comprehensive automation and data pipeline module for client operations.',
                        version: 'v1.0.0',
                        monthlyPrice: 199,
                        annualPrice: 1990,
                        features: ['Real-Time Sync', 'Role-Based Access', 'API Webhooks'],
                        metrics: [{ label: 'Uptime', value: '99.99%' }, { label: 'Speedup', value: '10x' }],
                        status: 'Live',
                      };
                      const updated = [newP, ...products];
                      setProducts(updated);
                      fetch('/api/content/products', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updated),
                      }).catch(console.error);
                    }}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add SaaS Product</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-start justify-between gap-3 text-xs"
                    >
                      <div className="space-y-1">
                        <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                          {prod.category}
                        </span>
                        <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                          {prod.name}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 line-clamp-2">
                          {prod.description}
                        </div>
                        <div className="text-slate-900 dark:text-slate-200 font-semibold pt-1">
                          ${prod.monthlyPrice}/mo (${prod.annualPrice}/yr) • Version: {prod.version}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          const updated = products.filter((p) => p.id !== prod.id);
                          setProducts(updated);
                          fetch('/api/content/products', {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(updated),
                          }).catch(console.error);
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Remove Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Careers & Talent Pipeline */}
            {adminTab === 'careers' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-emerald-500" />
                    <span>Talent Pipeline & Applications ({applications.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Review candidates for engineering openings and the 2026 Internship Cohort.
                  </p>
                </div>

                <div className="space-y-3">
                  {applications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No candidate submissions in queue.
                    </div>
                  ) : (
                    applications.map((app) => (
                      <div
                        key={app.id}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-bold text-slate-900 dark:text-slate-100 text-sm">
                              {app.applicantName}
                            </span>
                            <span className="text-slate-500 dark:text-slate-400 ml-2 font-mono">
                              ({app.email})
                            </span>
                          </div>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              app.status === 'Reviewing'
                                ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                                : app.status === 'Accepted'
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>
                        <div className="text-slate-700 dark:text-slate-300 font-semibold">{app.jobTitle}</div>
                        {app.coverLetter && (
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                            {app.coverLetter}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-[11px] text-slate-500 font-mono pt-1">
                          {app.portfolioUrl && (
                            <a
                              href={app.portfolioUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                            >
                              <span>Portfolio</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {app.linkedinUrl && (
                            <a
                              href={app.linkedinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                            >
                              <span>LinkedIn</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          <span>Applied: {app.appliedAt}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* AI Content Studio */}
            {adminTab === 'ai-studio' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                    <span>Gemini AI Content & Technical Blueprint Studio</span>
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Generate enterprise briefs, architectural summaries, and technical specifications.
                  </p>
                </div>

                <form onSubmit={handleAiGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Topic (e.g. Real-Time Vector Data Pipelines in Python 3.12)"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    className="md:col-span-2 px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={aiLoading || !aiTopic.trim()}
                    className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer transition-colors"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{aiLoading ? 'Synthesizing...' : 'Generate AI Draft'}</span>
                  </button>
                </form>

                {aiResult && (
                  <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">{aiResult.title}</h4>
                    <p className="text-slate-500 dark:text-slate-400 italic">{aiResult.summary}</p>
                    <div className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                      {aiResult.content}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* System & Footer Settings */}
            {adminTab === 'settings' && (
              <AdminSettingsTab settings={settings} setSettings={setSettings} />
            )}
          </main>
        </div>
      </div>

      {/* Auth / Forgot Password Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authModalRole}
        onLoginSuccess={(u) => {
          setAuthModalOpen(false);
        }}
      />
    </div>
  );
};

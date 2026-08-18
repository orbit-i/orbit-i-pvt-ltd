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
  Lock,
  Home,
  Info,
  Image,
  FolderKanban,
  FileCode2,
  Sliders,
  Copy,
  Check,
  Link2,
  EyeOff
} from 'lucide-react';
import { apiFetch, setAuthToken } from '../../lib/apiClient';
import {
  ServiceItem,
  ProductItem,
  BlogPost,
  CareerOpening,
  GalleryItem,
  CaseStudyItem,
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
import { AdminHomePageTab } from './tabs/AdminHomePageTab';
import { AdminAboutTab } from './tabs/AdminAboutTab';
import { AdminServicesTab } from './tabs/AdminServicesTab';
import { AdminProductsTab } from './tabs/AdminProductsTab';
import { AdminFeaturedWorkTab } from './tabs/AdminFeaturedWorkTab';
import { AdminCareersTab } from './tabs/AdminCareersTab';
import { AdminGalleryTab } from './tabs/AdminGalleryTab';
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
  caseStudies?: CaseStudyItem[];
  setCaseStudies?: React.Dispatch<React.SetStateAction<CaseStudyItem[]>>;
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
  setCaseStudies = () => {},
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
    | 'home-page'
    | 'about-page'
    | 'services'
    | 'products'
    | 'featured-work'
    | 'careers'
    | 'gallery'
    | 'blogs'
    | 'projects'
    | 'invoices'
    | 'tickets'
    | 'leads'
    | 'data'
    | 'database'
    | 'audit'
    | 'ai-studio'
    | 'settings'
  >('overview');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalRole, setAuthModalRole] = useState<'admin' | 'client'>('admin');
  const [copiedSecretUrl, setCopiedSecretUrl] = useState(false);

  const getSecretAdminUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/#superadmin`;
    }
    return 'https://orbit-i.com/#superadmin';
  };

  const handleCopySecretUrl = () => {
    const url = getSecretAdminUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedSecretUrl(true);
      setTimeout(() => setCopiedSecretUrl(false), 3000);
    });
  };

  // Leads, Tickets, Applications & Logs State
  const [leads, setLeads] = useState<InquiryLead[]>([]);
  const [tickets, setTickets] = useState<SupportTicket[]>([...INITIAL_SUPPORT_TICKETS]);
  const [auditLogs, setAuditLogs] = useState<SystemAuditLog[]>([...INITIAL_AUDIT_LOGS]);

  // AI Studio State
  const [aiTopic, setAiTopic] = useState('');
  const [aiType, setAiType] = useState('blog post');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  // Fetch live leads, tickets, logs on mount
  useEffect(() => {
    apiFetch('/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setLeads(data);
      })
      .catch(console.error);

    apiFetch('/api/support/tickets')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTickets(data);
      })
      .catch(console.error);

    apiFetch('/api/audit-logs')
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
      const res = await apiFetch('/api/ai/generate-content', {
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

  // Structured Navigation Groups for Left Sidebar - Complete Page CMS & Operations
  const navSections = [
    {
      group: 'Operations & CRM',
      items: [
        { id: 'overview', label: 'Executive Overview', icon: LayoutDashboard },
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
      group: 'Manage All Pages',
      items: [
        { id: 'home-page', label: 'Home Page CMS', icon: Home },
        { id: 'about-page', label: 'About Us CMS', icon: Info },
        { id: 'services', label: 'Services Catalog', icon: Layers, count: services.length },
        { id: 'products', label: 'SaaS & AI Products', icon: ShoppingBag, count: products.length },
        { id: 'featured-work', label: 'Featured Case Studies', icon: FolderKanban, count: caseStudies.length },
        { id: 'careers', label: 'Careers & Cohorts', icon: GraduationCap, count: careers.length },
        { id: 'gallery', label: 'Gallery & Media', icon: Image, count: gallery.length },
        { id: 'blogs', label: 'Blog Posts CMS', icon: BookOpen, count: blogs.length },
      ],
    },
    {
      group: 'System & Tools',
      items: [
        { id: 'ai-studio', label: 'AI Content Studio', icon: Sparkles },
        { id: 'data', label: 'Data Hub & Backups', icon: HardDrive },
        { id: 'database', label: 'Database & DevOps', icon: Database },
        { id: 'audit', label: 'Security Audit Logs', icon: ShieldCheck },
        { id: 'settings', label: 'Site & Footer Settings', icon: Settings },
      ],
    },
  ];

  return (
    <div id="superadmin-root" className="min-h-screen bg-slate-950 text-slate-100 transition-colors">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Main Container with Left Sidebar */}
      <div className="flex h-screen overflow-hidden">
        {/* ========================================================================= */}
        {/* LEFT SIDEBAR NAVIGATION */}
        {/* ========================================================================= */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Top Brand & Workspace Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                <img src="/logo.png" alt="ORBIT-I" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm tracking-tight text-white">
                    Orbit-I Admin
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded font-bold bg-blue-950 text-blue-400 border border-blue-800">
                    ROOT
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                  {settings.legalEntity}
                </div>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 lg:hidden cursor-pointer"
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
                            : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
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
                                : 'bg-slate-800 text-slate-400'
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

          {/* Bottom Controls: Client Portal Switcher & Auth */}
          <div className="p-3 border-t border-slate-800 space-y-2">
            {setActiveTab && (
              <button
                onClick={() => setActiveTab('client-portal')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Briefcase className="w-3.5 h-3.5 text-blue-400" />
                  <span>Switch to Client Portal</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  setAuthModalRole('admin');
                  setAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-cyan-400 cursor-pointer"
                title="Account Credentials & Password Reset"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Security / Password</span>
              </button>

              <span className="text-[10px] text-slate-500 font-mono">Dark Core</span>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* RIGHT MAIN CONTENT WORKSPACE */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-slate-950">
          {/* Top Bar for Mobile & Breadcrumbs */}
          <header className="sticky top-0 z-30 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-6 py-3.5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-xl text-slate-300 hover:bg-slate-800 lg:hidden cursor-pointer"
                aria-label="Open sidebar navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="text-xs text-slate-400">SuperAdmin Center</div>
                <h1 className="text-sm font-bold text-slate-100 capitalize">
                  {adminTab.replace('-', ' ')}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Copy Secret URL Button */}
              <button
                onClick={handleCopySecretUrl}
                title="Copy direct secret URL for SuperAdmin bookmarking"
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  copiedSecretUrl
                    ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300 shadow-xs'
                    : 'bg-slate-900 hover:bg-slate-800 border-slate-700 text-cyan-300 hover:text-cyan-200'
                }`}
              >
                {copiedSecretUrl ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Secret URL Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="hidden sm:inline">Copy Secret URL</span>
                    <span className="sm:hidden">Secret URL</span>
                  </>
                )}
              </button>

              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Sync: Active</span>
              </div>

              {setActiveTab && (
                <button
                  onClick={() => {
                    setAuthToken(null);
                    window.location.hash = '';
                    // Strip the ?access=... secret key from the URL bar so it's not left visible/bookmarked
                    const url = new URL(window.location.href);
                    url.searchParams.delete('access');
                    window.history.replaceState({}, '', url.toString());
                    setActiveTab('home');
                  }}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-500 border border-rose-500 cursor-pointer flex items-center gap-1.5"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
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

            {/* Home Page CMS */}
            {adminTab === 'home-page' && (
              <AdminHomePageTab settings={settings} setSettings={setSettings} />
            )}

            {/* About Us Page CMS */}
            {adminTab === 'about-page' && (
              <AdminAboutTab settings={settings} setSettings={setSettings} />
            )}

            {/* Services Catalog */}
            {adminTab === 'services' && (
              <AdminServicesTab services={services} setServices={setServices} />
            )}

            {/* SaaS & AI Products */}
            {adminTab === 'products' && (
              <AdminProductsTab products={products} setProducts={setProducts} />
            )}

            {/* Featured Work & Case Studies */}
            {adminTab === 'featured-work' && (
              <AdminFeaturedWorkTab
                caseStudies={caseStudies}
                setCaseStudies={setCaseStudies}
              />
            )}

            {/* Careers & Cohort 2026 */}
            {adminTab === 'careers' && (
              <AdminCareersTab careers={careers} setCareers={setCareers} />
            )}

            {/* Gallery & Showcase Assets */}
            {adminTab === 'gallery' && (
              <AdminGalleryTab gallery={gallery} setGallery={setGallery} />
            )}

            {/* Client Projects & Milestones */}
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

            {/* AI Content Studio */}
            {adminTab === 'ai-studio' && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                    <span>Gemini AI Content & Technical Blueprint Studio</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Generate enterprise briefs, architectural summaries, and technical specifications.
                  </p>
                </div>

                <form onSubmit={handleAiGenerate} className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Topic (e.g. Real-Time Vector Data Pipelines in Python 3.12)"
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    className="md:col-span-2 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 focus:outline-none"
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
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-3">
                    <h4 className="text-sm font-bold text-white">{aiResult.title}</h4>
                    <p className="text-slate-400 italic">{aiResult.summary}</p>
                    <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
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

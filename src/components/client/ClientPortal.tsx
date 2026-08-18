import React, { useState, useEffect } from 'react';
import { ProjectTracking, InvoiceItem, SupportTicket } from '../../types';
import {
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  DollarSign,
  Download,
  Send,
  Sparkles,
  LifeBuoy,
  Layers,
  ExternalLink,
  Github,
  Figma,
  FolderGit2,
  Activity,
  Check,
  Building,
  User,
  HelpCircle,
  Plus,
  Receipt,
  Briefcase,
  HardDrive,
  Moon,
  Sun,
  Menu,
  X,
  KeyRound,
  ChevronRight,
  Search,
  Lock
} from 'lucide-react';
import { INITIAL_SUPPORT_TICKETS } from '../../data/initialData';
import { ClientDataTab } from './ClientDataTab';
import { apiFetch } from '../../lib/apiClient';
import { AuthModal } from '../auth/AuthModal';

interface ClientPortalProps {
  projects?: ProjectTracking[];
  setProjects?: React.Dispatch<React.SetStateAction<ProjectTracking[]>>;
  invoices?: InvoiceItem[];
  onPayInvoice: (invoice: InvoiceItem) => void;
  setActiveTab?: (tab: any) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  projects = [],
  invoices = [],
  onPayInvoice,
  setActiveTab: setGlobalActiveTab,
}) => {
  const [clientTab, setClientTab] = useState<'projects' | 'invoices' | 'support' | 'telemetry' | 'data'>('projects');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);

  // Support Ticket Form State
  const [tickets, setTickets] = useState<SupportTicket[]>([...INITIAL_SUPPORT_TICKETS]);
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(tickets[0]?.id || null);
  const [isCreatingTicket, setIsCreatingTicket] = useState(false);
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketCategory, setTicketCategory] = useState('Technical Question');
  const [ticketPriority, setTicketPriority] = useState<SupportTicket['priority']>('Normal');
  const [ticketProject, setTicketProject] = useState(projects[0]?.projectName || projects[0]?.title || 'Enterprise Solution');
  const [ticketMessage, setTicketMessage] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  // Selected project for detailed view
  const [selectedProjectId, setSelectedProjectId] = useState<string>(projects[0]?.id || '');
  const activeProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  useEffect(() => {
    apiFetch('/api/support/tickets')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTickets(data);
      })
      .catch(console.error);
  }, []);

  const totalOutstanding = invoices
    .filter((i) => i.status === 'Pending')
    .reduce((acc, curr) => acc + (curr.totalAmount || curr.amount), 0);

  const totalSettled = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((acc, curr) => acc + (curr.totalAmount || curr.amount), 0);

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ticketSubject.trim() || !ticketMessage.trim()) return;

    const newTicket: SupportTicket = {
      id: `tkt-${Date.now()}`,
      clientName: activeProject?.clientName || 'Valued Client Org',
      clientEmail: activeProject?.clientEmail || 'client@enterprise.com',
      projectTitle: ticketProject,
      subject: ticketSubject.trim(),
      priority: ticketPriority,
      status: 'Open',
      createdAt:
        new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) +
        ' ' +
        new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'client',
          senderName: activeProject?.clientName || 'Client Representative',
          text: ticketMessage.trim(),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ],
    };

    const updated = [newTicket, ...tickets];
    setTickets(updated);
    setSelectedTicketId(newTicket.id);
    setIsCreatingTicket(false);
    setTicketSubject('');
    setTicketMessage('');

    apiFetch('/api/support/tickets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTicket),
    }).catch(console.error);
  };

  const handleSendTicketReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyMessage.trim() || !selectedTicketId) return;

    const updated = tickets.map((t) => {
      if (t.id === selectedTicketId) {
        return {
          ...t,
          status: 'In Investigation' as const,
          messages: [
            ...t.messages,
            {
              id: `msg-${Date.now()}`,
              sender: 'client' as const,
              senderName: activeProject?.clientName || 'Client Representative',
              text: replyMessage.trim(),
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            },
          ],
        };
      }
      return t;
    });

    setTickets(updated);
    setReplyMessage('');

    apiFetch(`/api/support/tickets/${selectedTicketId}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sender: 'client',
        senderName: activeProject?.clientName || 'Client Representative',
        text: replyMessage.trim(),
      }),
    }).catch(console.error);
  };

  const selectedTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const clientNavItems = [
    { id: 'projects', label: 'Project Milestones', icon: Briefcase, count: projects.length },
    { id: 'invoices', label: 'Billing & Invoices', icon: Receipt, count: invoices.length },
    { id: 'support', label: '24/7 Support Desk', icon: LifeBuoy, count: tickets.filter((t) => t.status === 'Open').length },
    { id: 'telemetry', label: 'Live Telemetry & SLA', icon: Activity },
    { id: 'data', label: 'My Data & Exports', icon: HardDrive },
  ];

  return (
    <div id="client-portal-root" className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden"
        />
      )}

      <div className="flex h-screen overflow-hidden">
        {/* ========================================================================= */}
        {/* LEFT CLIENT SIDEBAR NAVIGATION */}
        {/* ========================================================================= */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Top Organization Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
                <Building className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-sm tracking-tight text-slate-900 dark:text-white truncate">
                  {activeProject?.clientName || 'Client Portal'}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono truncate">
                  {activeProject?.clientEmail || 'client@enterprise.com'}
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

          {/* Project Switcher in Sidebar */}
          {projects.length > 1 && (
            <div className="px-4 pt-3">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                Active Project
              </label>
              <select
                value={selectedProjectId}
                onChange={(e) => setSelectedProjectId(e.target.value)}
                className="w-full px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
              >
                {projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.projectName || (p as any).title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sidebar Menu Links */}
          <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin">
            <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Client Portal Modules
            </div>
            {clientNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = clientTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setClientTab(item.id as any);
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
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
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Bottom Financial Quick Glance & Controls */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Total Settled:</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  ${totalSettled.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>Pending Balance:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  ${totalOutstanding.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Quick Switch to SuperAdmin (if authorized) */}
            {setGlobalActiveTab && (
              <button
                onClick={() => setGlobalActiveTab('superadmin')}
                className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700/80 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                  <span>Switch to SuperAdmin</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}

            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 cursor-pointer"
                title="Account Credentials & Reset Password"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Client Auth / Password</span>
              </button>

              <span className="text-[10px] text-slate-500 font-mono">Dark Mode</span>
            </div>
          </div>
        </aside>

        {/* ========================================================================= */}
        {/* RIGHT MAIN WORKSPACE */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Header Bar */}
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
                <div className="text-xs text-slate-400">Client Hub / {activeProject?.clientName || 'Project'}</div>
                <h1 className="text-sm font-bold text-slate-900 dark:text-slate-100 capitalize">
                  {clientTab.replace('-', ' ')}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {setGlobalActiveTab && (
                <button
                  onClick={() => setGlobalActiveTab('home')}
                  className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Back to Main Website
                </button>
              )}
            </div>
          </header>

          {/* Active Workspace View */}
          <main className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
            {/* 1. PROJECTS & MILESTONES */}
            {clientTab === 'projects' && (
              <div className="space-y-6">
                {activeProject ? (
                  <>
                    {/* Project Header Summary Card */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                              Phase: {activeProject.currentPhase}
                            </span>
                            <span className="text-xs text-slate-400 font-mono">
                              Launch Target: {activeProject.targetLaunchDate || activeProject.targetDeadline || 'Q2 2026'}
                            </span>
                          </div>
                          <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 mt-1">
                            {activeProject.projectName || activeProject.title}
                          </h2>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {activeProject.description || 'Enterprise platform architecture and delivery pipeline.'}
                          </p>
                        </div>

                        {/* Progress Gauge */}
                        <div className="sm:text-right">
                          <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                            {activeProject.progressPercentage || activeProject.progressPercent || 0}%
                          </div>
                          <div className="text-[11px] text-slate-400 font-medium">Completion Progress</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${activeProject.progressPercentage || activeProject.progressPercent || 0}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Milestones Roadmap */}
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                        Engineering Milestones & Deliverable Roadmap
                      </h3>

                      <div className="divide-y divide-slate-100 dark:divide-slate-800">
                        {activeProject.milestones && activeProject.milestones.length > 0 ? (
                          activeProject.milestones.map((m, idx) => (
                            <div key={m.id || idx} className="py-3.5 flex items-start justify-between gap-4 text-xs">
                              <div className="flex items-start gap-3">
                                <div
                                  className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                                    m.completed
                                      ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                                      : 'bg-slate-100 text-slate-400 dark:bg-slate-800'
                                  }`}
                                >
                                  {m.completed ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                                </div>
                                <div>
                                  <div className="font-bold text-slate-900 dark:text-slate-100">{m.title}</div>
                                  {m.description && (
                                    <div className="text-slate-500 dark:text-slate-400 mt-0.5">{m.description}</div>
                                  )}
                                  <div className="text-[11px] text-slate-400 font-mono mt-1">Due: {m.dueDate}</div>
                                </div>
                              </div>

                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  m.completed
                                    ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                                    : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                                }`}
                              >
                                {m.completed ? 'Delivered' : 'In Progress'}
                              </span>
                            </div>
                          ))
                        ) : (
                          <div className="py-6 text-center text-xs text-slate-400">
                            No milestone records configured.
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                    No active projects linked to this profile.
                  </div>
                )}
              </div>
            )}

            {/* 2. INVOICES & BILLING */}
            {clientTab === 'invoices' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Billing Statements & Invoices ({invoices.length})
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      View itemized milestone billings, pay outstanding amounts, or download statements.
                    </p>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {invoices.map((inv) => (
                    <div
                      key={inv.id}
                      className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-slate-900 dark:text-slate-100">
                            {inv.invoiceNumber}
                          </span>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              inv.status === 'Paid'
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                                : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                            }`}
                          >
                            {inv.status}
                          </span>
                        </div>
                        <div className="text-slate-600 dark:text-slate-300 font-semibold">
                          {inv.projectTitle || activeProject?.projectName || 'Milestone Retainer'}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono">
                          Issued: {inv.issuedDate} • Due: {inv.dueDate}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                            ${(inv.totalAmount || inv.amount).toLocaleString()}
                          </div>
                          <div className="text-[10px] text-slate-400">USD</div>
                        </div>

                        {inv.status === 'Pending' && (
                          <button
                            onClick={() => onPayInvoice(inv)}
                            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer transition-colors"
                          >
                            Pay Invoice
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. 24/7 SUPPORT DESK */}
            {clientTab === 'support' && (
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      24/7 SLA Engineering Support Desk
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Direct channel to Orbit-I lead architects, DevOps engineers, and sprint leads.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsCreatingTicket(!isCreatingTicket)}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{isCreatingTicket ? 'Cancel Ticket' : 'Open New Ticket'}</span>
                  </button>
                </div>

                {/* Open Ticket Form */}
                {isCreatingTicket && (
                  <form onSubmit={handleCreateTicket} className="p-5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Ticket Subject *
                        </label>
                        <input
                          type="text"
                          required
                          value={ticketSubject}
                          onChange={(e) => setTicketSubject(e.target.value)}
                          placeholder="e.g. Staging webhook verification keys"
                          className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Priority (SLA)
                        </label>
                        <select
                          value={ticketPriority}
                          onChange={(e) => setTicketPriority(e.target.value as any)}
                          className="w-full px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
                        >
                          <option value="Normal">Normal (SLA: 4 Hours)</option>
                          <option value="High">High (SLA: 1 Hour)</option>
                          <option value="Urgent">Urgent Blocker (SLA: 15 Mins)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Detailed Inquiries / Logs *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={ticketMessage}
                        onChange={(e) => setTicketMessage(e.target.value)}
                        placeholder="Provide relevant details, API endpoints, or reproduction steps..."
                        className="w-full px-3.5 py-2 text-xs rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setIsCreatingTicket(false)}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                      >
                        Submit Ticket
                      </button>
                    </div>
                  </form>
                )}

                {/* Tickets Thread Split View */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="space-y-2 max-h-[480px] overflow-y-auto">
                    {tickets.map((t) => (
                      <div
                        key={t.id}
                        onClick={() => setSelectedTicketId(t.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          selectedTicket?.id === t.id
                            ? 'bg-blue-50/50 dark:bg-blue-950/40 border-blue-500'
                            : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="font-semibold text-slate-900 dark:text-slate-100 truncate">
                            {t.subject}
                          </span>
                          <span
                            className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                              t.status === 'Resolved'
                                ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                                : 'bg-blue-50 text-blue-600 dark:bg-blue-950/60 dark:text-blue-400'
                            }`}
                          >
                            {t.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400">{t.createdAt}</div>
                      </div>
                    ))}
                  </div>

                  {/* Active Ticket Conversation */}
                  {selectedTicket ? (
                    <div className="lg:col-span-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                      <div className="border-b border-slate-200 dark:border-slate-800 pb-3 flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                            {selectedTicket.subject}
                          </h4>
                          <div className="text-[11px] text-slate-400">
                            Ticket #{selectedTicket.id} • {selectedTicket.priority} Priority
                          </div>
                        </div>
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                          {selectedTicket.status}
                        </span>
                      </div>

                      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 py-2">
                        {selectedTicket.messages.map((msg) => {
                          const isClient = msg.sender === 'client';
                          return (
                            <div
                              key={msg.id}
                              className={`p-3.5 rounded-xl text-xs space-y-1 ${
                                isClient
                                  ? 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 ml-6'
                                  : 'bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 mr-6'
                              }`}
                            >
                              <div className="flex items-center justify-between text-[10px]">
                                <span className="font-bold text-slate-700 dark:text-slate-300">
                                  {msg.senderName}
                                </span>
                                <span className="text-slate-400">{msg.timestamp}</span>
                              </div>
                              <div className="text-slate-700 dark:text-slate-200 whitespace-pre-wrap">
                                {msg.text}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <form onSubmit={handleSendTicketReply} className="pt-2 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                        <input
                          type="text"
                          value={replyMessage}
                          onChange={(e) => setReplyMessage(e.target.value)}
                          placeholder="Type follow-up response to the engineering team..."
                          className="flex-1 px-3.5 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:border-blue-500 focus:outline-none"
                        />
                        <button
                          type="submit"
                          disabled={!replyMessage.trim()}
                          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send</span>
                        </button>
                      </form>
                    </div>
                  ) : (
                    <div className="lg:col-span-2 p-12 text-center text-xs text-slate-400">
                      Select a support ticket to view conversation details.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 4. LIVE TELEMETRY */}
            {clientTab === 'telemetry' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                    <span className="text-xs text-slate-400 block mb-1">Contractual SLA Uptime</span>
                    <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">99.99%</div>
                    <div className="text-[10px] text-slate-500 mt-1">Multi-Region Redundancy Active</div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                    <span className="text-xs text-slate-400 block mb-1">Average Edge Latency</span>
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">32 ms</div>
                    <div className="text-[10px] text-slate-500 mt-1">Global Edge CDN Acceleration</div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                    <span className="text-xs text-slate-400 block mb-1">Automated QA CI/CD Pass</span>
                    <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">100%</div>
                    <div className="text-[10px] text-slate-500 mt-1">Regression Suites Verified</div>
                  </div>

                  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
                    <span className="text-xs text-slate-400 block mb-1">Database Cluster</span>
                    <div className="text-base font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 mt-1">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Synchronized</span>
                    </div>
                    <div className="text-[10px] text-slate-500 mt-1">Continuous Replication</div>
                  </div>
                </div>
              </div>
            )}

            {/* 5. DATA & EXPORTS */}
            {clientTab === 'data' && (
              <ClientDataTab
                project={activeProject}
                invoices={invoices}
                tickets={tickets}
              />
            )}
          </main>
        </div>
      </div>

      {/* Auth Modal for Client */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole="client"
        onLoginSuccess={(u) => {
          setAuthModalOpen(false);
        }}
      />
    </div>
  );
};

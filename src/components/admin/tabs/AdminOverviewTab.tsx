import React from 'react';
import {
  ShieldCheck,
  TrendingUp,
  Briefcase,
  Receipt,
  LifeBuoy,
  Users,
  Database,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Sparkles,
  Server
} from 'lucide-react';
import {
  ProjectTracking,
  InvoiceItem,
  InquiryLead,
  SupportTicket,
  SystemAuditLog,
  SiteSettings
} from '../../../types';

interface AdminOverviewTabProps {
  projects: ProjectTracking[];
  invoices: InvoiceItem[];
  leads: InquiryLead[];
  tickets: SupportTicket[];
  auditLogs: SystemAuditLog[];
  settings: SiteSettings;
  onNavigateTab: (tab: any) => void;
  onOpenNewProject: () => void;
  onOpenNewInvoice: () => void;
}

export const AdminOverviewTab: React.FC<AdminOverviewTabProps> = ({
  projects,
  invoices,
  leads,
  tickets,
  auditLogs,
  settings,
  onNavigateTab,
  onOpenNewProject,
  onOpenNewInvoice,
}) => {
  const totalRevenue = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((acc, curr) => acc + (curr.totalAmount || curr.amount), 0);

  const pendingRevenue = invoices
    .filter((i) => i.status === 'Pending')
    .reduce((acc, curr) => acc + (curr.totalAmount || curr.amount), 0);

  const activeProjectsCount = projects.filter(
    (p) => p.currentPhase !== 'Deployment' && p.progressPercentage < 100
  ).length;

  const openTicketsCount = tickets.filter((t) => t.status !== 'Resolved' && t.status !== 'Closed').length;
  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  return (
    <div id="admin-overview-panel" className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                SYSTEM OPERATIONAL
              </span>
              <span className="text-xs text-slate-400">Hostinger & Supabase Synced</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              Executive Command & Operations
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Centralized enterprise management for {settings.legalEntity}. Real-time leads, live projects, milestone deliverables, billing settlement, and audit logs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenNewProject}
              id="admin-quick-add-project"
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>New Client Project</span>
            </button>
            <button
              onClick={onOpenNewInvoice}
              id="admin-quick-add-invoice"
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Receipt className="w-3.5 h-3.5 text-cyan-400" />
              <span>Create Invoice</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Settled Revenue */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-colors">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium">Settled Revenue</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center gap-1.5">
            <span className="text-amber-400 font-semibold">${pendingRevenue.toLocaleString()}</span>
            <span>in pending invoicing</span>
          </div>
        </div>

        {/* Active Projects */}
        <div
          onClick={() => onNavigateTab('projects')}
          className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-blue-500/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium">Active Client Projects</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Briefcase className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {projects.length}
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span>{activeProjectsCount} in production</span>
            <span className="text-blue-400 flex items-center text-[11px] font-medium">
              Manage <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Inbound Leads */}
        <div
          onClick={() => onNavigateTab('leads')}
          className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-indigo-500/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium">Inbound CRM Leads</span>
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {leads.length}
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span className="text-emerald-400 font-semibold">{newLeadsCount} new awaiting response</span>
            <span className="text-indigo-400 flex items-center text-[11px] font-medium">
              View CRM <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Support Tickets */}
        <div
          onClick={() => onNavigateTab('tickets')}
          className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-purple-500/40 transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-3">
            <span className="font-medium">Engineering Support</span>
            <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
              <LifeBuoy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white tracking-tight">
            {tickets.length}
          </div>
          <div className="text-xs text-slate-400 mt-2 flex items-center justify-between">
            <span className={openTicketsCount > 0 ? 'text-amber-400 font-semibold' : 'text-emerald-400'}>
              {openTicketsCount} tickets open
            </span>
            <span className="text-purple-400 flex items-center text-[11px] font-medium">
              Open Desk <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>
      </div>

      {/* Main Dual Grid: Active Projects & Live Audit Trail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Client Projects Tracker */}
        <div className="lg:col-span-2 bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-bold text-white">Active Projects & Milestones</h3>
            </div>
            <button
              onClick={() => onNavigateTab('projects')}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
            >
              <span>View All Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 3).map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <span className="text-xs font-semibold text-white">
                      {proj.projectName || (proj as any).title}
                    </span>
                    <span className="text-xs text-slate-400 ml-2 font-mono">
                      ({proj.clientName})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        proj.healthStatus === 'Optimal'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {proj.healthStatus || 'Optimal'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">
                      {proj.progressPercentage}%
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-3">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                    style={{ width: `${proj.progressPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    Phase: <strong className="text-slate-300 font-semibold">{proj.currentPhase}</strong>
                  </span>
                  <span>
                    Budget: <strong className="text-slate-300">${proj.spentBudget.toLocaleString()}</strong> / ${proj.totalBudget.toLocaleString()}
                  </span>
                  <span>
                    {(proj.milestones || []).length} Milestones Recorded
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right 1 Col: Real-time System Audit Trail */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">System Audit Trail</h3>
            </div>
            <button
              onClick={() => onNavigateTab('audit')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
            >
              <span>Logs</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {auditLogs.slice(0, 6).map((log) => (
              <div
                key={log.id}
                className="p-2.5 rounded-lg bg-slate-950/40 border border-slate-800/60 text-xs space-y-1"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-semibold text-slate-400">{log.actor}</span>
                  <span className="font-mono">{log.timestamp.split(' ')[1] || log.timestamp}</span>
                </div>
                <div className="text-slate-300 text-[11px] leading-relaxed">
                  {log.action}
                </div>
                <div className="flex items-center justify-between text-[9px] pt-1">
                  <span className="px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 font-mono">
                    {log.category}
                  </span>
                  <span className="text-emerald-400 font-semibold">{log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

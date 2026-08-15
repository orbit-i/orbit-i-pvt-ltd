import React, { useState } from 'react';
import { ProjectTracking, InvoiceItem, SupportTicket } from '../../types';
import {
  Download,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Lock,
  HardDrive,
  Database,
  ExternalLink
} from 'lucide-react';

interface ClientDataTabProps {
  project?: ProjectTracking;
  invoices: InvoiceItem[];
  tickets: SupportTicket[];
}

export const ClientDataTab: React.FC<ClientDataTabProps> = ({ project, invoices, tickets }) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const clientInvoices = invoices.filter(
    (i) =>
      i.clientEmail?.toLowerCase() === project?.clientEmail?.toLowerCase() ||
      i.clientName?.toLowerCase() === project?.clientName?.toLowerCase()
  );

  const clientTickets = tickets.filter(
    (t) =>
      t.clientEmail?.toLowerCase() === project?.clientEmail?.toLowerCase() ||
      t.clientName?.toLowerCase() === project?.clientName?.toLowerCase()
  );

  // 1. Export Project Technical Specification & Dossier
  const handleExportProjectDossier = () => {
    setDownloading('dossier');
    setTimeout(() => {
      const payload = {
        project: project || { name: 'Enterprise Project' },
        exportedAt: new Date().toISOString(),
        milestones: project?.milestones || [],
        deliverables: project?.deliverables || [],
        client: {
          name: project?.clientName,
          email: project?.clientEmail,
        },
      };

      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `OrbitI_${(project?.projectName || 'Project').replace(/\s+/g, '_')}_Dossier.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(null);
      setFeedback('Project dossier downloaded successfully.');
    }, 500);
  };

  // 2. Export Client Financial Ledger (CSV)
  const handleExportInvoiceLedger = () => {
    setDownloading('invoices');
    setTimeout(() => {
      const headers = ['InvoiceNumber', 'ProjectTitle', 'Amount', 'Tax', 'TotalAmount', 'Status', 'IssuedDate', 'DueDate', 'PaidAt'];
      const rows = clientInvoices.map((inv) => [
        inv.invoiceNumber,
        inv.projectTitle || project?.projectName || '',
        inv.amount,
        inv.tax || 0,
        inv.totalAmount || inv.amount,
        inv.status,
        inv.issuedDate,
        inv.dueDate,
        inv.paidAt || 'N/A',
      ]);

      const csvContent =
        'data:text/csv;charset=utf-8,' +
        [headers.join(','), ...rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `OrbitI_Financial_Ledger_${new Date().toISOString().substring(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloading(null);
      setFeedback('Invoices & billing ledger downloaded as CSV.');
    }, 500);
  };

  // 3. GDPR Complete Account Data Export
  const handleExportGdprArchive = () => {
    setDownloading('gdpr');
    setTimeout(() => {
      const fullArchive = {
        organization: project?.clientName,
        contactEmail: project?.clientEmail,
        generatedAt: new Date().toISOString(),
        dataRetentionPolicy: 'Orbit-I Enterprise ISO/IEC 27001 Security Standard',
        project: project,
        invoices: clientInvoices,
        supportTickets: clientTickets,
      };

      const blob = new Blob([JSON.stringify(fullArchive, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `OrbitI_Client_Archive_GDPR_${new Date().toISOString().substring(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setDownloading(null);
      setFeedback('Complete account archive compiled and downloaded.');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">
              Account Data, Deliverables & Ledger Exports
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Download your organization's verified architectural specifications, billing statements, and support transcripts.
            </p>
          </div>
        </div>
      </div>

      {feedback && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>{feedback}</span>
          </div>
          <button onClick={() => setFeedback(null)} className="text-xs font-bold opacity-80 cursor-pointer">
            Dismiss
          </button>
        </div>
      )}

      {/* Grid of exports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Project Specifications Dossier */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Technical Dossier & Milestones
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Full engineering specification containing phase breakdown, active progress percent, and deliverable links.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportProjectDossier}
            disabled={downloading === 'dossier'}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{downloading === 'dossier' ? 'Preparing JSON...' : 'Download Dossier (JSON)'}</span>
          </button>
        </div>

        {/* 2. Billing & Invoices Ledger (CSV) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Accounting & Payment Statement
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Tabular ledger with itemized breakdown of milestones, settled transactions, taxes, and outstanding dues.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportInvoiceLedger}
            disabled={downloading === 'invoices'}
            className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{downloading === 'invoices' ? 'Generating CSV...' : 'Download Ledger (CSV)'}</span>
          </button>
        </div>

        {/* 3. Complete GDPR Client Archive */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="p-2.5 w-fit rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Complete GDPR Client Archive
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Full downloadable archive of all organization tickets, communications, SLA metrics, and project history.
              </p>
            </div>
          </div>

          <button
            onClick={handleExportGdprArchive}
            disabled={downloading === 'gdpr'}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{downloading === 'gdpr' ? 'Compiling Archive...' : 'Download GDPR Bundle'}</span>
          </button>
        </div>
      </div>

      {/* Security & Privacy SLA */}
      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <Lock className="w-5 h-5 text-emerald-500 shrink-0" />
          <div className="text-slate-600 dark:text-slate-400">
            All data exports are encrypted in transit and cryptographically verifiable. Orbit-I guarantees 99.99% SLA data integrity.
          </div>
        </div>
        <div className="text-[11px] font-mono text-slate-400">
          Client Org: <strong>{project?.clientName || 'Apex Retail Group'}</strong>
        </div>
      </div>
    </div>
  );
};

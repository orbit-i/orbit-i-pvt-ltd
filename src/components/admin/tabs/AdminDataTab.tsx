import React, { useState } from 'react';
import {
  Database,
  Download,
  Upload,
  RefreshCcw,
  FileSpreadsheet,
  FileCode,
  CheckCircle2,
  AlertTriangle,
  Server,
  Layers,
  ShieldAlert,
  HardDrive
} from 'lucide-react';
import {
  ServiceItem,
  ProductItem,
  BlogPost,
  CareerOpening,
  GalleryItem,
  CaseStudy,
  ProjectTracking,
  InvoiceItem,
  SupportTicket,
  InquiryLead,
  SiteSettings
} from '../../../types';

interface AdminDataTabProps {
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
  caseStudies: CaseStudy[];
  setCaseStudies?: React.Dispatch<React.SetStateAction<CaseStudy[]>>;
  projects: ProjectTracking[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectTracking[]>>;
  invoices: InvoiceItem[];
  setInvoices: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

export const AdminDataTab: React.FC<AdminDataTabProps> = ({
  services,
  setServices,
  products,
  setProducts,
  blogs,
  setBlogs,
  careers,
  setCareers,
  gallery,
  setGallery,
  caseStudies,
  setCaseStudies,
  projects,
  setProjects,
  invoices,
  setInvoices,
  settings,
  setSettings,
}) => {
  const [exporting, setExporting] = useState(false);
  const [importing, setImporting] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // 1. Export Entire Database as JSON
  const handleExportFullJson = async () => {
    setExporting(true);
    try {
      const res = await fetch('/api/data/export-all');
      const data = await res.json();

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `orbit_i_complete_backup_${new Date().toISOString().substring(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setFeedbackMsg({ type: 'success', text: 'Full database snapshot downloaded successfully as JSON.' });
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: 'Failed to generate JSON snapshot export.' });
    } finally {
      setExporting(false);
    }
  };

  // 2. CSV Exports for Individual Datasets
  const exportCsv = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${filename}_${new Date().toISOString().substring(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setFeedbackMsg({ type: 'success', text: `Exported ${filename}.csv successfully.` });
  };

  const handleExportInvoicesCsv = () => {
    const headers = ['InvoiceNumber', 'ClientName', 'ClientEmail', 'ProjectTitle', 'Amount', 'Status', 'DueDate', 'IssuedDate'];
    const rows = invoices.map((i) => [
      i.invoiceNumber,
      i.clientName,
      i.clientEmail,
      i.projectTitle || '',
      i.totalAmount || i.amount,
      i.status,
      i.dueDate,
      i.issuedDate,
    ]);
    exportCsv('orbit_i_invoices', headers, rows);
  };

  const handleExportProjectsCsv = () => {
    const headers = ['ProjectName', 'ClientName', 'ClientEmail', 'CurrentPhase', 'ProgressPercent', 'SpentBudget', 'TotalBudget', 'TargetLaunch'];
    const rows = projects.map((p) => [
      p.projectName || p.title || '',
      p.clientName,
      p.clientEmail,
      p.currentPhase,
      p.progressPercentage || p.progressPercent || 0,
      p.spentBudget,
      p.totalBudget,
      p.targetLaunchDate || p.targetDeadline || '',
    ]);
    exportCsv('orbit_i_projects', headers, rows);
  };

  const handleExportBlogsCsv = () => {
    const headers = ['Title', 'Slug', 'Category', 'Author', 'ReadTime', 'PublishedDate', 'Featured'];
    const rows = blogs.map((b) => [
      b.title,
      b.slug,
      b.category,
      b.author.name,
      b.readTime,
      b.publishedDate,
      b.featured ? 'Yes' : 'No',
    ]);
    exportCsv('orbit_i_blogs', headers, rows);
  };

  // 3. Import JSON Backup
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImporting(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        const res = await fetch('/api/data/import-all', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: json.data || json }),
        });
        const result = await res.json();

        if (result.success) {
          // Update local states
          const d = json.data || json;
          if (d.settings) setSettings(d.settings);
          if (d.services) setServices(d.services);
          if (d.products) setProducts(d.products);
          if (d.blogs) setBlogs(d.blogs);
          if (d.careers) setCareers(d.careers);
          if (d.gallery) setGallery(d.gallery);
          if (d.projects) setProjects(d.projects);
          if (d.invoices) setInvoices(d.invoices);
          setFeedbackMsg({ type: 'success', text: 'Backup restored and applied across all collections!' });
        } else {
          throw new Error(result.error);
        }
      } catch (err: any) {
        setFeedbackMsg({ type: 'error', text: 'Invalid JSON format or schema mismatch.' });
      } finally {
        setImporting(false);
      }
    };
    reader.readAsText(file);
  };

  // 4. Reset to Factory Seeds
  const handleFactoryReset = async () => {
    try {
      const res = await fetch('/api/data/reset-seeds', { method: 'POST' });
      const data = await res.json();

      if (data.success && data.data) {
        setSettings(data.data.settings);
        setServices(data.data.services);
        setProducts(data.data.products);
        setBlogs(data.data.blogs);
        setCareers(data.data.careers);
        setGallery(data.data.gallery);
        setProjects(data.data.projects);
        setInvoices(data.data.invoices);
        setResetConfirmOpen(false);
        setFeedbackMsg({ type: 'success', text: 'All system collections restored to pristine seed data!' });
      }
    } catch (err) {
      setFeedbackMsg({ type: 'error', text: 'Failed to reset database.' });
    }
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
              Database & State Management Center
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Export system backups, import recovery archives, generate tabular CSVs, or restore initial seed state.
            </p>
          </div>
        </div>
      </div>

      {/* Status Notifications */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-xl text-xs flex items-center justify-between border ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300'
              : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300'
          }`}
        >
          <div className="flex items-center gap-2">
            {feedbackMsg.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <AlertTriangle className="w-4 h-4" />
            )}
            <span>{feedbackMsg.text}</span>
          </div>
          <button
            onClick={() => setFeedbackMsg(null)}
            className="text-xs opacity-75 hover:opacity-100 cursor-pointer font-bold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Grid of Data Operations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Full JSON Backup & Export */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Full Database JSON Backup
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Download a self-contained snapshot of all CMS, CRM, and financial entities.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400 space-y-1">
            <div>• Includes: Services, Products, Blogs, Careers, Invoices, Projects, Logs & Site Settings</div>
            <div>• Format: Standard JSON Schema v1.0.0</div>
          </div>

          <button
            onClick={handleExportFullJson}
            disabled={exporting}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>{exporting ? 'Generating JSON Package...' : 'Export Complete JSON Archive'}</span>
          </button>
        </div>

        {/* 2. Import & Restore JSON Backup */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Restore Database from JSON
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Upload and apply a previously exported Orbit-I JSON database backup.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 text-xs text-slate-600 dark:text-slate-400">
            Select a verified `.json` file. All collections will update immediately upon parsing.
          </div>

          <label className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors">
            <Upload className="w-4 h-4" />
            <span>{importing ? 'Processing File...' : 'Choose JSON Backup File to Restore'}</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
              disabled={importing}
            />
          </label>
        </div>

        {/* 3. CSV Dataset Exports */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Export Specific Datasets (CSV)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Export targeted tables directly for Excel, Google Sheets, or BI tools.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
            <button
              onClick={handleExportInvoicesCsv}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors flex flex-col items-center gap-1.5 cursor-pointer text-center"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-500" />
              <span>Invoices Ledger ({invoices.length})</span>
            </button>
            <button
              onClick={handleExportProjectsCsv}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors flex flex-col items-center gap-1.5 cursor-pointer text-center"
            >
              <FileSpreadsheet className="w-4 h-4 text-blue-500" />
              <span>Projects Specs ({projects.length})</span>
            </button>
            <button
              onClick={handleExportBlogsCsv}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:border-blue-500 transition-colors flex flex-col items-center gap-1.5 cursor-pointer text-center"
            >
              <FileSpreadsheet className="w-4 h-4 text-indigo-500" />
              <span>Blog Articles ({blogs.length})</span>
            </button>
          </div>
        </div>

        {/* 4. Factory Reset / Initial Seeds */}
        <div className="bg-white dark:bg-slate-900 border border-rose-200 dark:border-rose-900/40 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                Factory Seed Data Reset
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Restore all services, products, blogs, projects, and invoices to initial demo seeds.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 text-xs text-rose-700 dark:text-rose-400">
            Use with caution. This overwrites customized items with the pristine baseline schema.
          </div>

          <button
            onClick={() => setResetConfirmOpen(true)}
            className="w-full py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RefreshCcw className="w-4 h-4" />
            <span>Reset Database to Initial Seeds</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 space-y-4 shadow-2xl text-slate-900 dark:text-slate-100">
            <div className="flex items-center gap-3 text-rose-600">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="text-base font-bold">Confirm Database Factory Reset</h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              This will re-initialize all collections (Services, Products, Blogs, Projects, Invoices, Careers) to default factory demo records. Are you sure you want to continue?
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleFactoryReset}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-500 text-white cursor-pointer"
              >
                Yes, Reset All Seeds
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

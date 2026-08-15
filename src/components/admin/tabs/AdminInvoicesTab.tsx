import React, { useState } from 'react';
import {
  Receipt,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Download,
  DollarSign,
  Send,
  X,
  CreditCard,
  Building
} from 'lucide-react';
import { InvoiceItem } from '../../../types';

interface AdminInvoicesTabProps {
  invoices: InvoiceItem[];
  setInvoices: React.Dispatch<React.SetStateAction<InvoiceItem[]>>;
}

export const AdminInvoicesTab: React.FC<AdminInvoicesTabProps> = ({
  invoices,
  setInvoices,
}) => {
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);

  const [form, setForm] = useState({
    clientName: '',
    clientEmail: '',
    projectTitle: '',
    amount: 2500,
    dueDate: '2026-09-01',
    notes: 'Payment due on milestone delivery verification.',
  });

  const totalSettled = invoices
    .filter((i) => i.status === 'Paid')
    .reduce((acc, curr) => acc + (curr.totalAmount || curr.amount), 0);

  const totalPending = invoices
    .filter((i) => i.status === 'Pending')
    .reduce((acc, curr) => acc + (curr.totalAmount || curr.amount), 0);

  const handleCreateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName || !form.projectTitle) return;

    const amount = Number(form.amount || 0);
    const tax = Math.round(amount * 0.05);
    const totalAmount = amount + tax;
    const invoiceNumber = `INV-ORB-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`;

    const newInv: InvoiceItem = {
      id: `inv-${Date.now()}`,
      invoiceNumber,
      clientName: form.clientName,
      clientEmail: form.clientEmail || `${form.clientName.toLowerCase().replace(/\s+/g, '')}@client.io`,
      projectTitle: form.projectTitle,
      amount,
      tax,
      totalAmount,
      status: 'Pending',
      issuedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      dueDate: form.dueDate,
      lineItems: [
        {
          id: `li-1`,
          description: `${form.projectTitle} — Milestone Retainer`,
          rate: amount,
          quantity: 1,
          total: amount,
        },
      ],
    };

    setInvoices((prev) => [newInv, ...prev]);
    setIsCreatingInvoice(false);
    setForm({
      clientName: '',
      clientEmail: '',
      projectTitle: '',
      amount: 2500,
      dueDate: '2026-09-01',
      notes: 'Payment due on milestone delivery verification.',
    });

    try {
      await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newInv),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'Paid' ? 'Pending' : 'Paid';
    const paidAt = nextStatus === 'Paid' ? new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : undefined;

    setInvoices((prev) =>
      prev.map((i) => (i.id === id ? { ...i, status: nextStatus as any, paidAt } : i))
    );
  };

  const handleDeleteInvoice = async (id: string) => {
    if (confirm('Delete this invoice permanently?')) {
      setInvoices((prev) => prev.filter((i) => i.id !== id));
      try {
        await fetch(`/api/invoices/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div id="admin-invoices-panel" className="space-y-6">
      {/* Header & Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Receipt className="w-5 h-5 text-cyan-400" />
            Financials, Billing & Invoicing Engine
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Automated milestone invoice generation, status reconciliation, VAT/Tax accounting, and client settlement records.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingInvoice(!isCreatingInvoice)}
          id="btn-create-invoice-top"
          className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {isCreatingInvoice ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isCreatingInvoice ? 'Cancel' : 'Generate New Invoice'}</span>
        </button>
      </div>

      {/* Revenue Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Total Settled Invoices</span>
          <div className="text-2xl font-bold text-emerald-400">${totalSettled.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-1">
            {invoices.filter((i) => i.status === 'Paid').length} paid invoices
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Pending Client Receivables</span>
          <div className="text-2xl font-bold text-amber-400">${totalPending.toLocaleString()}</div>
          <div className="text-[10px] text-slate-500 mt-1">
            {invoices.filter((i) => i.status === 'Pending').length} pending settlement
          </div>
        </div>

        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
          <span className="text-xs text-slate-400 block mb-1">Total Enterprise Volume</span>
          <div className="text-2xl font-bold text-white">
            ${(totalSettled + totalPending).toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500 mt-1">{invoices.length} total generated invoices</div>
        </div>
      </div>

      {/* New Invoice Form */}
      {isCreatingInvoice && (
        <form
          onSubmit={handleCreateInvoice}
          className="bg-slate-900 border border-cyan-500/30 rounded-xl p-6 space-y-4 shadow-xl"
        >
          <div className="text-sm font-bold text-cyan-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Plus className="w-4 h-4" /> Issue New Milestone Invoice
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Client Entity / Org *</label>
              <input
                type="text"
                required
                value={form.clientName}
                onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                placeholder="e.g. Apex Health Systems"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Client Billing Email</label>
              <input
                type="email"
                value={form.clientEmail}
                onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                placeholder="finance@apexhealth.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Project Milestone Title *</label>
              <input
                type="text"
                required
                value={form.projectTitle}
                onChange={(e) => setForm({ ...form, projectTitle: e.target.value })}
                placeholder="e.g. Phase 2: RAG Pipeline Integration"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Base Amount ($) *</label>
              <input
                type="number"
                required
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Calculated Total (w/ 5% Tax)</label>
              <div className="px-3 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs text-emerald-400 font-bold">
                ${Math.round(form.amount * 1.05).toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreatingInvoice(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-md shadow-cyan-600/30"
            >
              Issue Invoice to Ledger
            </button>
          </div>
        </form>
      )}

      {/* Invoices Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Client & Project</th>
                <th className="py-3 px-4">Issued / Due</th>
                <th className="py-3 px-4">Total Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-white">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-200">{inv.clientName}</div>
                    <div className="text-[11px] text-slate-400">{inv.projectTitle}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400">
                    <div>Issued: {inv.issuedDate}</div>
                    <div className="text-[10px] text-slate-500">Due: {inv.dueDate}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-white">
                      ${(inv.totalAmount || inv.amount).toLocaleString()}
                    </div>
                    {inv.tax && (
                      <div className="text-[10px] text-slate-500">Includes ${inv.tax} tax</div>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(inv.id, inv.status)}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-colors ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20'
                      }`}
                      title="Click to toggle status"
                    >
                      {inv.status} {inv.paidAt && `(${inv.paidAt})`}
                    </button>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDeleteInvoice(inv.id)}
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        title="Delete Invoice"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Users,
  Mail,
  Phone,
  Building,
  Sparkles,
  CheckCircle2,
  Clock,
  Send,
  Loader2,
  Trash2,
  FileText,
  Copy,
  Check
} from 'lucide-react';
import { InquiryLead } from '../../../types';

interface AdminLeadsTabProps {
  leads: InquiryLead[];
  setLeads: React.Dispatch<React.SetStateAction<InquiryLead[]>>;
}

export const AdminLeadsTab: React.FC<AdminLeadsTabProps> = ({
  leads,
  setLeads,
}) => {
  const [selectedLead, setSelectedLead] = useState<InquiryLead | null>(leads[0] || null);
  const [draftingAi, setDraftingAi] = useState(false);
  const [aiProposal, setAiProposal] = useState<any>(null);
  const [copiedProposal, setCopiedProposal] = useState(false);

  const handleUpdateStatus = (id: string, status: InquiryLead['status']) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const handleDeleteLead = (id: string) => {
    if (confirm('Delete this CRM lead?')) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
      if (selectedLead?.id === id) {
        setSelectedLead(leads.find((l) => l.id !== id) || null);
      }
    }
  };

  const handleGenerateAiProposal = async (lead: InquiryLead) => {
    setDraftingAi(true);
    setAiProposal(null);
    try {
      const res = await fetch('/api/ai/draft-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadName: lead.fullName,
          company: lead.companyName,
          serviceCategory: lead.serviceCategory,
          budget: lead.budgetRange,
          timeline: lead.timeline,
          details: lead.projectDetails,
        }),
      });
      const data = await res.json();
      setAiProposal(data);
    } catch (err) {
      console.error(err);
    } finally {
      setDraftingAi(false);
    }
  };

  const handleCopyProposal = () => {
    if (!aiProposal) return;
    const text = `Subject: ${aiProposal.proposalSubject}\n\n${aiProposal.executiveSummary}\n\nKey Milestones:\n${(aiProposal.proposedMilestones || []).map((m: any) => `- ${m.phase} (${m.duration}): $${m.cost}`).join('\n')}\n\nEstimated Total: ${aiProposal.estimatedTotal}`;
    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  return (
    <div id="admin-leads-crm" className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-400" />
            CRM Pipeline & Inbound Client Inquiries
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Review incoming project leads from the Website Form and AI Cost Estimator, update CRM stage, and generate AI proposals.
          </p>
        </div>

        <div className="text-xs text-slate-400">
          Total Inbound Inquiries: <strong className="text-white">{leads.length}</strong>
        </div>
      </div>

      {/* Grid: Leads List & Detail / AI Proposal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Leads List */}
        <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Pipeline Leads
          </div>

          <div className="space-y-2 max-h-[580px] overflow-y-auto pr-1">
            {leads.map((lead) => {
              const isSelected = selectedLead?.id === lead.id;
              return (
                <div
                  key={lead.id}
                  onClick={() => {
                    setSelectedLead(lead);
                    setAiProposal(null);
                  }}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-indigo-950/40 border-indigo-500/50 shadow-md'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-white">{lead.fullName}</span>
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                        lead.status === 'New'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : lead.status === 'Proposal Sent'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : lead.status === 'Closed Won'
                          ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>

                  <div className="text-[11px] text-slate-400">
                    {lead.companyName || 'Private Inquiry'} • <span className="text-slate-300">{lead.serviceCategory}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-between font-mono">
                    <span>{lead.budgetRange}</span>
                    <span>{lead.createdAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right 2 Columns: Lead Details & AI Proposal Generator */}
        {selectedLead ? (
          <div className="lg:col-span-2 space-y-4">
            {/* Lead Card */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-base font-bold text-white">{selectedLead.fullName}</h3>
                  <div className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                    <span className="flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-500" />
                      {selectedLead.companyName || 'Independent'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 font-mono">
                      <Mail className="w-3.5 h-3.5 text-slate-500" />
                      {selectedLead.email}
                    </span>
                    {selectedLead.phone && (
                      <>
                        <span>•</span>
                        <span className="flex items-center gap-1 font-mono">
                          <Phone className="w-3.5 h-3.5 text-slate-500" />
                          {selectedLead.phone}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedLead.status}
                    onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as any)}
                    className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white"
                  >
                    <option value="New">Status: New</option>
                    <option value="Contacted">Status: Contacted</option>
                    <option value="Proposal Sent">Status: Proposal Sent</option>
                    <option value="Closed Won">Status: Closed Won</option>
                    <option value="Archived">Status: Archived</option>
                  </select>
                  <button
                    onClick={() => handleDeleteLead(selectedLead.id)}
                    className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-lg"
                    title="Delete lead"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Lead Scope Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 text-xs">
                <div>
                  <span className="text-slate-500 block">Service Requested</span>
                  <span className="font-semibold text-slate-200">{selectedLead.serviceCategory}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Target Budget</span>
                  <span className="font-semibold text-slate-200">{selectedLead.budgetRange}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Target Timeline</span>
                  <span className="font-semibold text-slate-200">{selectedLead.timeline}</span>
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-400 block mb-1">Client Project Notes & Specs</span>
                <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  {selectedLead.projectDetails}
                </div>
              </div>

              {/* Action: Generate AI Proposal */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleGenerateAiProposal(selectedLead)}
                  disabled={draftingAi}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/20 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {draftingAi ? (
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                  ) : (
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                  )}
                  <span>{draftingAi ? 'Drafting Enterprise Proposal...' : 'Generate AI Proposal Scope'}</span>
                </button>
              </div>
            </div>

            {/* AI Generated Proposal Card */}
            {aiProposal && (
              <div className="bg-slate-900/90 border border-indigo-500/40 rounded-xl p-5 space-y-4 shadow-xl animate-fadeIn">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      AI Generated Technical Proposal
                    </span>
                  </div>
                  <button
                    onClick={handleCopyProposal}
                    className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedProposal ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedProposal ? 'Copied to Clipboard' : 'Copy Proposal Text'}</span>
                  </button>
                </div>

                <div className="text-xs space-y-3">
                  <div>
                    <span className="text-slate-500 block font-medium">Subject Line</span>
                    <div className="font-bold text-slate-200 mt-0.5">{aiProposal.proposalSubject}</div>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-medium">Executive Summary</span>
                    <p className="text-slate-300 leading-relaxed mt-0.5">{aiProposal.executiveSummary}</p>
                  </div>

                  <div>
                    <span className="text-slate-500 block font-medium mb-1.5">Proposed Implementation Phases</span>
                    <div className="space-y-1.5">
                      {(aiProposal.proposedMilestones || []).map((m: any, idx: number) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                        >
                          <span className="font-medium text-slate-300">{m.phase}</span>
                          <div className="flex items-center gap-3 text-slate-400">
                            <span>{m.duration}</span>
                            <span className="font-bold text-emerald-400">${m.cost}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 text-xs">
                    <span className="text-slate-400">
                      Recommended Stack:{' '}
                      <strong className="text-slate-200">
                        {Array.isArray(aiProposal.techRecommendation)
                          ? aiProposal.techRecommendation.join(', ')
                          : 'React, Node.js, Python, PostgreSQL'}
                      </strong>
                    </span>
                    <span className="text-slate-400">
                      Total Estimated Budget:{' '}
                      <strong className="text-emerald-400 text-sm font-bold">
                        {aiProposal.estimatedTotal}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-2 bg-slate-900/40 border border-slate-800 rounded-xl p-12 text-center text-slate-500 text-xs">
            Select a lead from the left to view requirements and generate tailored proposals.
          </div>
        )}
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Sparkles,
  X,
  CheckCircle2,
  DollarSign,
  Clock,
  Code2,
  Layers,
  ArrowRight,
  Send,
  Loader2
} from 'lucide-react';

interface AiCostEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  onLeadSubmitted?: (lead: any) => void;
}

export const AiCostEstimator: React.FC<AiCostEstimatorProps> = ({
  isOpen,
  onClose,
  onLeadSubmitted,
}) => {
  const [serviceCategory, setServiceCategory] = useState('Enterprise AI & Machine Learning');
  const [description, setDescription] = useState('');
  const [targetBudget, setTargetBudget] = useState('$5,000 - $15,000');
  const [timelinePref, setTimelinePref] = useState('1-2 Months');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [estimation, setEstimation] = useState<{
    costRange: string;
    timeline: string;
    recommendedStack: string[];
    keyPhases: string[];
    roiInsight: string;
  } | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleGenerateEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setLoading(true);
    try {
      const res = await fetch('/api/ai/estimate-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          description,
          serviceType: serviceCategory,
          targetBudget,
          timelinePref,
        }),
      });
      const data = await res.json();
      setEstimation(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSendInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientEmail || !clientName) return;

    try {
      const payload = {
        fullName: clientName,
        email: clientEmail,
        serviceCategory,
        budgetRange: estimation?.costRange || targetBudget,
        timeline: estimation?.timeline || timelinePref,
        projectDetails: `${description}\n\n[AI Estimator Analysis]: Stack: ${estimation?.recommendedStack.join(', ')} | ROI: ${estimation?.roiInsight}`,
        source: 'AI Cost Estimator Tool',
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (onLeadSubmitted) onLeadSubmitted(data.lead);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-gradient-to-r from-blue-900/50 via-indigo-900/40 to-slate-900 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-600/30 border border-blue-500/40 text-cyan-300">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Orbit-I AI Project Estimator
              </h3>
              <p className="text-xs text-slate-400">
                Instant scope breakdown, technology stack recommendation & cost analysis
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!estimation ? (
            <form onSubmit={handleGenerateEstimate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Service Category
                </label>
                <select
                  value={serviceCategory}
                  onChange={(e) => setServiceCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option>Enterprise AI & Machine Learning</option>
                  <option>High-Performance Web & Mobile Apps</option>
                  <option>Python Scripting & Robotic Automation</option>
                  <option>Brand Identity, Graphics & 3D UI/UX</option>
                  <option>Custom SaaS & Digital Product Engineering</option>
                  <option>High-ROI Digital Marketing & Growth SEO</option>
                  <option>Cloud Infrastructure & Database Engineering (MySQL/Hostinger/Supabase)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Describe Your Project Requirements
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="e.g. We want to build an automated AI customer lead qualifier with a React dashboard, Python web scraper for market prices, and integration with our Hostinger MySQL database..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Budget Range
                  </label>
                  <select
                    value={targetBudget}
                    onChange={(e) => setTargetBudget(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>&lt; $3,000 (Sprint / Prototype)</option>
                    <option>$3,000 - $8,000 (Standard MVP)</option>
                    <option>$8,000 - $20,000 (Enterprise Solution)</option>
                    <option>$20,000+ (Custom Platform Architecture)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Target Launch Timeline
                  </label>
                  <select
                    value={timelinePref}
                    onChange={(e) => setTimelinePref(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-white focus:outline-none focus:border-blue-500"
                  >
                    <option>Urgent (1-2 Weeks Sprint)</option>
                    <option>Standard (3-5 Weeks)</option>
                    <option>Comprehensive (2-3 Months)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !description.trim()}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                    <span>Gemini AI Architect is Analyzing Project Scope...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-cyan-300" />
                    <span>Generate Instant Technical Scope & Estimate</span>
                  </>
                )}
              </button>
            </form>
          ) : submitted ? (
            <div className="py-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-white">Proposal Successfully Dispatched!</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                An Orbit-I Principal Architect will review your AI estimate and contact you at <span className="text-cyan-400 font-semibold">{clientEmail}</span> within 4 business hours.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
              >
                Close Window
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Estimation Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <DollarSign className="w-4 h-4 text-emerald-400" />
                    <span>Estimated Investment</span>
                  </div>
                  <div className="text-lg font-extrabold text-white text-emerald-400">
                    {estimation.costRange}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                    <Clock className="w-4 h-4 text-cyan-400" />
                    <span>Delivery Timeline</span>
                  </div>
                  <div className="text-lg font-extrabold text-white text-cyan-400">
                    {estimation.timeline}
                  </div>
                </div>
              </div>

              {/* Recommended Tech Stack */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Code2 className="w-4 h-4 text-blue-400" />
                  <span>Recommended Technology Architecture:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {(estimation.recommendedStack || []).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-blue-950/40 border border-blue-800/60 text-[11px] font-medium text-blue-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Phased Roadmap */}
              <div>
                <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <span>Execution Roadmap:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {(estimation.keyPhases || []).map((phase, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-slate-800 text-[10px] flex items-center justify-center text-slate-400 shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <span>{phase}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* ROI Note */}
              <div className="p-3 rounded-xl bg-indigo-950/30 border border-indigo-800/40 text-xs text-indigo-200">
                <span className="font-semibold text-indigo-300">Architect ROI Insight: </span>
                {estimation.roiInsight}
              </div>

              {/* Fast Track Consultation Form */}
              <form onSubmit={handleSendInquiry} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-white">
                  Lock in this Estimate & Book Free Tech Consultation
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <input
                    type="text"
                    required
                    placeholder="Your Full Name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                  <input
                    type="email"
                    required
                    placeholder="Work Email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Proposal to Orbit-I Engineers</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setEstimation(null)}
                    className="px-3 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
                  >
                    Recalculate
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

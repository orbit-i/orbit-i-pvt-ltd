import React, { useState } from 'react';
import { CaseStudyItem } from '../../../types';
import {
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Layers,
  Search,
  ExternalLink,
  Briefcase,
  Eye
} from 'lucide-react';
import { apiFetch } from '../../../lib/apiClient';

interface AdminFeaturedWorkTabProps {
  caseStudies: CaseStudyItem[];
  setCaseStudies: React.Dispatch<React.SetStateAction<CaseStudyItem[]>>;
}

export const AdminFeaturedWorkTab: React.FC<AdminFeaturedWorkTabProps> = ({
  caseStudies,
  setCaseStudies,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCase, setEditingCase] = useState<CaseStudyItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const filteredCaseStudies = caseStudies.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const persistCaseStudies = async (updated: CaseStudyItem[]) => {
    setCaseStudies(updated);
    setSaveStatus('saving');
    try {
      await apiFetch('/api/content/caseStudies', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this case study from the portfolio?')) {
      const updated = caseStudies.filter((c) => c.id !== id);
      persistCaseStudies(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCase || !editingCase.title.trim()) return;

    let updated: CaseStudyItem[];
    if (isAdding) {
      const newCase: CaseStudyItem = {
        ...editingCase,
        id: `cs-${Date.now()}`,
      };
      updated = [newCase, ...caseStudies];
    } else {
      updated = caseStudies.map((c) => (c.id === editingCase.id ? editingCase : c));
    }

    persistCaseStudies(updated);
    setEditingCase(null);
    setIsAdding(false);
  };

  return (
    <div id="admin-featured-work-manager" className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Briefcase className="w-4 h-4" />
            <span>Portfolio CMS</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Featured Work & Case Studies</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Publish client architecture breakdowns, quantifiable deliverables, performance metrics, and project images.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus === 'saved' && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Synced Live</span>
            </span>
          )}

          <button
            onClick={() => {
              setEditingCase({
                id: '',
                title: '',
                client: '',
                industry: 'Enterprise SaaS',
                summary: '',
                challenge: '',
                solution: '',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
                technologies: ['React', 'Node.js', 'PostgreSQL'],
                metrics: [{ label: 'Efficiency Gain', value: '+45%' }],
                featured: true,
              });
              setIsAdding(true);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Case Study</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search case studies by client, title, industry..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Case Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCaseStudies.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-full h-40 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                  {item.industry}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">{item.client}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {item.technologies && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {item.technologies.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] text-slate-400 font-mono border border-slate-800"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-2">
              <span className="text-[10px] text-slate-500 font-mono">ID: {item.id}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setEditingCase(item);
                    setIsAdding(false);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editingCase && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              {isAdding ? 'Add Featured Case Study' : `Edit Case Study: ${editingCase.title}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingCase.title}
                    onChange={(e) => setEditingCase({ ...editingCase, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Client Name</label>
                  <input
                    type="text"
                    required
                    value={editingCase.client}
                    onChange={(e) => setEditingCase({ ...editingCase, client: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Industry</label>
                  <input
                    type="text"
                    required
                    value={editingCase.industry}
                    onChange={(e) => setEditingCase({ ...editingCase, industry: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingCase.image}
                    onChange={(e) => setEditingCase({ ...editingCase, image: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Executive Summary</label>
                <textarea
                  rows={2}
                  required
                  value={editingCase.summary}
                  onChange={(e) => setEditingCase({ ...editingCase, summary: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">The Challenge</label>
                <textarea
                  rows={2}
                  value={editingCase.challenge}
                  onChange={(e) => setEditingCase({ ...editingCase, challenge: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Our Engineering Solution</label>
                <textarea
                  rows={2}
                  value={editingCase.solution}
                  onChange={(e) => setEditingCase({ ...editingCase, solution: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingCase.technologies ? editingCase.technologies.join(', ') : ''}
                  onChange={(e) =>
                    setEditingCase({
                      ...editingCase,
                      technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Save Case Study
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

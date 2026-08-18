import React, { useState } from 'react';
import { SiteSettings, HomePageContent, TestimonialItem } from '../../../types';
import {
  Sparkles,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Layout,
  MessageSquare,
  BarChart3,
  Star,
  Edit2,
  RefreshCw,
  Eye
} from 'lucide-react';
import { apiFetch } from '../../../lib/apiClient';

interface AdminHomePageTabProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

export const AdminHomePageTab: React.FC<AdminHomePageTabProps> = ({
  settings,
  setSettings,
}) => {
  const currentHome: HomePageContent = settings.homeContent || {
    heroHeadline: 'Custom Software & Technology Solutions for Modern Businesses',
    heroSubtitle: 'We design, engineer, and deploy high-performance software applications, web platforms, and tailored technical systems.',
    heroBadge: 'Software & Technology Services',
    stats: [
      { label: 'Enterprise Deployments', value: '150+', desc: 'Production systems worldwide' },
      { label: 'System Uptime SLA', value: '99.99%', desc: 'High-availability infrastructure' },
      { label: 'Client Value Generated', value: '$18M+', desc: 'Measurable client impact' },
      { label: 'Average API Latency', value: '<25ms', desc: 'Edge accelerated routing' },
    ],
    testimonials: [
      {
        id: 'test-1',
        quote: 'Orbit-I overhauled our entire inventory sync with automated Python workers connected to Hostinger MySQL. They delivered ahead of schedule with zero downtime.',
        author: 'Marcus Vance',
        role: 'CTO',
        company: 'Vance Logistics Global',
        rating: 5,
      },
      {
        id: 'test-2',
        quote: 'The AI multi-agent customer pipeline built by Orbit-I reduced our response times by 80% while dramatically improving resolution quality.',
        author: 'Dr. Sarah Lin',
        role: 'Head of Engineering',
        company: 'HealthCore Systems',
        rating: 5,
      },
    ],
  };

  const [formData, setFormData] = useState<HomePageContent>(currentHome);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const [editingTestimonial, setEditingTestimonial] = useState<TestimonialItem | null>(null);
  const [isAddingTestimonial, setIsAddingTestimonial] = useState(false);

  const handleSave = async () => {
    setSaveStatus('saving');
    const updatedSettings = {
      ...settings,
      homeContent: formData,
    };
    setSettings(updatedSettings);

    try {
      await apiFetch('/api/content/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings),
      });
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err) {
      console.error(err);
      setSaveStatus('error');
    }
  };

  const handleStatChange = (index: number, field: 'label' | 'value' | 'desc', val: string) => {
    const newStats = [...formData.stats];
    newStats[index] = { ...newStats[index], [field]: val };
    setFormData({ ...formData, stats: newStats });
  };

  const handleDeleteTestimonial = (id: string) => {
    const newTestimonials = formData.testimonials.filter((t) => t.id !== id);
    setFormData({ ...formData, testimonials: newTestimonials });
  };

  const handleSaveTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimonial || !editingTestimonial.quote.trim()) return;

    if (isAddingTestimonial) {
      setFormData({
        ...formData,
        testimonials: [...formData.testimonials, { ...editingTestimonial, id: `test-${Date.now()}` }],
      });
    } else {
      setFormData({
        ...formData,
        testimonials: formData.testimonials.map((t) =>
          t.id === editingTestimonial.id ? editingTestimonial : t
        ),
      });
    }

    setEditingTestimonial(null);
    setIsAddingTestimonial(false);
  };

  return (
    <div id="admin-home-page-manager" className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Layout className="w-4 h-4" />
            <span>Page Management</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Home Page CMS</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Customize the primary landing headline, badge tag, enterprise stats, and verified client testimonials.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer self-start sm:self-auto"
        >
          {saveStatus === 'saving' ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Saving...</span>
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Published Live!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save & Publish Live</span>
            </>
          )}
        </button>
      </div>

      {/* 1. Hero Section Content */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Hero Banner & Taglines</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Hero Top Badge
            </label>
            <input
              type="text"
              value={formData.heroBadge}
              onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
              placeholder="e.g. Software & Technology Services"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Main Headline (H1)
            </label>
            <input
              type="text"
              value={formData.heroHeadline}
              onChange={(e) => setFormData({ ...formData, heroHeadline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
              placeholder="e.g. Custom Software & Technology Solutions for Modern Businesses"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">
              Subheadline / Description
            </label>
            <textarea
              rows={3}
              value={formData.heroSubtitle}
              onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
              placeholder="We design, engineer, and deploy high-performance software applications..."
            />
          </div>
        </div>
      </div>

      {/* 2. Key Performance Metrics */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <BarChart3 className="w-4 h-4 text-emerald-400" />
          <span>Key Metrics & Counters</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {formData.stats.map((stat, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Stat #{idx + 1}
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Value (e.g. 150+)</label>
                <input
                  type="text"
                  value={stat.value}
                  onChange={(e) => handleStatChange(idx, 'value', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 font-mono font-bold text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Label</label>
                <input
                  type="text"
                  value={stat.label}
                  onChange={(e) => handleStatChange(idx, 'label', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-[10px] text-slate-400 mb-1">Short Description</label>
                <input
                  type="text"
                  value={stat.desc}
                  onChange={(e) => handleStatChange(idx, 'desc', e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-[11px] focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Client Testimonials */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <MessageSquare className="w-4 h-4 text-purple-400" />
            <span>Featured Client Quotes & Testimonials</span>
          </div>

          <button
            onClick={() => {
              setEditingTestimonial({
                id: '',
                quote: '',
                author: '',
                role: 'CTO',
                company: '',
                rating: 5,
              });
              setIsAddingTestimonial(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Testimonial</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.testimonials.map((test) => (
            <div
              key={test.id}
              className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 relative group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(test.rating || 5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                  ))}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => {
                      setEditingTestimonial(test);
                      setIsAddingTestimonial(false);
                    }}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(test.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-300 italic leading-relaxed">
                "{test.quote}"
              </p>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{test.author}</div>
                  <div className="text-[11px] text-slate-400">{test.role}, {test.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Modal */}
      {editingTestimonial && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              {isAddingTestimonial ? 'Add Client Testimonial' : 'Edit Testimonial'}
            </h3>

            <form onSubmit={handleSaveTestimonial} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Quote</label>
                <textarea
                  required
                  rows={3}
                  value={editingTestimonial.quote}
                  onChange={(e) => setEditingTestimonial({ ...editingTestimonial, quote: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  placeholder="What did the client say?"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Author Name</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.author}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, author: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Marcus Vance"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.company}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, company: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Vance Global"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Role / Designation</label>
                  <input
                    type="text"
                    required
                    value={editingTestimonial.role}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    placeholder="e.g. CTO"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={editingTestimonial.rating}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

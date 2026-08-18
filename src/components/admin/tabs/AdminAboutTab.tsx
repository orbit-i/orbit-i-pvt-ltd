import React, { useState } from 'react';
import { SiteSettings, AboutPageContent, TeamMember, MilestoneItem } from '../../../types';
import {
  Info,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  Users,
  Target,
  Eye,
  Award,
  Edit2,
  RefreshCw,
  Clock,
  Sparkles
} from 'lucide-react';
import { INITIAL_SETTINGS } from '../../../data/initialData';
import { apiFetch } from '../../../lib/apiClient';

interface AdminAboutTabProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

export const AdminAboutTab: React.FC<AdminAboutTabProps> = ({
  settings,
  setSettings,
}) => {
  const currentAbout: AboutPageContent = settings.aboutContent || INITIAL_SETTINGS.aboutContent || {
    headline: 'Where Radical Engineering Meets Intelligent Automation',
    subtitle: `${settings.legalEntity} is a modern enterprise technology company. We build high-impact AI models, web platforms, Python automations, graphics, and custom digital products that drive quantifiable business growth.`,
    mission: 'To eliminate repetitive digital toil and equip ambitious enterprises with autonomous AI agents, resilient software architectures, and intuitive 3D interfaces that operate with flawless precision.',
    vision: 'To be the global benchmark for autonomous software engineering, bridging human creativity with algorithmic automation across Web, AI, and Cloud infrastructure.',
    teamMembers: [
      {
        name: 'Samad Rind',
        role: 'Founder & Chief AI Architect',
        bio: 'Pioneering multi-agent LLM systems, enterprise Python automation, and low-latency cloud architectures.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        badge: 'Leadership',
      },
    ],
    milestones: [
      { year: '2021', title: 'Orbit-I Inception', desc: 'Founded with a singular mission to eradicate manual enterprise inefficiencies through Python automation.' },
    ],
    values: [
      { title: 'Zero Compromise Code Quality', desc: 'Every component and endpoint is stress-tested, type-safe, and architected for high concurrency.' },
      { title: 'Full Transparency', desc: 'Direct client access to milestone progress, automated invoices, and sprint deliverables.' },
    ],
  };

  const [formData, setFormData] = useState<AboutPageContent>(currentAbout);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Modal states for Team Member
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isAddingMember, setIsAddingMember] = useState(false);
  const [editingMemberIndex, setEditingMemberIndex] = useState<number>(-1);

  // Modal states for Milestone
  const [editingMilestone, setEditingMilestone] = useState<MilestoneItem | null>(null);
  const [isAddingMilestone, setIsAddingMilestone] = useState(false);
  const [editingMilestoneIndex, setEditingMilestoneIndex] = useState<number>(-1);

  const handleSave = async () => {
    setSaveStatus('saving');
    const updatedSettings = {
      ...settings,
      aboutContent: formData,
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

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember || !editingMember.name.trim()) return;

    if (isAddingMember) {
      setFormData({
        ...formData,
        teamMembers: [...formData.teamMembers, editingMember],
      });
    } else {
      const newMembers = [...formData.teamMembers];
      newMembers[editingMemberIndex] = editingMember;
      setFormData({ ...formData, teamMembers: newMembers });
    }

    setEditingMember(null);
    setIsAddingMember(false);
  };

  const handleDeleteMember = (index: number) => {
    const newMembers = formData.teamMembers.filter((_, i) => i !== index);
    setFormData({ ...formData, teamMembers: newMembers });
  };

  const handleSaveMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMilestone || !editingMilestone.title.trim()) return;

    if (isAddingMilestone) {
      setFormData({
        ...formData,
        milestones: [...formData.milestones, editingMilestone],
      });
    } else {
      const newMilestones = [...formData.milestones];
      newMilestones[editingMilestoneIndex] = editingMilestone;
      setFormData({ ...formData, milestones: newMilestones });
    }

    setEditingMilestone(null);
    setIsAddingMilestone(false);
  };

  const handleDeleteMilestone = (index: number) => {
    const newMilestones = formData.milestones.filter((_, i) => i !== index);
    setFormData({ ...formData, milestones: newMilestones });
  };

  return (
    <div id="admin-about-page-manager" className="space-y-8 max-w-5xl">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Info className="w-4 h-4" />
            <span>Page Management</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">About Us Page CMS</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage company narrative, mission, vision statements, leadership bios, and milestone timelines.
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

      {/* 1. Page Title & Story */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-white">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Page Headings & Overview</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Headline</label>
            <input
              type="text"
              value={formData.headline}
              onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1.5">Executive Summary</label>
            <textarea
              rows={3}
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* 2. Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Target className="w-4 h-4 text-cyan-400" />
            <span>Mission Statement</span>
          </div>
          <textarea
            rows={4}
            value={formData.mission}
            onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
          />
        </div>

        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Eye className="w-4 h-4 text-indigo-400" />
            <span>Vision Statement</span>
          </div>
          <textarea
            rows={4}
            value={formData.vision}
            onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
            className="w-full px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
          />
        </div>
      </div>

      {/* 3. Team Leadership Management */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Leadership & Engineering Leads ({formData.teamMembers.length})</span>
          </div>

          <button
            onClick={() => {
              setEditingMember({
                name: '',
                role: '',
                bio: '',
                avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
                badge: 'Engineering',
              });
              setEditingMemberIndex(-1);
              setIsAddingMember(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Member</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {formData.teamMembers.map((m, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center space-y-3 relative group">
              <div className="w-16 h-16 rounded-xl mx-auto overflow-hidden border border-slate-700">
                <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </div>

              <div>
                <div className="font-bold text-white text-xs">{m.name}</div>
                <div className="text-[10px] text-cyan-300 font-medium">{m.role}</div>
                <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] bg-blue-950 text-blue-400 border border-blue-800">
                  {m.badge}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-tight line-clamp-2">{m.bio}</p>

              <div className="flex justify-center gap-1.5 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    setEditingMember(m);
                    setEditingMemberIndex(idx);
                    setIsAddingMember(false);
                  }}
                  className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <Edit2 className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDeleteMember(idx)}
                  className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Company Milestones Timeline */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Growth Milestones Timeline ({formData.milestones.length})</span>
          </div>

          <button
            onClick={() => {
              setEditingMilestone({
                year: '2026',
                title: '',
                desc: '',
              });
              setEditingMilestoneIndex(-1);
              setIsAddingMilestone(true);
            }}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Milestone</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {formData.milestones.map((ms, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 relative">
              <div className="flex items-center justify-between">
                <div className="text-base font-extrabold text-cyan-400 font-mono">{ms.year}</div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => {
                      setEditingMilestone(ms);
                      setEditingMilestoneIndex(idx);
                      setIsAddingMilestone(false);
                    }}
                    className="p-1 text-slate-400 hover:text-white"
                  >
                    <Edit2 className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => handleDeleteMilestone(idx)}
                    className="p-1 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
              <div className="text-xs font-bold text-white">{ms.title}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">{ms.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Member Edit Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              {isAddingMember ? 'Add Team Member' : 'Edit Team Member'}
            </h3>

            <form onSubmit={handleSaveMember} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Role / Title</label>
                <input
                  type="text"
                  required
                  value={editingMember.role}
                  onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Badge Tag</label>
                  <input
                    type="text"
                    value={editingMember.badge}
                    onChange={(e) => setEditingMember({ ...editingMember, badge: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Leadership"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Avatar Image URL</label>
                  <input
                    type="text"
                    value={editingMember.avatar}
                    onChange={(e) => setEditingMember({ ...editingMember, avatar: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Short Bio</label>
                <textarea
                  rows={2}
                  value={editingMember.bio}
                  onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingMember(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Save Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Milestone Edit Modal */}
      {editingMilestone && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              {isAddingMilestone ? 'Add Growth Milestone' : 'Edit Milestone'}
            </h3>

            <form onSubmit={handleSaveMilestone} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Year / Period</label>
                <input
                  type="text"
                  required
                  value={editingMilestone.year}
                  onChange={(e) => setEditingMilestone({ ...editingMilestone, year: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  placeholder="e.g. 2026"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={editingMilestone.title}
                  onChange={(e) => setEditingMilestone({ ...editingMilestone, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingMilestone.desc}
                  onChange={(e) => setEditingMilestone({ ...editingMilestone, desc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingMilestone(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

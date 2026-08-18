import React, { useState } from 'react';
import { CareerOpening, JobApplication } from '../../../types';
import {
  GraduationCap,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Users,
  Search,
  Briefcase,
  DollarSign,
  Clock,
  MapPin,
  FileText,
  Mail,
  ExternalLink
} from 'lucide-react';
import { apiFetch } from '../../../lib/apiClient';

interface AdminCareersTabProps {
  careers: CareerOpening[];
  setCareers: React.Dispatch<React.SetStateAction<CareerOpening[]>>;
}

export const AdminCareersTab: React.FC<AdminCareersTabProps> = ({
  careers,
  setCareers,
}) => {
  const [subTab, setSubTab] = useState<'openings' | 'applications'>('openings');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCareer, setEditingCareer] = useState<CareerOpening | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Mock initial job applications store for applicants pipeline
  const [applications, setApplications] = useState<JobApplication[]>([
    {
      id: 'app-1',
      jobId: 'car-1',
      jobTitle: 'AI Swarm & Python Engineer',
      applicantName: 'Hamza Khan',
      applicantEmail: 'hamza.k@example.com',
      applicantPhone: '+92 300 1234567',
      portfolioUrl: 'https://github.com/hamzakhan',
      coverLetter: 'Passionate about autonomous agent swarms, LangChain, and high-throughput Python backends.',
      status: 'Reviewing',
      appliedAt: '2026-02-14',
    },
    {
      id: 'app-2',
      jobId: 'car-2',
      jobTitle: 'Full-Stack React & WebGL Specialist',
      applicantName: 'Aisha Malik',
      applicantEmail: 'aisha.m@example.com',
      portfolioUrl: 'https://aishamalik.dev',
      coverLetter: 'Built multiple 3D visualizers with Three.js and Tailwind. Keen to join Cohort 2026.',
      status: 'Interview Scheduled',
      appliedAt: '2026-02-15',
    },
  ]);

  const filteredCareers = careers.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const persistCareers = async (updated: CareerOpening[]) => {
    setCareers(updated);
    setSaveStatus('saving');
    try {
      await apiFetch('/api/content/careers', {
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

  const handleDeleteCareer = (id: string) => {
    if (confirm('Are you sure you want to close/remove this career listing?')) {
      const updated = careers.filter((c) => c.id !== id);
      persistCareers(updated);
    }
  };

  const handleSaveCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCareer || !editingCareer.title.trim()) return;

    let updated: CareerOpening[];
    if (isAdding) {
      const newCareer: CareerOpening = {
        ...editingCareer,
        id: `car-${Date.now()}`,
      };
      updated = [newCareer, ...careers];
    } else {
      updated = careers.map((c) => (c.id === editingCareer.id ? editingCareer : c));
    }

    persistCareers(updated);
    setEditingCareer(null);
    setIsAdding(false);
  };

  const handleUpdateAppStatus = (appId: string, status: JobApplication['status']) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === appId ? { ...app, status } : app))
    );
  };

  return (
    <div id="admin-careers-manager" className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <GraduationCap className="w-4 h-4" />
            <span>Recruiting & Cohorts</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Careers & Paid Internships</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage job vacancies, Cohort 2026 stipends, and review candidate applicant pipelines.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus === 'saved' && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Published Live</span>
            </span>
          )}

          <button
            onClick={() => {
              setEditingCareer({
                id: '',
                title: '',
                department: 'Engineering',
                location: 'Remote / Hybrid',
                type: 'Full-time',
                salary: '$40k - $70k / yr',
                description: '',
                requirements: ['Proficiency in TypeScript & Python', 'Understanding of REST & GraphQL APIs'],
                benefits: ['Health Insurance', 'Annual Learning Allowance', 'Remote Stipend'],
                deadline: 'Rolling Basis',
                isOpen: true,
                isInternship: false,
              });
              setIsAdding(true);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Post Opening</span>
          </button>
        </div>
      </div>

      {/* Sub tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setSubTab('openings')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            subTab === 'openings'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          Active Job Openings ({careers.length})
        </button>
        <button
          onClick={() => setSubTab('applications')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
            subTab === 'applications'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
          }`}
        >
          Applicant Pipeline ({applications.length})
        </button>
      </div>

      {subTab === 'openings' && (
        <div className="space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search positions by title, department, or job type..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCareers.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                        {item.department}
                      </span>
                      {item.isInternship && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                          Cohort 2026
                        </span>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        item.isOpen
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      {item.isOpen ? 'OPEN' : 'CLOSED'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white">{item.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.description}</p>

                  <div className="flex flex-wrap gap-3 pt-2 text-xs text-slate-300 border-t border-slate-800/80">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.type}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-mono">{item.salary}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-2">
                  <span className="text-[10px] text-slate-500 font-mono">ID: {item.id}</span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => {
                        setEditingCareer(item);
                        setIsAdding(false);
                      }}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteCareer(item.id)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {subTab === 'applications' && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="text-[11px] font-bold text-slate-400 uppercase border-b border-slate-800 pb-2">
                <tr>
                  <th className="pb-3">Candidate</th>
                  <th className="pb-3">Applied Position</th>
                  <th className="pb-3">Submitted</th>
                  <th className="pb-3">Links & Portfolio</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {applications.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 font-semibold text-white">
                      <div>{app.applicantName}</div>
                      <div className="text-[10px] text-slate-400">{app.applicantEmail}</div>
                    </td>
                    <td className="py-3 text-slate-200">{app.jobTitle}</td>
                    <td className="py-3 text-slate-400 font-mono text-[11px]">{app.appliedAt}</td>
                    <td className="py-3">
                      {app.portfolioUrl && (
                        <a
                          href={app.portfolioUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-cyan-400 hover:underline"
                        >
                          <span>Portfolio</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </td>
                    <td className="py-3">
                      <select
                        value={app.status}
                        onChange={(e) => handleUpdateAppStatus(app.id, e.target.value as any)}
                        className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-white focus:outline-none"
                      >
                        <option value="New">New</option>
                        <option value="Reviewing">Reviewing</option>
                        <option value="Interview Scheduled">Interview Scheduled</option>
                        <option value="Accepted">Accepted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => alert(`Cover Letter:\n\n${app.coverLetter || 'No letter submitted.'}`)}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-[11px]"
                      >
                        View Note
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Career Edit / Add Modal */}
      {editingCareer && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              {isAdding ? 'Post Career Opening' : `Edit: ${editingCareer.title}`}
            </h3>

            <form onSubmit={handleSaveCareer} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Job Title</label>
                <input
                  type="text"
                  required
                  value={editingCareer.title}
                  onChange={(e) => setEditingCareer({ ...editingCareer, title: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  placeholder="e.g. AI Swarm Engineer"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Department</label>
                  <input
                    type="text"
                    required
                    value={editingCareer.department}
                    onChange={(e) => setEditingCareer({ ...editingCareer, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Type</label>
                  <select
                    value={editingCareer.type}
                    onChange={(e) => setEditingCareer({ ...editingCareer, type: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Paid Internship (Cohort 2026)">Paid Internship (Cohort 2026)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Compensation / Salary</label>
                  <input
                    type="text"
                    value={editingCareer.salary}
                    onChange={(e) => setEditingCareer({ ...editingCareer, salary: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    placeholder="e.g. $45k - $65k / yr"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingCareer.location}
                    onChange={(e) => setEditingCareer({ ...editingCareer, location: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Job Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingCareer.description}
                  onChange={(e) => setEditingCareer({ ...editingCareer, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Requirements (Comma separated)
                </label>
                <input
                  type="text"
                  value={editingCareer.requirements ? editingCareer.requirements.join(', ') : ''}
                  onChange={(e) =>
                    setEditingCareer({
                      ...editingCareer,
                      requirements: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-4 pt-1">
                <label className="flex items-center gap-2 text-xs text-slate-300 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCareer.isOpen}
                    onChange={(e) => setEditingCareer({ ...editingCareer, isOpen: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-blue-600"
                  />
                  <span>Active Opening</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-slate-300 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingCareer.isInternship || false}
                    onChange={(e) => setEditingCareer({ ...editingCareer, isInternship: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-800 text-blue-600"
                  />
                  <span>Flag as Paid Cohort 2026 Internship</span>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingCareer(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Save Opening
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

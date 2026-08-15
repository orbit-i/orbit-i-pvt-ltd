import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Save,
  X,
  AlertTriangle,
  FileCheck,
  FolderGit2,
  Calendar
} from 'lucide-react';
import { ProjectTracking } from '../../../types';

interface AdminProjectsTabProps {
  projects: ProjectTracking[];
  setProjects: React.Dispatch<React.SetStateAction<ProjectTracking[]>>;
}

export const AdminProjectsTab: React.FC<AdminProjectsTabProps> = ({
  projects,
  setProjects,
}) => {
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  // New project form state
  const [newProjectForm, setNewProjectForm] = useState<Partial<ProjectTracking>>({
    projectName: '',
    clientName: '',
    clientEmail: '',
    currentPhase: 'Discovery',
    progressPercentage: 15,
    startDate: new Date().toISOString().substring(0, 10),
    targetDelivery: '4 Weeks',
    totalBudget: 7500,
    spentBudget: 1500,
    healthStatus: 'Optimal',
    githubRepo: 'https://github.com/orbit-i-enterprise/client-repo',
    figmaUrl: 'https://figma.com/file/orbit-i-specs',
    techStack: ['React 19', 'TypeScript', 'Node.js', 'PostgreSQL'],
  });

  const [milestoneInput, setMilestoneInput] = useState({
    title: '',
    dueDate: 'In 2 Weeks',
    status: 'In Progress' as const,
  });

  const [deliverableInput, setDeliverableInput] = useState({
    title: '',
    type: 'Code' as const,
    url: 'https://github.com/orbit-i-enterprise',
    version: 'v1.0.0',
  });

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjectForm.projectName || !newProjectForm.clientName) return;

    const newProj: ProjectTracking = {
      id: `proj-${Date.now()}`,
      projectName: newProjectForm.projectName,
      clientName: newProjectForm.clientName,
      clientEmail: newProjectForm.clientEmail || `${newProjectForm.clientName.toLowerCase().replace(/\s+/g, '')}@client.io`,
      currentPhase: newProjectForm.currentPhase || 'Discovery',
      progressPercentage: Number(newProjectForm.progressPercentage || 10),
      startDate: newProjectForm.startDate || '2026-08-14',
      targetDelivery: newProjectForm.targetDelivery || '4 Weeks',
      totalBudget: Number(newProjectForm.totalBudget || 5000),
      spentBudget: Number(newProjectForm.spentBudget || 0),
      healthStatus: (newProjectForm.healthStatus as any) || 'Optimal',
      githubRepo: newProjectForm.githubRepo,
      figmaUrl: newProjectForm.figmaUrl,
      techStack: newProjectForm.techStack || ['React', 'TypeScript'],
      milestones: [
        {
          id: `m-${Date.now()}-1`,
          title: 'System Requirements & Technical Blueprint',
          status: 'In Progress',
          dueDate: 'Week 1',
        },
        {
          id: `m-${Date.now()}-2`,
          title: 'Interactive Frontend & State Pipeline',
          status: 'Upcoming',
          dueDate: 'Week 3',
        },
        {
          id: `m-${Date.now()}-3`,
          title: 'Production Staging & QA Penetration Audit',
          status: 'Upcoming',
          dueDate: 'Week 4',
        },
      ],
      deliverables: [],
    };

    setProjects((prev) => [newProj, ...prev]);
    setIsCreatingProject(false);
    setNewProjectForm({
      projectName: '',
      clientName: '',
      clientEmail: '',
      currentPhase: 'Discovery',
      progressPercentage: 15,
      startDate: new Date().toISOString().substring(0, 10),
      targetDelivery: '4 Weeks',
      totalBudget: 7500,
      spentBudget: 1500,
      healthStatus: 'Optimal',
    });

    try {
      await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProj),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
      try {
        await fetch(`/api/projects/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdateProjectField = (id: string, field: keyof ProjectTracking, val: any) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: val } : p))
    );
  };

  const handleAddMilestone = (projectId: string) => {
    if (!milestoneInput.title) return;
    const newM = {
      id: `m-${Date.now()}`,
      title: milestoneInput.title,
      dueDate: milestoneInput.dueDate,
      status: milestoneInput.status,
    };
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, milestones: [...(p.milestones || []), newM] }
          : p
      )
    );
    setMilestoneInput({ title: '', dueDate: 'In 2 Weeks', status: 'In Progress' });
  };

  const handleRemoveMilestone = (projectId: string, milestoneId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, milestones: (p.milestones || []).filter((m) => m.id !== milestoneId) }
          : p
      )
    );
  };

  const handleToggleMilestoneStatus = (projectId: string, milestoneId: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== projectId) return p;
        const updated = (p.milestones || []).map((m) => {
          if (m.id !== milestoneId) return m;
          const nextStatus =
            m.status === 'Completed'
              ? 'In Progress'
              : m.status === 'In Progress'
              ? 'Completed'
              : 'In Progress';
          return { ...m, status: nextStatus as any };
        });
        return { ...p, milestones: updated };
      })
    );
  };

  const handleAddDeliverable = (projectId: string) => {
    if (!deliverableInput.title) return;
    const newD = {
      id: `del-${Date.now()}`,
      title: deliverableInput.title,
      type: deliverableInput.type,
      url: deliverableInput.url,
      version: deliverableInput.version,
      submittedAt: new Date().toISOString().substring(0, 10),
    };
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, deliverables: [...(p.deliverables || []), newD] }
          : p
      )
    );
    setDeliverableInput({
      title: '',
      type: 'Code',
      url: 'https://github.com/orbit-i-enterprise',
      version: 'v1.0.0',
    });
  };

  const handleRemoveDeliverable = (projectId: string, delId: string) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? { ...p, deliverables: (p.deliverables || []).filter((d) => d.id !== delId) }
          : p
      )
    );
  };

  return (
    <div id="admin-projects-panel" className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-400" />
            Client Projects & Delivery Engineering
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Manage live enterprise contracts, milestones, phase tracking, budget expenditure, and client deliverables.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingProject(!isCreatingProject)}
          id="btn-add-client-project"
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          {isCreatingProject ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          <span>{isCreatingProject ? 'Cancel Form' : 'New Client Project'}</span>
        </button>
      </div>

      {/* New Project Creator Drawer */}
      {isCreatingProject && (
        <form
          onSubmit={handleCreateProject}
          className="bg-slate-900 border border-blue-500/30 rounded-xl p-6 space-y-4 shadow-xl shadow-blue-950/20"
        >
          <div className="text-sm font-bold text-blue-300 flex items-center gap-2 border-b border-slate-800 pb-3">
            <Plus className="w-4 h-4" /> Create New Enterprise Client Project
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Project Name *</label>
              <input
                type="text"
                required
                value={newProjectForm.projectName}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, projectName: e.target.value })}
                placeholder="e.g. Acme AI RAG Pipeline & Cloud CRM"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Client Entity / Org *</label>
              <input
                type="text"
                required
                value={newProjectForm.clientName}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, clientName: e.target.value })}
                placeholder="e.g. Acme Corp LLC"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Client Contact Email</label>
              <input
                type="email"
                value={newProjectForm.clientEmail}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, clientEmail: e.target.value })}
                placeholder="cto@acme.com"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Current Phase</label>
              <select
                value={newProjectForm.currentPhase}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, currentPhase: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="Discovery">Discovery & Scoping</option>
                <option value="Prototyping">Prototyping & Architecture</option>
                <option value="Engineering">Core Engineering</option>
                <option value="QA & Testing">QA & Testing</option>
                <option value="Deployment">Production Deployment</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Health Status</label>
              <select
                value={newProjectForm.healthStatus}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, healthStatus: e.target.value as any })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="Optimal">Optimal (On Schedule)</option>
                <option value="Attention Needed">Attention Needed</option>
                <option value="Critical">Critical Issue</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Total Contract Budget ($)</label>
              <input
                type="number"
                value={newProjectForm.totalBudget}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, totalBudget: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 font-medium block mb-1">Target Timeline</label>
              <input
                type="text"
                value={newProjectForm.targetDelivery}
                onChange={(e) => setNewProjectForm({ ...newProjectForm, targetDelivery: e.target.value })}
                placeholder="4 Weeks"
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsCreatingProject(false)}
              className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30"
            >
              Save Project & Initialize Milestones
            </button>
          </div>
        </form>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {projects.map((project) => {
          const isExpanded = editingProjectId === project.id;
          return (
            <div
              key={project.id}
              className={`bg-slate-900/90 border rounded-xl p-5 transition-all ${
                isExpanded ? 'border-blue-500/50 shadow-xl' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Project Card Header */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="text-base font-bold text-white">
                      {project.projectName || (project as any).title}
                    </h3>
                    <span
                      className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        project.healthStatus === 'Optimal'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : project.healthStatus === 'Critical'
                          ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                          : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      }`}
                    >
                      {project.healthStatus || 'Optimal'}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                    <span>
                      Client: <strong className="text-slate-200">{project.clientName}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Email: <span className="font-mono text-slate-300">{project.clientEmail}</span>
                    </span>
                    <span>•</span>
                    <span>
                      Delivery: <span className="text-slate-300">{project.targetDelivery}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setEditingProjectId(isExpanded ? null : project.id)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isExpanded ? 'Close Editor' : 'Manage Milestones & Specs'}</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-1.5 rounded-lg bg-slate-800/60 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-800 transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Progress & Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-4 text-xs">
                <div>
                  <span className="text-slate-500 block mb-1">Completion Progress</span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                        style={{ width: `${project.progressPercentage}%` }}
                      />
                    </div>
                    <span className="font-bold text-white">{project.progressPercentage}%</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">Active Phase</span>
                  <span className="font-semibold text-slate-200">{project.currentPhase}</span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">Budget Settled</span>
                  <span className="font-semibold text-slate-200">
                    ${project.spentBudget.toLocaleString()} / ${project.totalBudget.toLocaleString()}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 block mb-1">Milestones Completed</span>
                  <span className="font-semibold text-emerald-400">
                    {(project.milestones || []).filter((m) => m.status === 'Completed').length} of{' '}
                    {(project.milestones || []).length} Completed
                  </span>
                </div>
              </div>

              {/* Expanded Detail Editor */}
              {isExpanded && (
                <div className="mt-4 pt-4 border-t border-slate-800 space-y-6 animate-fadeIn">
                  {/* Phase & Progress Adjustment */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
                    <div>
                      <label className="text-xs text-slate-400 font-medium block mb-1">Change Phase</label>
                      <select
                        value={project.currentPhase}
                        onChange={(e) => handleUpdateProjectField(project.id, 'currentPhase', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      >
                        <option value="Discovery">Discovery & Scoping</option>
                        <option value="Prototyping">Prototyping & Architecture</option>
                        <option value="Engineering">Core Engineering</option>
                        <option value="QA & Testing">QA & Testing</option>
                        <option value="Deployment">Production Deployment</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-medium block mb-1">
                        Progress Percentage ({project.progressPercentage}%)
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={project.progressPercentage}
                        onChange={(e) =>
                          handleUpdateProjectField(project.id, 'progressPercentage', Number(e.target.value))
                        }
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-400 font-medium block mb-1">Health State</label>
                      <select
                        value={project.healthStatus}
                        onChange={(e) => handleUpdateProjectField(project.id, 'healthStatus', e.target.value)}
                        className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                      >
                        <option value="Optimal">Optimal (On Schedule)</option>
                        <option value="Attention Needed">Attention Needed</option>
                        <option value="Critical">Critical Blockers</option>
                      </select>
                    </div>
                  </div>

                  {/* Milestones Management Section */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        Project Milestones ({project.milestones?.length || 0})
                      </h4>
                    </div>

                    <div className="space-y-2">
                      {(project.milestones || []).map((m) => (
                        <div
                          key={m.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() => handleToggleMilestoneStatus(project.id, m.id)}
                              className={`p-1 rounded cursor-pointer transition-colors ${
                                m.status === 'Completed'
                                  ? 'text-emerald-400 bg-emerald-500/10'
                                  : 'text-slate-500 hover:text-slate-300'
                              }`}
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                            <div>
                              <span
                                className={`font-medium ${
                                  m.status === 'Completed' ? 'line-through text-slate-400' : 'text-slate-200'
                                }`}
                              >
                                {m.title}
                              </span>
                              <div className="text-[10px] text-slate-500 mt-0.5">Due: {m.dueDate}</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                                m.status === 'Completed'
                                  ? 'bg-emerald-500/10 text-emerald-400'
                                  : m.status === 'In Progress'
                                  ? 'bg-blue-500/10 text-blue-400'
                                  : 'bg-slate-800 text-slate-400'
                              }`}
                            >
                              {m.status}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveMilestone(project.id, m.id)}
                              className="text-slate-500 hover:text-rose-400 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Milestone Inline Form */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="New Milestone title (e.g. Supabase Schema Migration & API Endpoints)"
                        value={milestoneInput.title}
                        onChange={(e) => setMilestoneInput({ ...milestoneInput, title: e.target.value })}
                        className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                      <input
                        type="text"
                        placeholder="Target (e.g. In 2 Weeks)"
                        value={milestoneInput.dueDate}
                        onChange={(e) => setMilestoneInput({ ...milestoneInput, dueDate: e.target.value })}
                        className="w-36 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddMilestone(project.id)}
                        className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold cursor-pointer"
                      >
                        Add Milestone
                      </button>
                    </div>
                  </div>

                  {/* Deliverables Management Section */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <FileCheck className="w-4 h-4 text-emerald-400" />
                      Client Deliverables & Downloads ({project.deliverables?.length || 0})
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {(project.deliverables || []).map((del) => (
                        <div
                          key={del.id}
                          className="flex items-center justify-between p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs"
                        >
                          <div>
                            <div className="font-semibold text-slate-200">{del.title}</div>
                            <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                              <span>Type: {del.type}</span>
                              {del.version && <span>• {del.version}</span>}
                              <span>• {del.submittedAt}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={del.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 text-blue-400 hover:text-blue-300"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                            <button
                              type="button"
                              onClick={() => handleRemoveDeliverable(project.id, del.id)}
                              className="p-1 text-slate-500 hover:text-rose-400"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Add Deliverable Form */}
                    <div className="flex flex-col sm:flex-row gap-2 pt-1">
                      <input
                        type="text"
                        placeholder="Deliverable Title (e.g. Production Docker Compose & API Spec)"
                        value={deliverableInput.title}
                        onChange={(e) => setDeliverableInput({ ...deliverableInput, title: e.target.value })}
                        className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                      <select
                        value={deliverableInput.type}
                        onChange={(e) => setDeliverableInput({ ...deliverableInput, type: e.target.value as any })}
                        className="w-32 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      >
                        <option value="Code">Code Repository</option>
                        <option value="Design">Figma Design</option>
                        <option value="Spec">Technical Spec</option>
                        <option value="Build">Deploy Artifact</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Link / URL"
                        value={deliverableInput.url}
                        onChange={(e) => setDeliverableInput({ ...deliverableInput, url: e.target.value })}
                        className="w-48 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                      />
                      <button
                        type="button"
                        onClick={() => handleAddDeliverable(project.id)}
                        className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold cursor-pointer"
                      >
                        Attach Deliverable
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

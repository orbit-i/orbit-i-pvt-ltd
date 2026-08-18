import React, { useState } from 'react';
import { ServiceItem } from '../../../types';
import {
  Code2,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Save,
  RefreshCw,
  Search,
  DollarSign,
  Clock,
  Layers,
  Sparkles
} from 'lucide-react';
import { apiFetch } from '../../../lib/apiClient';

interface AdminServicesTabProps {
  services: ServiceItem[];
  setServices: React.Dispatch<React.SetStateAction<ServiceItem[]>>;
}

export const AdminServicesTab: React.FC<AdminServicesTabProps> = ({
  services,
  setServices,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const categories = ['All', ...Array.from(new Set(services.map((s) => s.category)))];

  const filteredServices = services.filter((s) => {
    const matchesCat = categoryFilter === 'All' || s.category === categoryFilter;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const persistServices = async (updated: ServiceItem[]) => {
    setServices(updated);
    setSaveStatus('saving');
    try {
      await apiFetch('/api/content/services', {
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

  const handleDeleteService = (id: string) => {
    if (confirm('Are you sure you want to remove this service from the live catalog?')) {
      const updated = services.filter((s) => s.id !== id);
      persistServices(updated);
    }
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService || !editingService.title.trim()) return;

    let updated: ServiceItem[];
    if (isAdding) {
      const newService: ServiceItem = {
        ...editingService,
        id: `srv-${Date.now()}`,
      };
      updated = [newService, ...services];
    } else {
      updated = services.map((s) => (s.id === editingService.id ? editingService : s));
    }

    persistServices(updated);
    setEditingService(null);
    setIsAdding(false);
  };

  return (
    <div id="admin-services-manager" className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Code2 className="w-4 h-4" />
            <span>Offerings CMS</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Services Catalog</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage public engineering services, SLA delivery durations, tech stacks, and starting rates.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus === 'saved' && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Catalog Synced</span>
            </span>
          )}

          <button
            onClick={() => {
              setEditingService({
                id: '',
                title: '',
                category: 'AI & Automation',
                shortDesc: '',
                fullDesc: '',
                icon: 'Zap',
                startingPrice: '$1,500',
                deliveryTimeframe: '2-3 Weeks',
                technologies: ['React', 'TypeScript', 'Node.js'],
                features: ['Full Source Code Delivery', '99.9% Uptime Architecture', '30-Day Post-Launch SLA'],
                isPopular: false,
              });
              setIsAdding(true);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Service</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search services by title, technology, or category..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer border ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((svc) => (
          <div
            key={svc.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 relative group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                  {svc.category}
                </span>
                {svc.isPopular && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    POPULAR
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-blue-300 transition-colors">
                  {svc.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed line-clamp-2">
                  {svc.shortDesc}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-300 pt-2 border-t border-slate-800/80">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="font-mono">{svc.startingPrice}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>{svc.deliveryTimeframe}</span>
                </div>
              </div>

              {svc.technologies && svc.technologies.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {svc.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-md bg-slate-950 text-[10px] text-slate-400 font-mono border border-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-2">
              <span className="text-[10px] text-slate-500 font-mono">ID: {svc.id}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setEditingService(svc);
                    setIsAdding(false);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteService(svc.id)}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-rose-400 hover:bg-slate-700 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit/Add Service Modal */}
      {editingService && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              {isAdding ? 'Create New Service' : `Edit Service: ${editingService.title}`}
            </h3>

            <form onSubmit={handleSaveService} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Service Title</label>
                  <input
                    type="text"
                    required
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    placeholder="e.g. Autonomous AI Swarms & Python Automation"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <select
                    value={editingService.category}
                    onChange={(e) => setEditingService({ ...editingService, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    <option value="AI & Automation">AI & Automation</option>
                    <option value="Web Engineering">Web Engineering</option>
                    <option value="Mobile Development">Mobile Development</option>
                    <option value="Cloud & Hostinger MySQL">Cloud & Hostinger MySQL</option>
                    <option value="Graphic & 3D WebGL">Graphic & 3D WebGL</option>
                    <option value="Enterprise Systems">Enterprise Systems</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingService.shortDesc}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  placeholder="Concise overview shown in cards..."
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Full Technical Description</label>
                <textarea
                  rows={3}
                  value={editingService.fullDesc || ''}
                  onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500 leading-relaxed"
                  placeholder="Detailed breakdown of architecture, deliverables, and SLAs..."
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Starting Price</label>
                  <input
                    type="text"
                    value={editingService.startingPrice}
                    onChange={(e) => setEditingService({ ...editingService, startingPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    placeholder="e.g. $2,500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Delivery Timeframe</label>
                  <input
                    type="text"
                    value={editingService.deliveryTimeframe}
                    onChange={(e) => setEditingService({ ...editingService, deliveryTimeframe: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                    placeholder="e.g. 2-4 Weeks"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Technologies (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingService.technologies ? editingService.technologies.join(', ') : ''}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      technologies: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Python, FastAPI, Gemini API, Hostinger MySQL"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Key Features / Deliverables (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingService.features ? editingService.features.join(', ') : ''}
                  onChange={(e) =>
                    setEditingService({
                      ...editingService,
                      features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Source Code Handover, 99.9% Uptime, CI/CD Pipeline"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isPopularCheck"
                  checked={editingService.isPopular || false}
                  onChange={(e) => setEditingService({ ...editingService, isPopular: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                <label htmlFor="isPopularCheck" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  Mark as Popular / Featured Service
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 shadow-md"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

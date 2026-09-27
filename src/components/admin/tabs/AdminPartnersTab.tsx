import React, { useState } from 'react';
import { PartnerItem } from '../../../types';
import {
  Handshake,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Search,
  ExternalLink,
} from 'lucide-react';
import { apiFetch } from '../../../lib/apiClient';

interface AdminPartnersTabProps {
  partners: PartnerItem[];
  setPartners: React.Dispatch<React.SetStateAction<PartnerItem[]>>;
}

const PARTNER_CATEGORIES: PartnerItem['category'][] = [
  'Technology Partner',
  'Client Collaboration',
  'Academic Partner',
  'Reseller',
  'Community Partner',
];

export const AdminPartnersTab: React.FC<AdminPartnersTabProps> = ({
  partners,
  setPartners,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingItem, setEditingItem] = useState<PartnerItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const filteredPartners = partners.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const persistPartners = async (updated: PartnerItem[]) => {
    setPartners(updated);
    setSaveStatus('saving');
    try {
      await apiFetch('/api/content/partners', {
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
    if (confirm('Remove this partner from the Partners & Collaborations page?')) {
      const updated = partners.filter((p) => p.id !== id);
      persistPartners(updated);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem || !editingItem.name.trim()) return;

    let updated: PartnerItem[];
    if (isAdding) {
      const newItem: PartnerItem = {
        ...editingItem,
        id: `partner-${Date.now()}`,
      };
      updated = [newItem, ...partners];
    } else {
      updated = partners.map((p) => (p.id === editingItem.id ? editingItem : p));
    }

    persistPartners(updated);
    setEditingItem(null);
    setIsAdding(false);
  };

  return (
    <div id="admin-partners-manager" className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Handshake className="w-4 h-4" />
            <span>Partnerships CMS</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Partners & Collaborations</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage technology partners, client collaborations, academic partnerships, and resellers shown on the public Partners page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus === 'saved' && (
            <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-800">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Partners Synced</span>
            </span>
          )}

          <button
            onClick={() => {
              setEditingItem({
                id: '',
                name: '',
                category: 'Client Collaboration',
                logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=80',
                websiteUrl: '',
                description: '',
                partnerSince: new Date().getFullYear().toString(),
                featured: false,
              });
              setIsAdding(true);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Partner</span>
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
          placeholder="Search partners by name, category, or description..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Partners Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPartners.map((item) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                  {item.category}
                </span>
                {item.featured && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    FEATURED
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-sm font-bold text-white">{item.name}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.description}</p>
                {item.partnerSince && (
                  <p className="text-[10px] text-slate-500 mt-1">Partner since {item.partnerSince}</p>
                )}
                {item.websiteUrl && (
                  <a
                    href={item.websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-cyan-400 hover:text-cyan-300 mt-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {item.websiteUrl.replace(/^https?:\/\//, '')}
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-800 mt-2">
              <span className="text-[10px] text-slate-500 font-mono">ID: {item.id}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setEditingItem(item);
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

        {filteredPartners.length === 0 && (
          <div className="col-span-full text-center py-10 text-xs text-slate-500">
            No partners yet — click "Add Partner" to create the first one.
          </div>
        )}
      </div>

      {/* Edit / Add Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-bold text-white">
              {isAdding ? 'Add Partner' : `Edit: ${editingItem.name}`}
            </h3>

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Partner Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <select
                    value={editingItem.category}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, category: e.target.value as PartnerItem['category'] })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  >
                    {PARTNER_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Partner Since</label>
                  <input
                    type="text"
                    value={editingItem.partnerSince || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, partnerSince: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Logo / Image URL</label>
                <input
                  type="text"
                  required
                  value={editingItem.logoUrl}
                  onChange={(e) => setEditingItem({ ...editingItem, logoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Website URL (optional)</label>
                <input
                  type="text"
                  value={editingItem.websiteUrl || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, websiteUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="partnerFeaturedCheck"
                  checked={editingItem.featured || false}
                  onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                  className="rounded bg-slate-950 border-slate-800 text-blue-600 focus:ring-0"
                />
                <label htmlFor="partnerFeaturedCheck" className="text-xs text-slate-300 font-semibold cursor-pointer">
                  Feature at the top of the Partners page
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { ProductItem } from '../../../types';
import {
  Package,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  DollarSign,
  Layers,
  Search
} from 'lucide-react';
import { apiFetch } from '../../../lib/apiClient';

interface AdminProductsTabProps {
  products: ProductItem[];
  setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
}

export const AdminProductsTab: React.FC<AdminProductsTabProps> = ({
  products,
  setProducts,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const persistProducts = async (updated: ProductItem[]) => {
    setProducts(updated);
    setSaveStatus('saving');
    try {
      await apiFetch('/api/content/products', {
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

  const handleDeleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this product from the live store?')) {
      const updated = products.filter((p) => p.id !== id);
      persistProducts(updated);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name.trim()) return;

    let updated: ProductItem[];
    if (isAdding) {
      const newProduct: ProductItem = {
        ...editingProduct,
        id: `prod-${Date.now()}`,
      };
      updated = [newProduct, ...products];
    } else {
      updated = products.map((p) => (p.id === editingProduct.id ? editingProduct : p));
    }

    persistProducts(updated);
    setEditingProduct(null);
    setIsAdding(false);
  };

  return (
    <div id="admin-products-manager" className="space-y-6 max-w-6xl">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Package className="w-4 h-4" />
            <span>Proprietary SaaS CMS</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Products & Tools</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage commercial software, pricing tiers, live demo links, release versions, and customer metrics.
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
              setEditingProduct({
                id: '',
                name: '',
                category: 'AI & Automation',
                tagline: '',
                description: '',
                monthlyPrice: 49,
                annualPrice: 470,
                version: 'v1.0.0',
                status: 'Live',
                demoUrl: 'https://orbit-i.tech',
                features: ['Autonomous task processing', 'API key management', 'Enterprise SLA'],
                metrics: { users: '1.2k+', rating: 4.9, queriesProcessed: '500k+' },
              });
              setIsAdding(true);
            }}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
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
          placeholder="Search products by name, category, or features..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProducts.map((prod) => (
          <div
            key={prod.id}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-950 text-blue-400 border border-blue-800">
                  {prod.category}
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {prod.status} ({prod.version})
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{prod.name}</h3>
                <p className="text-xs text-cyan-300 font-medium">{prod.tagline}</p>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {prod.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex items-center gap-1 text-white font-mono font-bold">
                  <span>${prod.monthlyPrice}</span>
                  <span className="text-slate-400 text-[10px] font-normal">/mo</span>
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  ${prod.annualPrice}/yr (Save 20%)
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800 mt-2">
              <span className="text-[10px] text-slate-500 font-mono">ID: {prod.id}</span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setEditingProduct(prod);
                    setIsAdding(false);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteProduct(prod.id)}
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
      {editingProduct && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 space-y-4">
            <h3 className="text-base font-bold text-white">
              {isAdding ? 'Create SaaS Product' : `Edit Product: ${editingProduct.name}`}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Category</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  value={editingProduct.tagline}
                  onChange={(e) => setEditingProduct({ ...editingProduct, tagline: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Monthly Price ($)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.monthlyPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, monthlyPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Annual Price ($)</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.annualPrice}
                    onChange={(e) => setEditingProduct({ ...editingProduct, annualPrice: parseFloat(e.target.value) || 0 })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Version</label>
                  <input
                    type="text"
                    value={editingProduct.version}
                    onChange={(e) => setEditingProduct({ ...editingProduct, version: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">
                  Features (Comma Separated)
                </label>
                <input
                  type="text"
                  value={editingProduct.features ? editingProduct.features.join(', ') : ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      features: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1">Demo / Launch URL</label>
                <input
                  type="text"
                  value={editingProduct.demoUrl}
                  onChange={(e) => setEditingProduct({ ...editingProduct, demoUrl: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

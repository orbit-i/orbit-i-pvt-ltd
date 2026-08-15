import React, { useState } from 'react';
import { GalleryItem, NavigationTab } from '../../types';
import {
  Image,
  Tag,
  Maximize2,
  X,
  Sparkles,
  Layers
} from 'lucide-react';

interface GalleryPageProps {
  gallery?: GalleryItem[];
  setActiveTab?: (tab: NavigationTab) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({ gallery = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const categories = [
    'All',
    'UI/UX Mockups',
    '3D & Motion',
    'Client Launches',
    'Hackathons & Culture',
    'Product Renders',
  ];

  const filteredGallery = selectedCategory === 'All'
    ? (gallery || [])
    : (gallery || []).filter((item) => item.category === selectedCategory);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-xs font-semibold text-purple-300">
          <Image className="w-3.5 h-3.5" />
          <span>Visual Artifacts & Engineering Showcase</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Orbit-I Media & Design Gallery
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Explore interactive design mockups, 3D WebGL renders, hackathon prototypes, and production client launches.
        </p>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {(filteredGallery || []).map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden cursor-pointer hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10"
          >
            <div className="relative aspect-video overflow-hidden bg-slate-950">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              <div className="absolute top-3 right-3 p-1.5 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-slate-700 text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-3 left-3 right-3 space-y-1">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 border border-purple-500/40">
                  {item.category}
                </span>
                <h3 className="text-sm font-bold text-white leading-snug">{item.title}</h3>
              </div>
            </div>

            <div className="p-4 space-y-2">
              <p className="text-xs text-slate-400 line-clamp-2">{item.description}</p>
              <div className="flex flex-wrap gap-1 pt-1">
                {(item.tags || []).map((t, i) => (
                  <span key={i} className="text-[10px] text-slate-400 bg-slate-950 px-2 py-0.5 rounded">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
            <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-purple-400">{activeItem.category}</span>
                <h3 className="text-base font-bold text-white">{activeItem.title}</h3>
              </div>
              <button
                onClick={() => setActiveItem(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-hidden bg-slate-950 flex items-center justify-center">
              <img
                src={activeItem.imageUrl}
                alt={activeItem.title}
                className="max-h-[60vh] w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 space-y-3 bg-slate-900">
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {activeItem.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {(activeItem.tags || []).map((t, i) => (
                  <span key={i} className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-purple-300">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { PartnerItem, NavigationTab } from '../../types';
import { Handshake, ExternalLink, Sparkles } from 'lucide-react';

interface PartnersPageProps {
  partners?: PartnerItem[];
  setActiveTab?: (tab: NavigationTab) => void;
}

export const PartnersPage: React.FC<PartnersPageProps> = ({ partners = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Technology Partner',
    'Client Collaboration',
    'Academic Partner',
    'Reseller',
    'Community Partner',
  ];

  const filteredPartners = selectedCategory === 'All'
    ? (partners || [])
    : (partners || []).filter((p) => p.category === selectedCategory);

  const featuredPartners = filteredPartners.filter((p) => p.featured);
  const otherPartners = filteredPartners.filter((p) => !p.featured);

  const renderCard = (item: PartnerItem) => (
    <div
      key={item.id}
      className="group relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10 p-5 flex flex-col gap-4"
    >
      <div className="w-full h-36 rounded-2xl overflow-hidden bg-slate-950 border border-slate-800">
        <img
          src={item.logoUrl}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {item.category}
          </span>
          {item.featured && (
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
              FEATURED
            </span>
          )}
        </div>
        <h3 className="text-sm font-bold text-white leading-snug">{item.name}</h3>
        <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
        <div className="flex items-center justify-between pt-1">
          {item.partnerSince && (
            <span className="text-[10px] text-slate-500">Partner since {item.partnerSince}</span>
          )}
          {item.websiteUrl && (
            <a
              href={item.websiteUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[10px] font-semibold text-cyan-400 hover:text-cyan-300"
            >
              Visit <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
          <Handshake className="w-3.5 h-3.5" />
          <span>Ecosystem & Alliances</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Partners & Collaborations
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          The technology partners, academic institutions, and client collaborations that ORBIT-I builds alongside.
        </p>

        {/* Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredPartners.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <Sparkles className="w-8 h-8 text-slate-600 mx-auto" />
          <p className="text-sm text-slate-400">No partners listed in this category yet.</p>
        </div>
      ) : (
        <>
          {featuredPartners.length > 0 && (
            <div className="space-y-5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-400">Featured Partners</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredPartners.map(renderCard)}
              </div>
            </div>
          )}

          {otherPartners.length > 0 && (
            <div className="space-y-5">
              {featuredPartners.length > 0 && (
                <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">All Partners</h2>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPartners.map(renderCard)}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

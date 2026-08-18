import React from 'react';
import { CaseStudy, NavigationTab } from '../../types';
import {
  TrendingUp,
  CheckCircle2,
  Cpu,
  Layers,
  ArrowRight,
  Sparkles,
  Building,
  Target
} from 'lucide-react';

interface FeaturedWorkPageProps {
  caseStudies?: CaseStudy[];
  setActiveTab: (tab: NavigationTab) => void;
}

export const FeaturedWorkPage: React.FC<FeaturedWorkPageProps> = ({
  caseStudies = [],
  setActiveTab,
}) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300">
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Proven Enterprise Impact & ROI</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Featured Architecture Case Studies
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Explore how Orbit-I Private Limited architects bespoke AI systems, automated Python scrapers, and headless React web engines that deliver exponential ROI.
        </p>
      </div>

      {/* Case Studies Deep Dive */}
      <div className="space-y-16">
        {(caseStudies || []).map((study, idx) => (
          <div
            key={study.id}
            className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 space-y-8 relative overflow-hidden"
          >
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
              <div>
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  {study.industry}
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">{study.title}</h2>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-blue-400" />
                  <span>Client: {study.clientName}</span>
                </div>
              </div>

              <button
                onClick={() => setActiveTab('contact')}
                className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer transition-all"
              >
                <span>Build Similar Architecture</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Metrics Highlight */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {(study.metrics || []).map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <div className="text-2xl font-extrabold text-emerald-400">{m.value}</div>
                  <div className="text-xs text-slate-300 font-medium mt-0.5">{m.label}</div>
                </div>
              ))}
            </div>

            {/* Challenge & Solution Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-4 h-4" />
                  <span>The Enterprise Challenge:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>The Orbit-I Solution:</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {study.solution}
                </p>
              </div>
            </div>

            {/* Stack Tags */}
            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold mr-2">Technologies Used:</span>
              {(study.technologies || []).map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

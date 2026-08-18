import React, { useState } from 'react';
import { ServiceItem, NavigationTab } from '../../types';
import {
  Cpu,
  Globe,
  Terminal,
  Palette,
  Layers,
  TrendingUp,
  Server,
  Zap,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Clock,
  DollarSign
} from 'lucide-react';

interface ServicesPageProps {
  services?: ServiceItem[];
  setActiveTab: (tab: NavigationTab) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  services = [],
  setActiveTab,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'AI & ML',
    'Web & Apps',
    'Python & Automation',
    'Graphics & UI/UX',
    'Custom Products',
    'Digital Marketing',
    'Cloud & DevOps',
  ];

  const filteredServices = selectedCategory === 'All'
    ? (services || [])
    : (services || []).filter((s) => s.category === selectedCategory);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-7 h-7 text-cyan-400" />;
      case 'Globe':
        return <Globe className="w-7 h-7 text-blue-400" />;
      case 'Terminal':
        return <Terminal className="w-7 h-7 text-emerald-400" />;
      case 'Palette':
        return <Palette className="w-7 h-7 text-purple-400" />;
      case 'Layers':
        return <Layers className="w-7 h-7 text-indigo-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-7 h-7 text-amber-400" />;
      case 'Server':
        return <Server className="w-7 h-7 text-rose-400" />;
      default:
        return <Zap className="w-7 h-7 text-blue-400" />;
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
          <Zap className="w-3.5 h-3.5" />
          <span>Full-Spectrum Technology Engineering</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Orbit-I Enterprise Services
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Tailored engineering pods delivering autonomous AI workflows, Python automation, 3D digital experiences, and scalable cloud applications.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-300 flex flex-col justify-between space-y-6 hover:shadow-2xl hover:shadow-blue-500/5"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                  {getIcon(service.icon)}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-blue-950/60 text-cyan-300 border border-blue-800/60">
                    {service.category}
                  </span>
                  {service.popular && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Popular
                    </span>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed font-normal">
                  {service.fullDesc}
                </p>
              </div>

              {/* Feature Bullets */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-slate-300">Included Deliverables:</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(service.features || []).map((f, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="pt-2">
                <div className="text-xs font-semibold text-slate-400 mb-1.5">Technology Stack:</div>
                <div className="flex flex-wrap gap-1.5">
                  {(service.technologies || []).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-slate-950 border border-slate-800 text-[11px] text-slate-300 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom pricing bar */}
            <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <div className="text-[10px] text-slate-500">Starting Rate</div>
                  <div className="text-lg font-extrabold text-emerald-400">
                    ${service.startingPrice.toLocaleString()} USD
                  </div>
                </div>
                <div className="border-l border-slate-800 pl-4">
                  <div className="text-[10px] text-slate-500">Avg SLA</div>
                  <div className="font-semibold text-white">{service.deliveryTime}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('contact')}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <span>Inquire for Project</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

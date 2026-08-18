import React from 'react';
import {
  ServiceItem,
  NavigationTab,
  SiteSettings
} from '../../types';
import { ThreeVisuals } from '../ThreeVisuals';
import {
  ArrowRight,
  Cpu,
  Globe,
  Terminal,
  Palette,
  Layers,
  TrendingUp,
  Server,
  Zap,
  CheckCircle2,
  ChevronRight,
  Shield,
  Code2,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  services?: ServiceItem[];
  settings?: SiteSettings;
  setActiveTab: (tab: NavigationTab) => void;
  onBuyProduct?: (product: any) => void;
  products?: any[];
  blogs?: any[];
  caseStudies?: any[];
}

export const HomePage: React.FC<HomePageProps> = ({
  services = [],
  settings,
  setActiveTab,
}) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Globe':
        return <Globe className="w-6 h-6 text-blue-400" />;
      case 'Terminal':
        return <Terminal className="w-6 h-6 text-emerald-400" />;
      case 'Palette':
        return <Palette className="w-6 h-6 text-purple-400" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-indigo-400" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-amber-400" />;
      case 'Server':
        return <Server className="w-6 h-6 text-rose-400" />;
      default:
        return <Zap className="w-6 h-6 text-blue-400" />;
    }
  };

  const homeData = settings?.homeContent;
  const heroBadge = homeData?.heroBadge || 'Software & Technology Services';
  const heroHeadline = homeData?.heroHeadline || 'Custom Software & Technology Solutions for Modern Businesses';
  const heroSubtitle = homeData?.heroSubtitle || settings?.tagline || 'We design, engineer, and deploy high-performance software applications, web platforms, and tailored technical systems.';
  const stats = homeData?.stats || [
    { label: 'Enterprise Deployments', value: '150+', desc: 'Production systems worldwide' },
    { label: 'System Uptime SLA', value: '99.99%', desc: 'High-availability infrastructure' },
    { label: 'Client Value Generated', value: '$18M+', desc: 'Measurable client impact' },
    { label: 'Average API Latency', value: '<25ms', desc: 'Edge accelerated routing' },
  ];
  const testimonials = homeData?.testimonials || [];

  return (
    <div className="relative text-slate-100 overflow-hidden">
      {/* ========================================================================= */}
      {/* 1. CLEAN HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/80 to-slate-950">
        {/* Visualizer Canvas */}
        <ThreeVisuals intensity="low" />

        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center space-y-7 z-10">
          {/* Company Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>{settings?.companyName || 'Orbit-I Private Limited'}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">{heroBadge}</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            {heroHeadline}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {heroSubtitle}
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => setActiveTab('services')}
              className="px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-600/20 cursor-pointer flex items-center gap-2"
            >
              <span>Our Services</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Contact Us</span>
            </button>
          </div>

          {/* Performance Stats Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
            {stats.map((st, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-center">
                <div className="text-xl sm:text-2xl font-extrabold text-cyan-300 font-mono">{st.value}</div>
                <div className="text-xs font-semibold text-white mt-0.5">{st.label}</div>
                <div className="text-[10px] text-slate-400 mt-0.5">{st.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. SERVICES OVERVIEW */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5" />
              <span>What We Do</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Our Core Services
            </h2>
            <p className="text-sm text-slate-400 max-w-2xl mt-2">
              Explore our core technical services designed to help organizations build, scale, and modernize their digital infrastructure.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('services')}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 self-start md:self-auto cursor-pointer"
          >
            <span>View All Services</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(services || []).map((service) => (
            <div
              key={service.id}
              className="group relative p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/40 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    {getIcon(service.icon)}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {service.category}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mt-1 group-hover:text-blue-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {service.shortDesc}
                  </p>
                </div>

                {service.features && service.features.length > 0 && (
                  <div className="space-y-1.5 pt-2">
                    {(service.features || []).slice(0, 3).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-5 mt-5 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('contact')}
                  className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <span>Inquire About Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. ABOUT ORBIT-I SUMMARY */}
      {/* ========================================================================= */}
      <section className="py-16 bg-slate-900/60 border-y border-slate-800/80 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-blue-400">
            <Shield className="w-3.5 h-3.5" />
            <span>About Orbit-I Private Limited</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Engineering with Precision & Integrity
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-3xl mx-auto">
            We partner with enterprises, startups, and institutions to deliver high-quality technology solutions. Whether you need custom web applications, mobile platforms, or systems integration, our team is committed to robust engineering standards and transparent collaboration.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActiveTab('about')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white border border-slate-700 transition-colors"
            >
              Read More About Us
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. READY TO START / CONTACT CALLOUT */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 space-y-6">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have a project or technical requirement in mind?
          </h3>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Get in touch with our team to discuss your objectives, timeline, and technical specifications.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setActiveTab('contact')}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-all shadow-md shadow-blue-600/20"
            >
              Get in Touch
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700"
            >
              Explore Solutions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

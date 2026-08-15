import React from 'react';
import { SiteSettings, NavigationTab } from '../../types';
import { INITIAL_SETTINGS } from '../../data/initialData';
import {
  ShieldCheck,
  Zap,
  Award,
  Users,
  Target,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Terminal,
  Cpu,
  Globe2
} from 'lucide-react';

interface AboutPageProps {
  settings?: SiteSettings;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenEstimator?: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({
  settings = INITIAL_SETTINGS,
  setActiveTab,
  onOpenEstimator,
}) => {
  const teamMembers = [
    {
      name: 'Abdul Samad Rind',
      role: 'Founder & CEO',
      bio: 'Leading ORBIT-I\'s product direction, AI/ML strategy, and enterprise client engagements.',
      avatar: '/founder-samad.jpg',
      badge: 'Leadership',
    },
    {
      name: 'Muneeb Ur Rehman',
      role: 'Co-Founder & CTO',
      bio: 'Owns ORBIT-I\'s engineering architecture, infrastructure, and technical delivery across client projects.',
      avatar: '',
      badge: 'Leadership',
    },
    {
      name: 'Maria Almani',
      role: 'Co-Founder & COO',
      bio: 'Runs day-to-day operations, client delivery, and internal team structure at ORBIT-I.',
      avatar: '',
      badge: 'Leadership',
    },
  ];

  const milestones = [
    { year: '2021', title: 'Orbit-I Inception', desc: 'Founded with a singular mission to eradicate manual enterprise inefficiencies through Python automation.' },
    { year: '2023', title: 'AI & SaaS Product Labs', desc: 'Launched flagship proprietary tools OrbitPulse and OrbitFlow, serving over 10,000 monthly active users.' },
    { year: '2025', title: 'Global Multi-Cloud Hub', desc: 'Expanded infrastructure support across Hostinger MySQL, Supabase, and Vercel edge networks.' },
    { year: '2026', title: 'Cohort 2026 & AI Swarms', desc: 'Introduced autonomous Gemini multi-agent systems and launched global paid internship initiatives.' },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About Orbit-I Private Limited</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Where Radical Engineering Meets{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            Intelligent Automation
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {settings.legalEntity} is a modern enterprise technology company. We build high-impact AI models, web platforms, Python automations, graphics, and custom digital products that drive quantifiable business growth.
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-blue-600/20 border border-blue-500/40 text-cyan-300 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Mission</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To eliminate repetitive digital toil and equip ambitious enterprises with autonomous AI agents, resilient software architectures, and intuitive 3D interfaces that operate with flawless precision.
          </p>
          <ul className="space-y-2 text-xs text-slate-300 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero boilerplate compromises — high craftsmanship in every repository.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Full-stack transparency with real-time SuperAdmin and Client portals.</span>
            </li>
          </ul>
        </div>

        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-4 relative overflow-hidden">
          <div className="w-12 h-12 rounded-2xl bg-purple-600/20 border border-purple-500/40 text-purple-300 flex items-center justify-center">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Our Vision</h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            To be the global benchmark for autonomous software engineering, bridging human creativity with algorithmic automation across Web, AI, and Cloud infrastructure.
          </p>
          <ul className="space-y-2 text-xs text-slate-300 pt-2">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Empowering the next generation of engineers through Cohort 2026 Internships.</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Delivering 99.99% SLA reliability across all custom client deployments.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Leadership & Engineering Team */}
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            The Minds Behind Orbit-I
          </div>
          <h2 className="text-3xl font-extrabold text-white">Leadership & Engineering Leads</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {teamMembers.map((member, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4 hover:border-slate-700 transition-colors"
            >
              <div className="relative w-24 h-24 mx-auto">
                {member.avatar ? (
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-full h-full rounded-2xl object-cover border-2 border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-full h-full rounded-2xl bg-blue-950/60 border-2 border-slate-700 flex items-center justify-center text-xl font-bold text-blue-300">
                    {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                  </div>
                )}
                <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-bold">
                  {member.badge}
                </span>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">{member.name}</h3>
                <p className="text-xs text-cyan-300 font-medium">{member.role}</p>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setActiveTab('team')}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 inline-flex items-center gap-1 cursor-pointer transition-colors"
          >
            Meet the Full Team
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Company Milestones Timeline */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-8">
        <div className="text-center space-y-1">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Growth Journey</div>
          <h2 className="text-2xl font-bold text-white">Orbit-I Corporate Milestones</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {milestones.map((item, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="text-xl font-extrabold text-cyan-400">{item.year}</div>
              <div className="text-sm font-bold text-white">{item.title}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-slate-800 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Partner with Orbit-I Today</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Whether you need a dedicated development pod, an AI automation overhaul, or internship training, we are here to build.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onOpenEstimator}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg"
          >
            Get Instant Quote
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-700"
          >
            Contact Headquarters
          </button>
        </div>
      </div>
    </div>
  );
};

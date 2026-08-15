import React from 'react';
import { SiteSettings, NavigationTab } from '../../types';
import { INITIAL_SETTINGS } from '../../data/initialData';
import { Sparkles, Mail, Phone, Users } from 'lucide-react';

interface TeamPageProps {
  settings?: SiteSettings;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenEstimator?: () => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({
  settings = INITIAL_SETTINGS,
  setActiveTab,
  onOpenEstimator,
}) => {
  const founders = [
    {
      name: 'Abdul Samad Rind',
      role: 'Founder & CEO',
      bio: 'Sets ORBIT-I\'s product direction and AI/ML strategy, and leads enterprise client engagements end to end — from first call to delivered platform.',
      avatar: '/founder-samad.jpg',
    },
    {
      name: 'Muneeb Ur Rehman',
      role: 'Co-Founder & CTO',
      bio: 'Owns ORBIT-I\'s engineering architecture and infrastructure — technical delivery, code quality, and system design across every client project.',
      avatar: '',
    },
    {
      name: 'Maria Almani',
      role: 'Co-Founder & COO',
      bio: 'Runs day-to-day operations at ORBIT-I — client delivery coordination, internal team structure, and process.',
      avatar: '',
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
          <Users className="w-3.5 h-3.5" />
          <span>Our Team</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          The People Behind{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">
            ORBIT-I
          </span>
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          {settings.legalEntity} is led by a three-person founding team based in {settings.address}.
        </p>
      </div>

      {/* Founders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {founders.map((member, i) => (
          <div
            key={i}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4 hover:border-slate-700 transition-colors flex flex-col items-center"
          >
            <div className="relative w-28 h-28">
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full rounded-2xl object-cover border-2 border-slate-700"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full rounded-2xl bg-blue-950/60 border-2 border-slate-700 flex items-center justify-center text-2xl font-bold text-blue-300">
                  {member.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
              )}
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-md bg-blue-600 text-white text-[9px] font-bold">
                Founder
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

      {/* Contact strip */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-center sm:text-left max-w-3xl mx-auto">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{settings.contactEmail}</span>
        </div>
        <div className="hidden sm:block w-px h-5 bg-slate-800" />
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{settings.phone}</span>
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-900/60 to-indigo-900/60 border border-slate-800 text-center space-y-4">
        <h3 className="text-2xl font-bold text-white">Want to Work with Us?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Whether it's a project, a partnership, or joining the team — reach out directly.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={onOpenEstimator}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg cursor-pointer flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Get Instant Quote
          </button>
          <button
            onClick={() => setActiveTab('careers')}
            className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold border border-slate-700 cursor-pointer"
          >
            View Open Roles
          </button>
        </div>
      </div>
    </div>
  );
};

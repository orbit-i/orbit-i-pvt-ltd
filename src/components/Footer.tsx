import React, { useState } from 'react';
import {
  NavigationTab,
  SiteSettings,
  ServiceItem
} from '../types';
import {
  Sparkles,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Facebook,
  MessageCircle,
  Instagram,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
  settings?: SiteSettings;
  services?: ServiceItem[];
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  settings,
  services,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const fallbackSettings: SiteSettings = {
    companyName: 'ORBIT-I',
    legalEntity: 'ORBIT-I (Private) Limited',
    logoUrl: '/logo.png',
    tagline: 'Precision Artificial Intelligence, High-Throughput Web Platforms & Custom Python Engineering.',
    foundedYear: '2022',
    contactEmail: 'orbiti2026@gmail.com',
    supportEmail: 'orbiti2026@gmail.com',
    phone: '+92 319 0275751',
    address: 'Nawabshah, Sindh, Pakistan',
    emergencyAlert: {
      enabled: false,
      message: '',
      type: 'info',
    },
    socials: {
      github: 'https://github.com/orbit-i',
      linkedin: 'https://www.linkedin.com/company/orbit-i-private-limited/',
      twitter: '',
      instagram: 'https://www.instagram.com/0rbit_i?igsh=anpnbThjbnN2OGxm',
      youtube: '',
      facebook: 'https://www.facebook.com/share/1BCN9FuLqc/',
      whatsapp: 'https://whatsapp.com/channel/0029Vb8I4kvJJhzUXqEnB50J',
    },
    hostingConfigs: {
      mysqlConfigured: true,
      vercelReady: true,
    },
  };

  const currentSettings = settings || fallbackSettings;

  const quickLinks: { tab: NavigationTab; label: string }[] = [
    { tab: 'home', label: 'Home Overview' },
    { tab: 'services', label: 'Enterprise Services' },
    { tab: 'products', label: 'SaaS Products' },
    { tab: 'featured', label: 'Case Studies' },
    { tab: 'about', label: 'About Orbit-I' },
    { tab: 'careers', label: 'Careers & Hiring' },
    { tab: 'blogs', label: 'Technical Insights' },
    { tab: 'gallery', label: 'Media & Life' },
    { tab: 'contact', label: 'Contact & RFPs' },
  ];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const handleNav = (tab: NavigationTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-auto bg-slate-950 border-t border-slate-800/80 text-slate-400 relative z-20 overflow-hidden">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/40 py-6 sm:py-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row md:items-center justify-between gap-4 sm:gap-6">
          <div className="space-y-1 max-w-2xl text-center md:text-left">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Ready to Scale Your Enterprise with Orbit-I?</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Custom AI microservices, resilient Python automation pipelines, and high-conversion web architectures.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0">
            <button
              onClick={() => handleNav('contact')}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Schedule Discovery Call</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleNav('services')}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explore Services</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Col 1: Brand & Corporate Info */}
          <div className="space-y-3.5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <img
                src="/logo.png"
                alt="ORBIT-I logo"
                className="w-8 h-8 rounded-lg object-cover shadow-sm shrink-0"
              />
              <div>
                <span className="text-base font-bold text-white tracking-tight">
                  {currentSettings.companyName.toUpperCase()}
                </span>
                <span className="ml-2 text-[8px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800 font-bold">
                  PVT LTD
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              {currentSettings.tagline}
            </p>

            <div className="text-xs space-y-2 text-slate-400 flex flex-col items-center sm:items-start">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="leading-snug">{currentSettings.address}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`mailto:${currentSettings.contactEmail}`} className="hover:text-white transition-colors truncate">
                  {currentSettings.contactEmail}
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`tel:${currentSettings.phone}`} className="hover:text-white transition-colors truncate">
                  {currentSettings.phone}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
              {currentSettings.socials?.github && (
                <a
                  href={currentSettings.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                </a>
              )}
              {currentSettings.socials?.linkedin && (
                <a
                  href={currentSettings.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {currentSettings.socials?.facebook && (
                <a
                  href={currentSettings.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5" />
                </a>
              )}
              {currentSettings.socials?.instagram && (
                <a
                  href={currentSettings.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                </a>
              )}
              {currentSettings.socials?.whatsapp && (
                <a
                  href={currentSettings.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp Channel"
                  className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </div>
            <ul className="space-y-1.5 text-xs">
              {quickLinks.slice(0, 6).map((item) => (
                <li key={item.tab}>
                  <button
                    onClick={() => handleNav(item.tab)}
                    className="hover:text-blue-400 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Capabilities & Engineering */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Specializations
            </div>
            <ul className="space-y-1.5 text-xs">
              {services && services.length > 0 ? (
                services.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <button
                      onClick={() => handleNav('services')}
                      className="hover:text-blue-400 transition-colors cursor-pointer truncate max-w-full block mx-auto sm:mx-0"
                    >
                      {s.title}
                    </button>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <button onClick={() => handleNav('services')} className="hover:text-blue-400">
                      AI & Agentic Systems
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNav('services')} className="hover:text-blue-400">
                      Web & App Engineering
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNav('services')} className="hover:text-blue-400">
                      Python Automation Bots
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNav('services')} className="hover:text-blue-400">
                      Cloud & DevOps Pipelines
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleNav('services')} className="hover:text-blue-400">
                      UI/UX Design Systems
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3.5 text-center sm:text-left">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Executive Dispatch
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Quarterly briefs on enterprise AI architecture, security SLAs, and system optimization.
            </p>

            {subscribed ? (
              <div className="flex items-center justify-center sm:justify-start gap-2 p-2 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                <span>Subscribed to Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative w-full">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-2.5 pr-16 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-center"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-8 sm:mt-10 pt-5 sm:pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <div className="text-center sm:text-left">
            <span>© {new Date().getFullYear()} {currentSettings.legalEntity}. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4">
            <button onClick={() => handleNav('about')} className="hover:text-slate-200 cursor-pointer">About</button>
            <span>•</span>
            <button onClick={() => handleNav('contact')} className="hover:text-slate-200 cursor-pointer">Support</button>
            <span>•</span>
            <span className="text-emerald-400 font-mono flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block"></span>
              <span>All Systems Operational</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

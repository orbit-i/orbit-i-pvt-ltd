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
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  MessageCircle,
  ShieldCheck,
  CheckCircle2,
  Database,
  Server,
  Cloud,
  Layers,
  ArrowRight,
  KeyRound,
  Lock
} from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavigationTab) => void;
  settings?: SiteSettings;
  services?: ServiceItem[];
  onOpenEstimator?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  settings,
  services,
  onOpenEstimator,
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
    { tab: 'team', label: 'Our Team' },
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
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 relative overflow-hidden text-center sm:text-left">
      {/* Top CTA Banner */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col items-center md:flex-row md:items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5 max-w-2xl text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-blue-400 shrink-0" />
              <span>Ready to Scale Your Enterprise with Orbit-I?</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed text-center sm:text-left">
              Custom AI microservices, resilient Python automation pipelines, and high-conversion web architectures.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full md:w-auto">
            {onOpenEstimator && (
              <button
                onClick={onOpenEstimator}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Instant Project Estimator</span>
              </button>
            )}
            <button
              onClick={() => handleNav('contact')}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Schedule Discovery Call</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-center sm:text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 text-center sm:text-left">
          {/* Col 1: Brand & Identity */}
          <div className="sm:col-span-2 space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-3">
              <img
                src="/logo.png"
                alt="ORBIT-I logo"
                className="w-9 h-9 rounded-xl object-cover shadow-sm shrink-0"
              />
              <div className="text-center sm:text-left">
                <span className="text-lg font-bold text-white tracking-tight">
                  {currentSettings.companyName.toUpperCase()}
                </span>
                <span className="ml-2 text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-950/60 text-blue-400 border border-blue-800 font-bold">
                  PVT LTD
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm text-center sm:text-left">
              {currentSettings.tagline}
            </p>

            <div className="pt-2 text-xs space-y-2 text-slate-400 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{currentSettings.address}</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`mailto:${currentSettings.contactEmail}`} className="hover:text-white transition-colors">
                  {currentSettings.contactEmail}
                </a>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <a href={`tel:${currentSettings.phone}`} className="hover:text-white transition-colors">
                  {currentSettings.phone}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2">
              {currentSettings.socials?.github && (
                <a
                  href={currentSettings.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
              )}
              {currentSettings.socials?.linkedin && (
                <a
                  href={currentSettings.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {currentSettings.socials?.twitter && (
                <a
                  href={currentSettings.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {currentSettings.socials?.facebook && (
                <a
                  href={currentSettings.socials.facebook}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {currentSettings.socials?.instagram && (
                <a
                  href={currentSettings.socials.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {currentSettings.socials?.whatsapp && (
                <a
                  href={currentSettings.socials.whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              )}
              {currentSettings.socials?.youtube && (
                <a
                  href={currentSettings.socials.youtube}
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="text-xs font-bold text-white uppercase tracking-wider text-center sm:text-left">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-center sm:text-left">
              {quickLinks.slice(0, 5).map((item) => (
                <li key={item.tab} className="text-center sm:text-left">
                  <button
                    onClick={() => handleNav(item.tab)}
                    className="hover:text-blue-400 transition-colors cursor-pointer text-center sm:text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Capabilities & Engineering */}
          <div className="space-y-3 text-center sm:text-left">
            <div className="text-xs font-bold text-white uppercase tracking-wider text-center sm:text-left">
              Specializations
            </div>
            <ul className="space-y-2 text-xs text-center sm:text-left">
              {services && services.length > 0 ? (
                services.slice(0, 5).map((s) => (
                  <li key={s.id} className="text-center sm:text-left">
                    <button
                      onClick={() => handleNav('services')}
                      className="hover:text-blue-400 transition-colors cursor-pointer truncate max-w-full block text-center sm:text-left"
                    >
                      {s.title}
                    </button>
                  </li>
                ))
              ) : (
                <>
                  <li className="text-center sm:text-left">
                    <button onClick={() => handleNav('services')} className="hover:text-blue-400 text-center sm:text-left">
                      AI & Agentic Systems
                    </button>
                  </li>
                  <li className="text-center sm:text-left">
                    <button onClick={() => handleNav('services')} className="hover:text-blue-400 text-center sm:text-left">
                      Web & App Engineering
                    </button>
                  </li>
                  <li className="text-center sm:text-left">
                    <button onClick={() => handleNav('services')} className="hover:text-blue-400 text-center sm:text-left">
                      Python Automation Bots
                    </button>
                  </li>
                  <li className="text-center sm:text-left">
                    <button onClick={() => handleNav('services')} className="hover:text-blue-400 text-center sm:text-left">
                      Cloud & DevOps Pipelines
                    </button>
                  </li>
                  <li className="text-center sm:text-left">
                    <button onClick={() => handleNav('services')} className="hover:text-blue-400 text-center sm:text-left">
                      UI/UX Design Systems
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Col 4: Newsletter & Direct Access */}
          <div className="space-y-4 flex flex-col items-center sm:items-start text-center sm:text-left">
            <div className="text-xs font-bold text-white uppercase tracking-wider text-center sm:text-left">
              Executive Dispatch
            </div>
            <p className="text-xs text-slate-400 leading-relaxed text-center sm:text-left">
              Quarterly briefs on enterprise AI architecture, security SLAs, and system optimization.
            </p>

            {subscribed ? (
              <div className="w-full flex items-center justify-center sm:justify-start gap-2 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs text-center sm:text-left">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Subscribed to Executive Dispatch.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="w-full space-y-2 text-center sm:text-left">
                <div className="relative w-full">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="name@company.com"
                    required
                    className="w-full pl-3 pr-20 py-2 rounded-xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-blue-500 text-center sm:text-left"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Join
                  </button>
                </div>
              </form>
            )}

            {/* Quick Portals */}
            <div className="pt-1 w-full text-center sm:text-left">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center sm:text-left">
                Enterprise Portals
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <button
                  onClick={() => handleNav('admin')}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold cursor-pointer transition-colors"
                >
                  SuperAdmin
                </button>
                <button
                  onClick={() => handleNav('client-portal')}
                  className="text-xs px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 font-semibold cursor-pointer transition-colors"
                >
                  Client Portal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal - Centered on mobile, left on desktop */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div className="text-center sm:text-left">
            © {new Date().getFullYear()} {currentSettings.legalEntity}. All rights reserved.
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-center sm:text-left">
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-200 cursor-pointer">Security SLA</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">System: Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

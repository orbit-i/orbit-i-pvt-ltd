import React, { useState } from 'react';
import {
  NavigationTab,
  SiteSettings
} from '../types';
import {
  Sparkles,
  Menu,
  X,
  Home,
  Cpu,
  Layers,
  ShoppingBag,
  Building2,
  Users,
  GraduationCap,
  BookOpen,
  Image,
  Mail,
  PhoneCall,
  KeyRound,
  ChevronRight,
  Activity,
  FolderGit2
} from 'lucide-react';
import { AuthModal } from './auth/AuthModal';

interface NavbarProps {
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  settings?: SiteSettings;
  onOpenEstimator?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  settings,
  onOpenEstimator,
}) => {
  const [sidebarMenuOpen, setSidebarMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authRole, setAuthRole] = useState<'admin' | 'client'>('admin');

  const navLinks: { tab: NavigationTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { tab: 'home', label: 'Home', icon: Home },
    { tab: 'services', label: 'Services', icon: Cpu },
    { tab: 'products', label: 'Products', icon: ShoppingBag },
    { tab: 'featured', label: 'Featured Work', icon: FolderGit2 },
    { tab: 'about', label: 'About Us', icon: Building2 },
    { tab: 'team', label: 'Team', icon: Users },
    { tab: 'careers', label: 'Careers', icon: GraduationCap, badge: 'Hiring' },
    { tab: 'blogs', label: 'Blogs', icon: BookOpen },
    { tab: 'gallery', label: 'Gallery', icon: Image },
    { tab: 'contact', label: 'Contact', icon: Mail },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setActiveTab(tab);
    setSidebarMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
              id="brand-logo-btn"
            >
              <img
                src="/logo.png"
                alt="ORBIT-I logo"
                className="w-9 h-9 rounded-xl object-cover shadow-sm shrink-0"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">
                    ORBIT-I
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-950/70 text-blue-400 border border-blue-800 font-mono">
                    PVT LTD
                  </span>
                </div>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeTab === link.tab;
                return (
                  <button
                    key={link.tab}
                    onClick={() => handleNavClick(link.tab)}
                    id={`nav-link-${link.tab}`}
                    className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                      isActive
                        ? 'text-blue-400 bg-blue-950/60 border border-blue-800/60'
                        : 'text-slate-300 hover:text-white hover:bg-slate-900'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      {link.label}
                      {link.badge && (
                        <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800">
                          {link.badge}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="hidden lg:flex items-center gap-2.5">
              <button
                onClick={() => {
                  setAuthRole('admin');
                  setAuthModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </button>

              {/* AI Cost Estimator CTA */}
              {onOpenEstimator && (
                <button
                  onClick={onOpenEstimator}
                  id="ai-estimator-top-btn"
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>AI Cost Estimator</span>
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {onOpenEstimator && (
                <button
                  onClick={onOpenEstimator}
                  className="p-2 rounded-xl bg-blue-950/60 text-blue-400 border border-blue-800 text-xs font-semibold flex items-center gap-1"
                  aria-label="Open AI Cost Estimator"
                >
                  <Sparkles className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={() => setSidebarMenuOpen(true)}
                className="p-2.5 rounded-xl bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer flex items-center justify-center"
                aria-label="Open navigation sidebar"
                id="mobile-sidebar-toggle-btn"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE SLIDE-OUT SIDEBAR MENU DRAWER */}
      {/* ========================================================================= */}
      {sidebarMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop Overlay */}
          <div
            onClick={() => setSidebarMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-300"
          />

          {/* Slide-out Sidebar Drawer */}
          <aside
            id="mobile-navigation-sidebar"
            className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-slate-950 border-r border-slate-800 shadow-2xl flex flex-col justify-between z-50 transform transition-transform duration-300 ease-out"
          >
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="ORBIT-I logo"
                  className="w-9 h-9 rounded-xl object-cover shadow-sm shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white tracking-tight">
                      ORBIT-I
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-blue-950/80 text-blue-400 border border-blue-800">
                      PVT LTD
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Enterprise Digital Agency
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSidebarMenuOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
                aria-label="Close navigation sidebar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <div className="flex-1 overflow-y-auto p-3 space-y-4 scrollbar-thin">
              {/* Section 1: Main Pages */}
              <div>
                <div className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Navigation
                </div>
                <div className="space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeTab === link.tab;
                    return (
                      <button
                        key={link.tab}
                        onClick={() => handleNavClick(link.tab)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isActive
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-300 hover:text-white hover:bg-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                          <span>{link.label}</span>
                        </div>
                        {link.badge ? (
                          <span
                            className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                              isActive
                                ? 'bg-white/20 text-white'
                                : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                            }`}
                          >
                            {link.badge}
                          </span>
                        ) : (
                          <ChevronRight className={`w-3.5 h-3.5 ${isActive ? 'text-white/60' : 'text-slate-600'}`} />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-3 border-t border-slate-800 bg-slate-900/60 space-y-2">
              {onOpenEstimator && (
                <button
                  onClick={() => {
                    setSidebarMenuOpen(false);
                    onOpenEstimator();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-sm cursor-pointer transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Instant AI Project Estimator</span>
                </button>
              )}

              <div className="flex items-center justify-between pt-1 px-1">
                <button
                  type="button"
                  onClick={() => {
                    setSidebarMenuOpen(false);
                    setAuthRole('admin');
                    setAuthModalOpen(true);
                  }}
                  className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 cursor-pointer"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Sign In / Reset Password</span>
                </button>

                <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>SLA 99.99%</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialRole={authRole}
        onLoginSuccess={(user) => {
          setAuthModalOpen(false);
          if (user.role === 'superadmin') {
            setActiveTab('admin');
          } else {
            setActiveTab('client-portal');
          }
        }}
      />
    </>
  );
};

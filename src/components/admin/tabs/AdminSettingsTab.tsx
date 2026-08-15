import React, { useState } from 'react';
import { SiteSettings } from '../../../types';
import {
  Settings,
  Building,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  MessageCircle,
  AlertCircle,
  Check,
  LayoutTemplate,
  ShieldCheck
} from 'lucide-react';

interface AdminSettingsTabProps {
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

export const AdminSettingsTab: React.FC<AdminSettingsTabProps> = ({ settings, setSettings }) => {
  const [formData, setFormData] = useState<SiteSettings>({ ...settings });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSettings(formData);
    setSaved(true);

    fetch('/api/content/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).catch(console.error);

    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div>
          <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <LayoutTemplate className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span>Site & Dynamic Footer Management</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Configure legal identity, contact channels, dynamic footer links, social profiles, and announcements.
          </p>
        </div>

        <button
          type="submit"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-sm"
        >
          <Check className="w-4 h-4" />
          <span>{saved ? 'Changes Saved!' : 'Save All Settings'}</span>
        </button>
      </div>

      {saved && (
        <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Settings successfully updated and synchronized across all footer and navigation modules.</span>
        </div>
      )}

      {/* 1. Core Corporate Identity & Footer Text */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Building className="w-4 h-4 text-blue-500" />
          <span>Corporate Brand & Legal Identity</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Company Brand Name
            </label>
            <input
              type="text"
              required
              value={formData.companyName}
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Registered Legal Entity Name
            </label>
            <input
              type="text"
              required
              value={formData.legalEntity}
              onChange={(e) => setFormData({ ...formData, legalEntity: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Corporate Tagline & Footer Bio
            </label>
            <textarea
              rows={2}
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 2. Direct Contact Details & Footer Locations */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Mail className="w-4 h-4 text-emerald-500" />
          <span>Contact Channels & Office Location</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Primary Contact Email
            </label>
            <input
              type="email"
              required
              value={formData.contactEmail}
              onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Support Desk Email
            </label>
            <input
              type="email"
              value={formData.supportEmail}
              onChange={(e) => setFormData({ ...formData, supportEmail: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Direct Phone Line
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="md:col-span-3">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Registered Physical Address / Global HQ
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 3. Footer Social Media Handles */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Globe className="w-4 h-4 text-indigo-500" />
          <span>Footer Social Media Profiles</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Github className="w-3.5 h-3.5" />
              <span>GitHub URL</span>
            </label>
            <input
              type="text"
              value={formData.socials.github}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, github: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5 text-blue-500" />
              <span>LinkedIn URL</span>
            </label>
            <input
              type="text"
              value={formData.socials.linkedin}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, linkedin: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Twitter className="w-3.5 h-3.5 text-sky-400" />
              <span>Twitter / X Profile</span>
            </label>
            <input
              type="text"
              value={formData.socials.twitter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, twitter: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Instagram className="w-3.5 h-3.5 text-pink-500" />
              <span>Instagram URL</span>
            </label>
            <input
              type="text"
              value={formData.socials.instagram}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, instagram: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Youtube className="w-3.5 h-3.5 text-rose-500" />
              <span>YouTube Channel</span>
            </label>
            <input
              type="text"
              value={formData.socials.youtube}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, youtube: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <Facebook className="w-3.5 h-3.5 text-blue-600" />
              <span>Facebook URL</span>
            </label>
            <input
              type="text"
              value={formData.socials.facebook}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, facebook: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
              <span>WhatsApp Channel URL</span>
            </label>
            <input
              type="text"
              value={formData.socials.whatsapp}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  socials: { ...formData.socials, whatsapp: e.target.value },
                })
              }
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* 4. Global Announcement / Emergency Notice */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <span>Site Banner Announcement / Emergency Notice</span>
          </h3>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="alert-enabled"
              checked={formData.emergencyAlert?.enabled}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  emergencyAlert: { ...formData.emergencyAlert, enabled: e.target.checked },
                })
              }
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="alert-enabled" className="text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer">
              Enable Alert Banner
            </label>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Announcement Message
          </label>
          <input
            type="text"
            value={formData.emergencyAlert?.message || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                emergencyAlert: { ...formData.emergencyAlert, message: e.target.value },
              })
            }
            placeholder="e.g. Orbit-I AI Internship Cohort 2026 application window is now officially open!"
            className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>
    </form>
  );
};

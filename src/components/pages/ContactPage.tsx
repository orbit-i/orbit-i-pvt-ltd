import React, { useState } from 'react';
import { SiteSettings, NavigationTab } from '../../types';
import { INITIAL_SETTINGS } from '../../data/initialData';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Sparkles,
  Clock,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Loader2,
  Calendar
} from 'lucide-react';

interface ContactPageProps {
  settings?: SiteSettings;
  setActiveTab: (tab: NavigationTab) => void;
  onOpenEstimator?: () => void;
  onLeadSubmitted?: (lead: any) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  settings = INITIAL_SETTINGS,
  setActiveTab,
  onOpenEstimator,
  onLeadSubmitted,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [serviceCategory, setServiceCategory] = useState('Enterprise AI & Machine Learning');
  const [budgetRange, setBudgetRange] = useState('$5,000 - $15,000');
  const [timeline, setTimeline] = useState('1-2 Months');
  const [projectDetails, setProjectDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is Orbit-I Private Limited’s primary domain of expertise?',
      a: 'Orbit-I is a specialized digital and AI solutions enterprise (not an aerospace entity). We build custom Generative AI agents, full-stack React & mobile platforms, Python automation workflows, 3D graphics & UI/UX, and proprietary SaaS products.',
    },
    {
      q: 'Which database and hosting platforms do you support?',
      a: 'Our architectures are engineered for high-availability multi-cloud deployment. We natively support Hostinger MySQL, Supabase PostgreSQL, Vercel Edge, AWS, and Docker container clusters with 99.99% SLA.',
    },
    {
      q: 'How does the SuperAdmin panel and Client Dashboard work?',
      a: 'Orbit-I provides pure no-code control via SuperAdmin to update blogs, services, products, job postings, and leads CRM. Clients receive real-time dashboard access to monitor sprint milestones, telemetry metrics, and settle invoices via secure payment gateway.',
    },
    {
      q: 'How can students or engineers apply for the Cohort 2026 Internship?',
      a: 'Applications for our Summer/Winter Paid AI & Full-Stack Internship are open directly on our Careers page. Simply select the cohort opening and submit your resume for review.',
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !projectDetails) return;

    setSubmitting(true);
    try {
      const payload = {
        fullName,
        email,
        phone,
        companyName,
        serviceCategory,
        budgetRange,
        timeline,
        projectDetails,
        source: 'Contact Page Inquiry Form',
      };

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (onLeadSubmitted) onLeadSubmitted(data.lead);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs font-semibold text-cyan-300">
          <Mail className="w-3.5 h-3.5" />
          <span>Connect with Orbit-I Leadership</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Let’s Architect Your Next Breakthrough
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Have an enterprise challenge, AI project, or internship inquiry? Submit your project details below or book an instant consultation with our solutions architects.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Contact Information & Channels */}
        <div className="space-y-8">
          <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white">Orbit-I Corporate Headquarters</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Main Tech Campus:</div>
                  <p className="text-slate-400 mt-0.5">{settings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">General & Inquiries:</div>
                  <p className="text-slate-400 mt-0.5">{settings.contactEmail}</p>
                  <p className="text-slate-400">{settings.supportEmail}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Direct Line:</div>
                  <p className="text-slate-400 mt-0.5">{settings.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">Business Hours:</div>
                  <p className="text-slate-400 mt-0.5">Mon - Sat: 9:00 AM - 7:00 PM (EST / IST)</p>
                  <p className="text-emerald-400 font-medium">24/7 Priority Emergency Support</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={onOpenEstimator}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Launch AI Scope Estimator</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Pill */}
          <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Direct Response Guarantee
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every proposal is reviewed by a Lead Solutions Architect within 4 business hours.
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="lg:col-span-2">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white">Project Inquiry Received!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <span className="text-cyan-400 font-semibold">{fullName}</span>. Our engineering committee will review your requirements and reach out to <span className="text-cyan-400 font-semibold">{email}</span>.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFullName('');
                    setEmail('');
                    setProjectDetails('');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Business Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Company / Organization Name
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Orbit Enterprise Labs"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Service Category
                    </label>
                    <select
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>Enterprise AI & Machine Learning</option>
                      <option>High-Performance Web & Mobile</option>
                      <option>Python Scripting & Automation</option>
                      <option>Graphics & 3D UI/UX</option>
                      <option>Custom SaaS & Digital Products</option>
                      <option>Digital Marketing & SEO</option>
                      <option>Cloud Infrastructure & Database Engineering</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Target Budget
                    </label>
                    <select
                      value={budgetRange}
                      onChange={(e) => setBudgetRange(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>&lt; $3,000</option>
                      <option>$3,000 - $8,000</option>
                      <option>$8,000 - $20,000</option>
                      <option>$20,000+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Desired Timeline
                    </label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-blue-500"
                    >
                      <option>1-2 Weeks (Sprint)</option>
                      <option>3-5 Weeks (Standard)</option>
                      <option>2-3 Months (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Project Scope & Objectives *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={projectDetails}
                    onChange={(e) => setProjectDetails(e.target.value)}
                    placeholder="Tell us about the problem you are solving, technical expectations, or integrations..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 transition-all"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                      <span>Transmitting Encrypted Proposal...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Project Proposal to Orbit-I</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 pt-6 border-t border-slate-800">
        <div className="text-center space-y-1">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Knowledge Base & FAQ
          </div>
          <h2 className="text-2xl font-bold text-white">Frequently Asked Questions</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full flex items-center justify-between text-left font-bold text-sm text-white cursor-pointer"
              >
                <span>{faq.q}</span>
                {openFaq === idx ? (
                  <ChevronUp className="w-4 h-4 text-cyan-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                )}
              </button>

              {openFaq === idx && (
                <p className="text-xs text-slate-300 leading-relaxed mt-3 pt-3 border-t border-slate-800/80">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

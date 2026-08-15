import React, { useState } from 'react';
import { CareerOpening, NavigationTab } from '../../types';
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  DollarSign,
  CheckCircle2,
  Send,
  X,
  Upload,
  Sparkles,
  Award,
  ArrowRight,
  Loader2
} from 'lucide-react';

interface CareersPageProps {
  careers?: CareerOpening[];
  setActiveTab: (tab: NavigationTab) => void;
  onApplicationSubmitted?: (app: any) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({
  careers = [],
  setActiveTab,
  onApplicationSubmitted,
}) => {
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState<'All' | 'Full-Time' | 'Internship'>('All');
  const [selectedJob, setSelectedJob] = useState<CareerOpening | null>(null);

  // Application Modal State
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [resumeName, setResumeName] = useState('Candidate_Resume_2026.pdf');
  const [coverLetter, setCoverLetter] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const departments = ['All', 'AI & Engineering', 'Frontend / UI', 'Python / Backend', 'Design & Graphics'];

  const filteredCareers = (careers || []).filter((c) => {
    const matchesDept = departmentFilter === 'All' || c.department === departmentFilter;
    const matchesType = typeFilter === 'All' || c.type === typeFilter;
    return matchesDept && matchesType;
  });

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob || !applicantName || !applicantEmail) return;

    setSubmitting(true);
    try {
      const payload = {
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        applicantName,
        email: applicantEmail,
        phone: applicantPhone,
        portfolioUrl,
        linkedinUrl,
        resumeFileName: resumeName,
        coverLetter,
      };

      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (onApplicationSubmitted) onApplicationSubmitted(data.application);
      setSubmittedSuccess(true);
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Careers & Cohort 2026 Programs</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
          Build the Future of AI & Software with Orbit-I
        </h1>
        <p className="text-sm sm:text-base text-slate-300">
          Join our elite engineering team or launch your career with our hands-on paid AI & Python internship cohorts.
        </p>

        {/* Filters */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
          <div className="flex rounded-xl bg-slate-900 border border-slate-800 p-1">
            <button
              onClick={() => setTypeFilter('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                typeFilter === 'All' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              All Openings
            </button>
            <button
              onClick={() => setTypeFilter('Internship')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 ${
                typeFilter === 'Internship' ? 'bg-emerald-600 text-white' : 'text-slate-400'
              }`}
            >
              <GraduationCap className="w-3 h-3" />
              <span>Internship Programs</span>
            </button>
            <button
              onClick={() => setTypeFilter('Full-Time')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                typeFilter === 'Full-Time' ? 'bg-blue-600 text-white' : 'text-slate-400'
              }`}
            >
              Full-Time Roles
            </button>
          </div>
        </div>
      </div>

      {/* Internship Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/60 via-slate-900 to-indigo-950/60 border border-emerald-500/30 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold">
              🌟 Summer / Winter AI Internship Cohort 2026
            </span>
            <h2 className="text-2xl font-bold text-white">Hands-on Mentorship & Pre-Placement Offers</h2>
            <p className="text-xs text-slate-300 max-w-2xl">
              Selected interns work directly on production LLM agents, Playwright scraping clusters, and responsive React applications with daily 1-on-1 guidance from Principal Engineers.
            </p>
          </div>
          <button
            onClick={() => {
              const internJob = careers.find((c) => c.type === 'Internship') || careers[0];
              setSelectedJob(internJob);
              setSubmittedSuccess(false);
            }}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 whitespace-nowrap cursor-pointer"
          >
            Apply for Cohort 2026
          </button>
        </div>
      </div>

      {/* Job Openings List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white">Active Positions ({filteredCareers.length})</h2>

        <div className="grid grid-cols-1 gap-4">
          {(filteredCareers || []).map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-white">{job.title}</h3>
                  <span
                    className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold ${
                      job.type === 'Internship'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-blue-500/20 text-cyan-300 border border-blue-500/30'
                    }`}
                  >
                    {job.type}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-950 text-slate-400 text-[10px] border border-slate-800">
                    {job.department}
                  </span>
                </div>

                <p className="text-xs text-slate-400 max-w-3xl leading-relaxed">
                  {job.description}
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-400" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" /> {job.experience}
                  </span>
                  <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                    <DollarSign className="w-3.5 h-3.5" /> {job.stipendOrSalary}
                  </span>
                </div>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setSubmittedSuccess(false);
                  }}
                  className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>Apply Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-xl max-h-[90vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
            <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider">
                  Orbit-I Talent Portal
                </div>
                <h3 className="text-sm font-bold text-white">{selectedJob.title}</h3>
              </div>
              <button
                onClick={() => setSelectedJob(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {submittedSuccess ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h4 className="text-base font-bold text-white">Application Received!</h4>
                  <p className="text-xs text-slate-300 max-w-sm mx-auto">
                    Thank you, <span className="text-cyan-300 font-semibold">{applicantName}</span>. Our technical review committee has logged your profile into our HR system.
                  </p>
                  <button
                    onClick={() => setSelectedJob(null)}
                    className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="Ada Lovelace"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="ada@university.edu"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                        GitHub / Portfolio URL
                      </label>
                      <input
                        type="url"
                        value={portfolioUrl}
                        onChange={(e) => setPortfolioUrl(e.target.value)}
                        placeholder="https://github.com/yourhandle"
                        className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Resume Upload Simulation */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Resume / CV Document (PDF / DOCX)
                    </label>
                    <div className="p-3 rounded-xl bg-slate-950 border border-dashed border-slate-700 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Upload className="w-4 h-4 text-cyan-400" />
                        <span className="font-mono text-[11px]">{resumeName}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResumeName(`Resume_Updated_${Date.now().toString().slice(-4)}.pdf`)}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-cyan-300"
                      >
                        Change File
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 mb-1">
                      Why Orbit-I? (Brief Note)
                    </label>
                    <textarea
                      rows={3}
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      placeholder="Share a brief overview of your projects, skills, or why you want to join..."
                      className="w-full px-3 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-cyan-300" />
                        <span>Submitting Application to Orbit-I HR...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Candidate Application</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

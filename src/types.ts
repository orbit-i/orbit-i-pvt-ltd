export type NavigationTab = 
  | 'home'
  | 'about'
  | 'team'
  | 'services'
  | 'products'
  | 'blogs'
  | 'careers'
  | 'gallery'
  | 'featured'
  | 'contact'
  | 'admin'
  | 'client-portal';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'AI & ML' | 'Web & Apps' | 'Python & Automation' | 'Graphics & UI/UX' | 'Digital Marketing' | 'Custom Products' | 'Cloud & DevOps';
  shortDesc: string;
  fullDesc: string;
  icon: string;
  features: string[];
  technologies: string[];
  startingPrice: number;
  deliveryTime: string;
  popular?: boolean;
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  category: 'SaaS' | 'AI Tool' | 'Automation Bot' | 'Enterprise Suite' | 'Design Asset';
  description: string;
  version: string;
  badge?: string;
  features: string[];
  monthlyPrice: number;
  annualPrice: number;
  oneTimePrice?: number;
  demoUrl?: string;
  metrics: { label: string; value: string }[];
  status: 'Live' | 'Beta' | 'Coming Soon';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'AI & Data' | 'Python & Scripting' | 'Web Engineering' | 'Design & UX' | 'Marketing & Growth';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate: string;
  readTime: string;
  summary: string;
  content: string;
  tags: string[];
  featured?: boolean;
}

export interface CareerOpening {
  id: string;
  title: string;
  type: 'Full-Time' | 'Part-Time' | 'Internship' | 'Contract';
  department: 'AI & Engineering' | 'Frontend / UI' | 'Python / Backend' | 'Design & Graphics' | 'Growth & Marketing' | 'Product & QA';
  location: 'Remote' | 'On-Site' | 'Hybrid';
  experience: string;
  stipendOrSalary: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  duration?: string; // For internships (e.g., '3 Months Cohort')
  isOpen: boolean;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  email: string;
  phone: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  resumeFileName: string;
  coverLetter: string;
  status: 'Pending' | 'Reviewing' | 'Interview Scheduled' | 'Accepted' | 'Rejected';
  appliedAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'UI/UX Mockups' | '3D & Motion' | 'Client Launches' | 'Hackathons & Culture' | 'Product Renders';
  description: string;
  imageUrl: string;
  aspectRatio?: string;
  tags: string[];
  featured?: boolean;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  summary: string;
  metrics: { label: string; value: string; trend: string }[];
  challenge: string;
  solution: string;
  technologies: string[];
  imageUrl: string;
}

export interface InquiryLead {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  companyName?: string;
  serviceCategory: string;
  budgetRange: string;
  timeline: string;
  projectDetails: string;
  status: 'New' | 'Contacted' | 'Proposal Sent' | 'Closed Won' | 'Archived';
  createdAt: string;
  source: string;
}

export interface ClientProject {
  id: string;
  projectName: string;
  clientName: string;
  clientEmail: string;
  title?: string;
  description?: string;
  leadArchitect?: string;
  targetDeadline?: string;
  targetDelivery?: string;
  targetLaunchDate?: string;
  startDate?: string;
  progressPercent?: number;
  progressPercentage?: number;
  status?: string;
  techStack?: string[];
  technologies?: string[];
  currentPhase: string;
  spentBudget: number;
  totalBudget: number;
  budget?: number;
  githubRepo?: string;
  figmaUrl?: string;
  architectureUrl?: string;
  milestones?: {
    id?: string;
    title: string;
    description?: string;
    status: 'Completed' | 'In Progress' | 'Upcoming' | 'Pending';
    dueDate: string;
    deliverableUrl?: string;
  }[];
  deliverables?: {
    id: string;
    name?: string;
    title?: string;
    type?: string;
    version?: string;
    submittedAt?: string;
    category?: 'Design Token' | 'Source Repo' | 'API Docs' | 'Build Binary' | 'Security Audit';
    url: string;
    size?: string;
    updatedAt?: string;
  }[];
  healthStatus?: 'Optimal' | 'On Track' | 'Attention Needed';
}

export type ProjectTracking = ClientProject;

export interface SupportTicket {
  id: string;
  clientName: string;
  clientEmail: string;
  projectName?: string;
  projectTitle?: string;
  subject: string;
  priority: 'Normal' | 'High' | 'Urgent' | 'Critical / SLA Breach';
  type?: 'Bug Fix' | 'Feature Request' | 'Infrastructure Scaling' | 'General Query';
  status: 'Open' | 'In Investigation' | 'Resolved' | 'Closed';
  createdAt: string;
  messages: {
    id: string;
    sender: 'client' | 'support' | 'architect';
    senderName: string;
    text: string;
    timestamp: string;
  }[];
}

export interface SystemAuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  category: 'CMS' | 'CRM' | 'BILLING' | 'AUTH' | 'DATABASE' | 'SECURITY' | 'SYSTEM';
  status: 'SUCCESS' | 'WARNING' | 'ALERT';
  ipAddress: string;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  clientName: string;
  clientEmail: string;
  serviceDescription?: string;
  projectTitle?: string;
  currency?: string;
  amount: number;
  tax?: number;
  totalAmount?: number;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Unpaid';
  dueDate: string;
  issuedDate: string;
  issueDate?: string;
  paidAt?: string;
  lineItems?: {
    id: string;
    description: string;
    rate: number;
    quantity: number;
    total: number;
  }[];
}

export interface PerformanceMetricData {
  time: string;
  uptime: number; // percentage
  apiLatency: number; // ms
  trafficK: number; // thousand users
  conversionRate: number; // percentage
  serverLoad: number; // percentage
}

export interface CollabTask {
  id: string;
  title: string;
  column: 'Backlog' | 'In Progress' | 'Code Review' | 'Done';
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  assignedTo: string;
  tags: string[];
  dueDate: string;
}

export interface StickyNote {
  id: string;
  text: string;
  color: 'yellow' | 'blue' | 'green' | 'pink' | 'purple';
  author: string;
  x: number;
  y: number;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  legalEntity: string;
  logoUrl: string;
  tagline: string;
  contactEmail: string;
  supportEmail: string;
  phone: string;
  address: string;
  foundedYear: string;
  emergencyAlert: {
    enabled: boolean;
    message: string;
    type: 'info' | 'warning' | 'success';
  };
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    instagram: string;
    youtube: string;
    facebook: string;
    whatsapp: string;
  };
  hostingConfigs: {
    mysqlConfigured: boolean;
    vercelReady: boolean;
  };
}

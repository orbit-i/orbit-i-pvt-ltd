import {
  ServiceItem,
  ProductItem,
  BlogPost,
  CareerOpening,
  GalleryItem,
  CaseStudy,
  SiteSettings,
  ClientProject,
  InvoiceItem,
  CollabTask,
  StickyNote,
  PerformanceMetricData,
  SupportTicket,
  SystemAuditLog
} from '../types';

export const INITIAL_SETTINGS: SiteSettings = {
  companyName: 'ORBIT-I',
  legalEntity: 'ORBIT-I (Private) Limited',
  logoUrl: '/logo.png',
  tagline: 'Custom Software Development, Web Applications & Technical Solutions',
  contactEmail: 'orbiti2026@gmail.com',
  supportEmail: 'orbiti2026@gmail.com',
  phone: '+92 319 0275751',
  address: 'Nawabshah, Sindh, Pakistan',
  foundedYear: '2022',
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

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Enterprise AI & Machine Learning',
    category: 'AI & ML',
    shortDesc: 'Custom LLM fine-tuning, RAG agents, predictive intelligence & vision AI for business transformation.',
    fullDesc: 'We build proprietary AI pipelines, multi-agent frameworks, semantic vector databases, and real-time inference systems that scale to millions of concurrent interactions.',
    icon: 'Cpu',
    features: [
      'Custom LLM Fine-Tuning & Quantization',
      'Autonomous AI Agents & Multi-Agent Swarms',
      'RAG (Retrieval-Augmented Generation) Knowledge Bases',
      'Computer Vision & Real-time OCR Systems',
      'Automated Sentiment & Voice AI Models'
    ],
    technologies: ['Gemini 2.5', 'PyTorch', 'LangChain', 'LlamaIndex', 'Pinecone', 'FastAPI'],
    startingPrice: 3499,
    deliveryTime: '3-6 Weeks',
    popular: true,
  },
  {
    id: 'srv-2',
    title: 'High-Performance Web & Mobile Apps',
    category: 'Web & Apps',
    shortDesc: 'Ultra-fast, responsive web platforms and cross-platform mobile apps with pixel-perfect UI/UX.',
    fullDesc: 'Modern single-page applications, headless eCommerce, and React Native mobile apps engineered with lightning load times, bank-grade security, and robust offline support.',
    icon: 'Globe',
    features: [
      'Modern React, Next.js & TypeScript Architectures',
      'Cross-Platform iOS & Android (React Native/Flutter)',
      'Sub-second Edge Rendering & WebSockets',
      'PWA (Progressive Web Apps) with Offline Cache',
      'Zero-Trust API Security & OAuth 2.0 / SAML'
    ],
    technologies: ['React 19', 'TypeScript', 'Node.js', 'TailwindCSS', 'GraphQL', 'Vite'],
    startingPrice: 2499,
    deliveryTime: '2-5 Weeks',
    popular: true,
  },
  {
    id: 'srv-3',
    title: 'Python Scripting & Robotic Automation',
    category: 'Python & Automation',
    shortDesc: 'Eliminate manual workloads with intelligent Python bots, web crawlers, ERP sync, and workflow automations.',
    fullDesc: 'We automate mission-critical repetitive tasks: automated web scraping at scale, database synchronization, invoice OCR pipelines, CRM triggers, and serverless scripts.',
    icon: 'Terminal',
    features: [
      'Automated Data Scraping & Web Crawlers',
      'ERP & Accounting Workflow Automations',
      'Automated Document Processing & PDF Parsing',
      'Cron Job Orchestration & Celery Task Queues',
      'Custom CLI Utilities & Desktop Automation'
    ],
    technologies: ['Python 3.12', 'Selenium', 'Playwright', 'Celery', 'Pandas', 'BeautifulSoup'],
    startingPrice: 1499,
    deliveryTime: '1-3 Weeks',
    popular: false,
  },
  {
    id: 'srv-4',
    title: 'Brand Identity, Graphics & 3D UI/UX',
    category: 'Graphics & UI/UX',
    shortDesc: 'Striking design systems, high-converting product UI/UX, 3D interactive web visuals, and brand guidelines.',
    fullDesc: 'Human-centric UI/UX design validated with interactive prototypes, comprehensive Figma design systems, motion graphics, and WebGL 3D elements that captivate users.',
    icon: 'Palette',
    features: [
      'Comprehensive Figma Design Systems & Tokens',
      'Interactive 3D Web Visuals & WebGL Shaders',
      'Brand Identity Kits, Typography & Logo Mastery',
      'Mobile App UI/UX & Micro-interactions',
      'Accessibility Audits (WCAG 2.1 AA Compliant)'
    ],
    technologies: ['Figma', 'Three.js', 'Spline', 'Blender', 'Adobe Suite', 'Framer Motion'],
    startingPrice: 1899,
    deliveryTime: '2-4 Weeks',
    popular: false,
  },
  {
    id: 'srv-5',
    title: 'Custom SaaS & Digital Product Engineering',
    category: 'Custom Products',
    shortDesc: 'End-to-end bespoke software platforms, multi-tenant SaaS, billing portals, and custom CRMs.',
    fullDesc: 'Turn your product vision into a scalable enterprise software product. We handle full SDLC from architecture, database schema design, stripe billing, to auto-scaling cloud deployments.',
    icon: 'Layers',
    features: [
      'Multi-Tenant SaaS Architecture',
      'Subscription Billing & Payment Gateways',
      'Role-Based Access Control (RBAC) & Audit Logs',
      'Custom Admin Dashboards & Analytics Engines',
      'Public REST/GraphQL API Hub for Integrations'
    ],
    technologies: ['PostgreSQL', 'Express', 'Redis', 'Docker', 'Stripe API', 'Prisma'],
    startingPrice: 4999,
    deliveryTime: '4-8 Weeks',
    popular: true,
  },
  {
    id: 'srv-6',
    title: 'High-ROI Digital Marketing & Growth SEO',
    category: 'Digital Marketing',
    shortDesc: 'Data-driven SEO, PPC campaigns, conversion rate optimization (CRO), and content marketing engines.',
    fullDesc: 'Dominate organic search rankings and maximize customer acquisition with hyper-targeted search ads, programmatic SEO, technical site speed audits, and social growth funnels.',
    icon: 'TrendingUp',
    features: [
      'Technical & Programmatic SEO Optimization',
      'Google Ads & Meta Paid Media Campaigns',
      'Conversion Funnel Optimization & A/B Testing',
      'B2B LinkedIn Lead Generation Funnels',
      'Marketing Automation & Cold Email Engines'
    ],
    technologies: ['Google Analytics 4', 'Ahrefs', 'Semrush', 'HubSpot', 'Meta Pixel'],
    startingPrice: 1299,
    deliveryTime: 'Monthly Retainer',
    popular: false,
  },
  {
    id: 'srv-7',
    title: 'Cloud Infrastructure, DevOps & Database Engineering',
    category: 'Cloud & DevOps',
    shortDesc: 'Automated CI/CD pipelines, Kubernetes, MySQL / Supabase clustering, and Hostinger/Vercel setups.',
    fullDesc: 'Bulletproof cloud operations with zero-downtime deployments, container orchestration, automated backups, and database replication optimized for cost and resilience.',
    icon: 'Server',
    features: [
      'CI/CD Pipeline Setup (GitHub Actions / GitLab)',
      'MySQL, PostgreSQL & Supabase Database Tuning',
      'Docker & Kubernetes Containerization',
      'Cloudflare CDN, DDoS Shield & SSL Hardening',
      'Server Monitoring & Prometheus / Grafana Alerts'
    ],
    technologies: ['Docker', 'Kubernetes', 'AWS', 'Supabase', 'MySQL', 'Nginx', 'Vercel'],
    startingPrice: 1999,
    deliveryTime: '1-3 Weeks',
    popular: false,
  },
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'OrbitPulse AI CRM',
    tagline: 'Autonomous AI Sales & Customer Relationship Suite',
    category: 'AI Tool',
    description: 'An AI-native CRM that auto-qualifies inbound leads, summarizes meetings, drafts contextual client emails, and predicts deal close probabilities in real time.',
    version: 'v3.2.0',
    badge: 'Flagship AI',
    features: [
      'AI Lead Scoring & Automated Follow-Up Sequences',
      'Voice & Call Transcription with Action Item Extraction',
      'Omnichannel Inbox (Email, WhatsApp, Webchat)',
      'Custom Pipeline Stages & Revenue Forecasts',
      '1-Click Export to MySQL, Supabase, or CSV'
    ],
    monthlyPrice: 79,
    annualPrice: 790,
    oneTimePrice: 1499,
    demoUrl: 'https://orbitpulse.orbit-i.com',
    metrics: [
      { label: 'Time Saved / Rep', value: '14 hrs/wk' },
      { label: 'Close Rate Boost', value: '+42%' },
      { label: 'Active Users', value: '18,500+' }
    ],
    status: 'Live',
  },
  {
    id: 'prod-2',
    name: 'OrbitFlow Robotic Engine',
    tagline: 'Visual No-Code / Low-Code Python Automation Hub',
    category: 'Automation Bot',
    description: 'Connect disparate apps, automate web scraping, trigger database migrations, and deploy Python serverless workers with zero devops friction.',
    version: 'v2.8.4',
    badge: 'Enterprise Automation',
    features: [
      'Visual Node-Based Workflow Canvas',
      'Built-in Headless Browser Scrapers (Playwright)',
      'Scheduled Cron Triggers & Webhook Listeners',
      'Encrypted Secret Vault & API Token Manager',
      'Hostinger, Vercel & AWS 1-Click Worker Deploy'
    ],
    monthlyPrice: 99,
    annualPrice: 990,
    oneTimePrice: 1899,
    demoUrl: 'https://orbitflow.orbit-i.com',
    metrics: [
      { label: 'Tasks Executed', value: '4.8M / mo' },
      { label: 'Success Rate', value: '99.98%' },
      { label: 'Avg Execution', value: '120ms' }
    ],
    status: 'Live',
  },
  {
    id: 'prod-3',
    name: 'OrbitGuard Threat & Code Scanner',
    tagline: 'Continuous Security, Vulnerability & API Monitor',
    category: 'Enterprise Suite',
    description: 'Automated vulnerability scanner for web apps, open ports, exposed secrets, SQL injections, and outdated npm/python packages with instant patch recommendations.',
    version: 'v1.9.0',
    badge: 'DevSecOps',
    features: [
      'Continuous SAST & DAST Web App Auditing',
      'Secret Leak Detector in Git Commits',
      'SSL Certificate & DNS Health Heartbeat',
      'Automated PDF Compliance Reports (SOC2, ISO)',
      'Slack & Discord Instant Incident Alerts'
    ],
    monthlyPrice: 149,
    annualPrice: 1490,
    oneTimePrice: 2499,
    demoUrl: 'https://orbitguard.orbit-i.com',
    metrics: [
      { label: 'Vulnerabilities Prevented', value: '120K+' },
      { label: 'False Positive Rate', value: '<0.1%' },
      { label: 'Scan Speed', value: '500 URLs/min' }
    ],
    status: 'Live',
  },
  {
    id: 'prod-4',
    name: 'OrbitCanvas 3D Design Studio',
    tagline: 'Interactive WebGL 3D Component Builder for React',
    category: 'Design Asset',
    description: 'Design responsive 3D interactive hero sections, orbital particle meshes, and futuristic UI widgets directly in your browser and export clean React + Tailwind code.',
    version: 'v4.1.0',
    badge: 'Creative Tech',
    features: [
      'Visual Shader & Lighting Editor',
      'Mouse Reactive Physics & Orbital Gravity Nodes',
      'Direct React JSX / Tailwind Component Export',
      'Optimized Lightweight Bundle (<45kb gzipped)',
      '100+ Pre-built Cyberpunk & Minimal 3D Presets'
    ],
    monthlyPrice: 49,
    annualPrice: 490,
    oneTimePrice: 899,
    demoUrl: 'https://orbitcanvas.orbit-i.com',
    metrics: [
      { label: 'Designers Using', value: '8,200+' },
      { label: 'FPS on Mobile', value: '60 FPS' },
      { label: 'Export Code Size', value: '<35KB' }
    ],
    status: 'Live',
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How Multi-Agent AI Swarms are Revolutionizing Enterprise Automation in 2026',
    slug: 'multi-agent-ai-swarms-enterprise-automation',
    category: 'AI & Data',
    author: {
      name: 'Samad Rind',
      role: 'Chief AI Architect, Orbit-I',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    publishedDate: 'August 10, 2026',
    readTime: '6 min read',
    summary: 'Explore how deploying autonomous Python AI agents with specialized sub-tasks replaces monolithic LLM prompts, reducing hallucination by 80% and scaling operational throughput.',
    content: `## The Paradigm Shift in Enterprise AI

For the past three years, businesses treated Generative AI as a single-prompt question-answering tool. In 2026, the real value lies in **Multi-Agent Architectures**—where autonomous software agents coordinate, verify, and execute complex workflows without manual supervision.

### Why Single-Prompt LLMs Fall Short
1. **Context Window Degradation**: Long prompts suffer from attention drift.
2. **Lack of Validation**: Single models cannot objectively evaluate their own logical output.
3. **No Execution Capability**: Asking a chatbot to query a database and trigger a payment requires tooling.

### The Orbit-I Multi-Agent Framework
At Orbit-I Private Limited, our engineering team orchestrates three-tiered agent pipelines:
- **The Planner Agent**: Deconstructs user intent into discrete functional steps.
- **The Worker Agents**: Specialized Python modules for data scraping, code generation, or CRM lookup.
- **The Critic Agent**: Rigorously evaluates schema compliance and security parameters before executing real database transactions.

By isolating agent duties, our enterprise clients report an **82% decrease in workflow bottlenecks** and 99.9% data reliability.`,
    tags: ['Artificial Intelligence', 'Multi-Agent', 'Python', 'Enterprise Tech'],
    featured: true,
  },
  {
    id: 'blog-2',
    title: 'Building 60FPS 3D Web Experiences with React 19 and Minimalist Shaders',
    slug: '60fps-3d-web-experiences-react-19',
    category: 'Design & UX',
    author: {
      name: 'Elena Rostova',
      role: 'Lead UI/UX & Motion Engineer',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    },
    publishedDate: 'July 28, 2026',
    readTime: '5 min read',
    summary: 'Discover mathematical techniques for rendering lightweight 3D canvas particles and smooth orbital physics without draining mobile battery or inflating bundle size.',
    content: `## Beyond Generic AI Glassmorphism

Modern digital products must communicate authority through kinetic craft. Yet most 3D web experiences suffer from sluggish framerates on low-power devices.

### Mathematical Particle Clustering
Instead of allocating thousands of separate DOM nodes or unoptimized WebGL objects, we utilize custom Canvas 2D and low-overhead fragment shaders. By running physics calculations on normalized vectors and clamping DPR to 2, we achieve consistent 60fps across iOS, Android, and Desktop.

### Key Rules for Production 3D UI
- **Debounced Resize Observers**: Never compute dimensions on global window scroll.
- **Adaptive Node Density**: Automatically scale node counts based on \`navigator.hardwareConcurrency\`.
- **High Contrast Neutrals**: Pair subtle 3D lighting with WCAG AA compliant typography.`,
    tags: ['React 19', '3D Graphics', 'WebGL', 'UI/UX Design'],
    featured: false,
  },
  {
    id: 'blog-3',
    title: 'High-Scale Python Automation: Scraping, Clean ETL & Hostinger MySQL Sync',
    slug: 'high-scale-python-automation-mysql-hostinger',
    category: 'Python & Scripting',
    author: {
      name: 'Devin Thorne',
      role: 'Principal Backend Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    },
    publishedDate: 'July 15, 2026',
    readTime: '7 min read',
    summary: 'A deep dive into building fault-tolerant Python scrapers using Playwright and connecting them seamlessly to Hostinger MySQL and Supabase databases.',
    content: `## Automating the Un-automatable

Modern web applications constantly need fresh market intelligence, inventory feeds, and cross-platform synchronization. Building robust Python automation pipelines requires handling anti-bot protections, rate limits, and database locks.

### Step-by-Step Architecture
1. **Headless Browser Rotation**: Employing Playwright with randomized user agents and fingerprint cloaking.
2. **In-Memory Streaming ETL**: Transforming raw HTML into validated Pydantic models.
3. **Bulk Upsert Transactions**: Writing data into MySQL databases using parameterized connection pools to prevent bottlenecks.

Check our SuperAdmin panel to generate ready-to-run MySQL scripts for Hostinger and Supabase!`,
    tags: ['Python', 'Automation', 'MySQL', 'Hostinger', 'DevOps'],
    featured: false,
  },
];

export const INITIAL_CAREERS: CareerOpening[] = [
  {
    id: 'job-1',
    title: 'Senior AI & Python Solutions Architect',
    type: 'Full-Time',
    department: 'AI & Engineering',
    location: 'Hybrid',
    experience: '4+ Years',
    stipendOrSalary: '$90,000 - $130,000 / yr',
    description: 'Lead the architecture and implementation of enterprise LLM agents, vector search systems, and custom automation pipelines for global Fortune 500 clients.',
    requirements: [
      'Deep proficiency in Python 3.11+, PyTorch, LangChain, and FastAPI',
      'Experience deploying models with Gemini API, OpenAI, or local quantized LLMs',
      'Strong grasp of distributed task queues (Celery, Redis, Kafka)',
      'Experience with SQL (PostgreSQL/MySQL) and Vector DBs (Pinecone, Chroma)'
    ],
    responsibilities: [
      'Design scalable AI agent microservices from concept to production',
      'Mentor junior engineers and review code for security and algorithmic speed',
      'Collaborate with client stakeholders to define technical roadmaps'
    ],
    isOpen: true,
  },
  {
    id: 'job-2',
    title: 'Full-Stack React & TypeScript Engineer',
    type: 'Full-Time',
    department: 'Frontend / UI',
    location: 'Remote',
    experience: '2-4 Years',
    stipendOrSalary: '$70,000 - $105,000 / yr',
    description: 'Craft ultra-responsive web applications, interactive dashboards, and client portals with React 19, Tailwind CSS, Motion, and Node.js backends.',
    requirements: [
      'Expertise in React, TypeScript, Tailwind CSS, and Node.js / Express',
      'Passion for high-level UI/UX, micro-animations, and responsive ergonomics',
      'Familiarity with RESTful APIs, WebSockets, and state management',
      'Solid understanding of web performance optimization and Core Web Vitals'
    ],
    responsibilities: [
      'Build scalable frontend components and real-time collaboration widgets',
      'Ensure seamless cross-browser and mobile responsive execution',
      'Write clean, modular code with robust typing and automated tests'
    ],
    isOpen: true,
  },
  {
    id: 'job-3',
    title: 'AI & Full-Stack Summer/Winter Internship (Paid Cohort 2026)',
    type: 'Internship',
    department: 'AI & Engineering',
    location: 'Remote',
    experience: 'Students / Fresh Graduates',
    stipendOrSalary: '$1,200 - $2,000 / mo + Certificate & PPO',
    duration: '3 to 6 Months',
    description: 'An intensive, hands-on mentorship program at Orbit-I Private Limited where you work directly on production AI apps, Python automation bots, and full-stack web platforms.',
    requirements: [
      'Fundamental understanding of Python, JavaScript/TypeScript, or React',
      'Eager curiosity to build real-world software and solve challenging problems',
      'Previous hobby projects, GitHub repositories, or hackathon participation is a plus',
      'Commitment of 25-40 hours per week during the internship term'
    ],
    responsibilities: [
      'Work alongside Senior Engineers on live client and internal SaaS projects',
      'Participate in daily standups, code reviews, and architecture brainstorming',
      'Present a capstone production project at the end of the cohort for Pre-Placement Offers (PPO)'
    ],
    isOpen: true,
  },
  {
    id: 'job-4',
    title: 'UI/UX & 3D Motion Graphics Designer',
    type: 'Full-Time',
    department: 'Design & Graphics',
    location: 'Hybrid',
    experience: '2+ Years',
    stipendOrSalary: '$60,000 - $90,000 / yr',
    description: 'Shape the visual language of Orbit-I and our enterprise clients. Create futuristic design systems, 3D interactive assets, brand kits, and marketing visualizers.',
    requirements: [
      'Mastery of Figma, design token systems, and interactive prototyping',
      'Experience with 3D tools (Spline, Blender, or Cinema 4D)',
      'Deep appreciation for typographic hierarchy, negative space, and WCAG accessibility',
      'Strong portfolio showcasing mobile & desktop product interfaces'
    ],
    responsibilities: [
      'Design intuitive UI/UX for web applications, SaaS dashboards, and mobile apps',
      'Create 3D visual assets and coordinate with frontend developers for smooth implementation',
      'Refine brand identity and graphic assets for company marketing collateral'
    ],
    isOpen: true,
  },
  {
    id: 'job-5',
    title: 'Python Automation & Web Scraping Intern (Paid)',
    type: 'Internship',
    department: 'Python / Backend',
    location: 'Remote',
    experience: 'Beginner / Intermediate',
    stipendOrSalary: '$1,000 - $1,600 / mo + Recommendation Letter',
    duration: '3 Months',
    description: 'Master practical Python automation, Playwright/Selenium web scrapers, data cleaning with Pandas, and database integrations.',
    requirements: [
      'Good grasp of Python programming concepts and data structures',
      'Basic knowledge of HTTP requests, HTML DOM, and API consumption',
      'High enthusiasm to learn backend workflows and MySQL/Supabase databases'
    ],
    responsibilities: [
      'Build custom scraping scripts and test automation bots',
      'Integrate data cleaning scripts with MySQL databases',
      'Document automated workflows and test edge cases'
    ],
    isOpen: true,
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'OrbitPulse AI Command Center UI',
    category: 'UI/UX Mockups',
    description: 'High-density dark UI design with live neural pipeline graph and telemetry indicators.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    tags: ['Figma', 'Dark UI', 'Dashboard', 'AI Interface'],
    featured: true,
  },
  {
    id: 'gal-2',
    title: 'Kinetic 3D Orbital Particle System',
    category: '3D & Motion',
    description: 'Real-time WebGL interactive orbital cosmos engine engineered for high-impact landing pages.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    tags: ['Three.js', 'WebGL', '3D Visuals', 'Shaders'],
    featured: true,
  },
  {
    id: 'gal-3',
    title: 'Autonomous Drone Fleet Logistics App',
    category: 'Client Launches',
    description: 'Cross-platform mobile app interface for tracking automated cargo deliveries in real-time.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    tags: ['React Native', 'Mobile UI', 'Logistics', 'IoT'],
    featured: false,
  },
  {
    id: 'gal-4',
    title: 'Orbit-I Annual Global AI Hackathon',
    category: 'Hackathons & Culture',
    description: 'Our engineering & design team building 14 AI prototypes over a 48-hour sprint.',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
    tags: ['Team Culture', 'Hackathon', 'Innovation', 'Orbit-I HQ'],
    featured: false,
  },
  {
    id: 'gal-5',
    title: 'Fintech Ultra-Low-Latency Trading Terminal',
    category: 'Product Renders',
    description: 'High-frequency algorithmic trading desktop view with instantaneous WebSocket orderbook updates.',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    tags: ['Fintech', 'Electron', 'Real-Time', 'High Speed'],
    featured: true,
  },
  {
    id: 'gal-6',
    title: 'Custom Product Packaging & Brand Identity',
    category: 'UI/UX Mockups',
    description: 'Geometric brand identity kit and luxury holographic product packaging mockup.',
    imageUrl: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=80',
    tags: ['Branding', 'Graphics', 'Identity', 'Typography'],
    featured: false,
  },
];

export const INITIAL_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Full Institutional Website & Admin Platform for Government Girls Degree College, Nawabshah',
    clientName: 'Government Girls Degree College, Nawabshah',
    industry: 'Education',
    summary: 'ORBIT-I designed and built a complete institutional website for GGDC Nawabshah on React, Vite, and Tailwind CSS, backed by a full Supabase database — covering authentication, a notice board, a photo/video gallery, an HOD directory, and a dedicated admin panel for college staff to manage content without developer involvement.',
    metrics: [
      { label: 'Stack', value: 'React + Vite + Supabase', trend: 'positive' },
      { label: 'Deployment', value: 'Live on Vercel', trend: 'positive' },
      { label: 'Admin Access', value: 'Full self-service CMS', trend: 'positive' }
    ],
    challenge: 'The college had no digital presence — no way to publish notices, showcase faculty, or share campus media online, and no technical staff to run one.',
    solution: 'We built a public-facing site plus a Supabase-backed admin panel so non-technical college staff can independently manage notices, the HOD directory, and the gallery after handover, with no developer required to update content.',
    technologies: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    imageUrl: '',
  },
  {
    id: 'case-2',
    title: 'ORBIT-I Pulse — Internal Enterprise Management Platform',
    clientName: 'ORBIT-I (Internal Product)',
    industry: 'Enterprise SaaS / Internal Tooling',
    summary: 'ORBIT-I Pulse is our own enterprise management platform, built on Next.js and Supabase, covering a 12-role permission hierarchy, department and team management, task assignment, leave workflows, a document workspace, in-app notifications, and a dark-mode UI with 7-language support including RTL. It is currently being positioned for external/commercial licensing.',
    metrics: [
      { label: 'Role Hierarchy', value: '12 roles', trend: 'positive' },
      { label: 'Language Support', value: '7 languages + RTL', trend: 'positive' },
      { label: 'Status', value: 'Live, internal use', trend: 'positive' }
    ],
    challenge: 'ORBIT-I needed a single internal system to manage its own team structure, tasks, leave, documents, and communication as the company scaled past its first hires.',
    solution: 'We built Pulse in-house: Next.js 14 on the frontend, Supabase (Postgres) for data and auth, TOTP-based 2FA, audit logging, and a fully custom design system on ORBIT-I brand tokens.',
    technologies: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Vercel'],
    imageUrl: '',
  },
];

export const INITIAL_CLIENT_PROJECTS: ClientProject[] = [
  {
    id: 'proj-101',
    projectName: 'AuraPay Global Fintech Mobile App',
    title: 'AuraPay Global Fintech Mobile App',
    clientName: 'Aura Financial Inc.',
    clientEmail: 'client@aurapay.io',
    description: 'Cross-platform financial application with biometric authentication, instant borderless remittances, and zero-fee currency swapping.',
    leadArchitect: 'Devin Thorne (Principal Engineer)',
    targetDeadline: 'Sept 30, 2026',
    currentPhase: 'Core Engineering',
    progressPercentage: 68,
    progressPercent: 68,
    targetLaunchDate: 'Sept 30, 2026',
    spentBudget: 24500,
    totalBudget: 35000,
    status: 'In Development (Sprint 4/6)',
    technologies: ['React Native', 'TypeScript', 'Stripe Connect', 'Supabase', 'Node.js', 'FastAPI'],
    milestones: [
      { id: 'm-1', title: 'Requirements & Security Compliance Specs', description: 'PCI-DSS Tier 1 mapping & SOC2 compliance blueprints approved.', status: 'Completed', dueDate: 'July 10, 2026', deliverableUrl: 'https://docs.aurapay.io/security' },
      { id: 'm-2', title: 'Interactive Figma Prototypes & Design Tokens', description: 'Design system with 120+ micro-interactions and dark/light luxury theme.', status: 'Completed', dueDate: 'July 25, 2026', deliverableUrl: 'https://figma.com/@orbit-i/aurapay' },
      { id: 'm-3', title: 'KYC & Stripe Gateway API Integration', description: 'Automated identity verification pipeline with webhook idempotency.', status: 'In Progress', dueDate: 'August 20, 2026' },
      { id: 'm-4', title: 'End-to-End Penetration Testing & Audit', description: 'Third-party white-hat penetration testing and latency optimization.', status: 'Upcoming', dueDate: 'Sept 15, 2026' },
      { id: 'm-5', title: 'iOS App Store & Google Play Launch', description: 'Automated CI/CD release build publishing with Fastlane.', status: 'Upcoming', dueDate: 'Sept 30, 2026' },
    ],
    deliverables: [
      { id: 'del-1', name: 'AuraPay Complete Figma UI Kit & Tokens', category: 'Design Token', url: 'https://figma.com/@orbit-i/aurapay', size: '42 MB', updatedAt: '2026-08-10' },
      { id: 'del-2', name: 'Private GitHub Repository Access (v0.8.4)', category: 'Source Repo', url: 'https://github.com/orbit-i-clients/aurapay-app', size: '128 MB', updatedAt: '2026-08-14' },
      { id: 'del-3', name: 'OpenAPI 3.1 Swagger Interactive Specification', category: 'API Docs', url: 'https://api.aurapay.io/docs', size: '2.4 MB', updatedAt: '2026-08-12' },
      { id: 'del-4', name: 'Milestone 2 Security Audit & PCI Checklist', category: 'Security Audit', url: 'https://audit.aurapay.io/ms2-report.pdf', size: '8.1 MB', updatedAt: '2026-08-08' },
    ],
    healthStatus: 'Optimal',
  },
  {
    id: 'proj-102',
    projectName: 'MediPulse Automated Clinical Scheduler',
    title: 'MediPulse Automated Clinical Scheduler',
    clientName: 'HealthCore Systems',
    clientEmail: 'admin@healthcore.org',
    description: 'HIPAA-compliant autonomous patient triaging, schedule optimization, and real-time doctor availability broadcast network.',
    leadArchitect: 'Elena Rostova (AI Systems Lead)',
    targetDeadline: 'August 25, 2026',
    currentPhase: 'QA & Testing',
    progressPercentage: 88,
    progressPercent: 88,
    targetLaunchDate: 'August 25, 2026',
    spentBudget: 18000,
    totalBudget: 20000,
    status: 'Final Staging & UAT',
    technologies: ['Python 3.12', 'FastAPI', 'React 19', 'MySQL Hostinger', 'Twilio SMS', 'Redis'],
    milestones: [
      { id: 'm-10', title: 'HIPAA Architecture Assessment', description: 'Encrypted storage at rest & in transit with zero-knowledge keys.', status: 'Completed', dueDate: 'June 05, 2026', deliverableUrl: 'https://hipaa.healthcore.org/cert' },
      { id: 'm-11', title: 'Python Backend & Doctor Match Engine', description: 'Predictive algorithm balancing hospital workload & specialty queues.', status: 'Completed', dueDate: 'July 01, 2026' },
      { id: 'm-12', title: 'Patient Web Dashboard & SMS Reminders', description: 'Responsive patient interface with two-way SMS reminder bot.', status: 'Completed', dueDate: 'July 20, 2026' },
      { id: 'm-13', title: 'Stress & Load Testing (5,000 req/sec)', description: 'Simulated clinic rush-hour load with zero memory leaks.', status: 'In Progress', dueDate: 'August 18, 2026' },
      { id: 'm-14', title: 'Production Go-Live on Hostinger Cluster', description: 'Zero-downtime deployment & DNS failover setup.', status: 'Upcoming', dueDate: 'August 25, 2026' },
    ],
    deliverables: [
      { id: 'del-10', name: 'MediPulse Production Release Build Docker Image', category: 'Build Binary', url: 'docker://registry.orbit-i.com/medipulse:v1.2', size: '340 MB', updatedAt: '2026-08-13' },
      { id: 'del-11', name: 'HIPAA Attestation Certificate & Architecture Whitepaper', category: 'Security Audit', url: 'https://healthcore.org/hipaa-cert.pdf', size: '4.8 MB', updatedAt: '2026-07-28' },
      { id: 'del-12', name: 'Admin Portal & Doctor Management UI Source', category: 'Source Repo', url: 'https://github.com/orbit-i-clients/medipulse-ui', size: '64 MB', updatedAt: '2026-08-14' },
    ],
    healthStatus: 'On Track',
  },
  {
    id: 'proj-103',
    projectName: 'Nexus Freight Multi-Agent Intelligence',
    title: 'Nexus Freight Multi-Agent Intelligence',
    clientName: 'Nexus Global Freight',
    clientEmail: 'billing@nexusfreight.com',
    description: 'Autonomous freight forwarding pipeline scraping customs tariffs, tracking shipping containers, and reconciling bills of lading.',
    leadArchitect: 'Alexander Vance (Senior AI Engineer)',
    targetDeadline: 'October 15, 2026',
    currentPhase: 'Discovery',
    progressPercentage: 35,
    progressPercent: 35,
    targetLaunchDate: 'October 15, 2026',
    spentBudget: 9500,
    totalBudget: 28000,
    status: 'Sprint 2 (Data Ingestion)',
    technologies: ['Gemini 2.5', 'Python 3.12', 'Playwright', 'FastAPI', 'PostgreSQL', 'Docker'],
    milestones: [
      { id: 'm-20', title: 'Tariff Data Pipeline Specs', description: 'Mapping 85 global customs authority data formats.', status: 'Completed', dueDate: 'August 01, 2026' },
      { id: 'm-21', title: 'Container OCR & Bill of Lading Parser', description: 'Gemini multimodal parsing of bill of lading scans.', status: 'In Progress', dueDate: 'August 28, 2026' },
      { id: 'm-22', title: 'ERP Two-Way Synchronization', description: 'Automated ledger push into SAP and Oracle NetSuite.', status: 'Upcoming', dueDate: 'Sept 20, 2026' },
      { id: 'm-23', title: 'Autonomous Multi-Agent Dispatcher', description: 'Self-correcting routing swarms with alerting thresholds.', status: 'Upcoming', dueDate: 'October 15, 2026' },
    ],
    deliverables: [
      { id: 'del-20', name: 'Custom Tariff Scraper Python Package', category: 'Source Repo', url: 'https://github.com/orbit-i-clients/nexus-scrapers', size: '18 MB', updatedAt: '2026-08-11' },
      { id: 'del-21', name: 'FastAPI Data Stream Specification Docs', category: 'API Docs', url: 'https://nexus.orbit-i.com/docs', size: '1.9 MB', updatedAt: '2026-08-13' },
    ],
    healthStatus: 'Optimal',
  }
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [
  {
    id: 'tkt-401',
    clientName: 'Aura Financial Inc.',
    clientEmail: 'client@aurapay.io',
    projectName: 'AuraPay Global Fintech Mobile App',
    subject: 'Request webhook endpoint addition for Apple Pay Sandbox testing',
    priority: 'Normal',
    type: 'Feature Request',
    status: 'In Investigation',
    createdAt: '2026-08-14 06:15 AM',
    messages: [
      {
        id: 'msg-1',
        sender: 'client',
        senderName: 'Marcus Sterling (Aura Tech Lead)',
        text: 'Hi Orbit-I team, could we get the sandbox webhook url configured for Apple Pay testing on testnet?',
        timestamp: '06:15 AM',
      },
      {
        id: 'msg-2',
        sender: 'support',
        senderName: 'Devin Thorne (Orbit-I Architect)',
        text: 'Hello Marcus, we have provisioned the testnet webhook router at https://api.aurapay.io/v1/webhooks/apple-sandbox. Testing keys are active.',
        timestamp: '06:40 AM',
      },
    ],
  },
  {
    id: 'tkt-402',
    clientName: 'HealthCore Systems',
    clientEmail: 'admin@healthcore.org',
    projectName: 'MediPulse Automated Clinical Scheduler',
    subject: 'Emergency query: Doctor SMS reminder batch throughput limit',
    priority: 'High',
    type: 'Infrastructure Scaling',
    status: 'Resolved',
    createdAt: '2026-08-13 02:20 PM',
    messages: [
      {
        id: 'msg-11',
        sender: 'client',
        senderName: 'Dr. Clara Vance (HealthCore Director)',
        text: 'We are expanding to 3 more clinics on Monday. What is the current SMS queue throughput on Hostinger?',
        timestamp: '02:20 PM',
      },
      {
        id: 'msg-12',
        sender: 'support',
        senderName: 'Elena Rostova (Orbit-I AI Lead)',
        text: 'Hi Dr. Vance! The Redis message queue handles 2,500 messages/min with automatic rate limiting. We scaled workers so you can onboard all 3 clinics with zero latency.',
        timestamp: '02:35 PM',
      },
    ],
  },
];

export const INITIAL_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'log-001',
    timestamp: '2026-08-14 07:05:12',
    actor: 'SuperAdmin (Samad Rind)',
    action: 'Modified Service Pricing for Enterprise AI Pipeline',
    category: 'CMS',
    status: 'SUCCESS',
    ipAddress: '192.168.1.1',
  },
  {
    id: 'log-002',
    timestamp: '2026-08-14 06:40:22',
    actor: 'System Daemon',
    action: 'Automated Backup: MySQL Hostinger snapshot generated (24.6 MB)',
    category: 'DATABASE',
    status: 'SUCCESS',
    ipAddress: '10.0.4.12',
  },
  {
    id: 'log-003',
    timestamp: '2026-08-14 05:18:04',
    actor: 'Client (client@aurapay.io)',
    action: 'Milestone 2 Deliverables Approved & Signed',
    category: 'CRM',
    status: 'SUCCESS',
    ipAddress: '74.125.21.90',
  },
  {
    id: 'log-004',
    timestamp: '2026-08-14 03:22:50',
    actor: 'Security Shield',
    action: 'Blocked suspicious SQL injection probe on /api/leads',
    category: 'SECURITY',
    status: 'ALERT',
    ipAddress: '185.220.101.4',
  },
  {
    id: 'log-005',
    timestamp: '2026-08-13 18:45:00',
    actor: 'SuperAdmin',
    action: 'Exported Supabase PostgreSQL DDL migration script',
    category: 'DATABASE',
    status: 'SUCCESS',
    ipAddress: '192.168.1.1',
  },
];

export const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: 'inv-1001',
    invoiceNumber: 'INV-ORB-2026-089',
    clientName: 'Aura Financial Inc.',
    clientEmail: 'client@aurapay.io',
    serviceDescription: 'Milestone 2 Delivery: React Native Core Architecture & Stripe Integration',
    amount: 8500,
    tax: 425,
    totalAmount: 8925,
    status: 'Pending',
    dueDate: 'August 22, 2026',
    issuedDate: 'August 08, 2026',
  },
  {
    id: 'inv-1002',
    invoiceNumber: 'INV-ORB-2026-074',
    clientName: 'HealthCore Systems',
    clientEmail: 'admin@healthcore.org',
    serviceDescription: 'Sprint 3 Python AI Scheduler & MySQL Optimization',
    amount: 6000,
    tax: 300,
    totalAmount: 6300,
    status: 'Paid',
    dueDate: 'August 01, 2026',
    issuedDate: 'July 18, 2026',
    paidAt: 'July 29, 2026',
  },
  {
    id: 'inv-1003',
    invoiceNumber: 'INV-ORB-2026-062',
    clientName: 'Nexus Global Freight',
    clientEmail: 'billing@nexusfreight.com',
    serviceDescription: 'OrbitFlow Multi-Agent Automation Retainer - July 2026',
    amount: 4500,
    tax: 225,
    totalAmount: 4725,
    status: 'Paid',
    dueDate: 'July 15, 2026',
    issuedDate: 'July 01, 2026',
    paidAt: 'July 10, 2026',
  },
];

export const INITIAL_PERFORMANCE_METRICS: PerformanceMetricData[] = [
  { time: '00:00', uptime: 99.99, apiLatency: 42, trafficK: 12.4, conversionRate: 3.8, serverLoad: 28 },
  { time: '04:00', uptime: 100.0, apiLatency: 38, trafficK: 8.1, conversionRate: 4.1, serverLoad: 22 },
  { time: '08:00', uptime: 99.98, apiLatency: 45, trafficK: 24.6, conversionRate: 4.6, serverLoad: 48 },
  { time: '12:00', uptime: 99.99, apiLatency: 52, trafficK: 48.2, conversionRate: 5.2, serverLoad: 64 },
  { time: '16:00', uptime: 99.97, apiLatency: 49, trafficK: 39.8, conversionRate: 4.9, serverLoad: 58 },
  { time: '20:00', uptime: 100.0, apiLatency: 41, trafficK: 28.5, conversionRate: 4.3, serverLoad: 35 },
  { time: 'Now', uptime: 99.99, apiLatency: 39, trafficK: 32.1, conversionRate: 4.8, serverLoad: 39 },
];

export const INITIAL_COLLAB_TASKS: CollabTask[] = [
  {
    id: 'task-1',
    title: 'Implement Gemini 2.5 Live Prompt Optimizer',
    column: 'In Progress',
    priority: 'Critical',
    assignedTo: 'Samad Rind',
    tags: ['AI Engine', 'Gemini SDK'],
    dueDate: 'Tomorrow',
  },
  {
    id: 'task-2',
    title: 'Build Hostinger MySQL export DDL migration script',
    column: 'Done',
    priority: 'High',
    assignedTo: 'Devin Thorne',
    tags: ['MySQL', 'Database'],
    dueDate: 'Completed',
  },
  {
    id: 'task-3',
    title: 'Audit 3D Canvas WebGL Shader on mobile Safari',
    column: 'In Progress',
    priority: 'High',
    assignedTo: 'Elena Rostova',
    tags: ['3D Web', 'Performance'],
    dueDate: 'Today',
  },
  {
    id: 'task-4',
    title: 'Review Cohort 2026 AI Internship Applications',
    column: 'Code Review',
    priority: 'Medium',
    assignedTo: 'HR Tech Team',
    tags: ['Careers', 'Internships'],
    dueDate: 'Aug 18',
  },
  {
    id: 'task-5',
    title: 'Set up Stripe Webhook Idempotency for OrbitPulse license sales',
    column: 'Backlog',
    priority: 'Medium',
    assignedTo: 'Backend Lead',
    tags: ['Stripe', 'Payments'],
    dueDate: 'Aug 24',
  },
];

export const INITIAL_STICKY_NOTES: StickyNote[] = [
  {
    id: 'note-1',
    text: '🚀 Orbit-I Core Principle: Zero AI Slop. Every pixel and line of code must serve a measurable user outcome.',
    color: 'yellow',
    author: 'Samad Rind',
    x: 40,
    y: 60,
    createdAt: '10:30 AM',
  },
  {
    id: 'note-2',
    text: '⚡ MySQL & Supabase migration tool is fully working in SuperAdmin panel. Generates instant SQL for Hostinger.',
    color: 'blue',
    author: 'Devin Thorne',
    x: 280,
    y: 80,
    createdAt: '11:15 AM',
  },
  {
    id: 'note-3',
    text: '🎨 3D particle nodes should smoothly react to mouse move with zero lag. Tested at 60fps.',
    color: 'green',
    author: 'Elena Rostova',
    x: 120,
    y: 220,
    createdAt: '01:45 PM',
  },
];

// Export convenient aliases
export const initialServices = INITIAL_SERVICES;
export const initialProducts = INITIAL_PRODUCTS;
export const initialBlogs = INITIAL_BLOGS;
export const initialCareers = INITIAL_CAREERS;
export const initialGallery = INITIAL_GALLERY;
export const initialCaseStudies = INITIAL_CASE_STUDIES;
export const INITIAL_PROJECTS = INITIAL_CLIENT_PROJECTS;
export const initialProjects = INITIAL_CLIENT_PROJECTS;
export const initialInvoices = INITIAL_INVOICES;
export const initialSettings = INITIAL_SETTINGS;



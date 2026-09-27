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
  SystemAuditLog,
  PartnerItem
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
    message: 'System Notice: All systems and development services operational.',
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
  homeContent: {
    heroHeadline: 'Custom Software, Web Platforms & Technology Solutions',
    heroSubtitle: 'We design, engineer, and deploy high-performance software applications, modern web platforms, and tailored technical systems.',
    heroBadge: 'Software & Technology Services',
    stats: [
      { label: 'Founded', value: '2022', desc: 'SECP-registered Pakistani software studio' },
      { label: 'Custom Codebases', value: '100%', desc: 'Full client code ownership' },
      { label: 'Agile Delivery', value: '2-4 Wks', desc: 'Rapid production MVP sprints' },
      { label: 'Direct Collaboration', value: '1-on-1', desc: 'Direct architect consultation' },
    ],
    testimonials: [],
  },
  aboutContent: {
    headline: 'Custom Software Engineering, Web Platforms & Automation',
    subtitle: 'ORBIT-I (Private) Limited is a specialized technology and software solutions company based in Nawabshah, Sindh, Pakistan. We design, engineer, and deploy high-performance software applications, web platforms, Python automations, and digital tools tailored to your business needs.',
    mission: 'To deliver high-craftsmanship software architectures, automated workflows, and modern web solutions that solve real business problems with clean, scalable code.',
    vision: 'To be a trusted software engineering partner known for technical excellence, direct communication, and reliable digital systems.',
    values: [
      {
        title: 'Zero Compromise Code Quality',
        desc: 'We engineer robust, tailor-made systems designed specifically for your throughput and security needs.',
        icon: 'Target',
      },
      {
        title: 'Autonomous & Resilient Workflows',
        desc: 'Automated fault tolerance, background job queues, and scalable infrastructure.',
        icon: 'Zap',
      },
      {
        title: 'Architectural Transparency',
        desc: 'Open documentation, complete code ownership, and clear communication on every sprint milestone.',
        icon: 'ShieldCheck',
      },
      {
        title: 'High Velocity Execution',
        desc: 'Rapid sprint cycles delivering production-ready applications with continuous automated deployment.',
        icon: 'Award',
      },
    ],
    teamMembers: [
      {
        id: 'tm-1',
        name: 'Abdul Samad Rind',
        role: 'Founder & CEO',
        bio: 'Sets ORBIT-I\'s product direction and AI/ML strategy, and leads enterprise client engagements end to end.',
        avatar: '/founder-samad.jpg',
        badge: 'Founder',
      },
      {
        id: 'tm-2',
        name: 'Muneeb Ur Rehman',
        role: 'Co-Founder & CTO',
        bio: 'Owns ORBIT-I\'s engineering architecture and infrastructure — technical delivery and system design across every client project.',
        avatar: '',
        badge: 'Leadership',
      },
      {
        id: 'tm-3',
        name: 'Maria Almani',
        role: 'Co-Founder & COO',
        bio: 'Runs day-to-day operations at ORBIT-I — client delivery coordination, internal team structure, and process.',
        avatar: '',
        badge: 'Leadership',
      },
    ],
    milestones: [
      { id: 'ms-1', year: '2022', title: 'ORBIT-I Founded', desc: 'Registered with SECP as ORBIT-I (Private) Limited, focused on custom software development, web applications, and automated Python workflows.' },
      { id: 'ms-2', year: '2024', title: 'Full-Stack & Cloud Expansion', desc: 'Expanded delivery capabilities across modern React, Node.js, and MySQL database architectures.' },
      { id: 'ms-3', year: '2025', title: 'AI & Automation Solutions', desc: 'Integrated advanced LLM capabilities, RAG pipelines, and automated business tooling.' },
      { id: 'ms-4', year: '2026', title: 'Internship Cohort & Technical Consulting', desc: 'Launched engineering internship program and expanded enterprise consulting.' },
    ],
  },
};

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    title: 'Custom Web & Mobile Application Engineering',
    category: 'Web & Apps',
    shortDesc: 'Ultra-fast, responsive web platforms and cross-platform mobile apps with pixel-perfect UI/UX.',
    fullDesc: 'Modern single-page applications, headless platforms, and React Native mobile apps engineered with lightning load times, robust security, and scalable backend services.',
    icon: 'Globe',
    features: [
      'Modern React, Next.js & TypeScript Architectures',
      'Cross-Platform iOS & Android (React Native/Flutter)',
      'Sub-second Edge Rendering & WebSockets',
      'Progressive Web Apps (PWA) with Offline Cache',
      'Zero-Trust API Security & OAuth 2.0 / JWT'
    ],
    technologies: ['React 19', 'TypeScript', 'Node.js', 'TailwindCSS', 'Express', 'Vite'],
    startingPrice: 2499,
    deliveryTime: '2-5 Weeks',
    popular: true,
  },
  {
    id: 'srv-2',
    title: 'Python Scripting & Robotic Automation',
    category: 'Python & Automation',
    shortDesc: 'Eliminate manual workloads with intelligent Python bots, web crawlers, ERP sync, and workflow automations.',
    fullDesc: 'We automate mission-critical repetitive tasks: automated web scraping at scale, database synchronization, invoice parsing pipelines, CRM triggers, and serverless scripts.',
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
    popular: true,
  },
  {
    id: 'srv-3',
    title: 'AI Integration & Intelligent Workflows',
    category: 'AI & ML',
    shortDesc: 'Custom LLM integrations, RAG knowledge bases, predictive intelligence & automated reasoning.',
    fullDesc: 'We build proprietary AI pipelines, multi-agent frameworks, semantic vector databases, and real-time inference systems tailored to specific business operations.',
    icon: 'Cpu',
    features: [
      'Custom LLM Integration & Prompt Engineering',
      'Autonomous Task Decomposition & Agents',
      'RAG (Retrieval-Augmented Generation) Knowledge Bases',
      'Automated Document OCR & Intelligent Parsing',
      'Vector Databases & Semantic Search'
    ],
    technologies: ['Gemini 2.5', 'Python', 'LangChain', 'Pinecone', 'FastAPI'],
    startingPrice: 3499,
    deliveryTime: '3-6 Weeks',
    popular: true,
  },
  {
    id: 'srv-4',
    title: 'Brand Identity, Graphics & UI/UX Systems',
    category: 'Graphics & UI/UX',
    shortDesc: 'Clean design systems, high-converting product UI/UX, interactive web visuals, and brand guidelines.',
    fullDesc: 'Human-centric UI/UX design validated with interactive prototypes, comprehensive Figma design systems, motion graphics, and 3D visual components.',
    icon: 'Palette',
    features: [
      'Comprehensive Figma Design Systems & Tokens',
      'Interactive 3D Web Visuals & WebGL Shaders',
      'Brand Identity Kits, Typography & Logo Systems',
      'Mobile App UI/UX & Micro-interactions',
      'Accessibility Standards (WCAG 2.1 AA Compliant)'
    ],
    technologies: ['Figma', 'Three.js', 'Spline', 'TailwindCSS', 'Motion'],
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
    title: 'Cloud Infrastructure, DevOps & Database Engineering',
    category: 'Cloud & DevOps',
    shortDesc: 'Automated CI/CD pipelines, containerization, MySQL / Supabase clustering, and Hostinger/Vercel setups.',
    fullDesc: 'Bulletproof cloud operations with zero-downtime deployments, container orchestration, automated backups, and database replication optimized for cost and resilience.',
    icon: 'Server',
    features: [
      'CI/CD Pipeline Setup (GitHub Actions)',
      'MySQL, PostgreSQL & Supabase Database Tuning',
      'Docker Containerization & Server Deployment',
      'Cloudflare CDN, DDoS Shield & SSL Hardening',
      'Automated Database Snapshots & Monitoring'
    ],
    technologies: ['Docker', 'AWS', 'Supabase', 'MySQL', 'Nginx', 'Vercel'],
    startingPrice: 1999,
    deliveryTime: '1-3 Weeks',
    popular: false,
  },
];

export const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'OrbitPulse CRM & Management Suite',
    tagline: 'Streamlined Inbound Lead & Client Communication Hub',
    category: 'Enterprise Suite',
    description: 'A responsive business management tool to organize inbound project leads, track proposal lifecycles, draft contextual responses, and synchronize client records.',
    version: 'v3.2.0',
    badge: 'Flagship Tool',
    features: [
      'Inbound Lead Categorization & Status Tracking',
      'Project Milestone & Deliverables Dashboard',
      'Interactive Meeting Summarizer & Action Item Extraction',
      'Direct Export to MySQL, Supabase, or CSV',
      'Custom Pipeline Stages & Status Management'
    ],
    monthlyPrice: 49,
    annualPrice: 490,
    oneTimePrice: 999,
    demoUrl: 'https://orbit-i.tech',
    metrics: [
      { label: 'Architecture', value: 'Full-Stack' },
      { label: 'Database Sync', value: 'Real-Time' },
      { label: 'Setup Time', value: '<1 Hour' }
    ],
    status: 'Live',
  },
  {
    id: 'prod-2',
    name: 'OrbitFlow Python Automation Engine',
    tagline: 'Modular Automation & Scheduled Scraping Framework',
    category: 'Automation Bot',
    description: 'Execute automated web scraping, trigger database migrations, process structured data, and run Python background workers reliably.',
    version: 'v2.8.4',
    badge: 'Automation Hub',
    features: [
      'Modular Python Workflow Pipeline',
      'Headless Browser Scrapers (Playwright / Selenium)',
      'Scheduled Cron Triggers & Webhook Listeners',
      'Encrypted Environment Secret & Token Vault',
      'Hostinger, Vercel & Docker 1-Click Deployment'
    ],
    monthlyPrice: 79,
    annualPrice: 790,
    oneTimePrice: 1499,
    demoUrl: 'https://orbit-i.tech',
    metrics: [
      { label: 'Execution Mode', value: 'Asynchronous' },
      { label: 'Reliability', value: '99.9%' },
      { label: 'Language', value: 'Python 3.12' }
    ],
    status: 'Live',
  },
  {
    id: 'prod-3',
    name: 'OrbitCanvas Interactive 3D & UI Kit',
    tagline: 'Interactive Web Visuals & Responsive Component Library',
    category: 'Design Asset',
    description: 'Responsive 3D particle visualizers, cyber-minimalist UI components, and accessible layout building blocks for React applications.',
    version: 'v4.1.0',
    badge: 'Design System',
    features: [
      'Smooth Canvas 2D & WebGL Particle Systems',
      'Mouse Reactive Physics & Orbital Nodes',
      'Direct React JSX / Tailwind CSS Component Export',
      'Lightweight Optimized Bundle (<40kb gzipped)',
      'WCAG AA Compliant Color Contrast'
    ],
    monthlyPrice: 39,
    annualPrice: 390,
    oneTimePrice: 699,
    demoUrl: 'https://orbit-i.tech',
    metrics: [
      { label: 'Framerate', value: '60 FPS' },
      { label: 'Bundle Size', value: '<40 KB' },
      { label: 'Framework', value: 'React 19' }
    ],
    status: 'Live',
  },
];

export const INITIAL_BLOGS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'Designing High-Throughput Python Automation & Database Synchronization Pipelines',
    slug: 'high-scale-python-automation-mysql',
    category: 'Python & Scripting',
    author: {
      name: 'Abdul Samad Rind',
      role: 'Founder & Principal Solutions Architect, Orbit-I',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    publishedDate: 'August 2026',
    readTime: '6 min read',
    summary: 'A deep dive into building fault-tolerant Python scrapers with Playwright and synchronizing structured data into MySQL and PostgreSQL databases with automated retry logic.',
    content: `## Engineering Reliable Automation Workflows

Modern applications frequently require automated data pipelines to gather market intelligence, reconcile inventories, and synchronize external records. Building robust Python automation requires careful attention to rate limits, data validation, and database connection pooling.

### Key Architectural Principles
1. **Headless Browser Orchestration**: Utilizing Playwright with randomized user agents and viewport cloaking.
2. **Schema Validation**: Transforming raw payloads into validated Pydantic or TypeScript data models before persistence.
3. **Parameterized Batch Upserts**: Writing clean transactional SQL queries to prevent connection bottlenecks and race conditions.

At Orbit-I Private Limited, our automation scripts are engineered for zero-maintenance reliability and high throughput.`,
    tags: ['Python', 'Automation', 'MySQL', 'ETL', 'Engineering'],
    featured: true,
  },
  {
    id: 'blog-2',
    title: 'Modern Full-Stack Architecture with React 19, TypeScript and Edge APIs',
    slug: 'modern-fullstack-architecture-react-19',
    category: 'Web Engineering',
    author: {
      name: 'Abdul Samad Rind',
      role: 'Founder & Principal Solutions Architect, Orbit-I',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    publishedDate: 'July 2026',
    readTime: '5 min read',
    summary: 'Best practices for organizing scalable React 19 single-page applications with Tailwind CSS, typed APIs, and minimal bundle sizes.',
    content: `## Principles for Scalable Web Engineering

Building high-performance web applications requires balancing aesthetic sophistication with strict performance standards.

### Modular Architecture
- **Strict Typing**: Centralize domain models in dedicated TypeScript interfaces.
- **Component Isolation**: Separate presentation UI from business logic and network fetching.
- **Sub-Second Renders**: Optimize layout repaints with lightweight CSS and debounced event listeners.

Our frontend architectures at Orbit-I adhere to rigorous standards: WCAG AA contrast compliance, fast responsive loading, and intuitive user ergonomics.`,
    tags: ['React 19', 'TypeScript', 'TailwindCSS', 'Web Performance'],
    featured: false,
  },
  {
    id: 'blog-3',
    title: 'Practical AI Integration: Moving from Basic Chatbots to Task-Driven Workflows',
    slug: 'practical-ai-task-driven-workflows',
    category: 'AI & Data',
    author: {
      name: 'Abdul Samad Rind',
      role: 'Founder & Principal Solutions Architect, Orbit-I',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
    publishedDate: 'July 2026',
    readTime: '6 min read',
    summary: 'How enterprises can implement structured RAG knowledge bases and task decomposition agents to eliminate repetitive manual bottlenecks.',
    content: `## Transforming Operations with Intelligent Workflows

Rather than treating AI as an isolated conversational playground, real enterprise value is unlocked when language models are connected to actual business databases, documents, and API endpoints.

### Core Implementation Steps
1. **Semantic Vector Search**: Indexing domain documents with embeddings for precise retrieval.
2. **Function Calling & Validation**: Structuring LLM responses into strict JSON schemas for automated execution.
3. **Human-in-the-loop Guardrails**: Enabling review states for high-stakes operational changes.

We help organizations build custom AI integrations that directly improve operational efficiency.`,
    tags: ['AI Workflows', 'Gemini API', 'RAG', 'Automation'],
    featured: false,
  },
];

export const INITIAL_CAREERS: CareerOpening[] = [
  {
    id: 'job-1',
    title: 'Full-Stack React & TypeScript Developer',
    type: 'Full-Time',
    department: 'Frontend / UI',
    location: 'Remote',
    experience: '2+ Years',
    stipendOrSalary: 'Competitive / Project-Based',
    description: 'Develop ultra-responsive web applications, interactive dashboards, and client portals with React 19, TypeScript, Tailwind CSS, and Node.js backends.',
    requirements: [
      'Proficiency in React, TypeScript, Tailwind CSS, and Node.js / Express',
      'Passion for clean UI/UX, typography, and responsive ergonomics',
      'Familiarity with RESTful APIs, WebSockets, and state management',
      'Solid understanding of web performance optimization'
    ],
    responsibilities: [
      'Build scalable frontend components and real-time collaboration widgets',
      'Ensure seamless cross-browser and mobile responsive execution',
      'Write clean, modular code with robust typing and automated tests'
    ],
    isOpen: true,
  },
  {
    id: 'job-2',
    title: 'Python Automation & Scripting Engineer',
    type: 'Full-Time',
    department: 'Python / Backend',
    location: 'Remote',
    experience: '2+ Years',
    stipendOrSalary: 'Competitive / Project-Based',
    description: 'Lead the architecture of automated web scrapers, data cleaning ETL pipelines, and API integrations for client systems.',
    requirements: [
      'Deep proficiency in Python 3.11+, Playwright / Selenium, and FastAPI',
      'Experience with SQL (PostgreSQL/MySQL) and task queues (Celery/Redis)',
      'Understanding of web security, anti-bot mitigation, and rate limiting'
    ],
    responsibilities: [
      'Develop reliable automated scrapers and synchronization workers',
      'Optimize database queries and background task processing',
      'Maintain automated deployment and server health monitoring'
    ],
    isOpen: true,
  },
  {
    id: 'job-3',
    title: 'AI & Full-Stack Summer/Winter Internship (Cohort 2026)',
    type: 'Internship',
    department: 'AI & Engineering',
    location: 'Remote',
    experience: 'Students / Fresh Graduates',
    stipendOrSalary: 'Paid Stipend + Certificate & Mentorship',
    duration: '3 to 6 Months',
    description: 'An intensive, hands-on mentorship program at Orbit-I Private Limited where you work on real production software projects, Python automation tools, and web applications.',
    requirements: [
      'Fundamental understanding of Python, JavaScript/TypeScript, or React',
      'Eager curiosity to build real-world software and solve challenging problems',
      'Personal coding projects, GitHub repositories, or coursework is a plus',
      'Commitment to learn and collaborate with our engineering team'
    ],
    responsibilities: [
      'Collaborate on client solutions and internal tools under direct mentorship',
      'Participate in code reviews and architecture discussions',
      'Build a capstone project during the internship cohort term'
    ],
    isOpen: true,
  },
];

export const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Orbit-I Dark UI Application Architecture',
    category: 'UI/UX Mockups',
    description: 'High-density dark UI design with clear hierarchy and responsive layout.',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    tags: ['React 19', 'Dark UI', 'Dashboard', 'Architecture'],
    featured: true,
  },
  {
    id: 'gal-2',
    title: 'Kinetic 3D Orbital Particle System',
    category: '3D & Motion',
    description: 'Interactive Canvas & WebGL orbital engine engineered for web applications.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80',
    tags: ['Three.js', 'WebGL', '3D Visuals', 'Canvas'],
    featured: true,
  },
  {
    id: 'gal-3',
    title: 'Modern Software Engineering & Code Craft',
    category: 'Product Renders',
    description: 'Modular TypeScript codebase built with type safety and clean separation of concerns.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80',
    tags: ['TypeScript', 'Node.js', 'Clean Code', 'Scalability'],
    featured: true,
  },
];

export const INITIAL_PARTNERS: PartnerItem[] = [
  {
    id: 'partner-1',
    name: 'Shaheed Benazir Bhutto University, Shaheed Benazirabad',
    category: 'Academic Partner',
    logoUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=80',
    websiteUrl: 'https://sbbusba.edu.pk',
    description: 'Academic collaboration supporting student engineering talent and ORBIT-I\'s intern cohort pipeline.',
    partnerSince: '2025',
    featured: true,
  },
  {
    id: 'partner-2',
    name: 'Government Girls Degree College, Nawabshah',
    category: 'Client Collaboration',
    logoUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&auto=format&fit=crop&q=80',
    description: 'Institutional client partnership — full website and admin CMS platform delivered and maintained by ORBIT-I.',
    partnerSince: '2026',
    featured: true,
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
    projectName: 'Custom Software & Web Application Pod',
    title: 'Custom Software & Web Application Pod',
    clientName: 'Enterprise Client',
    clientEmail: 'client@example.com',
    description: 'Custom React & TypeScript web platform with clean dashboard architecture, authentication, and database synchronization.',
    leadArchitect: 'Abdul Samad Rind (Solutions Architect)',
    targetDeadline: 'Sprint Milestone Review',
    currentPhase: 'Core Engineering',
    progressPercentage: 75,
    progressPercent: 75,
    targetLaunchDate: 'Sprint Delivery',
    spentBudget: 2500,
    totalBudget: 3500,
    status: 'In Active Development',
    technologies: ['React 19', 'TypeScript', 'Node.js', 'TailwindCSS', 'MySQL / Supabase'],
    milestones: [
      { id: 'm-1', title: 'Architecture Blueprint & Specifications', description: 'System requirements, database schemas, and API contracts defined.', status: 'Completed', dueDate: 'Milestone 1' },
      { id: 'm-2', title: 'UI/UX Design Systems & Interactive Prototypes', description: 'Responsive dark layout and design tokens created.', status: 'Completed', dueDate: 'Milestone 2' },
      { id: 'm-3', title: 'Core Full-Stack Implementation', description: 'API endpoints, database models, and responsive frontend built.', status: 'In Progress', dueDate: 'Milestone 3' },
      { id: 'm-4', title: 'Quality Assurance & Production Deployment', description: 'Performance audit, security check, and deployment configuration.', status: 'Upcoming', dueDate: 'Milestone 4' },
    ],
    deliverables: [
      { id: 'del-1', name: 'Software Architecture & API Specifications', category: 'API Docs', url: 'https://orbit-i.tech', size: '2.4 MB', updatedAt: '2026-08' },
      { id: 'del-2', name: 'Production Application Build & Source Code', category: 'Source Repo', url: 'https://orbit-i.tech', size: '48 MB', updatedAt: '2026-08' },
    ],
    healthStatus: 'Optimal',
  },
];

export const INITIAL_SUPPORT_TICKETS: SupportTicket[] = [];

export const INITIAL_AUDIT_LOGS: SystemAuditLog[] = [
  {
    id: 'log-001',
    timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
    actor: 'SuperAdmin (Abdul Samad Rind)',
    action: 'System initialized with clean production data and verified security settings',
    category: 'SYSTEM',
    status: 'SUCCESS',
    ipAddress: '127.0.0.1',
  },
];

export const INITIAL_INVOICES: InvoiceItem[] = [];

export const INITIAL_PERFORMANCE_METRICS: PerformanceMetricData[] = [
  { time: '00:00', uptime: 99.99, apiLatency: 35, trafficK: 10.2, conversionRate: 4.2, serverLoad: 22 },
  { time: '04:00', uptime: 100.0, apiLatency: 32, trafficK: 8.5, conversionRate: 4.5, serverLoad: 18 },
  { time: '08:00', uptime: 99.98, apiLatency: 38, trafficK: 18.4, conversionRate: 4.8, serverLoad: 35 },
  { time: '12:00', uptime: 99.99, apiLatency: 42, trafficK: 28.6, conversionRate: 5.1, serverLoad: 45 },
  { time: '16:00', uptime: 99.99, apiLatency: 40, trafficK: 24.1, conversionRate: 4.9, serverLoad: 38 },
  { time: '20:00', uptime: 100.0, apiLatency: 34, trafficK: 16.8, conversionRate: 4.4, serverLoad: 25 },
  { time: 'Now', uptime: 99.99, apiLatency: 33, trafficK: 20.5, conversionRate: 4.8, serverLoad: 28 },
];

export const INITIAL_COLLAB_TASKS: CollabTask[] = [
  {
    id: 'task-1',
    title: 'Review custom software requirements and project specs',
    column: 'In Progress',
    priority: 'High',
    assignedTo: 'Abdul Samad Rind',
    tags: ['Architecture', 'Engineering'],
    dueDate: 'Sprint 1',
  },
  {
    id: 'task-2',
    title: 'Verify database schemas and Hostinger/Supabase connections',
    column: 'Done',
    priority: 'High',
    assignedTo: 'Engineering Team',
    tags: ['Database', 'DevOps'],
    dueDate: 'Completed',
  },
];

export const INITIAL_STICKY_NOTES: StickyNote[] = [
  {
    id: 'note-1',
    text: 'Orbit-I Core Principle: Clean architecture, type safety, and direct solutions for every client.',
    color: 'blue',
    author: 'Abdul Samad Rind',
    x: 40,
    y: 60,
    createdAt: 'Today',
  },
];

// Export convenient aliases
export const initialServices = INITIAL_SERVICES;
export const initialProducts = INITIAL_PRODUCTS;
export const initialBlogs = INITIAL_BLOGS;
export const initialCareers = INITIAL_CAREERS;
export const initialGallery = INITIAL_GALLERY;
export const initialPartners = INITIAL_PARTNERS;
export const initialCaseStudies = INITIAL_CASE_STUDIES;
export const INITIAL_PROJECTS = INITIAL_CLIENT_PROJECTS;
export const initialProjects = INITIAL_CLIENT_PROJECTS;
export const initialInvoices = INITIAL_INVOICES;
export const initialSettings = INITIAL_SETTINGS;

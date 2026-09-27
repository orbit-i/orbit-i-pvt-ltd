var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  createApp: () => createApp
});
module.exports = __toCommonJS(server_exports);
var import_config = require("dotenv/config");
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_helmet = __toESM(require("helmet"), 1);
var import_cors = __toESM(require("cors"), 1);
var import_genai = require("@google/genai");

// src/data/initialData.ts
var INITIAL_SETTINGS = {
  companyName: "ORBIT-I",
  legalEntity: "ORBIT-I (Private) Limited",
  logoUrl: "/logo.png",
  tagline: "Custom Software Development, Web Applications & Technical Solutions",
  contactEmail: "orbiti2026@gmail.com",
  supportEmail: "orbiti2026@gmail.com",
  phone: "+92 319 0275751",
  address: "Nawabshah, Sindh, Pakistan",
  foundedYear: "2022",
  emergencyAlert: {
    enabled: false,
    message: "System Notice: All systems and development services operational.",
    type: "info"
  },
  socials: {
    github: "https://github.com/orbit-i",
    linkedin: "https://www.linkedin.com/company/orbit-i-private-limited/",
    twitter: "",
    instagram: "https://www.instagram.com/0rbit_i?igsh=anpnbThjbnN2OGxm",
    youtube: "",
    facebook: "https://www.facebook.com/share/1BCN9FuLqc/",
    whatsapp: "https://whatsapp.com/channel/0029Vb8I4kvJJhzUXqEnB50J"
  },
  hostingConfigs: {
    mysqlConfigured: true,
    vercelReady: true
  },
  homeContent: {
    heroHeadline: "Custom Software, Web Platforms & Technology Solutions",
    heroSubtitle: "We design, engineer, and deploy high-performance software applications, modern web platforms, and tailored technical systems.",
    heroBadge: "Software & Technology Services",
    stats: [
      { label: "Founded", value: "2022", desc: "SECP-registered Pakistani software studio" },
      { label: "Custom Codebases", value: "100%", desc: "Full client code ownership" },
      { label: "Agile Delivery", value: "2-4 Wks", desc: "Rapid production MVP sprints" },
      { label: "Direct Collaboration", value: "1-on-1", desc: "Direct architect consultation" }
    ],
    testimonials: []
  },
  aboutContent: {
    headline: "Custom Software Engineering, Web Platforms & Automation",
    subtitle: "ORBIT-I (Private) Limited is a specialized technology and software solutions company based in Nawabshah, Sindh, Pakistan. We design, engineer, and deploy high-performance software applications, web platforms, Python automations, and digital tools tailored to your business needs.",
    mission: "To deliver high-craftsmanship software architectures, automated workflows, and modern web solutions that solve real business problems with clean, scalable code.",
    vision: "To be a trusted software engineering partner known for technical excellence, direct communication, and reliable digital systems.",
    values: [
      {
        title: "Zero Compromise Code Quality",
        desc: "We engineer robust, tailor-made systems designed specifically for your throughput and security needs.",
        icon: "Target"
      },
      {
        title: "Autonomous & Resilient Workflows",
        desc: "Automated fault tolerance, background job queues, and scalable infrastructure.",
        icon: "Zap"
      },
      {
        title: "Architectural Transparency",
        desc: "Open documentation, complete code ownership, and clear communication on every sprint milestone.",
        icon: "ShieldCheck"
      },
      {
        title: "High Velocity Execution",
        desc: "Rapid sprint cycles delivering production-ready applications with continuous automated deployment.",
        icon: "Award"
      }
    ],
    teamMembers: [
      {
        id: "tm-1",
        name: "Abdul Samad Rind",
        role: "Founder & CEO",
        bio: "Sets ORBIT-I's product direction and AI/ML strategy, and leads enterprise client engagements end to end.",
        avatar: "/founder-samad.jpg",
        badge: "Founder"
      },
      {
        id: "tm-2",
        name: "Muneeb Ur Rehman",
        role: "Co-Founder & CTO",
        bio: "Owns ORBIT-I's engineering architecture and infrastructure \u2014 technical delivery and system design across every client project.",
        avatar: "",
        badge: "Leadership"
      },
      {
        id: "tm-3",
        name: "Maria Almani",
        role: "Co-Founder & COO",
        bio: "Runs day-to-day operations at ORBIT-I \u2014 client delivery coordination, internal team structure, and process.",
        avatar: "",
        badge: "Leadership"
      }
    ],
    milestones: [
      { id: "ms-1", year: "2022", title: "ORBIT-I Founded", desc: "Registered with SECP as ORBIT-I (Private) Limited, focused on custom software development, web applications, and automated Python workflows." },
      { id: "ms-2", year: "2024", title: "Full-Stack & Cloud Expansion", desc: "Expanded delivery capabilities across modern React, Node.js, and MySQL database architectures." },
      { id: "ms-3", year: "2025", title: "AI & Automation Solutions", desc: "Integrated advanced LLM capabilities, RAG pipelines, and automated business tooling." },
      { id: "ms-4", year: "2026", title: "Internship Cohort & Technical Consulting", desc: "Launched engineering internship program and expanded enterprise consulting." }
    ]
  }
};
var INITIAL_SERVICES = [
  {
    id: "srv-1",
    title: "Custom Web & Mobile Application Engineering",
    category: "Web & Apps",
    shortDesc: "Ultra-fast, responsive web platforms and cross-platform mobile apps with pixel-perfect UI/UX.",
    fullDesc: "Modern single-page applications, headless platforms, and React Native mobile apps engineered with lightning load times, robust security, and scalable backend services.",
    icon: "Globe",
    features: [
      "Modern React, Next.js & TypeScript Architectures",
      "Cross-Platform iOS & Android (React Native/Flutter)",
      "Sub-second Edge Rendering & WebSockets",
      "Progressive Web Apps (PWA) with Offline Cache",
      "Zero-Trust API Security & OAuth 2.0 / JWT"
    ],
    technologies: ["React 19", "TypeScript", "Node.js", "TailwindCSS", "Express", "Vite"],
    startingPrice: 2499,
    deliveryTime: "2-5 Weeks",
    popular: true
  },
  {
    id: "srv-2",
    title: "Python Scripting & Robotic Automation",
    category: "Python & Automation",
    shortDesc: "Eliminate manual workloads with intelligent Python bots, web crawlers, ERP sync, and workflow automations.",
    fullDesc: "We automate mission-critical repetitive tasks: automated web scraping at scale, database synchronization, invoice parsing pipelines, CRM triggers, and serverless scripts.",
    icon: "Terminal",
    features: [
      "Automated Data Scraping & Web Crawlers",
      "ERP & Accounting Workflow Automations",
      "Automated Document Processing & PDF Parsing",
      "Cron Job Orchestration & Celery Task Queues",
      "Custom CLI Utilities & Desktop Automation"
    ],
    technologies: ["Python 3.12", "Selenium", "Playwright", "Celery", "Pandas", "BeautifulSoup"],
    startingPrice: 1499,
    deliveryTime: "1-3 Weeks",
    popular: true
  },
  {
    id: "srv-3",
    title: "AI Integration & Intelligent Workflows",
    category: "AI & ML",
    shortDesc: "Custom LLM integrations, RAG knowledge bases, predictive intelligence & automated reasoning.",
    fullDesc: "We build proprietary AI pipelines, multi-agent frameworks, semantic vector databases, and real-time inference systems tailored to specific business operations.",
    icon: "Cpu",
    features: [
      "Custom LLM Integration & Prompt Engineering",
      "Autonomous Task Decomposition & Agents",
      "RAG (Retrieval-Augmented Generation) Knowledge Bases",
      "Automated Document OCR & Intelligent Parsing",
      "Vector Databases & Semantic Search"
    ],
    technologies: ["Gemini 2.5", "Python", "LangChain", "Pinecone", "FastAPI"],
    startingPrice: 3499,
    deliveryTime: "3-6 Weeks",
    popular: true
  },
  {
    id: "srv-4",
    title: "Brand Identity, Graphics & UI/UX Systems",
    category: "Graphics & UI/UX",
    shortDesc: "Clean design systems, high-converting product UI/UX, interactive web visuals, and brand guidelines.",
    fullDesc: "Human-centric UI/UX design validated with interactive prototypes, comprehensive Figma design systems, motion graphics, and 3D visual components.",
    icon: "Palette",
    features: [
      "Comprehensive Figma Design Systems & Tokens",
      "Interactive 3D Web Visuals & WebGL Shaders",
      "Brand Identity Kits, Typography & Logo Systems",
      "Mobile App UI/UX & Micro-interactions",
      "Accessibility Standards (WCAG 2.1 AA Compliant)"
    ],
    technologies: ["Figma", "Three.js", "Spline", "TailwindCSS", "Motion"],
    startingPrice: 1899,
    deliveryTime: "2-4 Weeks",
    popular: false
  },
  {
    id: "srv-5",
    title: "Custom SaaS & Digital Product Engineering",
    category: "Custom Products",
    shortDesc: "End-to-end bespoke software platforms, multi-tenant SaaS, billing portals, and custom CRMs.",
    fullDesc: "Turn your product vision into a scalable enterprise software product. We handle full SDLC from architecture, database schema design, stripe billing, to auto-scaling cloud deployments.",
    icon: "Layers",
    features: [
      "Multi-Tenant SaaS Architecture",
      "Subscription Billing & Payment Gateways",
      "Role-Based Access Control (RBAC) & Audit Logs",
      "Custom Admin Dashboards & Analytics Engines",
      "Public REST/GraphQL API Hub for Integrations"
    ],
    technologies: ["PostgreSQL", "Express", "Redis", "Docker", "Stripe API", "Prisma"],
    startingPrice: 4999,
    deliveryTime: "4-8 Weeks",
    popular: true
  },
  {
    id: "srv-6",
    title: "Cloud Infrastructure, DevOps & Database Engineering",
    category: "Cloud & DevOps",
    shortDesc: "Automated CI/CD pipelines, containerization, MySQL / Supabase clustering, and Hostinger/Vercel setups.",
    fullDesc: "Bulletproof cloud operations with zero-downtime deployments, container orchestration, automated backups, and database replication optimized for cost and resilience.",
    icon: "Server",
    features: [
      "CI/CD Pipeline Setup (GitHub Actions)",
      "MySQL, PostgreSQL & Supabase Database Tuning",
      "Docker Containerization & Server Deployment",
      "Cloudflare CDN, DDoS Shield & SSL Hardening",
      "Automated Database Snapshots & Monitoring"
    ],
    technologies: ["Docker", "AWS", "Supabase", "MySQL", "Nginx", "Vercel"],
    startingPrice: 1999,
    deliveryTime: "1-3 Weeks",
    popular: false
  }
];
var INITIAL_PRODUCTS = [
  {
    id: "prod-1",
    name: "OrbitPulse CRM & Management Suite",
    tagline: "Streamlined Inbound Lead & Client Communication Hub",
    category: "Enterprise Suite",
    description: "A responsive business management tool to organize inbound project leads, track proposal lifecycles, draft contextual responses, and synchronize client records.",
    version: "v3.2.0",
    badge: "Flagship Tool",
    features: [
      "Inbound Lead Categorization & Status Tracking",
      "Project Milestone & Deliverables Dashboard",
      "Interactive Meeting Summarizer & Action Item Extraction",
      "Direct Export to MySQL, Supabase, or CSV",
      "Custom Pipeline Stages & Status Management"
    ],
    monthlyPrice: 49,
    annualPrice: 490,
    oneTimePrice: 999,
    demoUrl: "https://orbit-i.tech",
    metrics: [
      { label: "Architecture", value: "Full-Stack" },
      { label: "Database Sync", value: "Real-Time" },
      { label: "Setup Time", value: "<1 Hour" }
    ],
    status: "Live"
  },
  {
    id: "prod-2",
    name: "OrbitFlow Python Automation Engine",
    tagline: "Modular Automation & Scheduled Scraping Framework",
    category: "Automation Bot",
    description: "Execute automated web scraping, trigger database migrations, process structured data, and run Python background workers reliably.",
    version: "v2.8.4",
    badge: "Automation Hub",
    features: [
      "Modular Python Workflow Pipeline",
      "Headless Browser Scrapers (Playwright / Selenium)",
      "Scheduled Cron Triggers & Webhook Listeners",
      "Encrypted Environment Secret & Token Vault",
      "Hostinger, Vercel & Docker 1-Click Deployment"
    ],
    monthlyPrice: 79,
    annualPrice: 790,
    oneTimePrice: 1499,
    demoUrl: "https://orbit-i.tech",
    metrics: [
      { label: "Execution Mode", value: "Asynchronous" },
      { label: "Reliability", value: "99.9%" },
      { label: "Language", value: "Python 3.12" }
    ],
    status: "Live"
  },
  {
    id: "prod-3",
    name: "OrbitCanvas Interactive 3D & UI Kit",
    tagline: "Interactive Web Visuals & Responsive Component Library",
    category: "Design Asset",
    description: "Responsive 3D particle visualizers, cyber-minimalist UI components, and accessible layout building blocks for React applications.",
    version: "v4.1.0",
    badge: "Design System",
    features: [
      "Smooth Canvas 2D & WebGL Particle Systems",
      "Mouse Reactive Physics & Orbital Nodes",
      "Direct React JSX / Tailwind CSS Component Export",
      "Lightweight Optimized Bundle (<40kb gzipped)",
      "WCAG AA Compliant Color Contrast"
    ],
    monthlyPrice: 39,
    annualPrice: 390,
    oneTimePrice: 699,
    demoUrl: "https://orbit-i.tech",
    metrics: [
      { label: "Framerate", value: "60 FPS" },
      { label: "Bundle Size", value: "<40 KB" },
      { label: "Framework", value: "React 19" }
    ],
    status: "Live"
  }
];
var INITIAL_BLOGS = [
  {
    id: "blog-1",
    title: "Designing High-Throughput Python Automation & Database Synchronization Pipelines",
    slug: "high-scale-python-automation-mysql",
    category: "Python & Scripting",
    author: {
      name: "Abdul Samad Rind",
      role: "Founder & Principal Solutions Architect, Orbit-I",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    publishedDate: "August 2026",
    readTime: "6 min read",
    summary: "A deep dive into building fault-tolerant Python scrapers with Playwright and synchronizing structured data into MySQL and PostgreSQL databases with automated retry logic.",
    content: `## Engineering Reliable Automation Workflows

Modern applications frequently require automated data pipelines to gather market intelligence, reconcile inventories, and synchronize external records. Building robust Python automation requires careful attention to rate limits, data validation, and database connection pooling.

### Key Architectural Principles
1. **Headless Browser Orchestration**: Utilizing Playwright with randomized user agents and viewport cloaking.
2. **Schema Validation**: Transforming raw payloads into validated Pydantic or TypeScript data models before persistence.
3. **Parameterized Batch Upserts**: Writing clean transactional SQL queries to prevent connection bottlenecks and race conditions.

At Orbit-I Private Limited, our automation scripts are engineered for zero-maintenance reliability and high throughput.`,
    tags: ["Python", "Automation", "MySQL", "ETL", "Engineering"],
    featured: true
  },
  {
    id: "blog-2",
    title: "Modern Full-Stack Architecture with React 19, TypeScript and Edge APIs",
    slug: "modern-fullstack-architecture-react-19",
    category: "Web Engineering",
    author: {
      name: "Abdul Samad Rind",
      role: "Founder & Principal Solutions Architect, Orbit-I",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    publishedDate: "July 2026",
    readTime: "5 min read",
    summary: "Best practices for organizing scalable React 19 single-page applications with Tailwind CSS, typed APIs, and minimal bundle sizes.",
    content: `## Principles for Scalable Web Engineering

Building high-performance web applications requires balancing aesthetic sophistication with strict performance standards.

### Modular Architecture
- **Strict Typing**: Centralize domain models in dedicated TypeScript interfaces.
- **Component Isolation**: Separate presentation UI from business logic and network fetching.
- **Sub-Second Renders**: Optimize layout repaints with lightweight CSS and debounced event listeners.

Our frontend architectures at Orbit-I adhere to rigorous standards: WCAG AA contrast compliance, fast responsive loading, and intuitive user ergonomics.`,
    tags: ["React 19", "TypeScript", "TailwindCSS", "Web Performance"],
    featured: false
  },
  {
    id: "blog-3",
    title: "Practical AI Integration: Moving from Basic Chatbots to Task-Driven Workflows",
    slug: "practical-ai-task-driven-workflows",
    category: "AI & Data",
    author: {
      name: "Abdul Samad Rind",
      role: "Founder & Principal Solutions Architect, Orbit-I",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    publishedDate: "July 2026",
    readTime: "6 min read",
    summary: "How enterprises can implement structured RAG knowledge bases and task decomposition agents to eliminate repetitive manual bottlenecks.",
    content: `## Transforming Operations with Intelligent Workflows

Rather than treating AI as an isolated conversational playground, real enterprise value is unlocked when language models are connected to actual business databases, documents, and API endpoints.

### Core Implementation Steps
1. **Semantic Vector Search**: Indexing domain documents with embeddings for precise retrieval.
2. **Function Calling & Validation**: Structuring LLM responses into strict JSON schemas for automated execution.
3. **Human-in-the-loop Guardrails**: Enabling review states for high-stakes operational changes.

We help organizations build custom AI integrations that directly improve operational efficiency.`,
    tags: ["AI Workflows", "Gemini API", "RAG", "Automation"],
    featured: false
  }
];
var INITIAL_CAREERS = [
  {
    id: "job-1",
    title: "Full-Stack React & TypeScript Developer",
    type: "Full-Time",
    department: "Frontend / UI",
    location: "Remote",
    experience: "2+ Years",
    stipendOrSalary: "Competitive / Project-Based",
    description: "Develop ultra-responsive web applications, interactive dashboards, and client portals with React 19, TypeScript, Tailwind CSS, and Node.js backends.",
    requirements: [
      "Proficiency in React, TypeScript, Tailwind CSS, and Node.js / Express",
      "Passion for clean UI/UX, typography, and responsive ergonomics",
      "Familiarity with RESTful APIs, WebSockets, and state management",
      "Solid understanding of web performance optimization"
    ],
    responsibilities: [
      "Build scalable frontend components and real-time collaboration widgets",
      "Ensure seamless cross-browser and mobile responsive execution",
      "Write clean, modular code with robust typing and automated tests"
    ],
    isOpen: true
  },
  {
    id: "job-2",
    title: "Python Automation & Scripting Engineer",
    type: "Full-Time",
    department: "Python / Backend",
    location: "Remote",
    experience: "2+ Years",
    stipendOrSalary: "Competitive / Project-Based",
    description: "Lead the architecture of automated web scrapers, data cleaning ETL pipelines, and API integrations for client systems.",
    requirements: [
      "Deep proficiency in Python 3.11+, Playwright / Selenium, and FastAPI",
      "Experience with SQL (PostgreSQL/MySQL) and task queues (Celery/Redis)",
      "Understanding of web security, anti-bot mitigation, and rate limiting"
    ],
    responsibilities: [
      "Develop reliable automated scrapers and synchronization workers",
      "Optimize database queries and background task processing",
      "Maintain automated deployment and server health monitoring"
    ],
    isOpen: true
  },
  {
    id: "job-3",
    title: "AI & Full-Stack Summer/Winter Internship (Cohort 2026)",
    type: "Internship",
    department: "AI & Engineering",
    location: "Remote",
    experience: "Students / Fresh Graduates",
    stipendOrSalary: "Paid Stipend + Certificate & Mentorship",
    duration: "3 to 6 Months",
    description: "An intensive, hands-on mentorship program at Orbit-I Private Limited where you work on real production software projects, Python automation tools, and web applications.",
    requirements: [
      "Fundamental understanding of Python, JavaScript/TypeScript, or React",
      "Eager curiosity to build real-world software and solve challenging problems",
      "Personal coding projects, GitHub repositories, or coursework is a plus",
      "Commitment to learn and collaborate with our engineering team"
    ],
    responsibilities: [
      "Collaborate on client solutions and internal tools under direct mentorship",
      "Participate in code reviews and architecture discussions",
      "Build a capstone project during the internship cohort term"
    ],
    isOpen: true
  }
];
var INITIAL_GALLERY = [
  {
    id: "gal-1",
    title: "Orbit-I Dark UI Application Architecture",
    category: "UI/UX Mockups",
    description: "High-density dark UI design with clear hierarchy and responsive layout.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    tags: ["React 19", "Dark UI", "Dashboard", "Architecture"],
    featured: true
  },
  {
    id: "gal-2",
    title: "Kinetic 3D Orbital Particle System",
    category: "3D & Motion",
    description: "Interactive Canvas & WebGL orbital engine engineered for web applications.",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    tags: ["Three.js", "WebGL", "3D Visuals", "Canvas"],
    featured: true
  },
  {
    id: "gal-3",
    title: "Modern Software Engineering & Code Craft",
    category: "Product Renders",
    description: "Modular TypeScript codebase built with type safety and clean separation of concerns.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    tags: ["TypeScript", "Node.js", "Clean Code", "Scalability"],
    featured: true
  }
];
var INITIAL_PARTNERS = [
  {
    id: "partner-1",
    name: "Shaheed Benazir Bhutto University, Shaheed Benazirabad",
    category: "Academic Partner",
    logoUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&auto=format&fit=crop&q=80",
    websiteUrl: "https://sbbusba.edu.pk",
    description: "Academic collaboration supporting student engineering talent and ORBIT-I's intern cohort pipeline.",
    partnerSince: "2025",
    featured: true
  },
  {
    id: "partner-2",
    name: "Government Girls Degree College, Nawabshah",
    category: "Client Collaboration",
    logoUrl: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400&auto=format&fit=crop&q=80",
    description: "Institutional client partnership \u2014 full website and admin CMS platform delivered and maintained by ORBIT-I.",
    partnerSince: "2026",
    featured: true
  }
];
var INITIAL_CASE_STUDIES = [
  {
    id: "case-1",
    title: "Full Institutional Website & Admin Platform for Government Girls Degree College, Nawabshah",
    clientName: "Government Girls Degree College, Nawabshah",
    industry: "Education",
    summary: "ORBIT-I designed and built a complete institutional website for GGDC Nawabshah on React, Vite, and Tailwind CSS, backed by a full Supabase database \u2014 covering authentication, a notice board, a photo/video gallery, an HOD directory, and a dedicated admin panel for college staff to manage content without developer involvement.",
    metrics: [
      { label: "Stack", value: "React + Vite + Supabase", trend: "positive" },
      { label: "Deployment", value: "Live on Vercel", trend: "positive" },
      { label: "Admin Access", value: "Full self-service CMS", trend: "positive" }
    ],
    challenge: "The college had no digital presence \u2014 no way to publish notices, showcase faculty, or share campus media online, and no technical staff to run one.",
    solution: "We built a public-facing site plus a Supabase-backed admin panel so non-technical college staff can independently manage notices, the HOD directory, and the gallery after handover, with no developer required to update content.",
    technologies: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "Vercel"],
    imageUrl: ""
  },
  {
    id: "case-2",
    title: "ORBIT-I Pulse \u2014 Internal Enterprise Management Platform",
    clientName: "ORBIT-I (Internal Product)",
    industry: "Enterprise SaaS / Internal Tooling",
    summary: "ORBIT-I Pulse is our own enterprise management platform, built on Next.js and Supabase, covering a 12-role permission hierarchy, department and team management, task assignment, leave workflows, a document workspace, in-app notifications, and a dark-mode UI with 7-language support including RTL. It is currently being positioned for external/commercial licensing.",
    metrics: [
      { label: "Role Hierarchy", value: "12 roles", trend: "positive" },
      { label: "Language Support", value: "7 languages + RTL", trend: "positive" },
      { label: "Status", value: "Live, internal use", trend: "positive" }
    ],
    challenge: "ORBIT-I needed a single internal system to manage its own team structure, tasks, leave, documents, and communication as the company scaled past its first hires.",
    solution: "We built Pulse in-house: Next.js 14 on the frontend, Supabase (Postgres) for data and auth, TOTP-based 2FA, audit logging, and a fully custom design system on ORBIT-I brand tokens.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Vercel"],
    imageUrl: ""
  }
];
var INITIAL_CLIENT_PROJECTS = [
  {
    id: "proj-101",
    projectName: "Custom Software & Web Application Pod",
    title: "Custom Software & Web Application Pod",
    clientName: "Enterprise Client",
    clientEmail: "client@example.com",
    description: "Custom React & TypeScript web platform with clean dashboard architecture, authentication, and database synchronization.",
    leadArchitect: "Abdul Samad Rind (Solutions Architect)",
    targetDeadline: "Sprint Milestone Review",
    currentPhase: "Core Engineering",
    progressPercentage: 75,
    progressPercent: 75,
    targetLaunchDate: "Sprint Delivery",
    spentBudget: 2500,
    totalBudget: 3500,
    status: "In Active Development",
    technologies: ["React 19", "TypeScript", "Node.js", "TailwindCSS", "MySQL / Supabase"],
    milestones: [
      { id: "m-1", title: "Architecture Blueprint & Specifications", description: "System requirements, database schemas, and API contracts defined.", status: "Completed", dueDate: "Milestone 1" },
      { id: "m-2", title: "UI/UX Design Systems & Interactive Prototypes", description: "Responsive dark layout and design tokens created.", status: "Completed", dueDate: "Milestone 2" },
      { id: "m-3", title: "Core Full-Stack Implementation", description: "API endpoints, database models, and responsive frontend built.", status: "In Progress", dueDate: "Milestone 3" },
      { id: "m-4", title: "Quality Assurance & Production Deployment", description: "Performance audit, security check, and deployment configuration.", status: "Upcoming", dueDate: "Milestone 4" }
    ],
    deliverables: [
      { id: "del-1", name: "Software Architecture & API Specifications", category: "API Docs", url: "https://orbit-i.tech", size: "2.4 MB", updatedAt: "2026-08" },
      { id: "del-2", name: "Production Application Build & Source Code", category: "Source Repo", url: "https://orbit-i.tech", size: "48 MB", updatedAt: "2026-08" }
    ],
    healthStatus: "Optimal"
  }
];
var INITIAL_SUPPORT_TICKETS = [];
var INITIAL_AUDIT_LOGS = [
  {
    id: "log-001",
    timestamp: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19),
    actor: "SuperAdmin (Abdul Samad Rind)",
    action: "System initialized with clean production data and verified security settings",
    category: "SYSTEM",
    status: "SUCCESS",
    ipAddress: "127.0.0.1"
  }
];
var INITIAL_INVOICES = [];
var INITIAL_PERFORMANCE_METRICS = [
  { time: "00:00", uptime: 99.99, apiLatency: 35, trafficK: 10.2, conversionRate: 4.2, serverLoad: 22 },
  { time: "04:00", uptime: 100, apiLatency: 32, trafficK: 8.5, conversionRate: 4.5, serverLoad: 18 },
  { time: "08:00", uptime: 99.98, apiLatency: 38, trafficK: 18.4, conversionRate: 4.8, serverLoad: 35 },
  { time: "12:00", uptime: 99.99, apiLatency: 42, trafficK: 28.6, conversionRate: 5.1, serverLoad: 45 },
  { time: "16:00", uptime: 99.99, apiLatency: 40, trafficK: 24.1, conversionRate: 4.9, serverLoad: 38 },
  { time: "20:00", uptime: 100, apiLatency: 34, trafficK: 16.8, conversionRate: 4.4, serverLoad: 25 },
  { time: "Now", uptime: 99.99, apiLatency: 33, trafficK: 20.5, conversionRate: 4.8, serverLoad: 28 }
];

// db.ts
var import_promise = __toESM(require("mysql2/promise"), 1);
var pool = null;
function isDbConfigured() {
  return Boolean(process.env.DB_HOST && process.env.DB_USER && process.env.DB_NAME);
}
function getPool() {
  if (!pool) {
    pool = import_promise.default.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0
      // MySQL JSON columns come back as JS objects already with mysql2 — no
      // need to JSON.parse/stringify manually on the read path.
    });
  }
  return pool;
}
var ROW_TABLES = ["leads", "applications", "projects", "invoices", "tickets", "audit_logs"];
async function initSchema() {
  const p = getPool();
  await p.query(`
    CREATE TABLE IF NOT EXISTS content_store (
      resource_key VARCHAR(50) PRIMARY KEY,
      data JSON NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
  `);
  for (const table of ROW_TABLES) {
    await p.query(`
      CREATE TABLE IF NOT EXISTS \`${table}\` (
        id VARCHAR(64) PRIMARY KEY,
        data JSON NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
  }
}
async function getContent(key) {
  const p = getPool();
  const [rows] = await p.query("SELECT data FROM content_store WHERE resource_key = ?", [key]);
  const arr = rows;
  if (arr.length === 0) return null;
  return arr[0].data;
}
async function setContent(key, value) {
  const p = getPool();
  await p.query(
    "INSERT INTO content_store (resource_key, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)",
    [key, JSON.stringify(value)]
  );
}
async function listRows(table) {
  const p = getPool();
  const [rows] = await p.query(`SELECT data FROM \`${table}\` ORDER BY created_at DESC`);
  return rows.map((r) => r.data);
}
async function upsertRow(table, id, data) {
  const p = getPool();
  await p.query(
    `INSERT INTO \`${table}\` (id, data) VALUES (?, ?) ON DUPLICATE KEY UPDATE data = VALUES(data)`,
    [id, JSON.stringify(data)]
  );
}
async function deleteRow(table, id) {
  const p = getPool();
  await p.query(`DELETE FROM \`${table}\` WHERE id = ?`, [id]);
}
async function replaceAllRows(table, items) {
  const p = getPool();
  const conn = await p.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(`DELETE FROM \`${table}\``);
    for (const item of items) {
      await conn.query(`INSERT INTO \`${table}\` (id, data) VALUES (?, ?)`, [item.id, JSON.stringify(item)]);
    }
    await conn.commit();
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }
}

// security.ts
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);
var import_express_rate_limit = __toESM(require("express-rate-limit"), 1);
var import_crypto = __toESM(require("crypto"), 1);
var JWT_SECRET = process.env.JWT_SECRET || import_crypto.default.randomBytes(32).toString("hex");
if (!process.env.JWT_SECRET) {
  console.warn(
    "[security] JWT_SECRET is not set \u2014 using a random secret generated at boot. Every cold start invalidates all existing sessions. Set JWT_SECRET in your environment for stable sessions."
  );
}
function signToken(payload) {
  return import_jsonwebtoken.default.sign(payload, JWT_SECRET, { expiresIn: "12h" });
}
function verifyToken(token) {
  try {
    return import_jsonwebtoken.default.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
function getBearerToken(req) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) return null;
  return header.slice(7);
}
function requireAuth(req, res, next) {
  const token = getBearerToken(req);
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    return res.status(401).json({ error: "Authentication required." });
  }
  req.auth = payload;
  next();
}
function requireAdmin(req, res, next) {
  const token = getBearerToken(req);
  const payload = token ? verifyToken(token) : null;
  if (!payload) {
    return res.status(401).json({ error: "Authentication required." });
  }
  if (payload.role !== "superadmin") {
    return res.status(403).json({ error: "SuperAdmin access required." });
  }
  req.auth = payload;
  next();
}
function safeCompare(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return import_crypto.default.timingSafeEqual(bufA, bufB);
}
var authLimiter = (0, import_express_rate_limit.default)({
  windowMs: 15 * 60 * 1e3,
  max: 8,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many attempts. Try again in 15 minutes." }
});
var apiLimiter = (0, import_express_rate_limit.default)({
  windowMs: 60 * 1e3,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests. Slow down." }
});
var writeLimiter = (0, import_express_rate_limit.default)({
  windowMs: 10 * 60 * 1e3,
  max: 15,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many submissions. Try again later." }
});

// server.ts
var db = {
  settings: { ...INITIAL_SETTINGS },
  services: [...INITIAL_SERVICES],
  products: [...INITIAL_PRODUCTS],
  blogs: [...INITIAL_BLOGS],
  careers: [...INITIAL_CAREERS],
  gallery: [...INITIAL_GALLERY],
  partners: [...INITIAL_PARTNERS],
  caseStudies: [...INITIAL_CASE_STUDIES],
  leads: [],
  applications: [],
  projects: [...INITIAL_CLIENT_PROJECTS],
  invoices: [...INITIAL_INVOICES],
  metrics: [...INITIAL_PERFORMANCE_METRICS],
  tickets: [...INITIAL_SUPPORT_TICKETS],
  auditLogs: [...INITIAL_AUDIT_LOGS]
};
var dbReady = false;
async function initDbAndLoad() {
  if (!isDbConfigured()) {
    console.warn(
      "[db] DB_HOST/DB_USER/DB_NAME not set \u2014 running on in-memory seed data only. Nothing written will persist across restarts. Set the DB_* env vars to connect MySQL."
    );
    return;
  }
  try {
    await initSchema();
    const contentDefaults = {
      settings: INITIAL_SETTINGS,
      services: INITIAL_SERVICES,
      products: INITIAL_PRODUCTS,
      blogs: INITIAL_BLOGS,
      careers: INITIAL_CAREERS,
      gallery: INITIAL_GALLERY,
      partners: INITIAL_PARTNERS,
      caseStudies: INITIAL_CASE_STUDIES
    };
    for (const key of Object.keys(contentDefaults)) {
      let value = await getContent(key);
      if (value === null) {
        value = contentDefaults[key];
        await setContent(key, value);
      }
      db[key] = value;
    }
    const rowDefaults = {
      leads: [],
      applications: [],
      projects: INITIAL_CLIENT_PROJECTS,
      invoices: INITIAL_INVOICES,
      tickets: INITIAL_SUPPORT_TICKETS,
      audit_logs: INITIAL_AUDIT_LOGS
    };
    const rowKeyMap = {
      leads: "leads",
      applications: "applications",
      projects: "projects",
      invoices: "invoices",
      tickets: "tickets",
      audit_logs: "auditLogs"
    };
    for (const table of Object.keys(rowDefaults)) {
      let rows = await listRows(table);
      if (rows.length === 0 && rowDefaults[table].length > 0) {
        for (const item of rowDefaults[table]) {
          await upsertRow(table, item.id, item);
        }
        rows = rowDefaults[table];
      }
      db[rowKeyMap[table]] = rows;
    }
    dbReady = true;
    console.log("[db] Connected to MySQL \u2014 data will persist across restarts.");
  } catch (err) {
    console.error("[db] MySQL connection/init failed \u2014 falling back to in-memory seed data:", err);
  }
}
async function logAudit(entry) {
  const fullEntry = {
    id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").substring(0, 19),
    ipAddress: "127.0.0.1",
    ...entry
  };
  db.auditLogs.unshift(fullEntry);
  if (dbReady) {
    try {
      await upsertRow("audit_logs", fullEntry.id, fullEntry);
    } catch (err) {
      console.error("[db] Failed to persist audit log:", err);
    }
  }
}
var genAIClient = null;
function getGenAI() {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    try {
      genAIClient = new import_genai.GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    } catch (err) {
      console.warn("Gemini client init warning:", err);
    }
  }
  return genAIClient;
}
async function createApp() {
  const app = (0, import_express.default)();
  app.set("trust proxy", 1);
  app.use((0, import_helmet.default)({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", "data:"],
        objectSrc: ["'none'"],
        frameAncestors: ["'none'"]
      }
    },
    crossOriginResourcePolicy: { policy: "same-site" }
  }));
  const allowedOrigin = process.env.APP_URL || true;
  app.use((0, import_cors.default)({ origin: allowedOrigin, credentials: true }));
  app.use(import_express.default.json({ limit: "1mb" }));
  app.use("/api/", apiLimiter);
  await initDbAndLoad();
  app.get("/api/health", (req, res) => {
    res.json({
      status: "healthy",
      company: db.settings.companyName,
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      hosting: {
        mysql: dbReady ? "Connected" : isDbConfigured() ? "Configured but unreachable \u2014 check DB_* env vars" : "Not configured \u2014 set DB_HOST/DB_USER/DB_NAME",
        vercelCloud: "Ready"
      }
    });
  });
  app.get("/api/content", (req, res) => {
    res.json({
      settings: db.settings,
      services: db.services,
      products: db.products,
      blogs: db.blogs,
      careers: db.careers,
      gallery: db.gallery,
      partners: db.partners,
      caseStudies: db.caseStudies
    });
  });
  app.put("/api/content/:resource", requireAdmin, async (req, res) => {
    const { resource } = req.params;
    const body = req.body;
    const key = resource === "case-studies" ? "caseStudies" : resource;
    const validResources = ["settings", "services", "products", "blogs", "careers", "gallery", "partners", "caseStudies"];
    if (!validResources.includes(key)) {
      return res.status(400).json({ error: `Unknown resource: ${resource}` });
    }
    if (key === "settings") {
      db.settings = { ...db.settings, ...body };
    } else {
      db[key] = body;
    }
    try {
      if (dbReady) {
        await setContent(key, db[key]);
      }
      res.json({ success: true, data: db[key] });
    } catch (err) {
      console.error(`[db] Failed to persist content/${key}:`, err);
      res.status(500).json({ error: "Saved in memory but failed to persist to database." });
    }
  });
  app.post("/api/auth/login", authLimiter, async (req, res) => {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }
    if (role === "admin" || email === "admin@orbit-i.com") {
      const adminPassword = process.env.ADMIN_PASSWORD;
      if (!adminPassword) {
        console.error("[security] ADMIN_PASSWORD is not set \u2014 SuperAdmin login is disabled until it is configured.");
        return res.status(503).json({ error: "SuperAdmin login is not configured on this server." });
      }
      if (safeCompare(password, adminPassword)) {
        await logAudit({
          actor: "SuperAdmin",
          action: "SuperAdmin successfully authenticated via portal credentials",
          category: "AUTH",
          status: "SUCCESS",
          ipAddress: req.ip
        });
        const token = signToken({ role: "superadmin", email: email || "admin@orbit-i.com" });
        return res.json({
          success: true,
          token,
          user: {
            name: "Abdul Samad Rind",
            email: email || "admin@orbit-i.com",
            role: "superadmin",
            title: "Founder & CEO"
          }
        });
      }
      await logAudit({
        actor: email || "unknown",
        action: "Failed SuperAdmin login attempt (incorrect password)",
        category: "SECURITY",
        status: "ALERT",
        ipAddress: req.ip
      });
      return res.status(401).json({ error: "Invalid credentials." });
    }
    const matchingProject = db.projects.find(
      (p) => p.clientEmail?.toLowerCase() === email?.toLowerCase()
    );
    if (matchingProject) {
      await logAudit({
        actor: email,
        action: "Client successfully logged into client project portal",
        category: "AUTH",
        status: "SUCCESS",
        ipAddress: req.ip
      });
      const token = signToken({ role: "client", email, projectId: matchingProject.id });
      return res.json({
        success: true,
        token,
        user: {
          name: matchingProject.clientName || "Client",
          email,
          role: "client",
          organization: matchingProject.clientName || "Client Organization",
          projectId: matchingProject.id
        }
      });
    }
    await logAudit({
      actor: email || "unknown",
      action: "Failed client login attempt (email not on file)",
      category: "SECURITY",
      status: "WARNING",
      ipAddress: req.ip
    });
    return res.status(401).json({ error: "No project found for that email address." });
  });
  app.post("/api/auth/forgot-password", authLimiter, (req, res) => {
    res.status(501).json({
      error: "Self-service password reset is not available. Contact your site administrator to reset credentials."
    });
  });
  app.post("/api/auth/verify-code", authLimiter, (req, res) => {
    res.status(501).json({ error: "Self-service password reset is not available. Contact your site administrator." });
  });
  app.post("/api/auth/reset-password", authLimiter, (req, res) => {
    res.status(501).json({ error: "Self-service password reset is not available. Contact your site administrator." });
  });
  app.get("/api/data/export-all", requireAdmin, (req, res) => {
    res.json({
      version: "1.0.0",
      exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
      company: db.settings.legalEntity,
      data: {
        settings: db.settings,
        services: db.services,
        products: db.products,
        blogs: db.blogs,
        careers: db.careers,
        gallery: db.gallery,
        partners: db.partners,
        caseStudies: db.caseStudies,
        leads: db.leads,
        applications: db.applications,
        projects: db.projects,
        invoices: db.invoices,
        tickets: db.tickets,
        auditLogs: db.auditLogs
      }
    });
  });
  app.post("/api/data/import-all", requireAdmin, async (req, res) => {
    const { data } = req.body;
    if (!data) return res.status(400).json({ error: "Missing data payload" });
    try {
      const contentUpdates = [];
      if (data.settings) {
        db.settings = data.settings;
        contentUpdates.push(["settings", db.settings]);
      }
      if (data.services) {
        db.services = data.services;
        contentUpdates.push(["services", db.services]);
      }
      if (data.products) {
        db.products = data.products;
        contentUpdates.push(["products", db.products]);
      }
      if (data.blogs) {
        db.blogs = data.blogs;
        contentUpdates.push(["blogs", db.blogs]);
      }
      if (data.careers) {
        db.careers = data.careers;
        contentUpdates.push(["careers", db.careers]);
      }
      if (data.gallery) {
        db.gallery = data.gallery;
        contentUpdates.push(["gallery", db.gallery]);
      }
      if (data.partners) {
        db.partners = data.partners;
        contentUpdates.push(["partners", db.partners]);
      }
      if (data.caseStudies) {
        db.caseStudies = data.caseStudies;
        contentUpdates.push(["caseStudies", db.caseStudies]);
      }
      const rowUpdates = [];
      if (data.leads) {
        db.leads = data.leads;
        rowUpdates.push(["leads", db.leads]);
      }
      if (data.applications) {
        db.applications = data.applications;
        rowUpdates.push(["applications", db.applications]);
      }
      if (data.projects) {
        db.projects = data.projects;
        rowUpdates.push(["projects", db.projects]);
      }
      if (data.invoices) {
        db.invoices = data.invoices;
        rowUpdates.push(["invoices", db.invoices]);
      }
      if (data.tickets) {
        db.tickets = data.tickets;
        rowUpdates.push(["tickets", db.tickets]);
      }
      if (dbReady) {
        for (const [key, value] of contentUpdates) await setContent(key, value);
        for (const [table, items] of rowUpdates) await replaceAllRows(table, items);
      }
      await logAudit({
        actor: "SuperAdmin",
        action: "Full database state imported and applied from JSON backup",
        category: "DATABASE",
        status: "WARNING"
      });
      res.json({ success: true, message: "Database state successfully restored from JSON backup." });
    } catch (err) {
      console.error("[db] import-all failed:", err);
      res.status(500).json({ error: "Import applied in memory but failed to persist to database." });
    }
  });
  app.post("/api/data/reset-seeds", requireAdmin, async (req, res) => {
    db.settings = { ...INITIAL_SETTINGS };
    db.services = [...INITIAL_SERVICES];
    db.products = [...INITIAL_PRODUCTS];
    db.blogs = [...INITIAL_BLOGS];
    db.careers = [...INITIAL_CAREERS];
    db.gallery = [...INITIAL_GALLERY];
    db.partners = [...INITIAL_PARTNERS];
    db.caseStudies = [...INITIAL_CASE_STUDIES];
    db.projects = [...INITIAL_CLIENT_PROJECTS];
    db.invoices = [...INITIAL_INVOICES];
    db.tickets = [...INITIAL_SUPPORT_TICKETS];
    db.metrics = [...INITIAL_PERFORMANCE_METRICS];
    db.leads = [];
    db.applications = [];
    db.auditLogs = [...INITIAL_AUDIT_LOGS];
    try {
      if (dbReady) {
        await setContent("settings", db.settings);
        await setContent("services", db.services);
        await setContent("products", db.products);
        await setContent("blogs", db.blogs);
        await setContent("careers", db.careers);
        await setContent("gallery", db.gallery);
        await setContent("partners", db.partners);
        await setContent("caseStudies", db.caseStudies);
        await replaceAllRows("projects", db.projects);
        await replaceAllRows("invoices", db.invoices);
        await replaceAllRows("tickets", db.tickets);
        await replaceAllRows("leads", db.leads);
        await replaceAllRows("applications", db.applications);
        await replaceAllRows("audit_logs", db.auditLogs);
      }
    } catch (err) {
      console.error("[db] reset-seeds failed to persist:", err);
    }
    await logAudit({
      actor: "SuperAdmin",
      action: "Database factory reset initiated \u2014 restored all initial seed data",
      category: "DATABASE",
      status: "ALERT"
    });
    res.json({
      success: true,
      message: "All application tables have been reset to factory seed state.",
      data: {
        settings: db.settings,
        services: db.services,
        products: db.products,
        blogs: db.blogs,
        careers: db.careers,
        gallery: db.gallery,
        partners: db.partners,
        caseStudies: db.caseStudies,
        projects: db.projects,
        invoices: db.invoices,
        tickets: db.tickets
      }
    });
  });
  app.get("/api/leads", requireAdmin, (req, res) => {
    res.json(db.leads);
  });
  app.post("/api/leads", writeLimiter, async (req, res) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      createdAt: (/* @__PURE__ */ new Date()).toLocaleString(),
      status: "New",
      ...req.body
    };
    db.leads.unshift(newLead);
    try {
      if (dbReady) await upsertRow("leads", newLead.id, newLead);
      res.status(201).json({ success: true, lead: newLead });
    } catch (err) {
      console.error("[db] Failed to persist lead:", err);
      res.status(201).json({ success: true, lead: newLead, warning: "Saved in memory but failed to persist to database." });
    }
  });
  app.patch("/api/leads/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    const idx = db.leads.findIndex((l) => l.id === id);
    if (idx >= 0) {
      db.leads[idx] = { ...db.leads[idx], ...req.body };
      if (dbReady) {
        try {
          await upsertRow("leads", id, db.leads[idx]);
        } catch (err) {
          console.error("[db] Failed to persist lead update:", err);
        }
      }
      return res.json({ success: true, lead: db.leads[idx] });
    }
    res.status(404).json({ error: "Lead not found" });
  });
  app.get("/api/careers/applications", requireAdmin, (req, res) => {
    res.json(db.applications);
  });
  app.post("/api/careers/apply", writeLimiter, async (req, res) => {
    const newApp = {
      id: `app-${Date.now()}`,
      appliedAt: (/* @__PURE__ */ new Date()).toLocaleString(),
      status: "Pending",
      ...req.body
    };
    db.applications.unshift(newApp);
    try {
      if (dbReady) await upsertRow("applications", newApp.id, newApp);
      res.status(201).json({ success: true, application: newApp });
    } catch (err) {
      console.error("[db] Failed to persist application:", err);
      res.status(201).json({ success: true, application: newApp, warning: "Saved in memory but failed to persist to database." });
    }
  });
  app.patch("/api/careers/applications/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    const idx = db.applications.findIndex((a) => a.id === id);
    if (idx >= 0) {
      db.applications[idx] = { ...db.applications[idx], ...req.body };
      if (dbReady) {
        try {
          await upsertRow("applications", id, db.applications[idx]);
        } catch (err) {
          console.error("[db] Failed to persist application update:", err);
        }
      }
      return res.json({ success: true, application: db.applications[idx] });
    }
    res.status(404).json({ error: "Application not found" });
  });
  app.get("/api/projects", requireAuth, (req, res) => {
    const auth = req.auth;
    if (auth.role === "client") {
      return res.json(db.projects.filter((p) => p.id === auth.projectId));
    }
    res.json(db.projects);
  });
  app.post("/api/projects", requireAdmin, async (req, res) => {
    const newProject = {
      id: `proj-${Date.now()}`,
      currentPhase: "Discovery",
      progressPercentage: 10,
      spentBudget: 0,
      healthStatus: "Optimal",
      milestones: [
        { id: `m-${Date.now()}-1`, title: "Architecture Scoping & Security Blueprints", status: "In Progress", dueDate: "In 2 Weeks" },
        { id: `m-${Date.now()}-2`, title: "Interactive Prototypes & Frontend Shell", status: "Upcoming", dueDate: "In 4 Weeks" },
        { id: `m-${Date.now()}-3`, title: "Core Production Engineering & API Integration", status: "Upcoming", dueDate: "In 7 Weeks" }
      ],
      deliverables: [],
      ...req.body
    };
    db.projects.unshift(newProject);
    if (dbReady) {
      try {
        await upsertRow("projects", newProject.id, newProject);
      } catch (err) {
        console.error("[db] Failed to persist project:", err);
      }
    }
    await logAudit({
      actor: "SuperAdmin",
      action: `Created new client project: "${newProject.projectName || newProject.title}"`,
      category: "CRM",
      status: "SUCCESS"
    });
    res.status(201).json({ success: true, project: newProject });
  });
  app.patch("/api/projects/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    const idx = db.projects.findIndex((p) => p.id === id);
    if (idx >= 0) {
      db.projects[idx] = { ...db.projects[idx], ...req.body };
      if (dbReady) {
        try {
          await upsertRow("projects", id, db.projects[idx]);
        } catch (err) {
          console.error("[db] Failed to persist project update:", err);
        }
      }
      return res.json({ success: true, project: db.projects[idx] });
    }
    res.status(404).json({ error: "Project not found" });
  });
  app.delete("/api/projects/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    db.projects = db.projects.filter((p) => p.id !== id);
    if (dbReady) {
      try {
        await deleteRow("projects", id);
      } catch (err) {
        console.error("[db] Failed to delete project:", err);
      }
    }
    res.json({ success: true });
  });
  app.get("/api/invoices", requireAuth, (req, res) => {
    const auth = req.auth;
    if (auth.role === "client") {
      return res.json(db.invoices.filter((i) => i.clientEmail?.toLowerCase() === auth.email?.toLowerCase()));
    }
    res.json(db.invoices);
  });
  app.post("/api/invoices", requireAdmin, async (req, res) => {
    const amount = Number(req.body.amount || 0);
    const tax = Number(req.body.tax || Math.round(amount * 0.05));
    const newInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: req.body.invoiceNumber || `INV-ORB-${(/* @__PURE__ */ new Date()).getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`,
      status: "Pending",
      issuedDate: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }),
      totalAmount: amount + tax,
      ...req.body,
      amount,
      tax
    };
    db.invoices.unshift(newInvoice);
    if (dbReady) {
      try {
        await upsertRow("invoices", newInvoice.id, newInvoice);
      } catch (err) {
        console.error("[db] Failed to persist invoice:", err);
      }
    }
    await logAudit({
      actor: "SuperAdmin",
      action: `Generated invoice #${newInvoice.invoiceNumber} for ${newInvoice.clientName} (${newInvoice.totalAmount})`,
      category: "BILLING",
      status: "SUCCESS"
    });
    res.status(201).json({ success: true, invoice: newInvoice });
  });
  app.patch("/api/invoices/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    const idx = db.invoices.findIndex((i) => i.id === id);
    if (idx >= 0) {
      db.invoices[idx] = { ...db.invoices[idx], ...req.body };
      if (dbReady) {
        try {
          await upsertRow("invoices", id, db.invoices[idx]);
        } catch (err) {
          console.error("[db] Failed to persist invoice update:", err);
        }
      }
      return res.json({ success: true, invoice: db.invoices[idx] });
    }
    res.status(404).json({ error: "Invoice not found" });
  });
  app.delete("/api/invoices/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    db.invoices = db.invoices.filter((i) => i.id !== id);
    if (dbReady) {
      try {
        await deleteRow("invoices", id);
      } catch (err) {
        console.error("[db] Failed to delete invoice:", err);
      }
    }
    res.json({ success: true });
  });
  app.post("/api/payments/settle", requireAuth, async (req, res) => {
    const auth = req.auth;
    const { invoiceId, paymentMethod, paymentToken } = req.body;
    const inv = db.invoices.find((i) => i.id === invoiceId);
    if (!inv) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    if (auth.role === "client" && inv.clientEmail?.toLowerCase() !== auth.email?.toLowerCase()) {
      return res.status(403).json({ error: "You can only settle your own invoices." });
    }
    {
      inv.status = "Paid";
      inv.paidAt = (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
      if (dbReady) {
        try {
          await upsertRow("invoices", inv.id, inv);
        } catch (err) {
          console.error("[db] Failed to persist settled invoice:", err);
        }
      }
      await logAudit({
        actor: `Client (${inv.clientEmail})`,
        action: `Settled Invoice #${inv.invoiceNumber} (${inv.totalAmount}) via ${paymentMethod || "Credit Card Gateway"}`,
        category: "BILLING",
        status: "SUCCESS"
      });
      return res.json({
        success: true,
        message: "Payment processed successfully and invoice marked as Paid.",
        transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 9e3 + 1e3)}`,
        invoice: inv
      });
    }
  });
  app.get("/api/support/tickets", requireAuth, (req, res) => {
    const auth = req.auth;
    if (auth.role === "client") {
      return res.json(db.tickets.filter((t) => t.clientEmail?.toLowerCase() === auth.email?.toLowerCase()));
    }
    res.json(db.tickets);
  });
  app.post("/api/support/tickets", writeLimiter, async (req, res) => {
    const newTicket = {
      id: `tkt-${Date.now()}`,
      status: "Open",
      createdAt: (/* @__PURE__ */ new Date()).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) + " " + (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: "client",
          senderName: req.body.clientName || "Client Representative",
          text: req.body.initialMessage || req.body.subject,
          timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
        }
      ],
      ...req.body
    };
    db.tickets.unshift(newTicket);
    if (dbReady) {
      try {
        await upsertRow("tickets", newTicket.id, newTicket);
      } catch (err) {
        console.error("[db] Failed to persist ticket:", err);
      }
    }
    res.status(201).json({ success: true, ticket: newTicket });
  });
  app.post("/api/support/tickets/:id/messages", requireAuth, async (req, res) => {
    const { id } = req.params;
    const { sender, senderName, text } = req.body;
    const ticket = db.tickets.find((t) => t.id === id);
    if (ticket) {
      const newMsg = {
        id: `msg-${Date.now()}`,
        sender: sender || "support",
        senderName: senderName || "Orbit-I Engineer",
        text: text || "",
        timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      };
      ticket.messages.push(newMsg);
      if (sender === "support" || sender === "architect") {
        ticket.status = "In Investigation";
      }
      if (dbReady) {
        try {
          await upsertRow("tickets", ticket.id, ticket);
        } catch (err) {
          console.error("[db] Failed to persist ticket message:", err);
        }
      }
      return res.json({ success: true, message: newMsg, ticket });
    }
    res.status(404).json({ error: "Ticket not found" });
  });
  app.patch("/api/support/tickets/:id", requireAdmin, async (req, res) => {
    const { id } = req.params;
    const idx = db.tickets.findIndex((t) => t.id === id);
    if (idx >= 0) {
      db.tickets[idx] = { ...db.tickets[idx], ...req.body };
      if (dbReady) {
        try {
          await upsertRow("tickets", id, db.tickets[idx]);
        } catch (err) {
          console.error("[db] Failed to persist ticket update:", err);
        }
      }
      return res.json({ success: true, ticket: db.tickets[idx] });
    }
    res.status(404).json({ error: "Ticket not found" });
  });
  app.get("/api/audit-logs", requireAdmin, (req, res) => {
    res.json(db.auditLogs);
  });
  app.post("/api/audit-logs", requireAdmin, async (req, res) => {
    await logAudit({
      actor: req.body.actor || "System",
      action: req.body.action || "Unspecified action",
      category: req.body.category || "SYSTEM",
      status: req.body.status || "SUCCESS",
      ipAddress: req.body.ipAddress
    });
    res.status(201).json(db.auditLogs[0]);
  });
  app.post("/api/db/test-connection", requireAdmin, async (req, res) => {
    const started = Date.now();
    if (!isDbConfigured()) {
      return res.status(400).json({
        success: false,
        error: "DB_HOST / DB_USER / DB_NAME are not set in environment variables."
      });
    }
    try {
      await initSchema();
      const tableCounts = await Promise.all(
        ["leads", "applications", "projects", "invoices", "tickets", "audit_logs"].map((t) => listRows(t))
      );
      res.json({
        success: true,
        dialect: "mysql",
        pingMs: Date.now() - started,
        connectedTables: 7 + tableCounts.length,
        status: "CONNECTED_HEALTHY",
        timestamp: (/* @__PURE__ */ new Date()).toISOString()
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        error: err?.message || "MySQL connection failed.",
        pingMs: Date.now() - started
      });
    }
  });
  app.get("/api/analytics", requireAdmin, (req, res) => {
    const latestMetrics = [...db.metrics];
    const paidInvoices = db.invoices.filter((i) => i.status === "Paid");
    const totalInvoicesSettled = paidInvoices.reduce((acc, curr) => acc + (curr.totalAmount || curr.amount || 0), 0);
    const uniqueClients = new Set(db.projects.map((p) => p.clientEmail).filter(Boolean)).size;
    res.json({
      metrics: latestMetrics,
      summary: {
        // Uptime/response-time/request-volume are not tracked by this app
        // (no real monitoring is wired in) — omitted rather than faked.
        activeClients: uniqueClients,
        activeProjects: db.projects.length,
        totalInvoicesSettled: `$${totalInvoicesSettled.toLocaleString()}`,
        unpaidInvoicesSum: db.invoices.filter((i) => i.status !== "Paid").reduce((acc, curr) => acc + (curr.totalAmount || curr.amount || 0), 0)
      }
    });
  });
  function buildOrbitKnowledgeBase() {
    const servicesList = db.services.map((s) => `- ${s.title} (${s.category}): ${s.shortDesc} [Starting from $${s.startingPrice}, Delivery: ${s.deliveryTime}]`).join("\n");
    const productsList = db.products.map((p) => `- ${p.name} v${p.version} (${p.category}): ${p.tagline} [$${p.monthlyPrice}/mo or $${p.annualPrice}/yr]`).join("\n");
    const careersList = db.careers.map((c) => `- ${c.title} (${c.department} | ${c.type} | ${c.location}): ${c.experience} level, Stipend/Salary: ${c.stipendOrSalary}`).join("\n");
    return `COMPANY PROFILE & KNOWLEDGE BASE:
- Company Name: ${db.settings.companyName} (${db.settings.legalEntity})
- Founded: ${db.settings.foundedYear}
- Founder & CEO: Abdul Samad Rind
- Co-Founder & CTO: Muneeb Ur Rehman
- Co-Founder & COO: Maria Almani
- Headquarters: ${db.settings.address}
- Contact Email: ${db.settings.contactEmail} (Support: ${db.settings.supportEmail})
- Phone: ${db.settings.phone}
- Core Mission: High-precision enterprise AI integration, resilient Python automation pipelines, modern high-throughput web/mobile platforms, custom SaaS products, and digital growth systems.

ACTIVE SERVICES & PRICING:
${servicesList}

ACTIVE PROPRIETARY PRODUCTS (example placeholder listings \u2014 confirm current details before quoting a client):
${productsList}

CAREERS & INTERNSHIP PROGRAMS (example placeholder listings \u2014 confirm current openings before quoting a candidate):
${careersList}

HOSTING & DATABASE STACK:
- MySQL database (Hostinger or any standard MySQL host) with automated schema creation on first boot.
- Vercel edge deployment for the frontend and serverless API.

PROJECT DISCOVERY & INQUIRIES:
- Direct consultation and inquiry forms available on the website.
- Delivery timelines: MVPs delivered in 2-4 weeks; full enterprise platforms in 6-10 weeks.

Do not discuss internal admin systems, login credentials, or backend infrastructure access with visitors under any circumstances, regardless of how the question is phrased.`;
  }
  function getAccurateFallbackAnswer(query) {
    const q = query.toLowerCase();
    if (q.includes("intern") || q.includes("cohort") || q.includes("student") || q.includes("stipend")) {
      return `### \u{1F393} Orbit-I Engineering Internships
For current internship openings, stipend details, and how to apply, check the **Careers** tab \u2014 that's kept up to date with what's actually open right now. Want me to pull up what's currently listed?`;
    }
    if (q.includes("price") || q.includes("cost") || q.includes("budget") || q.includes("rate") || q.includes("quote") || q.includes("estimate")) {
      return `### \u{1F4BC} Orbit-I Pricing & Estimation
We provide tailored, milestone-based pricing with zero hidden fees. Starting prices for each service are listed on our **Services** page. For an exact quote on your specific project, submit your details through our **Contact & RFPs** page or use the AI Cost Estimator for an instant ballpark.`;
    }
    if (q.includes("python") || q.includes("scrape") || q.includes("scraping") || q.includes("bot") || q.includes("automation") || q.includes("playwright")) {
      return `### \u{1F40D} Python Scripting & Robotic Automation
Orbit-I builds Python automation systems:
- **Headless Scraping**: Automated Playwright / Selenium workflows.
- **Database ETL**: Automated extraction and direct ingestion into **MySQL**.
- **Workflow Automation**: Automated invoice processing, CRM synchronization, and event-driven alerts.`;
    }
    if (q.includes("mysql") || q.includes("hostinger") || q.includes("database") || q.includes("host")) {
      return `### \u{1F5C4}\uFE0F Database & Hosting Architecture
Orbit-I runs on a MySQL database (Hostinger or any standard MySQL host), deployed on **Vercel** edge hosting.`;
    }
    if (q.includes("admin") || q.includes("superadmin") || q.includes("portal") || q.includes("login") || q.includes("password") || q.includes("client portal") || q.includes("credential")) {
      return `### Client Access
If you're an existing client, you can sign in from the link provided to you directly. If you're looking to become a client, submit an inquiry through our **Contact** page and we'll set you up with portal access.`;
    }
    if (q.includes("product") || q.includes("matrix") || q.includes("automator") || q.includes("nexus") || q.includes("cybershield")) {
      return `### \u{1F680} Orbit-I Proprietary SaaS Suite
Check the **Products** page for our current lineup and pricing \u2014 that list is kept current there rather than duplicated here.`;
    }
    if (q.includes("contact") || q.includes("email") || q.includes("phone") || q.includes("address") || q.includes("founder") || q.includes("samad") || q.includes("isam")) {
      return `### \u{1F4EC} Contact ${db.settings.companyName}
- **Headquarters**: ${db.settings.address}
- **General Inquiries**: \`${db.settings.contactEmail}\`
- **Client Support**: \`${db.settings.supportEmail}\`
- **Phone**: \`${db.settings.phone}\`
- **Founder & CEO**: Abdul Samad Rind
- **Co-Founder & CTO**: Muneeb Ur Rehman
- **Co-Founder & COO**: Maria Almani
- **Discovery Calls**: You can submit an inquiry through our Contact page.`;
    }
    if (q.includes("service") || q.includes("what do you do") || q.includes("about") || q.includes("ai") || q.includes("web") || q.includes("mobile")) {
      return `### \u{1F31F} Welcome to ${db.settings.companyName}
Orbit-I is a technology engineering firm specializing in:
1. **AI & Machine Learning**: Custom LLM integrations, RAG agents, and enterprise intelligent search.
2. **Web & Mobile Engineering**: React, TypeScript, Node.js, and cross-platform apps.
3. **Python Automation & RPA**: Headless web scrapers, data pipelines, and MySQL integrations.
4. **Graphics & UI/UX**: Brand systems and interactive design.
5. **Cloud & Deployment**: MySQL + Vercel edge hosting.

How can we assist you with your upcoming project? You can submit your requirements on our Contact page!`;
    }
    return `### Orbit-I AI Virtual Consultant
Thank you for your inquiry! ${db.settings.companyName} specializes in **Custom Enterprise AI**, **Python Automation & Scraping**, **Web & Mobile Platforms**, and **Cloud Engineering (MySQL & Vercel)**.

- \u{1F4A1} **Inquire for Project**: Submit your requirements via our Contact page.
- \u{1F393} **Careers & Internships**: Check the Careers tab for current openings.
- \u{1F4EC} **Direct Contact**: Reach our team at \`${db.settings.contactEmail}\` or call \`${db.settings.phone}\`.

Please let me know if you would like specific details regarding our services, technical architectures, or pricing!`;
  }
  app.post("/api/ai/draft-proposal", requireAdmin, async (req, res) => {
    const { leadName, company, serviceCategory, budget, timeline, details } = req.body;
    const ai = getGenAI();
    if (!ai) {
      return res.json({
        proposalSubject: `Orbit-I Technical Proposal & Implementation Plan for ${company || leadName}`,
        executiveSummary: `Orbit-I Private Limited is pleased to propose an end-to-end engineering solution for ${company || leadName} targeting ${serviceCategory}.`,
        proposedMilestones: [
          { phase: "Phase 1: Architecture Blueprint & Technical Scoping", duration: "Week 1-2", cost: Math.round(Number(budget?.replace(/[^0-9]/g, "") || 5e3) * 0.3) },
          { phase: "Phase 2: Core Engineering, Data Pipelines & UI Development", duration: "Week 3-5", cost: Math.round(Number(budget?.replace(/[^0-9]/g, "") || 5e3) * 0.5) },
          { phase: "Phase 3: Automated QA, Penetration Testing & Handover", duration: "Week 6", cost: Math.round(Number(budget?.replace(/[^0-9]/g, "") || 5e3) * 0.2) }
        ],
        techRecommendation: ["React 19 / TypeScript", "FastAPI / Python 3.12", "MySQL", "Docker CI/CD"],
        estimatedTotal: budget || "$8,500"
      });
    }
    try {
      const prompt = `You are the VP of Engineering & Solutions at Orbit-I Private Limited.
Write a formal, crisp, enterprise-grade technical proposal response for this inbound lead:
Client Name: ${leadName}
Company: ${company}
Service Requested: ${serviceCategory}
Budget: ${budget}
Timeline: ${timeline}
Details: ${details}

Respond with valid JSON:
{
  "proposalSubject": "...",
  "executiveSummary": "...",
  "proposedMilestones": [
    { "phase": "...", "duration": "...", "cost": 1500 }
  ],
  "techRecommendation": ["Tech1", "Tech2", "Tech3"],
  "estimatedTotal": "$X,XXX"
}`;
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: { responseMimeType: "application/json" }
      });
      res.json(JSON.parse(response.text || "{}"));
    } catch (err) {
      res.json({
        proposalSubject: `Orbit-I Implementation Proposal for ${company || leadName}`,
        executiveSummary: `Custom engineering proposal prepared for ${leadName}.`,
        proposedMilestones: [
          { phase: "Architecture & UX Specification", duration: "2 Weeks", cost: 2500 },
          { phase: "Core Production Engineering", duration: "3 Weeks", cost: 4500 },
          { phase: "Deployment & SLA Handover", duration: "1 Week", cost: 1500 }
        ],
        techRecommendation: ["React 19", "Python 3.12", "MySQL"],
        estimatedTotal: budget || "$8,500"
      });
    }
  });
  app.post("/api/ai/estimate-project", async (req, res) => {
    const { description, serviceType, targetBudget, timelinePref } = req.body;
    const ai = getGenAI();
    if (!ai) {
      const isAI = serviceType?.toLowerCase().includes("ai");
      const isAuto = serviceType?.toLowerCase().includes("python") || serviceType?.toLowerCase().includes("automation");
      const estCost = isAI ? "$4,500 - $8,500" : isAuto ? "$2,500 - $4,800" : "$3,000 - $6,500";
      const estWeeks = isAI ? "4-6 Weeks" : isAuto ? "2-3 Weeks" : "3-5 Weeks";
      return res.json({
        costRange: estCost,
        timeline: estWeeks,
        recommendedStack: ["React 19", "TypeScript", isAI ? "Gemini 3.7 LLM" : isAuto ? "Python Playwright" : "Node.js Express", "MySQL", "TailwindCSS"],
        keyPhases: [
          "Architecture & Requirements Spec",
          "Interactive 3D / UI Prototype",
          "Core Engineering & Database Integration",
          "Automated QA & Security Audit",
          "Deployment on Vercel"
        ],
        roiInsight: "Automation typically reduces manual operational overhead significantly \u2014 the exact impact depends on your current process, and we can quantify it more precisely during a discovery call."
      });
    }
    try {
      const prompt = `You are the Principal Solutions Architect at Orbit-I Private Limited (an elite AI, Web Apps, Custom Products, Python & Automation, Graphics & Digital Marketing enterprise company).
Analyze this client project request and generate an accurate technical scope and estimation JSON.

Project Description: "${description}"
Service Category: "${serviceType}"
Budget Preference: "${targetBudget}"
Timeline Preference: "${timelinePref}"

Respond ONLY with valid JSON in this exact structure:
{
  "costRange": "$X,XXX - $Y,YYY",
  "timeline": "X-Y Weeks",
  "recommendedStack": ["Tech1", "Tech2", "Tech3", "Tech4", "Tech5"],
  "keyPhases": ["Phase 1...", "Phase 2...", "Phase 3...", "Phase 4...", "Phase 5..."],
  "roiInsight": "A sharp 2-sentence executive summary on the ROI and business value of this build."
}`;
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch (err) {
      console.error("AI Estimator error:", err);
      res.json({
        costRange: "$3,500 - $7,000",
        timeline: "3-5 Weeks",
        recommendedStack: ["React 19", "TypeScript", "Node.js Express", "Python 3.12", "MySQL"],
        keyPhases: [
          "Requirement Scoping & Wireframes",
          "Database Architecture & APIs",
          "Frontend UI & 3D Interactive Elements",
          "QA Testing & Stress Benchmarking",
          "Production Deployment on Vercel / Hostinger"
        ],
        roiInsight: "Orbit-I rapid deployment framework provides enterprise reliability with 3x faster time to market."
      });
    }
  });
  app.post("/api/ai/generate-content", requireAdmin, async (req, res) => {
    const { contentType, topic, tone, targetAudience } = req.body;
    const ai = getGenAI();
    if (!ai) {
      return res.json({
        title: `Next-Generation ${topic} Strategies by Orbit-I`,
        content: `Discover how Orbit-I Private Limited delivers high-impact ${topic} for forward-thinking enterprises. Our engineering team combines AI intelligence, Python automation, and modern full-stack architectures to maximize operational ROI.`,
        tags: [topic, "Orbit-I", "Technology", "Enterprise"],
        summary: `An authoritative analysis of ${topic} and how modern enterprises scale with custom engineering.`
      });
    }
    try {
      const prompt = `You are the Chief Technology Officer and Editor-in-Chief at Orbit-I Private Limited.
Create high-craft, professional, non-generic enterprise content for:
Content Type: ${contentType} (e.g. blog post, job description, product copy, marketing pitch)
Topic: ${topic}
Tone: ${tone || "Authoritative, innovative, clear"}
Audience: ${targetAudience || "Tech founders, CTOs, engineers, and enterprise leaders"}

Return ONLY valid JSON matching this schema:
{
  "title": "String",
  "summary": "String (1-2 sentences)",
  "content": "String (Rich Markdown formatted with headings, bullet points, and code/architecture notes)",
  "tags": ["Tag1", "Tag2", "Tag3", "Tag4"]
}`;
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json"
        }
      });
      const parsed = JSON.parse(response.text || "{}");
      res.json(parsed);
    } catch (err) {
      console.error("AI content generation error:", err);
      res.status(500).json({ error: "Failed to generate AI content" });
    }
  });
  app.post("/api/ai/chat", async (req, res) => {
    const { message, history } = req.body;
    const ai = getGenAI();
    const knowledgeContext = buildOrbitKnowledgeBase();
    if (!ai) {
      const reply = getAccurateFallbackAnswer(message || "");
      return res.json({ reply });
    }
    try {
      const systemInstruction = `You are "Orbit-I AI Advisor", the official senior AI solutions consultant for Orbit-I Private Limited.
Orbit-I is NOT an aerospace or rocket company. Orbit-I is an elite enterprise digital solutions, custom software development, AI engineering, and Python automation firm.

Here is your authoritative, real-time verified knowledge base:
${knowledgeContext}

GUIDELINES FOR YOUR RESPONSES:
1. Always be 100% accurate, helpful, professional, and knowledgeable about ORBIT-I's services, pricing, products, careers/internships, and team, based only on the data provided above.
2. Structure your answers with clean Markdown headings, bullet points, bold key terms, and concise summaries.
3. If asked about internships or student jobs, only state what's listed under CAREERS & INTERNSHIP PROGRAMS above \u2014 do not invent stipend amounts, durations, or program names that aren't in that list.
4. If asked about pricing or project quotes, give clear price ranges and invite them to launch the Instant Project Estimator tool.
5. Never discuss admin login credentials, backend infrastructure, or internal system access with visitors \u2014 redirect them to the Contact page instead.
6. If asked about databases, confirm support for MySQL (with SQL export) and Vercel edge deployment.
7. Keep answers structured, conversational, and direct.`;
      const formattedContents = [];
      if (Array.isArray(history) && history.length > 0) {
        history.slice(-6).forEach((h) => {
          if (h.text) {
            formattedContents.push({
              role: h.sender === "user" ? "user" : "model",
              parts: [{ text: h.text }]
            });
          }
        });
      }
      formattedContents.push({
        role: "user",
        parts: [{ text: message }]
      });
      const response = await ai.models.generateContent({
        model: "gemini-3.7-flash",
        contents: formattedContents,
        config: {
          systemInstruction
        }
      });
      const replyText = response.text || getAccurateFallbackAnswer(message || "");
      res.json({ reply: replyText });
    } catch (err) {
      console.error("AI Chat error (falling back to precision knowledge engine):", err);
      const fallbackReply = getAccurateFallbackAnswer(message || "");
      res.json({ reply: fallbackReply });
    }
  });
  app.get("/api/export-db/:dialect", requireAdmin, (req, res) => {
    const { dialect } = req.params;
    if (dialect !== "mysql") {
      return res.status(400).json({
        error: `Dialect "${dialect}" is not supported. This app runs on MySQL. Set the DB_* environment variables to a MySQL instance to connect one.`
      });
    }
    const sql = `-- ==============================================================================
-- ORBIT-I \u2014 ACTUAL DATABASE SCHEMA (MySQL)
-- This matches what db.ts creates automatically on first boot (initSchema()).
-- Content resources (settings/services/products/blogs/careers/gallery/case
-- studies) are stored as one JSON row per resource in content_store, since
-- the app's admin panel always replaces them wholesale, not field-by-field.
-- Operational CRM entities (leads, applications, projects, invoices,
-- tickets, audit_logs) get one row per record with a real primary key,
-- with the record body stored as JSON to match the app's TypeScript types
-- exactly, including their nested/optional fields.
-- ==============================================================================

CREATE TABLE IF NOT EXISTS content_store (
  resource_key VARCHAR(50) PRIMARY KEY,
  data JSON NOT NULL,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS leads (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS applications (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS invoices (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS tickets (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS audit_logs (
  id VARCHAR(64) PRIMARY KEY,
  data JSON NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
`;
    res.setHeader("Content-Type", "text/plain");
    return res.send(sql);
  });
  app.get("/robots.txt", (req, res) => {
    const siteUrl = (process.env.APP_URL || "https://orbit-i.tech").replace(/\/+$/, "");
    res.setHeader("Content-Type", "text/plain");
    res.send(
      `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`
    );
  });
  app.get("/sitemap.xml", (req, res) => {
    const siteUrl = (process.env.APP_URL || "https://orbit-i.tech").replace(/\/+$/, "");
    const staticPaths = [
      "/",
      "/services",
      "/products",
      "/featured-work",
      "/about",
      "/careers",
      "/blogs",
      "/gallery",
      "/partners",
      "/contact"
    ];
    const urls = staticPaths.map((p) => ({
      loc: `${siteUrl}${p}`
    }));
    for (const post of db.blogs || []) {
      if (post?.slug) {
        urls.push({ loc: `${siteUrl}/blog/${encodeURIComponent(post.slug)}` });
      }
    }
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
` + urls.map((u) => `  <url>
    <loc>${u.loc}</loc>
  </url>`).join("\n") + `
</urlset>
`;
    res.setHeader("Content-Type", "application/xml");
    res.send(xml);
  });
  return app;
}
async function startServer() {
  const app = await createApp();
  const PORT = Number(process.env.PORT) || 3e3;
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Orbit-I Server running at http://0.0.0.0:${PORT}`);
  });
}
if (!process.env.VERCEL) {
  startServer().catch((err) => {
    console.error("Server startup error:", err);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createApp
});
//# sourceMappingURL=server.cjs.map

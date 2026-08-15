import React, { useState, useEffect } from 'react';
import {
  NavigationTab,
  ServiceItem,
  ProductItem,
  BlogPost,
  CareerOpening,
  GalleryItem,
  CaseStudy,
  ProjectTracking,
  InvoiceItem,
  SiteSettings,
  InquiryLead,
  JobApplication
} from './types';
import {
  initialServices,
  initialProducts,
  initialBlogs,
  initialCareers,
  initialGallery,
  initialCaseStudies,
  initialProjects,
  initialInvoices,
  initialSettings
} from './data/initialData';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ThreeVisuals } from './components/ThreeVisuals';
import { AiCostEstimator } from './components/AiCostEstimator';
import { AiChatWidget } from './components/AiChatWidget';
import { PaymentModal } from './components/PaymentModal';

import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ProductsPage } from './components/pages/ProductsPage';
import { BlogsPage } from './components/pages/BlogsPage';
import { CareersPage } from './components/pages/CareersPage';
import { GalleryPage } from './components/pages/GalleryPage';
import { FeaturedWorkPage } from './components/pages/FeaturedWorkPage';
import { ContactPage } from './components/pages/ContactPage';

import { SuperAdminDashboard } from './components/admin/SuperAdminDashboard';
import { ClientPortal } from './components/client/ClientPortal';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<NavigationTab>('home');

  // Enforce Dark Mode Permanently
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // Application Data State (Synced with Backend)
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [products, setProducts] = useState<ProductItem[]>(initialProducts);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [careers, setCareers] = useState<CareerOpening[]>(initialCareers);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>(initialCaseStudies);
  const [projects, setProjects] = useState<ProjectTracking[]>(initialProjects);
  const [invoices, setInvoices] = useState<InvoiceItem[]>(initialInvoices);
  const [settings, setSettings] = useState<SiteSettings>(initialSettings);

  // Modals State
  const [estimatorOpen, setEstimatorOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    title: string;
    amount: number;
    description: string;
    invoiceId?: string;
  }>({
    title: 'Orbit-I Service Retainer',
    amount: 1500,
    description: 'Enterprise AI & Automation initial milestone',
  });

  // Fetch initial content from backend on mount
  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.services) setServices(data.services);
        if (data.products) setProducts(data.products);
        if (data.blogs) setBlogs(data.blogs);
        if (data.careers) setCareers(data.careers);
        if (data.gallery) setGallery(data.gallery);
        if (data.caseStudies) setCaseStudies(data.caseStudies);
        if (data.settings) setSettings(data.settings);
      })
      .catch(console.error);

    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setProjects(data);
      })
      .catch(console.error);

    fetch('/api/invoices')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setInvoices(data);
      })
      .catch(console.error);
  }, []);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Handle product subscription purchase
  const handleBuyProduct = (product: ProductItem) => {
    setPaymentDetails({
      title: `${product.name} Subscription`,
      amount: product.monthlyPrice,
      description: `1-Month recurring license for ${product.name} (${product.version})`,
    });
    setPaymentModalOpen(true);
  };

  // Handle invoice payment
  const handlePayInvoice = (invoice: InvoiceItem) => {
    setPaymentDetails({
      title: `Invoice #${invoice.invoiceNumber}`,
      amount: invoice.amount,
      description: `Settlement for project milestone: ${invoice.projectTitle}`,
      invoiceId: invoice.id,
    });
    setPaymentModalOpen(true);
  };

  const handlePaymentSuccess = (invoiceId?: string) => {
    if (invoiceId) {
      setInvoices((prev) =>
        prev.map((inv) => (inv.id === invoiceId ? { ...inv, status: 'Paid' } : inv))
      );
    }
  };

  const isPortalView = activeTab === 'admin' || (activeTab as string) === 'superadmin' || activeTab === 'client-portal';

  return (
    <div
      id="orbit-i-app"
      className="min-h-screen bg-slate-950 text-slate-100 flex flex-col relative transition-colors duration-200"
    >
      {/* Background Ambience & 3D WebGL Canvas (only for public pages) */}
      {!isPortalView && <ThreeVisuals />}

      {/* Emergency Announcement Banner (if configured in superadmin) */}
      {settings.emergencyAlert?.enabled && !isPortalView && (
        <div className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 text-center z-50 flex items-center justify-center gap-2 shadow-sm">
          <span>{settings.emergencyAlert.message}</span>
        </div>
      )}

      {/* Primary Sticky Header (Only for Public Views — Admin & Client use Left Sidebar) */}
      {!isPortalView && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          settings={settings}
          onOpenEstimator={() => setEstimatorOpen(true)}
        />
      )}

      {/* Main Dynamic View Router */}
      <main className="flex-1 relative z-10">
        {activeTab === 'home' && (
          <HomePage
            services={services}
            products={products}
            blogs={blogs}
            caseStudies={caseStudies}
            settings={settings}
            setActiveTab={setActiveTab}
            onOpenEstimator={() => setEstimatorOpen(true)}
            onBuyProduct={handleBuyProduct}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            settings={settings}
            setActiveTab={setActiveTab}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            services={services}
            setActiveTab={setActiveTab}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        )}

        {activeTab === 'products' && (
          <ProductsPage
            products={products}
            setActiveTab={setActiveTab}
            onBuyProduct={handleBuyProduct}
          />
        )}

        {activeTab === 'blogs' && (
          <BlogsPage blogs={blogs} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'careers' && (
          <CareersPage careers={careers} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'gallery' && (
          <GalleryPage gallery={gallery} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'featured' && (
          <FeaturedWorkPage
            caseStudies={caseStudies}
            setActiveTab={setActiveTab}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        )}

        {activeTab === 'contact' && (
          <ContactPage
            settings={settings}
            setActiveTab={setActiveTab}
            onOpenEstimator={() => setEstimatorOpen(true)}
          />
        )}

        {/* Enterprise SuperAdmin Workspace with Dedicated Left Sidebar */}
        {(activeTab === 'admin' || (activeTab as string) === 'superadmin') && (
          <SuperAdminDashboard
            services={services}
            setServices={setServices}
            products={products}
            setProducts={setProducts}
            blogs={blogs}
            setBlogs={setBlogs}
            careers={careers}
            setCareers={setCareers}
            gallery={gallery}
            setGallery={setGallery}
            caseStudies={caseStudies}
            setCaseStudies={setCaseStudies}
            projects={projects}
            setProjects={setProjects}
            invoices={invoices}
            setInvoices={setInvoices}
            settings={settings}
            setSettings={setSettings}
            setActiveTab={setActiveTab}
          />
        )}

        {/* Client Portal with Dedicated Left Sidebar */}
        {activeTab === 'client-portal' && (
          <ClientPortal
            projects={projects}
            setProjects={setProjects}
            invoices={invoices}
            onPayInvoice={handlePayInvoice}
            setActiveTab={setActiveTab}
          />
        )}
      </main>

      {/* Global Floating AI Chatbot (for public pages) */}
      {!isPortalView && (
        <AiChatWidget
          settings={settings}
          setActiveTab={setActiveTab}
          onOpenEstimator={() => setEstimatorOpen(true)}
        />
      )}

      {/* AI Cost Estimator Modal */}
      <AiCostEstimator
        isOpen={estimatorOpen}
        onClose={() => setEstimatorOpen(false)}
        setActiveTab={setActiveTab}
      />

      {/* Secure Payment Gateway Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        title={paymentDetails.title}
        amount={paymentDetails.amount}
        description={paymentDetails.description}
        invoiceId={paymentDetails.invoiceId}
        onSuccess={handlePaymentSuccess}
      />

      {/* Dynamic Managed Footer (Only for Public Views) */}
      {!isPortalView && (
        <Footer
          settings={settings}
          services={services}
          setActiveTab={setActiveTab}
          onOpenEstimator={() => setEstimatorOpen(true)}
        />
      )}
    </div>
  );
}

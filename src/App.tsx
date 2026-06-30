import React, { useState, useEffect } from "react";
import {
  ReceiptText,
  Boxes,
  ShoppingCart,
  Users,
  Building2,
  MessageCircle,
  TrendingUp,
  BellRing,
  CloudLightning,
  Printer,
  BarChart3,
  Award,
  Store,
  Stethoscope,
  ShoppingBag,
  Laptop,
  Shirt,
  Wrench,
  Utensils,
  Truck,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  Star,
  Play,
  ArrowRight,
  Shield,
  Zap,
  Sparkles,
  Download,
  Check,
  X,
  Menu,
  FileText,
  Clock,
  ArrowUpRight,
  CheckCircle,
  Heart
} from "lucide-react";
import { 
  TRUSTED_BUSINESSES, 
  TRUST_STATS, 
  FEATURES_DATA, 
  INDUSTRIES_DATA, 
  FAQS_DATA, 
  TESTIMONIALS_DATA 
} from "./data";
import { LeadDetails } from "./types";
import LeadModal, { INDIAN_STATES, BUSINESS_TYPES } from "./components/LeadModal";

import ThankYouView from "./components/ThankYouView";
import ScrollReveal from "./components/ScrollReveal";
import PricingSection from "./components/PricingSection";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "./imageConfig";

export default function App() {
  const [currentView, setCurrentView] = useState<"landing" | "thankyou">("landing");
  const [submittedLead, setSubmittedLead] = useState<LeadDetails | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Interactive Showcase Feature State
  const [selectedFeatureIdx, setSelectedFeatureIdx] = useState(0);
  
  // Interactive FAQ State
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  
  // Testimonials Carousel State
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Demo Modal State
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  // Stats Counters state
  const [statsCounters, setStatsCounters] = useState({
    invoices: "1,000+",
    accuracy: "95%"
  });

  // Animated counters on mount
  // Footer Form State
  const [footerName, setFooterName] = useState("");
  const [footerShop, setFooterShop] = useState("");
  const [footerMobile, setFooterMobile] = useState("");
  const [footerEmail, setFooterEmail] = useState("");
  const [footerBusinessType, setFooterBusinessType] = useState("Retail Store");
  const [footerCity, setFooterCity] = useState("");
  const [footerState, setFooterState] = useState("Gujarat");
  const [footerRequirements, setFooterRequirements] = useState("");

  const [footerErrors, setFooterErrors] = useState<Record<string, string>>({});
  const [isFooterSubmitting, setIsFooterSubmitting] = useState(false);

  const validateFooterForm = () => {
    const newErrors: Record<string, string> = {};
    if (!footerName.trim()) newErrors.fullName = "Full name is required";
    if (!footerShop.trim()) newErrors.businessName = "Business/Shop name is required";
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!footerMobile.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!phoneRegex.test(footerMobile)) {
      newErrors.mobileNumber = "Enter a valid 10-digit Indian mobile number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!footerEmail.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(footerEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!footerCity.trim()) newErrors.city = "City is required";

    setFooterErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFooterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFooterForm()) return;

    setIsFooterSubmitting(true);

    const submissionLead: LeadDetails = {
      fullName: footerName,
      businessName: footerRequirements ? `${footerShop} (${footerRequirements})` : footerShop,
      mobileNumber: footerMobile,
      email: footerEmail,
      businessType: footerBusinessType,
      city: footerCity,
      state: footerState,
      submittedAt: new Date().toISOString()
    };

    // 1. Save to local storage
    try {
      const existingLeadsStr = localStorage.getItem("vyaparix_leads") || "[]";
      const existingLeads = JSON.parse(existingLeadsStr);
      existingLeads.push(submissionLead);
      localStorage.setItem("vyaparix_leads", JSON.stringify(existingLeads));
    } catch (lsErr) {
      console.error("Could not sync footer lead to local storage:", lsErr);
    }

    // 2. Post to Google Apps Script webhook
    const webhookUrl = (import.meta as any).env.VITE_GOOGLE_SHEET_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxWIdDbr7VR-A0lHmabQcTCUzrkyJbbv8F0538iEOAwZO7qQwAfqBdomk8Xj51pQQAv/exec";
    if (webhookUrl && webhookUrl.trim() !== "") {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionLead),
        });
        console.log("Footer inquiry sent to Google Sheet Web App!");
      } catch (webhookErr) {
        console.warn("Failed sending footer inquiry to Sheets webhook:", webhookErr);
      }
    }

    // Redirect to ThankYou page immediately to save click time!
    setTimeout(() => {
      setIsFooterSubmitting(false);
      setSubmittedLead(submissionLead);
      setCurrentView("thankyou");
    }, 800);
  };

  useEffect(() => {
    let timer1 = setTimeout(() => setStatsCounters(prev => ({ ...prev, invoices: "10,000+" })), 800);
    let timer2 = setTimeout(() => setStatsCounters(prev => ({ ...prev, accuracy: "99.9%" })), 1400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleLeadSuccess = (lead: LeadDetails) => {
    setSubmittedLead(lead);
    setIsLeadModalOpen(false);
    setCurrentView("thankyou");
  };

  const getIndustryIcon = (name: string, className = "w-6 h-6") => {
    switch (name) {
      case "Store": return <Store className={className} />;
      case "Stethoscope": return <Stethoscope className={className} />;
      case "ShoppingBag": return <ShoppingBag className={className} />;
      case "Laptop": return <Laptop className={className} />;
      case "Shirt": return <Shirt className={className} />;
      case "Wrench": return <Wrench className={className} />;
      case "Utensils": return <Utensils className={className} />;
      case "Truck": return <Truck className={className} />;
      default: return <Store className={className} />;
    }
  };

  const getFeatureIcon = (name: string, className = "w-5 h-5") => {
    switch (name) {
      case "ReceiptText": return <ReceiptText className={className} />;
      case "Boxes": return <Boxes className={className} />;
      case "ShoppingCart": return <ShoppingCart className={className} />;
      case "Users": return <Users className={className} />;
      case "Building2": return <Building2 className={className} />;
      case "MessageCircle": return <MessageCircle className={className} />;
      case "TrendingUp": return <TrendingUp className={className} />;
      case "BellRing": return <BellRing className={className} />;
      case "CloudLightning": return <CloudLightning className={className} />;
      case "Printer": return <Printer className={className} />;
      case "BarChart3": return <BarChart3 className={className} />;
      case "Award": return <Award className={className} />;
      default: return <ReceiptText className={className} />;
    }
  };

  const featureDeviceMap = (idx: number): "laptop" | "desktop" | "tablet" | "mobile" => {
    const title = FEATURES_DATA[idx]?.title;
    switch (title) {
      case "GST Billing":
      case "Invoice Printing":
      case "Purchase Management":
      case "Custom Branding":
        return "desktop";
      case "Inventory Management":
      case "Stock Alerts":
      case "Cloud Backup":
      case "Business Analytics":
      case "Sales Reports":
        return "laptop";
      case "Customer Ledger":
      case "Supplier Ledger":
        return "tablet";
      case "WhatsApp Automation":
        return "mobile";
      default:
        return "laptop";
    }
  };

  if (currentView === "thankyou") {
    return (
      <ThankYouView 
        lead={submittedLead} 
        onGoBack={() => {
          setCurrentView("landing");
          setSubmittedLead(null);
        }} 
      />
    );
  }

  return (
    <div className="relative bg-[#f8fafc] text-slate-900 overflow-x-hidden selection:bg-indigo-500 selection:text-white font-sans antialiased min-h-screen">
      {/* Decorative Professional Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-85" />
      
      {/* Aurora glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-300/10 to-violet-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[20%] right-10 w-[600px] h-[600px] bg-gradient-to-bl from-blue-300/10 to-emerald-400/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-[45%] left-[-100px] w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/5 to-pink-500/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-[70%] right-[-100px] w-[600px] h-[600px] bg-gradient-to-bl from-emerald-400/5 to-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />
      
      {/* HEADER / NAVIGATION */}
      <header className="sticky top-0 z-40 w-full transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-slate-200/60 shadow-sm/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            
            {/* Logo Left */}
            <a href="#" className="flex items-center gap-3 group">
              <img 
                src={IMAGES.logo} 
                alt="Vyaparix Logo" 
                className="w-10 h-10 object-contain rounded-lg shadow-sm border border-slate-100 group-hover:scale-105 transition-transform" 
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-xl font-black font-display tracking-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                  Vyaparix
                </span>
                <span className="text-[10px] font-bold font-mono tracking-widest text-slate-400 uppercase">
                  SHOP MANAGER
                </span>
              </div>
            </a>

            {/* Menu Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
              <a href="#industries" className="hover:text-indigo-600 transition-colors">Industries</a>
              <a href="#showcase" className="hover:text-indigo-600 transition-colors">Dashboard</a>
              <a href="#pricing" className="hover:text-indigo-600 transition-colors">Pricing</a>
              <a href="#testimonials" className="hover:text-indigo-600 transition-colors">Testimonials</a>
              <a href="#faq" className="hover:text-indigo-600 transition-colors">FAQ</a>
              <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
            </nav>

            {/* Buttons Right */}
            <div className="hidden md:flex items-center gap-4">
              <a 
                href="https://wa.me/918347402205?text=Hi%20Vyaparix,%20I%20am%20interested%20in%20your%20software.%20Can%20we%20connect?"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-slate-700 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-4 h-4 text-emerald-500" />
                Contact Us
              </a>
              <button 
                onClick={() => setIsLeadModalOpen(true)}
                className="glow-btn relative cursor-pointer font-bold font-display text-sm py-2.5 px-5 rounded-xl text-white bg-indigo-600 transition-all duration-300"
              >
                Start Free Trial
              </button>
            </div>

            {/* Mobile menu button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -mr-2 md:hidden text-slate-600 hover:text-slate-900 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Panel */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden border-t border-slate-100 bg-white overflow-hidden"
            >
              <div className="px-4 pt-3 pb-6 space-y-3 font-medium text-slate-600">
                <a 
                  href="#features" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-indigo-600 transition-colors"
                >
                  Features
                </a>
                <a 
                  href="#industries" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-indigo-600 transition-colors"
                >
                  Industries
                </a>
                <a 
                  href="#showcase" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-indigo-600 transition-colors"
                >
                  Dashboard
                </a>
                <a 
                  href="#pricing" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-indigo-600 transition-colors"
                >
                  Pricing
                </a>
                <a 
                  href="#testimonials" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-indigo-600 transition-colors"
                >
                  Testimonials
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-indigo-600 transition-colors"
                >
                  FAQ
                </a>
                <a 
                  href="#contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 hover:text-indigo-600 transition-colors"
                >
                  Contact
                </a>
                <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                  <a 
                    href="tel:8347402205"
                    className="flex items-center justify-center gap-2 py-2.5 text-slate-700 bg-slate-50 border border-slate-100 rounded-xl"
                  >
                    <Phone className="w-4 h-4 text-emerald-500" /> Let's Talk
                  </a>
                  <button 
                    onClick={() => {
                      setMobileMenuOpen(false);
                      setIsLeadModalOpen(true);
                    }}
                    className="py-3 bg-indigo-600 text-white rounded-xl font-bold font-display shadow-md shadow-indigo-100"
                  >
                    Start Free Trial
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>


      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 md:py-28 bg-gradient-to-tr from-indigo-50/50 via-slate-50/30 to-blue-50/50 dot-grid">
        <div className="absolute top-20 right-0 w-[40%] h-[400px] bg-gradient-to-bl from-blue-400/15 via-indigo-400/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-[30%] h-[300px] bg-gradient-to-tr from-purple-400/10 via-pink-400/5 to-transparent blur-3xl pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Hero Left Side */}
            <div className="lg:col-span-6 text-center lg:text-left relative z-10">
              <ScrollReveal direction="right" delay={0.1} duration={0.8} className="space-y-6">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 select-none">
                  <Sparkles className="w-3.5 h-3.5" /> High-Performance Windows Desktop Billing Client
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black font-display tracking-tight leading-none text-slate-900">
                  India's Smartest <br/>
                  <span className="gradient-text">Billing & Inventory</span> <br/>
                  Software
                </h1>

                <p className="max-w-xl mx-auto lg:mx-0 text-slate-600 text-base sm:text-lg leading-relaxed font-sans">
                  Manage Billing, Inventory, GST Reports, WhatsApp Invoices, and Business Reports from a single, blisteringly fast desktop platform. Built with love for Indian MSMEs.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button 
                    onClick={() => setIsLeadModalOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 cursor-pointer text-white font-bold font-display rounded-xl gradient-brand hover:gradient-brand-hover shadow-lg shadow-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
                  >
                    Start Free Trial <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setDemoModalOpen(true)}
                    className="w-full sm:w-auto px-8 py-4 cursor-pointer bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-400 font-semibold font-display rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-base"
                  >
                    <Play className="w-4 h-4 fill-current stroke-0 text-indigo-600" /> Watch Demo
                  </button>
                </div>

                {/* Badges/Highlights */}
                <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-100 max-w-md mx-auto lg:mx-0 text-left font-sans">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Offline First</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Operates 100% offline with optional cloud backup.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Smart GST Invoicing</h4>
                    <p className="text-xs text-slate-500 mt-0.5">HSN, CGST & SGST auto-calculated on every bill.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm">Quick Setup</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Get started in minutes, no technical skills needed.</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Hero Right Side - Large Floating laptop mockup + business metrics */}
            <div className="lg:col-span-6 relative flex justify-center py-8">
              <ScrollReveal direction="left" delay={0.25} duration={0.8} className="w-full relative flex justify-center">
              
              {/* Laptop mock holding Shop Overview screenshot */}
              <div className="relative w-full max-w-[540px] z-10 animate-float">
                <div className="aspect-[16/10] bg-slate-900 rounded-2xl p-1.5 shadow-2xl border-2 border-slate-700/80">
                  <div className="w-full h-full bg-slate-850 rounded-xl overflow-hidden relative">
                    <img 
                      src={IMAGES.dashboard} 
                      alt="Vyaparix Shop Overview" 
                      className="w-full h-full object-fill"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                {/* Hinge/Base representation */}
                <div className="h-3 w-[110%] -ml-[5%] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-b border-slate-950 rounded-b-lg shadow-lg relative z-20" />
                <div className="h-1.5 w-[30%] mx-auto bg-slate-600 rounded-b-md shadow-inner" />
              </div>

              {/* Floating Metric Card 1: Sales Today */}
              <div className="absolute top-[15%] -left-[5%] md:-left-[10%] z-20 bg-white/94 backdrop-blur-md border border-blue-100 rounded-xl p-3.5 shadow-lg max-w-[170px] hidden sm:block animate-float-delayed">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 font-mono uppercase tracking-wider">SALES TODAY</span>
                    <span className="text-base font-black font-display text-slate-900">₹13,300</span>
                    <span className="block text-[10px] font-semibold text-emerald-600 mt-0.5">✓ 2 Invoices Paid</span>
                  </div>
                </div>
              </div>

              {/* Floating Metric Card 2: Stock Alerts */}
              <div className="absolute bottom-[10%] -left-[3%] z-20 bg-white/94 backdrop-blur-md border border-rose-100 rounded-xl p-3 shadow-md max-w-[160px] hidden sm:block">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                    <BellRing className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 font-mono uppercase block">STOCK HEALTH</span>
                    <span className="text-sm font-extrabold text-slate-800 font-display block">7 Low Items</span>
                    <span className="text-[10px] text-rose-600 font-semibold block">⚠️ Reorder Soon</span>
                  </div>
                </div>
              </div>

              {/* Floating Metric Card 3: Unpaid Invoice Due */}
              <div className="absolute bottom-[25%] -right-[5%] md:-right-[8%] z-20 bg-white/94 backdrop-blur-md border border-amber-100 rounded-xl p-3.5 shadow-lg max-w-[180px] hidden sm:block animate-float">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-slate-400 font-mono tracking-wide uppercase">OUTSTANDING</span>
                    <span className="text-[9px] bg-amber-50 text-amber-700 font-bold px-1.5 py-0.5 rounded-full">2 Total</span>
                  </div>
                  <span className="text-base font-black font-display text-slate-950">₹9,500</span>
                  <div className="mt-2 text-[10px] space-y-1 font-mono text-slate-500 border-t border-slate-100 pt-1.5">
                    <div className="flex justify-between">
                      <span>gts:</span>
                      <span className="font-bold text-slate-700">₹7,500</span>
                    </div>
                    <div className="flex justify-between">
                      <span>karan k:</span>
                      <span className="font-bold text-slate-700">₹2,000</span>
                    </div>
                  </div>
                </div>
              </div>
              </ScrollReveal>

            </div>

          </div>
        </div>
      </section>


      {/* TRUST SECTION */}
      <section className="bg-slate-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-dark pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-8 pointer-events-none">
            <h3 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest leading-6">TRUSTED BY 10,000+ DIVERSE ENTERPRISES ACROSS INDIA</h3>
          </div>

          {/* Scrolling client items */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-semibold font-display tracking-wider text-slate-400 border-b border-slate-800 pb-8 select-none">
            {TRUSTED_BUSINESSES.map((biz) => (
              <span key={biz} className="bg-slate-800/80 px-4 py-2 rounded-lg hover:text-white transition-colors">
                • {biz}
              </span>
            ))}
          </div>

          {/* Quick Stats Grid */}
          <ScrollReveal direction="up" delay={0.15} duration={0.7}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              <div className="text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold font-mono text-indigo-400 tracking-tight">{statsCounters.invoices}</h4>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">Invoices Generated Daily</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold font-mono text-indigo-400 tracking-tight">{statsCounters.accuracy}</h4>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">Calculation Accuracy Guarantee</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold font-mono text-indigo-400 tracking-tight">24/7</h4>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">Real-Time Business Access</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold font-mono text-indigo-400 tracking-tight">100%</h4>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">GDPR & GST compliant</p>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>


      {/* FEATURES SECTION */}
      <section id="features" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal direction="up" delay={0.05} duration={0.65}>
            <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
              <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">
                EVERYTHING YOU NEED
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">
                Powerful Invoicing & Stock Administration Packed In One Suite
              </h2>
              <p className="text-slate-500 font-sans mt-3 text-sm sm:text-base">
                Vyaparix integrates multiple modules, allowing you to skip using multiple disconnected Excel sheets or expensive subscription plans.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {FEATURES_DATA.map((feat, idx) => (
              <ScrollReveal 
                key={feat.title} 
                direction="up" 
                delay={idx * 0.08} 
                duration={0.65} 
                className="flex"
              >
                <div 
                  className="group p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/60 hover:border-indigo-300 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between w-full"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        {getFeatureIcon(feat.iconName, "w-6 h-6")}
                      </div>
                      {feat.badge && (
                        <span className="text-[10px] font-bold font-mono tracking-wide px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100 uppercase uppercase">
                          {feat.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-slate-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  <div className="pt-4 mt-4 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-xs text-indigo-600 font-semibold group-hover:translate-x-1.5 transition-transform flex items-center gap-1 cursor-pointer">
                      Learn more <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>


      {/* INDUSTRIES SECTION */}
      <section id="industries" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal direction="up" delay={0.05} duration={0.65}>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">
                TAILORED VERTICALS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">
                Pre-configured Workflows For Your Exact Trade
              </h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Say goodbye to generic spreadsheets. Vyaparix implements specific settings uniquely tuned for wholesalers, pharmacies, hardware shops, and boutiques.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {INDUSTRIES_DATA.map((ind, idx) => (
              <ScrollReveal 
                key={ind.name} 
                direction="up" 
                delay={idx * 0.06} 
                duration={0.65} 
                className="flex"
              >
                <div 
                  className="bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/60 hover:border-indigo-300 shadow-sm hover:shadow-lg hover:bg-white transition-all p-6 flex flex-col justify-between w-full"
                >
                  <div>
                    <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                      {getIndustryIcon(ind.iconName, "w-5 h-5")}
                    </div>
                    <h3 className="text-lg font-bold font-display text-slate-900">{ind.name}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                      {ind.description}
                    </p>

                    <div className="mt-4 space-y-2 pt-4 border-t border-slate-200/50">
                      <p className="text-[11px] font-bold text-slate-400 font-mono tracking-wider uppercase">KEY BENEFITS</p>
                      <ul className="text-xs space-y-1.5 text-slate-600 font-sans">
                        {ind.benefits.map((ben, i) => (
                          <li key={i} className="flex gap-2">
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{ben}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </section>


      {/* INTERACTIVE PRODUCT SHOWCASE — Feature Tabs + Device Mockup */}
      <section id="showcase" className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-dark pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <ScrollReveal direction="up" delay={0.05} duration={0.65}>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-indigo-400 font-mono uppercase bg-indigo-950 px-3 py-1 rounded-full border border-indigo-900">
                DESKTOP APP TOUR
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white mt-3 tracking-tight">
                Interactive Product Showcase
              </h2>
              <p className="text-slate-400 mt-2 text-sm sm:text-base">
                Click any feature below to see the relevant interface in action.
              </p>
            </div>
          </ScrollReveal>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-start">
            
            {/* LEFT COLUMN — Feature List */}
            <ScrollReveal direction="left" delay={0.1} duration={0.6} className="w-full lg:w-[280px] xl:w-[320px] shrink-0">
              <div className="bg-slate-800/60 border border-slate-700/50 rounded-2xl p-2 max-h-[520px] overflow-y-auto custom-scrollbar">
                <div className="space-y-1">
                  {FEATURES_DATA.map((feat, idx) => (
                    <button
                      key={feat.title}
                      onClick={() => setSelectedFeatureIdx(idx)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-200 ${
                        selectedFeatureIdx === idx
                          ? "bg-indigo-600/20 border border-indigo-500/40 shadow-md"
                          : "bg-transparent border border-transparent hover:bg-slate-700/50"
                      }`}
                    >
                      <span className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                        selectedFeatureIdx === idx
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-700 text-slate-400"
                      }`}>
                        {getFeatureIcon(feat.iconName, "w-4 h-4")}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className={`text-sm font-semibold font-display block truncate transition-colors ${
                          selectedFeatureIdx === idx ? "text-white" : "text-slate-300"
                        }`}>
                          {feat.title}
                        </span>
                      </div>
                      {feat.badge && (
                        <span className="text-[9px] font-bold font-mono tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase shrink-0">
                          {feat.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* RIGHT COLUMN — Mockup Display + Caption */}
            <div className="flex-1 min-w-0 w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeatureIdx}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {/* LAPTOP MOCKUP */}
                  {featureDeviceMap(selectedFeatureIdx) === "laptop" && (
                    <div className="w-full max-w-3xl mx-auto">
                      <div className="bg-slate-950 p-2 sm:p-3 rounded-2xl shadow-2xl border border-slate-700">
                        <div className="aspect-[16/10] bg-slate-800 rounded-lg overflow-hidden relative">
                          <img 
                            src={IMAGES.dashboard} 
                            alt="Shop Overview" 
                            className="w-full h-full object-fill" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div className="h-4 w-[104%] -ml-[2%] bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 rounded-b-xl border-b-2 border-slate-950 relative z-10" />
                      <div className="h-2 w-[20%] mx-auto bg-slate-700 rounded-b-md shadow-inner" />
                    </div>
                  )}

                  {/* DESKTOP / MONITOR MOCKUP */}
                  {featureDeviceMap(selectedFeatureIdx) === "desktop" && (
                    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
                      <div className="bg-slate-950 p-2 rounded-xl shadow-2xl border border-slate-700 w-full">
                        <div className="aspect-[16/9] bg-slate-800 rounded-lg overflow-hidden relative">
                          <img 
                            src={IMAGES.billing} 
                            alt="Billing Studio Workbench" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                      <div className="w-14 h-10 bg-slate-700 border-x border-slate-600 -mt-0.5" />
                      <div className="w-44 h-2 bg-slate-800 rounded-t-lg shadow" />
                    </div>
                  )}

                  {/* TABLET MOCKUP */}
                  {featureDeviceMap(selectedFeatureIdx) === "tablet" && (
                    <div className="w-full max-w-xl mx-auto flex justify-center">
                      <div className="bg-slate-950 p-4 rounded-[32px] w-[80%] aspect-[4/3] border-4 border-slate-800 shadow-2xl relative">
                        <div className="absolute top-1/2 -left-1 w-1 h-10 bg-slate-700 rounded-r-md" />
                        <div className="w-full h-full bg-slate-850 rounded-2xl overflow-hidden">
                          <img 
                            src={IMAGES.billing} 
                            alt="Tablet billing" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* MOBILE / INVOICE MOCKUP */}
                  {featureDeviceMap(selectedFeatureIdx) === "mobile" && (
                    <div className="w-full max-w-sm mx-auto flex justify-center">
                      <div className="bg-white text-slate-900 border border-slate-100 rounded-3xl p-3 shadow-2xl w-full">
                        <div className="flex items-center justify-between px-3 py-2 border-b border-slate-100 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 bg-rose-500 rounded-full" />
                            <span className="w-2.5 h-2.5 bg-amber-400 rounded-full" />
                            <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />
                          </div>
                          <span className="text-[10px] font-bold font-mono tracking-wider text-slate-400 uppercase">INVOICE</span>
                          <a href={IMAGES.invoice} target="_blank" className="p-1 rounded-md text-slate-400 hover:text-indigo-600 transition-colors" rel="noreferrer">
                            <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </div>
                        <div className="rounded-xl overflow-hidden border border-slate-200 aspect-[3/4]">
                          <img 
                            src={IMAGES.invoice} 
                            alt="Invoice Format" 
                            className="w-full h-full object-cover" 
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Animated Caption */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedFeatureIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="text-center mt-8 max-w-2xl mx-auto"
                >
                  <h4 className="font-semibold text-slate-300 text-sm leading-relaxed">
                    <span className="text-indigo-400 font-bold">{FEATURES_DATA[selectedFeatureIdx]?.title}:</span>{" "}
                    {FEATURES_DATA[selectedFeatureIdx]?.description}
                  </h4>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </section>


      {/* VYAPARIX VS TRADITIONAL BILLING */}
      <section className="py-20 md:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <ScrollReveal direction="up" delay={0.05} duration={0.65}>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">
                COMPARATIVE ANALYSIS
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">
                Vyaparix vs Traditional Billing
              </h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">
                Why leading Indian small business owners are upgrading from slow, dated manual ledger entries, confusing spreadsheets, or costly cloud software subscriptions.
              </p>
            </div>
          </ScrollReveal>

          {/* Comparison Cards Side-by-Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Vyaparix benefits */}
            <ScrollReveal direction="right" delay={0.1} duration={0.7} className="flex">
              <div className="bg-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-950 flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <img 
                      src={IMAGES.logo} 
                      alt="Vyaparix icon" 
                      className="w-9 h-9 object-contain rounded-lg"
                      referrerPolicy="no-referrer"
                    />
                    <h3 className="text-2xl font-black font-display tracking-tight">Vyaparix Suite</h3>
                  </div>

                  <div className="space-y-4 font-sans text-xs sm:text-sm">
                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white">Instant Invoicing (Under 5 Secs)</h4>
                        <p className="text-indigo-200 text-xs mt-0.5">Automatic GST calculations, and immediate thermal/laser print triggers.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white">Real-Time Automated Inventory Management</h4>
                        <p className="text-indigo-200 text-xs mt-0.5">Stock automatically gets subtracted on invoices and added back on purchases, avoiding count misses.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white">Digital WhatsApp Invoicing</h4>
                        <p className="text-indigo-200 text-xs mt-0.5">Send custom tax bills & pending balance links straight onto customer mobile screens instantly.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white">Affordable 3-Year Plan</h4>
                        <p className="text-indigo-200 text-xs mt-0.5">One low price covers you for 3 full years with no recurring charges.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-white">Super easy to learn</h4>
                        <p className="text-indigo-200 text-xs mt-0.5">No accounting logic necessary. Works in simple, humble local languages, starts in 10 mins.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-indigo-950 flex justify-end">
                  <span className="text-emerald-400 font-bold text-xs select-none uppercase tracking-widest">🏆 MODERN CHOICE</span>
                </div>
              </div>
            </ScrollReveal>

            {/* Traditional Billing downsides */}
            <ScrollReveal direction="left" delay={0.18} duration={0.7} className="flex">
              <div className="bg-white/70 backdrop-blur-md text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-rose-500 text-2xl">⚠️</span>
                    <h3 className="text-xl font-bold font-display text-slate-800">Traditional Methods</h3>
                  </div>

                  <div className="space-y-4 font-sans text-xs sm:text-sm text-slate-600">
                    <div className="flex gap-3">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                      <div>
                        <h4 className="font-bold text-slate-700">Tedious manual billing entries</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Prone to spelling slip-ups, incorrect taxes, and lengthy queue waiting times for customers.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                      <div>
                        <h4 className="font-bold text-slate-700">Mismatched physical stock counts</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Leads to accidental stock-outs of high-demand items, resulting in lost retail customers.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                      <div>
                        <h4 className="font-bold text-slate-700">Manual calculation of GST drafts</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Tense billing reconciliations that take days of struggle right before quarterly tax submission dates.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                      <div>
                        <h4 className="font-bold text-slate-700">Expensive SMS subscription limits</h4>
                        <p className="text-slate-500 text-xs mt-0.5">SMS text services charge per SMS, leading to persistent unnecessary operational expenses.</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                      <div>
                        <h4 className="font-bold text-slate-700">Complex, expensive bookkeeping licenses</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Requires weeks of specialized tuition for cashiers, making staff turnover highly problematic.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 flex justify-end">
                  <span className="text-rose-500 font-bold text-xs select-none uppercase tracking-widest">⚠️ OUTDATED</span>
                </div>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>


      <PricingSection
            onStartFreeTrial={() => setIsLeadModalOpen(true)}
          />


      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">
              OWNER TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">
              Spoken By Leading Business Owners
            </h2>
          </div>

          {/* Testimonial slider layout */}
          <div className="relative bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 sm:p-12 shadow-sm">
            
            {/* Stars */}
            <div className="flex gap-1 mb-6 text-amber-400">
              {[...Array(TESTIMONIALS_DATA[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Blockquote quote */}
            <blockquote className="text-base sm:text-lg text-slate-700 italic font-sans leading-relaxed mb-8">
              "{TESTIMONIALS_DATA[activeTestimonial].text}"
            </blockquote>

            {/* Author details */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-slate-200/60">
              <div className="flex items-center gap-4">
                <img 
                  src={TESTIMONIALS_DATA[activeTestimonial].avatar} 
                  alt={TESTIMONIALS_DATA[activeTestimonial].name} 
                  className="w-12 h-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-slate-800 text-sm font-display">
                    {TESTIMONIALS_DATA[activeTestimonial].name}
                  </h4>
                  <p className="text-slate-400 text-xs">
                    {TESTIMONIALS_DATA[activeTestimonial].role} — <span className="font-semibold text-indigo-600">{TESTIMONIALS_DATA[activeTestimonial].businessName}</span>
                  </p>
                </div>
              </div>

              {/* Slider dots indicator */}
              <div className="flex gap-2 select-none">
                {TESTIMONIALS_DATA.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                      activeTestimonial === index ? "bg-indigo-600 w-6" : "bg-slate-200"
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* FAQ SECTION (Modern Accordion) */}
      <section id="faq" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">
              HAVE QUESTIONS?
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-500 mt-2 text-sm">
              Read up on our offline operations, GST compliance, WhatsApp billing rules, and support networks.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-4">
            {FAQS_DATA.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index}
                  className="bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden"
                >
                  <button 
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold font-display text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <span className="shrink-0 ml-4">
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-indigo-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-slate-400" />
                      )}
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-slate-600 font-sans text-xs sm:text-sm leading-relaxed border-t border-slate-50">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>


      {/* FREE TRIAL / PROMINENT CTA */}
      <section className="py-20 bg-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-dark opacity-10 pointer-events-none" />
        <div className="absolute top-1/2 -right-[15%] w-96 h-96 bg-gradient-to-l from-indigo-500/20 to-transparent blur-3xl rounded-full" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 select-none">
            ⚡ QUICK UNLOCK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-display leading-tight tracking-tight">
            Stop Ledger Calculations. <br/>
            Start Billing with Vyaparix today!
          </h2>
          <p className="text-indigo-200 max-w-xl mx-auto text-sm sm:text-base font-sans">
            Download the desktop invoice setup and get full premium access absolutely free of cost for 7 days. Zero setup charges. Zero upfront cards required.
          </p>

          <div className="pt-4">
            <button 
              onClick={() => setIsLeadModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 bg-amber-400 hover:bg-amber-500 text-slate-950 hover:scale-[1.02] font-extrabold font-display text-sm sm:text-base rounded-xl cursor-pointer shadow-lg shadow-amber-400/10 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              Start 7 Day Free Trial
              <Download className="w-5 h-5 leading-none" />
            </button>
          </div>

          <div className="pt-6 flex flex-wrap justify-center items-center gap-4 text-xs text-indigo-300 font-medium">
            <span>✓ Windows Client Installer</span>
            <span>•</span>
            <span>✓ Pre-configured MSME settings</span>
            <span>•</span>
            <span>✓ One Time Option Ready</span>
          </div>
        </div>
      </section>


      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 bg-transparent relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
            
            {/* Left Box: Info panel */}
            <div className="lg:col-span-12 xl:col-span-5 bg-white/70 backdrop-blur-md rounded-3xl p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-2.5 py-1 rounded-full">
                  TALK WITH US
                </span>
                <h3 className="text-2xl font-black font-display text-slate-900 mt-4">
                  Need Help Choosing or Customizing Vyaparix?
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                  Our professional support engineering desk is open for Indian business merchants. Get custom print setups or batch ledger transfers over secure screen shares.
                </p>

                <div className="mt-8 space-y-4">
                  
                  {/* Phone */}
                  <a 
                    href="tel:8347402205"
                    className="flex items-center gap-4 p-3.5 bg-white rounded-xl border border-slate-200/60 hover:border-indigo-300 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 font-mono uppercase">TELEPHONE CALL</span>
                      <span className="font-bold text-slate-800 text-sm sm:text-base font-mono group-hover:text-indigo-600 transition-colors">
                        +91 8347402205
                      </span>
                    </div>
                  </a>

                  {/* WhatsApp Info */}
                  <a 
                    href="https://wa.me/918347402205?text=Hi%20Vyaparix,%20I%20am%20interested%20in%20your%20software.%20Can%20we%20connect?"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-4 p-3.5 bg-white rounded-xl border border-slate-200/60 hover:border-emerald-300 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 fill-current stroke-0" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 font-mono uppercase">WHATSAPP CHAT CHANNELS</span>
                      <span className="font-bold text-slate-800 text-sm sm:text-base group-hover:text-emerald-600 transition-colors">
                        Chat instantly on WhatsApp
                      </span>
                    </div>
                  </a>

                  {/* Email */}
                  <a 
                    href="mailto:vyaparix.co@gmail.com"
                    className="flex items-center gap-4 p-3.5 bg-white rounded-xl border border-slate-200/60 hover:border-indigo-300 transition-colors cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-slate-400 font-mono uppercase">EMAIL CORRESPONDENCE</span>
                      <span className="font-bold text-slate-800 text-sm sm:text-base font-mono group-hover:text-indigo-600 transition-colors">
                        vyaparix.co@gmail.com
                      </span>
                    </div>
                  </a>

                </div>
              </div>

              <p className="text-[10px] text-slate-400 mt-8 font-medium">
                Registered Office: Vyaparix Billing Technologies LLP, Dp Road, Veraval Road, Keshod, Gujarat - 362220.
              </p>
            </div>

            {/* Right Box: Lead Inquiry Direct Form */}
            <div className="lg:col-span-12 xl:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-slate-200/60 shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold font-display text-slate-950 mb-2">
                  Have inquiries? Let our engineers contact you!
                </h3>
                <p className="text-slate-500 text-xs mb-6 font-sans">
                  Please specify your business requirements and contact coordinates below. We will call you within 2 business hours.
                </p>

                <form 
                  onSubmit={handleFooterSubmit}
                  className="space-y-4 font-sans"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Your Full Name <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        value={footerName}
                        onChange={(e) => setFooterName(e.target.value)}
                        placeholder="e.g. Rajesh Patel" 
                        className={`w-full px-4 py-2 bg-slate-50 border ${footerErrors.fullName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'} rounded-lg text-sm focus:outline-none focus:bg-white transition-all`} 
                      />
                      {footerErrors.fullName && (
                        <p className="text-rose-500 text-[11px] mt-1 font-medium">{footerErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Company/Shop Name <span className="text-rose-500">*</span></label>
                      <input 
                        type="text" 
                        value={footerShop}
                        onChange={(e) => setFooterShop(e.target.value)}
                        placeholder="e.g. Patel Brothers Store" 
                        className={`w-full px-4 py-2 bg-slate-50 border ${footerErrors.businessName ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'} rounded-lg text-sm focus:outline-none focus:bg-white transition-all`} 
                      />
                      {footerErrors.businessName && (
                        <p className="text-rose-500 text-[11px] mt-1 font-medium">{footerErrors.businessName}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Direct Callback Mobile <span className="text-rose-500">*</span></label>
                      <input 
                        type="tel" 
                        value={footerMobile}
                        onChange={(e) => setFooterMobile(e.target.value)}
                        placeholder="e.g. 9876543210" 
                        className={`w-full px-4 py-2 bg-slate-50 border ${footerErrors.mobileNumber ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'} rounded-lg text-sm focus:outline-none focus:bg-white transition-all`} 
                      />
                      {footerErrors.mobileNumber && (
                        <p className="text-rose-500 text-[11px] mt-1 font-medium">{footerErrors.mobileNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Email Address <span className="text-rose-500">*</span></label>
                      <input 
                        type="email" 
                        value={footerEmail}
                        onChange={(e) => setFooterEmail(e.target.value)}
                        placeholder="e.g. rajesh@example.com" 
                        className={`w-full px-4 py-2 bg-slate-50 border ${footerErrors.email ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'} rounded-lg text-sm focus:outline-none focus:bg-white transition-all`} 
                      />
                      {footerErrors.email && (
                        <p className="text-rose-500 text-[11px] mt-1 font-medium">{footerErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-600 block mb-1">Business Type</label>
                      <select
                        value={footerBusinessType}
                        onChange={(e) => setFooterBusinessType(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-sm focus:outline-none focus:bg-white transition-all cursor-pointer"
                      >
                        {BUSINESS_TYPES.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">City <span className="text-rose-500">*</span></label>
                        <input 
                          type="text" 
                          value={footerCity}
                          onChange={(e) => setFooterCity(e.target.value)}
                          placeholder="e.g. Keshod" 
                          className={`w-full px-3 py-2 bg-slate-50 border ${footerErrors.city ? 'border-rose-400 focus:border-rose-500' : 'border-slate-200 focus:border-indigo-500'} rounded-lg text-sm focus:outline-none focus:bg-white transition-all`} 
                        />
                        {footerErrors.city && (
                          <p className="text-rose-500 text-[10px] mt-0.5 font-medium">{footerErrors.city}</p>
                        )}
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-slate-600 block mb-1">State</label>
                        <select
                          value={footerState}
                          onChange={(e) => setFooterState(e.target.value)}
                          className="w-full px-2 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-lg text-sm focus:outline-none focus:bg-white transition-all cursor-pointer"
                        >
                          {INDIAN_STATES.map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Your exact requirement and queries (Optional)</label>
                    <textarea 
                      rows={2}
                      value={footerRequirements}
                      onChange={(e) => setFooterRequirements(e.target.value)}
                      placeholder="e.g. I have a pharmacy and require batch stock/expiry tracking. Does it support custom A5 prints?" 
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:bg-white transition-all font-sans" 
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isFooterSubmitting}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-850 disabled:bg-slate-500 text-white font-bold font-display text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isFooterSubmitting ? (
                      <span>Saving Securely & Launching Free Trial...</span>
                    ) : (
                      <>
                        Submit Inquiry & Start Free Trial
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5 text-xs text-slate-500">
                <Shield className="w-4.5 h-4.5 text-indigo-500" />
                <span>Your privacy is highly respected. No telemarketing spam calls guaranteed.</span>
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* FOOTER */}
      <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-slate-900">
            
            {/* Branding Column */}
            <div className="col-span-2 space-y-4">
              <a href="#" className="flex items-center gap-3">
                <img 
                  src={IMAGES.logo} 
                  alt="Vyaparix Logo" 
                  className="w-8 h-8 object-contain rounded-lg shadow-sm"
                  referrerPolicy="no-referrer"
                />
                <span className="text-lg font-black font-display tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  Vyaparix
                </span>
              </a>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Vyaparix is a state-of-the-art billing, khata billing, offline-first stock registry, and business statement client for Windows desktops, engineered to simplify GST tax processing.
              </p>
              <div className="flex gap-2.5">
                <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-bold font-mono tracking-wide text-indigo-400">LLP REGISTERED</span>
                <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-bold font-mono tracking-wide text-emerald-400">GST-READY</span>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4 font-mono">PRODUCT</h5>
              <ul className="space-y-2 text-xs font-sans text-slate-400">
                <li><a href="#features" className="hover:text-white transition-colors">Billing Suite</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Stock Control</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">WhatsApp sync</a></li>
                <li><a href="#features" className="hover:text-white transition-colors">Cloud Synchronizer</a></li>
                <li><a onClick={() => setIsLeadModalOpen(true)} className="hover:text-white transition-colors cursor-pointer">Start Free Trial</a></li>
              </ul>
            </div>

            {/* Industries Column */}
            <div>
              <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4 font-mono">INDUSTRIES</h5>
              <ul className="space-y-2 text-xs font-sans text-slate-400">
                <li><a href="#industries" className="hover:text-white transition-colors">Medical & Pharmacy</a></li>
                <li><a href="#industries" className="hover:text-white transition-colors">Grocery Shops</a></li>
                <li><a href="#industries" className="hover:text-white transition-colors">Retail POS marts</a></li>
                <li><a href="#industries" className="hover:text-white transition-colors">Wholesalers</a></li>
                <li><a href="#industries" className="hover:text-white transition-colors">Hardware Trade</a></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4 font-mono">LEGAL</h5>
              <ul className="space-y-2 text-xs font-sans text-slate-400">
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#refund" className="hover:text-white transition-colors">Refund Policy</a></li>
                <li><a href="#eula" className="hover:text-white transition-colors">EULA License</a></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4 font-mono">SUPPORT</h5>
              <ul className="space-y-2 text-xs font-sans text-slate-400">
                <li><a href="tel:8347402205" className="hover:text-white transition-colors font-mono">+91 8347402205</a></li>
                <li><a href="mailto:vyaparix.co@gmail.com" className="hover:text-white transition-colors font-mono">vyaparix.co@gmail.com</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Support Desk</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">Accordion FAQ</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 font-sans gap-4">
            <span>© 2026 Vyaparix billing software. Manufactured by Vyaparix Technologies LLP. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-4">
              <a href="#privacy" className="hover:text-slate-300">Privacy Policy</a>
              <span>•</span>
              <a href="#terms" className="hover:text-slate-300">Terms of Service</a>
              <span>•</span>
              <a href="#refund" className="hover:text-slate-300">Refund Policy</a>

            </div>
          </div>

        </div>
      </footer>


      {/* LEAD ACQUISITION MODAL POPUP */}
      <LeadModal 
        isOpen={isLeadModalOpen} 
        onClose={() => setIsLeadModalOpen(false)} 
        onSuccess={handleLeadSuccess} 
      />

      {/* WATCH DEMO POPUP */}
      <AnimatePresence>
        {demoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setDemoModalOpen(false)} />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl z-10"
            >
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950">
                <span className="font-bold font-display tracking-tight flex items-center gap-2">
                  <Play className="w-4.5 h-4.5 text-indigo-400 fill-current" /> Vyaparix Client Demo Testdrive
                </span>
                <button onClick={() => setDemoModalOpen(false)} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
                </button>
              </div>

              {/* Demo Showcase Body */}
              <div className="p-4 sm:p-6 bg-slate-950">
                <p className="text-slate-400 text-xs sm:text-sm mb-4 leading-relaxed font-sans">
                  The demo showcases the absolute workspace inside Vyaparix. Look at the structured columns and professional A4 printouts.
                </p>
                <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] relative">
                  <img 
                    src={IMAGES.billing} 
                    alt="Billing Studio Dashboard Preview" 
                    className="w-full h-full object-fill"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] bg-indigo-600 px-2 py-0.5 rounded text-white font-mono uppercase tracking-widest w-fit mb-2">BILLING WORKBENCH PREVIEW</span>
                    <h4 className="text-lg sm:text-xl font-bold font-display text-white">Fully Configured Invoicing Screens</h4>
                    <p className="text-xs text-slate-300 max-w-lg mt-1 font-sans">
                      Our live billing workbench allows cashiers to look up products rapidly by Barcode, Item Names, or category prefixes.
                    </p>
                  </div>
                </div>
              </div>

              {/* Demo Action Bottom */}
              <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <span className="text-xs text-slate-400">Windows executable client is fully lightweight (~24MB).</span>
                <button
                  onClick={() => {
                    setDemoModalOpen(false);
                    setIsLeadModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-display rounded-xl flex items-center justify-center gap-2 text-sm shadow cursor-pointer"
                >
                  Download Free Trial Installers
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

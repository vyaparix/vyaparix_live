import { useState, useEffect, type FormEvent } from "react";
import {
  ReceiptText, Boxes, ShoppingCart, Users, Building2, MessageCircle,
  TrendingUp, BellRing, CloudLightning, Printer, BarChart3, Award,
  Store, Stethoscope, ShoppingBag, Laptop, Shirt, Wrench, Utensils, Truck,
  Phone, Mail, ChevronDown, ChevronUp, Star, Play, ArrowRight, Shield,
  Zap, Sparkles, Download, Check, X, Menu, FileText, Clock,
  ArrowUpRight, CheckCircle, Heart, LayoutDashboard
} from "lucide-react";
import {
  TRUSTED_BUSINESSES, TRUST_STATS, FEATURES_DATA, INDUSTRIES_DATA,
  FAQS_DATA, TESTIMONIALS_DATA
} from "../data";
import { LeadDetails } from "../types";
import LeadModal, { INDIAN_STATES, BUSINESS_TYPES } from "../components/LeadModal";
import ScrollReveal from "../components/ScrollReveal";
import PricingSection from "../components/PricingSection";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES, FEATURE_IMAGES } from "../imageConfig";
import ThankYouView from "../components/ThankYouView";

interface HomeContentProps {
  setIsLeadModalOpen: (v: boolean) => void;
  setDemoModalOpen: (v: boolean) => void;
  handleLeadSuccess: (lead: LeadDetails) => void;
}

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
    case "LayoutDashboard": return <LayoutDashboard className={className} />;
    default: return <ReceiptText className={className} />;
  }
};

const featureDeviceMap = (idx: number): "laptop" | "desktop" | "tablet" | "mobile" => {
  const title = FEATURES_DATA[idx]?.title;
  switch (title) {
    case "GST Billing": case "Invoice Printing": case "Purchase Management": case "Custom Branding": return "desktop";
    case "Inventory Management": case "Stock Alerts": case "Cloud Backup": case "Business Analytics": case "Sales Reports": return "laptop";
    case "Customer Ledger": case "Supplier Ledger": return "tablet";
    case "WhatsApp Automation": return "mobile";
    default: return "laptop";
  }
};

export default function HomeContent({ setIsLeadModalOpen, setDemoModalOpen, handleLeadSuccess }: HomeContentProps) {
  const [currentView, setCurrentView] = useState<"landing" | "thankyou">("landing");
  const [submittedLead, setSubmittedLead] = useState<LeadDetails | null>(null);
  const [selectedFeatureIdx, setSelectedFeatureIdx] = useState(12);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [statsCounters, setStatsCounters] = useState({ invoices: "1,000+", accuracy: "95%" });

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
    if (!footerMobile.trim()) newErrors.mobileNumber = "Mobile number is required";
    else if (!phoneRegex.test(footerMobile)) newErrors.mobileNumber = "Enter a valid 10-digit Indian mobile number";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!footerEmail.trim()) newErrors.email = "Email address is required";
    else if (!emailRegex.test(footerEmail)) newErrors.email = "Please enter a valid email address";
    if (!footerCity.trim()) newErrors.city = "City is required";
    setFooterErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFooterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateFooterForm()) return;
    setIsFooterSubmitting(true);
    const submissionLead: LeadDetails = {
      fullName: footerName,
      businessName: footerRequirements ? `${footerShop} (${footerRequirements})` : footerShop,
      mobileNumber: footerMobile, email: footerEmail,
      businessType: footerBusinessType, city: footerCity, state: footerState,
      submittedAt: new Date().toISOString()
    };
    const webhookUrl = (import.meta as any).env.VITE_GOOGLE_SHEET_WEBHOOK_URL;
    if (webhookUrl && webhookUrl.trim() !== "") {
      try { await fetch(webhookUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body: JSON.stringify(submissionLead) }); }
      catch (webhookErr) { console.warn("Webhook POST failed:", webhookErr); }
    }
    setTimeout(() => { setIsFooterSubmitting(false); setSubmittedLead(submissionLead); setCurrentView("thankyou"); }, 800);
  };

  useEffect(() => {
    const timer1 = setTimeout(() => setStatsCounters(prev => ({ ...prev, invoices: "10,000+" })), 800);
    const timer2 = setTimeout(() => setStatsCounters(prev => ({ ...prev, accuracy: "99.9%" })), 1400);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  const handleLocalLeadSuccess = (lead: LeadDetails) => { setSubmittedLead(lead); setIsLeadModalOpen(false); setCurrentView("thankyou"); };

  if (currentView === "thankyou") {
    return (
      <ThankYouView
        lead={submittedLead}
        onGoBack={() => { setCurrentView("landing"); setSubmittedLead(null); }}
      />
    );
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-tr from-indigo-50/50 via-slate-50/30 to-blue-50/50 dot-grid overflow-hidden">
        <div className="absolute top-20 right-0 w-[40%] h-[400px] bg-gradient-to-bl from-blue-400/15 via-indigo-400/10 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-[30%] h-[300px] bg-gradient-to-tr from-purple-400/10 via-pink-400/5 to-transparent blur-3xl pointer-events-none rounded-full" />
        <div className="w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="flex items-center justify-center px-6 sm:px-12 lg:px-16 xl:px-24 py-16 lg:py-0">
              <div className="w-full max-w-xl">
                <ScrollReveal direction="right" delay={0.1} duration={0.8}>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100 select-none mb-6">
                    <Sparkles className="w-3.5 h-3.5" /> High-Performance Windows Desktop Billing Client
                  </span>
                  <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-black font-display tracking-tight leading-none text-slate-900 mt-4">
                    India's Smartest <br/><span className="gradient-text">Billing & Inventory</span> <br/> Software
                  </h1>
                  <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-sans mt-6">
                    India's best GST billing software and inventory management for retailers, wholesalers, and MSMEs. Generate GST invoices, manage stock, send WhatsApp invoices, and analyze business reports from one fast desktop app.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
                    <button onClick={() => setIsLeadModalOpen(true)}
                      className="w-full sm:w-auto px-8 py-4 cursor-pointer text-white font-bold font-display rounded-xl gradient-brand hover:gradient-brand-hover shadow-lg shadow-indigo-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base">
                      Start Free Trial <ArrowRight className="w-5 h-5" />
                    </button>
                    <button onClick={() => setDemoModalOpen(true)}
                      className="w-full sm:w-auto px-8 py-4 cursor-pointer bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-400 font-semibold font-display rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-base">
                      <Play className="w-4 h-4 fill-current stroke-0 text-indigo-600" /> Watch Demo
                    </button>
                  </div>
                  <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-100 max-w-md text-left font-sans mt-6">
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
            </div>
            <div className="relative flex items-center justify-center p-8 lg:p-12 bg-gradient-to-l from-indigo-100/30 to-transparent">
              <ScrollReveal direction="left" delay={0.25} duration={0.8} className="w-full relative flex justify-center">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-full max-w-[540px] z-10"
                >
                  <motion.div
                    animate={{ boxShadow: ["0 0 0 0 rgba(99,102,241,0)", "0 0 30px 8px rgba(99,102,241,0.15)", "0 0 0 0 rgba(99,102,241,0)"] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="aspect-[16/10] bg-slate-900 rounded-2xl p-1.5 shadow-2xl border-2 border-slate-700/80"
                  >
                    <div className="w-full h-full bg-slate-850 rounded-xl overflow-hidden relative">
                      <img src={IMAGES.dashboard} alt="Vyaparix billing and inventory software dashboard" className="w-full h-full object-fill" referrerPolicy="no-referrer" />
                      <motion.div initial={{ opacity: 0, x: -12, y: -8 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.6, duration: 0.5, ease: "easeOut" }}
                        className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-xl border border-indigo-200/80 min-w-[140px]">
                        <p className="text-[8px] font-bold font-mono tracking-widest text-indigo-600 uppercase flex items-center gap-1"><TrendingUp className="w-3 h-3" /> Sales Today</p>
                        <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.4 }}
                          className="text-lg font-black font-display text-slate-900 leading-tight mt-0.5">₹13,300</motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.4 }}
                          className="text-[9px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5"><Check className="w-2.5 h-2.5" /> 2 Invoices Paid</motion.p>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
                        className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-xl border border-amber-200/80 min-w-[150px]">
                        <p className="text-[8px] font-bold font-mono tracking-widest text-amber-600 uppercase flex items-center gap-1"><Users className="w-3 h-3" /> Outstanding</p>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <motion.span initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.4 }}
                            className="text-lg font-black font-display text-slate-900 leading-tight">₹9,500</motion.span>
                          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.4 }}
                            className="text-[9px] text-slate-400 font-medium">2 Total</motion.span>
                        </div>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.4 }}
                          className="text-[8px] text-slate-500 mt-1 space-y-0.5 leading-tight">
                          <div className="flex justify-between"><span>GTS</span><span className="font-semibold text-slate-700">₹7,500</span></div>
                          <div className="flex justify-between"><span>Karan K</span><span className="font-semibold text-slate-700">₹2,000</span></div>
                        </motion.div>
                      </motion.div>
                      <motion.div initial={{ opacity: 0, x: 12, y: 12 }} animate={{ opacity: 1, x: 0, y: 0 }} transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                        className="absolute bottom-12 right-3 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-xl border border-rose-200/80 min-w-[140px]">
                        <p className="text-[8px] font-bold font-mono tracking-widest text-rose-600 uppercase flex items-center gap-1"><BellRing className="w-3 h-3" /> Stock Health</p>
                        <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3, duration: 0.4 }}
                          className="text-lg font-black font-display text-slate-900 leading-tight mt-0.5">7 Low Items</motion.p>
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.4 }}
                          className="text-[9px] text-rose-600 font-semibold flex items-center gap-0.5 mt-0.5">⚠️ Reorder Soon</motion.p>
                      </motion.div>
                      <motion.div
                        animate={{ opacity: [0, 0.15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-400/10 to-transparent pointer-events-none"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-3 w-[110%] -ml-[5%] bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 border-b border-slate-950 rounded-b-lg shadow-lg relative z-20"
                  />
                  <motion.div
                    animate={{ width: ["30%", "35%", "30%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="h-1.5 mx-auto bg-slate-600 rounded-b-md shadow-inner"
                  />
                </motion.div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SECTION */}
      <section className="bg-slate-900 text-white py-12 relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-dark pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" delay={0.05} duration={0.6}>
            <div className="text-center mb-8 pointer-events-none">
              <h3 className="text-xs font-bold font-mono text-indigo-400 uppercase tracking-widest leading-6">TRUSTED BY 1000+ BUSINESSES ACROSS INDIA</h3>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.1} duration={0.6}>
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-xs font-semibold font-display tracking-wider text-slate-400 border-b border-slate-800 pb-8 select-none">
            {TRUSTED_BUSINESSES.map((biz) => (
              <span key={biz} className="bg-slate-800/80 px-4 py-2 rounded-lg hover:text-white transition-colors">• {biz}</span>
            ))}
          </div>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.15} duration={0.7}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              <div className="text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold font-mono text-indigo-400 tracking-tight">{statsCounters.invoices}</h4>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">Invoices Generated Daily</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold font-mono text-indigo-400 tracking-tight">{statsCounters.accuracy}</h4>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">Calculation Accuracy</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold font-mono text-indigo-400 tracking-tight">24/7</h4>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">Real-Time Business Access</p>
              </div>
              <div className="text-center">
                <h4 className="text-3xl md:text-4xl font-extrabold font-mono text-indigo-400 tracking-tight">100%</h4>
                <p className="text-slate-400 text-xs mt-1.5 font-medium">GDPR & GST Compliant</p>
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
              <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">EVERYTHING YOU NEED</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">Powerful Invoicing & Stock Administration Packed In One Suite</h2>
              <p className="text-slate-500 font-sans mt-3 text-sm sm:text-base">Vyaparix integrates GST billing, inventory management, purchase tracking, customer khata, and business analytics into one fast, offline desktop app.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
            {FEATURES_DATA.map((feat, idx) => (
              <ScrollReveal key={feat.title} direction="up" delay={idx * 0.08} duration={0.65} className="flex">
                <div className="group p-6 bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/60 hover:border-indigo-300 shadow-sm hover:shadow-xl hover:bg-white transition-all duration-300 flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                        {getFeatureIcon(feat.iconName, "w-6 h-6")}
                      </div>
                      {feat.badge && <span className="text-[10px] font-bold font-mono tracking-wide px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-100 uppercase">{feat.badge}</span>}
                    </div>
                    <h3 className="text-lg font-bold font-display text-slate-900 group-hover:text-indigo-600 transition-colors">{feat.title}</h3>
                    <p className="text-slate-500 font-sans text-xs sm:text-sm mt-2 leading-relaxed">{feat.description}</p>
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
              <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">TAILORED VERTICALS</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">Pre-configured Workflows For Your Exact Trade</h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">Vyaparix implements specific settings uniquely tuned for wholesalers, pharmacies, hardware shops, boutiques, and more.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {INDUSTRIES_DATA.map((ind, idx) => (
              <ScrollReveal key={ind.name} direction="up" delay={idx * 0.06} duration={0.65} className="flex">
                <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-slate-200/60 hover:border-indigo-300 shadow-sm hover:shadow-lg hover:bg-white transition-all p-6 flex flex-col justify-between w-full">
                  <div>
                    <div className="w-11 h-11 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">{getIndustryIcon(ind.iconName, "w-5 h-5")}</div>
                    <h3 className="text-lg font-bold font-display text-slate-900">{ind.name}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">{ind.description}</p>
                    <div className="mt-4 space-y-2 pt-4 border-t border-slate-200/50">
                      <p className="text-[11px] font-bold text-slate-400 font-mono tracking-wider uppercase">KEY BENEFITS</p>
                      <ul className="text-xs space-y-1.5 text-slate-600 font-sans">
                        {ind.benefits.map((ben, i) => (
                          <li key={i} className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" /><span>{ben}</span></li>
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

      {/* SHOWCASE SECTION */}
      <section id="showcase" className="py-20 md:py-28 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-dark pointer-events-none" />
        <div className="absolute top-40 -left-20 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 -right-20 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up" delay={0.05} duration={0.65}>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs font-bold tracking-widest text-indigo-400 font-mono uppercase bg-indigo-950 px-3 py-1 rounded-full border border-indigo-900">DESKTOP APP TOUR</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-white mt-3 tracking-tight">Interactive Product Showcase</h2>
              <p className="text-slate-400 mt-2 text-sm sm:text-base">Click any feature below to see the relevant interface in action.</p>
            </div>
          </ScrollReveal>
          <div className="flex flex-col gap-6">
            <div className="w-full max-w-full md:max-w-none overflow-x-auto overflow-y-hidden scrollbar-none md:overflow-visible bg-slate-800/40 backdrop-blur-sm border border-slate-700/40 rounded-xl p-1 shadow-xl shadow-black/20 md:mx-auto md:w-auto">
              <div className="flex gap-1 w-max md:w-auto md:flex-wrap md:justify-center">
                  {FEATURES_DATA.filter(f => ["Dashboard Overview","Billing Studio","Inventory Management","Purchase Management","Customer Ledger","WhatsApp Automation","Sales Reports","Stock Alerts","Invoice Printing"].includes(f.title)).map((feat, idx) => {
                    const originalIdx = FEATURES_DATA.findIndex(f => f.title === feat.title);
                    return (
                    <button key={feat.title} type="button" onClick={() => setSelectedFeatureIdx(originalIdx)}
                      className={`flex items-center gap-1.5 px-2 md:px-2.5 py-1.5 rounded-lg text-left transition-all duration-200 group whitespace-nowrap ${selectedFeatureIdx === originalIdx ? "bg-gradient-to-r from-indigo-600/20 to-indigo-600/5 border border-indigo-500/40 shadow-lg shadow-indigo-500/10" : "bg-transparent border border-transparent hover:bg-slate-700/30"}`}>
                      <span className={`shrink-0 p-1 rounded-lg transition-all duration-200 ${selectedFeatureIdx === originalIdx ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/30" : "bg-slate-700 text-slate-400 group-hover:bg-slate-600 group-hover:text-slate-200"}`}>{getFeatureIcon(feat.iconName, "w-4 h-4 md:w-3 md:h-3")}</span>
                      <div className="min-w-0 hidden md:block">
                        <span className={`text-[11px] font-semibold font-display block truncate transition-colors ${selectedFeatureIdx === originalIdx ? "text-white" : "text-slate-300 group-hover:text-white"}`}>{feat.title}</span>
                      </div>
                      {feat.badge && <span className="text-[7px] font-bold font-mono tracking-wider px-1 py-0.5 rounded bg-gradient-to-r from-amber-500/20 to-amber-500/10 text-amber-300 border border-amber-500/25 uppercase shrink-0 hidden md:inline">{feat.badge}</span>}
                    </button>
                    );
                  })}
                  </div>
              </div>
            <div className="flex-1 min-w-0 w-full">
              <div className="w-full max-w-3xl mx-auto">
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-indigo-500/10 via-indigo-400/5 to-transparent rounded-3xl blur-xl pointer-events-none" />
                  <div className="bg-slate-950 p-2 sm:p-3 rounded-2xl shadow-2xl border border-slate-700/60 relative">
                    <motion.div
                      animate={{ opacity: [0, 0.08, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-400/5 to-transparent pointer-events-none rounded-2xl z-10"
                    />
              <div className="aspect-[16/10] bg-slate-800 rounded-lg overflow-hidden relative">
                <motion.img
                  key={selectedFeatureIdx}
                  src={FEATURE_IMAGES[FEATURES_DATA[selectedFeatureIdx]?.title] || IMAGES.dashboard}
                  alt={FEATURES_DATA[selectedFeatureIdx]?.title}
                  className="absolute inset-0 w-full h-full object-fill"
                  referrerPolicy="no-referrer" loading="lazy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
                  </div>
                  <div className="h-4 w-[104%] -ml-[2%] bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 rounded-b-xl border-b-2 border-slate-950 relative z-10" />
                  <motion.div
                    animate={{ width: ["28%", "34%", "28%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="h-1.5 mx-auto bg-slate-700/80 rounded-b-md shadow-inner"
                  />
                </div>
              </div>
              <div className="text-center mt-10 max-w-2xl mx-auto">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono font-bold tracking-wider uppercase mb-3">
                  {getFeatureIcon(FEATURES_DATA[selectedFeatureIdx]?.iconName, "w-3 h-3")}
                  {FEATURES_DATA[selectedFeatureIdx]?.title}
                </div>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed min-h-[3em]">
                  {FEATURES_DATA[selectedFeatureIdx]?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARISON SECTION */}
      <section className="py-20 md:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0.05} duration={0.65}>
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">COMPARATIVE ANALYSIS</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">Vyaparix vs Traditional Billing</h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">Why leading Indian small business owners are upgrading from slow manual entries and confusing spreadsheets.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            <ScrollReveal direction="right" delay={0.1} duration={0.7} className="flex">
              <div className="bg-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-950 flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <img src={IMAGES.logo} alt="Vyaparix" className="w-9 h-9 object-contain rounded-lg" referrerPolicy="no-referrer" loading="lazy" />
                    <h3 className="text-2xl font-black font-display tracking-tight">Vyaparix Suite</h3>
                  </div>
                  <div className="space-y-4 font-sans text-xs sm:text-sm">
                    <div className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /><div><h4 className="font-bold text-white">Instant Invoicing (Under 5 Secs)</h4><p className="text-indigo-200 text-xs mt-0.5">Automatic GST calculations, thermal/laser print triggers.</p></div></div>
                    <div className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /><div><h4 className="font-bold text-white">Real-Time Inventory Management</h4><p className="text-indigo-200 text-xs mt-0.5">Stock auto-updates on sales and purchases.</p></div></div>
                    <div className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /><div><h4 className="font-bold text-white">Digital WhatsApp Invoicing</h4><p className="text-indigo-200 text-xs mt-0.5">Send bills & payment links to customers instantly.</p></div></div>
                    <div className="flex gap-3"><CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" /><div><h4 className="font-bold text-white">Affordable Lifetime Plan</h4><p className="text-indigo-200 text-xs mt-0.5">One-time purchase with no recurring charges.</p></div></div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.18} duration={0.7} className="flex">
              <div className="bg-white/70 backdrop-blur-md text-slate-800 rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm flex flex-col justify-between w-full">
                <div>
                  <div className="flex items-center gap-2 mb-6"><span className="text-rose-500 text-2xl">⚠️</span><h3 className="text-xl font-bold font-display text-slate-800">Traditional Methods</h3></div>
                  <div className="space-y-4 font-sans text-xs sm:text-sm text-slate-600">
                    <div className="flex gap-3"><span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span><div><h4 className="font-bold text-slate-700">Tedious manual billing</h4><p className="text-slate-500 text-xs mt-0.5">Prone to tax errors, long queues.</p></div></div>
                    <div className="flex gap-3"><span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span><div><h4 className="font-bold text-slate-700">Manual stock counts</h4><p className="text-slate-500 text-xs mt-0.5">Stock-outs of high-demand items.</p></div></div>
                    <div className="flex gap-3"><span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span><div><h4 className="font-bold text-slate-700">No WhatsApp billing</h4><p className="text-slate-500 text-xs mt-0.5">Expensive SMS or no digital delivery.</p></div></div>
                    <div className="flex gap-3"><span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span><div><h4 className="font-bold text-slate-700">Costly monthly subscriptions</h4><p className="text-slate-500 text-xs mt-0.5">Ongoing expenses for basic features.</p></div></div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <PricingSection onStartFreeTrial={() => setIsLeadModalOpen(true)} />

      {/* TESTIMONIALS */}
      <section id="testimonials" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0.05} duration={0.65}>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">REAL REVIEWS</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">Spoken By Leading Business Owners</h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">Hear what real Indian business owners say about Vyaparix billing software.</p>
            </div>
          </ScrollReveal>
          <div className="relative bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-3xl p-8 sm:p-12 shadow-sm">
            <div className="flex gap-1 mb-6 text-amber-400">
              {[...Array(TESTIMONIALS_DATA[activeTestimonial].rating)].map((_, i) => (<Star key={i} className="w-5 h-5 fill-current" />))}
            </div>
            <blockquote className="text-base sm:text-lg text-slate-700 italic font-sans leading-relaxed mb-8">"{TESTIMONIALS_DATA[activeTestimonial].text}"</blockquote>
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-slate-200/60">
              <div className="flex items-center gap-4">
                {TESTIMONIALS_DATA[activeTestimonial].avatar ? (
                  <img src={TESTIMONIALS_DATA[activeTestimonial].avatar} alt={TESTIMONIALS_DATA[activeTestimonial].name} className="w-12 h-12 rounded-full object-cover border border-slate-200" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center shrink-0">
                    <img src={IMAGES.logo} alt="Vyaparix logo" className="w-7 h-7 object-contain" loading="lazy" />
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-800 text-sm font-display">{TESTIMONIALS_DATA[activeTestimonial].name}</h4>
                  <p className="text-slate-400 text-xs">{TESTIMONIALS_DATA[activeTestimonial].role} — <span className="font-semibold text-indigo-600">{TESTIMONIALS_DATA[activeTestimonial].businessName}</span></p>
                </div>
              </div>
              <div className="flex gap-2 select-none">
                {TESTIMONIALS_DATA.map((_, index) => (
                  <button key={index} onClick={() => setActiveTestimonial(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${activeTestimonial === index ? "bg-indigo-600 w-6" : "bg-slate-200"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0.05} duration={0.65}>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">GOT QUESTIONS?</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">Frequently Asked Questions</h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">Quick answers to common questions about Vyaparix billing software.</p>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {FAQS_DATA.map((faq, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur-md border border-slate-200/60 rounded-2xl overflow-hidden shadow-sm">
                <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold font-display text-slate-800 hover:bg-white/90 transition-colors text-sm sm:text-base">
                  {faq.question}
                  {activeFaq === idx ? <ChevronUp className="w-4 h-4 text-indigo-600 shrink-0" /> : <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />}
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">
                      <div className="px-5 pb-5 text-sm text-slate-600 font-sans leading-relaxed">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FREE TRIAL CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-indigo-900 via-indigo-800 to-indigo-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-dark pointer-events-none" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal direction="up" delay={0.05} duration={0.65}>
            <span className="text-xs font-bold tracking-widest text-indigo-300 font-mono uppercase bg-indigo-950 px-3 py-1 rounded-full border border-indigo-700">START NOW</span>
            <h2 className="text-3xl sm:text-4xl font-black font-display text-white mt-4 tracking-tight">Start Your 7 Day Free Trial Today</h2>
            <p className="text-indigo-200 mt-3 max-w-2xl mx-auto font-sans">Experience the full power of Vyaparix. No credit card needed. Download and start billing in minutes.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <button onClick={() => setIsLeadModalOpen(true)}
                className="glow-btn relative px-10 py-4 cursor-pointer text-indigo-900 font-bold font-display rounded-xl bg-white hover:bg-indigo-50 shadow-2xl transition-all text-base">
                <Zap className="w-5 h-5 inline mr-2" />Get Free Trial Now
              </button>
              <button onClick={() => setDemoModalOpen(true)}
                className="px-8 py-4 cursor-pointer bg-white/10 backdrop-blur-sm text-white border border-white/20 font-semibold font-display rounded-xl hover:bg-white/20 transition-all text-sm flex items-center gap-2">
                <Play className="w-4 h-4" /> Watch Demo
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="py-20 md:py-28 bg-transparent relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up" delay={0.05} duration={0.65}>
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50 px-3 py-1 rounded-full">GET IN TOUCH</span>
              <h2 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mt-3 tracking-tight">Contact Our Sales Team</h2>
              <p className="text-slate-500 mt-2 text-sm sm:text-base">Fill the form and get your free trial link instantly on your email and WhatsApp.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
            <ScrollReveal direction="right" delay={0.1} duration={0.7} className="lg:col-span-2 space-y-6">
              <div className="bg-indigo-50/70 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100/60">
                <h4 className="font-bold font-display text-slate-900 text-base flex items-center gap-2"><Phone className="w-4 h-4 text-indigo-600" /> Talk To An Expert</h4>
                <p className="text-xs text-slate-500 mt-1">Get instant answers. Our team is available Monday–Saturday, 9 AM – 9 PM.</p>
                <a href="tel:8347402205" className="mt-4 inline-flex items-center gap-2 text-lg font-bold font-display text-indigo-700 hover:text-indigo-800 transition-colors">📞 +91 8347402205</a>
              </div>
              <div className="bg-emerald-50/70 backdrop-blur-sm rounded-2xl p-6 border border-emerald-100/60">
                <h4 className="font-bold font-display text-slate-900 text-base flex items-center gap-2"><MessageCircle className="w-4 h-4 text-emerald-600" /> WhatsApp Inquiry</h4>
                <p className="text-xs text-slate-500 mt-1">Chat with us directly on WhatsApp for quick responses.</p>
                <a href="https://wa.me/918347402205?text=Hi%20Vyaparix,%20I%20am%20interested%20in%20your%20software.%20Can%20we%20connect?" target="_blank" rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold font-display hover:bg-emerald-700 transition-all">
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </a>
              </div>
              <div className="bg-slate-50/70 backdrop-blur-sm rounded-2xl p-6 border border-slate-200/60">
                <h4 className="font-bold font-display text-slate-900 text-base flex items-center gap-2"><Mail className="w-4 h-4 text-slate-600" /> Email Support</h4>
                <p className="text-xs text-slate-500 mt-1">Prefer writing? Send us an email and we'll respond within 24 hours.</p>
                <a href="mailto:vyaparix.co@gmail.com" className="mt-3 inline-flex items-center gap-2 text-sm font-bold font-display text-indigo-600 hover:text-indigo-800 transition-colors">{'✉️'} vyaparix.co@gmail.com</a>
              </div>
              <div className="bg-purple-50/70 backdrop-blur-sm rounded-2xl p-6 border border-purple-100/60">
                <h4 className="font-bold font-display text-slate-900 text-base">India's #1 Offline Billing Software</h4>
                <p className="text-xs text-slate-500 mt-1">Vyaparix is trusted by  businesses across India. GST-ready, offline-first, and unlimited invoices.</p>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" delay={0.18} duration={0.7} className="lg:col-span-3">
              <form onSubmit={handleFooterSubmit} className="bg-white/70 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/60 shadow-sm space-y-5">
                <div className="text-center mb-2">
                  <h3 className="text-xl font-black font-display text-slate-900">Get Your Free Trial Now</h3>
                  <p className="text-xs text-slate-500 mt-1">Fill the details & download Vyaparix instantly.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><input type="text" placeholder="Full Name *" value={footerName} onChange={e => setFooterName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />{footerErrors.fullName && <p className="text-rose-500 text-[11px] mt-1">{footerErrors.fullName}</p>}</div>
                  <div><input type="text" placeholder="Business / Shop Name *" value={footerShop} onChange={e => setFooterShop(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />{footerErrors.businessName && <p className="text-rose-500 text-[11px] mt-1">{footerErrors.businessName}</p>}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div><input type="tel" placeholder="Mobile Number *" maxLength={10} value={footerMobile} onChange={e => setFooterMobile(e.target.value.replace(/\D/g, ''))} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />{footerErrors.mobileNumber && <p className="text-rose-500 text-[11px] mt-1">{footerErrors.mobileNumber}</p>}</div>
                  <div><input type="email" placeholder="Email Address *" value={footerEmail} onChange={e => setFooterEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />{footerErrors.email && <p className="text-rose-500 text-[11px] mt-1">{footerErrors.email}</p>}</div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <select value={footerBusinessType} onChange={e => setFooterBusinessType(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">
                      {BUSINESS_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div><input type="text" placeholder="City *" value={footerCity} onChange={e => setFooterCity(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all" />{footerErrors.city && <p className="text-rose-500 text-[11px] mt-1">{footerErrors.city}</p>}</div>
                    <div>
                      <select value={footerState} onChange={e => setFooterState(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all">
                        {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
                <div>
                  <textarea placeholder="Tell us about your business requirements (optional)" rows={3} value={footerRequirements} onChange={e => setFooterRequirements(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none" />
                </div>
                <button type="submit" disabled={isFooterSubmitting}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white font-bold font-display rounded-xl shadow-md shadow-indigo-100 hover:shadow-lg transition-all flex items-center justify-center gap-2 text-sm cursor-pointer">
                  {isFooterSubmitting ? <span>Saving...</span> : <><span>Submit Inquiry & Start Free Trial</span><ArrowRight className="w-4 h-4" /></>}
                </button>
                <div className="flex items-center gap-2.5 text-xs text-slate-500 justify-center">
                  <Shield className="w-4 h-4 text-indigo-500" />
                  <span>Your privacy is respected. No spam calls.</span>
                </div>
              </form>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}

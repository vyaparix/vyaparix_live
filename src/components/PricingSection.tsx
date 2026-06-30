import React, { useState } from "react";
import {
  Gift,
  Rocket,
  Star,
  Flame,
  Crown,
  Check,
  Shield,
  RefreshCw,
  Headphones,
  Store,
  X,
  MessageCircle,
  User,
  Phone,
  Building,
} from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { BUSINESS_TYPES } from "./LeadModal";

const FEATURES = [
  "GST Billing",
  "Inventory Management",
  "Purchase Management",
  "Sales Reports",
  "Supplier Management",
  "Data Backup",
  "Technical Support",
];

interface Plan {
  planId?: string;
  badge: string | null;
  badgeVariant: string;
  icon: typeof Gift;
  plan: string;
  subtitle: string;
  price: string;
  smallText: string;
  monthly: string | null;
  savings: string | null;
  cta: string;
  ctaClasses: string;
  cardStyle: "default" | "featured" | "dark";
  isLink?: boolean;
}

const PLANS: Plan[] = [
  {
    badge: null,
    badgeVariant: "",
    icon: Gift,
    plan: "Free Trial",
    subtitle: "7 Days Full Access",
    price: "Free",
    smallText: "₹0 for 7 days",
    monthly: null,
    savings: null,
    cta: "Start Free Trial",
    ctaClasses: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200",
    cardStyle: "default",
  },
  {
    planId: "starter",
    badge: null,
    badgeVariant: "",
    icon: Rocket,
    plan: "Starter",
    subtitle: "1 Year Access",
    price: "₹1,499",
    smallText: "per year",
    monthly: "₹125/month",
    savings: null,
    cta: "Get Started",
    ctaClasses: "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-200",
    cardStyle: "default",
  },
  {
    planId: "professional",
    badge: "MOST POPULAR",
    badgeVariant: "bg-purple-500 text-white",
    icon: Star,
    plan: "Professional ⭐",
    subtitle: "3 Years Access",
    price: "₹3,999",
    smallText: "₹1,333/year",
    monthly: "₹111/month",
    savings: "Save 11% vs Starter",
    cta: "Get Started",
    ctaClasses: "bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white shadow-lg shadow-purple-200",
    cardStyle: "featured",
  },
  {
    planId: "business",
    badge: "BEST VALUE",
    badgeVariant: "bg-orange-500 text-white",
    icon: Flame,
    plan: "Business 🔥",
    subtitle: "5 Years Access",
    price: "₹6,999",
    smallText: "₹1,400/year",
    monthly: "₹117/month",
    savings: "Save 7%",
    cta: "Get Started",
    ctaClasses: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-200",
    cardStyle: "default",
  },
  {
    badge: "ENTERPRISE",
    badgeVariant: "bg-indigo-500 text-white",
    icon: Crown,
    plan: "Lifetime",
    subtitle: "Enterprise License",
    price: "Custom",
    smallText: "One-time payment",
    monthly: null,
    savings: null,
    cta: "Contact Sales",
    ctaClasses: "bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg shadow-orange-200",
    cardStyle: "dark",
    isLink: true,
  },
];

const TRUST_ITEMS = [
  { icon: Shield, title: "Secure Payment", description: "Your payment is fully encrypted." },
  { icon: RefreshCw, title: "Free Updates", description: "Regular feature updates and improvements." },
  { icon: Headphones, title: "Reliable Support", description: "Dedicated customer support whenever you need it." },
  { icon: Store, title: "Trusted by Businesses", description: "Used by hundreds of businesses across India." },
];

interface Props {
  onStartFreeTrial: () => void;
}

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "918347402205";

function buildWhatsAppUrl(plan: Plan, name: string, mobile: string, businessType: string): string {
  const lines = [
    `Hi Vyaparix,`,
    ``,
    `I'm interested in the *${plan.plan}* plan.`,
    ``,
    `━━━━━━━━━━━━━━━━`,
    `📋 Plan Details`,
    `━━━━━━━━━━━━━━━━`,
    `Plan: ${plan.plan} (${plan.subtitle})`,
    `Price: ${plan.price}`,
  ];
  if (plan.monthly) lines.push(`Monthly: ${plan.monthly}`);
  if (plan.savings) lines.push(`Savings: ${plan.savings}`);
  lines.push(
    ``,
    `━━━━━━━━━━━━━━━━`,
    `👤 My Information`,
    `━━━━━━━━━━━━━━━━`,
    `Name: ${name}`,
    `Mobile: ${mobile}`,
    `Business: ${businessType}`,
    ``,
    `━━━━━━━━━━━━━━━━`,
    ``,
    `Please share plan details. Thank you!`
  );
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function PricingSection({ onStartFreeTrial }: Props) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const openInquiry = (plan: Plan) => {
    setSelectedPlan(plan);
    setName("");
    setMobile("");
    setBusinessType("");
    setErrors({});
    setModalOpen(true);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!mobile.trim()) errs.mobile = "Mobile number is required";
    else if (!phoneRegex.test(mobile)) errs.mobile = "Enter valid 10-digit mobile";
    if (!businessType) errs.businessType = "Select business type";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate() || !selectedPlan) return;
    const url = buildWhatsAppUrl(selectedPlan, name.trim(), mobile.trim(), businessType);
    window.open(url, "_blank", "noopener,noreferrer");
    setModalOpen(false);
  };

  return (
    <section id="pricing" className="py-28 relative overflow-hidden bg-[#f8fafc]">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-300/15 to-violet-300/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-bl from-emerald-300/10 to-teal-300/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal direction="up" delay={0.05} duration={0.65}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-widest text-indigo-600 font-mono uppercase bg-indigo-50/80 px-3 py-1.5 rounded-full border border-indigo-100/60">
              PRICING PLANS
            </span>
            <h2 className="text-4xl sm:text-5xl font-black font-display text-slate-900 mt-5 tracking-tight leading-tight">
              Choose the Right Plan for <br className="hidden sm:block" />
              Your Business
            </h2>
            <p className="text-slate-500 mt-3 text-base sm:text-lg font-sans">
              Simple pricing. No hidden fees. Lifetime updates included.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 items-stretch">
          {PLANS.map((plan, idx) => (
            <ScrollReveal
              key={plan.plan}
              direction="up"
              delay={0.08 * idx}
              duration={0.6}
              className="flex"
            >
              <div
                className={`
                  relative group flex flex-col w-full rounded-2xl p-6
                  transition-all duration-300
                  ${
                    plan.cardStyle === "dark"
                      ? "bg-[#111827] text-white border border-slate-700/80 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10"
                      : plan.cardStyle === "featured"
                        ? "bg-white border-2 border-purple-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10"
                        : "bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-200/80"
                  }
                  ${plan.cardStyle === "featured" ? "scale-[1.02] z-10" : ""}
                  ${plan.cardStyle === "featured" ? "hover:-translate-y-1.5" : "hover:-translate-y-1"}
                  ${plan.cardStyle === "dark" ? "hover:-translate-y-1" : ""}
                `}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <span
                      className={`text-[10px] font-extrabold font-mono tracking-widest px-3.5 py-1 rounded-full uppercase shadow-lg ${plan.badgeVariant}`}
                    >
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${
                    plan.cardStyle === "dark"
                      ? "bg-white/10 text-indigo-400"
                      : plan.cardStyle === "featured"
                        ? "bg-purple-50 text-purple-600"
                        : "bg-indigo-50 text-indigo-600"
                  }`}
                >
                  <plan.icon className="w-5.5 h-5.5" />
                </div>

                <h3
                  className={`text-lg font-bold font-display ${
                    plan.cardStyle === "dark" ? "text-white" : "text-slate-900"
                  }`}
                >
                  {plan.plan}
                </h3>
                <p
                  className={`text-sm mt-0.5 ${
                    plan.cardStyle === "dark" ? "text-slate-400" : "text-slate-500"
                  }`}
                >
                  {plan.subtitle}
                </p>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span
                    className={`text-3xl font-black font-display tracking-tight ${
                      plan.cardStyle === "dark" ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-xs ${
                      plan.cardStyle === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {plan.smallText}
                  </span>
                </div>

                {plan.monthly && (
                  <span
                    className={`text-[11px] mt-0.5 block ${
                      plan.cardStyle === "dark" ? "text-slate-500" : "text-slate-400"
                    }`}
                  >
                    {plan.monthly}
                  </span>
                )}

                {plan.savings && (
                  <div className="mb-3 mt-3">
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold font-mono tracking-wide px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200/60">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      {plan.savings}
                    </span>
                  </div>
                )}

                <hr
                  className={`my-4 ${
                    plan.cardStyle === "dark"
                      ? "border-slate-700/60"
                      : plan.cardStyle === "featured"
                        ? "border-purple-100"
                        : "border-slate-100"
                  }`}
                />

                <ul className="space-y-2 flex-1">
                  {FEATURES.map((feat) => (
                    <li key={feat} className="flex items-center gap-2.5">
                      <div
                        className={`w-4.5 h-4.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.cardStyle === "dark"
                            ? "bg-emerald-500/20"
                            : "bg-emerald-100"
                        }`}
                      >
                        <Check
                          className={`w-2.5 h-2.5 ${
                            plan.cardStyle === "dark"
                              ? "text-emerald-400"
                              : "text-emerald-600"
                          }`}
                        />
                      </div>
                      <span
                        className={`text-sm ${
                          plan.cardStyle === "dark"
                            ? "text-slate-300"
                            : "text-slate-600"
                        }`}
                      >
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  {plan.planId || plan.isLink ? (
                    <button
                      onClick={() => openInquiry(plan)}
                      className={`w-full py-3 rounded-xl font-bold font-display text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${plan.ctaClasses}`}
                    >
                      {plan.cta}
                    </button>
                  ) : (
                    <button
                      onClick={onStartFreeTrial}
                      className={`w-full py-3 rounded-xl font-bold font-display text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${plan.ctaClasses}`}
                    >
                      {plan.cta}
                    </button>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-24">
          <ScrollReveal direction="up" delay={0.1} duration={0.6}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {TRUST_ITEMS.map((item) => (
                <div
                  key={item.title}
                  className="group p-6 rounded-2xl bg-white/70 backdrop-blur-sm border border-slate-200/60 hover:border-indigo-300/50 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-50 to-indigo-100 flex items-center justify-center mb-4 group-hover:from-indigo-100 group-hover:to-indigo-200 transition-colors">
                    <item.icon className="w-5 h-5 text-indigo-600" />
                  </div>
                  <h4 className="text-base font-bold font-display text-slate-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-slate-500 font-sans">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {modalOpen && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-5 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold font-display tracking-tight">Send Inquiry</h2>
                  <p className="text-xs text-white/70 mt-0.5">{selectedPlan.plan} — {selectedPlan.price}</p>
                </div>
                <button onClick={() => setModalOpen(false)} className="p-1.5 rounded-xl hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5 text-white/60" />
                </button>
              </div>
            </div>

            <div className="px-6 py-6 space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 tracking-wide">Your Name <span className="text-rose-400">*</span></label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Rajesh Patel"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setErrors({ ...errors, name: "" }); }}
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${errors.name ? "border-rose-300 bg-rose-50/50" : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"}`}
                  />
                </div>
                {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 tracking-wide">Mobile Number <span className="text-rose-400">*</span></label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="tel"
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) => { setMobile(e.target.value.replace(/\D/g, "")); setErrors({ ...errors, mobile: "" }); }}
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${errors.mobile ? "border-rose-300 bg-rose-50/50" : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"}`}
                  />
                </div>
                {errors.mobile && <p className="text-rose-500 text-xs mt-1">{errors.mobile}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700 tracking-wide">Business Type <span className="text-rose-400">*</span></label>
                <div className="relative">
                  <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  <select
                    value={businessType}
                    onChange={(e) => { setBusinessType(e.target.value); setErrors({ ...errors, businessType: "" }); }}
                    className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all appearance-none ${errors.businessType ? "border-rose-300 bg-rose-50/50" : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"}`}
                  >
                    <option value="">Select your business type</option>
                    {BUSINESS_TYPES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>
                {errors.businessType && <p className="text-rose-500 text-xs mt-1">{errors.businessType}</p>}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold font-display text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Send on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

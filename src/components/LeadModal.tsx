import React, { useState } from "react";
import { X, ArrowRight, Building, User, Mail, Phone, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { LeadDetails } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (lead: LeadDetails) => void;
}

export const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
];

export const BUSINESS_TYPES = [
  "Retail Store", "Wholesaler / Distributor", "Hardware Business", "Medical Store / Pharmacy",
  "Grocery Store / Kirana", "Electronics Shop", "Garment / Apparel Store", "Restaurant / Cafe",
  "Other Business"
];

export default function LeadModal({ isOpen, onClose, onSuccess }: LeadModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    businessName: "",
    mobileNumber: "",
    email: "",
    businessType: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessAnim, setShowSuccessAnim] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.businessName.trim()) newErrors.businessName = "Business name is required";
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = "Mobile number is required";
    } else if (!phoneRegex.test(formData.mobileNumber)) {
      newErrors.mobileNumber = "Please enter a valid 10-digit Indian mobile number";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.businessType) newErrors.businessType = "Please select your business type";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state) newErrors.state = "Please select state";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const submissionLead: LeadDetails = {
      ...formData,
      submittedAt: new Date().toISOString()
    };

    // 1. Save to custom local storage as baseline log
    try {
      const existingLeadsStr = localStorage.getItem("vyaparix_leads") || "[]";
      const existingLeads = JSON.parse(existingLeadsStr);
      existingLeads.push(submissionLead);
      localStorage.setItem("vyaparix_leads", JSON.stringify(existingLeads));
    } catch (lsErr) {
      console.error("Could not sync to local storage:", lsErr);
    }

    // 2. Safely perform POST request directly to Google Apps Script webhook
    const webhookUrl = (import.meta as any).env.VITE_GOOGLE_SHEET_WEBHOOK_URL || "https://script.google.com/macros/s/AKfycbxWIdDbr7VR-A0lHmabQcTCUzrkyJbbv8F0538iEOAwZO7qQwAfqBdomk8Xj51pQQAv/exec";
    if (webhookUrl && webhookUrl.trim() !== "") {
      try {
        // Use no-cors to prevent preflight CORS redirect failure from Google Sheets Web App endpoint
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(submissionLead),
        });
        console.log("Form data sent to Google Sheet Web App!");
      } catch (webhookErr) {
        console.warn("Failed sending to Sheets webhook. Check URL configuration.", webhookErr);
      }
    } else {
      console.log("Sheet webhook is empty. App is running in demo mode with Local Storage backup.");
    }

    // Show beautiful success confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccessAnim(true);

      // Wait for check animation to fire, then redirect to thank you page
      setTimeout(() => {
        setShowSuccessAnim(false);
        onSuccess(submissionLead);
      }, 1500);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100 z-10">
        <AnimatePresence mode="wait">
          {showSuccessAnim ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-20 px-8 text-center min-h-[520px] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900"
            >
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-emerald-500/10">
                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
              </div>
              <h3 className="text-3xl font-bold text-white font-display mb-3">Registration Successful!</h3>
              <p className="text-slate-300 max-w-sm mb-6 text-sm leading-relaxed">
                Thank you for choosing Vyaparix. Your secure 7-Day Free Trial download is initializing now...
              </p>
              <div className="flex h-2 w-48 bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full rounded-full w-full" style={{
                  animation: "bg-move 1.5s linear infinite",
                  backgroundImage: "linear-gradient(90deg, #6366f1, #a5b4fc, #6366f1)",
                  backgroundSize: "200% 100%"
                }}/>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col">
              <div className="relative bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-8 py-6 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-2xl" />
                <div className="relative flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center ring-2 ring-indigo-400/20">
                      <Sparkles className="w-5 h-5 text-indigo-300" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold font-display tracking-tight">Start Your 7-Day Free Trial</h2>
                      <p className="text-xs text-indigo-200/70 mt-0.5">Unlock Vyaparix Premium Desktop</p>
                    </div>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="overflow-y-auto px-8 py-6 space-y-4 max-h-[65vh]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide">Full Name <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Ramesh Patel"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                          errors.fullName ? "border-rose-300 bg-rose-50/50 focus:border-rose-400 focus:ring-4 focus:ring-rose-100" : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                        }`}
                      />
                    </div>
                    {errors.fullName && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><span className="w-1 h-1 bg-rose-500 rounded-full" />{errors.fullName}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide">Business Name <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Patel Pharmacy"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                          errors.businessName ? "border-rose-300 bg-rose-50/50 focus:border-rose-400 focus:ring-4 focus:ring-rose-100" : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                        }`}
                      />
                    </div>
                    {errors.businessName && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><span className="w-1 h-1 bg-rose-500 rounded-full" />{errors.businessName}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide">Mobile Number <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400 font-semibold font-mono">+91</span>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="98765 43210"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, '') })}
                        className={`w-full pl-14 pr-4 py-2.5 border-2 rounded-xl text-sm font-mono bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                          errors.mobileNumber ? "border-rose-300 bg-rose-50/50 focus:border-rose-400 focus:ring-4 focus:ring-rose-100" : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                        }`}
                      />
                    </div>
                    {errors.mobileNumber && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><span className="w-1 h-1 bg-rose-500 rounded-full" />{errors.mobileNumber}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide">Email Address <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="patel@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                          errors.email ? "border-rose-300 bg-rose-50/50 focus:border-rose-400 focus:ring-4 focus:ring-rose-100" : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><span className="w-1 h-1 bg-rose-500 rounded-full" />{errors.email}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide">Business Type <span className="text-rose-400">*</span></label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                        errors.businessType ? "border-rose-300 bg-rose-50/50 focus:border-rose-400 focus:ring-4 focus:ring-rose-100" : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      }`}
                    >
                      <option value="">Choose your segment</option>
                      {BUSINESS_TYPES.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.businessType && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><span className="w-1 h-1 bg-rose-500 rounded-full" />{errors.businessType}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide">City <span className="text-rose-400">*</span></label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Ahmedabad"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 border-2 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                          errors.city ? "border-rose-300 bg-rose-50/50 focus:border-rose-400 focus:ring-4 focus:ring-rose-100" : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                        }`}
                      />
                    </div>
                    {errors.city && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><span className="w-1 h-1 bg-rose-500 rounded-full" />{errors.city}</p>}
                  </div>

                  <div className="md:col-span-2 space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-700 tracking-wide">State <span className="text-rose-400">*</span></label>
                    <select
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className={`w-full px-4 py-2.5 border-2 rounded-xl text-sm bg-slate-50 focus:bg-white focus:outline-none transition-all ${
                        errors.state ? "border-rose-300 bg-rose-50/50 focus:border-rose-400 focus:ring-4 focus:ring-rose-100" : "border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50"
                      }`}
                    >
                      <option value="">Select your state</option>
                      {INDIAN_STATES.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    {errors.state && <p className="text-rose-500 text-xs mt-1 flex items-center gap-1"><span className="w-1 h-1 bg-rose-500 rounded-full" />{errors.state}</p>}
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold font-display text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2.5">
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Verifying details...
                      </span>
                    ) : (
                      <>
                        Activate Trial & Download Setup
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 font-semibold font-display text-sm py-3 px-6 rounded-xl transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

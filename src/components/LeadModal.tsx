import { useState, type FormEvent } from "react";
import {
  X, ArrowRight, Building2, User, Mail, MapPin, Sparkles,
  AlertCircle, Download, CheckCircle2, Shield, Phone,
  ChevronRight, Star, Zap
} from "lucide-react";
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
  "Retail Store", "Wholesaler / Distributor", "Hardware Business",
  "Grocery Store / Kirana", "Electronics Shop", "Garment / Apparel Store",
  "Other Business"
];

const PERKS = [
  { icon: Zap, text: "Instant GST Billing" },
  { icon: Shield, text: "Secure & Offline" },
  { icon: Star, text: "7-Day Free Trial" },
];

/* ── Reusable field wrapper ── */
function Field({ label, required, error, children }: {
  label: string; required?: boolean; error?: string; children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 uppercase tracking-widest">
        {label}
        {required && <span className="text-rose-500 text-sm leading-none">*</span>}
      </label>
      {children}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-rose-500 text-xs flex items-center gap-1"
          >
            <span className="w-1 h-1 bg-rose-500 rounded-full inline-block" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}

const inputBase =
  "w-full py-2.5 border-2 rounded-xl text-sm bg-white/80 focus:bg-white focus:outline-none transition-all duration-200 placeholder:text-slate-300 text-slate-800 font-medium";
const inputNormal = `${inputBase} border-slate-200 hover:border-slate-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50`;
const inputError  = `${inputBase} border-rose-300 bg-rose-50/40 focus:border-rose-400 focus:ring-4 focus:ring-rose-100`;

/* ── Success popup that shows after form submit ── */
function SuccessDialog({ name, onClose }: { name: string; onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      {/* Card */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="relative z-10 w-full max-w-sm bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Top gradient bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-indigo-500 via-violet-500 to-pink-500" />

        <div className="px-8 pt-8 pb-7 flex flex-col items-center text-center">
          {/* Animated check ring */}
          <div className="relative mb-5">
            <motion.div
              className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center ring-8 ring-emerald-100"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.25, type: "spring", stiffness: 400 }}
              >
                <CheckCircle2 className="w-10 h-10 text-emerald-500" strokeWidth={2.5} />
              </motion.div>
            </motion.div>
            {/* Ping effect */}
            <span className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-2xl font-bold font-display text-slate-900 mb-1">
              🎉 You're All Set{name ? `, ${name.split(" ")[0]}` : ""}!
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mt-2 mb-5">
              Your details are saved. Your <span className="font-semibold text-indigo-600">7-Day Free Trial</span> download
              has started automatically in your browser.
            </p>
          </motion.div>

          {/* Download status chip */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2.5 rounded-xl text-xs font-semibold mb-6 w-full justify-center border border-indigo-100"
          >
            <Download className="w-4 h-4 animate-bounce" />
            Vyaparix_Setup.exe — Download in progress…
          </motion.div>

          {/* What's next steps */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="w-full bg-slate-50 rounded-2xl px-5 py-4 mb-6 text-left space-y-2.5"
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-3">Quick next steps</p>
            {[
              "Open the downloaded Vyaparix_Setup.exe",
              "Click 'More Info' → 'Run Anyway' if Windows prompts",
              "Launch & start billing in under 2 minutes!",
            ].map((step, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-xs text-slate-600 leading-relaxed">{step}</p>
              </div>
            ))}
          </motion.div>

          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold font-display text-sm shadow-lg shadow-indigo-200 hover:shadow-xl transition-all"
          >
            Got it, Close
          </motion.button>

          <p className="text-[11px] text-slate-400 mt-3">
            Need help? WhatsApp us at{" "}
            <a
              href="https://wa.me/918347402205"
              target="_blank"
              rel="noreferrer"
              className="text-indigo-500 underline underline-offset-2"
            >
              +91 83474 02205
            </a>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   Main LeadModal component
══════════════════════════════════════════════ */
export default function LeadModal({ isOpen, onClose, onSuccess }: LeadModalProps) {
  const [formData, setFormData] = useState({
    fullName: "", businessName: "", mobileNumber: "",
    email: "", businessType: "", city: "", state: "",
  });
  const [errors, setErrors]         = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError]   = useState<string | null>(null);
  const [showSuccess, setShowSuccess]   = useState(false);

  if (!isOpen && !showSuccess) return null;

  const validate = () => {
    const e: Record<string, string> = {};
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.mobileNumber.trim())       e.mobileNumber = "Mobile number is required";
    else if (!phoneRegex.test(formData.mobileNumber))
      e.mobileNumber = "Enter a valid 10-digit Indian mobile number";

    if (formData.email.trim()) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
        e.email = "Enter a valid email address";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const triggerDownload = () => {
    const url = (import.meta as any).env.VITE_EXE_DOWNLOAD_URL;
    if (url?.trim()) {
      const a = document.createElement("a");
      a.href = url.trim();
      a.download = "Vyaparix_Setup.exe";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const lead: LeadDetails = { ...formData, submittedAt: new Date().toISOString() };
    const webhookUrl = (import.meta as any).env.VITE_GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl?.trim()) {
      setIsSubmitting(false);
      onSuccess(lead);
      triggerDownload();
      setShowSuccess(true);
      return;
    }

    try {
      await fetch(webhookUrl.trim(), {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      setIsSubmitting(false);
      onSuccess(lead);
      triggerDownload();
      setShowSuccess(true);        // ← show success popup
    } catch (err) {
      console.error("Webhook failed:", err);
      setIsSubmitting(false);
      setSubmitError("Could not save your details. Please check your internet connection and try again.");
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();
  };

  return (
    <>
      {/* ── Success Dialog (above modal) ── */}
      <AnimatePresence>
        {showSuccess && <SuccessDialog name={formData.fullName} onClose={handleSuccessClose} />}
      </AnimatePresence>

      {/* ── Main Form Modal ── */}
      <AnimatePresence>
        {isOpen && !showSuccess && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-950/65 backdrop-blur-sm"
              onClick={onClose}
            />

            {/* Modal card */}
            <motion.div
              initial={{ scale: 0.94, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 8 }}
              transition={{ type: "spring", stiffness: 320, damping: 28 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col md:flex-row"
              style={{ maxHeight: "92vh" }}
            >

              {/* ── LEFT PANEL (dark) ── */}
              <div className="hidden md:flex md:w-[32%] shrink-0 relative flex-col justify-between p-5 overflow-hidden"
                style={{ background: "linear-gradient(160deg, #0f172a 0%, #1e1b4b 55%, #2d1a5e 100%)" }}
              >
                {/* Glow orbs */}
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-10 right-0 w-32 h-32 bg-violet-500/15 rounded-full blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  {/* Brand badge */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center ring-1 ring-white/15">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-300" />
                    </div>
                    <span className="font-bold font-display text-white text-sm tracking-tight">Vyaparix</span>
                  </div>

                  <h2 className="text-lg font-bold font-display text-white leading-snug mb-1.5">
                    Start Your<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                      7-Day Free Trial
                    </span>
                  </h2>
                  <p className="text-slate-400 text-[11px] leading-relaxed mb-5">
                    India's fastest billing software for small businesses.
                  </p>

                  {/* Perks */}
                  <div className="space-y-2">
                    {PERKS.map(({ icon: Icon, text }) => (
                      <div key={text} className="flex items-center gap-2">
                        <div className="w-5.5 h-5.5 rounded-md bg-indigo-500/20 flex items-center justify-center shrink-0">
                          <Icon className="w-3 h-3 text-indigo-300" />
                        </div>
                        <span className="text-slate-300 text-[11px] font-medium">{text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom trust bar */}
                <div className="relative z-10 mt-5 pt-4 border-t border-white/10">
                  <p className="text-[9px] text-slate-500 uppercase tracking-widest font-semibold mb-1">Trusted by</p>
                  <p className="text-white text-base font-bold font-display">10,000+ businesses</p>
                  <p className="text-slate-400 text-[11px] mt-0.5">across India</p>
                </div>
              </div>

              {/* ── RIGHT PANEL (form) ── */}
              <div className="flex-1 flex flex-col overflow-hidden">

                {/* Mobile-only header */}
                <div className="md:hidden bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 px-6 py-5 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 bg-indigo-500/20 rounded-lg flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-indigo-300" />
                      </div>
                      <div>
                        <h2 className="text-sm font-bold font-display">Start Your 7-Day Free Trial</h2>
                        <p className="text-[10px] text-indigo-300/70 mt-0.5">Unlock Vyaparix Premium Desktop</p>
                      </div>
                    </div>
                    <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                      <X className="w-4.5 h-4.5 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Desktop close button */}
                <div className="hidden md:flex justify-between items-center px-7 pt-6 pb-1">
                  <div>
                    <h3 className="text-base font-bold font-display text-slate-900">Create your account</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Fill in your details to download instantly</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>

                {/* Scrollable form body */}
                <form
                  onSubmit={handleSubmit}
                  className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-7 py-4 space-y-4"
                >
                  {/* Error banner */}
                  <AnimatePresence>
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-2.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl px-4 py-3 text-xs"
                      >
                        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                        <span>{submitError}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ── Mobile Number (required + full-width + prominent) ── */}
                  <Field label="Mobile Number" required error={errors.mobileNumber}>
                    <div className="relative">
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-sm font-bold text-indigo-500 font-mono">+91</span>
                        <div className="w-px h-4 bg-slate-200" />
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        placeholder="98765 43210"
                        value={formData.mobileNumber}
                        onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value.replace(/\D/g, "") })}
                        className={`${errors.mobileNumber ? inputError : inputNormal} pl-24 font-mono text-base tracking-wider`}
                        autoFocus
                      />
                    </div>
                  </Field>

                  {/* 2-col grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <Field label="Full Name">
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Ramesh Patel"
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className={`${inputNormal} pl-9`}
                        />
                      </div>
                    </Field>

                    <Field label="Business Name">
                      <div className="relative">
                        <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Patel Pharmacy"
                          value={formData.businessName}
                          onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                          className={`${inputNormal} pl-9`}
                        />
                      </div>
                    </Field>

                    <Field label="Email Address" error={errors.email}>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="email"
                          placeholder="patel@gmail.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className={`${errors.email ? inputError : inputNormal} pl-9`}
                        />
                      </div>
                    </Field>

                    <Field label="Business Type">
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className={`${inputNormal} px-3.5 appearance-none`}
                      >
                        <option value="">Choose segment</option>
                        {BUSINESS_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </Field>

                    <Field label="City">
                      <div className="relative">
                        <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Ahmedabad"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className={`${inputNormal} pl-9`}
                        />
                      </div>
                    </Field>

                    <Field label="State">
                      <select
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className={`${inputNormal} px-3.5 appearance-none`}
                      >
                        <option value="">Select state</option>
                        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </Field>
                  </div>

                  {/* Submit row */}
                  <div className="pt-2 pb-2 flex flex-col sm:flex-row gap-2.5">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={!isSubmitting ? { scale: 1.015, y: -1 } : {}}
                      whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      className="relative flex-1 overflow-hidden rounded-xl py-3 px-6 text-white font-bold font-display text-sm
                        flex items-center justify-center gap-2 cursor-pointer transition-all duration-300
                        shadow-lg shadow-indigo-200 disabled:opacity-60 disabled:cursor-not-allowed"
                      style={{ background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)" }}
                    >
                      {/* Shimmer */}
                      {!isSubmitting && (
                        <span
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 50%, transparent 60%)",
                            backgroundSize: "200% 100%",
                            animation: "shimmer 2.4s infinite",
                          }}
                        />
                      )}
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Saving details…
                        </>
                      ) : (
                        <>
                          <Download className="w-4 h-4" />
                          Download Free Trial
                          <ChevronRight className="w-3.5 h-3.5 opacity-70" />
                        </>
                      )}
                    </motion.button>

                    <button
                      type="button"
                      onClick={onClose}
                      className="border-2 border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-500
                        font-semibold font-display text-sm py-3 px-5 rounded-xl transition-all cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  {/* Trust footnote */}
                  <p className="text-center text-[10px] text-slate-400 pb-1">
                    🔒 Your data is safe. We never share or spam. No credit card needed.
                  </p>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shimmer keyframe */}
      <style>{`
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </>
  );
}

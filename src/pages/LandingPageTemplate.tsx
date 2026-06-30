import { useState } from "react";
import { Check, ArrowRight, Star, Shield, Zap, Award } from "lucide-react";
import { Link } from "react-router-dom";

interface LandingPageProps {
  title: string;
  description: string;
  h1: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  features: { title: string; desc: string }[];
  industries: string[];
  faqs: { q: string; a: string }[];
  keywords: string[];
  setIsLeadModalOpen: (v: boolean) => void;
}

export default function LandingPageTemplate({
  title, description, h1, intro, benefits, features, industries, faqs, keywords, setIsLeadModalOpen,
}: LandingPageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>

      <section className="relative overflow-hidden pt-16 pb-20 md:py-28 bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white">
        <div className="absolute inset-0 dot-grid-dark pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl font-black font-display tracking-tight leading-tight">{h1}</h1>
          <p className="text-slate-300 mt-4 text-base sm:text-lg max-w-3xl mx-auto">{intro}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <button onClick={() => setIsLeadModalOpen(true)}
              className="px-8 py-4 cursor-pointer text-white font-bold font-display rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-base">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </button>
            <Link to="/"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-semibold font-display rounded-xl hover:bg-white/20 transition-all">
              View All Features
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {keywords.map(k => (
              <span key={k} className="text-xs bg-white/10 px-3 py-1 rounded-full text-slate-300 border border-white/10">{k}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black font-display text-slate-900 text-center mb-12">Why Choose Vyaparix?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-200 hover:border-indigo-200 transition-all">
                <div className="w-10 h-10 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4"><Check className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold font-display text-slate-900">{b.title}</h3>
                <p className="text-slate-600 text-sm mt-2">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black font-display text-slate-900 text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="flex gap-4 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm">
                <div className="shrink-0 w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center"><Zap className="w-5 h-5" /></div>
                <div>
                  <h3 className="font-bold font-display text-slate-900">{f.title}</h3>
                  <p className="text-slate-600 text-sm mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black font-display text-slate-900 text-center mb-4">Perfect For</h2>
          <p className="text-slate-500 text-center max-w-2xl mx-auto mb-10">Vyaparix is trusted by businesses across India. Here's who benefits the most:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {industries.map((ind, i) => (
              <div key={i} className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 text-center">
                <span className="text-sm font-semibold text-indigo-700">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-black font-display">Ready to Transform Your Business?</h2>
          <p className="text-slate-300 mt-3 mb-8">Join 10,000+ Indian businesses using Vyaparix. Start your free trial today.</p>
          <button onClick={() => setIsLeadModalOpen(true)}
            className="px-10 py-4 cursor-pointer text-white font-bold font-display rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-lg transition-all text-lg">
            Start Free Trial <ArrowRight className="w-5 h-5 inline ml-2" />
          </button>
          <div className="flex items-center justify-center gap-6 mt-6 text-xs text-slate-400">
            <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> No credit card</span>
            <span className="flex items-center gap-1"><Award className="w-4 h-4" /> 7 days free</span>
            <span className="flex items-center gap-1"><Star className="w-4 h-4" /> Unlimited invoices</span>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black font-display text-slate-900 text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-slate-200 rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-slate-800 hover:bg-slate-50 transition-colors">
                  {faq.q}
                  <span className={`text-indigo-600 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>▼</span>
                </button>
                {openFaq === i && <div className="px-4 pb-4 text-sm text-slate-600">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-10 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-500">
            <Link to="/" className="hover:text-indigo-600 transition-colors">Home</Link>
            <Link to="/gst-billing-software" className="hover:text-indigo-600 transition-colors">GST Billing</Link>
            <Link to="/invoice-software" className="hover:text-indigo-600 transition-colors">Invoice Software</Link>
            <Link to="/inventory-management-software" className="hover:text-indigo-600 transition-colors">Inventory</Link>
            <Link to="/stock-management-software" className="hover:text-indigo-600 transition-colors">Stock Management</Link>
            <Link to="/shop-management-software" className="hover:text-indigo-600 transition-colors">Shop Management</Link>
            <Link to="/free-invoice-software" className="hover:text-indigo-600 transition-colors">Free Invoice</Link>
            <Link to="/retail-billing-software" className="hover:text-indigo-600 transition-colors">Retail Billing</Link>
            <Link to="/billing-software-india" className="hover:text-indigo-600 transition-colors">Billing India</Link>
            <Link to="/invoice-generator" className="hover:text-indigo-600 transition-colors">Invoice Generator</Link>
            <Link to="/business-management-software" className="hover:text-indigo-600 transition-colors">Business Mgmt</Link>
          </div>
        </div>
      </section>
    </>
  );
}

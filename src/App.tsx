import { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import { LANDING_PAGE_KEYS } from "./pages/landingData";
import { Play, X, ArrowRight, Zap } from "lucide-react";
import { LeadDetails } from "./types";
import LeadModal from "./components/LeadModal";
import HomeContent from "./containers/HomeContent";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "./imageConfig";

const GenericLandingPage = lazy(() => import("./pages/GenericLandingPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const PrivacyPage = lazy(() => import("./pages/PrivacyPage"));
const TermsPage = lazy(() => import("./pages/TermsPage"));
const RefundPage = lazy(() => import("./pages/RefundPage"));
const EulaPage = lazy(() => import("./pages/EulaPage"));

export default function App() {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  const handleLeadSuccess = (lead: LeadDetails) => {
    setIsLeadModalOpen(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <Layout setIsLeadModalOpen={setIsLeadModalOpen}>
            <HomeContent
              setIsLeadModalOpen={setIsLeadModalOpen}
              setDemoModalOpen={setDemoModalOpen}
              handleLeadSuccess={handleLeadSuccess}
            />
          </Layout>
        } />
        {LANDING_PAGE_KEYS.map(slug => (
          <Route path={`/${slug}`} element={
            <Layout setIsLeadModalOpen={setIsLeadModalOpen}>
              <Suspense fallback={null}><GenericLandingPage slug={slug} setIsLeadModalOpen={setIsLeadModalOpen} /></Suspense>
            </Layout>
          } />
        ))}
        <Route path="/about" element={<Layout setIsLeadModalOpen={setIsLeadModalOpen}><Suspense fallback={null}><AboutPage /></Suspense></Layout>} />
        <Route path="/privacy" element={<Layout setIsLeadModalOpen={setIsLeadModalOpen}><Suspense fallback={null}><PrivacyPage /></Suspense></Layout>} />
        <Route path="/terms" element={<Layout setIsLeadModalOpen={setIsLeadModalOpen}><Suspense fallback={null}><TermsPage /></Suspense></Layout>} />
        <Route path="/refund" element={<Layout setIsLeadModalOpen={setIsLeadModalOpen}><Suspense fallback={null}><RefundPage /></Suspense></Layout>} />
        <Route path="/eula" element={<Layout setIsLeadModalOpen={setIsLeadModalOpen}><Suspense fallback={null}><EulaPage /></Suspense></Layout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <LeadModal isOpen={isLeadModalOpen} onClose={() => setIsLeadModalOpen(false)} onSuccess={handleLeadSuccess} />

      <AnimatePresence>
        {demoModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setDemoModalOpen(false)} />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl bg-slate-900 text-white rounded-3xl overflow-hidden border border-slate-800 shadow-2xl z-10">
              <div className="flex justify-between items-center px-6 py-4 border-b border-slate-800 bg-slate-950">
                <span className="font-bold font-display tracking-tight flex items-center gap-2"><Play className="w-4.5 h-4.5 text-indigo-400 fill-current" /> Vyaparix Client Demo</span>
                <button onClick={() => setDemoModalOpen(false)} aria-label="Close demo" className="p-1.5 rounded-full hover:bg-white/10 transition-colors"><X className="w-5 h-5 text-slate-400" /></button>
              </div>
              <div className="p-4 sm:p-6 bg-slate-950">
                <p className="text-slate-400 text-xs sm:text-sm mb-4">The demo showcases the billing workspace inside Vyaparix with GST columns, HSN codes, and professional print formats.</p>
                <div className="border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 aspect-[16/10] relative">
                  <img src={IMAGES.billing} alt="Vyaparix billing demo" className="w-full h-full object-fill" referrerPolicy="no-referrer" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent flex flex-col justify-end p-6">
                    <span className="text-[10px] bg-indigo-600 px-2 py-0.5 rounded text-white font-mono uppercase tracking-widest w-fit mb-2">BILLING WORKBENCH</span>
                    <h4 className="text-lg sm:text-xl font-bold font-display text-white">Fully Configured Invoicing Screens</h4>
                    <p className="text-xs text-slate-300 max-w-lg mt-1">Barcode scanning, item lookups, and GST auto-calculation.</p>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-900 border-t border-slate-800 flex flex-col sm:flex-row gap-3 items-center justify-between">
                <span className="text-xs text-slate-400">Windows client ~24MB.</span>
                <button onClick={() => { setDemoModalOpen(false); setIsLeadModalOpen(true); }}
                  className="w-full sm:w-auto px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold font-display rounded-xl flex items-center justify-center gap-2 text-sm shadow cursor-pointer">
                  Download Free Trial <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

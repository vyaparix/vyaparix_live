import { useState, useEffect, type ReactNode } from "react";
import { Phone, X, Sparkles, Menu } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { IMAGES } from "../imageConfig";
import { Link, useLocation } from "react-router-dom";

const NAV_SECTIONS = [
  { id: "features", label: "Features" },
  { id: "industries", label: "Industries" },
  { id: "showcase", label: "Dashboard" },
  { id: "pricing", label: "Pricing" },
  { id: "testimonials", label: "Testimonials" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

interface LayoutProps {
  children: ReactNode;
  setIsLeadModalOpen: (v: boolean) => void;
}

export default function Layout({ children, setIsLeadModalOpen }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const linkClass = (active: boolean) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
      active
        ? "text-indigo-600 bg-indigo-50 shadow-sm shadow-indigo-100/50"
        : "text-slate-600 hover:text-indigo-600 hover:bg-slate-100"
    }`;

  return (
    <div className="relative bg-[#f8fafc] text-slate-900 overflow-x-hidden selection:bg-indigo-500 selection:text-white font-sans antialiased min-h-screen">
      <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-85" />
      <div className="fixed top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-300/10 to-violet-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="fixed top-[20%] right-10 w-[600px] h-[600px] bg-gradient-to-bl from-blue-300/10 to-emerald-400/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="fixed top-[45%] left-[-100px] w-[500px] h-[500px] bg-gradient-to-tr from-purple-400/5 to-pink-500/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="fixed top-[70%] right-[-100px] w-[600px] h-[600px] bg-gradient-to-bl from-emerald-400/5 to-indigo-500/10 blur-[140px] rounded-full pointer-events-none" />

      <header className={`fixed top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-lg shadow-slate-900/5"
          : "bg-white/70 backdrop-blur-md border-b border-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative">
                <img src={IMAGES.logo} alt="Vyaparix" className="w-9 h-9 object-contain rounded-lg shadow-sm border border-slate-100 group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                <div className="absolute -inset-1 bg-indigo-500/20 rounded-lg blur-md group-hover:blur-lg transition-all opacity-0 group-hover:opacity-100" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg font-black font-display tracking-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">Vyaparix</span>
                <span className="text-[9px] font-bold font-mono tracking-widest text-slate-400 uppercase">SHOP MANAGER</span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV_SECTIONS.map(s => (
                <a key={s.id} href={isHome ? `#${s.id}` : `/#${s.id}`} className={linkClass(false)}>{s.label}</a>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2.5">
              <a href="tel:8347402205" className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-slate-100 transition-all duration-200">
                <Phone className="w-3.5 h-3.5 text-emerald-500" />
              </a>
              <button onClick={() => setIsLeadModalOpen(true)}
                className="relative group cursor-pointer text-sm font-bold font-display py-2.5 px-5 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 shadow-lg shadow-indigo-200/60 hover:shadow-xl hover:shadow-indigo-300/50 transition-all duration-200 active:scale-[0.97] overflow-hidden">
                <span className="relative z-10 flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" /> Start Free Trial</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </div>

            <div className="flex lg:hidden items-center gap-2">
              <button onClick={() => setIsLeadModalOpen(true)}
                className="text-xs font-bold font-display py-2 px-3.5 rounded-xl text-white bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-sm cursor-pointer">
                Free Trial
              </button>
              <button onClick={() => setMobileOpen(o => !o)} aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}
                className="p-2 -mr-2 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}
              className="fixed inset-0 z-30 bg-slate-950/30 backdrop-blur-sm lg:hidden" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 28, stiffness: 320 }}
              className="fixed top-0 right-0 z-40 h-full w-[280px] bg-white shadow-2xl lg:hidden overflow-y-auto">

              <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                  <img src={IMAGES.logo} alt="Vyaparix" className="w-7 h-7 object-contain rounded-lg" referrerPolicy="no-referrer" loading="lazy" />
                  <span className="font-black font-display tracking-tight bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">Vyaparix</span>
                </Link>
                <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-1 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer">
                  <X className="w-4.5 h-4.5 text-slate-500" />
                </button>
              </div>

              <div className="p-4 pb-8 space-y-0.5">
                {NAV_SECTIONS.map(s => (
                  <a key={s.id} href={isHome ? `#${s.id}` : `/#${s.id}`} onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-all">{s.label}</a>
                ))}

                <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
                  <a href="tel:8347402205" className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all">
                    <Phone className="w-4 h-4 text-emerald-500" /> <span className="font-medium">+91 8347402205</span>
                  </a>
                  <button onClick={() => { setMobileOpen(false); setIsLeadModalOpen(true); }}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-xl font-bold font-display shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 text-sm">
                    <Sparkles className="w-4 h-4" /> Start Free Trial
                  </button>
                  <p className="text-[10px] text-slate-400 text-center">No credit card required • 7 days free</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="pt-16">{children}</main>

      <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 pb-12 border-b border-slate-900">
            <div className="col-span-2 space-y-4">
              <Link to="/" className="flex items-center gap-3">
                <img src={IMAGES.logo} alt="Vyaparix logo" className="w-8 h-8 object-contain rounded-lg shadow-sm" referrerPolicy="no-referrer" loading="lazy" />
                <span className="text-lg font-black font-display tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Vyaparix</span>
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed font-sans">
                Vyaparix is a state-of-the-art billing, khata, offline-first stock registry, and business statement client for Windows desktops, engineered to simplify GST tax processing.
              </p>
              <div className="flex gap-2.5">
                <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-bold font-mono tracking-wide text-indigo-400">LLP REGISTERED</span>
                <span className="bg-slate-900 px-2 py-1 rounded text-[10px] font-bold font-mono tracking-wide text-emerald-400">GST-READY</span>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4 font-mono">PRODUCT</h5>
              <ul className="space-y-2 text-xs font-sans text-slate-400">
                <li className="hover:text-white transition-colors">GST Billing Software</li>
                <li className="hover:text-white transition-colors">Invoice Software</li>
                <li className="hover:text-white transition-colors">Inventory Management</li>
                <li className="hover:text-white transition-colors">Stock Management</li>
                <li className="hover:text-white transition-colors">Shop Management</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4 font-mono">MORE</h5>
              <ul className="space-y-2 text-xs font-sans text-slate-400">
                <li className="hover:text-white transition-colors">Free Invoice Software</li>
                <li className="hover:text-white transition-colors">Retail Billing Software</li>
                <li className="hover:text-white transition-colors">Billing Software India</li>
                <li className="hover:text-white transition-colors">Invoice Generator</li>
                <li className="hover:text-white transition-colors">Business Mgmt Software</li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4 font-mono">LEGAL</h5>
              <ul className="space-y-2 text-xs font-sans text-slate-400">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/refund" className="hover:text-white transition-colors">Refund Policy</Link></li>
                <li><Link to="/eula" className="hover:text-white transition-colors">EULA License</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-xs text-white uppercase tracking-widest mb-4 font-mono">SUPPORT</h5>
              <ul className="space-y-2 text-xs font-sans text-slate-400">
                <li><a href="tel:8347402205" className="hover:text-white transition-colors font-mono">+91 8347402205</a></li>
                <li><a href="mailto:vyaparix.co@gmail.com" className="hover:text-white transition-colors font-mono">vyaparix.co@gmail.com</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">Support Desk</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-500 font-sans gap-4">
            <span>© 2026 Vyaparix billing software. Manufactured by Vyaparix Technologies LLP. All rights reserved.</span>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/privacy" className="hover:text-slate-300">Privacy Policy</Link>
              <span>•</span>
              <Link to="/terms" className="hover:text-slate-300">Terms of Service</Link>
              <span>•</span>
              <Link to="/refund" className="hover:text-slate-300">Refund Policy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

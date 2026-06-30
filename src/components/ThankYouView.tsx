import React, { useEffect, useState } from "react";
import { Download, PhoneCall, Check, ArrowLeft, ShieldCheck, Cpu, Smartphone, RefreshCw, MessageSquare } from "lucide-react";
import { LeadDetails } from "../types";
import { motion } from "motion/react";

interface ThankYouViewProps {
  lead: LeadDetails | null;
  onGoBack: () => void;
}

export default function ThankYouView({ lead, onGoBack }: ThankYouViewProps) {
  const [downloadCounter, setDownloadCounter] = useState(5);
  const [downloadTriggered, setDownloadTriggered] = useState(false);

  const triggerDownload = () => {
    try {
      const configuredUrl = (import.meta as any).env.VITE_EXE_DOWNLOAD_URL;
      if (configuredUrl && configuredUrl.trim() !== "") {
        window.open(configuredUrl.trim(), "_blank");
        setDownloadTriggered(true);
      }
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  useEffect(() => {
    // Start countdown and trigger download
    const interval = setInterval(() => {
      setDownloadCounter((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          triggerDownload();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#f8fafc] flex flex-col justify-between py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Professional Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-85" />
      
      {/* Aurora glow blobs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-indigo-300/10 to-violet-400/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[10%] right-[-100px] w-[500px] h-[500px] bg-gradient-to-bl from-blue-300/15 to-emerald-400/5 blur-[140px] rounded-full pointer-events-none" />

      {/* Header Navigation */}
      <div className="max-w-4xl mx-auto w-full mb-8 relative z-10">
        <button
          onClick={onGoBack}
          className="group flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-medium font-display text-sm transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to website homepage
        </button>
      </div>

      <main className="max-w-4xl mx-auto w-full flex-1 flex flex-col justify-center relative z-10">
        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-slate-200/60 grid grid-cols-1 md:grid-cols-12">
          {/* Main message */}
          <div className="p-8 sm:p-12 md:col-span-12 lg:col-span-7 flex flex-col justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 w-fit mb-4">
              <Check className="w-3.5 h-3.5 stroke-[3px]" /> Welcome aboard, {lead?.fullName || "Partner"}
            </span>

            <h1 className="text-3xl sm:text-4xl font-bold font-display text-slate-900 tracking-tight leading-tight mb-4">
              Thank You For Choosing <span className="gradient-text">Vyaparix</span>
            </h1>

            <p className="text-slate-600 mb-6 leading-relaxed text-sm sm:text-base">
              Your registration is complete. Your product setup license is initialized, and the Vyaparix Windows Client Installer download will begin shortly.
            </p>

            {/* Countdown / Download Action Panel */}
            <div className="bg-slate-50/70 border border-slate-100/80 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center relative">
                  {downloadCounter > 0 ? (
                    <span className="font-bold font-mono text-base">{downloadCounter}</span>
                  ) : (
                    <Check className="w-6 h-6 text-green-600 animate-pulse" />
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 text-sm font-display">
                    {downloadCounter > 0 
                      ? `Starting download in ${downloadCounter} seconds...` 
                      : "Download started successfully!"}
                  </h4>
                  <p className="text-slate-500 text-xs mt-0.5">
                    File: <span className="font-mono bg-slate-200/60 px-1 py-0.5 rounded text-[11px]">Vyaparix_Setup.exe</span> (approx. 1GB)
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-2 w-full sm:w-auto">
                <button
                  onClick={triggerDownload}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl gradient-brand hover:gradient-brand-hover text-white text-xs font-semibold font-display shadow-md shadow-indigo-100 hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  Download Again
                </button>
                {downloadTriggered && (
                  <p className="text-green-600 text-[11px] text-center font-medium animate-pulse">✓ Automatic hook fired</p>
                )}
              </div>
            </div>

            {/* Support section */}
            <div className="border-t border-slate-100 pt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div>
                  <h5 className="font-medium text-slate-800 text-sm">Need immediate setup assistance?</h5>
                  <p className="text-slate-500 text-xs mt-0.5">Our technical engineers can configure Vyaparix over AnyDesk/TeamViewer.</p>
                </div>
                <div className="flex gap-2.5 w-full sm:w-auto">
                  <a
                    href="https://wa.me/918347402205?text=Hi%20Vyaparix,%20I%20just%20downloaded%20the%20billing%20software.%20Can%20you%20help%20me%20set%20it%20up?"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-green-50 hover:bg-green-100 border border-green-200 text-green-700 text-xs font-semibold font-display rounded-lg flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-current" />
                    WhatsApp
                  </a>
                  <a
                    href="tel:+918347402205"
                    className="flex-1 sm:flex-none px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold font-display rounded-lg flex items-center justify-center gap-1.5 transition-all text-center"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    Call Support
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines on installation */}
          <div className="bg-gradient-to-b from-indigo-900 to-slate-900 text-slate-100 p-8 sm:p-12 md:col-span-12 lg:col-span-5 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-indigo-400" /> Quick Installation Steps
              </h3>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <span className="w-6 h-6 bg-indigo-800/80 rounded-full flex items-center justify-center text-xs font-bold font-mono">1</span>
                  <div>
                    <h5 className="font-semibold text-white text-sm">Open the Installer</h5>
                    <p className="text-indigo-200 text-xs mt-1 leading-relaxed">
                      Double-click on the downloaded <span className="font-mono bg-indigo-950/60 text-indigo-300 px-1 py-0.5 rounded text-[11px]">Vyaparix_Setup.exe</span> file from your web browser downloads menu.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="w-6 h-6 bg-indigo-800/80 rounded-full flex items-center justify-center text-xs font-bold font-mono">2</span>
                  <div>
                    <h5 className="font-semibold text-white text-sm">Accept Admin Prompt</h5>
                    <p className="text-indigo-200 text-xs mt-1 leading-relaxed">
                      If the Windows Defender prompt appears, click on <span className="font-semibold text-white">More Info</span> and then choose <span className="font-semibold text-white">Run Anyway</span>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <span className="w-6 h-6 bg-indigo-800/80 rounded-full flex items-center justify-center text-xs font-bold font-mono">3</span>
                  <div>
                    <h5 className="font-semibold text-white text-sm">Launch & Configure</h5>
                    <p className="text-indigo-200 text-xs mt-1 leading-relaxed">
                      Submit your business details inside the desktop app, upload your customized logo, and start billing!
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-indigo-950/50 flex flex-col gap-4 text-xs text-indigo-200">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-indigo-400" />
                <span>Compatible with Windows 10 & 11 (64-bit)</span>
              </div>
              <div className="flex items-center gap-3">
                <Smartphone className="w-4 h-4 text-indigo-400" />
                <span>Mobile companion sync available upon software registration</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="text-center text-slate-400 text-xs max-w-4xl mx-auto w-full mt-8">
        © 2026 Vyaparix Technologies. All rights reserved. Registered under MSME Govt. of India.
      </footer>
    </div>
  );
}

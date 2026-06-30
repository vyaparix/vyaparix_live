import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";

interface EEATLayoutProps {
  title: string;
  children: ReactNode;
}

export default function EEATLayout({ title, children }: EEATLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      <article className="prose prose-slate max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:text-slate-900 prose-p:text-slate-600 prose-p:leading-relaxed prose-a:text-indigo-600 prose-li:text-slate-600 prose-strong:text-slate-800">
        <h1 className="text-3xl sm:text-4xl font-black font-display text-slate-900 mb-8">{title}</h1>
        {children}
      </article>
    </div>
  );
}

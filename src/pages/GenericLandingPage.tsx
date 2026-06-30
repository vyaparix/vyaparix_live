import { useEffect } from "react";
import LandingPageTemplate from "./LandingPageTemplate";
import { landingPages, LANDING_PAGE_KEYS } from "./landingData";

interface Props {
  slug: string;
  setIsLeadModalOpen: (v: boolean) => void;
}

export default function GenericLandingPage({ slug, setIsLeadModalOpen }: Props) {
  const data = landingPages[slug];

  useEffect(() => {
    document.title = data?.title || "Vyaparix";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", data?.description || "");
  }, [slug, data]);

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <h1 className="text-3xl font-black font-display text-slate-900">Page Not Found</h1>
          <p className="text-slate-500 mt-2">This page is coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <LandingPageTemplate
      {...data}
      setIsLeadModalOpen={setIsLeadModalOpen}
    />
  );
}

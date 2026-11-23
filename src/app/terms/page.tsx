import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";
import { getServerCitiesLabel } from "@/lib/serverCities";

export const metadata: Metadata = {
  title: "Terms of Care & Clinical Disclaimer",
  description: "Terms of service, tele-rehabilitation consent, and clinical disclaimer for Runlife Physio.",
  alternates: { canonical: "/terms" },
};

export default async function TermsPage() {
  const cities = await getServerCitiesLabel();

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 space-y-6">
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F1D35]">
        Terms of Care &amp; Medical Disclaimer
      </h1>
      <p className="text-xs text-slate-500">Last Updated: November 2026</p>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 space-y-5 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-extrabold text-[#0F1D35]">
          1. Educational Content Disclaimer
        </h2>
        <p>
          All condition guides, interactive pain maps, and articles on{" "}
          <strong>{SITE_CONFIG.name}</strong> are prepared for patient education
          and do not constitute a formal medical diagnosis until an
          individualized 1-on-1 assessment is completed by a qualified
          physiotherapist or physician.
        </p>
        <h2 className="text-lg font-extrabold text-[#0F1D35]">
          2. Medical Emergencies
        </h2>
        <p>
          Runlife Physio is an appointment-based rehabilitation platform, not an
          emergency trauma service. If you experience sudden chest pain, acute
          stroke signs (FAST: Face drooping, Arm weakness, Speech difficulty),
          cauda equina red flags (loss of bladder/bowel control), or severe
          uncontrolled trauma, proceed to the nearest hospital emergency
          department immediately.
        </p>
        <h2 className="text-lg font-extrabold text-[#0F1D35]">
          3. Home Visits &amp; Tele-Rehabilitation Scheduling
        </h2>
        <p>
          Home Care across {cities} and Virtual Tele-Rehabilitation sessions
          are scheduled by mutual confirmation. Rescheduling requests made at
          least 4 hours prior to the slot help our MPT Specialists serve acute
          post-operative patients promptly.
        </p>
      </div>
    </div>
  );
}

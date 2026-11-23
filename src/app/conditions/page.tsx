import { getServerCitiesLabel } from "@/lib/serverCities";
import type { Metadata } from "next";
import { ConditionsExplorer } from "./ConditionsExplorer";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export async function generateMetadata(): Promise<Metadata> {
  const cities = await getServerCitiesLabel();
  return {
    title: "Conditions Treated — ACL, Spine, Stroke, Sports, Pediatric & Pelvic Rehab",
    description: `Browse 18+ physiotherapy conditions treated by Runlife Physio's dedicated MPT Specialists in ${cities}: ACL/PCL, TKR/THR, Sciatica, Stroke, GBS, Parkinson's, Running Injuries, CP, Autism & Pelvic Floor.`,
    alternates: { canonical: "/conditions" },
  };
}

export default function ConditionsPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Conditions Treated", path: "/conditions" },
        ])}
      />

      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            Evidence-Based Condition Library
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold max-w-4xl">
            Conditions We Diagnose &amp; Rehabilitate
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-slate-300 max-w-2xl">
            Search your condition or symptom to understand root causes, warning
            signs, our 3-phase REHAB • RECOVER • RUN roadmap, and the exact MPT
            Specialist assigned to your recovery.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
        <ConditionsExplorer />
      </div>
    </div>
  );
}

"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ArrowRight, Stethoscope } from "lucide-react";
import { CONDITIONS } from "@/data/conditions";
import { SPECIALTIES } from "@/data/specialties";
import { useBookingModal } from "@/context/BookingModalContext";

export function ConditionsExplorer() {
  const [queryText, setQueryText] = useState("");
  const [activeSpec, setActiveSpec] = useState("all");
  const { openBookingModal } = useBookingModal();

  const filtered = useMemo(() => {
    return CONDITIONS.filter((c) => {
      const matchesSpec = activeSpec === "all" || c.specialtySlug === activeSpec;
      const q = queryText.trim().toLowerCase();
      const matchesQuery =
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.bodyArea.toLowerCase().includes(q) ||
        c.commonSymptoms.some((s) => s.toLowerCase().includes(q));
      return matchesSpec && matchesQuery;
    });
  }, [queryText, activeSpec]);

  return (
    <div>
      {/* Search + Department Filter Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-xs space-y-4">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="search"
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Search condition or symptom (e.g., ACL, Sciatica, Stroke, GBS, Runner's Knee, Autism, Pelvic Floor)..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 pl-10 pr-4 py-3 text-sm text-slate-900 focus:border-[#136EA8] focus:bg-white focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveSpec("all")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
              activeSpec === "all"
                ? "bg-[#0F1D35] text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            All Conditions ({CONDITIONS.length})
          </button>
          {SPECIALTIES.map((s) => (
            <button
              key={s.slug}
              type="button"
              onClick={() => setActiveSpec(s.slug)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition cursor-pointer ${
                activeSpec === s.slug
                  ? "bg-[#136EA8] text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {s.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cond) => (
          <article
            key={cond.slug}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-[#136EA8] hover:shadow-lg transition"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-[11px] font-bold">
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-200 px-2.5 py-0.5 text-[#136EA8]">
                  <Stethoscope className="h-3 w-3" />
                  {cond.specialistBadge}
                </span>
                <span className="text-slate-400">{cond.bodyArea}</span>
              </div>

              <h2 className="mt-3 font-display text-lg sm:text-xl font-extrabold text-[#0F1D35]">
                <Link
                  href={`/conditions/${cond.slug}`}
                  className="hover:text-[#136EA8]"
                >
                  {cond.title}
                </Link>
              </h2>

              <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                {cond.summary}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
              <Link
                href={`/conditions/${cond.slug}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#136EA8] hover:underline"
              >
                Read Rehab Guide <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    specialty: cond.specialtyLabel,
                    conditionOrPain: cond.title,
                    source: `Conditions Hub (${cond.shortTitle})`,
                  })
                }
                className="rounded-lg bg-[#0F1D35] px-3 py-1.5 text-xs font-bold text-white hover:bg-[#136EA8] transition cursor-pointer"
              >
                Book Rehab
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

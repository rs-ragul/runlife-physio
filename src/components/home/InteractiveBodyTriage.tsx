"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  AlertCircle,
  ArrowRight,
  Stethoscope,
  Brain,
  Baby,
  CheckCircle2,
  Activity,
  ChevronRight,
} from "lucide-react";
import { BODY_REGIONS } from "@/data/bodyMap";
import { SPECIALTIES } from "@/data/specialties";
import { useBookingModal } from "@/context/BookingModalContext";

export function InteractiveBodyTriage() {
  const [selectedId, setSelectedId] = useState<string>("knee-acl");
  const resultCardRef = useRef<HTMLDivElement | null>(null);
  const { openBookingModal } = useBookingModal();

  const current =
    BODY_REGIONS.find((r) => r.id === selectedId) || BODY_REGIONS[0];
  const matchedSpecialty = SPECIALTIES.find(
    (s) => s.slug === current.specialtySlug
  );

  function selectRegion(id: string) {
    setSelectedId(id);
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setTimeout(() => {
        resultCardRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 60);
    }
  }

  return (
    <section
      id="pain-finder"
      className="py-14 lg:py-22 bg-slate-50 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#136EA8]">
            <Activity className="h-3.5 w-3.5" />
            Find Care by Area or Condition
          </span>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-[#0F1D35]">
            Where Do You Need Help?
          </h2>
          <p className="mt-2 text-xs sm:text-base text-slate-600">
            Select an area or condition below to see common symptoms we treat
            and book a consultation with the right physiotherapist.
          </p>
        </div>

        <div className="mt-6 lg:mt-9 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Clean Area & Specialty Selector List (No SVG Doll!) */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-3.5 sm:p-5 shadow-xs">
            <div className="px-2 pb-2.5 mb-2 border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-500">
              Select Pain Area or Specialty
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {BODY_REGIONS.map((reg) => {
                const active = selectedId === reg.id;
                const Icon =
                  reg.id === "neuro-system"
                    ? Brain
                    : reg.id === "pediatric-growth"
                      ? Baby
                      : Activity;

                return (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => selectRegion(reg.id)}
                    className={`flex items-center justify-between gap-2 rounded-2xl border px-3.5 py-3 text-left transition cursor-pointer min-h-[48px] ${
                      active
                        ? "border-[#0F1D35] bg-[#0F1D35] text-white shadow-sm"
                        : "border-slate-200/90 bg-slate-50/70 text-slate-800 hover:border-[#136EA8] hover:bg-white"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          active ? "text-[#9AD634]" : "text-[#136EA8]"
                        }`}
                      />
                      <span className="text-xs sm:text-sm font-bold leading-snug truncate">
                        {reg.label}
                      </span>
                    </span>
                    <ChevronRight
                      className={`hidden sm:block h-4 w-4 shrink-0 ${
                        active ? "text-[#9AD634]" : "text-slate-400"
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Matched Specialist & Condition Details Card */}
          <div
            ref={resultCardRef}
            className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm flex flex-col justify-between scroll-mt-24"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-[#136EA8]">
                  <Stethoscope className="h-3.5 w-3.5" />
                  {current.specialistBadge}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Available: Home Visit (Bangalore &amp; Salem) • Online
                </span>
              </div>

              <h3 className="mt-3.5 font-display text-xl sm:text-3xl font-extrabold text-[#0F1D35]">
                {current.headline}
              </h3>
              <p className="mt-2 text-xs sm:text-base leading-relaxed text-slate-600">
                {current.description}
              </p>

              {/* Related Condition Deep Links */}
              <div className="mt-5">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                  Conditions We Treat in This Area
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {current.commonConditions.map((cond) => (
                    <Link
                      key={cond.slug + cond.name}
                      href={`/conditions/${cond.slug}`}
                      className="group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 min-h-[44px] py-2.5 text-xs sm:text-sm font-semibold text-slate-800 hover:border-[#136EA8] hover:bg-sky-50/50 transition"
                    >
                      <span className="inline-flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-[#85B925] shrink-0" />
                        <span>{cond.name}</span>
                      </span>
                      <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#136EA8] shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Signs to Consult */}
              <div className="mt-5 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                  When to Consult a Physiotherapist
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {current.watchSigns.map((sign) => (
                    <span
                      key={sign}
                      className="rounded-lg bg-white border border-amber-200 px-2.5 py-1 text-xs font-medium text-slate-700"
                    >
                      {sign}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Conversion Row */}
            <div className="mt-6 pt-5 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    specialty: matchedSpecialty?.title || SPECIALTIES[0].title,
                    conditionOrPain: `${current.label} — ${current.headline}`,
                    source: `Condition Finder (${current.label})`,
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] px-6 min-h-[48px] text-sm font-extrabold text-white shadow-md hover:bg-[#136EA8] transition cursor-pointer"
              >
                Book for Consultation
                <ArrowRight className="h-4 w-4 text-[#9AD634]" />
              </button>

              <Link
                href={`/services/${current.specialtySlug}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 min-h-[48px] text-xs sm:text-sm font-bold text-slate-700 hover:border-slate-900 transition"
              >
                View Specialty Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

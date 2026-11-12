"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import {
  Sparkles,
  AlertCircle,
  ArrowRight,
  Stethoscope,
  Brain,
  Baby,
  CheckCircle2,
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

  const anatomicalRegions = BODY_REGIONS.filter(
    (r) => r.category === "anatomical"
  );
  const specialistTracks = BODY_REGIONS.filter(
    (r) => r.category === "specialist-track"
  );

  function selectRegion(id: string, scrollOnMobile = false) {
    setSelectedId(id);
    if (scrollOnMobile && typeof window !== "undefined" && window.innerWidth < 1024) {
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
      className="py-14 lg:py-24 bg-slate-50 border-b border-slate-200/80 scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#136EA8]">
            <Sparkles className="h-3.5 w-3.5" />
            Interactive Clinical Triage
          </span>
          <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-[#0F1D35]">
            Tell Us Where It Hurts — Meet Your Exact MPT Specialist
          </h2>
          <p className="mt-2 text-xs sm:text-base text-slate-600">
            Tap a body area or specialized track below to view matching
            conditions, warning signs, and book the right MPT Specialist.
          </p>
        </div>

        {/* Mobile Quick Horizontal Pill Selector (Instant Thumb Access!) */}
        <div className="lg:hidden mt-5 -mx-4 px-4 overflow-x-auto pb-2">
          <div className="flex gap-2 w-max">
            {BODY_REGIONS.map((reg) => {
              const active = selectedId === reg.id;
              return (
                <button
                  key={reg.id}
                  type="button"
                  onClick={() => selectRegion(reg.id, false)}
                  className={`rounded-full px-3.5 min-h-[38px] text-xs font-bold whitespace-nowrap transition ${
                    active
                      ? "bg-[#0F1D35] text-[#9AD634] shadow-sm"
                      : "bg-white border border-slate-200 text-slate-700"
                  }`}
                >
                  {reg.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-6 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left: Interactive SVG Anatomical Map */}
          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-[#0F1D35] p-5 sm:p-6 text-white shadow-xl flex flex-col justify-between">
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-lime-300">
                Tap Any Hotspot on Body Map
              </span>
              <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] font-semibold text-slate-200">
                {current.label}
              </span>
            </div>

            {/* SVG Human Silhouette with Large 44px Equivalent Touch Targets */}
            <div className="relative mx-auto my-3 w-full max-w-[235px] sm:max-w-[265px]">
              <svg
                viewBox="0 0 280 430"
                className="w-full h-auto select-none"
                role="img"
                aria-label="Interactive human body pain map"
              >
                <defs>
                  <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1E3A5F" />
                    <stop offset="100%" stopColor="#142844" />
                  </linearGradient>
                </defs>

                <line x1="140" y1="12" x2="140" y2="418" stroke="rgba(148,163,184,0.2)" strokeDasharray="4 4" />
                <line x1="30" y1="108" x2="250" y2="108" stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
                <line x1="30" y1="222" x2="250" y2="222" stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />
                <line x1="30" y1="305" x2="250" y2="305" stroke="rgba(148,163,184,0.15)" strokeDasharray="3 3" />

                <circle
                  cx="140"
                  cy="42"
                  r="24"
                  fill="url(#bodyGrad)"
                  stroke="#38BDF8"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
                <path
                  d="M130 66 L150 66 L154 84 L192 94 C202 97 208 106 208 118 L214 198 C214 205 207 209 201 207 L196 198 L188 128 L176 128 L174 218 L176 305 L170 395 C169 404 160 409 152 408 L148 395 L146 305 L143 240 L137 240 L134 305 L132 395 L128 408 C120 409 111 404 110 395 L104 305 L106 218 L104 128 L92 128 L84 198 L79 207 C73 209 66 205 66 198 L72 118 C72 106 78 97 88 94 L126 84 Z"
                  fill="url(#bodyGrad)"
                  stroke="#38BDF8"
                  strokeOpacity="0.45"
                  strokeWidth="1.5"
                />
                <line
                  x1="140"
                  y1="74"
                  x2="140"
                  y2="212"
                  stroke="#85B925"
                  strokeOpacity="0.65"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="3 5"
                />

                {anatomicalRegions.map((reg) => {
                  if (!reg.hotspot) return null;
                  const isSelected = selectedId === reg.id;
                  return (
                    <g
                      key={reg.id}
                      onClick={() => selectRegion(reg.id, true)}
                      className="cursor-pointer"
                    >
                      {/* Invisible generous finger-tap hit area */}
                      <circle
                        cx={reg.hotspot.cx}
                        cy={reg.hotspot.cy}
                        r={24}
                        fill="transparent"
                      />
                      <circle
                        cx={reg.hotspot.cx}
                        cy={reg.hotspot.cy}
                        r={isSelected ? 17 : 12}
                        fill={isSelected ? "#85B925" : "#136EA8"}
                        fillOpacity={isSelected ? 0.32 : 0.25}
                      />
                      <circle
                        cx={reg.hotspot.cx}
                        cy={reg.hotspot.cy}
                        r={isSelected ? 9 : 7}
                        fill={isSelected ? "#9AD634" : "#38BDF8"}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Region Buttons + Neuro/Pediatric Buttons */}
            <div className="space-y-2.5">
              <div className="hidden sm:flex flex-wrap gap-1.5">
                {anatomicalRegions.map((reg) => (
                  <button
                    key={reg.id}
                    type="button"
                    onClick={() => selectRegion(reg.id, true)}
                    className={`rounded-lg px-2.5 py-1.5 text-xs font-semibold transition cursor-pointer ${
                      selectedId === reg.id
                        ? "bg-[#85B925] text-slate-950 font-bold shadow-sm"
                        : "bg-white/10 text-slate-200 hover:bg-white/20"
                    }`}
                  >
                    {reg.label}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                {specialistTracks.map((track) => {
                  const Icon = track.id === "neuro-system" ? Brain : Baby;
                  const active = selectedId === track.id;
                  return (
                    <button
                      key={track.id}
                      type="button"
                      onClick={() => selectRegion(track.id, true)}
                      className={`flex items-center justify-center gap-1.5 rounded-xl px-3 min-h-[42px] text-xs font-bold transition cursor-pointer ${
                        active
                          ? "bg-[#85B925] text-slate-950"
                          : "border border-white/15 bg-white/5 text-white hover:bg-white/15"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{track.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Live Specialist Diagnostic & Routing Panel */}
          <div
            ref={resultCardRef}
            className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm flex flex-col justify-between scroll-mt-24"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-bold text-[#136EA8]">
                  <Stethoscope className="h-3.5 w-3.5" />
                  Assigned: {current.specialistBadge}
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Best Mode: {current.recommendedMode}
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
                  Related Conditions (Tap for Clinical Guide)
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

              {/* Clinical Watch Signs */}
              <div className="mt-5 rounded-2xl border border-amber-200/80 bg-amber-50/60 p-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-900">
                  <AlertCircle className="h-4 w-4 text-amber-600 shrink-0" />
                  Signs to Book an Evaluation Soon
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
                    source: `Interactive Body Map (${current.label})`,
                  })
                }
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] px-6 min-h-[48px] text-sm font-extrabold text-white shadow-md hover:bg-[#136EA8] transition cursor-pointer"
              >
                Book Specialist for {current.label}
                <ArrowRight className="h-4 w-4 text-[#9AD634]" />
              </button>

              <Link
                href={`/services/${current.specialtySlug}`}
                className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-4 min-h-[48px] text-xs sm:text-sm font-bold text-slate-700 hover:border-slate-900 transition"
              >
                Explore Department →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

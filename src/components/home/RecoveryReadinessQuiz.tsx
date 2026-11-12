"use client";

import React, { useState } from "react";
import { ClipboardCheck, RotateCcw, ArrowRight, Sparkles } from "lucide-react";
import { SPECIALTIES } from "@/data/specialties";
import { useBookingModal } from "@/context/BookingModalContext";
import { useSiteCms } from "@/context/SiteSettingsContext";

const STEP_1_OPTIONS = [
  {
    id: "ortho",
    label: "Joint, Spine, Knee/Shoulder Pain or Surgery (TKR/ACL/Fracture)",
    specIndex: 0,
  },
  {
    id: "neuro",
    label: "Stroke, Parkinson's, Spinal Cord, GBS, MS or Nerve Numbness",
    specIndex: 1,
  },
  {
    id: "sports",
    label: "Running Pain, Sports Strain/Tear or Return-to-Sport S&C",
    specIndex: 2,
  },
  {
    id: "pediatric",
    label: "Child Motor Milestones, Cerebral Palsy, Autism Motor or GDD",
    specIndex: 3,
  },
  {
    id: "womens",
    label: "Pregnancy Pain, Postpartum C-Section/Core or Pelvic Floor",
    specIndex: 4,
  },
];

const STEP_2_OPTIONS = [
  {
    id: "immobile",
    label: "Difficult to travel / Post-op / Senior / Child comfort needed",
    recommendedMode: "Home Care (Bangalore)",
  },
  {
    id: "busy-remote",
    label: "Can move comfortably at home; prefer guided live video or outstation",
    recommendedMode: "Virtual Tele-Rehab",
  },
  {
    id: "second-opinion",
    label: "Need diagnostic clarity, MRI/X-ray review & recovery roadmap first",
    recommendedMode: "Online Consultation",
  },
  {
    id: "athletic",
    label: "Active athlete seeking hands-on manual care & Return-to-Sport drills",
    recommendedMode: "By-Appointment Visit",
  },
];

export function RecoveryReadinessQuiz() {
  const { settings } = useSiteCms();
  const [concernIdx, setConcernIdx] = useState<number | null>(null);
  const [mobilityIdx, setMobilityIdx] = useState<number | null>(null);
  const { openBookingModal } = useBookingModal();

  if (!settings.showSmartCareQuiz) return null;

  const chosenConcern = concernIdx !== null ? STEP_1_OPTIONS[concernIdx] : null;
  const chosenMobility =
    mobilityIdx !== null ? STEP_2_OPTIONS[mobilityIdx] : null;
  const matchedSpec = chosenConcern
    ? SPECIALTIES[chosenConcern.specIndex]
    : null;

  return (
    <section className="py-14 lg:py-20 bg-gradient-to-b from-sky-50/60 to-white border-b border-slate-200/70">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-sky-200/80 bg-white p-5 sm:p-10 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-wider text-[#136EA8]">
                <ClipboardCheck className="h-4 w-4 text-[#85B925]" />
                30-Second Smart Care Finder
              </span>
              <h2 className="mt-1 font-display text-xl sm:text-3xl font-extrabold text-[#0F1D35]">
                Find Your Ideal MPT Specialist &amp; Care Format in 2 Taps
              </h2>
            </div>
            {(concernIdx !== null || mobilityIdx !== null) && (
              <button
                type="button"
                onClick={() => {
                  setConcernIdx(null);
                  setMobilityIdx(null);
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Reset
              </button>
            )}
          </div>

          <div className="mt-5">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Step 1: Select Primary Concern
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {STEP_1_OPTIONS.map((opt, i) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setConcernIdx(i)}
                  className={`rounded-xl border p-3.5 text-left text-xs sm:text-sm font-semibold transition cursor-pointer min-h-[48px] ${
                    concernIdx === i
                      ? "border-[#136EA8] bg-[#136EA8] text-white shadow-sm"
                      : "border-slate-200 bg-slate-50/70 text-slate-800 hover:border-sky-300 hover:bg-white"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {concernIdx !== null && (
            <div className="mt-5 pt-5 border-t border-slate-100">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Step 2: Select Preferred Convenience / Mobility Stage
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STEP_2_OPTIONS.map((opt, i) => (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setMobilityIdx(i)}
                    className={`rounded-xl border p-3.5 text-left text-xs sm:text-sm font-semibold transition cursor-pointer min-h-[48px] ${
                      mobilityIdx === i
                        ? "border-[#0F1D35] bg-[#0F1D35] text-white shadow-sm"
                        : "border-slate-200 bg-slate-50/70 text-slate-800 hover:border-slate-400 hover:bg-white"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedSpec && chosenMobility && (
            <div className="mt-6 rounded-2xl border-2 border-[#85B925] bg-gradient-to-r from-lime-50/80 via-white to-sky-50/70 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#0F1D35] px-3 py-0.5 text-[11px] font-bold text-[#9AD634]">
                    <Sparkles className="h-3 w-3" />
                    Recommended Clinical Match
                  </span>
                  <h3 className="mt-2 font-display text-lg sm:text-xl font-extrabold text-[#0F1D35]">
                    {matchedSpec.specialistCredential} •{" "}
                    <span className="text-[#136EA8]">
                      {chosenMobility.recommendedMode}
                    </span>
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600">
                    {matchedSpec.specialistGuarantee}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      specialty: matchedSpec.title,
                      careMode: chosenMobility.recommendedMode,
                      conditionOrPain: chosenConcern?.label,
                      source: "Smart Care Finder Quiz",
                    })
                  }
                  className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] px-6 min-h-[48px] text-sm font-extrabold text-white hover:bg-[#136EA8] transition cursor-pointer"
                >
                  Book This Plan
                  <ArrowRight className="h-4 w-4 text-[#9AD634]" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

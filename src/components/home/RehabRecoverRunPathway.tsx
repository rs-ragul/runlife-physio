"use client";

import React, { useState } from "react";
import { ShieldAlert, TrendingUp, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";

const PHASES = [
  {
    step: "01",
    code: "REHAB",
    subtitle: "Root-Cause Diagnosis, Pain Relief & Tissue Protection",
    icon: ShieldAlert,
    color: "text-sky-400",
    pillBg: "bg-sky-500/20 text-sky-300 border-sky-400/30",
    summary:
      "Most failed treatments only chase where it hurts. In Phase 01, your MPT Specialist performs a full kinetic-chain & neurological evaluation, calms acute inflammation, unlocks stiff joints manually, and reactivates inhibited muscles.",
    deliverables: [
      "45–60 min 1-on-1 biomechanical & neurological baseline evaluation",
      "Hands-on manual therapy, joint mobilization & neurodynamic release",
      "Clear explanation of WHAT is injured, WHY it happened & realistic timeline",
      "Immediate home pain-modulation & safe daily movement modifications",
    ],
    benchmark: "Exit Gate: Quiet swelling/pain, restored baseline joint motion & confident pain-free daily movements.",
  },
  {
    step: "02",
    code: "RECOVER",
    subtitle: "Graded Progressive Loading, Neuromuscular Control & Mobility",
    icon: TrendingUp,
    color: "text-lime-400",
    pillBg: "bg-lime-500/20 text-lime-300 border-lime-400/30",
    summary:
      "Being pain-free on a sofa doesn't mean tissues are healed! Phase 02 applies progressive mechanical loading—rebuilding tendon collagen, symmetrical single-leg strength, balance reflexes, and core stability.",
    deliverables: [
      "Week-by-week graded resistance, eccentric tendon & balance programming",
      "Gait, stair-climbing, posture & functional movement retraining",
      "Flexible care: combine Home Visits (Bangalore & Salem) with Online Tele-Rehab",
      "Bi-weekly objective range-of-motion and strength progress tracking",
    ],
    benchmark: "Exit Gate: >85–90% bilateral strength symmetry, zero compensatory limping & full work/home stamina.",
  },
  {
    step: "03",
    code: "RUN",
    subtitle: "Return-to-Sport, Running Biomechanics & Lifelong Resilience",
    icon: Zap,
    color: "text-amber-300",
    pillBg: "bg-amber-400/20 text-amber-200 border-amber-300/30",
    summary:
      "Whether 'RUN' means lacing up for a Bangalore 10K marathon, returning to football/badminton, walking independently after a stroke, or chasing your toddler pain-free—Phase 03 makes you stronger than before injury.",
    deliverables: [
      "Criteria-based Return-to-Sport (RTS) & running gait cadence optimization",
      "Plyometric shock absorption, agility ladder & Strength & Conditioning (S&C)",
      "Self-maintenance blueprint so flare-ups never bring you back to square one",
      "Long-term athletic & active-lifestyle performance partnership",
    ],
    benchmark: "Exit Gate: 100% goal achievement, passed functional benchmarks & independent relapse-proof resilience.",
  },
];

export function RehabRecoverRunPathway() {
  const [activeIdx, setActiveIdx] = useState(0);
  const { openBookingModal } = useBookingModal();
  const active = PHASES[activeIdx];

  return (
    <section className="py-16 lg:py-24 bg-[#0B1629] bg-navy-grid text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-block rounded-full border border-lime-400/30 bg-lime-400/10 px-3.5 py-1 text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            The Runlife Clinical Methodology
          </span>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl font-extrabold">
            A Measured 3-Phase Journey:{" "}
            <span className="text-sky-400">REHAB</span> •{" "}
            <span className="text-[#9AD634]">RECOVER</span> •{" "}
            <span className="text-white">RUN</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300">
            No endless passive machine sessions. Every patient moves through
            transparent, criteria-driven clinical milestones.
          </p>
        </div>

        {/* Phase Tabs */}
        <div className="mt-10 grid grid-cols-3 gap-3 max-w-3xl mx-auto">
          {PHASES.map((phase, idx) => {
            const Icon = phase.icon;
            const isSelected = idx === activeIdx;
            return (
              <button
                key={phase.code}
                type="button"
                onClick={() => setActiveIdx(idx)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 rounded-2xl border px-4 py-4 text-center sm:text-left transition cursor-pointer ${
                  isSelected
                    ? "border-[#85B925] bg-white text-[#0F1D35] shadow-xl"
                    : "border-white/15 bg-white/5 text-slate-200 hover:bg-white/10"
                }`}
              >
                <Icon
                  className={`h-5 w-5 shrink-0 ${
                    isSelected ? "text-[#136EA8]" : phase.color
                  }`}
                />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">
                    Phase {phase.step}
                  </div>
                  <div className="font-display text-sm sm:text-lg font-extrabold">
                    {phase.code}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Detail Card */}
        <div className="mt-8 rounded-3xl border border-white/15 bg-white/5 backdrop-blur-xs p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span
                className={`inline-block rounded-full border px-3 py-1 text-xs font-bold ${active.pillBg}`}
              >
                Phase {active.step} — {active.code}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
                {active.subtitle}
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-slate-300">
                {active.summary}
              </p>

              <div className="rounded-2xl border border-lime-400/25 bg-lime-400/10 p-4 text-xs sm:text-sm text-lime-200 font-medium">
                {active.benchmark}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-2xl bg-[#0F1D35] border border-white/10 p-6 space-y-4">
              <div className="text-xs font-bold uppercase tracking-wider text-sky-300">
                What Happens in Phase {active.step}
              </div>
              <ul className="space-y-3">
                {active.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#9AD634] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    source: `Rehab-Recover-Run Pathway (Phase ${active.code})`,
                  })
                }
                className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-[#85B925] px-5 py-3 text-xs sm:text-sm font-extrabold text-slate-950 hover:bg-[#9AD634] transition cursor-pointer"
              >
                Book for Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2, Home, Video, MonitorSmartphone, CalendarClock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { OpenModalButton } from "@/components/booking/OpenModalButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { getServerCitiesLabel } from "@/lib/serverCities";

export async function generateMetadata(): Promise<Metadata> {
  const cities = await getServerCitiesLabel();
  return {
    title: `Home Care Physiotherapy, Virtual Tele-Rehab & Online Consultation | ${cities}`,
    description: `Compare Runlife Physio's 4 care modes: Doorstep Home Physiotherapy across ${cities}, Live Virtual Tele-Rehabilitation, Online Video Consultation, and Appointment-Based Visits.`,
    alternates: { canonical: "/care-modes" },
  };
}

export default async function CareModesPage() {
  const cities = await getServerCitiesLabel();
  const detailedModes = [
    {
      ...SITE_CONFIG.careModes[0],
      icon: Home,
      image: "/images/neuro-gait-balance-rehab.jpg",
      steps: [
        "MPT Specialist arrives at your home in " + cities + " with sterile portable assessment & rehab gear.",
        "45–60 minute 1-on-1 manual therapy, mobilization, gait/transfer training & ergonomic audit of your bed/chair/workstation.",
        "Digital exercise sheet & caregiver guidance shared after session.",
      ],
    },
    {
      ...SITE_CONFIG.careModes[1],
      icon: Video,
      image: "/images/tele-rehab-online-consultation.jpg",
      steps: [
        "Join a private HD video link from your laptop or phone—anywhere in " + cities + ", India, or abroad.",
        "Live camera-guided posture, range-of-motion & functional movement assessment.",
        "Supervised real-time exercise sets with form correction and weekly load progression.",
      ],
    },
    {
      ...SITE_CONFIG.careModes[2],
      icon: MonitorSmartphone,
      image: "/images/ortho-manual-knee-therapy.jpg",
      steps: [
        "Share MRI, X-ray, or surgical discharge reports ahead of your 1-on-1 specialist call.",
        "Receive a crystal-clear biomechanical explanation, red-flag check & second opinion.",
        "Walk away with a structured REHAB • RECOVER • RUN roadmap.",
      ],
    },
    {
      ...SITE_CONFIG.careModes[3],
      icon: CalendarClock,
      image: "/images/sports-agility-return-to-run.jpg",
      steps: [
        "Strictly pre-booked appointment slots—zero crowded waiting rooms.",
        "Hands-on orthopedic & sports manual therapy, taping, agility ladder & hop testing.",
        "Objective Return-to-Sport & running cadence clearance.",
      ],
    },
  ];

  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Care Delivery Modes", path: "/care-modes" },
        ])}
      />

      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            Available Online • Home Care • Tele-Rehab • By Appointment
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold max-w-4xl">
            4 Seamless Ways to Experience Runlife Specialist Physiotherapy
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-slate-300 max-w-3xl">
            Start with Home Visits after surgery, transition to Virtual
            Tele-Rehab on busy workweeks, and complete Return-to-Sport testing
            by appointment—all under one coordinated clinical record.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-8">
        {detailedModes.map((mode, idx) => {
          const Icon = mode.icon;
          return (
            <div
              key={mode.id}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs grid grid-cols-1 lg:grid-cols-12"
            >
              <div
                className={`relative min-h-[260px] lg:col-span-5 ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={mode.image}
                  alt={mode.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-[#136EA8]">
                      <Icon className="h-3.5 w-3.5" />
                      {mode.badge}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      Session Duration: {mode.duration}
                    </span>
                  </div>

                  <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
                    {mode.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600">
                    {mode.summary}
                  </p>

                  <div className="mt-5 space-y-2">
                    {mode.steps.map((st) => (
                      <div
                        key={st}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#85B925] shrink-0 mt-0.5" />
                        <span>{st}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                  <span className="text-xs text-slate-500">
                    <strong className="text-slate-800">Best suited for:</strong>{" "}
                    {mode.bestFor}
                  </span>
                  <OpenModalButton
                    prefill={{
                      careMode: mode.shortTitle,
                      source: `Care Modes Page (${mode.shortTitle})`,
                    }}
                    className="rounded-xl bg-[#0F1D35] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#136EA8] transition cursor-pointer shrink-0"
                  >
                    Book {mode.shortTitle} →
                  </OpenModalButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

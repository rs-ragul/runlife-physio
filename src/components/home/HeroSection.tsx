"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheck,
  Activity,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Video,
  Home,
  ArrowRight,
} from "lucide-react";
import { useSiteCms } from "@/context/SiteSettingsContext";
import { useBookingModal } from "@/context/BookingModalContext";

export function HeroSection() {
  const { settings } = useSiteCms();
  const { openBookingModal } = useBookingModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/35 to-slate-50 bg-clinical-grid pt-6 pb-12 sm:pt-10 sm:pb-18 lg:pt-12 lg:pb-22 border-b border-slate-200/70">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-sky-200/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-6 h-64 w-64 rounded-full bg-lime-200/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-1.5 shadow-2xs">
              <span className="rounded-full bg-[#0F1D35] px-2.5 py-0.5 text-[10px] sm:text-[11px] font-extrabold tracking-widest text-[#9AD634]">
                {settings.tagline}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-700">
                {settings.heroBadgeText}
              </span>
            </div>

            <h1 className="font-display text-[1.95rem] sm:text-5xl xl:text-[3.3rem] font-extrabold tracking-tight text-[#0F1D35] leading-[1.13]">
              {settings.heroTitlePrimary}{" "}
              <span className="text-[#136EA8]">
                {settings.heroTitleHighlight}
              </span>
            </h1>

            <p className="text-sm sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
              {settings.heroSubtitle}
            </p>

            {/* Care Mode Quick Badges */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-2xs">
                <Home className="h-3.5 w-3.5 text-[#85B925]" />
                Home Care ({settings.primaryCity})
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-2xs">
                <Video className="h-3.5 w-3.5 text-[#136EA8]" />
                Virtual Tele-Rehab
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 shadow-2xs">
                <MapPin className="h-3.5 w-3.5 text-[#136EA8]" />
                Online &amp; By Appointment
              </span>
            </div>

            {/* Primary & Secondary CTAs (Thumb-Friendly 50px Height on Mobile) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => openBookingModal({ source: "Hero Primary CTA" })}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#0F1D35] px-6 min-h-[52px] text-sm sm:text-base font-extrabold text-white shadow-xl shadow-slate-900/15 hover:bg-[#136EA8] active:scale-[0.99] transition cursor-pointer"
              >
                <CalendarCheck className="h-5 w-5 text-[#9AD634]" />
                {settings.primaryCtaText}
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#pain-finder"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 bg-white px-5 min-h-[50px] text-sm sm:text-base font-bold text-slate-800 hover:border-[#136EA8] hover:text-[#136EA8] active:bg-slate-50 transition"
              >
                <Activity className="h-5 w-5 text-[#85B925]" />
                Where Does It Hurt?
              </a>
            </div>

            {/* Dynamic Trust Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 pt-3 border-t border-slate-200/80">
              {settings.heroStats.map((stat, idx) => (
                <div
                  key={`${stat.label}-${idx}`}
                  className="rounded-xl border border-slate-200/80 bg-white/95 px-3 py-2.5 sm:px-3.5 sm:py-3"
                >
                  <div className="font-display text-lg sm:text-2xl font-extrabold text-[#0F1D35]">
                    {stat.value}
                  </div>
                  <div className="text-[11px] sm:text-xs font-medium text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Clinical Bento Visuals */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl aspect-[16/11] sm:aspect-[4/3]">
                <Image
                  src="/images/ortho-acl-postop-rehab.jpg"
                  alt="Runlife Physio MPT Orthopedic and ACL knee assessment"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D35]/85 via-transparent to-transparent" />
                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <span className="inline-block rounded-md bg-[#85B925] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-950">
                    Led by {settings.founderName}
                  </span>
                  <p className="mt-1 text-xs sm:text-sm font-bold">
                    Root-Cause Biomechanical &amp; Post-Op Rehabilitation
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                <Link
                  href="/services/sports-running-rehabilitation"
                  className="group relative overflow-hidden rounded-2xl border-2 border-white shadow-lg aspect-[4/3]"
                >
                  <Image
                    src="/images/sports-agility-return-to-run.jpg"
                    alt="Sports and Running Rehabilitation at Runlife Physio"
                    fill
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    className="object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-lime-300">
                      MPT Sports
                    </div>
                    <div className="text-xs font-bold leading-snug">
                      Running &amp; Return-to-Sport
                    </div>
                  </div>
                </Link>

                <Link
                  href="/services/neurological-rehabilitation"
                  className="group relative overflow-hidden rounded-2xl border-2 border-white shadow-lg aspect-[4/3]"
                >
                  <Image
                    src="/images/neuro-gait-balance-rehab.jpg"
                    alt="Neurological Gait and Balance Rehabilitation"
                    fill
                    sizes="(max-width: 1024px) 50vw, 22vw"
                    className="object-cover object-top group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                      MPT Neuro • Pediatric • OBG
                    </div>
                    <div className="text-xs font-bold leading-snug">
                      Home Neuro &amp; Milestone Care
                    </div>
                  </div>
                </Link>
              </div>

              <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-white px-4 py-3 shadow-md">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#136EA8]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="text-xs truncate">
                    <div className="font-bold text-slate-900">
                      Specialist-Matched Guarantee
                    </div>
                    <div className="text-slate-500 truncate">
                      Ortho • Neuro • Sports • Pediatric • Women&apos;s Health
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-lime-50 px-2.5 py-1 text-[11px] font-bold text-lime-800 border border-lime-200 shrink-0">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#85B925]" />
                  Verified MPT
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

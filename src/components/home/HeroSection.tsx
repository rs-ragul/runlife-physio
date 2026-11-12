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
import { SITE_CONFIG } from "@/config/site";
import { useBookingModal } from "@/context/BookingModalContext";

export function HeroSection() {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50/35 to-slate-50 bg-clinical-grid pt-8 pb-16 lg:pt-12 lg:pb-24 border-b border-slate-200/70">
      {/* Subtle decorative radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-sky-200/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full bg-lime-200/25 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Clinical Authority & Conversion */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-sky-200 bg-white px-3.5 py-1.5 shadow-xs">
              <span className="rounded-full bg-[#0F1D35] px-2.5 py-0.5 text-[11px] font-extrabold tracking-widest text-[#9AD634]">
                REHAB • RECOVER • RUN
              </span>
              <span className="text-xs font-semibold text-slate-700">
                Bangalore&apos;s Multi-Specialty MPT Physiotherapy Platform
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl xl:text-[3.35rem] font-extrabold tracking-tight text-[#0F1D35] leading-[1.12]">
              Specialized{" "}
              <span className="text-[#136EA8]">MPT Physiotherapy</span> Team —
              Under One Platform.
            </h1>

            <p className="text-base sm:text-lg leading-relaxed text-slate-600 max-w-2xl">
              Don&apos;t settle for one-size-fits-all therapy. Led by{" "}
              <strong className="text-slate-900">{SITE_CONFIG.founder.name}</strong>,
              every Ortho, Neuro, Sports, Pediatric, and Women&apos;s Health
              condition at Runlife Physio is treated by a dedicated{" "}
              <strong className="text-[#136EA8]">
                Master of Physiotherapy (MPT) Specialist
              </strong>{" "}
              — at your Bangalore home, live via Tele-Rehab, or by appointment.
            </p>

            {/* Care Mode Quick Badges */}
            <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-2xs">
                <Home className="h-3.5 w-3.5 text-[#85B925]" />
                Home Care Across Bangalore
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-2xs">
                <Video className="h-3.5 w-3.5 text-[#136EA8]" />
                Virtual / Tele-Rehabilitation
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-2xs">
                <MapPin className="h-3.5 w-3.5 text-[#136EA8]" />
                Online &amp; Appointment Based
              </span>
            </div>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={() => openBookingModal({ source: "Hero Primary CTA" })}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#0F1D35] px-7 py-4 text-sm sm:text-base font-extrabold text-white shadow-xl shadow-slate-900/15 hover:bg-[#136EA8] transition cursor-pointer"
              >
                <CalendarCheck className="h-5 w-5 text-[#9AD634]" />
                Book MPT Specialist Assessment
                <ArrowRight className="h-4 w-4" />
              </button>

              <a
                href="#pain-finder"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-300 bg-white px-6 py-4 text-sm sm:text-base font-bold text-slate-800 hover:border-[#136EA8] hover:text-[#136EA8] transition"
              >
                <Activity className="h-5 w-5 text-[#85B925]" />
                Where Does It Hurt?
              </a>
            </div>

            {/* Trust Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200/80">
              {[
                { value: "5 MPT", label: "Specialist Departments" },
                { value: "100%", label: "Domain-Matched Therapists" },
                { value: "4 Modes", label: "Home • Tele • Online • Clinic" },
                { value: "7am–9pm", label: "Bangalore & Online Slots" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-slate-200/80 bg-white/90 px-3.5 py-3"
                >
                  <div className="font-display text-xl sm:text-2xl font-extrabold text-[#0F1D35]">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-slate-500">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Editorial Clinical Bento Visuals */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Featured Photo */}
              <div className="relative overflow-hidden rounded-3xl border-4 border-white shadow-2xl aspect-[4/3]">
                <Image
                  src="/images/ortho-acl-postop-rehab.jpg"
                  alt="Runlife Physio MPT Orthopedic and ACL knee assessment"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D35]/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                  <div>
                    <span className="inline-block rounded-md bg-[#85B925] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-950">
                      MPT Specialist Verified
                    </span>
                    <p className="mt-1 text-sm font-bold">
                      Root-Cause Biomechanical &amp; Post-Op Rehab
                    </p>
                  </div>
                </div>
              </div>

              {/* Secondary Dual Photo Strip */}
              <div className="mt-3.5 grid grid-cols-2 gap-3.5">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 right-3 text-white">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-lime-300">
                      MPT Sports
                    </div>
                    <div className="text-xs font-bold leading-snug">
                      Return-to-Sport &amp; Running Rehab
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
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
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

              {/* Clinical Promise Card */}
              <div className="mt-3.5 flex items-center justify-between gap-3 rounded-2xl border border-sky-100 bg-white px-4 py-3 shadow-md">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#136EA8]">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div className="text-xs">
                    <div className="font-bold text-slate-900">
                      Specialist-Matched Guarantee
                    </div>
                    <div className="text-slate-500">
                      Ortho • Neuro • Sports • Pediatric • Women&apos;s Health
                    </div>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-lime-50 px-2.5 py-1 text-[11px] font-bold text-lime-800 border border-lime-200">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#85B925]" />
                  Active Today
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
} from "lucide-react";
import { useSiteCms } from "@/context/SiteSettingsContext";
import { useBookingModal } from "@/context/BookingModalContext";

export function FounderSpotlight() {
  const { settings, teamMembers } = useSiteCms();
  const { openBookingModal } = useBookingModal();

  const publishedTeam = teamMembers.filter((m) => m.published);

  return (
    <section className="py-14 lg:py-24 bg-white border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Brand Emblem + Clinical Visual */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 aspect-[4/3] shadow-lg">
              <Image
                src="/images/sports-onfield-assessment.jpg"
                alt="Runlife Physio specialist clinical assessment"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D35]/85 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-xs font-bold uppercase tracking-widest text-[#9AD634]">
                  {settings.founderCredentials}
                </div>
                <div className="text-xl font-extrabold">
                  {settings.founderName}
                </div>
                <div className="text-xs text-slate-200">
                  {settings.founderRole}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="relative h-14 w-20 shrink-0 rounded-xl bg-white p-1.5 border border-slate-200">
                <Image
                  src="/images/runlife-logo.png"
                  alt="Runlife Physio Official Emblem"
                  fill
                  sizes="80px"
                  className="object-contain p-1"
                />
              </div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900 block">
                  Why &ldquo;Runlife Specialist Network&rdquo;?
                </strong>
                Pediatric, Neuro, Ortho, Sports &amp; Women&apos;s Health cases
                are matched strictly to post-graduate MPT Specialists.
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-lime-900">
              <Users className="h-3.5 w-3.5 text-[#638E15]" />
              Clinical Leadership &amp; Standards
            </span>

            <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0F1D35] leading-tight">
              Led by {settings.founderName} — Raising the Standard of
              Physiotherapy in {settings.primaryCity}
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {settings.founderBio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {[
                {
                  title: "Post-Graduate MPT Only",
                  desc: "Every department is led by a Master of Physiotherapy specialist in that exact sub-discipline.",
                },
                {
                  title: "Zero Machine-Mill Shortcuts",
                  desc: "1-on-1 hands-on manual therapy, biomechanical re-education, and active progressive loading.",
                },
                {
                  title: "Surgeon & Doctor Aligned",
                  desc: "We coordinate directly with your orthopedic surgeon, neurologist, OB-GYN, or pediatrician.",
                },
                {
                  title: "Measurable Outcome Tracking",
                  desc: "Range-of-motion, pain scales, balance scores & Return-to-Sport symmetry tracked openly.",
                },
              ].map((pillar) => (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-[#0F1D35]">
                    <CheckCircle2 className="h-4 w-4 text-[#85B925] shrink-0" />
                    {pillar.title}
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F1D35] px-5 min-h-[46px] text-xs sm:text-sm font-bold text-white hover:bg-[#136EA8] transition"
              >
                About Our Network &amp; Standards
                <ArrowRight className="h-4 w-4 text-[#9AD634]" />
              </Link>
              {settings.showJoinNetworkForm && (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                  <ShieldCheck className="h-4 w-4 text-[#136EA8]" />
                  MPT Specialists: Join Network on About Page
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Specialist Team Roster (Managed Live in /admin) */}
        {settings.showTeamSection && publishedTeam.length > 0 && (
          <div className="pt-8 border-t border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
                  Clinical Roster
                </span>
                <h3 className="mt-1 font-display text-2xl font-extrabold text-[#0F1D35]">
                  Meet Our Specialist Leadership
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {publishedTeam.map((member) => (
                <div
                  key={member.id}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 p-5 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 border border-sky-200 px-2.5 py-0.5 text-[11px] font-bold text-[#136EA8]">
                        <Stethoscope className="h-3 w-3" />
                        {member.credential}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {member.experience}
                      </span>
                    </div>
                    <h4 className="mt-3 font-display text-lg font-extrabold text-[#0F1D35]">
                      {member.name}
                    </h4>
                    <div className="text-xs font-semibold text-slate-700">
                      {member.role} • {member.department}
                    </div>
                    {member.bio && (
                      <p className="mt-2 text-xs leading-relaxed text-slate-600">
                        {member.bio}
                      </p>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      openBookingModal({
                        conditionOrPain: `Consultation with ${member.name}`,
                        source: `Team Card (${member.name})`,
                      })
                    }
                    className="mt-4 inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 min-h-[42px] text-xs font-bold text-[#0F1D35] hover:border-[#0F1D35] hover:bg-[#0F1D35] hover:text-white transition cursor-pointer"
                  >
                    Book With {member.name.split("(")[0].trim()}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

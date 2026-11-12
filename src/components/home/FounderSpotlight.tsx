import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Users, CheckCircle2, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function FounderSpotlight() {
  return (
    <section className="py-16 lg:py-24 bg-white border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D35]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <div className="text-xs font-bold uppercase tracking-widest text-[#9AD634]">
                  Founder &amp; Clinical Lead
                </div>
                <div className="text-xl font-extrabold">
                  {SITE_CONFIG.founder.name}
                </div>
                <div className="text-xs text-slate-200">
                  Runlife — Specialist Physiotherapy Network, Bangalore
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="relative h-16 w-24 shrink-0 rounded-xl bg-white p-1.5 border border-slate-200">
                <Image
                  src="/images/runlife-logo.png"
                  alt="Runlife Physio Official Emblem"
                  fill
                  sizes="96px"
                  className="object-contain p-1"
                />
              </div>
              <div className="text-xs text-slate-600 leading-relaxed">
                <strong className="text-slate-900 block">
                  Why &ldquo;Runlife Specialist Network&rdquo;?
                </strong>
                Just as you wouldn&apos;t visit a cardiologist for knee surgery,
                we match Pediatric, Neuro, Ortho, Sports &amp; OBG cases strictly
                to post-graduate MPT Specialists.
              </div>
            </div>
          </div>

          {/* Right Narrative */}
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-lime-900">
              <Users className="h-3.5 w-3.5 text-[#638E15]" />
              Clinical Leadership &amp; Standards
            </span>

            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F1D35] leading-tight">
              Built by {SITE_CONFIG.founder.shortName} to Raise the Standard of
              Physiotherapy in Bangalore
            </h2>

            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {SITE_CONFIG.founder.bio}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
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
                  desc: "Goniometric ROM, pain scales, balance scores & Return-to-Sport symmetry tracked openly.",
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

            <div className="pt-3 flex flex-wrap items-center gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0F1D35] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#136EA8] transition"
              >
                Read Our Clinical Story &amp; Network Standards
                <ArrowRight className="h-4 w-4 text-[#9AD634]" />
              </Link>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                <ShieldCheck className="h-4 w-4 text-[#136EA8]" />
                MPT Therapists: Apply to Join Network on About Page
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

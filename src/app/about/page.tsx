import type { Metadata } from "next";
import Image from "next/image";
import { Award, ShieldCheck, Target, HeartHandshake } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SPECIALTIES } from "@/data/specialties";
import { JoinNetworkForm } from "./JoinNetworkForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Dr. Vishal & Runlife Specialist Physiotherapy Network",
  description:
    "Learn how Dr. Vishal (PT) founded Runlife Physio (REHAB · RECOVER · RUN) in Bangalore to unite Master of Physiotherapy (MPT) Specialists in Ortho, Neuro, Sports, Pediatrics & Women's Health.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Runlife Physio", path: "/about" },
        ])}
      />

      {/* Hero */}
      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
              About Runlife Physio • Bangalore
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
              One Unified Platform. Five Master-Level Physiotherapy Specialties.
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed">
              {SITE_CONFIG.founder.bio}
            </p>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="rounded-3xl bg-white p-8 shadow-2xl max-w-sm w-full text-center">
              <div className="relative mx-auto h-40 w-56">
                <Image
                  src="/images/runlife-logo.png"
                  alt="Runlife Physio Official Logo"
                  fill
                  sizes="224px"
                  className="object-contain"
                />
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 text-xs font-bold uppercase tracking-widest text-slate-500">
                Founded by {SITE_CONFIG.founder.name}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Clinical Values */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: "Strict MPT Sub-Specialty Matching",
              desc: "Orthopedic cases see an MPT (Ortho). Stroke & GBS patients see an MPT (Neuro). Runners see an MPT (Sports). Children see an MPT (Pediatric). Mothers see an MPT (OBG).",
            },
            {
              icon: Target,
              title: "Measured REHAB • RECOVER • RUN Gates",
              desc: "We replace vague session counts with objective range-of-motion, strength symmetry, and balance milestones.",
            },
            {
              icon: HeartHandshake,
              title: "Patient-First Hybrid Accessibility",
              desc: "Seamless continuity between Bangalore Home Care, Virtual Tele-Rehabilitation, Online Consults, and Scheduled Visits.",
            },
          ].map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-2xs"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#136EA8]">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-display text-xl font-extrabold text-[#0F1D35]">
                  {v.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Specialist Guarantee Matrix */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
            Our Non-Negotiable Specialist Charter
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SPECIALTIES.map((s) => (
              <div
                key={s.slug}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2"
              >
                <ShieldCheck className="h-5 w-5 text-[#85B925]" />
                <div className="font-bold text-sm text-[#0F1D35]">
                  {s.shortName}
                </div>
                <div className="text-xs font-semibold text-[#136EA8]">
                  {s.specialistCredential}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Runlife Specialist Network */}
        <section className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50/70 to-white p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#136EA8]">
                Careers &amp; Clinical Empanelment
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
                Are You an MPT Specialist in Bangalore? Join the Runlife Network
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                We partner with passionate, post-graduate MPT Physiotherapists
                across Orthopedics, Neurology, Sports, Pediatrics, and
                Women&apos;s Health who believe in ethical, evidence-based 1-on-1
                patient outcomes.
              </p>
            </div>
            <div className="lg:col-span-7">
              <JoinNetworkForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

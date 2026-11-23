import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Stethoscope,
  CalendarCheck,
} from "lucide-react";
import { CONDITIONS, getConditionBySlug } from "@/data/conditions";
import { getSpecialtyBySlug } from "@/data/specialties";
import { OpenModalButton } from "@/components/booking/OpenModalButton";
import { BookingForm } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { getServerCitiesLabel } from "@/lib/serverCities";
import { SITE_CONFIG } from "@/config/site";

export async function generateStaticParams() {
  return CONDITIONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cond = getConditionBySlug(slug);
  const cities = await getServerCitiesLabel();
  if (!cond) return {};

  return {
    title: `${cond.title} in ${cities} — ${cond.specialistBadge}`,
    description: `${cond.summary} Treated by ${cond.specialistBadge} via Home Care in ${cities}, Virtual Tele-Rehab & Clinic Appointments.`,
    alternates: { canonical: `/conditions/${cond.slug}` },
  };
}

export default async function ConditionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const cities = await getServerCitiesLabel();
  const { slug } = await params;
  const cond = getConditionBySlug(slug);
  if (!cond) notFound();

  const parentSpecialty = getSpecialtyBySlug(cond.specialtySlug);

  const medicalConditionSchema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: cond.title,
    description: cond.summary,
    url: `${SITE_CONFIG.url}/conditions/${cond.slug}`,
    about: {
      "@type": "MedicalCondition",
      name: cond.shortTitle,
      signOrSymptom: cond.commonSymptoms.map((s) => ({
        "@type": "MedicalSymptom",
        name: s,
      })),
    },
  };

  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Conditions", path: "/conditions" },
            { name: cond.shortTitle, path: `/conditions/${cond.slug}` },
          ]),
          medicalConditionSchema,
        ]}
      />

      {/* Hero */}
      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs text-sky-300">
              <Link href="/conditions" className="hover:underline">
                Conditions
              </Link>
              <span className="text-slate-500">/</span>
              <Link
                href={`/services/${cond.specialtySlug}`}
                className="hover:underline"
              >
                {cond.specialtyLabel}
              </Link>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#9AD634]">
              <Stethoscope className="h-3.5 w-3.5" />
              Assigned Specialist: {cond.specialistBadge}
            </span>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
              {cond.title}
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed">
              {cond.summary}
            </p>

            <div className="pt-2 flex flex-wrap gap-3">
              <OpenModalButton
                prefill={{
                  specialty: parentSpecialty?.title || cond.specialtyLabel,
                  conditionOrPain: cond.title,
                  source: `Condition Hero (${cond.shortTitle})`,
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#85B925] px-6 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-[#9AD634] transition cursor-pointer"
              >
                <CalendarCheck className="h-4 w-4" />
                Book for Consultation
              </OpenModalButton>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white/15 shadow-2xl">
              <Image
                src={cond.heroImage}
                alt={cond.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Details */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-extrabold text-[#0F1D35]">
                Understanding {cond.shortTitle} — The Clinical Perspective
              </h2>
              <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                {cond.clinicalExplanation}
              </p>

              <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-sky-50 border border-sky-100 p-4 text-xs sm:text-sm text-slate-700">
                <Clock className="h-5 w-5 text-[#136EA8] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-900">
                    Expected Recovery Milestones:
                  </strong>{" "}
                  {cond.recoveryTimelineNote}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="rounded-3xl border border-slate-200 bg-white p-6">
                <h3 className="font-display text-lg font-extrabold text-[#0F1D35] mb-3">
                  Common Symptoms &amp; Signs
                </h3>
                <ul className="space-y-2.5">
                  {cond.commonSymptoms.map((sym) => (
                    <li
                      key={sym}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#136EA8] shrink-0 mt-0.5" />
                      <span>{sym}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-amber-200 bg-amber-50/50 p-6">
                <h3 className="font-display text-lg font-extrabold text-amber-950 mb-3 flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  When to Consult Us
                </h3>
                <ul className="space-y-2.5">
                  {cond.whenToSeeSpecialist.map((w) => (
                    <li
                      key={w}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-800"
                    >
                      <CheckCircle2 className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 3-Phase Roadmap */}
            <div className="rounded-3xl bg-[#0F1D35] text-white p-6 sm:p-8">
              <h2 className="font-display text-2xl font-extrabold">
                Runlife 3-Phase Protocol for {cond.shortTitle}
              </h2>
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs font-extrabold text-sky-300">
                    PHASE 01 • REHAB
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-200">
                    {cond.rehabRoadmap.phase1}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs font-extrabold text-[#9AD634]">
                    PHASE 02 • RECOVER
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-200">
                    {cond.rehabRoadmap.phase2}
                  </p>
                </div>
                <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                  <div className="text-xs font-extrabold text-amber-300">
                    PHASE 03 • RUN
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-200">
                    {cond.rehabRoadmap.phase3}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Booking Sidebar */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-24 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-lg">
              <h2 className="font-display text-xl font-extrabold text-[#0F1D35]">
                Book for Consultation
              </h2>
              <p className="mt-1 text-xs text-slate-500 mb-4">
                Home Visits in {cities} • Online Consultations
              </p>
              <BookingForm
                compact
                prefill={{
                  specialty: parentSpecialty?.title || cond.specialtyLabel,
                  conditionOrPain: cond.title,
                  source: `Condition Sidebar (${cond.shortTitle})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

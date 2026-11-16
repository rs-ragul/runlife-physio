import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  CheckCircle2,
  ArrowRight,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { SPECIALTIES, getSpecialtyBySlug } from "@/data/specialties";
import { getConditionsBySpecialty } from "@/data/conditions";
import { OpenModalButton } from "@/components/booking/OpenModalButton";
import { BookingForm } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";

export async function generateStaticParams() {
  return SPECIALTIES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const spec = getSpecialtyBySlug(slug);
  if (!spec) return {};

  return {
    title: `${spec.title} in Bangalore — ${spec.specialistCredential}`,
    description: `${spec.shortDescription} ${spec.specialistGuarantee} Home Care across Bangalore & Virtual Tele-Rehabilitation.`,
    alternates: { canonical: `/services/${spec.slug}` },
  };
}

export default async function SpecialtyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const spec = getSpecialtyBySlug(slug);
  if (!spec) notFound();

  const relatedConditions = getConditionsBySpecialty(spec.slug);

  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "MPT Specialties", path: "/services" },
            { name: spec.title, path: `/services/${spec.slug}` },
          ]),
          buildFaqSchema(spec.faqs),
        ]}
      />

      {/* Specialty Hero */}
      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <Link href="/services" className="text-sky-300 hover:underline">
                MPT Specialties
              </Link>
              <span className="text-slate-500">/</span>
              <span className="text-slate-300">{spec.shortName}</span>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-400/15 border border-lime-400/30 px-3.5 py-1 text-xs font-extrabold text-[#9AD634]">
              <Award className="h-4 w-4" />
              {spec.specialistCredential}
            </span>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
              {spec.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {spec.tagline}
            </p>

            <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-xs sm:text-sm text-sky-200 font-semibold">
              <ShieldCheck className="inline h-4 w-4 text-[#9AD634] mr-1.5" />
              {spec.specialistGuarantee}
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <OpenModalButton
                prefill={{
                  specialty: spec.title,
                  source: `Specialty Page Hero (${spec.shortName})`,
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#85B925] px-6 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-[#9AD634] transition cursor-pointer"
              >
                <CalendarCheck className="h-4 w-4" />
                Book for Consultation
              </OpenModalButton>
              <a
                href="#book-specialty"
                className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition"
              >
                Request Callback
              </a>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border-4 border-white/15 shadow-2xl">
              <Image
                src={spec.heroImage}
                alt={spec.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        {/* Overview + Why MPT Specialist */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
            <h2 className="font-display text-2xl font-extrabold text-[#0F1D35]">
              Clinical Approach &amp; Evaluation
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {spec.clinicalOverview}
            </p>
            <div className="rounded-2xl border border-sky-100 bg-sky-50/70 p-5">
              <h3 className="text-sm font-extrabold text-[#0F1D35]">
                Why a Dedicated {spec.specialistCredential} Matters
              </h3>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-700">
                {spec.whySpecialistMatters}
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-extrabold text-[#0F1D35]">
              Conditions Treated in This Department
            </h2>
            <ul className="mt-4 space-y-2.5">
              {spec.pdfConditionsHighlighted.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#85B925] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 pt-4 border-t border-slate-100 text-xs text-slate-500">
              <strong className="text-slate-800">Available Care Formats:</strong>{" "}
              {spec.idealModes.join(" • ")}
            </div>
          </div>
        </div>

        {/* Treatment Modalities */}
        <section>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35] mb-6">
            Evidence-Based Modalities &amp; Techniques
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {spec.modalities.map((mod) => (
              <div
                key={mod.name}
                className="rounded-2xl border border-slate-200 bg-white p-6"
              >
                <h3 className="font-bold text-base text-[#0F1D35]">
                  {mod.name}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {mod.detail}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3-Phase Rehab Recover Run */}
        <section className="rounded-3xl bg-[#0F1D35] text-white p-6 sm:p-10">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold">
            Your 3-Phase {spec.shortName} Pathway
          </h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { code: "01 • REHAB", desc: spec.phases.rehab },
              { code: "02 • RECOVER", desc: spec.phases.recover },
              { code: "03 • RUN", desc: spec.phases.run },
            ].map((p) => (
              <div
                key={p.code}
                className="rounded-2xl border border-white/15 bg-white/5 p-5"
              >
                <div className="text-xs font-extrabold tracking-widest text-[#9AD634]">
                  {p.code}
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-200">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Linked Condition Guides */}
        {relatedConditions.length > 0 && (
          <section>
            <h2 className="font-display text-2xl font-extrabold text-[#0F1D35] mb-5">
              Detailed Condition Guides ({spec.shortName})
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedConditions.map((cond) => (
                <Link
                  key={cond.slug}
                  href={`/conditions/${cond.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 hover:border-[#136EA8] hover:shadow-md transition flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#136EA8]">
                      {cond.bodyArea}
                    </span>
                    <h3 className="mt-1 font-bold text-base text-[#0F1D35] group-hover:text-[#136EA8]">
                      {cond.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 line-clamp-3">
                      {cond.summary}
                    </p>
                  </div>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-[#0F1D35]">
                    Read Condition Protocol <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Specialty FAQs + Embedded Booking */}
        <div
          id="book-specialty"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start scroll-mt-24"
        >
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-2xl font-extrabold text-[#0F1D35]">
              Department FAQs
            </h2>
            {spec.faqs.map((f) => (
              <div
                key={f.question}
                className="rounded-2xl border border-slate-200 bg-white p-5"
              >
                <h3 className="font-bold text-sm text-[#0F1D35]">{f.question}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg">
            <h2 className="font-display text-2xl font-extrabold text-[#0F1D35] mb-1">
              Book for Consultation — {spec.shortName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-5">
              Pre-selected for {spec.specialistCredential}
            </p>
            <BookingForm
              prefill={{
                specialty: spec.title,
                source: `Specialty Bottom Form (${spec.shortName})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

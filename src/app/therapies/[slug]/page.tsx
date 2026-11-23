import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, CalendarCheck, ChevronRight } from "lucide-react";
import { THERAPIES } from "@/data/therapies";
import { OpenModalButton } from "@/components/booking/OpenModalButton";
import { BookingForm } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema, buildFaqSchema } from "@/lib/schema";
import { getServerCitiesLabel } from "@/lib/serverCities";

export function generateStaticParams() {
  return THERAPIES.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = THERAPIES.find((t) => t.slug === slug);
  const cities = await getServerCitiesLabel();
  if (!item) return {};
  return {
    title: `${item.title} in ${cities}`,
    description: `${item.shortSummary} Book ${item.shortTitle} with Runlife Physio in ${cities}.`,
    alternates: { canonical: `/therapies/${item.slug}` },
  };
}

export default async function TherapyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = THERAPIES.find((t) => t.slug === slug);
  if (!item) notFound();
  const cities = await getServerCitiesLabel();

  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Therapies & HYROX", path: "/therapies" },
          { name: item.shortTitle, path: `/therapies/${item.slug}` },
        ])}
      />
      <JsonLd data={buildFaqSchema(item.faqs)} />

      {/* Hero */}
      <section className="bg-[#0F1D35] bg-navy-grid text-white py-12 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <Link href="/therapies" className="hover:text-white">
              Therapies &amp; HYROX
            </Link>
            <ChevronRight className="h-3.5 w-3.5 opacity-60" />
            <span className="text-[#9AD634] font-semibold">
              {item.shortTitle}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-[#9AD634]">
                {item.categoryBadge} • {cities}
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
                {item.title}
              </h1>
              <p className="text-sm sm:text-lg text-slate-300 leading-relaxed">
                {item.shortSummary}
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <OpenModalButton
                  prefill={{
                    specialty: item.title,
                    conditionOrPain: item.shortTitle,
                    source: `Therapy Hero (${item.shortTitle})`,
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#85B925] px-6 min-h-[48px] text-sm font-extrabold text-slate-950 hover:bg-[#9AD634] transition cursor-pointer"
                >
                  <CalendarCheck className="h-4 w-4" />
                  Book for Consultation
                </OpenModalButton>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-video overflow-hidden rounded-3xl border-4 border-white/15 shadow-2xl bg-slate-900">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content + Sticky Booking Sidebar */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
            <h2 className="font-display text-2xl font-extrabold text-[#0F1D35]">
              Overview &amp; How It Helps
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-slate-600">
              {item.overview}
            </p>

            <h3 className="pt-2 font-display text-lg font-extrabold text-[#0F1D35]">
              Ideal For
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {item.bestFor.map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-xs sm:text-sm font-medium text-slate-800"
                >
                  <CheckCircle2 className="h-4 w-4 text-[#85B925] shrink-0 mt-0.5" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
            <h2 className="font-display text-2xl font-extrabold text-[#0F1D35]">
              What to Expect During Your Session
            </h2>
            <div className="space-y-3">
              {item.sessionSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4"
                >
                  <div className="font-bold text-sm text-[#0F1D35]">
                    {step.title}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {step.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4">
            <h2 className="font-display text-2xl font-extrabold text-[#0F1D35]">
              Common Questions
            </h2>
            {item.faqs.map((f) => (
              <div
                key={f.question}
                className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
              >
                <h3 className="font-bold text-sm text-[#0F1D35]">
                  {f.question}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {f.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-24 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-lg">
            <h2 className="font-display text-xl font-extrabold text-[#0F1D35]">
              Book for Consultation — {item.shortTitle}
            </h2>
            <p className="mt-1 text-xs text-slate-500 mb-4">
              Available in {cities}
            </p>
            <BookingForm
              compact
              prefill={{
                specialty: item.title,
                conditionOrPain: item.shortTitle,
                source: `Therapy Detail Page (${item.shortTitle})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import { THERAPIES } from "@/data/therapies";
import { OpenModalButton } from "@/components/booking/OpenModalButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { getServerCitiesLabel } from "@/lib/serverCities";

export async function generateMetadata(): Promise<Metadata> {
  const cities = await getServerCitiesLabel();
  return {
    title: `Dry Needling, Chiropractic, Cupping, Taping, Sports Massage & HYROX Training | ${cities}`,
    description: `Book specialized hands-on therapies and athletic performance training at Runlife Physio in ${cities}: Dry Needling, Chiropractic Care, Kinesiology Taping, Cupping Therapy, Sports Massage & HYROX Training.`,
    alternates: { canonical: "/therapies" },
  };
}

export default async function TherapiesHubPage() {
  const cities = await getServerCitiesLabel();
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Therapies & HYROX Training", path: "/therapies" },
        ])}
      />

      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            {cities} • Hands-On Recovery &amp; Performance
          </span>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold max-w-4xl">
            Specialized Manual Therapies &amp; HYROX Athletic Conditioning
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            From targeted trigger-point Dry Needling, Chiropractic spinal care,
            Cupping, and Kinesiology Taping to deep-tissue Sports Massage and
            physiotherapist-guided HYROX race preparation.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        {THERAPIES.map((item, idx) => (
          <section
            key={item.slug}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              <div
                className={`relative aspect-video lg:aspect-auto lg:h-full min-h-[250px] lg:col-span-5 bg-slate-900 ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-center"
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 space-y-4">
                <span className="inline-block rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-bold text-[#136EA8]">
                  {item.categoryBadge}
                </span>
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
                  {item.title}
                </h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  {item.overview}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {item.bestFor.map((point) => (
                    <div
                      key={point}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#85B925] shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <OpenModalButton
                    prefill={{
                      specialty: item.title,
                      conditionOrPain: item.shortTitle,
                      source: `Therapies Hub (${item.shortTitle})`,
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F1D35] px-5 min-h-[46px] text-xs sm:text-sm font-extrabold text-white hover:bg-[#136EA8] transition cursor-pointer"
                  >
                    <CalendarCheck className="h-4 w-4 text-[#9AD634]" />
                    Book for Consultation
                  </OpenModalButton>
                  <Link
                    href={`/therapies/${item.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-5 min-h-[46px] text-xs sm:text-sm font-bold text-slate-800 hover:border-slate-900 transition"
                  >
                    How It Works &amp; FAQs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

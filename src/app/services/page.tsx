import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import { SPECIALTIES } from "@/data/specialties";
import { THERAPIES } from "@/data/therapies";
import { OpenModalButton } from "@/components/booking/OpenModalButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title:
    "Physiotherapy Specialties, Hands-On Therapies & HYROX Training | Bangalore & Salem",
  description:
    "Explore Runlife Physio's clinical departments (Ortho, Neuro, Sports, Pediatric & Women's Health) plus Dry Needling, Chiropractic Care, Cupping, Kinesiology Taping, Sports Massage & HYROX Training in Bangalore & Salem.",
  alternates: { canonical: "/services" },
};

export default function ServicesHubPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Specialties & Therapies", path: "/services" },
        ])}
      />

      {/* Hero Banner */}
      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            Bangalore &amp; Salem • Complete Physiotherapy &amp; Recovery Care
          </span>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold max-w-4xl">
            Our Physiotherapy Specialties &amp; Hands-On Therapies
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Every body heals differently. At Runlife Physio, your recovery is
            guided by dedicated specialists across Orthopedics, Neurology,
            Sports, Pediatrics, and Women&apos;s Health—alongside Dry Needling,
            Chiropractic Care, Cupping, Taping, Sports Massage, and HYROX
            conditioning.
          </p>
        </div>
      </section>

      {/* Detailed Specialty Sections */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-10">
        {SPECIALTIES.map((spec, idx) => (
          <section
            key={spec.slug}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12">
              <div
                className={`relative min-h-[280px] lg:col-span-5 ${
                  idx % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <Image
                  src={spec.heroImage}
                  alt={spec.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top"
                />
              </div>

              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 border border-sky-200 px-3 py-1 text-xs font-extrabold text-[#136EA8]">
                    <Award className="h-3.5 w-3.5 text-[#85B925]" />
                    {spec.specialistCredential}
                  </span>
                  <h2 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
                    {spec.title}
                  </h2>
                  <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
                    {spec.clinicalOverview}
                  </p>

                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {spec.pdfConditionsHighlighted.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-2 text-xs sm:text-sm text-slate-700"
                      >
                        <CheckCircle2 className="h-4 w-4 text-[#85B925] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-7 pt-5 border-t border-slate-100 flex flex-wrap items-center gap-3">
                  <OpenModalButton
                    prefill={{
                      specialty: spec.title,
                      source: `Services Hub (${spec.shortName})`,
                    }}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#0F1D35] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#136EA8] transition cursor-pointer"
                  >
                    <CalendarCheck className="h-4 w-4 text-[#9AD634]" />
                    Book for Consultation
                  </OpenModalButton>
                  <Link
                    href={`/services/${spec.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 hover:border-slate-900 transition"
                  >
                    Details &amp; FAQs
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Hands-On Therapies & HYROX Grid inside /services as well */}
        <section className="pt-8">
          <div className="mb-7 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <span className="inline-block rounded-full bg-lime-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-lime-900">
                Hands-On Therapies &amp; Performance
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
                Manual Therapies &amp; HYROX Conditioning
              </h2>
            </div>
            <Link
              href="/therapies"
              className="text-sm font-bold text-[#136EA8] hover:underline"
            >
              Open Full Therapies Page →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {THERAPIES.map((t) => (
              <div
                key={t.slug}
                className="flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs"
              >
                <Link
                  href={`/therapies/${t.slug}`}
                  className="relative aspect-video bg-slate-900"
                >
                  <Image
                    src={t.image}
                    alt={t.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover object-center"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between p-5">
                  <div>
                    <h3 className="font-display text-lg font-extrabold text-[#0F1D35]">
                      {t.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
                      {t.shortSummary}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                    <OpenModalButton
                      prefill={{
                        specialty: t.title,
                        conditionOrPain: t.shortTitle,
                        source: `Services Hub Therapy (${t.shortTitle})`,
                      }}
                      className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0F1D35] px-3.5 min-h-[42px] text-xs font-bold text-white hover:bg-[#136EA8] transition cursor-pointer"
                    >
                      <CalendarCheck className="h-3.5 w-3.5 text-[#9AD634]" />
                      Book for Consultation
                    </OpenModalButton>
                    <Link
                      href={`/therapies/${t.slug}`}
                      className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3 min-h-[42px] text-xs font-bold text-slate-700 hover:border-slate-900 transition"
                    >
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

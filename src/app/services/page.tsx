import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Award, CheckCircle2, ArrowRight, CalendarCheck } from "lucide-react";
import { SPECIALTIES } from "@/data/specialties";
import { OpenModalButton } from "@/components/booking/OpenModalButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "MPT Physiotherapy Specialties — Ortho, Neuro, Sports, Pediatric & OBG",
  description:
    "Explore Runlife Physio's 5 specialized Master of Physiotherapy (MPT) departments in Bangalore: Orthopedic/MSK, Neurological, Sports & Running, Pediatric, and Women's Health Rehabilitation.",
  alternates: { canonical: "/services" },
};

export default function ServicesHubPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "MPT Specialties", path: "/services" },
        ])}
      />

      {/* Hero Banner */}
      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            Specialized Physiotherapy Team Under One Platform
          </span>
          <h1 className="mt-3 font-display text-3xl sm:text-5xl font-extrabold max-w-4xl">
            5 Dedicated Master of Physiotherapy (MPT) Departments
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Every human body system heals by different biological rules. At
            Runlife Physio, your recovery is led exclusively by a post-graduate
            MPT Specialist trained in your exact clinical category.
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
                    Book {spec.shortName} Specialist
                  </OpenModalButton>
                  <Link
                    href={`/services/${spec.slug}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 hover:border-slate-900 transition"
                  >
                    Full Protocol &amp; FAQs
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

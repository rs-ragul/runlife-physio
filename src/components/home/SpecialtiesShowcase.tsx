"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, Check, ArrowRight, CalendarPlus } from "lucide-react";
import { SPECIALTIES } from "@/data/specialties";
import { useBookingModal } from "@/context/BookingModalContext";

export function SpecialtiesShowcase() {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="max-w-3xl">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
              5 Dedicated MPT Departments
            </span>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl font-extrabold text-[#0F1D35]">
              Every Condition Treated by a Domain-Specific MPT Specialist
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Unlike general clinics where one therapist treats everything,
              Runlife Physio matches you with an MPT post-graduate specialist in
              your exact clinical category.
            </p>
          </div>
          <Link
            href="/conditions"
            className="text-sm font-bold text-[#136EA8] hover:underline shrink-0"
          >
            Explore All Conditions →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {SPECIALTIES.map((spec) => (
            <article
              key={spec.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs hover:shadow-xl hover:border-sky-300 transition"
            >
              {/* Photo Header */}
              <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                <Image
                  src={spec.heroImage}
                  alt={spec.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-top group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D35]/80 via-[#0F1D35]/15 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-extrabold text-[#0F1D35] shadow-xs">
                    <Award className="h-3.5 w-3.5 text-[#85B925]" />
                    {spec.specialistCredential}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-1 flex-col justify-between p-6">
                <div>
                  <h3 className="font-display text-xl font-extrabold text-[#0F1D35] group-hover:text-[#136EA8] transition">
                    <Link href={`/services/${spec.slug}`}>{spec.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {spec.shortDescription}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-4">
                    {spec.pdfConditionsHighlighted.slice(0, 4).map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-xs text-slate-700"
                      >
                        <Check className="h-3.5 w-3.5 text-[#85B925] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      openBookingModal({
                        specialty: spec.title,
                        source: `Specialty Card (${spec.shortName})`,
                      })
                    }
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0F1D35] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#136EA8] transition cursor-pointer"
                  >
                    <CalendarPlus className="h-3.5 w-3.5 text-[#9AD634]" />
                    Book for Consultation
                  </button>
                  <Link
                    href={`/services/${spec.slug}`}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:border-slate-900 transition"
                  >
                    Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}

          {/* 6th Card: Unsure Which Specialist? Instant Triage Card */}
          <div className="flex flex-col justify-between rounded-3xl bg-gradient-to-br from-[#0F1D35] via-[#153154] to-[#0F1D35] p-7 text-white shadow-xl">
            <div>
              <span className="inline-block rounded-full bg-lime-400/20 border border-lime-400/30 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-lime-300">
                Direct Clinical Triage
              </span>
              <h3 className="mt-4 font-display text-2xl font-extrabold leading-snug">
                Not Sure Which MPT Specialist You Need?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Share your symptoms or upload/mention your MRI or discharge
                notes. <strong className="text-white">Dr. Vishal&apos;s</strong>{" "}
                clinical triage desk will match you with the exact Ortho, Neuro,
                Sports, Pediatric, or Women&apos;s Health MPT Specialist.
              </p>
            </div>

            <div className="mt-6 space-y-3">
              <div className="rounded-2xl bg-white/10 p-3.5 text-xs text-slate-200">
                ✓ Home Visits in Bangalore &amp; Salem
                <br />✓ Online Video Consultations &amp; Tele-Rehab
                <br />✓ Scheduled 1-on-1 Appointments
              </div>
              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    conditionOrPain: "Please help me choose the right specialist",
                    source: "Unsure Triage Card",
                  })
                }
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#85B925] px-5 py-3.5 text-sm font-extrabold text-slate-950 hover:bg-[#9AD634] transition cursor-pointer"
              >
                Book for Consultation
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

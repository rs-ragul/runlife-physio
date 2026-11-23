"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarCheck, Sparkles, Check } from "lucide-react";
import { THERAPIES } from "@/data/therapies";
import { useBookingModal } from "@/context/BookingModalContext";
import { useSiteCms } from "@/context/SiteSettingsContext";
import { citiesShortLabel } from "@/lib/cities";

export function HandsOnTherapiesSection() {
  const { settings } = useSiteCms();
  const { openBookingModal } = useBookingModal();

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-t border-b border-slate-200/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-lime-100 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-lime-900">
              <Sparkles className="h-3.5 w-3.5 text-[#638E15]" />
              Specialized Hands-On Therapies &amp; Performance
            </span>
            <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-[#0F1D35]">
              Dry Needling, Chiropractic, Cupping, Taping, Sports Massage &amp; HYROX
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Targeted manual therapies for faster pain relief and recovery,
              paired with physiotherapist-led athletic and HYROX conditioning in{" "}
              <strong>{citiesShortLabel(settings.serviceCities)}</strong>.
            </p>
          </div>
          <Link
            href="/therapies"
            className="text-sm font-bold text-[#136EA8] hover:underline shrink-0"
          >
            View All Therapies &amp; HYROX →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {THERAPIES.map((item) => (
            <article
              key={item.slug}
              className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs hover:shadow-xl hover:border-sky-300 transition"
            >
              {/* 16:9 Aspect Ratio Preserves Full Width of All Client Therapy Photos */}
              <Link
                href={`/therapies/${item.slug}`}
                className="relative aspect-video w-full overflow-hidden bg-slate-900"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center group-hover:scale-105 transition duration-500"
                />
              </Link>

              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                <div>
                  <span className="inline-block rounded-full bg-sky-50 border border-sky-200 px-2.5 py-0.5 text-[11px] font-bold text-[#136EA8]">
                    {item.categoryBadge}
                  </span>
                  <h3 className="mt-2.5 font-display text-xl font-extrabold text-[#0F1D35] group-hover:text-[#136EA8] transition">
                    <Link href={`/therapies/${item.slug}`}>{item.title}</Link>
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                    {item.shortSummary}
                  </p>

                  <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3.5">
                    {item.bestFor.slice(0, 3).map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-xs text-slate-700"
                      >
                        <Check className="h-3.5 w-3.5 text-[#85B925] shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() =>
                      openBookingModal({
                        specialty: item.title,
                        conditionOrPain: item.shortTitle,
                        source: `Therapy Card (${item.shortTitle})`,
                      })
                    }
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#0F1D35] px-4 min-h-[44px] text-xs font-extrabold text-white hover:bg-[#136EA8] transition cursor-pointer"
                  >
                    <CalendarCheck className="h-3.5 w-3.5 text-[#9AD634]" />
                    Book for Consultation
                  </button>
                  <Link
                    href={`/therapies/${item.slug}`}
                    className="inline-flex items-center gap-1 rounded-xl border border-slate-200 px-3.5 min-h-[44px] text-xs font-bold text-slate-700 hover:border-slate-900 transition"
                  >
                    Details
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

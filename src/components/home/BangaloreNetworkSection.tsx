"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { useSiteCms } from "@/context/SiteSettingsContext";
import { getActiveCities, joinCitiesNatural, homeVisitLabel } from "@/lib/cities";

export function BangaloreNetworkSection() {
  const { openBookingModal } = useBookingModal();
  const { settings } = useSiteCms();

  // Coverage is generated from the cities Dr. Vishal enables in /admin.
  const activeCities = getActiveCities(settings.serviceCities);
  const citiesLabel = joinCitiesNatural(settings.serviceCities);
  const homeVisit = homeVisitLabel(settings.serviceCities);

  return (
    <section className="py-16 lg:py-22 bg-slate-50 border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
              <MapPin className="h-3.5 w-3.5 text-[#85B925]" />
              {citiesLabel} Coverage
            </span>
            <h2 className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold text-[#0F1D35]">
              Home Visits Across {citiesLabel} + Online Consultations
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Tap your area below to book a home physiotherapy visit or an
              online consultation.
            </p>
          </div>
          <Link
            href="/bangalore"
            className="text-sm font-bold text-[#136EA8] hover:underline shrink-0"
          >
            View All Service Areas →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeCities.map((city) => (
            <div
              key={city.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#0F1D35]">
                    {city.name} — Home Visits
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-lime-50 border border-lime-200 px-2.5 py-1 text-[11px] font-bold text-lime-800">
                    <Clock className="h-3 w-3 text-[#85B925]" />
                    Home Visits &amp; Scheduled Slots
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-slate-600">
                  Doorstep physiotherapy and 1-on-1 rehabilitation across
                  neighbourhoods in {city.name}.
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {city.areas.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() =>
                        openBookingModal({
                          careMode: homeVisit,
                          locality: `${area}, ${city.name}`,
                          source: `Location Pill (${area})`,
                        })
                      }
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-[#136EA8] hover:bg-sky-50 hover:text-[#136EA8] transition cursor-pointer"
                    >
                      {area}
                    </button>
                  ))}
                  {city.areas.length === 0 && (
                    <span className="text-xs text-slate-400">
                      Add areas for {city.name} in the admin panel
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500">
                  {city.areas.length} areas covered
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      careMode: homeVisit,
                      locality: city.name,
                      source: `City Card (${city.name})`,
                    })
                  }
                  className="inline-flex items-center gap-1 font-bold text-[#136EA8] hover:underline shrink-0 cursor-pointer"
                >
                  Book in {city.name} <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Online — always available alongside home visits */}
          <div className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50/70 to-white p-6 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#0F1D35]">
                  Online — Anywhere in India
                </h3>
                <span className="inline-flex items-center gap-1 rounded-full bg-sky-100 border border-sky-200 px-2.5 py-1 text-[11px] font-bold text-[#136EA8]">
                  <Clock className="h-3 w-3" />
                  Live Video Sessions
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Live 1-on-1 video consultations and guided tele-rehabilitation
                wherever you are — report review, posture correction and a home
                exercise plan.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-sky-100 flex items-center justify-between gap-2 text-xs">
              <span className="text-slate-500">No travel needed</span>
              <button
                type="button"
                onClick={() =>
                  openBookingModal({
                    careMode: "Online Consultation",
                    locality: "Online Consultation",
                    source: "Online Card",
                  })
                }
                className="inline-flex items-center gap-1 font-bold text-[#136EA8] hover:underline shrink-0 cursor-pointer"
              >
                Book Online <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

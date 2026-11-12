"use client";

import React from "react";
import Link from "next/link";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { BANGALORE_ZONES } from "@/data/bangaloreZones";
import { useBookingModal } from "@/context/BookingModalContext";

export function BangaloreNetworkSection() {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="py-16 lg:py-24 bg-slate-50 border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
              <MapPin className="h-3.5 w-3.5 text-[#85B925]" />
              Bangalore Doorstep &amp; Appointment Coverage
            </span>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-extrabold text-[#0F1D35]">
              Serving All Major Corridors Across Bangalore + Pan-India Online
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Skip Outer Ring Road and Silk Board traffic when you&apos;re in
              pain. Tap your Bangalore neighborhood to book a specialist home
              visit or scheduled consultation.
            </p>
          </div>
          <Link
            href="/bangalore"
            className="text-sm font-bold text-[#136EA8] hover:underline shrink-0"
          >
            View Bangalore Coverage Hub →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BANGALORE_ZONES.map((zone) => (
            <div
              key={zone.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-lg sm:text-xl font-extrabold text-[#0F1D35]">
                    {zone.zoneName}
                  </h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-lime-50 border border-lime-200 px-2.5 py-1 text-[11px] font-bold text-lime-800">
                    <Clock className="h-3 w-3 text-[#85B925]" />
                    {zone.responseTime}
                  </span>
                </div>

                <p className="mt-2 text-xs sm:text-sm text-slate-600">
                  {zone.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {zone.neighborhoods.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() =>
                        openBookingModal({
                          careMode: area.includes("Online") || area.includes("NRI")
                            ? "Virtual Tele-Rehab"
                            : "Home Care (Bangalore)",
                          locality: `${area}, Bangalore`,
                          source: `Bangalore Zone Pill (${area})`,
                        })
                      }
                      className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-[#136EA8] hover:bg-sky-50 hover:text-[#136EA8] transition cursor-pointer"
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
                <span className="text-slate-500">
                  Top requests: {zone.popularServices.slice(0, 2).join(" • ")}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    openBookingModal({
                      locality: zone.zoneName,
                      source: `Zone Card (${zone.zoneName})`,
                    })
                  }
                  className="inline-flex items-center gap-1 font-bold text-[#136EA8] hover:underline shrink-0 cursor-pointer"
                >
                  Book in Zone <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

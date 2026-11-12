"use client";

import React from "react";
import Link from "next/link";
import { Home, Video, MonitorSmartphone, CalendarClock, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useBookingModal } from "@/context/BookingModalContext";

const ICONS = {
  "home-care": Home,
  "tele-rehab": Video,
  "online-consultation": MonitorSmartphone,
  "clinic-appointment": CalendarClock,
};

export function CareModesStrip() {
  const { openBookingModal } = useBookingModal();

  return (
    <section className="py-14 lg:py-20 bg-white border-b border-slate-200/70">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
              4 Flexible Care Delivery Formats
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
              Hospital-Grade Specialist Care — Wherever Recovery Works Best
            </h2>
          </div>
          <Link
            href="/care-modes"
            className="text-sm font-bold text-[#136EA8] hover:underline shrink-0"
          >
            Compare All 4 Care Modes →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SITE_CONFIG.careModes.map((mode) => {
            const Icon = ICONS[mode.id];
            return (
              <div
                key={mode.id}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-slate-50/60 p-5 hover:border-[#136EA8] hover:bg-white hover:shadow-xl transition"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0F1D35] text-[#9AD634] group-hover:bg-[#136EA8] group-hover:text-white transition">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-white border border-slate-200 px-2.5 py-1 text-[10px] font-bold text-slate-700">
                      {mode.badge}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-extrabold text-slate-900">
                    {mode.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">
                    {mode.summary}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-200/80 space-y-3">
                  <div className="text-[11px] text-slate-500">
                    <strong className="text-slate-700">Ideal for:</strong>{" "}
                    {mode.bestFor}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      openBookingModal({
                        careMode: mode.shortTitle,
                        source: `Care Mode Card (${mode.shortTitle})`,
                      })
                    }
                    className="inline-flex w-full items-center justify-between rounded-xl bg-white border border-slate-300 px-3.5 py-2.5 text-xs font-bold text-[#0F1D35] group-hover:border-[#0F1D35] group-hover:bg-[#0F1D35] group-hover:text-white transition cursor-pointer"
                  >
                    <span>Book {mode.shortTitle}</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

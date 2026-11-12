"use client";

import React from "react";
import { X, ShieldCheck, Phone } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { BookingForm } from "@/components/booking/BookingForm";
import { SITE_CONFIG } from "@/config/site";

export function BookingDrawerModal() {
  const { isOpen, prefill, closeBookingModal } = useBookingModal();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-label="Book Physiotherapy Assessment"
    >
      <div
        className="absolute inset-0"
        onClick={closeBookingModal}
        aria-hidden="true"
      />
      <div className="relative z-10 flex h-full w-full max-w-xl flex-col overflow-y-auto bg-white shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-[#0F1D35] px-5 py-4 text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#85B925]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-lime-300">
                Runlife Physio • Bangalore & Online
              </span>
            </div>
            <h2 className="mt-0.5 text-lg font-bold">
              Book Your MPT Specialist Assessment
            </h2>
          </div>
          <button
            type="button"
            onClick={closeBookingModal}
            aria-label="Close booking drawer"
            className="rounded-lg bg-white/10 p-2 text-white hover:bg-white/20 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sub-banner */}
        <div className="flex items-center justify-between bg-sky-50 border-b border-sky-100 px-5 py-2.5 text-xs text-slate-700">
          <span className="inline-flex items-center gap-1.5 font-medium">
            <ShieldCheck className="h-4 w-4 text-[#136EA8]" />
            Callback in 15–30 mins by Dr. Vishal&apos;s Specialist Desk
          </span>
          <a
            href={`tel:${SITE_CONFIG.contact.phoneE164}`}
            className="inline-flex items-center gap-1 font-bold text-[#136EA8] hover:underline"
          >
            <Phone className="h-3.5 w-3.5" />
            {SITE_CONFIG.contact.phoneDisplay}
          </a>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-5 sm:p-6">
          <BookingForm prefill={prefill} />
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect } from "react";
import { X, ShieldCheck, Phone, Mail } from "lucide-react";
import { useBookingModal } from "@/context/BookingModalContext";
import { useSiteCms } from "@/context/SiteSettingsContext";
import { BookingForm } from "@/components/booking/BookingForm";
import { citiesShortLabel } from "@/lib/cities";

export function BookingDrawerModal() {
  const { isOpen, prefill, closeBookingModal } = useBookingModal();
  const { settings } = useSiteCms();

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeBookingModal();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, closeBookingModal]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[95] flex items-end sm:items-stretch justify-end bg-slate-950/60 backdrop-blur-xs animate-fade-in-fast"
      role="dialog"
      aria-modal="true"
      aria-label="Book for Consultation"
    >
      <div
        className="absolute inset-0"
        onClick={closeBookingModal}
        aria-hidden="true"
      />
      <div className="relative z-10 flex w-full max-h-[92dvh] sm:max-h-full sm:h-full sm:max-w-xl flex-col overflow-y-auto rounded-t-3xl sm:rounded-none bg-white shadow-2xl animate-sheet-up sm:animate-drawer-in">
        {/* Mobile grab handle */}
        <div className="sm:hidden flex justify-center bg-[#0F1D35] pt-2.5">
          <span className="h-1.5 w-12 rounded-full bg-white/25" />
        </div>

        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-200 bg-[#0F1D35] px-4 sm:px-6 py-3.5 sm:py-4 text-white">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#85B925]" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-lime-300">
                {settings.clinicName} • {citiesShortLabel(settings.serviceCities)} &amp; Online
              </span>
            </div>
            <h2 className="mt-0.5 text-base sm:text-lg font-bold">
              Book for Consultation
            </h2>
          </div>
          <button
            type="button"
            onClick={closeBookingModal}
            aria-label="Close booking drawer"
            className="rounded-xl bg-white/10 min-h-[40px] min-w-[40px] inline-flex items-center justify-center text-white hover:bg-white/20 transition cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Sub-banner */}
        <div className="flex items-center justify-between gap-2 bg-sky-50 border-b border-sky-100 px-4 sm:px-6 py-2.5 text-xs text-slate-700">
          <span className="inline-flex items-center gap-1.5 font-medium truncate">
            <ShieldCheck className="h-4 w-4 text-[#136EA8] shrink-0" />
            <span className="truncate">{settings.callbackPromise}</span>
          </span>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`mailto:${settings.email}`}
              className="hidden sm:inline-flex items-center gap-1 font-bold text-[#136EA8] hover:underline"
            >
              <Mail className="h-3.5 w-3.5" />
              Email
            </a>
            <a
              href={`tel:${settings.phoneE164}`}
              className="inline-flex items-center gap-1 font-bold text-[#136EA8] hover:underline"
            >
              <Phone className="h-3.5 w-3.5" />
              {settings.phoneDisplay}
            </a>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex-1 p-4 sm:p-6 pb-8">
          <BookingForm compact prefill={prefill} />
        </div>
      </div>
    </div>
  );
}

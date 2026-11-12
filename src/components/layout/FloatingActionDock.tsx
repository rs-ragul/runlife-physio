"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, PhoneCall, CalendarCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";
import { useBookingModal } from "@/context/BookingModalContext";

export function FloatingActionDock() {
  const pathname = usePathname();
  const { openBookingModal } = useBookingModal();

  if (pathname?.startsWith("/admin")) return null;

  const waHref = buildPatientToClinicWhatsAppUrl();

  return (
    <>
      {/* Desktop Floating WhatsApp Pill */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-30 flex-col items-end gap-2.5">
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Runlife Physio on WhatsApp"
          className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] pl-4 pr-5 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-900/20 hover:bg-[#1ebe5d] hover:scale-[1.02] transition"
        >
          <MessageCircle className="h-5 w-5 fill-white/20" />
          <span>WhatsApp Specialist</span>
        </a>
      </div>

      {/* Mobile Sticky Bottom Conversion Bar */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md px-3 py-2 shadow-[0_-6px_20px_rgba(15,29,53,0.08)]">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={`tel:${SITE_CONFIG.contact.phoneE164}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 py-2.5 text-xs font-bold text-slate-800"
          >
            <PhoneCall className="h-4 w-4 text-[#136EA8]" />
            Call
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] py-2.5 text-xs font-bold text-white"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => openBookingModal({ source: "Mobile Sticky Bar" })}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0F1D35] py-2.5 text-xs font-bold text-white"
          >
            <CalendarCheck className="h-4 w-4 text-[#9AD634]" />
            Book Now
          </button>
        </div>
      </div>
    </>
  );
}

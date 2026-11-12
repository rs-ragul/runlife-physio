"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, PhoneCall, CalendarCheck } from "lucide-react";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";
import { useBookingModal } from "@/context/BookingModalContext";
import { useSiteCms } from "@/context/SiteSettingsContext";

export function FloatingActionDock() {
  const pathname = usePathname();
  const { openBookingModal } = useBookingModal();
  const { settings } = useSiteCms();

  if (pathname?.startsWith("/admin")) return null;

  const waHref = buildPatientToClinicWhatsAppUrl(
    undefined,
    settings.whatsappNumber,
    settings.whatsappGreeting
  );

  return (
    <>
      {/* Desktop Floating WhatsApp Pill */}
      {settings.showFloatingWhatsApp && (
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
      )}

      {/* Mobile Sticky Bottom Conversion Bar (Safe-Area & 46px Touch Targets) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-6px_24px_rgba(15,29,53,0.1)]">
        <div className="grid grid-cols-3 gap-2">
          <a
            href={`tel:${settings.phoneE164}`}
            className="flex items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 min-h-[46px] text-xs font-extrabold text-slate-900 active:bg-slate-200 transition"
          >
            <PhoneCall className="h-4 w-4 text-[#136EA8]" />
            Call
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] min-h-[46px] text-xs font-extrabold text-white active:opacity-90 transition"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
          <button
            type="button"
            onClick={() => openBookingModal({ source: "Mobile Sticky Bar" })}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-[#0F1D35] min-h-[46px] text-xs font-extrabold text-white active:opacity-90 transition cursor-pointer"
          >
            <CalendarCheck className="h-4 w-4 text-[#9AD634]" />
            Book
          </button>
        </div>
      </div>
    </>
  );
}

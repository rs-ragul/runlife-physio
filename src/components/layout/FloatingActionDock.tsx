"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, PhoneCall, CalendarCheck, Mail } from "lucide-react";
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
      {/* Desktop Floating Email + WhatsApp Action Pills */}
      {settings.showFloatingWhatsApp && (
        <div className="hidden lg:flex fixed bottom-6 right-6 z-30 flex-col items-end gap-2.5">
          <a
            href={`mailto:${settings.email}`}
            aria-label="Send an email to Runlife Physio"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#0F1D35] shadow-lg hover:border-[#136EA8] hover:text-[#136EA8] transition"
          >
            <Mail className="h-4 w-4 text-[#136EA8]" />
            <span>Email Us</span>
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Runlife Physio on WhatsApp"
            className="group inline-flex items-center gap-2.5 rounded-full bg-[#25D366] pl-4 pr-5 py-3 text-sm font-bold text-white shadow-xl shadow-emerald-900/20 hover:bg-[#1ebe5d] hover:scale-[1.02] transition"
          >
            <MessageCircle className="h-5 w-5 fill-white/20" />
            <span>WhatsApp Us</span>
          </a>
        </div>
      )}

      {/* Mobile Sticky Bottom Bar: Call • WhatsApp • Email • Book */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 border-t border-slate-200 bg-white/95 backdrop-blur-md px-2.5 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-[0_-6px_24px_rgba(15,29,53,0.1)]">
        <div className="grid grid-cols-4 gap-1.5">
          <a
            href={`tel:${settings.phoneE164}`}
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl border border-slate-200 bg-slate-50 min-h-[48px] text-[11px] font-extrabold text-slate-900 active:bg-slate-200 transition"
          >
            <PhoneCall className="h-4 w-4 text-[#136EA8]" />
            <span>Call</span>
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-[#25D366] min-h-[48px] text-[11px] font-extrabold text-white active:opacity-90 transition"
          >
            <MessageCircle className="h-4 w-4" />
            <span>WhatsApp</span>
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl border border-slate-200 bg-slate-50 min-h-[48px] text-[11px] font-extrabold text-slate-900 active:bg-slate-200 transition"
          >
            <Mail className="h-4 w-4 text-[#136EA8]" />
            <span>Email</span>
          </a>
          <button
            type="button"
            onClick={() => openBookingModal({ source: "Mobile Sticky Bar" })}
            className="flex flex-col items-center justify-center gap-0.5 rounded-xl bg-[#0F1D35] min-h-[48px] text-[11px] font-extrabold text-white active:opacity-90 transition cursor-pointer"
          >
            <CalendarCheck className="h-4 w-4 text-[#9AD634]" />
            <span>Book</span>
          </button>
        </div>
      </div>
    </>
  );
}

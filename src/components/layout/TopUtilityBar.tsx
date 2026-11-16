"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { useSiteCms } from "@/context/SiteSettingsContext";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";

export function TopUtilityBar() {
  const pathname = usePathname();
  const { settings } = useSiteCms();

  if (pathname?.startsWith("/admin") || !settings.announcementEnabled) {
    return null;
  }

  const waHref = buildPatientToClinicWhatsAppUrl(
    undefined,
    settings.whatsappNumber,
    settings.whatsappGreeting
  );

  return (
    <div className="bg-[#0F1D35] text-slate-200 border-b border-white/10 text-[11px] sm:text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3.5 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="inline-flex items-center gap-1.5 font-medium text-slate-200 truncate">
            <MapPin className="h-3.5 w-3.5 text-[#9AD634] shrink-0" />
            <span className="truncate">{settings.announcementText}</span>
          </span>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <a
            href={`mailto:${settings.email}`}
            className="inline-flex items-center gap-1 text-slate-200 hover:text-lime-300 transition"
            title={`Email ${settings.email}`}
          >
            <Mail className="h-3.5 w-3.5 text-sky-400" />
            <span className="hidden md:inline">{settings.email}</span>
            <span className="md:hidden font-semibold">Email</span>
          </a>
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-slate-200 hover:text-lime-300 transition"
          >
            <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
            <span>WhatsApp</span>
          </a>
          <a
            href={`tel:${settings.phoneE164}`}
            className="inline-flex items-center gap-1.5 font-bold text-white hover:text-lime-300 transition"
          >
            <Phone className="h-3.5 w-3.5 text-[#85B925]" />
            <span>{settings.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

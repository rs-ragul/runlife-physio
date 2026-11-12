"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Phone, Mail, Award, Clock } from "lucide-react";
import { useSiteCms } from "@/context/SiteSettingsContext";

export function TopUtilityBar() {
  const pathname = usePathname();
  const { settings } = useSiteCms();

  if (pathname?.startsWith("/admin") || !settings.announcementEnabled) {
    return null;
  }

  return (
    <div className="bg-[#0F1D35] text-slate-200 border-b border-white/10 text-[11px] sm:text-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3.5 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center gap-4 min-w-0">
          <span className="inline-flex items-center gap-1.5 font-semibold text-lime-300 truncate">
            <Award className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{settings.announcementText}</span>
          </span>
          <span className="hidden xl:inline-flex items-center gap-1.5 text-slate-300 shrink-0">
            <Clock className="h-3.5 w-3.5 text-lime-400" />
            {settings.operatingHours}
          </span>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <a
            href={`mailto:${settings.email}`}
            className="hidden md:inline-flex items-center gap-1.5 text-slate-200 hover:text-lime-300 transition"
          >
            <Mail className="h-3.5 w-3.5 text-sky-400" />
            {settings.email}
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

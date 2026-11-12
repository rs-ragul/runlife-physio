"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Award, Clock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export function TopUtilityBar() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <div className="bg-[#0F1D35] text-slate-200 border-b border-white/10 text-xs">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="inline-flex items-center gap-1.5 font-medium text-lime-300">
            <Award className="h-3.5 w-3.5" />
            100% MPT Specialist Physiotherapy Network
          </span>
          <span className="hidden md:inline-flex items-center gap-1.5 text-slate-300">
            <MapPin className="h-3.5 w-3.5 text-sky-400" />
            Bangalore Home Care &amp; Partner Clinics • Pan-India Tele-Rehab
          </span>
          <span className="hidden xl:inline-flex items-center gap-1.5 text-slate-300">
            <Clock className="h-3.5 w-3.5 text-lime-400" />
            7:00 AM – 9:00 PM Daily
          </span>
        </div>

        <div className="flex items-center gap-4 ml-auto">
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-slate-200 hover:text-lime-300 transition"
          >
            <Mail className="h-3.5 w-3.5 text-sky-400" />
            {SITE_CONFIG.contact.email}
          </a>
          <a
            href={`tel:${SITE_CONFIG.contact.phoneE164}`}
            className="inline-flex items-center gap-1.5 font-bold text-white hover:text-lime-300 transition"
          >
            <Phone className="h-3.5 w-3.5 text-[#85B925]" />
            {SITE_CONFIG.contact.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}

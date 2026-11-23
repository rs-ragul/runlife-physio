"use client";

import { resolveCityText } from "@/lib/cities";
import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  ExternalLink,
} from "lucide-react";
import { useSiteCms } from "@/context/SiteSettingsContext";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";

export function ContactDynamicCards() {
  const { settings } = useSiteCms();

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-5 shadow-xs">
        <h2 className="font-display text-xl font-extrabold text-[#0F1D35]">
          Direct Clinical Channels
        </h2>

        <a
          href={`tel:${settings.phoneE164}`}
          className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-[#136EA8] transition"
        >
          <Phone className="h-5 w-5 text-[#136EA8] mt-0.5 shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Call Care Coordinator
            </div>
            <div className="text-base font-extrabold text-slate-900">
              {settings.phoneDisplay}
            </div>
          </div>
        </a>

        <a
          href={buildPatientToClinicWhatsAppUrl(
            undefined,
            settings.whatsappNumber,
            settings.whatsappGreeting
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-start gap-3.5 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 hover:border-emerald-500 transition"
        >
          <MessageCircle className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Instant WhatsApp Triage
            </div>
            <div className="text-base font-extrabold text-slate-900">
              Chat on WhatsApp ({settings.phoneDisplay})
            </div>
          </div>
        </a>

        <a
          href={`mailto:${settings.email}`}
          className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-4 hover:border-[#136EA8] transition"
        >
          <Mail className="h-5 w-5 text-[#136EA8] mt-0.5 shrink-0" />
          <div className="min-w-0">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Official Email &amp; Reports
            </div>
            <div className="text-sm font-extrabold text-slate-900 break-all">
              {settings.email}
            </div>
          </div>
        </a>

        <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <MapPin className="h-5 w-5 text-[#85B925] mt-0.5 shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Primary City &amp; Coverage
            </div>
            <div className="text-sm font-bold text-slate-900">
              {settings.primaryCity} Specialist Network
            </div>
            {settings.physicalClinicAddress ? (
              <p className="mt-1 text-xs text-slate-600">
                {settings.physicalClinicAddress}
              </p>
            ) : (
              <p className="mt-1 text-xs text-slate-600">
                {resolveCityText(settings.serviceAreasSummary, settings.serviceCities)}
              </p>
            )}
            {settings.googleMapsUrl && (
              <a
                href={settings.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-[#136EA8] hover:underline"
              >
                Open in Google Maps <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3.5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <Clock className="h-5 w-5 text-[#136EA8] mt-0.5 shrink-0" />
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Timings &amp; Consultation Info
            </div>
            <div className="text-sm font-bold text-slate-900">
              {settings.operatingHours}
            </div>
            {settings.consultationFeeNote && (
              <p className="mt-1 text-xs text-slate-600">
                {settings.consultationFeeNote}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

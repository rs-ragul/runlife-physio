"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  ShieldCheck,
  Loader2,
  ArrowRight,
  ChevronDown,
  Home,
  Video,
  MonitorSmartphone,
  CalendarClock,
  Mail,
} from "lucide-react";
import { SPECIALTIES } from "@/data/specialties";
import {
  createAppointmentClient,
  type AppointmentRecord,
} from "@/lib/appointmentsStore";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";
import type { BookingPrefill } from "@/context/BookingModalContext";
import { useSiteCms } from "@/context/SiteSettingsContext";

const CARE_MODE_CARDS = [
  { id: "Home Visit (Bangalore & Salem)", short: "Home Visit", icon: Home },
  { id: "Online Consultation", short: "Online Consult", icon: MonitorSmartphone },
  { id: "Virtual Tele-Rehab", short: "Tele-Rehab", icon: Video },
  { id: "By-Appointment Visit", short: "Clinic Visit", icon: CalendarClock },
];

const TIME_SLOTS = [
  "Earliest Available Today / Tomorrow",
  "Morning (7:00 AM – 11:00 AM)",
  "Mid-Day (11:00 AM – 3:00 PM)",
  "Afternoon (3:00 PM – 6:00 PM)",
  "Evening (6:00 PM – 9:00 PM)",
];

const CITY_AREA_SUGGESTIONS: Record<"Bangalore" | "Salem", string[]> = {
  Bangalore: [
    "Indiranagar",
    "HSR Layout",
    "Koramangala",
    "Whitefield",
    "JP Nagar / Jayanagar",
    "Electronic City",
    "Hebbal / Yelahanka",
  ],
  Salem: [
    "Fairlands",
    "Alagapuram",
    "Hasthampatti",
    "Suramangalam",
    "Five Roads",
    "Seelanaickenpatti",
    "Ammapet / Gugai",
  ],
};

export function BookingForm({
  prefill,
  compact = false,
}: {
  prefill?: BookingPrefill;
  compact?: boolean;
}) {
  const { settings } = useSiteCms();

  const [patientName, setPatientName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [careMode, setCareMode] = useState(
    prefill?.careMode || "Home Visit (Bangalore & Salem)"
  );
  const [selectedCity, setSelectedCity] = useState<"Bangalore" | "Salem">(
    prefill?.locality?.toLowerCase().includes("salem") ? "Salem" : "Bangalore"
  );
  const [specialty, setSpecialty] = useState(
    prefill?.specialty || SPECIALTIES[0].title
  );
  const [conditionOrPain, setConditionOrPain] = useState(
    prefill?.conditionOrPain || ""
  );
  const [locality, setLocality] = useState(prefill?.locality || "");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredSlot, setPreferredSlot] = useState(TIME_SLOTS[0]);
  const [notes, setNotes] = useState("");
  const [showOptionalDetails, setShowOptionalDetails] = useState(!compact);

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedRecord, setSubmittedRecord] =
    useState<AppointmentRecord | null>(null);

  useEffect(() => {
    if (prefill?.careMode) {
      const normalized = prefill.careMode.includes("Home")
        ? "Home Visit (Bangalore & Salem)"
        : prefill.careMode;
      setCareMode(normalized);
    }
    if (prefill?.specialty) setSpecialty(prefill.specialty);
    if (prefill?.conditionOrPain) setConditionOrPain(prefill.conditionOrPain);
    if (prefill?.locality) {
      setLocality(prefill.locality);
      if (prefill.locality.toLowerCase().includes("salem")) {
        setSelectedCity("Salem");
      } else if (prefill.locality.toLowerCase().includes("bangalore")) {
        setSelectedCity("Bangalore");
      }
    }
  }, [prefill]);

  const needsCityArea =
    careMode.includes("Home") || careMode.includes("Appointment");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    const cleanPhone = phone.replace(/\s+/g, "").trim();
    if (patientName.trim().length < 2) {
      setErrorMsg("Please enter the patient's full name.");
      return;
    }
    if (cleanPhone.length < 8) {
      setErrorMsg("Please enter a valid 10-digit mobile / WhatsApp number.");
      return;
    }

    setSubmitting(true);
    try {
      const fullPhone = cleanPhone.startsWith("+")
        ? cleanPhone
        : `${countryCode} ${cleanPhone}`;

      const formattedLocality = needsCityArea
        ? locality.trim()
          ? locality.toLowerCase().includes(selectedCity.toLowerCase())
            ? locality.trim()
            : `${locality.trim()}, ${selectedCity}`
          : selectedCity
        : locality.trim() || "Online Consultation";

      const { record } = await createAppointmentClient({
        patientName: patientName.trim(),
        phone: fullPhone,
        email: email.trim(),
        careMode,
        specialty,
        conditionOrPain: conditionOrPain.trim() || "Consultation",
        locality: formattedLocality,
        preferredDate,
        preferredSlot,
        notes: notes.trim(),
        source: prefill?.source || "Website Booking",
      });
      setSubmittedRecord(record);
    } catch {
      setErrorMsg(
        "Connection interrupted. Please try again or tap WhatsApp below."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedRecord) {
    const waUrl = buildPatientToClinicWhatsAppUrl(
      {
        referenceId: submittedRecord.referenceId,
        patientName: submittedRecord.patientName,
        phone: submittedRecord.phone,
        careMode: submittedRecord.careMode,
        specialty: submittedRecord.specialty,
        conditionOrPain: submittedRecord.conditionOrPain,
        locality: submittedRecord.locality,
        preferredDate: submittedRecord.preferredDate,
        preferredSlot: submittedRecord.preferredSlot,
        notes: submittedRecord.notes,
      },
      settings.whatsappNumber
    );

    return (
      <div className="rounded-2xl border border-lime-200 bg-gradient-to-br from-lime-50/80 via-white to-sky-50/60 p-5 sm:p-7 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#85B925] text-white shadow-sm">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#638E15]">
              Reference ID: {submittedRecord.referenceId}
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Consultation Request Received!
            </h3>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-700">
          Thank you, <strong>{submittedRecord.patientName}</strong>. Our care
          team has received your request for{" "}
          <strong>{submittedRecord.specialty}</strong> (
          {submittedRecord.locality}) and will call you on{" "}
          <strong>{submittedRecord.phone}</strong> shortly to confirm your slot.
        </p>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 min-h-[46px] text-xs sm:text-sm font-extrabold text-white shadow-md hover:bg-[#1ebe5d] transition"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp Us
          </a>
          <a
            href={`tel:${settings.phoneE164}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 min-h-[46px] text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 transition"
          >
            <Phone className="h-4 w-4 text-[#136EA8]" />
            Call Clinic
          </a>
          <a
            href={`mailto:${settings.email}?subject=${encodeURIComponent(
              `Consultation Booking ${submittedRecord.referenceId} — ${submittedRecord.patientName}`
            )}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 min-h-[46px] text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-50 transition"
          >
            <Mail className="h-4 w-4 text-[#136EA8]" />
            Email Reports
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmittedRecord(null);
            setPatientName("");
            setPhone("");
            setConditionOrPain("");
          }}
          className="mt-4 text-xs font-semibold text-[#136EA8] hover:underline cursor-pointer"
        >
          + Submit another consultation request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 1. Care Format Selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          Choose Consultation Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CARE_MODE_CARDS.map((card) => {
            const Icon = card.icon;
            const active = careMode === card.id;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setCareMode(card.id)}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl border px-2.5 py-2.5 text-center transition cursor-pointer min-h-[58px] ${
                  active
                    ? "border-[#136EA8] bg-[#136EA8] text-white shadow-sm"
                    : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-sky-300 hover:bg-white"
                }`}
              >
                <Icon
                  className={`h-4 w-4 ${
                    active ? "text-[#9AD634]" : "text-[#136EA8]"
                  }`}
                />
                <span className="text-xs font-bold leading-tight">
                  {card.short}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Patient Name & Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Patient Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            autoComplete="name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="Full Name"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[46px] text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mobile / WhatsApp <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-1.5">
            <select
              aria-label="Country code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-2.5 min-h-[46px] text-base sm:text-xs font-semibold text-slate-800 focus:border-[#136EA8] focus:outline-none"
            >
              <option value="+91">🇮🇳 +91</option>
              <option value="+971">🇦🇪 +971</option>
              <option value="+1">🇺🇸 +1</option>
              <option value="+44">🇬🇧 +44</option>
              <option value="+65">🇸🇬 +65</option>
              <option value="+61">🇦🇺 +61</option>
            </select>
            <input
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[46px] text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>
      </div>

      {/* 3. City Selector (Bangalore / Salem) + Area Input */}
      {needsCityArea && (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-3.5 space-y-2.5">
          <div className="flex items-center justify-between gap-2">
            <label className="inline-flex items-center gap-1 text-xs font-bold text-slate-700">
              <MapPin className="h-3.5 w-3.5 text-[#136EA8]" />
              Select City &amp; Area
            </label>
            <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
              {(["Bangalore", "Salem"] as const).map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => {
                    setSelectedCity(city);
                    setLocality("");
                  }}
                  className={`rounded-md px-3 py-1 text-xs font-bold transition cursor-pointer ${
                    selectedCity === city
                      ? "bg-[#0F1D35] text-white"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <input
            type="text"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder={
              selectedCity === "Salem"
                ? "Enter Salem area (e.g., Fairlands, Alagapuram, Hasthampatti...)"
                : "Enter Bangalore area (e.g., Indiranagar, HSR Layout, Whitefield...)"
            }
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[44px] text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none"
          />

          <div className="flex flex-wrap gap-1.5">
            {CITY_AREA_SUGGESTIONS[selectedCity].map((area) => (
              <button
                key={area}
                type="button"
                onClick={() => setLocality(`${area}, ${selectedCity}`)}
                className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-600 hover:border-[#136EA8] hover:text-[#136EA8] cursor-pointer"
              >
                {area}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 4. Specialty & Pain/Condition */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Specialty Department
          </label>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[46px] text-base sm:text-sm text-slate-900 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          >
            {SPECIALTIES.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.shortName}
              </option>
            ))}
            <option value="Not Sure — Please Guide Me">
              Not Sure — Please Guide Me
            </option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Pain Area or Condition
          </label>
          <input
            type="text"
            value={conditionOrPain}
            onChange={(e) => setConditionOrPain(e.target.value)}
            placeholder="e.g., Knee pain, Back pain, Post-surgery..."
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[46px] text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none"
          />
        </div>
      </div>

      {/* 5. Optional Scheduling & Email (for Auto-Confirmation Email!) */}
      <div className="rounded-2xl border border-slate-200/90 bg-slate-50/50 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowOptionalDetails((v) => !v)}
          className="flex w-full items-center justify-between px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100/70 transition cursor-pointer"
        >
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-[#136EA8]" />
            Add Email, Preferred Date or Notes (Optional)
          </span>
          <ChevronDown
            className={`h-4 w-4 text-slate-500 transition-transform ${
              showOptionalDetails ? "rotate-180" : ""
            }`}
          />
        </button>

        {showOptionalDetails && (
          <div className="border-t border-slate-200/80 p-3.5 space-y-3 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email (For Auto-Confirmation)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 min-h-[44px] text-base sm:text-sm text-slate-900 focus:border-[#136EA8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 min-h-[44px] text-base sm:text-sm text-slate-900 focus:border-[#136EA8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Time
                </label>
                <select
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3 min-h-[44px] text-base sm:text-sm text-slate-900 focus:border-[#136EA8] focus:outline-none"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention surgery details, MRI findings, or therapist preference..."
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none"
              />
            </div>
          </div>
        )}
      </div>

      {settings.consultationFeeNote && (
        <div className="rounded-xl bg-sky-50 border border-sky-100 px-3.5 py-2 text-xs font-semibold text-sky-900">
          {settings.consultationFeeNote}
        </div>
      )}

      {errorMsg && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-3.5 py-2.5 text-xs font-medium text-rose-700">
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] px-6 min-h-[50px] text-sm sm:text-base font-extrabold text-white shadow-lg hover:bg-[#136EA8] transition disabled:opacity-60 cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Booking Your Consultation...
          </>
        ) : (
          <>
            {settings.primaryCtaText}
            <ArrowRight className="h-4 w-4 text-[#9AD634]" />
          </>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[#85B925]" />
          {settings.callbackPromise}
        </span>
        <div className="flex items-center gap-3">
          <a
            href={buildPatientToClinicWhatsAppUrl(
              undefined,
              settings.whatsappNumber,
              settings.whatsappGreeting
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#136EA8] hover:underline"
          >
            WhatsApp Us
          </a>
          <a
            href={`mailto:${settings.email}`}
            className="font-semibold text-[#136EA8] hover:underline"
          >
            Email Us
          </a>
        </div>
      </div>
    </form>
  );
}

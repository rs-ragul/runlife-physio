"use client";

import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  Sparkles,
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
  { id: "Home Care (Bangalore)", short: "Home Visit", icon: Home },
  { id: "Virtual Tele-Rehab", short: "Tele-Rehab", icon: Video },
  { id: "Online Consultation", short: "Video Consult", icon: MonitorSmartphone },
  { id: "By-Appointment Visit", short: "Clinic Visit", icon: CalendarClock },
];

const TIME_SLOTS = [
  "Earliest Available Today / Tomorrow",
  "Morning (7:00 AM – 11:00 AM)",
  "Mid-Day (11:00 AM – 3:00 PM)",
  "Afternoon (3:00 PM – 6:00 PM)",
  "Evening (6:00 PM – 9:00 PM)",
];

const BANGALORE_QUICK_AREAS = [
  "Indiranagar",
  "HSR Layout",
  "Koramangala",
  "Whitefield",
  "JP Nagar / Jayanagar",
  "Sarjapur Road / Bellandur",
  "Electronic City",
  "Malleswaram / Hebbal / Yelahanka",
];

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
    prefill?.careMode || "Home Care (Bangalore)"
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
    if (prefill?.careMode) setCareMode(prefill.careMode);
    if (prefill?.specialty) setSpecialty(prefill.specialty);
    if (prefill?.conditionOrPain) setConditionOrPain(prefill.conditionOrPain);
    if (prefill?.locality) {
      setLocality(prefill.locality);
      setShowOptionalDetails(true);
    }
  }, [prefill]);

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
      const { record } = await createAppointmentClient({
        patientName: patientName.trim(),
        phone: fullPhone,
        email: email.trim(),
        careMode,
        specialty,
        conditionOrPain: conditionOrPain.trim() || "Specialist Evaluation",
        locality:
          locality.trim() ||
          (careMode.includes("Home") || careMode.includes("Appointment")
            ? settings.primaryCity
            : "Online / Tele-Rehab"),
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
            <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-lime-300">
              Booking Ref: {submittedRecord.referenceId}
            </span>
            <h3 className="mt-1 text-lg sm:text-xl font-bold text-slate-900">
              Assessment Request Confirmed!
            </h3>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Thank you, <strong>{submittedRecord.patientName}</strong>. Your
          request is assigned to our{" "}
          <strong className="text-[#136EA8]">{submittedRecord.specialty}</strong>{" "}
          team ({submittedRecord.careMode}). Our desk will call{" "}
          <strong>{submittedRecord.phone}</strong> shortly to confirm your slot.
        </p>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3.5 text-xs sm:text-sm text-slate-700 space-y-1">
          <div>
            <span className="font-semibold text-slate-900">Mode:</span>{" "}
            {submittedRecord.careMode} ({submittedRecord.locality})
          </div>
          <div>
            <span className="font-semibold text-slate-900">Focus:</span>{" "}
            {submittedRecord.conditionOrPain}
          </div>
          <div>
            <span className="font-semibold text-slate-900">Timing:</span>{" "}
            {submittedRecord.preferredDate || "Earliest Available"} •{" "}
            {submittedRecord.preferredSlot}
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 min-h-[48px] text-sm font-bold text-white shadow-md hover:bg-[#1ebe5d] transition"
          >
            <MessageCircle className="h-5 w-5 shrink-0" />
            Send Priority Summary on WhatsApp
          </a>
          <a
            href={`tel:${settings.phoneE164}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 min-h-[48px] text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
          >
            <Phone className="h-4 w-4 text-[#136EA8]" />
            Call Desk
          </a>
        </div>

        <button
          type="button"
          onClick={() => {
            setSubmittedRecord(null);
            setPatientName("");
            setPhone("");
            setNotes("");
          }}
          className="mt-4 text-xs font-semibold text-slate-500 underline hover:text-slate-800 cursor-pointer"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* 1. Care Mode Visual Cards (Easy Mobile Thumb Taps) */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          1. Choose Care Mode
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

      {/* 2. Patient Name & Mobile (16px text-base prevents iOS/Android auto-zoom!) */}
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

      {/* 3. Department & Condition */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            MPT Specialist Department
          </label>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[46px] text-base sm:text-sm text-slate-900 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          >
            {SPECIALTIES.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.shortName} — {s.specialistCredential.replace(" Specialist", "")}
              </option>
            ))}
            <option value="Not Sure — Help Me Choose Right MPT Specialist">
              Not Sure — Help Me Choose
            </option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Pain Area / Condition
          </label>
          <input
            type="text"
            value={conditionOrPain}
            onChange={(e) => setConditionOrPain(e.target.value)}
            placeholder="e.g., Knee Pain, ACL, Sciatica, Stroke"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[46px] text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>

      {/* Collapsible Optional Scheduling Details (Keeps Mobile Drawer Fast & Compact!) */}
      <div className="rounded-xl border border-slate-200/90 bg-slate-50/50 overflow-hidden">
        <button
          type="button"
          onClick={() => setShowOptionalDetails(!showOptionalDetails)}
          className="flex w-full items-center justify-between px-3.5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100/70 transition cursor-pointer"
        >
          <span>
            {showOptionalDetails
              ? "Scheduling & Area Preferences (Optional)"
              : "+ Add Area, Preferred Date / Time or Notes (Optional)"}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-slate-500 transition-transform ${
              showOptionalDetails ? "rotate-180" : ""
            }`}
          />
        </button>

        {showOptionalDetails && (
          <div className="p-3.5 pt-2 border-t border-slate-200/70 space-y-3 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  <MapPin className="inline h-3.5 w-3.5 text-[#136EA8] mr-1" />
                  {settings.primaryCity} Area / City
                </label>
                <input
                  type="text"
                  list="bangalore-areas-datalist"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g., HSR Layout, Indiranagar"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[44px] text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none"
                />
                <datalist id="bangalore-areas-datalist">
                  {BANGALORE_QUICK_AREAS.map((area) => (
                    <option key={area} value={`${area}, Bangalore`} />
                  ))}
                </datalist>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[44px] text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  <Calendar className="inline h-3.5 w-3.5 text-[#136EA8] mr-1" />
                  Preferred Start Date
                </label>
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[44px] text-base sm:text-sm text-slate-900 focus:border-[#136EA8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Time Window
                </label>
                <select
                  value={preferredSlot}
                  onChange={(e) => setPreferredSlot(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[44px] text-base sm:text-sm text-slate-900 focus:border-[#136EA8] focus:outline-none"
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
                Brief History / Reports Note{" "}
                <span className="text-slate-400 font-normal">(Optional)</span>
              </label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Mention surgery date, MRI findings, or male/female therapist preference..."
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
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F1D35] via-[#136EA8] to-[#0F1D35] px-6 min-h-[50px] text-sm sm:text-base font-extrabold text-white shadow-lg shadow-sky-900/15 hover:opacity-95 active:scale-[0.99] transition disabled:opacity-60 cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Submitting Request...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 text-[#9AD634]" />
            {settings.primaryCtaText}
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[#85B925]" />
          {settings.callbackPromise}
        </span>
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
          Or book via WhatsApp →
        </a>
      </div>
    </form>
  );
}

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
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SPECIALTIES } from "@/data/specialties";
import {
  createAppointmentClient,
  type AppointmentRecord,
} from "@/lib/appointmentsStore";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";
import type { BookingPrefill } from "@/context/BookingModalContext";

const CARE_MODE_OPTIONS = [
  "Home Care (Bangalore)",
  "Virtual Tele-Rehab",
  "Online Consultation",
  "By-Appointment Visit",
];

const TIME_SLOTS = [
  "Morning (7:00 AM – 11:00 AM)",
  "Mid-Day (11:00 AM – 3:00 PM)",
  "Afternoon (3:00 PM – 6:00 PM)",
  "Evening (6:00 PM – 9:00 PM)",
  "Earliest Available Today / Tomorrow",
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

  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [submittedRecord, setSubmittedRecord] =
    useState<AppointmentRecord | null>(null);

  useEffect(() => {
    if (prefill?.careMode) setCareMode(prefill.careMode);
    if (prefill?.specialty) setSpecialty(prefill.specialty);
    if (prefill?.conditionOrPain) setConditionOrPain(prefill.conditionOrPain);
    if (prefill?.locality) setLocality(prefill.locality);
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
          (careMode.includes("Bangalore") ? "Bangalore" : "Online / Tele-Rehab"),
        preferredDate,
        preferredSlot,
        notes: notes.trim(),
        source: prefill?.source || "Website Booking",
      });
      setSubmittedRecord(record);
    } catch {
      setErrorMsg(
        "Something interrupted submission. Please try again or tap WhatsApp below."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submittedRecord) {
    const waUrl = buildPatientToClinicWhatsAppUrl({
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
    });

    return (
      <div className="rounded-2xl border border-lime-200 bg-gradient-to-br from-lime-50/80 via-white to-sky-50/60 p-6 sm:p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#85B925] text-white shadow-sm">
            <CheckCircle2 className="h-6 w-6" />
          </div>
          <div>
            <span className="inline-flex items-center rounded-full bg-slate-900 px-2.5 py-0.5 text-xs font-semibold text-lime-300">
              Booking Ref: {submittedRecord.referenceId}
            </span>
            <h3 className="mt-1 text-xl font-bold text-slate-900">
              Assessment Request Confirmed!
            </h3>
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Thank you, <strong>{submittedRecord.patientName}</strong>. Your intake
          has been logged for our{" "}
          <strong className="text-[#136EA8]">{submittedRecord.specialty}</strong>{" "}
          team ({submittedRecord.careMode}). Dr. Vishal&apos;s desk will call{" "}
          <strong>{submittedRecord.phone}</strong> shortly to confirm your slot.
        </p>

        <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-xs sm:text-sm text-slate-700 space-y-1.5">
          <div>
            <span className="font-semibold text-slate-900">Care Mode:</span>{" "}
            {submittedRecord.careMode} ({submittedRecord.locality})
          </div>
          <div>
            <span className="font-semibold text-slate-900">Condition / Focus:</span>{" "}
            {submittedRecord.conditionOrPain}
          </div>
          <div>
            <span className="font-semibold text-slate-900">Requested Timing:</span>{" "}
            {submittedRecord.preferredDate || "Earliest Available"} •{" "}
            {submittedRecord.preferredSlot}
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-3">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#1ebe5d] transition"
          >
            <MessageCircle className="h-5 w-5" />
            Send Instant Priority Summary on WhatsApp
          </a>
          <a
            href={`tel:${SITE_CONFIG.contact.phoneE164}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition"
          >
            <Phone className="h-4 w-4 text-[#136EA8]" />
            Call {SITE_CONFIG.contact.phoneDisplay}
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
          className="mt-4 text-xs font-medium text-slate-500 underline hover:text-slate-800"
        >
          Book another appointment
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Care Mode Pills */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
          1. Select Care Delivery Mode
        </label>
        <div className="grid grid-cols-2 gap-2">
          {CARE_MODE_OPTIONS.map((mode) => {
            const active = careMode === mode;
            return (
              <button
                key={mode}
                type="button"
                onClick={() => setCareMode(mode)}
                className={`rounded-xl border px-3 py-2.5 text-left text-xs sm:text-sm font-semibold transition ${
                  active
                    ? "border-[#136EA8] bg-[#136EA8] text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-sky-300 hover:bg-sky-50/40"
                }`}
              >
                {mode}
              </button>
            );
          })}
        </div>
      </div>

      {/* Patient Name & Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Patient Full Name <span className="text-rose-500">*</span>
          </label>
          <input
            type="text"
            required
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            placeholder="e.g., Rahul Sharma"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mobile / WhatsApp Number <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-1.5">
            <select
              aria-label="Country code"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="rounded-xl border border-slate-300 bg-slate-50 px-2.5 py-2.5 text-xs font-semibold text-slate-800 focus:border-[#136EA8] focus:outline-none"
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
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="98450 XXXXX"
              className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
            />
          </div>
        </div>
      </div>

      {/* MPT Department & Pain Area */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            MPT Specialist Department
          </label>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          >
            {SPECIALTIES.map((s) => (
              <option key={s.slug} value={s.title}>
                {s.shortName} — {s.specialistCredential}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Condition / Where Does It Hurt?
          </label>
          <input
            type="text"
            value={conditionOrPain}
            onChange={(e) => setConditionOrPain(e.target.value)}
            placeholder="e.g., ACL Post-Op, Sciatica, Stroke, Running Knee"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>

      {/* Bangalore Locality / City + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            <MapPin className="inline h-3.5 w-3.5 text-[#136EA8] mr-1" />
            Bangalore Locality / City
          </label>
          <input
            type="text"
            list="bangalore-areas-datalist"
            value={locality}
            onChange={(e) => setLocality(e.target.value)}
            placeholder="e.g., HSR Layout, Indiranagar, Whitefield"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
          <datalist id="bangalore-areas-datalist">
            {BANGALORE_QUICK_AREAS.map((area) => (
              <option key={area} value={`${area}, Bangalore`} />
            ))}
          </datalist>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
        </div>
      </div>

      {/* Date & Preferred Time Window */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            <Calendar className="inline h-3.5 w-3.5 text-[#136EA8] mr-1" />
            Preferred Start Date
          </label>
          <input
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Preferred Time Window
          </label>
          <select
            value={preferredSlot}
            onChange={(e) => setPreferredSlot(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          >
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>
      </div>

      {!compact && (
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Brief Clinical History / Surgery Date{" "}
            <span className="text-slate-400 font-normal">(Optional)</span>
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Share symptom duration, recent surgery/MRI findings, or preference for male/female MPT specialist..."
            className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-[#136EA8] focus:outline-none focus:ring-2 focus:ring-sky-100"
          />
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
        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0F1D35] via-[#136EA8] to-[#0F1D35] px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-lg shadow-sky-900/15 hover:opacity-95 transition disabled:opacity-60 cursor-pointer"
      >
        {submitting ? (
          <>
            <Loader2 className="h-5 w-5 animate-spin" />
            Assigning MPT Specialist...
          </>
        ) : (
          <>
            <Sparkles className="h-4 w-4 text-[#9AD634]" />
            Request MPT Specialist Assessment
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-[11px] text-slate-500">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-3.5 w-3.5 text-[#85B925]" />
          100% Confidential Clinical Triage • Treated by MPT Specialists
        </span>
        <a
          href={buildPatientToClinicWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#136EA8] hover:underline"
        >
          Or chat directly on WhatsApp →
        </a>
      </div>
    </form>
  );
}

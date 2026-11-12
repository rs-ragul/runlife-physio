"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, UserPlus } from "lucide-react";
import { createInquiryClient } from "@/lib/appointmentsStore";

export function JoinNetworkForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [qualification, setQualification] = useState("MPT (Orthopedics)");
  const [experienceYears, setExperienceYears] = useState("");
  const [city, setCity] = useState("Bangalore");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    try {
      await createInquiryClient({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        type: "mpt-network-application",
        specialtyOrQualification: qualification,
        experienceYears: experienceYears.trim(),
        city: city.trim(),
        message: message.trim() || "Interested in joining Runlife MPT Specialist Network.",
      });
      setDone(true);
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="rounded-2xl border border-lime-200 bg-lime-50 p-6 text-center space-y-2">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#85B925]" />
        <h3 className="text-lg font-extrabold text-slate-900">
          Specialist Credential Received!
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Thank you, {name}. Dr. Vishal&apos;s clinical credentialing team will
          review your MPT profile and reach out shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3.5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Dr. Full Name (PT) *"
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
        />
        <input
          type="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile / WhatsApp Number *"
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <select
          value={qualification}
          onChange={(e) => setQualification(e.target.value)}
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
        >
          <option>MPT (Orthopedics)</option>
          <option>MPT (Neurology)</option>
          <option>MPT (Sports)</option>
          <option>MPT (Pediatrics)</option>
          <option>MPT (OBG / Women&apos;s Health)</option>
        </select>
        <input
          type="text"
          value={experienceYears}
          onChange={(e) => setExperienceYears(e.target.value)}
          placeholder="Years of Experience"
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Bangalore Zone / City"
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
        />
      </div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Professional Email Address"
        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
      />
      <textarea
        rows={3}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Briefly mention hospital/clinic background, certifications, and preferred Bangalore zones..."
        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] px-6 py-3 text-sm font-bold text-white hover:bg-[#136EA8] transition cursor-pointer"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <UserPlus className="h-4 w-4 text-[#9AD634]" />
        )}
        Submit MPT Specialist Application
      </button>
    </form>
  );
}

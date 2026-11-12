"use client";

import React, { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { createInquiryClient } from "@/lib/appointmentsStore";

export function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("Bangalore");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setLoading(true);
    try {
      await createInquiryClient({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        city: city.trim(),
        type: "patient-question",
        message: message.trim() || "Callback requested via Contact Page.",
      });
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-lime-200 bg-lime-50 p-6 text-center space-y-2">
        <CheckCircle2 className="mx-auto h-10 w-10 text-[#85B925]" />
        <h3 className="text-lg font-extrabold text-slate-900">
          Message Received!
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Thank you, {name}. Our clinical desk will respond shortly on {phone}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Full Name *"
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[46px] text-base sm:text-sm"
        />
        <input
          type="tel"
          inputMode="tel"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Mobile / WhatsApp Number *"
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[46px] text-base sm:text-sm"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address (Optional)"
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[46px] text-base sm:text-sm"
        />
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Bangalore Area / City"
          className="w-full rounded-xl border border-slate-300 bg-white px-3.5 min-h-[46px] text-base sm:text-sm"
        />
      </div>
      <textarea
        rows={4}
        required
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="How can Dr. Vishal & our MPT Specialist team help you?"
        className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-base sm:text-sm"
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] px-6 min-h-[48px] text-sm font-extrabold text-white hover:bg-[#136EA8] transition cursor-pointer"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Send className="h-4 w-4 text-[#9AD634]" />
        )}
        Send Message to Clinic Desk
      </button>
    </form>
  );
}

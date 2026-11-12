import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";
import { ContactForm } from "./ContactForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Runlife Physio Bangalore — Helpline, WhatsApp & Home Visits",
  description:
    "Call +91 91876 79723 or email runlifephysio@gmail.com to connect with Dr. Vishal & Runlife Physio's MPT Specialist team in Bangalore.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ])}
      />

      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-18">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            Direct Clinical Support
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold">
            Speak With Dr. Vishal&apos;s Specialist Desk
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-slate-300 max-w-2xl">
            Have a question about post-op home care in Bangalore, tele-rehab
            pricing, or which MPT specialist matches your reports? Reach out
            anytime.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 space-y-5 shadow-2xs">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#136EA8]">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-slate-400">
                  Phone &amp; Appointment Desk
                </div>
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                  className="text-lg font-extrabold text-[#0F1D35] hover:text-[#136EA8]"
                >
                  {SITE_CONFIG.contact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <MessageCircle className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-slate-400">
                  Instant WhatsApp Triage
                </div>
                <a
                  href={buildPatientToClinicWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-bold text-emerald-700 hover:underline"
                >
                  Chat on WhatsApp (+91 91876 79723) →
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#136EA8]">
                <Mail className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-slate-400">
                  Email Reports / Inquiries
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-sm font-bold text-[#0F1D35] hover:text-[#136EA8]"
                >
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime-50 text-[#638E15]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-slate-400">
                  Service Coverage
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {SITE_CONFIG.location.flagshipHubNote}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold uppercase text-slate-400">
                  Operating Hours
                </div>
                <p className="text-xs sm:text-sm font-semibold text-slate-700">
                  {SITE_CONFIG.contact.hours}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
          <h2 className="font-display text-2xl font-extrabold text-[#0F1D35] mb-1">
            Send Us a Message
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mb-6">
            Logged directly into Dr. Vishal&apos;s clinic desk for prompt
            follow-up.
          </p>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}

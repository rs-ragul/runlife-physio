import type { Metadata } from "next";
import { Phone, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";
import { SITE_CONFIG } from "@/config/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Book an MPT Physiotherapy Appointment — Home Care & Tele-Rehab",
  description:
    "Plan your consultation with Runlife Physio in Bangalore or Online. Share your symptoms and Dr. Vishal's MPT Specialist team will call back within 15–30 minutes.",
  alternates: { canonical: "/book" },
};

export default function BookAppointmentPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Book Appointment", path: "/book" },
        ])}
      />

      <section className="bg-[#0F1D35] bg-navy-grid text-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            Plan Your Consultation
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold">
            Book Your Specialist Physiotherapy Assessment
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-slate-300 max-w-2xl">
            Home Visits across Bangalore • Live Virtual Tele-Rehabilitation •
            Online Video Consultations • Scheduled Clinic Visits
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-lg">
          <BookingForm prefill={{ source: "Dedicated /book Page" }} />
        </div>

        <div className="lg:col-span-5 space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 space-y-4">
            <h2 className="font-display text-xl font-extrabold text-[#0F1D35]">
              How Your Booking Works
            </h2>
            {[
              {
                step: "1. Share Brief Details",
                desc: "Select Home Care, Tele-Rehab, Online, or Appointment visit and tell us what is troubling you.",
              },
              {
                step: "2. 15-Min Clinical Triage Call",
                desc: "Dr. Vishal's desk calls to understand your history and assign the exact Ortho, Neuro, Sports, Pediatric, or Women's Health MPT Specialist.",
              },
              {
                step: "3. Root-Cause Assessment & Plan",
                desc: "Your MPT Specialist evaluates your movement, provides hands-on/guided relief, and sets clear REHAB • RECOVER • RUN milestones.",
              },
            ].map((s) => (
              <div key={s.step} className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-[#85B925] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-sm text-slate-900">
                    {s.step}
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-3xl bg-[#0F1D35] p-6 text-white space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-[#9AD634]">
              <Clock className="h-4 w-4" />
              Urgent Post-Op or Acute Pain Slot?
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Call our direct specialist helpline for immediate Bangalore
              dispatch or same-day video triage:
            </p>
            <a
              href={`tel:${SITE_CONFIG.contact.phoneE164}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-extrabold text-[#0F1D35]"
            >
              <Phone className="h-4 w-4 text-[#136EA8]" />
              {SITE_CONFIG.contact.phoneDisplay}
            </a>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#85B925]" />
              Private &amp; confidential patient health records
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

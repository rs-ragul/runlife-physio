import type { Metadata } from "next";
import { BookingForm } from "@/components/booking/BookingForm";
import { ContactForm } from "./ContactForm";
import { ContactDynamicCards } from "./ContactDynamicCards";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact & Book Appointment | Bangalore & Online",
  description:
    "Book an MPT Specialist Physiotherapy appointment with Dr. Vishal's Runlife Physio team in Bangalore. Call or WhatsApp +91 91876 79723 or email runlifephysio@gmail.com.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact & Book", path: "/contact" },
        ])}
      />

      <section className="bg-[#0F1D35] bg-navy-grid text-white py-12 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            Direct Clinical Desk
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold">
            Book Your Specialist Assessment or Speak With Us
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-slate-300 max-w-2xl">
            Whether you need urgent post-surgery Home Care in Bangalore, a
            Pediatric/Neuro specialist, or a virtual second opinion—our care
            desk responds promptly.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5">
          <ContactDynamicCards />
        </div>

        <div className="lg:col-span-7 space-y-8">
          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F1D35] mb-1">
              Book an MPT Specialist Appointment
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-5">
              Fast 3-tap booking — instantly synced to our clinic desk &amp;
              WhatsApp.
            </p>
            <BookingForm prefill={{ source: "Contact Page Booking Form" }} />
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
            <h2 className="font-display text-xl font-extrabold text-[#0F1D35] mb-1">
              Have a General Question?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-5">
              Drop us a quick note and we&apos;ll call or message you back.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}

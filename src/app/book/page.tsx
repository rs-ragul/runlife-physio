import type { Metadata } from "next";
import { Phone, Mail, MessageCircle, ShieldCheck, Clock, CheckCircle2 } from "lucide-react";
import { BookingForm } from "@/components/booking/BookingForm";
import { SITE_CONFIG } from "@/config/site";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { getServerCitiesLabel } from "@/lib/serverCities";

export async function generateMetadata(): Promise<Metadata> {
  const cities = await getServerCitiesLabel();
  return {
    title: `Book for Consultation — ${cities} & Online`,
    description: `Book a physiotherapy consultation with Runlife Physio in ${cities}, or Online. Home visits, video consultations, and scheduled care led by Dr. Vishal S, PT.`,
    alternates: { canonical: "/book" },
  };
}

export default async function BookAppointmentPage() {
  const cities = await getServerCitiesLabel();
  const waHref = buildPatientToClinicWhatsAppUrl();

  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Book for Consultation", path: "/book" },
        ])}
      />

      <section className="bg-[#0F1D35] bg-navy-grid text-white py-12 lg:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            Runlife Physio
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold">
            Book for Consultation
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-slate-300 max-w-2xl">
            Home Visits in {cities} • Online Video Consultations • Live
            Tele-Rehab • Scheduled Appointments
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
              How Your Consultation Works
            </h2>
            {[
              {
                step: "1. Share Your Details",
                desc: `Choose Home Visit (${cities}), Online Consultation, Tele-Rehab, or By-Appointment Visit.`,
              },
              {
                step: "2. Quick Confirmation Call",
                desc: "Our team calls you shortly to understand your symptoms and match the right physiotherapist.",
              },
              {
                step: "3. Personalized Care & Recovery Plan",
                desc: "Your physiotherapist evaluates your condition, starts treatment, and guides your step-by-step recovery.",
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
              Prefer to Reach Out Directly?
            </div>
            <p className="text-xs sm:text-sm text-slate-300">
              Call, WhatsApp, or Email our desk for slots in {cities},
              or Online:
            </p>
            <div className="flex flex-wrap gap-2">
              <a
                href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white px-3.5 py-2.5 text-xs font-extrabold text-[#0F1D35]"
              >
                <Phone className="h-3.5 w-3.5 text-[#136EA8]" />
                Call
              </a>
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-3.5 py-2.5 text-xs font-extrabold text-white"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                WhatsApp
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="inline-flex items-center gap-1.5 rounded-xl border border-white/25 bg-white/10 px-3.5 py-2.5 text-xs font-extrabold text-white"
              >
                <Mail className="h-3.5 w-3.5 text-sky-300" />
                Email
              </a>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="h-3.5 w-3.5 text-[#85B925]" />
              Private &amp; confidential patient details
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

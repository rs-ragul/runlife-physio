import type { Metadata } from "next";
import { MapPin, Clock, CheckCircle2, Phone, Mail } from "lucide-react";
import { BANGALORE_ZONES } from "@/data/bangaloreZones";
import { SITE_CONFIG } from "@/config/site";
import { OpenModalButton } from "@/components/booking/OpenModalButton";
import { BookingForm } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title:
    "Home Physiotherapy in Bangalore & Salem — Doorstep & Online Consultations",
  description:
    "Book specialist home physiotherapy visits and consultations across Bangalore (HSR, Indiranagar, Whitefield, Koramangala, JP Nagar) and Salem (Fairlands, Alagapuram, Hasthampatti, Suramangalam).",
  alternates: { canonical: "/bangalore" },
};

export default function LocationsHubPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Bangalore & Salem Locations", path: "/bangalore" },
        ])}
      />

      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            <MapPin className="h-4 w-4" />
            Bangalore &amp; Salem Coverage
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold max-w-4xl">
            Physiotherapy at Home &amp; By Appointment in Bangalore &amp; Salem
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Led by {SITE_CONFIG.founder.name}, Runlife Physio provides dedicated
            Orthopedic, Neurological, Sports, Pediatric, and Women&apos;s Health
            physiotherapy at your home in <strong>Bangalore</strong> and{" "}
            <strong>Salem</strong>, as well as online video consultations.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {BANGALORE_ZONES.map((zone) => (
            <div
              key={zone.id}
              className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F1D35]">
                    {zone.zoneName}
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-lime-50 border border-lime-200 px-3 py-1 text-xs font-bold text-lime-800">
                    <Clock className="h-3.5 w-3.5 text-[#85B925]" />
                    {zone.responseTime}
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600">{zone.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {zone.neighborhoods.map((n) => (
                    <span
                      key={n}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                    >
                      {n}
                    </span>
                  ))}
                </div>

                <div className="mt-5 space-y-1.5 border-t border-slate-100 pt-4">
                  {zone.popularServices.map((srv) => (
                    <div
                      key={srv}
                      className="flex items-center gap-2 text-xs sm:text-sm text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#85B925] shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <OpenModalButton
                  prefill={{
                    careMode:
                      zone.city === "Online"
                        ? "Online Consultation"
                        : "Home Visit (Bangalore & Salem)",
                    locality:
                      zone.city === "Online"
                        ? "Online Consultation"
                        : zone.city,
                    source: `Locations Page (${zone.zoneName})`,
                  }}
                  className="w-full rounded-xl bg-[#0F1D35] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#136EA8] transition cursor-pointer"
                >
                  Book for Consultation in {zone.city}
                </OpenModalButton>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Booking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
              Book a Home Visit or Consultation in Bangalore or Salem
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Select your city and enter your area—our care coordinator will
              call you back promptly to confirm a convenient appointment time.
            </p>
            <div className="space-y-2 pt-1">
              <a
                href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                className="flex items-center gap-2 text-base font-extrabold text-[#136EA8] hover:underline"
              >
                <Phone className="h-4 w-4 text-[#85B925]" />
                Call: {SITE_CONFIG.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-[#136EA8]"
              >
                <Mail className="h-4 w-4 text-[#136EA8]" />
                Email: {SITE_CONFIG.contact.email}
              </a>
            </div>
          </div>
          <div className="lg:col-span-7">
            <BookingForm
              prefill={{
                careMode: "Home Visit (Bangalore & Salem)",
                source: "Locations Hub Bottom Form",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

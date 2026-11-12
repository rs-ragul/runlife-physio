import type { Metadata } from "next";
import { MapPin, Clock, CheckCircle2, Phone } from "lucide-react";
import { BANGALORE_ZONES } from "@/data/bangaloreZones";
import { SITE_CONFIG } from "@/config/site";
import { OpenModalButton } from "@/components/booking/OpenModalButton";
import { BookingForm } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title:
    "Home Physiotherapy in Bangalore — HSR, Indiranagar, Whitefield, Koramangala & JP Nagar",
  description:
    "Book Master of Physiotherapy (MPT) Specialists at home across Bangalore—HSR Layout, Indiranagar, Whitefield, Koramangala, JP Nagar, Jayanagar, Sarjapur, Hebbal & Electronic City.",
  alternates: { canonical: "/bangalore" },
};

export default function BangaloreHubPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Physiotherapy in Bangalore", path: "/bangalore" },
        ])}
      />

      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            <MapPin className="h-4 w-4" />
            Bangalore Specialist Physiotherapy Network
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold max-w-4xl">
            MPT Specialist Physiotherapy at Home &amp; By Appointment Across
            Bangalore
          </h1>
          <p className="mt-4 text-sm sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Led by {SITE_CONFIG.founder.name}, Runlife Physio dispatches
            domain-matched MPT Specialists across South, East, North, Central
            &amp; West Bengaluru—bringing clinic-grade Ortho, Neuro, Sports,
            Pediatric, and Women&apos;s Health rehab directly to your doorstep.
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
                    careMode: "Home Care (Bangalore)",
                    locality: zone.zoneName,
                    source: `Bangalore Page (${zone.zoneName})`,
                  }}
                  className="w-full rounded-xl bg-[#0F1D35] px-5 py-3 text-xs sm:text-sm font-bold text-white hover:bg-[#136EA8] transition cursor-pointer"
                >
                  Book Specialist in {zone.zoneName}
                </OpenModalButton>
              </div>
            </div>
          ))}
        </div>

        {/* Bangalore Booking Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-md">
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
              Check Same-Day Slot Availability in Your Bangalore Pin Code
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Enter your apartment/locality and condition—our coordinator will
              confirm the nearest available MPT Specialist slot within 15–30
              minutes.
            </p>
            <a
              href={`tel:${SITE_CONFIG.contact.phoneE164}`}
              className="inline-flex items-center gap-2 text-base font-extrabold text-[#136EA8] hover:underline"
            >
              <Phone className="h-4 w-4 text-[#85B925]" />
              Direct Bangalore Desk: {SITE_CONFIG.contact.phoneDisplay}
            </a>
          </div>
          <div className="lg:col-span-7">
            <BookingForm
              prefill={{
                careMode: "Home Care (Bangalore)",
                source: "Bangalore Hub Bottom Form",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

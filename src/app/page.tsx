import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CareModesStrip } from "@/components/home/CareModesStrip";
import { InteractiveBodyTriage } from "@/components/home/InteractiveBodyTriage";
import { SpecialtiesShowcase } from "@/components/home/SpecialtiesShowcase";
import { RehabRecoverRunPathway } from "@/components/home/RehabRecoverRunPathway";
import { RecoveryReadinessQuiz } from "@/components/home/RecoveryReadinessQuiz";
import { FounderSpotlight } from "@/components/home/FounderSpotlight";
import { BangaloreNetworkSection } from "@/components/home/BangaloreNetworkSection";
import { TestimonialsAndFaqSection } from "@/components/home/TestimonialsAndFaq";
import { HOME_FAQS } from "@/data/faqs";
import { BookingForm } from "@/components/booking/BookingForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildFaqSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/config/site";
import { Phone, Mail, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildFaqSchema(HOME_FAQS)} />

      <HeroSection />
      <CareModesStrip />
      <InteractiveBodyTriage />
      <SpecialtiesShowcase />
      <RehabRecoverRunPathway />
      <RecoveryReadinessQuiz />
      <FounderSpotlight />
      <BangaloreNetworkSection />

      {/* Inline Full Assessment Section (Mirrors and upgrades reference conversion flow) */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
                Start With an MPT Evaluation
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F1D35]">
                We Measure What&apos;s Restricted, Find the Root Cause &amp; Map
                Your Timeline.
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                Leave your details and{" "}
                <strong className="text-slate-900">
                  {SITE_CONFIG.founder.name}&apos;s
                </strong>{" "}
                clinical triage desk will call you within 15–30 minutes to
                assign the right MPT Specialist for your Bangalore home visit,
                tele-rehab session, or scheduled appointment.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Orthopedic & Post-Surgical Rehab — MPT (Ortho)",
                  "Stroke, Parkinson's, GBS & SCI — MPT (Neuro)",
                  "ACL, Running Gait & Return-to-Sport S&C — MPT (Sports)",
                  "CP, Autism Motor & GDD Milestones — MPT (Pediatrics)",
                  "Antenatal, Postnatal & Pelvic Floor — MPT (Women's Health)",
                ].map((line) => (
                  <div
                    key={line}
                    className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700"
                  >
                    <CheckCircle2 className="h-4 w-4 text-[#85B925] shrink-0" />
                    <span>{line}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2.5 shadow-2xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Direct Clinical Helpline
                </div>
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                  className="flex items-center gap-2.5 text-base font-extrabold text-[#0F1D35] hover:text-[#136EA8]"
                >
                  <Phone className="h-4 w-4 text-[#85B925]" />
                  {SITE_CONFIG.contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="flex items-center gap-2.5 text-sm font-medium text-slate-600 hover:text-[#136EA8]"
                >
                  <Mail className="h-4 w-4 text-[#136EA8]" />
                  {SITE_CONFIG.contact.email}
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl">
              <BookingForm prefill={{ source: "Homepage Inline Booking Form" }} />
            </div>
          </div>
        </div>
      </section>

      <TestimonialsAndFaqSection />
    </>
  );
}

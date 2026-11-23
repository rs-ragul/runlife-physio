import React from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { CareModesStrip } from "@/components/home/CareModesStrip";
import { InteractiveBodyTriage } from "@/components/home/InteractiveBodyTriage";
import { SpecialtiesShowcase } from "@/components/home/SpecialtiesShowcase";
import { HandsOnTherapiesSection } from "@/components/home/HandsOnTherapiesSection";
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
import { DEFAULT_SITE_SETTINGS } from "@/lib/cmsDefaults";
import { joinCitiesNatural } from "@/lib/cities";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";
import { Phone, Mail, MessageCircle, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  const waHref = buildPatientToClinicWhatsAppUrl();

  return (
    <>
      <JsonLd data={buildFaqSchema(HOME_FAQS)} />

      <HeroSection />
      <CareModesStrip />
      <InteractiveBodyTriage />
      <SpecialtiesShowcase />
      <HandsOnTherapiesSection />
      <RehabRecoverRunPathway />
      <RecoveryReadinessQuiz />
      <FounderSpotlight />
      <BangaloreNetworkSection />

      {/* Inline Consultation Booking Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
                Book for Consultation
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-extrabold text-[#0F1D35]">
                Speak With Our Physiotherapy Team &amp; Start Your Recovery
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-slate-600">
                Share your details and{" "}
                <strong className="text-slate-900">
                  {SITE_CONFIG.founder.name}&apos;s
                </strong>{" "}
                care desk will call you shortly to arrange a Home Visit in{" "}
                <strong>
                  {joinCitiesNatural(DEFAULT_SITE_SETTINGS.serviceCities)}
                </strong>
                , an Online Video Consultation, or a Scheduled Appointment.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  "Orthopedic, Joint & Post-Surgery Rehabilitation",
                  "Stroke, Parkinson's & Neurological Rehab",
                  "Sports Injuries, ACL & Running Recovery",
                  "Pediatric Motor Milestones & Child Rehab",
                  "Pregnancy, Postnatal & Women's Health Care",
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

              <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Reach Us Directly
                </div>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-extrabold text-[#0F1D35] hover:border-[#136EA8]"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#136EA8]" />
                    Call {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-3.5 py-2.5 text-xs font-extrabold text-white hover:bg-[#1ebe5d]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    WhatsApp
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-extrabold text-[#0F1D35] hover:border-[#136EA8]"
                  >
                    <Mail className="h-3.5 w-3.5 text-[#136EA8]" />
                    Email Us
                  </a>
                </div>
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Award,
  ShieldCheck,
  Target,
  HeartHandshake,
  BadgeCheck,
  GraduationCap,
  MapPin,
  Phone,
  MessageCircle,
  Mail,
  CalendarCheck,
  Brain,
  Stethoscope,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SPECIALTIES } from "@/data/specialties";
import { JoinNetworkForm } from "./JoinNetworkForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";
import { getServerCitiesLabel } from "@/lib/serverCities";

export async function generateMetadata(): Promise<Metadata> {
  const cities = await getServerCitiesLabel();
  return {
    title: "About Dr. Vishal S, PT — MPT (Neurology & Neurosurgery) | Runlife Physio",
    description: `Meet Dr. Vishal S, PT — MPT (Neurology & Neurosurgery), MIAP Reg. No. L-60915, Founder of Runlife Physio (REHAB · RECOVER · RUN). Specialist physiotherapy in ${cities} — Home Visits, Tele-Rehab & Online Consultations.`,
    alternates: { canonical: "/about" },
  };
}

export default async function AboutPage() {
  const waHref = buildPatientToClinicWhatsAppUrl();
  const cities = await getServerCitiesLabel();

  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Runlife Physio", path: "/about" },
        ])}
      />

      {/* Hero */}
      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
              About Runlife Physio • {cities}
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-extrabold leading-tight">
              One Unified Platform. Five Master-Level Physiotherapy Specialties.
            </h1>
            <p className="text-sm sm:text-lg text-slate-300 leading-relaxed">
              {SITE_CONFIG.founder.bio}
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-bold">
                <GraduationCap className="h-4 w-4 text-[#9AD634]" />
                MPT (Neurology &amp; Neurosurgery)
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#85B925] px-3 py-1.5 text-xs font-extrabold text-slate-950">
                <BadgeCheck className="h-4 w-4" />
                MIAP Reg. No. L-60915
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-bold">
                <MapPin className="h-4 w-4 text-[#9AD634]" />
                {cities} • Home &amp; Online
              </span>
            </div>
          </div>
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl max-w-sm w-full aspect-[3/4] max-h-[520px] border-4 border-white/10">
              <Image
                src="/images/profiles/dr-vishal.jpg"
                alt="Dr. Vishal S, PT — MPT (Neurology & Neurosurgery), MIAP Reg. No. L-60915, Founder of Runlife Physio"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 36vw"
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1D35]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[11px] font-bold uppercase tracking-widest text-[#9AD634]">
                  Founder &amp; Clinical Lead
                </div>
                <div className="text-2xl font-extrabold leading-tight">
                  Dr. Vishal S, PT
                </div>
                <div className="text-xs text-slate-200">
                  MPT (Neurology &amp; Neurosurgery) • MIAP Reg. No. L-60915
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet Dr. Vishal — Full Profile */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        <section className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Photo side */}
            <div className="lg:col-span-4 relative bg-slate-100 min-h-[320px]">
              <div className="relative aspect-[3/4] lg:aspect-auto lg:absolute lg:inset-0">
                <Image
                  src="/images/profiles/dr-vishal.jpg"
                  alt="Dr. Vishal S, PT — Founder, Runlife Physio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover object-top"
                />
              </div>
              <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/95 backdrop-blur px-4 py-3 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-16 shrink-0 rounded-lg bg-white border border-slate-200 p-1">
                    <Image
                      src="/images/runlife-logo.png"
                      alt="Runlife Physio Logo"
                      fill
                      sizes="64px"
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-[#0F1D35] leading-tight">
                      Runlife Physio
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500">
                      REHAB · RECOVER · RUN
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Details side */}
            <div className="lg:col-span-8 p-6 sm:p-10 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
                  Meet Your Founder
                </span>
                <h2 className="mt-2 font-display text-2xl sm:text-4xl font-extrabold text-[#0F1D35] leading-tight">
                  Dr. Vishal S, PT
                </h2>
                <p className="mt-1 text-sm font-bold text-slate-700">
                  MPT (Neurology &amp; Neurosurgery) • MIAP Reg. No. L-60915
                </p>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                  Dr. Vishal S, PT founded Runlife Physio with a simple belief —
                  every patient deserves care from a specialist trained for
                  their exact condition, not whoever happens to be free. With a
                  Master of Physiotherapy in Neurology &amp; Neurosurgery, he
                  leads a network of post-graduate MPT specialists across
                  Orthopedics, Neurology, Sports &amp; Running Rehab,
                  Pediatrics, and Women&apos;s Health — serving patients at home
                  and online across {cities}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#136EA8]">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Qualification
                    </div>
                    <div className="text-sm font-extrabold text-[#0F1D35]">
                      MPT (Neurology &amp; Neurosurgery)
                    </div>
                    <div className="text-xs text-slate-600">
                      Master of Physiotherapy
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-50 text-[#638E15]">
                    <BadgeCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Professional Registration
                    </div>
                    <div className="text-sm font-extrabold text-[#0F1D35]">
                      MIAP Reg. No. L-60915
                    </div>
                    <div className="text-xs text-slate-600">
                      Indian Association of Physiotherapists
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-[#136EA8]">
                    <Brain className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Specialization Focus
                    </div>
                    <div className="text-sm font-extrabold text-[#0F1D35]">
                      Neurology &amp; Neurosurgery Rehab
                    </div>
                    <div className="text-xs text-slate-600">
                      Stroke, Gait &amp; Balance, Neuro Recovery
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-50 text-[#638E15]">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Serving
                    </div>
                    <div className="text-sm font-extrabold text-[#0F1D35]">
                      {cities}
                    </div>
                    <div className="text-xs text-slate-600">
                      Home Visits + Online Tele-Rehab
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-[#0F1D35] p-5 text-white">
                <div className="flex items-start gap-3">
                  <Stethoscope className="h-5 w-5 text-[#9AD634] shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed text-slate-200">
                    <strong className="text-white">Clinical approach:</strong>{" "}
                    1-on-1 hands-on assessment, clear explanation of your
                    condition, and a measurable REHAB · RECOVER · RUN plan —
                    coordinated with your surgeon, neurologist, or doctor
                    whenever needed.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#85B925] px-5 min-h-[46px] text-sm font-extrabold text-slate-950 hover:bg-[#76a81f] transition"
                >
                  <CalendarCheck className="h-4 w-4" />
                  Book for Consultation
                </Link>
                <a
                  href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 min-h-[46px] text-sm font-bold text-[#0F1D35] hover:border-[#136EA8] transition"
                >
                  <Phone className="h-4 w-4 text-[#136EA8]" />
                  Call {SITE_CONFIG.contact.phoneDisplay}
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-4 min-h-[46px] text-sm font-bold text-white hover:bg-[#1ebe5d] transition"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 min-h-[46px] text-sm font-bold text-[#0F1D35] hover:border-[#136EA8] transition"
                >
                  <Mail className="h-4 w-4 text-[#136EA8]" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Core Clinical Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Award,
              title: "Strict MPT Sub-Specialty Matching",
              desc: "Orthopedic cases see an MPT (Ortho). Stroke & GBS patients see an MPT (Neuro). Runners see an MPT (Sports). Children see an MPT (Pediatric). Mothers see an MPT (OBG).",
            },
            {
              icon: Target,
              title: "Measured REHAB • RECOVER • RUN Gates",
              desc: "We replace vague session counts with objective range-of-motion, strength symmetry, and balance milestones.",
            },
            {
              icon: HeartHandshake,
              title: "Patient-First Hybrid Accessibility",
              desc: `Seamless continuity between ${cities} Home Care, Virtual Tele-Rehabilitation, Online Consults, and Scheduled Visits.`,
            },
          ].map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-2xs"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-[#136EA8]">
                  <Icon className="h-6 w-6" />
                </div>
                <h2 className="mt-4 font-display text-xl font-extrabold text-[#0F1D35]">
                  {v.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Specialist Guarantee Matrix */}
        <section className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10">
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
            Our Non-Negotiable Specialist Charter
          </h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {SPECIALTIES.map((s) => (
              <div
                key={s.slug}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 space-y-2"
              >
                <ShieldCheck className="h-5 w-5 text-[#85B925]" />
                <div className="font-bold text-sm text-[#0F1D35]">
                  {s.shortName}
                </div>
                <div className="text-xs font-semibold text-[#136EA8]">
                  {s.specialistCredential}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Join Runlife Specialist Network */}
        <section className="rounded-3xl border border-sky-200 bg-gradient-to-br from-sky-50/70 to-white p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#136EA8]">
                Careers &amp; Clinical Empanelment
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
                Are You an MPT Specialist in {cities.split(",")[0]}? Join the Runlife Network
              </h2>
              <p className="text-xs sm:text-sm leading-relaxed text-slate-600">
                We partner with passionate, post-graduate MPT Physiotherapists
                across Orthopedics, Neurology, Sports, Pediatrics, and
                Women&apos;s Health who believe in ethical, evidence-based 1-on-1
                patient outcomes.
              </p>
            </div>
            <div className="lg:col-span-7">
              <JoinNetworkForm />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

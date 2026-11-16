"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Lock,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { SPECIALTIES } from "@/data/specialties";
import { THERAPIES } from "@/data/therapies";
import { CONDITIONS } from "@/data/conditions";
import { useSiteCms } from "@/context/SiteSettingsContext";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";

export function Footer() {
  const pathname = usePathname();
  const { settings } = useSiteCms();

  if (pathname?.startsWith("/admin")) return null;

  const socialLinks = [
    { label: "Instagram", url: settings.instagramUrl },
    { label: "YouTube", url: settings.youtubeUrl },
    { label: "LinkedIn", url: settings.linkedinUrl },
    { label: "Facebook", url: settings.facebookUrl },
    { label: "Google Reviews", url: settings.googleReviewUrl },
  ].filter((s) => Boolean(s.url));

  const waHref = buildPatientToClinicWhatsAppUrl(
    undefined,
    settings.whatsappNumber,
    settings.whatsappGreeting
  );

  return (
    <footer className="bg-[#0B1629] text-slate-300 border-t border-slate-800 pb-24 lg:pb-0">
      {/* Top CTA Strip */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#0F1D35] via-[#153459] to-[#0F1D35]">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-start md:items-center justify-between gap-5 px-4 sm:px-6 lg:px-8 py-9 sm:py-11">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9AD634]">
              <ShieldCheck className="h-4 w-4" />
              {settings.tagline}
            </span>
            <h2 className="mt-1.5 text-xl sm:text-3xl font-extrabold text-white">
              Ready to Start Your Recovery?
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-300 max-w-2xl">
              Home Visits across {settings.primaryCity}, Online Video
              Consultations &amp; Scheduled Visits—led by {settings.founderName}.
            </p>
          </div>
          <div className="flex flex-wrap w-full md:w-auto gap-2.5 shrink-0">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-xl bg-[#85B925] px-5 py-3 text-sm font-extrabold text-slate-950 shadow-lg hover:bg-[#96cf2d] transition"
            >
              {settings.primaryCtaText}
            </Link>
            <a
              href={`tel:${settings.phoneE164}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
            >
              <Phone className="h-4 w-4 text-[#9AD634]" />
              Call
            </a>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-3 text-sm font-bold text-white hover:bg-[#1ebe5d] transition"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </a>
            <a
              href={`mailto:${settings.email}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-bold text-white hover:bg-white/10 transition"
            >
              <Mail className="h-4 w-4 text-sky-300" />
              Email
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-9">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-sm">
              <div className="relative h-11 w-15">
                <Image
                  src="/images/runlife-logo.png"
                  alt={settings.clinicName}
                  fill
                  sizes="60px"
                  className="object-contain"
                />
              </div>
              <div className="leading-none">
                <div className="font-display text-lg font-extrabold">
                  <span className="text-[#136EA8]">RUN</span>
                  <span className="text-[#6EA319]">LIFE</span>{" "}
                  <span className="text-[#0F1D35]">PHYSIO</span>
                </div>
                <div className="mt-1 text-[10px] font-bold tracking-widest text-slate-500 uppercase">
                  {settings.tagline}
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed text-slate-400">
              Founded by{" "}
              <strong className="text-white">{settings.founderName}</strong>,{" "}
              {settings.clinicName} brings dedicated physiotherapy specialists
              in Orthopedics, Neurology, Sports, Pediatrics, and Women&apos;s
              Health under one platform across {settings.primaryCity}.
            </p>

            <div className="space-y-2 text-sm pt-1">
              <a
                href={`tel:${settings.phoneE164}`}
                className="flex items-center gap-2.5 text-white font-semibold hover:text-[#9AD634]"
              >
                <Phone className="h-4 w-4 text-[#85B925]" />
                {settings.phoneDisplay}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-[#9AD634] break-all"
              >
                <Mail className="h-4 w-4 text-sky-400 shrink-0" />
                {settings.email}
              </a>

              {settings.physicalClinicAddress ? (
                <div className="flex items-start gap-2.5 text-slate-300 text-xs leading-relaxed">
                  <MapPin className="h-4 w-4 text-[#9AD634] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Clinic Address:</strong>
                    {settings.physicalClinicAddress}
                    {settings.googleMapsUrl && (
                      <a
                        href={settings.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-flex items-center gap-1 text-sky-400 font-semibold hover:underline block"
                      >
                        Open in Google Maps <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-start gap-2.5 text-slate-400 text-xs leading-relaxed">
                  <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                  <span>{settings.serviceAreasSummary}</span>
                </div>
              )}
            </div>

            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {socialLinks.map((soc) => (
                  <a
                    key={soc.label}
                    href={soc.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-white/15 transition"
                  >
                    {soc.label}
                    <ExternalLink className="h-3 w-3 opacity-70" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Specialties & Therapies */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-3">
              Specialties
            </h3>
            <ul className="space-y-2 text-sm">
              {SPECIALTIES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-slate-400 hover:text-lime-300 transition"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-xs font-bold uppercase tracking-widest text-white mt-6 mb-3">
              Therapies &amp; HYROX
            </h3>
            <ul className="space-y-2 text-sm">
              {THERAPIES.map((t) => (
                <li key={t.slug}>
                  <Link
                    href={`/therapies/${t.slug}`}
                    className="text-slate-400 hover:text-lime-300 transition"
                  >
                    {t.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Conditions */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Conditions Treated
            </h3>
            <ul className="space-y-2 text-sm">
              {CONDITIONS.slice(0, 8).map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/conditions/${c.slug}`}
                    className="text-slate-400 hover:text-lime-300 transition"
                  >
                    {c.shortTitle}
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  href="/conditions"
                  className="text-sky-400 font-semibold hover:underline"
                >
                  Browse All {CONDITIONS.length} Conditions →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white">
                  About {settings.founderName}
                </Link>
              </li>
              <li>
                <Link
                  href="/bangalore"
                  className="text-slate-400 hover:text-white"
                >
                  Bangalore &amp; Salem
                </Link>
              </li>
              {settings.showBlogSection && (
                <li>
                  <Link href="/blog" className="text-slate-400 hover:text-white">
                    Recovery Guides
                  </Link>
                </li>
              )}
              <li>
                <Link href="/book" className="text-slate-400 hover:text-white">
                  Book for Consultation
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-slate-400 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-slate-400 hover:text-white">
                  Terms &amp; Disclaimer
                </Link>
              </li>
              <li className="pt-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-300"
                >
                  <Lock className="h-3 w-3" />
                  Admin / Doctor Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {settings.clinicName}. All rights
            reserved.
          </p>
          <p className="max-w-xl text-slate-500">
            Clinical Notice: Educational content on this website does not replace
            an in-person medical examination. For acute emergencies, visit your
            nearest hospital immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}

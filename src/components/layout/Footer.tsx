"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, ShieldCheck, Lock } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SPECIALTIES } from "@/data/specialties";
import { CONDITIONS } from "@/data/conditions";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-[#0B1629] text-slate-300 border-t border-slate-800 pb-20 lg:pb-0">
      {/* Top Clinical CTA Strip */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#0F1D35] via-[#153459] to-[#0F1D35]">
        <div className="mx-auto flex max-w-7xl flex-col md:flex-row items-start md:items-center justify-between gap-6 px-4 sm:px-6 lg:px-8 py-10">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#9AD634]">
              <ShieldCheck className="h-4 w-4" />
              REHAB • RECOVER • RUN
            </span>
            <h2 className="mt-1.5 text-2xl sm:text-3xl font-extrabold text-white">
              Ready to Start Recovery With the Right MPT Specialist?
            </h2>
            <p className="mt-1 text-sm text-slate-300 max-w-2xl">
              Home Care across Bangalore, live Virtual Tele-Rehabilitation, Online
              Video Consultations &amp; Scheduled Appointments—led by{" "}
              {SITE_CONFIG.founder.name}.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link
              href="/book"
              className="inline-flex items-center justify-center rounded-xl bg-[#85B925] px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-lg hover:bg-[#96cf2d] transition"
            >
              Book Clinical Assessment
            </Link>
            <a
              href={`tel:${SITE_CONFIG.contact.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-5 py-3.5 text-sm font-bold text-white hover:bg-white/10 transition"
            >
              <Phone className="h-4 w-4 text-[#9AD634]" />
              {SITE_CONFIG.contact.phoneDisplay}
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="inline-flex items-center gap-3 rounded-2xl bg-white px-4 py-2.5 shadow-sm">
              <div className="relative h-12 w-16">
                <Image
                  src="/images/runlife-logo.png"
                  alt="Runlife Physio"
                  fill
                  sizes="64px"
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
                  Specialist Physio Network
                </div>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-slate-400">
              Founded by <strong className="text-white">{SITE_CONFIG.founder.name}</strong>,
              Runlife Physio brings dedicated Master of Physiotherapy (MPT)
              Specialists in Orthopedics, Neurology, Sports, Pediatrics, and
              Women&apos;s Health under one trusted clinical platform in Bangalore.
            </p>

            <div className="space-y-2 text-sm pt-1">
              <a
                href={`tel:${SITE_CONFIG.contact.phoneE164}`}
                className="flex items-center gap-2.5 text-white font-semibold hover:text-[#9AD634]"
              >
                <Phone className="h-4 w-4 text-[#85B925]" />
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
              <a
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-2.5 text-slate-300 hover:text-[#9AD634]"
              >
                <Mail className="h-4 w-4 text-sky-400" />
                {SITE_CONFIG.contact.email}
              </a>
              <div className="flex items-start gap-2.5 text-slate-400 text-xs leading-relaxed">
                <MapPin className="h-4 w-4 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  Bangalore Specialist Network (HSR, Indiranagar, Koramangala,
                  Whitefield, JP Nagar, Jayanagar, Hebbal &amp; Electronic City) +
                  Pan-India Tele-Rehab
                </span>
              </div>
            </div>
          </div>

          {/* 5 MPT Specialties */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              MPT Departments
            </h3>
            <ul className="space-y-2.5 text-sm">
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
              <li className="pt-1">
                <Link
                  href="/care-modes"
                  className="text-sky-400 font-semibold hover:underline"
                >
                  Home Care &amp; Virtual Tele-Rehab →
                </Link>
              </li>
            </ul>
          </div>

          {/* High-Search Conditions */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Key Conditions Treated
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

          {/* Quick Links & Bangalore SEO */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-white mb-4">
              Platform &amp; Care
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white">
                  About Dr. Vishal
                </Link>
              </li>
              <li>
                <Link
                  href="/bangalore"
                  className="text-slate-400 hover:text-white"
                >
                  Bangalore Zones
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-400 hover:text-white">
                  Recovery Articles
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-slate-400 hover:text-white">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white">
                  Contact &amp; Join Network
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
                  Doctor Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright + Clinical Note */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.name} (
            {SITE_CONFIG.legalName}). All rights reserved.
          </p>
          <p className="max-w-xl text-slate-500">
            Clinical Notice: Educational content on this website does not replace an
            individualized physical examination. For acute medical emergencies,
            visit your nearest emergency hospital immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}

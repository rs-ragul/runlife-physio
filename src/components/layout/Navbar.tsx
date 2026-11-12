"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  PhoneCall,
  CalendarCheck,
  ArrowRight,
  Stethoscope,
} from "lucide-react";
import { SPECIALTIES } from "@/data/specialties";
import { SITE_CONFIG } from "@/config/site";
import { useBookingModal } from "@/context/BookingModalContext";

export function Navbar() {
  const pathname = usePathname();
  const { openBookingModal } = useBookingModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        {/* Brand Logo Lockup */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label="Runlife Physio Home"
        >
          <div className="relative h-13 w-16 sm:h-14 sm:w-18 shrink-0">
            <Image
              src="/images/runlife-logo.png"
              alt="Runlife Physio Logo"
              fill
              sizes="72px"
              priority
              className="object-contain"
            />
          </div>
          <div className="leading-none">
            <div className="font-display text-lg sm:text-xl font-extrabold tracking-tight">
              <span className="text-[#136EA8]">RUN</span>
              <span className="text-[#6EA319]">LIFE</span>{" "}
              <span className="text-[#0F1D35]">PHYSIO</span>
            </div>
            <div className="mt-1 text-[10px] font-bold tracking-[0.18em] text-slate-500 uppercase">
              Rehab • Recover • Run
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {/* Specialties Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <Link
              href="/services"
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
            >
              MPT Specialties
              <ChevronDown className="h-4 w-4 opacity-70" />
            </Link>

            {servicesOpen && (
              <div className="absolute left-0 top-full pt-2 w-[560px]">
                <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                  <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      5 Specialist MPT Departments Under One Platform
                    </span>
                    <Link
                      href="/services"
                      className="text-xs font-bold text-[#136EA8] hover:underline"
                    >
                      View All →
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5">
                    {SPECIALTIES.map((spec) => (
                      <Link
                        key={spec.slug}
                        href={`/services/${spec.slug}`}
                        onClick={() => setServicesOpen(false)}
                        className="flex items-start justify-between gap-3 rounded-xl p-2.5 hover:bg-sky-50/70 transition group"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-slate-900 group-hover:text-[#136EA8]">
                              {spec.title}
                            </span>
                          </div>
                          <p className="mt-0.5 text-xs text-slate-500 line-clamp-1">
                            {spec.shortDescription}
                          </p>
                        </div>
                        <span className="shrink-0 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-700">
                          {spec.specialistCredential.replace(" Specialist", "")}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/conditions"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
          >
            Conditions
          </Link>
          <Link
            href="/care-modes"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
          >
            Home &amp; Tele-Rehab
          </Link>
          <Link
            href="/bangalore"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
          >
            Bangalore Hub
          </Link>
          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
          >
            About Dr. Vishal
          </Link>
          <Link
            href="/blog"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
          >
            Recovery Guides
          </Link>
          <Link
            href="/contact"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2.5">
          <a
            href={`tel:${SITE_CONFIG.contact.phoneE164}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:border-[#136EA8] hover:text-[#136EA8] transition"
          >
            <PhoneCall className="h-3.5 w-3.5 text-[#136EA8]" />
            Call Now
          </a>
          <button
            type="button"
            onClick={() => openBookingModal({ source: "Header CTA" })}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F1D35] px-4 py-2.5 text-xs xl:text-sm font-bold text-white shadow-md hover:bg-[#136EA8] transition cursor-pointer"
          >
            <CalendarCheck className="h-4 w-4 text-[#9AD634]" />
            Book Assessment
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => openBookingModal({ source: "Mobile Header CTA" })}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#136EA8] px-3 py-2 text-xs font-bold text-white shadow-xs"
          >
            Book
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="rounded-xl border border-slate-200 p-2 text-slate-800 hover:bg-slate-100"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pb-6 pt-3 shadow-xl max-h-[82vh] overflow-y-auto">
          <div className="space-y-1">
            <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
              MPT Specialist Departments
            </div>
            {SPECIALTIES.map((spec) => (
              <Link
                key={spec.slug}
                href={`/services/${spec.slug}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-800 hover:bg-sky-50"
              >
                <span className="inline-flex items-center gap-2">
                  <Stethoscope className="h-4 w-4 text-[#136EA8]" />
                  {spec.shortName}
                </span>
                <span className="text-[11px] text-slate-500">
                  {spec.specialistCredential.replace(" Specialist", "")}
                </span>
              </Link>
            ))}

            <div className="my-2 border-t border-slate-100 pt-2" />
            {[
              { label: "All Conditions A–Z", href: "/conditions" },
              { label: "Care Modes (Home & Tele-Rehab)", href: "/care-modes" },
              { label: "Bangalore Service Zones", href: "/bangalore" },
              { label: "About Dr. Vishal & MPT Network", href: "/about" },
              { label: "Clinical Recovery Blog", href: "/blog" },
              { label: "Book Full Assessment Page", href: "/book" },
              { label: "Contact & Helpline", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                {item.label}
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-200">
            <a
              href={`tel:${SITE_CONFIG.contact.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 py-3 text-xs font-bold text-slate-800"
            >
              <PhoneCall className="h-4 w-4 text-[#136EA8]" />
              Call Clinic
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openBookingModal({ source: "Mobile Drawer" });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] py-3 text-xs font-bold text-white"
            >
              <CalendarCheck className="h-4 w-4 text-[#9AD634]" />
              Book Slot
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

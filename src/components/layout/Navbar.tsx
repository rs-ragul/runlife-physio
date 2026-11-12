"use client";

import React, { useState, useEffect } from "react";
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
import { useSiteCms } from "@/context/SiteSettingsContext";
import { useBookingModal } from "@/context/BookingModalContext";

export function Navbar() {
  const pathname = usePathname();
  const { settings } = useSiteCms();
  const { openBookingModal } = useBookingModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSpecOpen, setMobileSpecOpen] = useState(true);
  const [servicesOpen, setServicesOpen] = useState(false);

  // Close mobile menu on route change & lock scroll when open
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3.5 sm:px-6 lg:px-8 h-17 sm:h-20">
        {/* Brand Logo Lockup */}
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-2.5 group shrink-0"
          aria-label="Runlife Physio Home"
        >
          <div className="relative h-11 w-14 sm:h-14 sm:w-18 shrink-0">
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
            <div className="font-display text-base sm:text-xl font-extrabold tracking-tight">
              <span className="text-[#136EA8]">RUN</span>
              <span className="text-[#6EA319]">LIFE</span>{" "}
              <span className="text-[#0F1D35]">PHYSIO</span>
            </div>
            <div className="mt-0.5 sm:mt-1 text-[9px] sm:text-[10px] font-bold tracking-[0.16em] text-slate-500 uppercase">
              {settings.tagline}
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
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
                          <span className="text-sm font-bold text-slate-900 group-hover:text-[#136EA8]">
                            {spec.title}
                          </span>
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
            {settings.primaryCity} Hub
          </Link>
          <Link
            href="/about"
            className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
          >
            About
          </Link>
          {settings.showBlogSection && (
            <Link
              href="/blog"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
            >
              Guides
            </Link>
          )}
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
            href={`tel:${settings.phoneE164}`}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs font-bold text-slate-800 hover:border-[#136EA8] hover:text-[#136EA8] transition"
          >
            <PhoneCall className="h-3.5 w-3.5 text-[#136EA8]" />
            Call Desk
          </a>
          <button
            type="button"
            onClick={() => openBookingModal({ source: "Header CTA" })}
            className="inline-flex items-center gap-2 rounded-xl bg-[#0F1D35] px-4 py-2.5 text-xs xl:text-sm font-bold text-white shadow-md hover:bg-[#136EA8] transition cursor-pointer"
          >
            <CalendarCheck className="h-4 w-4 text-[#9AD634]" />
            {settings.primaryCtaText}
          </button>
        </div>

        {/* Mobile Actions (44px+ touch targets) */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={() => openBookingModal({ source: "Mobile Header CTA" })}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F1D35] px-3.5 min-h-[42px] text-xs font-extrabold text-white shadow-xs active:scale-95 transition"
          >
            <CalendarCheck className="h-3.5 w-3.5 text-[#9AD634]" />
            Book
          </button>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 min-h-[42px] min-w-[42px] text-slate-800 hover:bg-slate-100 active:scale-95 transition"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Full-Height Thumb-Friendly Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 z-50 bg-white overflow-y-auto px-4 pt-3 pb-28">
          <div className="space-y-1.5">
            {/* Collapsible MPT Specialties */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-2">
              <button
                type="button"
                onClick={() => setMobileSpecOpen(!mobileSpecOpen)}
                className="flex w-full items-center justify-between px-3 py-2.5 text-xs font-extrabold uppercase tracking-wider text-[#0F1D35]"
              >
                <span>5 MPT Specialist Departments</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileSpecOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {mobileSpecOpen && (
                <div className="mt-1 space-y-1">
                  {SPECIALTIES.map((spec) => (
                    <Link
                      key={spec.slug}
                      href={`/services/${spec.slug}`}
                      className="flex items-center justify-between rounded-xl bg-white px-3.5 py-3 text-sm font-bold text-slate-800 border border-slate-100 active:bg-sky-50"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Stethoscope className="h-4 w-4 text-[#136EA8]" />
                        {spec.shortName}
                      </span>
                      <span className="text-[11px] font-semibold text-[#136EA8]">
                        {spec.specialistCredential.replace(" Specialist", "")}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {[
              { label: "Conditions Library (A–Z)", href: "/conditions" },
              { label: "4 Care Modes (Home & Tele-Rehab)", href: "/care-modes" },
              { label: `${settings.primaryCity} Coverage Areas`, href: "/bangalore" },
              { label: `About ${settings.founderName} & Team`, href: "/about" },
              ...(settings.showBlogSection
                ? [{ label: "Clinical Recovery Guides", href: "/blog" }]
                : []),
              { label: "Full Appointment Page", href: "/book" },
              { label: "Contact & Helpline", href: "/contact" },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center justify-between rounded-xl border border-slate-100 px-4 py-3.5 text-base font-semibold text-slate-800 active:bg-slate-100"
              >
                {item.label}
                <ArrowRight className="h-4 w-4 text-slate-400" />
              </Link>
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-slate-200">
            <a
              href={`tel:${settings.phoneE164}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-slate-50 min-h-[48px] text-sm font-bold text-slate-900"
            >
              <PhoneCall className="h-4 w-4 text-[#136EA8]" />
              Call Desk
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                openBookingModal({ source: "Mobile Menu Drawer" });
              }}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] min-h-[48px] text-sm font-bold text-white"
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

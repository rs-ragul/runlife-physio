"use client";

import { citiesShortLabel, getActiveCities, navCitiesLabel } from "@/lib/cities";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  PhoneCall,
  CalendarCheck,
  Stethoscope,
  Home,
  Activity,
  MapPin,
  Users,
  BookOpen,
  MessageCircle,
  Sparkles,
  Mail,
  Flame,
  Video,
} from "lucide-react";
import { SPECIALTIES } from "@/data/specialties";
import { THERAPIES } from "@/data/therapies";
import { useSiteCms } from "@/context/SiteSettingsContext";
import { useBookingModal } from "@/context/BookingModalContext";
import { buildPatientToClinicWhatsAppUrl } from "@/lib/whatsapp";

export function Navbar() {
  const pathname = usePathname();
  const { settings } = useSiteCms();
  const { openBookingModal } = useBookingModal();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSpecOpen, setMobileSpecOpen] = useState(false);
  const [mobileTherapiesOpen, setMobileTherapiesOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [therapiesOpen, setTherapiesOpen] = useState(false);
  const [citiesOpen, setCitiesOpen] = useState(false);
  const activeCitiesForNav = getActiveCities(settings.serviceCities);

  useEffect(() => {
    setMobileOpen(false);
    setCitiesOpen(false);
    setServicesOpen(false);
    setTherapiesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  if (pathname?.startsWith("/admin")) return null;

  const waHref = buildPatientToClinicWhatsAppUrl(
    undefined,
    settings.whatsappNumber,
    settings.whatsappGreeting
  );

  const mobilePrimaryLinks = [
    { label: "Home", href: "/", icon: Home },
    {
      label: "Conditions We Treat",
      href: "/conditions",
      icon: Activity,
    },
    {
      label: "Home Visit & Online Care",
      href: "/care-modes",
      icon: Sparkles,
    },
    {
      label: `${navCitiesLabel(settings.serviceCities)}`,
      href: "/bangalore",
      icon: MapPin,
    },
    {
      label: `About ${settings.founderName}`,
      href: "/about",
      icon: Users,
    },
    ...(settings.showBlogSection
      ? [
          {
            label: "Recovery Guides",
            href: "/blog",
            icon: BookOpen,
          },
        ]
      : []),
    { label: "Contact Us", href: "/contact", icon: PhoneCall },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1500px] items-center justify-between gap-3 px-3.5 sm:px-6 lg:px-8 h-17 sm:h-20">
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
              <div className="mt-0.5 sm:mt-1 hidden 2xl:block text-[10px] font-bold tracking-[0.16em] text-slate-500 uppercase">
                {settings.tagline}
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-0 xl:gap-0.5 min-w-0 whitespace-nowrap">
            {/* Specialties Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <Link
                href="/services"
                className="inline-flex items-center gap-1 rounded-lg px-2 xl:px-2.5 py-2 text-[13px] 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
              >
                Specialties
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Link>

              {servicesOpen && (
                <div className="absolute left-0 top-full pt-2 w-[520px]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                    <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Our Physiotherapy Departments
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
                            {spec.shortName}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Therapies & HYROX Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setTherapiesOpen(true)}
              onMouseLeave={() => setTherapiesOpen(false)}
            >
              <Link
                href="/therapies"
                className="inline-flex items-center gap-1 rounded-lg px-2 xl:px-2.5 py-2 text-[13px] 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
              >
                Therapies
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Link>

              {therapiesOpen && (
                <div className="absolute left-0 top-full pt-2 w-[500px]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl">
                    <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                        Hands-On Therapies &amp; Athletic Prep
                      </span>
                      <Link
                        href="/therapies"
                        className="text-xs font-bold text-[#136EA8] hover:underline"
                      >
                        View All 6 →
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {THERAPIES.map((t) => (
                        <Link
                          key={t.slug}
                          href={`/therapies/${t.slug}`}
                          onClick={() => setTherapiesOpen(false)}
                          className="rounded-xl p-2.5 hover:bg-sky-50/70 transition group"
                        >
                          <div className="text-sm font-bold text-slate-900 group-hover:text-[#136EA8]">
                            {t.shortTitle}
                          </div>
                          <p className="mt-0.5 text-[11px] text-slate-500 line-clamp-1">
                            {t.categoryBadge}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/conditions"
              className="rounded-lg px-2 xl:px-2.5 py-2 text-[13px] 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
            >
              Conditions
            </Link>
            <Link
              href="/care-modes"
              className="rounded-lg px-2 xl:px-2.5 py-2 text-[13px] 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
            >
              <span className="whitespace-nowrap">Care Modes</span>
            </Link>
            {/* Cities Dropdown — one row per active city, so the header never
                grows no matter how many cities get added */}
            <div
              className="relative"
              onMouseEnter={() => setCitiesOpen(true)}
              onMouseLeave={() => setCitiesOpen(false)}
            >
              <Link
                href="/bangalore"
                className="inline-flex items-center gap-1 rounded-lg px-2 xl:px-2.5 py-2 text-[13px] 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
              >
                <MapPin className="h-3.5 w-3.5 text-[#85B925]" />
                Cities
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </Link>

              {citiesOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-[300px]">
                  <div className="rounded-2xl border border-slate-200 bg-white p-2.5 shadow-xl">
                    <div className="mb-2 flex items-center justify-between border-b border-slate-100 px-1 pb-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                        Home Visits In
                      </span>
                      <span className="rounded-full bg-lime-100 px-2 py-0.5 text-[10px] font-extrabold text-lime-800">
                        {activeCitiesForNav.length} {activeCitiesForNav.length === 1 ? "City" : "Cities"}
                      </span>
                    </div>

                    <div className="space-y-0.5 max-h-[60vh] overflow-y-auto">
                      {activeCitiesForNav.map((city) => (
                        <Link
                          key={city.id}
                          href="/bangalore"
                          onClick={() => setCitiesOpen(false)}
                          className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-sky-50/70 transition group"
                        >
                          <MapPin className="h-3.5 w-3.5 text-[#136EA8] shrink-0" />
                          <span className="text-sm font-bold text-slate-900 group-hover:text-[#136EA8]">
                            {city.name}
                          </span>
                          <span className="ml-auto text-[11px] text-slate-400 shrink-0">
                            {city.areas.length} areas
                          </span>
                        </Link>
                      ))}

                      <Link
                        href="/bangalore"
                        onClick={() => setCitiesOpen(false)}
                        className="flex items-center gap-2.5 rounded-xl px-2.5 py-2 hover:bg-sky-50/70 transition group"
                      >
                        <Video className="h-3.5 w-3.5 text-[#136EA8] shrink-0" />
                        <span className="text-sm font-bold text-slate-900 group-hover:text-[#136EA8]">
                          Online
                        </span>
                        <span className="ml-auto text-[11px] text-slate-400 shrink-0">
                          Anywhere in India
                        </span>
                      </Link>
                    </div>

                    <div className="mt-2 border-t border-slate-100 pt-2">
                      <Link
                        href="/bangalore"
                        onClick={() => setCitiesOpen(false)}
                        className="flex items-center justify-center gap-1 rounded-xl bg-slate-50 px-2.5 py-2 text-xs font-extrabold text-[#136EA8] hover:bg-sky-50 transition"
                      >
                        View all service areas <ChevronRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Link
              href="/about"
              className="rounded-lg px-2 xl:px-2.5 py-2 text-[13px] 2xl:text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
            >
              About
            </Link>
            {settings.showBlogSection && (
              <Link
                href="/blog"
                className="rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
              >
                Guides
              </Link>
            )}
            <Link
              href="/contact"
              className="rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-[#136EA8] transition"
            >
              Contact
            </Link>
          </nav>

          {/* Desktop CTAs (Call + Email + Book for Consultation) */}
          <div className="hidden xl:flex items-center gap-1.5 2xl:gap-2 shrink-0">
            <a
              href={`tel:${settings.phoneE164}`}
              aria-label="Call Runlife Physio"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 xl:px-3 py-2.5 text-xs font-bold text-slate-800 hover:border-[#136EA8] hover:text-[#136EA8] transition"
            >
              <PhoneCall className="h-3.5 w-3.5 text-[#136EA8]" />
              <span className="hidden xl:inline">Call</span>
            </a>
            <a
              href={`mailto:${settings.email}`}
              aria-label="Email Runlife Physio"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-slate-50 px-2.5 xl:px-3 py-2.5 text-xs font-bold text-slate-800 hover:border-[#136EA8] hover:text-[#136EA8] transition"
            >
              <Mail className="h-3.5 w-3.5 text-[#136EA8]" />
              <span className="hidden xl:inline">Email</span>
            </a>
            <button
              type="button"
              onClick={() => openBookingModal({ source: "Header CTA" })}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0F1D35] px-4 py-2.5 text-xs xl:text-sm font-bold text-white shadow-md hover:bg-[#136EA8] transition cursor-pointer"
            >
              <CalendarCheck className="h-4 w-4 text-[#9AD634]" />
              <span className="hidden 2xl:inline whitespace-nowrap">
                {settings.primaryCtaText}
              </span>
              <span className="2xl:hidden whitespace-nowrap">Book Now</span>
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 xl:hidden">
            <button
              type="button"
              onClick={() => openBookingModal({ source: "Mobile Header CTA" })}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F1D35] px-3.5 min-h-[42px] text-xs font-extrabold text-white shadow-xs cursor-pointer"
            >
              <CalendarCheck className="h-3.5 w-3.5 text-[#9AD634]" />
              Book
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-slate-50 min-h-[42px] min-w-[42px] text-slate-800 hover:bg-slate-100 cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Viewport Mobile Slide-Over Menu */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-[95] flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs animate-fade-in-fast"
            onClick={() => setMobileOpen(false)}
            aria-hidden="true"
          />

          <div className="relative z-10 flex h-[100dvh] w-full max-w-[380px] flex-col bg-white shadow-2xl animate-drawer-in">
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-slate-200 bg-[#0F1D35] px-4 py-3.5 text-white shrink-0">
              <Link
                href="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5"
              >
                <div className="relative h-10 w-12 rounded-lg bg-white p-1 shrink-0">
                  <Image
                    src="/images/runlife-logo.png"
                    alt="Runlife Physio"
                    fill
                    sizes="48px"
                    className="object-contain p-0.5"
                  />
                </div>
                <div className="leading-tight">
                  <div className="font-display text-sm font-extrabold tracking-tight text-white">
                    RUN<span className="text-[#9AD634]">LIFE</span> PHYSIO
                  </div>
                  <div className="text-[10px] font-semibold text-sky-200">
                    {citiesShortLabel(settings.serviceCities)} • Home &amp; Online
                  </div>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Menu Body */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3">
              {/* Primary Consultation CTA Card */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openBookingModal({ source: "Mobile Menu Top Card" });
                }}
                className="w-full flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#0F1D35] to-[#136EA8] p-4 text-left text-white shadow-md cursor-pointer"
              >
                <div>
                  <span className="inline-block rounded-full bg-[#85B925] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-950">
                    {activeCitiesForNav.length > 0
                      ? `${activeCitiesForNav.length} Cities + Online`
                      : "Online"}
                  </span>
                  <div className="mt-1 font-display text-sm font-extrabold">
                    {settings.primaryCtaText}
                  </div>
                  <div className="text-[11px] text-sky-100">
                    Home Visits, Online &amp; Scheduled Care
                  </div>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <CalendarCheck className="h-5 w-5 text-[#9AD634]" />
                </div>
              </button>

              {/* Collapsible Specialties Accordion */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileSpecOpen((v) => !v)}
                  className="flex w-full items-center justify-between px-4 min-h-[52px] text-left cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2.5 text-sm font-extrabold text-[#0F1D35]">
                    <Stethoscope className="h-4 w-4 text-[#136EA8]" />
                    Physiotherapy Specialties
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                      mobileSpecOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileSpecOpen && (
                  <div className="border-t border-slate-200/80 p-2 space-y-1.5 bg-white">
                    {SPECIALTIES.map((spec) => {
                      const active = pathname === `/services/${spec.slug}`;
                      return (
                        <Link
                          key={spec.slug}
                          href={`/services/${spec.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-xs font-bold border transition ${
                            active
                              ? "border-[#136EA8] bg-sky-50 text-[#136EA8]"
                              : "border-slate-100 bg-slate-50/70 text-slate-800 hover:bg-sky-50/50"
                          }`}
                        >
                          <span>{spec.shortName}</span>
                          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                        </Link>
                      );
                    })}
                    <Link
                      href="/services"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-extrabold text-[#136EA8] hover:underline"
                    >
                      View All Specialties →
                    </Link>
                  </div>
                )}
              </div>

              {/* Collapsible Therapies & HYROX Accordion */}
              <div className="rounded-2xl border border-slate-200 bg-slate-50/80 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setMobileTherapiesOpen((v) => !v)}
                  className="flex w-full items-center justify-between px-4 min-h-[52px] text-left cursor-pointer"
                >
                  <span className="inline-flex items-center gap-2.5 text-sm font-extrabold text-[#0F1D35]">
                    <Flame className="h-4 w-4 text-[#638E15]" />
                    Therapies &amp; HYROX Training
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${
                      mobileTherapiesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileTherapiesOpen && (
                  <div className="border-t border-slate-200/80 p-2 space-y-1.5 bg-white">
                    {THERAPIES.map((t) => {
                      const active = pathname === `/therapies/${t.slug}`;
                      return (
                        <Link
                          key={t.slug}
                          href={`/therapies/${t.slug}`}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between rounded-xl px-3.5 py-3 text-xs font-bold border transition ${
                            active
                              ? "border-[#136EA8] bg-sky-50 text-[#136EA8]"
                              : "border-slate-100 bg-slate-50/70 text-slate-800 hover:bg-sky-50/50"
                          }`}
                        >
                          <span>{t.shortTitle}</span>
                          <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                        </Link>
                      );
                    })}
                    <Link
                      href="/therapies"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center gap-1 rounded-xl py-2.5 text-xs font-extrabold text-[#136EA8] hover:underline"
                    >
                      View All Therapies &amp; HYROX →
                    </Link>
                  </div>
                )}
              </div>

              {/* Primary Links */}
              <nav className="space-y-1.5" aria-label="Mobile Primary Links">
                {mobilePrimaryLinks.map((item) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center justify-between rounded-2xl border px-4 min-h-[50px] text-sm font-bold transition ${
                        active
                          ? "border-[#136EA8] bg-sky-50/80 text-[#136EA8]"
                          : "border-slate-200/80 bg-white text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      <span className="inline-flex items-center gap-3">
                        <Icon
                          className={`h-4 w-4 ${
                            active ? "text-[#136EA8]" : "text-slate-400"
                          }`}
                        />
                        {item.label}
                      </span>
                      <ChevronRight
                        className={`h-4 w-4 ${
                          active ? "text-[#136EA8]" : "text-slate-300"
                        }`}
                      />
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Pinned Safe-Area Drawer Footer: Call + WhatsApp + Email */}
            <div className="shrink-0 border-t border-slate-200 bg-slate-50 px-4 pt-3 pb-[max(0.9rem,env(safe-area-inset-bottom))]">
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`tel:${settings.phoneE164}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white min-h-[46px] text-xs font-extrabold text-slate-900 shadow-2xs"
                >
                  <PhoneCall className="h-3.5 w-3.5 text-[#136EA8]" />
                  Call
                </a>
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#25D366] min-h-[46px] text-xs font-extrabold text-white shadow-2xs"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  WhatsApp
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 bg-white min-h-[46px] text-xs font-extrabold text-slate-900 shadow-2xs"
                >
                  <Mail className="h-3.5 w-3.5 text-[#136EA8]" />
                  Email
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

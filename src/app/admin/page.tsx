"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import {
  Lock,
  LogOut,
  RefreshCw,
  Download,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  Calendar,
  Search,
  Database,
  Trash2,
  Save,
  ArrowLeft,
  ShieldCheck,
  Users,
  Sparkles,
} from "lucide-react";
import {
  getFirebaseClient,
  googleProvider,
  isFirebaseConfigured,
  isAuthorizedAdminEmail,
} from "@/lib/firebase";
import {
  fetchAllAppointmentsClient,
  updateAppointmentClient,
  deleteAppointmentClient,
  fetchAllInquiriesClient,
  type AppointmentRecord,
  type AppointmentStatus,
  type InquiryRecord,
} from "@/lib/appointmentsStore";
import { buildDoctorToPatientWhatsAppUrl } from "@/lib/whatsapp";
import { SITE_CONFIG } from "@/config/site";

const STATUS_STYLES: Record<AppointmentStatus, string> = {
  new: "bg-amber-100 text-amber-900 border-amber-300",
  contacted: "bg-sky-100 text-sky-900 border-sky-300",
  scheduled: "bg-indigo-100 text-indigo-900 border-indigo-300",
  completed: "bg-lime-100 text-lime-900 border-lime-300",
  cancelled: "bg-rose-100 text-rose-800 border-rose-200",
};

export default function AdminPortalPage() {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [demoAuthenticated, setDemoAuthenticated] = useState(false);
  const [authChecking, setAuthChecking] = useState(isFirebaseConfigured);

  // Login inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginBusy, setLoginBusy] = useState(false);

  // CRM State
  const [activeTab, setActiveTab] = useState<"appointments" | "inquiries" | "setup">(
    "appointments"
  );
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchText, setSearchText] = useState("");
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [savingId, setSavingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured) {
      setAuthChecking(false);
      return;
    }
    const { auth } = getFirebaseClient();
    if (!auth) {
      setAuthChecking(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u && isAuthorizedAdminEmail(u.email)) {
        setFirebaseUser(u);
        setLoginError("");
      } else if (u) {
        setLoginError(
          `Signed in as ${u.email}, which is not listed in NEXT_PUBLIC_ADMIN_EMAILS.`
        );
        signOut(auth);
        setFirebaseUser(null);
      } else {
        setFirebaseUser(null);
      }
      setAuthChecking(false);
    });
    return () => unsub();
  }, []);

  const isUnlocked = Boolean(firebaseUser) || (!isFirebaseConfigured && demoAuthenticated);

  const loadRecords = useCallback(async () => {
    setLoadingData(true);
    try {
      const [appts, inqs] = await Promise.all([
        fetchAllAppointmentsClient(),
        fetchAllInquiriesClient(),
      ]);
      setAppointments(appts);
      setInquiries(inqs);
      const initialDrafts: Record<string, string> = {};
      appts.forEach((a) => {
        if (a.id) initialDrafts[a.id] = a.clinicalNotes || "";
      });
      setNotesDraft(initialDrafts);
    } catch (err) {
      console.error("Failed loading CRM records:", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (isUnlocked) {
      loadRecords();
    }
  }, [isUnlocked, loadRecords]);

  async function handleEmailSignIn(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const { auth } = getFirebaseClient();
    if (!auth) return;
    setLoginBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setLoginError(
        "Invalid email or password. Make sure Email/Password Auth is enabled in Firebase Console."
      );
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleGoogleSignIn() {
    setLoginError("");
    const { auth } = getFirebaseClient();
    if (!auth) return;
    setLoginBusy(true);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch {
      setLoginError(
        "Google Sign-In was cancelled or your domain isn't added under Firebase Authorized Domains yet."
      );
    } finally {
      setLoginBusy(false);
    }
  }

  async function handleSignOut() {
    if (isFirebaseConfigured) {
      const { auth } = getFirebaseClient();
      if (auth) await signOut(auth);
    }
    setDemoAuthenticated(false);
  }

  async function handleStatusChange(id: string | undefined, status: AppointmentStatus) {
    if (!id) return;
    setSavingId(id);
    try {
      await updateAppointmentClient(id, { status });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status } : a))
      );
    } finally {
      setSavingId(null);
    }
  }

  async function handleSaveNotes(id: string | undefined) {
    if (!id) return;
    setSavingId(id);
    try {
      const clinicalNotes = notesDraft[id] || "";
      await updateAppointmentClient(id, { clinicalNotes });
      setAppointments((prev) =>
        prev.map((a) => (a.id === id ? { ...a, clinicalNotes } : a))
      );
    } finally {
      setSavingId(null);
    }
  }

  async function handleDelete(id: string | undefined) {
    if (!id) return;
    if (!window.confirm("Remove this appointment record permanently?")) return;
    await deleteAppointmentClient(id);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }

  function exportCsv() {
    const headers = [
      "Reference ID",
      "Created At",
      "Status",
      "Patient Name",
      "Phone",
      "Email",
      "Care Mode",
      "MPT Specialty",
      "Condition",
      "Locality",
      "Preferred Date",
      "Slot",
      "Patient Notes",
      "Doctor Clinical Notes",
    ];
    const rows = appointments.map((a) =>
      [
        a.referenceId,
        a.createdAt,
        a.status,
        a.patientName,
        a.phone,
        a.email || "",
        a.careMode,
        a.specialty,
        a.conditionOrPain,
        a.locality,
        a.preferredDate,
        a.preferredSlot,
        a.notes || "",
        a.clinicalNotes || "",
      ]
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `runlife-physio-appointments-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B1629] text-white">
        <RefreshCw className="h-6 w-6 animate-spin text-[#9AD634]" />
      </div>
    );
  }

  // Login Gate
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#0B1629] bg-navy-grid flex flex-col justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md rounded-3xl border border-white/15 bg-white p-7 sm:p-9 shadow-2xl">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#136EA8]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Website
            </Link>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-bold text-slate-700">
              <Lock className="h-3 w-3 text-[#136EA8]" />
              Doctor Portal
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <div className="relative h-12 w-16 shrink-0">
              <Image
                src="/images/runlife-logo.png"
                alt="Runlife Physio"
                fill
                sizes="64px"
                className="object-contain"
              />
            </div>
            <div>
              <h1 className="font-display text-xl font-extrabold text-[#0F1D35]">
                Dr. Vishal&apos;s Command Center
              </h1>
              <p className="text-xs text-slate-500">
                Appointments, Triage Notes &amp; Specialist Network
              </p>
            </div>
          </div>

          {isFirebaseConfigured ? (
            <div className="mt-6 space-y-4">
              <form onSubmit={handleEmailSignIn} className="space-y-3">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Admin Email (runlifephysio@gmail.com)"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                />
                <button
                  type="submit"
                  disabled={loginBusy}
                  className="w-full rounded-xl bg-[#0F1D35] py-3 text-sm font-extrabold text-white hover:bg-[#136EA8] transition cursor-pointer"
                >
                  {loginBusy ? "Signing In..." : "Sign In to Clinic CRM"}
                </button>
              </form>

              <div className="relative flex items-center justify-center">
                <span className="bg-white px-2 text-xs text-slate-400">OR</span>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loginBusy}
                className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 text-xs sm:text-sm font-bold text-slate-800 hover:bg-slate-100 transition cursor-pointer"
              >
                Sign in with Google ({SITE_CONFIG.contact.email})
              </button>

              {loginError && (
                <div className="rounded-xl bg-rose-50 border border-rose-200 p-3 text-xs text-rose-700">
                  {loginError}
                </div>
              )}
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <div className="rounded-2xl border border-sky-200 bg-sky-50/80 p-4 text-xs leading-relaxed text-slate-700">
                <strong className="text-[#0F1D35] block mb-1">
                  Firebase Keys Not Added Yet — Interactive Preview Ready!
                </strong>
                Once you add your 6 free{" "}
                <code className="font-mono bg-white px-1 rounded">
                  NEXT_PUBLIC_FIREBASE_*
                </code>{" "}
                variables in Vercel, this portal automatically locks behind
                Firebase Auth for{" "}
                <strong>{SITE_CONFIG.contact.email}</strong>. Right now, click
                below to test the live Doctor CRM!
              </div>

              <button
                type="button"
                onClick={() => setDemoAuthenticated(true)}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] py-3.5 text-sm font-extrabold text-white hover:bg-[#136EA8] transition cursor-pointer"
              >
                <Sparkles className="h-4 w-4 text-[#9AD634]" />
                Enter Doctor Portal (Interactive Preview)
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const filteredAppointments = appointments.filter((a) => {
    const matchStatus = statusFilter === "all" || a.status === statusFilter;
    const q = searchText.trim().toLowerCase();
    const matchSearch =
      !q ||
      a.patientName.toLowerCase().includes(q) ||
      a.phone.toLowerCase().includes(q) ||
      a.referenceId.toLowerCase().includes(q) ||
      a.conditionOrPain.toLowerCase().includes(q) ||
      a.locality.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const newCount = appointments.filter((a) => a.status === "new").length;
  const homeCareCount = appointments.filter((a) =>
    a.careMode.toLowerCase().includes("home")
  ).length;
  const completedCount = appointments.filter(
    (a) => a.status === "completed" || a.status === "scheduled"
  ).length;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin Top Header */}
      <header className="bg-[#0F1D35] text-white border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white p-1.5 h-11 w-14 relative">
              <Image
                src="/images/runlife-logo.png"
                alt="Runlife"
                fill
                sizes="56px"
                className="object-contain p-1"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-lg sm:text-xl font-extrabold">
                  Runlife Physio — Doctor Portal
                </h1>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    isFirebaseConfigured
                      ? "bg-lime-400/20 text-lime-300 border border-lime-400/30"
                      : "bg-sky-400/20 text-sky-200 border border-sky-400/30"
                  }`}
                >
                  {isFirebaseConfigured ? "Firebase Live" : "Preview Sandbox"}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {firebaseUser?.email || `${SITE_CONFIG.founder.name} • Bangalore`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              className="rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-white/15"
            >
              View Live Website
            </Link>
            <button
              type="button"
              onClick={loadRecords}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/15 cursor-pointer"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loadingData ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1.5 rounded-xl bg-rose-500/20 border border-rose-400/30 px-3.5 py-2 text-xs font-semibold text-rose-200 hover:bg-rose-500/30 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Exit
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* KPI Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Total Patient Bookings",
              val: appointments.length,
              icon: Calendar,
              accent: "text-[#136EA8]",
            },
            {
              label: "New / Pending Callbacks",
              val: newCount,
              icon: Clock,
              accent: "text-amber-600",
            },
            {
              label: "Bangalore Home Visits",
              val: homeCareCount,
              icon: ShieldCheck,
              accent: "text-[#85B925]",
            },
            {
              label: "Scheduled / Completed",
              val: completedCount,
              icon: CheckCircle2,
              accent: "text-indigo-600",
            },
          ].map((k) => {
            const Icon = k.icon;
            return (
              <div
                key={k.label}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-2xs"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    {k.label}
                  </span>
                  <Icon className={`h-4 w-4 ${k.accent}`} />
                </div>
                <div className="mt-2 font-display text-3xl font-extrabold text-[#0F1D35]">
                  {k.val}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("appointments")}
              className={`rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === "appointments"
                  ? "bg-[#0F1D35] text-white"
                  : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              Appointments ({appointments.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("inquiries")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === "inquiries"
                  ? "bg-[#0F1D35] text-white"
                  : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              <Users className="h-4 w-4" />
              Inquiries &amp; MPT Applications ({inquiries.length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("setup")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-bold transition cursor-pointer ${
                activeTab === "setup"
                  ? "bg-[#0F1D35] text-white"
                  : "bg-white text-slate-700 border border-slate-200"
              }`}
            >
              <Database className="h-4 w-4" />
              Backend Status
            </button>
          </div>

          {activeTab === "appointments" && (
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 cursor-pointer"
            >
              <Download className="h-4 w-4 text-[#136EA8]" />
              Export CSV
            </button>
          )}
        </div>

        {/* TAB 1: APPOINTMENTS */}
        {activeTab === "appointments" && (
          <div className="space-y-4">
            {/* Search & Status Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Search patient name, mobile, Ref ID, locality or condition..."
                  className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-2.5 text-sm"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
              >
                <option value="all">All Statuses</option>
                <option value="new">New (Needs Callback)</option>
                <option value="contacted">Contacted</option>
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
                No appointment records match this filter.
              </div>
            ) : (
              <div className="space-y-4">
                {filteredAppointments.map((appt) => {
                  const waPatientUrl = buildDoctorToPatientWhatsAppUrl({
                    patientName: appt.patientName,
                    phone: appt.phone,
                    specialty: appt.specialty,
                    careMode: appt.careMode,
                    preferredDate: appt.preferredDate,
                    referenceId: appt.referenceId,
                  });

                  return (
                    <div
                      key={appt.id || appt.referenceId}
                      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-md bg-slate-900 px-2 py-0.5 text-xs font-bold text-lime-300">
                              {appt.referenceId}
                            </span>
                            <span
                              className={`rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase ${
                                STATUS_STYLES[appt.status]
                              }`}
                            >
                              {appt.status}
                            </span>
                            <span className="text-xs text-slate-400">
                              {new Date(appt.createdAt).toLocaleString("en-IN")}
                            </span>
                          </div>
                          <h3 className="mt-1.5 font-display text-lg font-extrabold text-[#0F1D35]">
                            {appt.patientName}{" "}
                            <span className="text-sm font-semibold text-[#136EA8]">
                              • {appt.careMode}
                            </span>
                          </h3>
                          <p className="text-xs sm:text-sm text-slate-600">
                            <strong>Department:</strong> {appt.specialty} |{" "}
                            <strong>Condition:</strong> {appt.conditionOrPain}
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            <strong>Locality:</strong> {appt.locality} |{" "}
                            <strong>Slot:</strong>{" "}
                            {appt.preferredDate || "Earliest"} ({appt.preferredSlot})
                          </p>
                          {appt.notes && (
                            <p className="mt-2 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700 border border-slate-200/80">
                              <strong>Patient Intake Note:</strong> {appt.notes}
                            </p>
                          )}
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            aria-label="Update status"
                            value={appt.status}
                            disabled={savingId === appt.id}
                            onChange={(e) =>
                              handleStatusChange(
                                appt.id,
                                e.target.value as AppointmentStatus
                              )
                            }
                            className="rounded-xl border border-slate-300 bg-slate-50 px-3 py-2 text-xs font-bold text-slate-800"
                          >
                            <option value="new">Status: New</option>
                            <option value="contacted">Status: Contacted</option>
                            <option value="scheduled">Status: Scheduled</option>
                            <option value="completed">Status: Completed</option>
                            <option value="cancelled">Status: Cancelled</option>
                          </select>

                          <a
                            href={`tel:${appt.phone.replace(/\s+/g, "")}`}
                            className="inline-flex items-center gap-1 rounded-xl border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50"
                          >
                            <Phone className="h-3.5 w-3.5 text-[#136EA8]" />
                            Call
                          </a>

                          <a
                            href={waPatientUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-xl bg-[#25D366] px-3 py-2 text-xs font-bold text-white hover:bg-[#1ebe5d]"
                          >
                            <MessageCircle className="h-3.5 w-3.5" />
                            WhatsApp Patient
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDelete(appt.id)}
                            aria-label="Delete record"
                            className="rounded-xl border border-rose-200 p-2 text-rose-600 hover:bg-rose-50 cursor-pointer"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Doctor Clinical Notes Editor */}
                      {appt.id && (
                        <div className="flex flex-col sm:flex-row gap-2 pt-3 border-t border-slate-100">
                          <input
                            type="text"
                            value={notesDraft[appt.id] ?? ""}
                            onChange={(e) =>
                              setNotesDraft((prev) => ({
                                ...prev,
                                [appt.id!]: e.target.value,
                              }))
                            }
                            placeholder="Add Dr. Vishal's clinical triage / therapist assignment notes..."
                            className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800 focus:bg-white focus:border-[#136EA8] focus:outline-none"
                          />
                          <button
                            type="button"
                            disabled={savingId === appt.id}
                            onClick={() => handleSaveNotes(appt.id)}
                            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-[#136EA8] transition cursor-pointer"
                          >
                            <Save className="h-3.5 w-3.5" />
                            Save Note
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: INQUIRIES & MPT APPLICATIONS */}
        {activeTab === "inquiries" && (
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-500">
                No inquiries or MPT network applications yet.
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id || inq.createdAt}
                  className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-2xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`rounded-full px-3 py-0.5 text-xs font-bold ${
                        inq.type === "mpt-network-application"
                          ? "bg-violet-100 text-violet-900"
                          : "bg-sky-100 text-sky-900"
                      }`}
                    >
                      {inq.type === "mpt-network-application"
                        ? "MPT Specialist Network Application"
                        : "Patient Contact Message"}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(inq.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display text-lg font-extrabold text-[#0F1D35]">
                    {inq.name} •{" "}
                    <a
                      href={`tel:${inq.phone}`}
                      className="text-sm text-[#136EA8] hover:underline"
                    >
                      {inq.phone}
                    </a>
                  </h3>
                  {inq.specialtyOrQualification && (
                    <p className="text-xs font-semibold text-slate-700 mt-1">
                      Qualification: {inq.specialtyOrQualification}{" "}
                      {inq.experienceYears ? `(${inq.experienceYears} yrs)` : ""}{" "}
                      • {inq.city}
                    </p>
                  )}
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {inq.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 3: SETUP & CONNECTION DIAGNOSTICS */}
        {activeTab === "setup" && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5">
            <h2 className="font-display text-xl font-extrabold text-[#0F1D35]">
              Firebase Spark (Free Tier) + Vercel + SEO Connection Diagnostics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="font-bold text-slate-900">
                  1. Cloud Firestore &amp; Firebase Auth
                </div>
                <p className="mt-1 text-slate-600">
                  Status:{" "}
                  <strong
                    className={
                      isFirebaseConfigured ? "text-lime-700" : "text-amber-700"
                    }
                  >
                    {isFirebaseConfigured
                      ? "Connected to Firebase Project"
                      : "Running in Zero-Config Preview Mode (Add NEXT_PUBLIC_FIREBASE_* in Vercel)"}
                  </strong>
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 p-4">
                <div className="font-bold text-slate-900">
                  2. Google Search Console Indexing Ready
                </div>
                <p className="mt-1 text-slate-600">
                  Dynamic{" "}
                  <Link
                    href="/sitemap.xml"
                    target="_blank"
                    className="font-bold text-[#136EA8] underline"
                  >
                    /sitemap.xml
                  </Link>{" "}
                  &amp;{" "}
                  <Link
                    href="/robots.txt"
                    target="_blank"
                    className="font-bold text-[#136EA8] underline"
                  >
                    /robots.txt
                  </Link>{" "}
                  active with Schema.org MedicalClinic JSON-LD.
                </p>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              See <code>DEPLOYMENT_AND_SEO_GUIDE.md</code> inside your project
              folder for step-by-step GitHub → Firebase Free Tier → Vercel →
              Google Search Console setup instructions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

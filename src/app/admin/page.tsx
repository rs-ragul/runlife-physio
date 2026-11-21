"use client";

import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import {
  Lock,
  LogOut,
  RefreshCw,
  Download,
  Trash2,
  Phone,
  MessageCircle,
  CheckCircle2,
  Clock,
  Users,
  Calendar,
  Database,
  Save,
  Settings,
  Star,
  Stethoscope,
  BookOpen,
  Plus,
  Eye,
  EyeOff,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Mail,
  Pencil,
  X,
  Check,
  Loader2,
  MapPin,
} from "lucide-react";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from "firebase/auth";
import { isFirebaseConfigured, getFirebaseClient } from "@/lib/firebase";
import {
  fetchAllAppointmentsClient,
  createAppointmentClient,
  updateAppointmentClient,
  deleteAppointmentClient,
  fetchAllInquiriesClient,
  deleteInquiryClient,
  type AppointmentRecord,
  type AppointmentStatus,
  type InquiryRecord,
} from "@/lib/appointmentsStore";
import {
  saveSiteSettingsClient,
  resetSiteSettingsClient,
  createTestimonialClient,
  updateTestimonialClient,
  deleteTestimonialClient,
  createTeamMemberClient,
  updateTeamMemberClient,
  deleteTeamMemberClient,
  createCustomBlogClient,
  updateCustomBlogClient,
  deleteCustomBlogClient,
} from "@/lib/cmsStore";
import { buildDoctorToPatientWhatsAppUrl } from "@/lib/whatsapp";
import { DEFAULT_SITE_SETTINGS } from "@/lib/cmsDefaults";
import { useSiteCms } from "@/context/SiteSettingsContext";
import { SPECIALTIES } from "@/data/specialties";
import type { DynamicSiteSettings, TeamMemberItem } from "@/types/cms";

const DEMO_PIN = process.env.NEXT_PUBLIC_ADMIN_DEMO_PIN || "runlife2026";

type AdminTab =
  | "appointments"
  | "inquiries"
  | "settings"
  | "testimonials"
  | "team"
  | "blogs"
  | "diagnostics";

// Doctor portraits — dedicated folder. Add new doctor photos here.
const PROFILE_GALLERY_IMAGES = [
  {
    label: "Dr. Vishal S, PT (Founder)",
    value: "/images/profiles/dr-vishal.jpg",
  },
];

// Clinic / treatment photography — used for blog & guide cover images.
const CLINIC_GALLERY_IMAGES = [
  {
    label: "Ortho / ACL Knee Assessment",
    value: "/images/ortho-acl-postop-rehab.jpg",
  },
  {
    label: "Sports Agility & Return-to-Run",
    value: "/images/sports-agility-return-to-run.jpg",
  },
  {
    label: "On-Field Sports Assessment",
    value: "/images/sports-onfield-assessment.jpg",
  },
  {
    label: "Neuro Gait & Balance Rehab",
    value: "/images/neuro-gait-balance-rehab.jpg",
  },
  {
    label: "Senior Home Rehab & Manual Knee Therapy",
    value: "/images/ortho-manual-knee-therapy.jpg",
  },
  {
    label: "Tele-Rehab Online Consultation",
    value: "/images/tele-rehab-online-consultation.jpg",
  },
  {
    label: "Pediatric Milestone Rehab",
    value: "/images/pediatric-balance-milestone-rehab.jpg",
  },
  {
    label: "Women's Health Prenatal Rehab",
    value: "/images/womens-health-antenatal-rehab.jpg",
  },
  {
    label: "Dry Needling Therapy",
    value: "/images/therapy-dry-needling.jpg",
  },
  {
    label: "Chiropractic Care",
    value: "/images/therapy-chiropractic.jpg",
  },
  {
    label: "Kinesiology & Athletic Taping",
    value: "/images/therapy-taping.jpg",
  },
  {
    label: "Cupping Therapy",
    value: "/images/therapy-cupping.jpg",
  },
  {
    label: "Sports Massage",
    value: "/images/therapy-sports-massage.jpg",
  },
  {
    label: "HYROX Training & Conditioning",
    value: "/images/therapy-hyrox-training.jpg",
  },
];

export default function AdminDashboardPage() {
  const firebaseReady = isFirebaseConfigured;
  const {
    settings: liveSettings,
    testimonials,
    teamMembers,
    customBlogs,
    refreshCms,
  } = useSiteCms();

  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [demoUnlocked, setDemoUnlocked] = useState(false);
  const [authChecking, setAuthChecking] = useState(firebaseReady);

  // Auth inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pinInput, setPinInput] = useState("");
  const [authError, setAuthError] = useState("");

  // CRM Data
  const [tab, setTab] = useState<AdminTab>("appointments");
  const [appointments, setAppointments] = useState<AppointmentRecord[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [notesDraft, setNotesDraft] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<string>("");

  // Manual Appointment Modal
  const [showAddAppt, setShowAddAppt] = useState(false);
  const [newApptName, setNewApptName] = useState("");
  const [newApptPhone, setNewApptPhone] = useState("");
  const [newApptSpecialty, setNewApptSpecialty] = useState(
    SPECIALTIES[0].title
  );
  const [newApptMode, setNewApptMode] = useState(
    "Home Visit (Bangalore & Salem)"
  );
  const [newApptArea, setNewApptArea] = useState("");
  const [newApptCondition, setNewApptCondition] = useState("");

  // Editable Settings Draft
  const [settingsDraft, setSettingsDraft] =
    useState<DynamicSiteSettings>(liveSettings);
  const [savingSettings, setSavingSettings] = useState(false);

  // New Testimonial Form
  const [revName, setRevName] = useState("");
  const [revContext, setRevContext] = useState("");
  const [revSpecialty, setRevSpecialty] = useState("MPT Orthopedics");
  const [revRating, setRevRating] = useState(5);
  const [revQuote, setRevQuote] = useState("");

  // New / Edit Team Member Form
  const [docName, setDocName] = useState("");
  const [docCred, setDocCred] = useState("");
  const [docRole, setDocRole] = useState("");
  const [docDept, setDocDept] = useState("");
  const [docExp, setDocExp] = useState("");
  const [docBio, setDocBio] = useState("");
  const [docReg, setDocReg] = useState("");
  const [docImage, setDocImage] = useState("");
  const [docExtraCerts, setDocExtraCerts] = useState("");
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [savingMember, setSavingMember] = useState(false);
  const [memberError, setMemberError] = useState("");

  // New Custom Blog Form
  const [blogTitle, setBlogTitle] = useState("");
  const [blogTag, setBlogTag] = useState("MPT Orthopedics");
  const [blogReadTime, setBlogReadTime] = useState("");
  const [blogImage, setBlogImage] = useState(CLINIC_GALLERY_IMAGES[0].value);
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogBody, setBlogBody] = useState("");
  const [blogTakeaway, setBlogTakeaway] = useState("");

  // Backend Diagnostics State
  const [diagResult, setDiagResult] = useState<string>("");
  const [diagRunning, setDiagRunning] = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => {
      setToast((prev) => (prev === msg ? "" : prev));
    }, 3200);
  }

  useEffect(() => {
    setSettingsDraft(liveSettings);
  }, [liveSettings]);

  useEffect(() => {
    if (!firebaseReady) {
      const saved = sessionStorage.getItem("runlife_admin_unlocked");
      if (saved === "1") setDemoUnlocked(true);
      setAuthChecking(false);
      return;
    }
    const { auth } = getFirebaseClient();
    if (!auth) {
      setAuthChecking(false);
      return;
    }
    const unsub = onAuthStateChanged(auth, (u) => {
      setFirebaseUser(u);
      setAuthChecking(false);
    });
    return () => unsub();
  }, [firebaseReady]);

  const isAuthenticated = firebaseReady ? Boolean(firebaseUser) : demoUnlocked;

  const loadAll = useCallback(async () => {
    setLoadingData(true);
    try {
      const [appts, inqs] = await Promise.all([
        fetchAllAppointmentsClient(),
        fetchAllInquiriesClient(),
        refreshCms(),
      ]);
      setAppointments(appts);
      setInquiries(inqs);
      const map: Record<string, string> = {};
      appts.forEach((a) => {
        if (a.id) map[a.id] = a.clinicalNotes || "";
      });
      setNotesDraft(map);
    } finally {
      setLoadingData(false);
    }
  }, [refreshCms]);

  useEffect(() => {
    if (isAuthenticated) {
      loadAll();
    }
  }, [isAuthenticated, loadAll]);

  async function handleFirebaseLogin(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    try {
      const { auth } = getFirebaseClient();
      if (!auth) throw new Error("Firebase Auth unavailable");
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch {
      setAuthError(
        "Invalid admin email or password. Verify credentials in Firebase Authentication."
      );
    }
  }

  function handleDemoUnlock(e: React.FormEvent) {
    e.preventDefault();
    setAuthError("");
    if (pinInput.trim() === DEMO_PIN) {
      sessionStorage.setItem("runlife_admin_unlocked", "1");
      setDemoUnlocked(true);
    } else {
      setAuthError("Incorrect PIN. Default preview PIN is: runlife2026");
    }
  }

  async function handleLogout() {
    if (firebaseReady) {
      const { auth } = getFirebaseClient();
      if (auth) await signOut(auth);
    } else {
      sessionStorage.removeItem("runlife_admin_unlocked");
      setDemoUnlocked(false);
    }
  }

  // CRM Actions
  async function handleAddManualAppointment(e: React.FormEvent) {
    e.preventDefault();
    if (!newApptName.trim() || !newApptPhone.trim()) return;
    await createAppointmentClient({
      patientName: newApptName.trim(),
      phone: newApptPhone.trim(),
      specialty: newApptSpecialty,
      careMode: newApptMode,
      locality: newApptArea.trim() || liveSettings.primaryCity,
      conditionOrPain: newApptCondition.trim() || "Logged by Clinic Desk",
      preferredDate: "",
      preferredSlot: "Flexible / Earliest Available",
      source: "Admin Manual Entry",
    });
    setNewApptName("");
    setNewApptPhone("");
    setNewApptArea("");
    setNewApptCondition("");
    setShowAddAppt(false);
    await loadAll();
    showToast("Manual appointment added to CRM!");
  }

  async function handleStatusChange(id: string, status: AppointmentStatus) {
    await updateAppointmentClient(id, { status });
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    showToast(`Appointment marked as ${status.toUpperCase()}`);
  }

  async function handleSaveNotes(id: string) {
    const clinicalNotes = notesDraft[id] || "";
    await updateAppointmentClient(id, { clinicalNotes });
    showToast("Clinical notes saved!");
  }

  async function handleDeleteAppointment(id: string) {
    await deleteAppointmentClient(id);
    setAppointments((prev) => prev.filter((a) => a.id !== id));
    showToast("Appointment removed.");
  }

  async function handleDeleteInquiry(id: string) {
    await deleteInquiryClient(id);
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    showToast("Inquiry deleted.");
  }

  // CMS Actions
  async function handleSaveSiteSettings(e: React.FormEvent) {
    e.preventDefault();
    setSavingSettings(true);
    try {
      await saveSiteSettingsClient(settingsDraft);
      await refreshCms();
      showToast("Website settings updated live across all pages!");
    } catch (err) {
      console.error("Settings save failed:", err);
      const detail = err instanceof Error ? err.message : "";
      showToast(
        detail && detail !== "Server responded 500"
          ? `Save failed: ${detail}`
          : "Could not save settings. Please try again."
      );
    } finally {
      setSavingSettings(false);
    }
  }

  async function handleResetSettings() {
    setSavingSettings(true);
    try {
      await resetSiteSettingsClient();
      setSettingsDraft(DEFAULT_SITE_SETTINGS);
      await refreshCms();
      showToast("Restored clean default clinic settings!");
    } finally {
      setSavingSettings(false);
    }
  }

  async function handleAddTestimonial(e: React.FormEvent) {
    e.preventDefault();
    if (!revName.trim() || !revQuote.trim()) return;
    await createTestimonialClient({
      patientName: revName.trim(),
      context: revContext.trim() || liveSettings.primaryCity,
      specialty: revSpecialty,
      rating: revRating,
      quote: revQuote.trim(),
      published: true,
    });
    setRevName("");
    setRevContext("");
    setRevQuote("");
    await refreshCms();
    showToast("Verified patient testimonial published!");
  }

  function resetTeamForm() {
    setEditingMemberId(null);
    setDocName("");
    setDocCred("");
    setDocRole("");
    setDocDept("");
    setDocExp("");
    setDocBio("");
    setDocReg("");
    setDocImage("");
    setDocExtraCerts("");
    setMemberError("");
  }

  function startEditMember(m: TeamMemberItem) {
    setEditingMemberId(m.id);
    setDocName(m.name);
    setDocCred(m.credential);
    setDocRole(m.role);
    setDocDept(m.department);
    setDocExp(m.experience);
    setDocBio(m.bio || "");
    setDocReg(m.registration || "");
    setDocImage(m.image || "");
    setDocExtraCerts(m.extraCertifications || "");
    setMemberError("");
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 220, behavior: "smooth" });
    }
  }

  async function handleAddTeamMember(e: React.FormEvent) {
    e.preventDefault();
    setMemberError("");
    if (!docName.trim()) {
      setMemberError("Please enter the doctor's name.");
      return;
    }
    setSavingMember(true);
    try {
      // Optional fields are only included when actually filled in —
      // Firestore rejects `undefined` values outright.
      const payload: Partial<TeamMemberItem> = {
        name: docName.trim(),
        credential: docCred.trim() || "MPT Specialist",
        role: docRole.trim() || "Consultant Physiotherapist",
        department: docDept.trim() || "Multi-Specialty Rehab",
        experience: docExp.trim() || "Bangalore & Salem",
        bio: docBio.trim(),
      };
      if (docReg.trim()) payload.registration = docReg.trim();
      if (docExtraCerts.trim())
        payload.extraCertifications = docExtraCerts.trim();
      if (docImage.trim()) payload.image = docImage.trim();

      if (editingMemberId) {
        await updateTeamMemberClient(editingMemberId, payload);
        await refreshCms();
        showToast(`${payload.name} updated successfully.`);
      } else {
        await createTeamMemberClient({
          ...(payload as Omit<TeamMemberItem, "id" | "createdAt">),
          published: true,
        });
        await refreshCms();
        showToast(`${payload.name} added to clinical roster.`);
      }
      resetTeamForm();
    } catch (err) {
      console.error("Team member save failed:", err);
      const detail = err instanceof Error ? err.message : "";
      setMemberError(
        detail && detail !== "Server responded 500"
          ? `Could not save: ${detail}`
          : "Could not save the doctor. Please try again — if it keeps failing, refresh the page and retry."
      );
    } finally {
      setSavingMember(false);
    }
  }

  async function handleAddBlog(e: React.FormEvent) {
    e.preventDefault();
    if (!blogTitle.trim() || !blogBody.trim()) return;
    const slug = blogTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const paragraphs = blogBody
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);

    await createCustomBlogClient({
      slug: `${slug}-${Date.now().toString().slice(-4)}`,
      title: blogTitle.trim(),
      excerpt: blogExcerpt.trim() || paragraphs[0]?.slice(0, 160) || "",
      category: blogTag,
      specialistTag: blogTag,
      author: `${liveSettings.founderName} & Clinical Team`,
      publishedAt: new Date().toISOString().slice(0, 10),
      readTime: blogReadTime.trim() || "4 min read",
      image: blogImage.trim() || CLINIC_GALLERY_IMAGES[0].value,
      bodyParagraphs: paragraphs,
      keyTakeaway:
        blogTakeaway.trim() ||
        "Consult an MPT Specialist for individualized assessment and progression.",
      published: true,
    });
    setBlogTitle("");
    setBlogExcerpt("");
    setBlogBody("");
    setBlogTakeaway("");
    setBlogReadTime("");
    await refreshCms();
    showToast("New recovery guide published to Blog & Homepage!");
  }

  async function runDiagnostics() {
    setDiagRunning(true);
    setDiagResult("");
    try {
      const [cmsRes, apptRes, inqRes] = await Promise.all([
        fetch("/api/cms", { cache: "no-store" }),
        fetch("/api/appointments", { cache: "no-store" }),
        fetch("/api/contact", { cache: "no-store" }),
      ]);
      const ok = cmsRes.ok && apptRes.ok && inqRes.ok;
      setDiagResult(
        ok
          ? `ALL SYSTEMS HEALTHY — /api/cms (${cmsRes.status}), /api/appointments (${apptRes.status}), /api/contact (${inqRes.status}) responding cleanly. Active persistence: ${
              firebaseReady
                ? "Firebase Cloud Firestore (Spark Free Tier)"
                : "Clean Local API Store (Ready for Firebase .env keys)"
            }.`
          : "Warning: One or more API endpoints returned a non-200 status."
      );
    } catch {
      setDiagResult("Network error testing API endpoints.");
    } finally {
      setDiagRunning(false);
    }
  }

  function exportCsv() {
    const headers = [
      "Ref ID",
      "Created At",
      "Status",
      "Patient Name",
      "Phone",
      "Email",
      "Specialty",
      "Care Mode",
      "Preferred Date",
      "Time Slot",
      "Locality",
      "Condition",
      "Clinical Notes",
    ];
    const rows = appointments.map((a) => [
      a.referenceId,
      a.createdAt,
      a.status,
      a.patientName,
      a.phone,
      a.email || "",
      a.specialty,
      a.careMode,
      a.preferredDate || "",
      a.preferredSlot || "",
      a.locality || "",
      a.conditionOrPain || "",
      a.clinicalNotes || "",
    ]);
    const csv = [headers, ...rows]
      .map((r) =>
        r.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `runlife-appointments-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  const filteredAppointments = appointments.filter((a) => {
    const matchesStatus = statusFilter === "all" || a.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      a.patientName.toLowerCase().includes(q) ||
      a.phone.toLowerCase().includes(q) ||
      a.specialty.toLowerCase().includes(q) ||
      (a.locality || "").toLowerCase().includes(q) ||
      (a.conditionOrPain || "").toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const stats = {
    total: appointments.length,
    newCount: appointments.filter((a) => a.status === "new").length,
    scheduled: appointments.filter(
      (a) => a.status === "scheduled" || a.status === "contacted"
    ).length,
    completed: appointments.filter((a) => a.status === "completed").length,
  };

  if (authChecking) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-sm font-semibold text-slate-600">
        Verifying Admin Session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[78vh] bg-slate-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-14 rounded-xl bg-slate-50 border border-slate-200 p-1">
              <Image
                src="/images/runlife-logo.png"
                alt="Runlife Physio"
                fill
                sizes="56px"
                className="object-contain p-1"
              />
            </div>
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#136EA8]">
                Runlife Physio Command Center
              </span>
              <h1 className="font-display text-xl font-extrabold text-[#0F1D35]">
                Admin &amp; Website CMS Login
              </h1>
            </div>
          </div>

          {firebaseReady ? (
            <form onSubmit={handleFirebaseLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Admin Email (Firebase Auth)
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="runlifephysio@gmail.com"
                  className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[46px] text-base sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[46px] text-base sm:text-sm"
                />
              </div>
              {authError && (
                <p className="text-xs font-semibold text-red-600">{authError}</p>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-[#0F1D35] min-h-[48px] text-sm font-extrabold text-white hover:bg-[#136EA8] transition cursor-pointer"
              >
                Sign In to Admin &amp; CMS
              </button>
            </form>
          ) : (
            <form onSubmit={handleDemoUnlock} className="space-y-4">
              <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-3.5 text-xs text-slate-700 leading-relaxed">
                <strong className="text-[#0F1D35] block mb-0.5">
                  Preview Mode Active (Firebase .env Not Connected Yet)
                </strong>
                Enter preview PIN{" "}
                <code className="rounded bg-white px-1.5 py-0.5 font-bold text-[#136EA8]">
                  runlife2026
                </code>{" "}
                to manage Bookings, Inquiries, Dynamic Website Text, Team,
                Testimonials &amp; Blogs. Once Firebase keys are added on
                Vercel, email/password auth activates automatically.
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Admin Preview PIN
                </label>
                <input
                  type="password"
                  required
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder="Enter PIN (runlife2026)"
                  className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[46px] text-base sm:text-sm"
                />
              </div>
              {authError && (
                <p className="text-xs font-semibold text-red-600">{authError}</p>
              )}
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] min-h-[48px] text-sm font-extrabold text-white hover:bg-[#136EA8] transition cursor-pointer"
              >
                <Lock className="h-4 w-4 text-[#9AD634]" />
                Unlock Admin &amp; Dynamic CMS
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 pb-24">
      {toast && (
        <div className="fixed top-20 right-4 z-50 flex items-center gap-2 rounded-2xl bg-[#0F1D35] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-2xl border border-[#85B925]">
          <CheckCircle2 className="h-4 w-4 text-[#9AD634] shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* Admin Header */}
      <div className="bg-[#0F1D35] text-white py-6 sm:py-8 border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#9AD634]">
              <Database className="h-3.5 w-3.5" />
              {firebaseReady
                ? "Firebase Cloud Firestore (Spark Free Tier)"
                : "Clean Local CMS & CRM Store (Firebase Ready)"}
            </div>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold">
              Runlife Physio — Admin &amp; Dynamic CMS
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={loadAll}
              className="inline-flex items-center gap-1.5 rounded-xl bg-white/10 px-3.5 min-h-[40px] text-xs font-bold text-white hover:bg-white/20 cursor-pointer"
            >
              <RefreshCw
                className={`h-3.5 w-3.5 ${loadingData ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#85B925] px-3.5 min-h-[40px] text-xs font-extrabold text-slate-950 hover:bg-[#9AD634] cursor-pointer"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-3.5 min-h-[40px] text-xs font-bold text-slate-200 hover:bg-white/10 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {[
            {
              label: "Total Bookings",
              value: stats.total,
              color: "text-[#0F1D35]",
            },
            {
              label: "New / Pending",
              value: stats.newCount,
              color: "text-amber-600",
            },
            {
              label: "Contacted / Scheduled",
              value: stats.scheduled,
              color: "text-[#136EA8]",
            },
            {
              label: "Inquiries & CVs",
              value: inquiries.length,
              color: "text-[#638E15]",
            },
          ].map((k) => (
            <div
              key={k.label}
              className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 shadow-2xs"
            >
              <div className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-slate-400">
                {k.label}
              </div>
              <div
                className={`mt-1 font-display text-2xl sm:text-3xl font-extrabold ${k.color}`}
              >
                {k.value}
              </div>
            </div>
          ))}
        </div>

        {/* Scrollable Mobile-Friendly Navigation Tabs */}
        <div className="-mx-4 px-4 sm:mx-0 sm:px-0 overflow-x-auto pb-1">
          <div className="flex gap-2 w-max sm:w-auto sm:flex-wrap border-b border-slate-200 pb-3">
            {[
              {
                id: "appointments" as const,
                label: `Bookings (${appointments.length})`,
                icon: Calendar,
              },
              {
                id: "inquiries" as const,
                label: `Inquiries (${inquiries.length})`,
                icon: Users,
              },
              {
                id: "settings" as const,
                label: "Website Customizer",
                icon: Settings,
              },
              {
                id: "testimonials" as const,
                label: `Reviews (${testimonials.length})`,
                icon: Star,
              },
              {
                id: "team" as const,
                label: `MPT Team (${teamMembers.length})`,
                icon: Stethoscope,
              },
              {
                id: "blogs" as const,
                label: `Custom Guides (${customBlogs.length})`,
                icon: BookOpen,
              },
              {
                id: "diagnostics" as const,
                label: "Backend & Firebase",
                icon: ShieldCheck,
              },
            ].map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 min-h-[42px] text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    active
                      ? "bg-[#0F1D35] text-white shadow-sm"
                      : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5 text-[#9AD634]" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ==================== TAB 1: APPOINTMENTS CRM ==================== */}
        {tab === "appointments" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3 justify-between bg-white p-4 rounded-2xl border border-slate-200">
              <div className="flex flex-col sm:flex-row gap-2.5 flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search patient, phone, specialty, locality..."
                  className="w-full sm:max-w-xs rounded-xl border border-slate-300 px-3.5 min-h-[42px] text-base sm:text-sm"
                />
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "all",
                    "new",
                    "contacted",
                    "scheduled",
                    "completed",
                    "cancelled",
                  ].map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => setStatusFilter(st)}
                      className={`rounded-lg px-3 min-h-[38px] text-xs font-bold uppercase cursor-pointer ${
                        statusFilter === st
                          ? "bg-[#136EA8] text-white"
                          : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddAppt((v) => !v)}
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0F1D35] px-4 min-h-[42px] text-xs font-extrabold text-white hover:bg-[#136EA8] cursor-pointer shrink-0"
              >
                <Plus className="h-4 w-4 text-[#9AD634]" />
                Log Phone / Walk-In Booking
              </button>
            </div>

            {showAddAppt && (
              <form
                onSubmit={handleAddManualAppointment}
                className="rounded-2xl border-2 border-[#136EA8] bg-white p-5 space-y-3.5 shadow-md"
              >
                <div className="text-sm font-extrabold text-[#0F1D35]">
                  Add Manual Appointment to CRM
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    required
                    value={newApptName}
                    onChange={(e) => setNewApptName(e.target.value)}
                    placeholder="Patient Full Name *"
                    className="rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                  <input
                    type="tel"
                    required
                    value={newApptPhone}
                    onChange={(e) => setNewApptPhone(e.target.value)}
                    placeholder="Patient Mobile *"
                    className="rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                  <input
                    type="text"
                    value={newApptArea}
                    onChange={(e) => setNewApptArea(e.target.value)}
                    placeholder="Locality / City"
                    className="rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <select
                    value={newApptSpecialty}
                    onChange={(e) => setNewApptSpecialty(e.target.value)}
                    className="rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  >
                    {SPECIALTIES.map((s) => (
                      <option key={s.slug} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                  </select>
                  <select
                    value={newApptMode}
                    onChange={(e) => setNewApptMode(e.target.value)}
                    className="rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  >
                    <option>Home Visit (Bangalore &amp; Salem)</option>
                    <option>Online Consultation</option>
                    <option>Virtual Tele-Rehab</option>
                    <option>By-Appointment Visit</option>
                  </select>
                  <input
                    type="text"
                    value={newApptCondition}
                    onChange={(e) => setNewApptCondition(e.target.value)}
                    placeholder="Condition / Notes"
                    className="rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="rounded-xl bg-[#0F1D35] px-5 min-h-[42px] text-xs font-extrabold text-white hover:bg-[#136EA8] cursor-pointer"
                  >
                    Save Appointment
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddAppt(false)}
                    className="rounded-xl bg-slate-100 px-4 min-h-[42px] text-xs font-bold text-slate-600 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

            {filteredAppointments.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center space-y-2">
                <Calendar className="mx-auto h-9 w-9 text-slate-300" />
                <div className="text-sm font-bold text-slate-700">
                  No appointments recorded yet
                </div>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Your CRM starts 100% clean with zero fake leads. When patients
                  book on the website or you log a call above, records appear
                  here in real time.
                </p>
              </div>
            ) : (
              filteredAppointments.map((appt) => {
                const waReply = buildDoctorToPatientWhatsAppUrl({
                  patientName: appt.patientName,
                  phone: appt.phone,
                  specialty: appt.specialty,
                  careMode: appt.careMode,
                  preferredDate: appt.preferredDate,
                  referenceId: appt.referenceId,
                  clinicName: liveSettings.clinicName,
                });

                return (
                  <div
                    key={appt.id}
                    className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-display text-lg font-extrabold text-[#0F1D35]">
                            {appt.patientName}
                          </span>
                          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-600">
                            {appt.referenceId}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[11px] font-extrabold uppercase ${
                              appt.status === "new"
                                ? "bg-amber-100 text-amber-800"
                                : appt.status === "scheduled" ||
                                    appt.status === "contacted"
                                  ? "bg-sky-100 text-sky-800"
                                  : appt.status === "completed"
                                    ? "bg-lime-100 text-lime-800"
                                    : "bg-slate-200 text-slate-600"
                            }`}
                          >
                            {appt.status}
                          </span>
                          <span className="text-xs text-slate-400 inline-flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(appt.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <div className="mt-1 text-xs font-semibold text-[#136EA8]">
                          {appt.specialty} • {appt.careMode}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <a
                          href={`tel:${appt.phone}`}
                          className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3 min-h-[38px] text-xs font-bold text-slate-700 hover:bg-slate-50"
                        >
                          <Phone className="h-3.5 w-3.5 text-[#136EA8]" />
                          {appt.phone}
                        </a>
                        <a
                          href={waReply}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 rounded-xl bg-[#25D366] px-3 min-h-[38px] text-xs font-bold text-white hover:bg-[#1ebe5b]"
                        >
                          <MessageCircle className="h-3.5 w-3.5" />
                          WhatsApp Patient
                        </a>
                        <select
                          value={appt.status}
                          onChange={(e) =>
                            appt.id &&
                            handleStatusChange(
                              appt.id,
                              e.target.value as AppointmentStatus
                            )
                          }
                          className="rounded-xl border border-slate-300 bg-slate-50 px-2.5 min-h-[38px] text-xs font-bold text-slate-800"
                        >
                          <option value="new">Status: NEW</option>
                          <option value="contacted">Status: CONTACTED</option>
                          <option value="scheduled">Status: SCHEDULED</option>
                          <option value="completed">Status: COMPLETED</option>
                          <option value="cancelled">Status: CANCELLED</option>
                        </select>
                        {appt.id && (
                          <button
                            type="button"
                            onClick={() => handleDeleteAppointment(appt.id!)}
                            className="rounded-xl border border-red-200 p-2 text-red-500 hover:bg-red-50 cursor-pointer"
                            title="Delete booking"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                      <div>
                        <strong className="text-slate-900 block">
                          Preferred Date &amp; Slot:
                        </strong>
                        {appt.preferredDate || "Flexible"} •{" "}
                        {appt.preferredSlot || "Any"}
                      </div>
                      <div>
                        <strong className="text-slate-900 block">
                          Locality / City:
                        </strong>
                        {appt.locality || "Not specified"}
                      </div>
                      <div>
                        <strong className="text-slate-900 block">
                          Condition / Symptoms:
                        </strong>
                        {appt.conditionOrPain || "Not specified"}
                      </div>
                    </div>

                    {appt.id && (
                      <div className="flex flex-col sm:flex-row gap-2 pt-2">
                        <input
                          type="text"
                          value={notesDraft[appt.id] ?? ""}
                          onChange={(e) =>
                            setNotesDraft((prev) => ({
                              ...prev,
                              [appt.id!]: e.target.value,
                            }))
                          }
                          placeholder="Add internal MPT assignment, fee quoted, or follow-up notes..."
                          className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 min-h-[40px] text-base sm:text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveNotes(appt.id!)}
                          className="inline-flex items-center justify-center gap-1 rounded-xl bg-slate-900 px-4 min-h-[40px] text-xs font-bold text-white hover:bg-[#136EA8] cursor-pointer"
                        >
                          <Save className="h-3.5 w-3.5" />
                          Save Note
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ==================== TAB 2: INQUIRIES & MPT APPLICATIONS ==================== */}
        {tab === "inquiries" && (
          <div className="space-y-4">
            {inquiries.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center space-y-2">
                <Users className="mx-auto h-9 w-9 text-slate-300" />
                <div className="text-sm font-bold text-slate-700">
                  No inquiries or specialist applications yet
                </div>
                <p className="text-xs text-slate-500">
                  Messages from the Contact page and MPT Specialist Network
                  applications from the About page appear here automatically.
                </p>
              </div>
            ) : (
              inquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-lg font-extrabold text-[#0F1D35]">
                        {inq.name}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                          inq.type === "mpt-network-application"
                            ? "bg-lime-100 text-lime-900"
                            : "bg-sky-100 text-sky-900"
                        }`}
                      >
                        {inq.type === "mpt-network-application"
                          ? "MPT Specialist Application"
                          : "Patient Question"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`tel:${inq.phone}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700"
                      >
                        <Phone className="h-3.5 w-3.5 text-[#136EA8]" />
                        {inq.phone}
                      </a>
                      {inq.email && (
                        <a
                          href={`mailto:${inq.email}`}
                          className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-bold text-slate-700"
                        >
                          <Mail className="h-3.5 w-3.5 text-[#136EA8]" />
                          Email
                        </a>
                      )}
                      {inq.id && (
                        <button
                          type="button"
                          onClick={() => handleDeleteInquiry(inq.id!)}
                          className="rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  {inq.specialtyOrQualification && (
                    <div className="text-xs font-bold text-[#136EA8]">
                      Qualification: {inq.specialtyOrQualification} •
                      Experience: {inq.experienceYears || "N/A"} • City:{" "}
                      {inq.city || "N/A"}
                    </div>
                  )}
                  <p className="text-xs sm:text-sm text-slate-600">
                    {inq.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}

        {/* ==================== TAB 3: COMPLETE WEBSITE CUSTOMIZER ==================== */}
        {tab === "settings" && (
          <form onSubmit={handleSaveSiteSettings} className="space-y-6">
            <div className="sticky top-[74px] z-30 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-sky-200 bg-white/95 backdrop-blur-md p-4 shadow-md">
              <div>
                <div className="text-sm font-extrabold text-[#0F1D35] flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-[#85B925]" />
                  Live Dynamic Website Customizer
                </div>
                <p className="text-xs text-slate-500">
                  Edit text, phones, timings, addresses, social links &amp;
                  section visibility — updates live without touching code.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleResetSettings}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-300 px-3.5 min-h-[42px] text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Reset Defaults
                </button>
                <button
                  type="submit"
                  disabled={savingSettings}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F1D35] px-5 min-h-[42px] text-xs font-extrabold text-white hover:bg-[#136EA8] cursor-pointer"
                >
                  <Save className="h-4 w-4 text-[#9AD634]" />
                  {savingSettings ? "Saving..." : "Save All Changes"}
                </button>
              </div>
            </div>

            {/* Section Visibility Switches */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
              <h2 className="font-display text-lg font-extrabold text-[#0F1D35]">
                1. Website Section Visibility Toggles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    key: "announcementEnabled" as const,
                    label: "Top Utility / Announcement Bar",
                  },
                  {
                    key: "showSmartCareQuiz" as const,
                    label: "30-Sec Smart Care Finder Quiz",
                  },
                  {
                    key: "showTestimonialsSection" as const,
                    label: "Patient Testimonials Section",
                  },
                  {
                    key: "showTeamSection" as const,
                    label: "Specialist Team Roster Cards",
                  },
                  {
                    key: "showBlogSection" as const,
                    label: "Homepage Recovery Guides Section",
                  },
                  {
                    key: "showJoinNetworkForm" as const,
                    label: "MPT Doctor Recruitment Form",
                  },
                  {
                    key: "showFloatingWhatsApp" as const,
                    label: "Floating WhatsApp & Mobile Bar",
                  },
                ].map((toggle) => (
                  <label
                    key={toggle.key}
                    className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 cursor-pointer"
                  >
                    <span className="text-xs font-bold text-slate-800">
                      {toggle.label}
                    </span>
                    <input
                      type="checkbox"
                      checked={Boolean(settingsDraft[toggle.key])}
                      onChange={(e) =>
                        setSettingsDraft((prev) => ({
                          ...prev,
                          [toggle.key]: e.target.checked,
                        }))
                      }
                      className="h-4 w-4 accent-[#136EA8]"
                    />
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Top Announcement Banner Text
                </label>
                <input
                  type="text"
                  value={settingsDraft.announcementText}
                  onChange={(e) =>
                    setSettingsDraft((p) => ({
                      ...p,
                      announcementText: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                />
              </div>
            </div>

            {/* Contact, Timings & Fee Transparency */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
              <h2 className="font-display text-lg font-extrabold text-[#0F1D35]">
                2. Contact Numbers, WhatsApp, Timings &amp; Fee Note
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Display Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.phoneDisplay}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        phoneDisplay: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Dialable Phone (+91...)
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.phoneE164}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        phoneE164: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    WhatsApp Number (Country Code, No +)
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.whatsappNumber}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        whatsappNumber: e.target.value,
                      }))
                    }
                    placeholder="919187679723"
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Official Clinic Email
                  </label>
                  <input
                    type="email"
                    value={settingsDraft.email}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({ ...p, email: e.target.value }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary City
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.primaryCity}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        primaryCity: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Working Hours Display
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.operatingHours}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        operatingHours: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Consultation Fee / Pricing Note (Shown on Booking Form)
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.consultationFeeNote}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        consultationFeeNote: e.target.value,
                      }))
                    }
                    placeholder="e.g., Assessment ₹799 | Home Care from ₹999"
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Callback Promise Text
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.callbackPromise}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        callbackPromise: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Hero Copy */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
              <h2 className="font-display text-lg font-extrabold text-[#0F1D35]">
                3. Homepage Hero Copy &amp; CTA Text
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hero Top Badge Text
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.heroBadgeText}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        heroBadgeText: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Primary CTA Button Text
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.primaryCtaText}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        primaryCtaText: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hero Headline (Navy Part)
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.heroTitlePrimary}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        heroTitlePrimary: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Hero Headline (Blue Highlight Part)
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.heroTitleHighlight}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        heroTitleHighlight: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Hero Subtitle Paragraph
                </label>
                <textarea
                  rows={2}
                  value={settingsDraft.heroSubtitle}
                  onChange={(e) =>
                    setSettingsDraft((p) => ({
                      ...p,
                      heroSubtitle: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-base sm:text-sm"
                />
              </div>
            </div>

            {/* Founder Profile, Clinic Address & Social Links */}
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
              <h2 className="font-display text-lg font-extrabold text-[#0F1D35]">
                4. Founder Profile, Physical Clinic Address &amp; Social Links
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Founder Name
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.founderName}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        founderName: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Founder Credentials / Reg No.
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.founderCredentials}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        founderCredentials: e.target.value,
                      }))
                    }
                    placeholder="e.g., BPT, MPT (Sports) • IAP Reg #..."
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Founder Role Title
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.founderRole}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        founderRole: e.target.value,
                      }))
                    }
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Founder Clinical Bio
                </label>
                <textarea
                  rows={3}
                  value={settingsDraft.founderBio}
                  onChange={(e) =>
                    setSettingsDraft((p) => ({
                      ...p,
                      founderBio: e.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-slate-300 p-3 text-base sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Physical Clinic Address (Leave blank if Home-Care/Online only)
                  </label>
                  <input
                    type="text"
                    value={settingsDraft.physicalClinicAddress}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        physicalClinicAddress: e.target.value,
                      }))
                    }
                    placeholder="e.g., #42, 100 Feet Road, Indiranagar, Bangalore 560038"
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google Maps Location Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.googleMapsUrl}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        googleMapsUrl: e.target.value,
                      }))
                    }
                    placeholder="https://maps.google.com/..."
                    className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Google Review URL
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.googleReviewUrl}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        googleReviewUrl: e.target.value,
                      }))
                    }
                    placeholder="https://g.page/r/..."
                    className="w-full rounded-xl border border-slate-300 px-3 min-h-[42px] text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.instagramUrl}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        instagramUrl: e.target.value,
                      }))
                    }
                    placeholder="https://instagram.com/..."
                    className="w-full rounded-xl border border-slate-300 px-3 min-h-[42px] text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    YouTube URL
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.youtubeUrl}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        youtubeUrl: e.target.value,
                      }))
                    }
                    placeholder="https://youtube.com/@..."
                    className="w-full rounded-xl border border-slate-300 px-3 min-h-[42px] text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.linkedinUrl}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        linkedinUrl: e.target.value,
                      }))
                    }
                    placeholder="https://linkedin.com/..."
                    className="w-full rounded-xl border border-slate-300 px-3 min-h-[42px] text-base sm:text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Facebook URL
                  </label>
                  <input
                    type="url"
                    value={settingsDraft.facebookUrl}
                    onChange={(e) =>
                      setSettingsDraft((p) => ({
                        ...p,
                        facebookUrl: e.target.value,
                      }))
                    }
                    placeholder="https://facebook.com/..."
                    className="w-full rounded-xl border border-slate-300 px-3 min-h-[42px] text-base sm:text-xs"
                  />
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ==================== TAB 4: VERIFIED TESTIMONIALS MANAGER ==================== */}
        {tab === "testimonials" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleAddTestimonial}
              className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 space-y-4 h-fit"
            >
              <div>
                <h2 className="font-display text-lg font-extrabold text-[#0F1D35]">
                  Add Verified Patient Review
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  We removed all placeholder stories. Add real verified patient
                  feedback here to showcase on the homepage.
                </p>
              </div>
              <input
                type="text"
                required
                value={revName}
                onChange={(e) => setRevName(e.target.value)}
                placeholder="Patient Name (or Initials) *"
                className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
              />
              <input
                type="text"
                value={revContext}
                onChange={(e) => setRevContext(e.target.value)}
                placeholder="Locality & Condition (e.g. Indiranagar • Post-ACL Rehab)"
                className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={revSpecialty}
                  onChange={(e) => setRevSpecialty(e.target.value)}
                  className="rounded-xl border border-slate-300 px-3 min-h-[44px] text-base sm:text-sm"
                >
                  <option>MPT Orthopedics</option>
                  <option>MPT Sports Rehab</option>
                  <option>MPT Neurology</option>
                  <option>MPT Pediatrics</option>
                  <option>MPT Women&apos;s Health</option>
                </select>
                <select
                  value={revRating}
                  onChange={(e) => setRevRating(Number(e.target.value))}
                  className="rounded-xl border border-slate-300 px-3 min-h-[44px] text-base sm:text-sm"
                >
                  <option value={5}>5 Stars (★★★★★)</option>
                  <option value={4}>4 Stars (★★★★)</option>
                </select>
              </div>
              <textarea
                rows={4}
                required
                value={revQuote}
                onChange={(e) => setRevQuote(e.target.value)}
                placeholder="Paste verified patient review quote *"
                className="w-full rounded-xl border border-slate-300 p-3 text-base sm:text-sm"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0F1D35] min-h-[46px] text-xs font-extrabold text-white hover:bg-[#136EA8] cursor-pointer"
              >
                <Plus className="h-4 w-4 text-[#9AD634]" />
                Publish Verified Testimonial
              </button>
            </form>

            <div className="lg:col-span-7 space-y-3">
              {testimonials.length === 0 ? (
                <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center space-y-2">
                  <Star className="mx-auto h-9 w-9 text-amber-300" />
                  <div className="text-sm font-bold text-slate-800">
                    Zero Placeholder Reviews — Ready for Real Patient Stories
                  </div>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Until you add at least one verified review on the left, the
                    homepage automatically hides the reviews block so visitors
                    never see fake testimonials.
                  </p>
                </div>
              ) : (
                testimonials.map((t) => (
                  <div
                    key={t.id}
                    className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="font-bold text-sm text-[#0F1D35]">
                          {t.patientName}
                        </span>{" "}
                        <span className="text-xs text-slate-500">
                          ({t.context}) • {t.specialty}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={async () => {
                            await updateTestimonialClient(t.id, {
                              published: !t.published,
                            });
                            await refreshCms();
                            showToast(
                              !t.published
                                ? "Testimonial live!"
                                : "Testimonial hidden."
                            );
                          }}
                          className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold cursor-pointer ${
                            t.published
                              ? "bg-lime-100 text-lime-900"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {t.published ? (
                            <>
                              <Eye className="h-3.5 w-3.5" /> Live
                            </>
                          ) : (
                            <>
                              <EyeOff className="h-3.5 w-3.5" /> Hidden
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={async () => {
                            await deleteTestimonialClient(t.id);
                            await refreshCms();
                            showToast("Testimonial deleted.");
                          }}
                          className="rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 italic">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ==================== TAB 5: SPECIALIST TEAM MANAGER ==================== */}
        {tab === "team" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleAddTeamMember}
              className="lg:col-span-5 rounded-3xl border border-slate-200 bg-white p-6 space-y-3.5 h-fit"
            >
              <div>
                <h2 className="font-display text-lg font-extrabold text-[#0F1D35]">
                  {editingMemberId
                    ? "Edit Specialist Details"
                    : "Add MPT Specialist to Roster"}
                </h2>
                <p className="text-xs text-slate-500">
                  {editingMemberId
                    ? "Update this doctor's details — changes go live instantly."
                    : "Showcase verified MPT doctors on the Homepage Clinical Roster."}
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Doctor Name *
                </label>
                <input
                  type="text"
                  required
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  placeholder="e.g. Dr. Vishal S, PT"
                  className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    MPT Credential
                  </label>
                  <input
                    type="text"
                    value={docCred}
                    onChange={(e) => setDocCred(e.target.value)}
                    placeholder="e.g. MPT (Orthopedics)"
                    className="w-full rounded-xl border border-slate-300 px-3 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    MIAP Registration No.
                  </label>
                  <input
                    type="text"
                    value={docReg}
                    onChange={(e) => setDocReg(e.target.value)}
                    placeholder="e.g. MIAP Reg. No. 12345"
                    className="w-full rounded-xl border border-slate-300 px-3 min-h-[44px] text-base sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Role / Designation
                </label>
                <input
                  type="text"
                  value={docRole}
                  onChange={(e) => setDocRole(e.target.value)}
                  placeholder="e.g. Senior Physiotherapist"
                  className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Department / Sub-Specialty
                </label>
                <input
                  type="text"
                  value={docDept}
                  onChange={(e) => setDocDept(e.target.value)}
                  placeholder="e.g. Orthopedic & Spine Rehabilitation"
                  className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  City / Service Zone
                </label>
                <input
                  type="text"
                  value={docExp}
                  onChange={(e) => setDocExp(e.target.value)}
                  placeholder="e.g. Bangalore & Salem"
                  className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Additional Certifications
                </label>
                <input
                  type="text"
                  value={docExtraCerts}
                  onChange={(e) => setDocExtraCerts(e.target.value)}
                  placeholder="e.g. CDNT, CIASTM, CCT"
                  className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Doctor Photo{" "}
                  <span className="font-normal text-slate-400">
                    (optional — tap to select)
                  </span>
                </label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-2.5">
                  <div className="flex items-center gap-2.5">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-white">
                      {docImage ? (
                        <Image
                          src={docImage}
                          alt="Selected doctor"
                          fill
                          sizes="56px"
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-slate-300">
                          <Stethoscope className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="text-[11px] font-bold text-slate-600">
                        {docImage ? "Photo selected" : "No photo selected"}
                      </div>
                      {docImage && (
                        <button
                          type="button"
                          onClick={() => setDocImage("")}
                          className="mt-0.5 text-[11px] font-bold text-red-500 hover:underline cursor-pointer"
                        >
                          Remove photo
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="mt-2 grid grid-cols-5 gap-1.5">
                    {PROFILE_GALLERY_IMAGES.map((img) => (
                      <button
                        key={img.value}
                        type="button"
                        onClick={() => setDocImage(img.value)}
                        title={img.label}
                        aria-label={img.label}
                        className={`relative aspect-square overflow-hidden rounded-md border-2 cursor-pointer transition ${
                          docImage === img.value
                            ? "border-[#136EA8] ring-2 ring-sky-200"
                            : "border-transparent hover:border-slate-300"
                        }`}
                      >
                        <Image
                          src={img.value}
                          alt={img.label}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-[10px] leading-snug text-slate-400">
                    Photos come from{" "}
                    <code className="font-mono">/images/profiles/</code> — add
                    new doctor photos to that folder only.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Short Clinical Bio
                </label>
                <textarea
                  rows={3}
                  value={docBio}
                  onChange={(e) => setDocBio(e.target.value)}
                  placeholder="Clinical focus, sub-specialty strengths, conditions treated..."
                  className="w-full rounded-xl border border-slate-300 p-3 text-base sm:text-sm"
                />
              </div>

              {memberError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-bold text-red-700">
                  {memberError}
                </div>
              )}

              <div className="flex gap-2.5">
                <button
                  type="submit"
                  disabled={savingMember}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0F1D35] min-h-[46px] text-xs font-extrabold text-white hover:bg-[#136EA8] disabled:opacity-60 cursor-pointer"
                >
                  {savingMember ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : editingMemberId ? (
                    <>
                      <Check className="h-4 w-4 text-[#9AD634]" />
                      Save Changes
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 text-[#9AD634]" />
                      Add Specialist Doctor
                    </>
                  )}
                </button>
                {editingMemberId && (
                  <button
                    type="button"
                    onClick={resetTeamForm}
                    className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-300 px-4 min-h-[46px] text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    <X className="h-4 w-4" />
                    Cancel
                  </button>
                )}
              </div>
            </form>

            <div className="lg:col-span-7 space-y-3">
              {teamMembers.length === 0 && (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                    <Stethoscope className="h-6 w-6" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-[#0F1D35]">
                    Your roster is empty
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">
                    Doctors are read live from the database — nothing is
                    hardcoded. Add your first specialist using the form, or add
                    records to the <code className="font-mono">team_members</code>{" "}
                    collection in Firestore.
                  </p>
                </div>
              )}
              {teamMembers.map((m) => (
                <div
                  key={m.id}
                  className={`rounded-2xl border bg-white p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                    editingMemberId === m.id
                      ? "border-[#136EA8] ring-2 ring-sky-100"
                      : "border-slate-200"
                  }`}
                >
                  <div className="flex gap-3 min-w-0">
                    {m.image ? (
                      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                        <Image
                          src={m.image}
                          alt={m.name}
                          fill
                          sizes="56px"
                          className="object-cover object-top"
                        />
                      </div>
                    ) : (
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                        <Stethoscope className="h-6 w-6" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-base font-extrabold text-[#0F1D35]">
                          {m.name}
                        </span>
                        <span className="rounded-full bg-sky-50 border border-sky-200 px-2.5 py-0.5 text-[11px] font-bold text-[#136EA8] break-words">
                          {m.credential}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-600 mt-0.5">
                        {m.role} • {m.department}
                      </div>
                      <div className="text-[11px] font-semibold text-slate-500 mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {m.experience}
                        </span>
                        {m.registration && (
                          <>
                            <span className="text-slate-300">•</span>
                            <span>{m.registration}</span>
                          </>
                        )}
                      </div>
                      {m.extraCertifications && (
                        <div className="text-[11px] text-slate-500 mt-1">
                          {m.extraCertifications}
                        </div>
                      )}
                      {m.bio && (
                        <p className="text-xs text-slate-500 mt-1">{m.bio}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditMember(m)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-300 px-2.5 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        try {
                          await updateTeamMemberClient(m.id, {
                            published: !m.published,
                          });
                          await refreshCms();
                          showToast(
                            !m.published ? "Doctor is now live." : "Doctor hidden."
                          );
                        } catch {
                          showToast("Could not update visibility. Try again.");
                        }
                      }}
                      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold cursor-pointer ${
                        m.published
                          ? "bg-lime-100 text-lime-900"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {m.published ? "Live" : "Hidden"}
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        if (
                          !window.confirm(
                            `Remove ${m.name} from the clinical roster?`
                          )
                        )
                          return;
                        try {
                          await deleteTeamMemberClient(m.id);
                          if (editingMemberId === m.id) resetTeamForm();
                          await refreshCms();
                          showToast("Doctor removed.");
                        } catch {
                          showToast("Could not remove doctor. Try again.");
                        }
                      }}
                      className="rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50 cursor-pointer"
                      aria-label={`Delete ${m.name}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 6: DYNAMIC BLOG / GUIDES PUBLISHER ==================== */}
        {tab === "blogs" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <form
              onSubmit={handleAddBlog}
              className="lg:col-span-6 rounded-3xl border border-slate-200 bg-white p-6 space-y-3.5 h-fit"
            >
              <div>
                <h2 className="font-display text-lg font-extrabold text-[#0F1D35]">
                  Publish New Clinical Guide / Update
                </h2>
                <p className="text-xs text-slate-500">
                  Appears immediately on both the Homepage &amp; Recovery Guides
                  page.
                </p>
              </div>
              <input
                type="text"
                required
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                placeholder="Article Title *"
                className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
              />
              <div className="grid grid-cols-3 gap-2.5">
                <select
                  value={blogTag}
                  onChange={(e) => setBlogTag(e.target.value)}
                  className="rounded-xl border border-slate-300 px-2.5 min-h-[44px] text-base sm:text-xs"
                >
                  <option>MPT Orthopedics</option>
                  <option>MPT Sports Rehab</option>
                  <option>MPT Neurology</option>
                  <option>MPT Pediatrics</option>
                  <option>MPT Women&apos;s Health</option>
                </select>
                <input
                  type="text"
                  value={blogReadTime}
                  onChange={(e) => setBlogReadTime(e.target.value)}
                  placeholder="e.g. 4 min read"
                  className="rounded-xl border border-slate-300 px-2.5 min-h-[44px] text-base sm:text-xs"
                />
                <select
                  value={blogImage}
                  onChange={(e) => setBlogImage(e.target.value)}
                  className="rounded-xl border border-slate-300 px-2.5 min-h-[44px] text-base sm:text-xs"
                >
                  {CLINIC_GALLERY_IMAGES.map((img) => (
                    <option key={img.value} value={img.value}>
                      {img.label}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={blogExcerpt}
                onChange={(e) => setBlogExcerpt(e.target.value)}
                placeholder="Short Summary Excerpt (1-2 sentences)"
                className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
              />
              <textarea
                rows={5}
                required
                value={blogBody}
                onChange={(e) => setBlogBody(e.target.value)}
                placeholder="Write full article paragraphs (separate paragraphs with a new line) *"
                className="w-full rounded-xl border border-slate-300 p-3 text-base sm:text-sm"
              />
              <input
                type="text"
                value={blogTakeaway}
                onChange={(e) => setBlogTakeaway(e.target.value)}
                placeholder="Key Clinical Takeaway Box (Optional)"
                className="w-full rounded-xl border border-slate-300 px-3.5 min-h-[44px] text-base sm:text-sm"
              />
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#0F1D35] min-h-[46px] text-xs font-extrabold text-white hover:bg-[#136EA8] cursor-pointer"
              >
                <Plus className="h-4 w-4 text-[#9AD634]" />
                Publish Guide Live
              </button>
            </form>

            <div className="lg:col-span-6 space-y-3">
              <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-4 text-xs text-slate-700">
                <strong>5 Core SEO Recovery Guides</strong> are built into
                static SEO routes (<code>/blog/...</code>) for Google indexing.
                Any custom guides you publish here appear right alongside them!
              </div>
              {customBlogs.map((b) => (
                <div
                  key={b.id}
                  className="rounded-2xl border border-slate-200 bg-white p-5 flex items-start justify-between gap-3"
                >
                  <div>
                    <span className="text-[11px] font-bold text-[#136EA8]">
                      {b.specialistTag} • {b.publishedAt}
                    </span>
                    <h3 className="font-display text-base font-extrabold text-[#0F1D35]">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {b.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={async () => {
                        await updateCustomBlogClient(b.id, {
                          published: !b.published,
                        });
                        await refreshCms();
                        showToast(
                          !b.published ? "Guide live!" : "Guide hidden."
                        );
                      }}
                      className={`rounded-lg px-2.5 py-1 text-xs font-bold cursor-pointer ${
                        b.published
                          ? "bg-lime-100 text-lime-900"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {b.published ? "Live" : "Hidden"}
                    </button>
                    <button
                      type="button"
                      onClick={async () => {
                        await deleteCustomBlogClient(b.id);
                        await refreshCms();
                        showToast("Guide deleted.");
                      }}
                      className="rounded-lg border border-red-200 p-1.5 text-red-500 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 7: BACKEND, AUTO-EMAIL & FIREBASE ==================== */}
        {tab === "diagnostics" && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div>
                <h2 className="font-display text-xl font-extrabold text-[#0F1D35]">
                  Backend Health, Auto-Email Alerts &amp; Firebase Setup
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Test live API routes, verify automatic email alerts to{" "}
                  <code>{liveSettings.email}</code>, and copy Firestore Rules.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                <button
                  type="button"
                  onClick={async () => {
                    setDiagRunning(true);
                    try {
                      const res = await fetch("/api/test-email", {
                        method: "POST",
                      });
                      const data = await res.json();
                      if (data.ok) {
                        setDiagResult(
                          `SUCCESS (${data.status}): Test auto-email sent to ${liveSettings.email}!`
                        );
                      } else {
                        setDiagResult(
                          `Auto-Email not configured yet (${data.status}). Add GMAIL_APP_PASSWORD or WEB3FORMS_ACCESS_KEY in Vercel Environment Variables (see guide below).`
                        );
                      }
                    } finally {
                      setDiagRunning(false);
                    }
                  }}
                  disabled={diagRunning}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 min-h-[44px] text-xs font-extrabold text-[#0F1D35] hover:border-[#136EA8] cursor-pointer"
                >
                  <Mail className="h-4 w-4 text-[#136EA8]" />
                  Send Test Auto-Email
                </button>
                <button
                  type="button"
                  onClick={runDiagnostics}
                  disabled={diagRunning}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0F1D35] px-5 min-h-[44px] text-xs font-extrabold text-white hover:bg-[#136EA8] cursor-pointer"
                >
                  <ShieldCheck className="h-4 w-4 text-[#9AD634]" />
                  {diagRunning ? "Testing..." : "Run Backend Health Check"}
                </button>
              </div>
            </div>

            {diagResult && (
              <div className="rounded-2xl border border-lime-300 bg-lime-50 p-4 text-xs sm:text-sm font-bold text-slate-900">
                {diagResult}
              </div>
            )}

            {/* Automatic Email Alerts Guide */}
            <div className="rounded-2xl border border-sky-200 bg-sky-50/70 p-5 space-y-3">
              <div className="text-sm font-extrabold text-[#0F1D35]">
                How Automatic Email Alerts Work (100% Free — ₹0/month)
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                Every new <strong>Consultation Booking</strong>,{" "}
                <strong>Contact Enquiry</strong>, and{" "}
                <strong>Specialist Application</strong> automatically triggers
                an instant email to <code>{liveSettings.email}</code>. Pick{" "}
                <strong>either</strong> free method in Vercel Environment
                Variables:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-white border border-sky-200 p-4 space-y-1.5">
                  <strong className="text-[#0F1D35] block">
                    Option A — Free Gmail SMTP (Sends Clinic Email + Patient Auto-Reply!)
                  </strong>
                  <p className="text-slate-600">
                    1. Sign in to <code>runlifephysio@gmail.com</code> → enable
                    2-Step Verification → open{" "}
                    <code>myaccount.google.com/apppasswords</code>.<br />
                    2. Generate a 16-character App Password.<br />
                    3. Add <code>GMAIL_USER=runlifephysio@gmail.com</code> and{" "}
                    <code>GMAIL_APP_PASSWORD=xxxx...</code> in Vercel.
                  </p>
                </div>
                <div className="rounded-xl bg-white border border-sky-200 p-4 space-y-1.5">
                  <strong className="text-[#0F1D35] block">
                    Option B — 30-Second Setup (No Gmail Password Needed!)
                  </strong>
                  <p className="text-slate-600">
                    1. Visit <code>web3forms.com</code> and enter{" "}
                    <code>runlifephysio@gmail.com</code>.<br />
                    2. Copy the free Access Key emailed to Dr. Vishal.<br />
                    3. Add <code>WEB3FORMS_ACCESS_KEY=your_key</code> in Vercel
                    Environment Variables.
                  </p>
                </div>
              </div>
            </div>

            <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 list-decimal pl-5">
              <li>
                Create a free project at{" "}
                <strong>console.firebase.google.com</strong> (stay on{" "}
                <strong>Spark Plan — ₹0/month</strong>).
              </li>
              <li>
                Enable <strong>Cloud Firestore</strong> (Production mode,{" "}
                <code>asia-south1</code> Mumbai) and paste the updated{" "}
                <code>firestore.rules</code> below.
              </li>
              <li>
                Enable <strong>Authentication → Email/Password</strong> and add{" "}
                <code>runlifephysio@gmail.com</code>.
              </li>
              <li>
                Add the <code>NEXT_PUBLIC_FIREBASE_*</code> keys +{" "}
                <code>GMAIL_APP_PASSWORD</code> in{" "}
                <strong>Vercel → Settings → Environment Variables</strong>.
              </li>
            </ol>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Updated Firestore Security Rules (Copy into Firestore → Rules)
              </div>
              <pre className="overflow-x-auto rounded-2xl bg-slate-950 p-4 text-xs text-lime-300">
{`rules_version = '2';
// Runlife Physio — Firestore Security Rules
// Paste into: Firebase Console -> Firestore Database -> Rules -> Publish
// 100% compatible with the Firebase Spark (Free) Plan.
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper: authorized admin (add more emails inside the list)
    function isAdmin() {
      return request.auth != null &&
             request.auth.token.email in [
               "runlifephysio@gmail.com"
             ];
    }

    // 1. Website settings — public read, admin write
    match /site_settings/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // 2. Patient testimonials — public read, admin write
    match /testimonials/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // 3. Specialist team profiles — public read, admin write
    match /team_members/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // 4. Blog posts / clinical guides — public read, admin write
    match /blog_posts/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // 5. CMS bookkeeping (remembers deleted default doctors)
    //    Public read so the roster merge works, admin-only write.
    match /cms_meta/{docId} {
      allow read: if true;
      allow write: if isAdmin();
    }

    // 6. Appointment bookings — public create, admin managed
    match /appointments/{appointmentId} {
      allow create: if request.resource.data.keys().hasAll(
                         ['patientName', 'phone', 'careMode', 'specialty', 'status', 'createdAt'])
                    && request.resource.data.patientName is string
                    && request.resource.data.patientName.size() >= 2
                    && request.resource.data.patientName.size() <= 120
                    && request.resource.data.phone is string
                    && request.resource.data.phone.size() >= 7
                    && request.resource.data.phone.size() <= 30;
      allow read, update, delete: if isAdmin();
    }

    // 7. Contact & MPT network inquiries — public create, admin managed
    match /inquiries/{inquiryId} {
      allow create: if request.resource.data.keys().hasAll(
                         ['name', 'phone', 'type', 'createdAt'])
                    && request.resource.data.name is string
                    && request.resource.data.name.size() >= 2
                    && request.resource.data.name.size() <= 120;
      allow read, update, delete: if isAdmin();
    }
  }
}
`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

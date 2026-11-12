import fs from "fs";
import path from "path";
import type { AppointmentRecord, InquiryRecord } from "@/lib/appointmentsStore";

const DB_FILE = path.join("/tmp", "runlife-physio-demo-store.json");

interface DemoStoreShape {
  appointments: AppointmentRecord[];
  inquiries: InquiryRecord[];
}

const SEED_DATA: DemoStoreShape = {
  appointments: [
    {
      id: "seed-101",
      referenceId: "RLP-4821",
      patientName: "Karthik Subramanian",
      phone: "+91 98450 31290",
      email: "karthik.s@example.com",
      careMode: "By-Appointment Visit",
      specialty: "Sports & Running Rehabilitation",
      conditionOrPain: "ACL Reconstruction (Week 10) — Return-to-Run Readiness",
      locality: "Indiranagar, Bangalore",
      preferredDate: "2026-11-11",
      preferredSlot: "Morning (8:00 AM – 11:00 AM)",
      notes: "Operated 10 weeks ago, full extension achieved, looking for MPT Sports S&C plan.",
      clinicalNotes: "Schedule hop-prep & single-leg press strength baseline with Dr. Vishal.",
      status: "scheduled",
      source: "Interactive Pain Finder",
      createdAt: "2026-11-09T06:30:00.000Z",
    },
    {
      id: "seed-102",
      referenceId: "RLP-5194",
      patientName: "Lakshmi Narayanan",
      phone: "+91 99001 77421",
      email: "",
      careMode: "Home Care (Bangalore)",
      specialty: "Neurological Rehabilitation",
      conditionOrPain: "Post-Stroke (CVA) Left Hemiparesis & Gait Balance",
      locality: "Jayanagar 4th Block, Bangalore",
      preferredDate: "2026-11-10",
      preferredSlot: "Morning (9:00 AM – 12:00 PM)",
      notes: "Discharged 5 days ago; daughter requesting daily home visit by MPT Neuro specialist.",
      clinicalNotes: "",
      status: "new",
      source: "Stroke Rehab Page",
      createdAt: "2026-11-09T08:15:00.000Z",
    },
    {
      id: "seed-103",
      referenceId: "RLP-6038",
      patientName: "Ananya Rao",
      phone: "+91 97392 45108",
      email: "ananya.rao@example.com",
      careMode: "Home Care (Bangalore)",
      specialty: "Gynecology, Women's Health & Pelvic Rehabilitation",
      conditionOrPain: "Postnatal C-Section Core & Diastasis Recti (8 Weeks Postpartum)",
      locality: "HSR Layout Sector 2, Bangalore",
      preferredDate: "2026-11-12",
      preferredSlot: "Afternoon (12:00 PM – 4:00 PM)",
      notes: "Prefer female MPT Women's Health specialist home visit.",
      clinicalNotes: "Assigned female MPT OBG specialist; confirmed 2:30 PM slot.",
      status: "contacted",
      source: "Women's Health Page",
      createdAt: "2026-11-08T14:20:00.000Z",
    },
  ],
  inquiries: [
    {
      id: "inq-201",
      name: "Dr. Meera Nair (MPT Pediatrics)",
      phone: "+91 96114 82019",
      email: "meera.mpt@example.com",
      type: "mpt-network-application",
      specialtyOrQualification: "MPT (Pediatrics) — 5 Yrs Experience",
      city: "Whitefield / East Bangalore",
      experienceYears: "5",
      message: "Experienced in CP, GDD & NDT play therapy. Interested in joining Dr. Vishal's Runlife Specialist Network for East Bangalore home visits.",
      createdAt: "2026-11-08T11:10:00.000Z",
    },
  ],
};

export function readDemoStore(): DemoStoreShape {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify(SEED_DATA, null, 2), "utf8");
      return structuredClone(SEED_DATA);
    }
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw) as DemoStoreShape;
  } catch {
    return structuredClone(SEED_DATA);
  }
}

export function writeDemoStore(data: DemoStoreShape): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn("Demo store write warning:", err);
  }
}

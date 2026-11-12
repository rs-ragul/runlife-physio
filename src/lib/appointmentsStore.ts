import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase";

export type AppointmentStatus =
  | "new"
  | "contacted"
  | "scheduled"
  | "completed"
  | "cancelled";

export interface AppointmentRecord {
  id?: string;
  referenceId: string;
  patientName: string;
  phone: string;
  email?: string;
  careMode: string;
  specialty: string;
  conditionOrPain: string;
  locality: string;
  preferredDate: string;
  preferredSlot: string;
  notes?: string;
  clinicalNotes?: string;
  status: AppointmentStatus;
  source?: string;
  createdAt: string;
}

export interface InquiryRecord {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  type: "patient-question" | "mpt-network-application";
  specialtyOrQualification?: string;
  city?: string;
  experienceYears?: string;
  message: string;
  createdAt: string;
}

export function generateReferenceId(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `RLP-${num}`;
}

export async function createAppointmentClient(
  input: Omit<AppointmentRecord, "id" | "referenceId" | "status" | "createdAt">
): Promise<{
  record: AppointmentRecord;
  savedToFirestore: boolean;
  emailNotificationStatus: string;
}> {
  const record: AppointmentRecord = {
    ...input,
    referenceId: generateReferenceId(),
    status: "new",
    clinicalNotes: "",
    createdAt: new Date().toISOString(),
  };

  let savedToFirestore = false;
  const { db } = getFirebaseClient();

  if (isFirebaseConfigured && db) {
    try {
      const ref = await addDoc(collection(db, "appointments"), record);
      record.id = ref.id;
      savedToFirestore = true;
    } catch (err) {
      console.warn("Firestore write fallback triggered:", err);
    }
  }

  let emailNotificationStatus = "skipped";
  try {
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...record, savedToFirestore }),
    });
    const data = await res.json();
    if (!record.id && data?.record?.id) {
      record.id = data.record.id;
    }
    emailNotificationStatus = data?.emailStatus || "skipped";
  } catch (err) {
    console.warn("API notification warning:", err);
  }

  return { record, savedToFirestore, emailNotificationStatus };
}

export async function fetchAllAppointmentsClient(): Promise<AppointmentRecord[]> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, "appointments"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      ...(d.data() as AppointmentRecord),
      id: d.id,
    }));
  }

  const res = await fetch("/api/appointments", { cache: "no-store" });
  const data = await res.json();
  return data.appointments || [];
}

export async function updateAppointmentClient(
  id: string,
  updates: Partial<Pick<AppointmentRecord, "status" | "clinicalNotes">>
): Promise<void> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, "appointments", id), updates);
    return;
  }

  await fetch("/api/appointments", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, updates }),
  });
}

export async function deleteAppointmentClient(id: string): Promise<void> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "appointments", id));
    return;
  }

  await fetch(`/api/appointments?id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export async function createInquiryClient(
  input: Omit<InquiryRecord, "id" | "createdAt">
): Promise<{ record: InquiryRecord; savedToFirestore: boolean }> {
  const record: InquiryRecord = {
    ...input,
    createdAt: new Date().toISOString(),
  };

  let savedToFirestore = false;
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    try {
      const ref = await addDoc(collection(db, "inquiries"), record);
      record.id = ref.id;
      savedToFirestore = true;
    } catch (err) {
      console.warn("Firestore inquiry fallback triggered:", err);
    }
  }

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...record, savedToFirestore }),
    });
    const data = await res.json();
    if (!record.id && data?.record?.id) {
      record.id = data.record.id;
    }
  } catch (err) {
    console.warn("Contact API warning:", err);
  }

  return { record, savedToFirestore };
}

export async function fetchAllInquiriesClient(): Promise<InquiryRecord[]> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    const q = query(collection(db, "inquiries"), orderBy("createdAt", "desc"));
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({
      ...(d.data() as InquiryRecord),
      id: d.id,
    }));
  }

  const res = await fetch("/api/contact", { cache: "no-store" });
  const data = await res.json();
  return data.inquiries || [];
}

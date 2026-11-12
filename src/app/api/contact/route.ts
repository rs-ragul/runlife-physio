import { NextRequest, NextResponse } from "next/server";
import { readDemoStore, writeDemoStore } from "@/lib/serverDemoStore";
import { sendClinicEmailAlert } from "@/lib/emailNotifier";
import type { InquiryRecord } from "@/lib/appointmentsStore";

export async function GET() {
  const store = readDemoStore();
  const sorted = [...store.inquiries].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json({ inquiries: sorted });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const phone = String(body.phone || "").trim();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const record: InquiryRecord = {
      id: body.id || `inq-${Date.now()}`,
      name,
      phone,
      email: String(body.email || "").trim(),
      type:
        body.type === "mpt-network-application"
          ? "mpt-network-application"
          : "patient-question",
      specialtyOrQualification: String(body.specialtyOrQualification || "").trim(),
      city: String(body.city || "Bangalore").trim(),
      experienceYears: String(body.experienceYears || "").trim(),
      message: String(body.message || "").trim(),
      createdAt: body.createdAt || new Date().toISOString(),
    };

    if (!body.savedToFirestore) {
      const store = readDemoStore();
      store.inquiries.unshift(record);
      writeDemoStore(store);
    }

    const label =
      record.type === "mpt-network-application"
        ? "MPT Specialist Network Application"
        : "Patient Contact Inquiry";

    await sendClinicEmailAlert({
      subject: `[Runlife Physio] ${label} — ${record.name}`,
      replyTo: record.email || undefined,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 580px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;">
          <h2 style="color: #0f1d35; margin-top: 0;">${label}</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Phone:</strong> ${record.phone}</p>
          ${record.email ? `<p><strong>Email:</strong> ${record.email}</p>` : ""}
          ${record.specialtyOrQualification ? `<p><strong>MPT Specialty / Qualification:</strong> ${record.specialtyOrQualification}</p>` : ""}
          ${record.experienceYears ? `<p><strong>Clinical Experience:</strong> ${record.experienceYears} years</p>` : ""}
          <p><strong>City / Zone:</strong> ${record.city}</p>
          <p><strong>Message:</strong><br/>${record.message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true, record });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit inquiry." },
      { status: 500 }
    );
  }
}

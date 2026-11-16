import { NextRequest, NextResponse } from "next/server";
import { readDemoStore, writeDemoStore } from "@/lib/serverDemoStore";
import { sendClinicEmailAlert } from "@/lib/emailNotifier";
import { SITE_CONFIG } from "@/config/site";
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
      specialtyOrQualification: String(
        body.specialtyOrQualification || ""
      ).trim(),
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
        ? "Specialist Team Application"
        : "Patient Website Enquiry";

    const emailStatus = await sendClinicEmailAlert({
      subject: `[Runlife Physio] ${label} — ${record.name} (${record.city})`,
      replyTo: record.email || undefined,
      plainSummary: {
        Type: label,
        Name: record.name,
        Phone: record.phone,
        Email: record.email || "Not provided",
        City: record.city || "Not specified",
        Qualification: record.specialtyOrQualification || "N/A",
        Experience: record.experienceYears || "N/A",
        Message: record.message,
      },
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 580px; padding: 22px; border: 1px solid #e2e8f0; border-radius: 12px;">
          <h2 style="color: #0f1d35; margin-top: 0;">${label}</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Phone:</strong> <a href="tel:${record.phone}">${record.phone}</a></p>
          ${record.email ? `<p><strong>Email:</strong> <a href="mailto:${record.email}">${record.email}</a></p>` : ""}
          ${record.specialtyOrQualification ? `<p><strong>Qualification:</strong> ${record.specialtyOrQualification}</p>` : ""}
          ${record.experienceYears ? `<p><strong>Experience:</strong> ${record.experienceYears}</p>` : ""}
          <p><strong>City / Area:</strong> ${record.city}</p>
          <p><strong>Message:</strong><br/>${record.message}</p>
        </div>
      `,
      patientAutoReply: record.email
        ? {
            toEmail: record.email,
            patientName: record.name,
            subject: `We Received Your Message — Runlife Physio`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 560px; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px;">
                <p>Dear <strong>${record.name}</strong>,</p>
                <p>Thank you for contacting <strong>Runlife Physio</strong>. We have received your enquiry and will respond shortly on <strong>${record.phone}</strong>.</p>
                <p>For immediate help, call or WhatsApp us at <strong>${SITE_CONFIG.contact.phoneDisplay}</strong>.</p>
                <p style="margin-bottom:0;">Warm regards,<br/><strong>Dr. Vishal &amp; Runlife Physio Team</strong><br/>Bangalore &amp; Salem</p>
              </div>
            `,
          }
        : undefined,
    });

    return NextResponse.json({ ok: true, record, emailStatus });
  } catch {
    return NextResponse.json(
      { error: "Unable to submit inquiry." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const store = readDemoStore();
      store.inquiries = store.inquiries.filter((i) => i.id !== id);
      writeDemoStore(store);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

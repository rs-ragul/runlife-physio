import { NextRequest, NextResponse } from "next/server";
import { readDemoStore, writeDemoStore } from "@/lib/serverDemoStore";
import { sendClinicEmailAlert } from "@/lib/emailNotifier";
import { SITE_CONFIG } from "@/config/site";
import type { AppointmentRecord } from "@/lib/appointmentsStore";

export async function GET() {
  const store = readDemoStore();
  const sorted = [...store.appointments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return NextResponse.json({ appointments: sorted });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const patientName = String(body.patientName || "").trim();
    const phone = String(body.phone || "").trim();

    if (!patientName || !phone) {
      return NextResponse.json(
        { error: "Patient name and phone number are required." },
        { status: 400 }
      );
    }

    const record: AppointmentRecord = {
      id: body.id || `demo-${Date.now()}`,
      referenceId:
        body.referenceId || `RLP-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName,
      phone,
      email: String(body.email || "").trim(),
      careMode: String(body.careMode || "Home Visit (Bangalore & Salem)"),
      specialty: String(body.specialty || "Orthopedic & MSK Rehabilitation"),
      conditionOrPain: String(body.conditionOrPain || "Consultation Request"),
      locality: String(body.locality || "Bangalore"),
      preferredDate: String(body.preferredDate || ""),
      preferredSlot: String(body.preferredSlot || "Flexible"),
      notes: String(body.notes || "").trim(),
      clinicalNotes: "",
      status: "new",
      source: String(body.source || "Website Booking Form"),
      createdAt: body.createdAt || new Date().toISOString(),
    };

    if (!body.savedToFirestore) {
      const store = readDemoStore();
      store.appointments.unshift(record);
      writeDemoStore(store);
    }

    const cleanDigits = record.phone.replace(/\D/g, "");
    const waDigits =
      cleanDigits.length === 10 ? `91${cleanDigits}` : cleanDigits;
    const waQuickReply = `https://wa.me/${waDigits}?text=${encodeURIComponent(
      `Hello ${record.patientName}, greetings from Runlife Physio! We received your consultation request (${record.referenceId}) for ${record.specialty}.`
    )}`;

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden;">
        <div style="background: #0f1d35; color: #ffffff; padding: 20px 24px;">
          <h2 style="margin: 0; font-size: 20px;">New Consultation Booking — Runlife Physio</h2>
          <p style="margin: 4px 0 0; color: #9ad634; font-size: 13px;">Ref ID: ${record.referenceId} • ${record.careMode}</p>
        </div>
        <div style="padding: 24px; background: #ffffff; color: #0f172a; line-height: 1.65;">
          <p style="margin: 0 0 8px;"><strong>Patient Name:</strong> ${record.patientName}</p>
          <p style="margin: 0 0 8px;"><strong>Phone / WhatsApp:</strong> <a href="tel:${record.phone}" style="color:#136ea8;font-weight:bold;">${record.phone}</a></p>
          ${record.email ? `<p style="margin: 0 0 8px;"><strong>Email:</strong> <a href="mailto:${record.email}">${record.email}</a></p>` : ""}
          <p style="margin: 0 0 8px;"><strong>Care Format:</strong> ${record.careMode}</p>
          <p style="margin: 0 0 8px;"><strong>Department:</strong> ${record.specialty}</p>
          <p style="margin: 0 0 8px;"><strong>Condition / Area:</strong> ${record.conditionOrPain}</p>
          <p style="margin: 0 0 8px;"><strong>City &amp; Locality:</strong> ${record.locality}</p>
          <p style="margin: 0 0 8px;"><strong>Preferred Date &amp; Time:</strong> ${record.preferredDate || "Earliest Available"} (${record.preferredSlot})</p>
          ${record.notes ? `<p style="margin: 0 0 12px;"><strong>Notes:</strong> ${record.notes}</p>` : ""}
          <div style="margin-top: 18px; padding-top: 16px; border-top: 1px solid #e2e8f0;">
            <a href="${waQuickReply}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold;font-size:13px;margin-right:8px;">Reply on WhatsApp</a>
            <a href="tel:${record.phone}" style="display:inline-block;background:#0f1d35;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold;font-size:13px;">Call Patient</a>
          </div>
        </div>
      </div>
    `;

    const patientReplyHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 580px; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden;">
        <div style="background: #0f1d35; color: #ffffff; padding: 18px 22px;">
          <h2 style="margin: 0; font-size: 18px;">Runlife Physio — Consultation Request Received</h2>
        </div>
        <div style="padding: 22px; color: #0f172a; line-height: 1.6;">
          <p>Dear <strong>${record.patientName}</strong>,</p>
          <p>Thank you for booking a consultation with <strong>Runlife Physio</strong> (Reference ID: <strong>${record.referenceId}</strong>).</p>
          <p>Our care team has received your details for <strong>${record.specialty}</strong> (${record.careMode} — ${record.locality}) and will call you shortly on <strong>${record.phone}</strong> to confirm your appointment time.</p>
          <p>For urgent assistance, you can reach us directly at <strong>${SITE_CONFIG.contact.phoneDisplay}</strong> or reply to this email.</p>
          <p style="margin-bottom:0;">Warm regards,<br/><strong>Dr. Vishal &amp; Runlife Physio Team</strong><br/>Bangalore &amp; Salem</p>
        </div>
      </div>
    `;

    const emailStatus = await sendClinicEmailAlert({
      subject: `[Runlife Physio] New Consultation (${record.referenceId}) — ${record.patientName} (${record.locality})`,
      html: emailHtml,
      replyTo: record.email || undefined,
      plainSummary: {
        Reference_ID: record.referenceId,
        Patient_Name: record.patientName,
        Phone: record.phone,
        Email: record.email || "Not provided",
        Care_Mode: record.careMode,
        Department: record.specialty,
        Condition: record.conditionOrPain,
        City_Locality: record.locality,
        Preferred_Date: `${record.preferredDate || "Earliest Available"} (${record.preferredSlot})`,
        Notes: record.notes || "None",
      },
      patientAutoReply: record.email
        ? {
            toEmail: record.email,
            patientName: record.patientName,
            subject: `Consultation Request Received (${record.referenceId}) — Runlife Physio`,
            html: patientReplyHtml,
          }
        : undefined,
    });

    return NextResponse.json({ ok: true, record, emailStatus });
  } catch (err) {
    console.error("Appointment API error:", err);
    return NextResponse.json(
      { error: "Unable to process booking request." },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { id, updates } = await req.json();
    const store = readDemoStore();
    const idx = store.appointments.findIndex((a) => a.id === id);
    if (idx !== -1) {
      store.appointments[idx] = { ...store.appointments[idx], ...updates };
      writeDemoStore(store);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const store = readDemoStore();
      store.appointments = store.appointments.filter((a) => a.id !== id);
      writeDemoStore(store);
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

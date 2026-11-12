import { NextRequest, NextResponse } from "next/server";
import { readDemoStore, writeDemoStore } from "@/lib/serverDemoStore";
import { sendClinicEmailAlert } from "@/lib/emailNotifier";
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
      referenceId: body.referenceId || `RLP-${Math.floor(1000 + Math.random() * 9000)}`,
      patientName,
      phone,
      email: String(body.email || "").trim(),
      careMode: String(body.careMode || "Home Care (Bangalore)"),
      specialty: String(body.specialty || "Orthopedic & MSK Rehabilitation"),
      conditionOrPain: String(body.conditionOrPain || "General Assessment"),
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

    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden;">
        <div style="background: #0f1d35; color: #ffffff; padding: 20px 24px;">
          <h2 style="margin: 0; font-size: 20px;">New Patient Booking — Runlife Physio</h2>
          <p style="margin: 4px 0 0; color: #9ad634; font-size: 13px;">Ref ID: ${record.referenceId} • ${record.careMode}</p>
        </div>
        <div style="padding: 24px; background: #ffffff; color: #0f172a; line-height: 1.6;">
          <p><strong>Patient Name:</strong> ${record.patientName}</p>
          <p><strong>Phone / WhatsApp:</strong> <a href="tel:${record.phone}">${record.phone}</a></p>
          ${record.email ? `<p><strong>Email:</strong> ${record.email}</p>` : ""}
          <p><strong>Care Mode:</strong> ${record.careMode}</p>
          <p><strong>MPT Specialty:</strong> ${record.specialty}</p>
          <p><strong>Condition / Pain Area:</strong> ${record.conditionOrPain}</p>
          <p><strong>Bangalore Locality / City:</strong> ${record.locality}</p>
          <p><strong>Preferred Date & Slot:</strong> ${record.preferredDate || "Earliest Available"} (${record.preferredSlot})</p>
          ${record.notes ? `<p><strong>Patient Notes:</strong> ${record.notes}</p>` : ""}
        </div>
      </div>
    `;

    const emailStatus = await sendClinicEmailAlert({
      subject: `[Runlife Physio] New Booking (${record.referenceId}) — ${record.patientName} (${record.careMode})`,
      html: emailHtml,
      replyTo: record.email || undefined,
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

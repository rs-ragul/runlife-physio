import { NextResponse } from "next/server";
import { sendClinicEmailAlert } from "@/lib/emailNotifier";
import { SITE_CONFIG } from "@/config/site";

export async function POST() {
  const status = await sendClinicEmailAlert({
    subject: "[Runlife Physio] Test Auto-Email Verification — Working!",
    plainSummary: {
      Status: "Auto-Email Connected Successfully",
      Destination:
        process.env.NOTIFICATION_TO_EMAIL || SITE_CONFIG.contact.email,
      Timestamp: new Date().toISOString(),
    },
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 14px;">
        <h2 style="color: #0f1d35; margin-top: 0;">Auto-Email Alerts Are Live!</h2>
        <p>Every new <strong>Consultation Booking</strong>, <strong>Contact Enquiry</strong>, and <strong>Specialist Application</strong> on Runlife Physio will automatically arrive in this inbox.</p>
        <p style="color:#64748b;font-size:12px;">Sent from Runlife Physio Admin Diagnostics</p>
      </div>
    `,
  });

  return NextResponse.json({ ok: status.startsWith("sent-"), status });
}

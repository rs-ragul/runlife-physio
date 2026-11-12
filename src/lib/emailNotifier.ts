import nodemailer from "nodemailer";
import { SITE_CONFIG } from "@/config/site";

export async function sendClinicEmailAlert(params: {
  subject: string;
  html: string;
  replyTo?: string;
}): Promise<"sent-gmail" | "sent-resend" | "not-configured" | "failed"> {
  const toEmail =
    process.env.NOTIFICATION_TO_EMAIL || SITE_CONFIG.contact.email;

  // Option A: 100% Free Gmail SMTP (via Google App Password)
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });
      await transporter.sendMail({
        from: `"Runlife Physio Booking Desk" <${gmailUser}>`,
        to: toEmail,
        replyTo: params.replyTo || gmailUser,
        subject: params.subject,
        html: params.html,
      });
      return "sent-gmail";
    } catch (err) {
      console.error("Gmail SMTP alert error:", err);
      return "failed";
    }
  }

  // Option B: Resend API Free Tier (3,000 free emails/mo)
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const fromEmail =
        process.env.RESEND_FROM_EMAIL ||
        "Runlife Physio <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromEmail,
          to: [toEmail],
          reply_to: params.replyTo || undefined,
          subject: params.subject,
          html: params.html,
        }),
      });
      if (res.ok) return "sent-resend";
      console.error("Resend API alert failed:", await res.text());
      return "failed";
    } catch (err) {
      console.error("Resend API error:", err);
      return "failed";
    }
  }

  return "not-configured";
}

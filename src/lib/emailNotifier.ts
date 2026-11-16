import nodemailer from "nodemailer";
import { SITE_CONFIG } from "@/config/site";

export type EmailDeliveryStatus =
  | "sent-gmail"
  | "sent-resend"
  | "sent-web3forms"
  | "not-configured"
  | "failed";

export async function sendClinicEmailAlert(params: {
  subject: string;
  html: string;
  plainSummary?: Record<string, string>;
  replyTo?: string;
  patientAutoReply?: {
    toEmail: string;
    patientName: string;
    subject: string;
    html: string;
  };
}): Promise<EmailDeliveryStatus> {
  const toEmail =
    process.env.NOTIFICATION_TO_EMAIL || SITE_CONFIG.contact.email;

  // ---------------------------------------------------------------------------
  // OPTION A: 100% Free Gmail SMTP (via 16-char Google App Password)
  // Sends BOTH clinic alert to runlifephysio@gmail.com AND patient confirmation!
  // ---------------------------------------------------------------------------
  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (gmailUser && gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: gmailUser,
          pass: gmailPass.replace(/\s+/g, ""),
        },
      });

      await transporter.sendMail({
        from: `"Runlife Physio Website" <${gmailUser}>`,
        to: toEmail,
        replyTo: params.replyTo || gmailUser,
        subject: params.subject,
        html: params.html,
      });

      // Also send polite auto-confirmation to patient if patient entered email
      if (params.patientAutoReply?.toEmail) {
        try {
          await transporter.sendMail({
            from: `"Runlife Physio" <${gmailUser}>`,
            to: params.patientAutoReply.toEmail,
            replyTo: toEmail,
            subject: params.patientAutoReply.subject,
            html: params.patientAutoReply.html,
          });
        } catch (autoErr) {
          console.warn("Patient auto-reply skipped:", autoErr);
        }
      }

      return "sent-gmail";
    } catch (err) {
      console.error("Gmail SMTP alert error:", err);
      return "failed";
    }
  }

  // ---------------------------------------------------------------------------
  // OPTION B: Resend Free Tier API (3,000 free emails/month)
  // ---------------------------------------------------------------------------
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

  // ---------------------------------------------------------------------------
  // OPTION C: Web3Forms Free Key (Zero-Password 30-second setup at web3forms.com)
  // ---------------------------------------------------------------------------
  const web3Key = process.env.WEB3FORMS_ACCESS_KEY;
  if (web3Key) {
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: web3Key,
          subject: params.subject,
          from_name: "Runlife Physio Website",
          replyto: params.replyTo || toEmail,
          ...(params.plainSummary || {}),
        }),
      });
      if (res.ok) return "sent-web3forms";
      return "failed";
    } catch (err) {
      console.error("Web3Forms error:", err);
      return "failed";
    }
  }

  return "not-configured";
}

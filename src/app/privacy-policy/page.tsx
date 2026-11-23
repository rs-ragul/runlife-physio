import type { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy & Patient Data Protection",
  description: "How Runlife Physio safeguards patient contact and clinical intake records.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-14 space-y-6">
      <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-[#0F1D35]">
        Privacy Policy &amp; Patient Confidentiality
      </h1>
      <p className="text-xs text-slate-500">Last Updated: November 2026</p>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 space-y-5 text-sm leading-relaxed text-slate-700">
        <p>
          <strong>{SITE_CONFIG.name}</strong> ({SITE_CONFIG.legalName}) respects
          the confidentiality of your personal and health information. When you
          request an appointment, callback, tele-rehabilitation session, or home
          visit through our website, we collect only the details necessary to
          assign an appropriate MPT Specialist and coordinate your care.
        </p>
        <h2 className="text-lg font-extrabold text-[#0F1D35]">
          1. Information We Collect
        </h2>
        <p>
          Patient name, contact phone/WhatsApp number, optional email address,
          preferred locality or city, preferred care mode, and voluntary
          clinical symptom descriptions shared on our booking forms.
        </p>
        <h2 className="text-lg font-extrabold text-[#0F1D35]">
          2. How Your Information Is Used
        </h2>
        <p>
          Your information is used strictly by {SITE_CONFIG.founder.name} and
          authorized Runlife MPT Specialists to schedule assessments, deliver
          physiotherapy treatment, and communicate exercise plans. We never sell
          or rent patient records to third-party marketers.
        </p>
        <h2 className="text-lg font-extrabold text-[#0F1D35]">
          3. Data Security &amp; Contact
        </h2>
        <p>
          Records are stored over encrypted HTTPS connections with restricted
          administrative authentication. To request correction or deletion of
          your inquiry data, email{" "}
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="font-bold text-[#136EA8] underline"
          >
            {SITE_CONFIG.contact.email}
          </a>
          .
        </p>
      </div>
    </div>
  );
}

import { SITE_CONFIG } from "@/config/site";

export interface WhatsAppBookingPayload {
  referenceId?: string;
  patientName: string;
  phone: string;
  careMode: string;
  specialty: string;
  conditionOrPain?: string;
  locality?: string;
  preferredDate?: string;
  preferredSlot?: string;
  notes?: string;
}

export function buildPatientToClinicWhatsAppUrl(
  payload?: WhatsAppBookingPayload
): string {
  const base = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}`;
  if (!payload) {
    const greeting =
      "Hello Dr. Vishal / Runlife Physio Team! I would like to book a specialist physiotherapy assessment.";
    return `${base}?text=${encodeURIComponent(greeting)}`;
  }

  const lines = [
    `*New Assessment Request — Runlife Physio*`,
    payload.referenceId ? `Ref ID: *${payload.referenceId}*` : "",
    `Patient: *${payload.patientName}*`,
    `Phone: ${payload.phone}`,
    `Care Mode: *${payload.careMode}*`,
    `Department: *${payload.specialty}*`,
    payload.conditionOrPain ? `Condition / Area: ${payload.conditionOrPain}` : "",
    payload.locality ? `Location / Area: ${payload.locality}` : "",
    payload.preferredDate
      ? `Preferred Date: ${payload.preferredDate}${payload.preferredSlot ? ` (${payload.preferredSlot})` : ""}`
      : "",
    payload.notes ? `Notes: ${payload.notes}` : "",
    `---`,
    `Please confirm available MPT Specialist slot.`,
  ].filter(Boolean);

  return `${base}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export function buildDoctorToPatientWhatsAppUrl(params: {
  patientName: string;
  phone: string;
  specialty: string;
  careMode: string;
  preferredDate?: string;
  referenceId?: string;
}): string {
  const digits = params.phone.replace(/\D/g, "");
  const normalizedPhone =
    digits.length === 10 ? `91${digits}` : digits.startsWith("0") ? `91${digits.slice(1)}` : digits;

  const message = [
    `Hello *${params.patientName}*,`,
    `Greetings from *Dr. Vishal & Runlife Physio* (REHAB · RECOVER · RUN).`,
    ``,
    `We received your *${params.careMode}* request${params.referenceId ? ` (${params.referenceId})` : ""} for *${params.specialty}*.`,
    params.preferredDate ? `Requested Date: *${params.preferredDate}*` : "",
    ``,
    `Our MPT Specialist is ready to assist you. Please reply here to confirm your convenient time slot or share any X-ray/MRI reports if available.`,
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${normalizedPhone}?text=${encodeURIComponent(message)}`;
}

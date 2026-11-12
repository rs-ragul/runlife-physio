import { SITE_CONFIG } from "@/config/site";
import type { DynamicSiteSettings, TeamMemberItem } from "@/types/cms";

export const DEFAULT_SITE_SETTINGS: DynamicSiteSettings = {
  clinicName: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  announcementEnabled: true,
  announcementText:
    "100% MPT Specialist Physiotherapy Network • Bangalore Home Care & Live Tele-Rehab",

  heroBadgeText: "Bangalore's Multi-Specialty MPT Physiotherapy Platform",
  heroTitlePrimary: "Specialized Physiotherapy Team —",
  heroTitleHighlight: "Under One Platform.",
  heroSubtitle:
    "Every Orthopedic, Neurological, Sports, Pediatric, and Women's Health condition is treated by a dedicated Master of Physiotherapy (MPT) Specialist — at your Bangalore home, online via Tele-Rehab, or by appointment.",
  primaryCtaText: "Book MPT Assessment",
  heroStats: [
    { value: "5 MPT", label: "Specialist Depts" },
    { value: "4 Modes", label: "Home • Tele • Clinic" },
    { value: "18+", label: "Rehab Protocols" },
    { value: "1-on-1", label: "Specialist Care" },
  ],

  phoneDisplay: SITE_CONFIG.contact.phoneDisplay,
  phoneE164: SITE_CONFIG.contact.phoneE164,
  whatsappNumber: SITE_CONFIG.contact.whatsappNumber,
  whatsappGreeting:
    "Hello Dr. Vishal / Runlife Physio! I would like to book a specialist physiotherapy assessment.",
  email: SITE_CONFIG.contact.email,
  operatingHours: "Mon – Sun: Appointment & Home Visit Slots Available",
  callbackPromise: "Prompt callback from our MPT Specialist triage desk",
  consultationFeeNote: "",

  founderName: "Dr. Vishal (PT)",
  founderCredentials: "Physiotherapist & Founder",
  founderRole: "Founder & Clinical Lead — Runlife Specialist Physiotherapy Network",
  founderBio: SITE_CONFIG.founder.bio,
  primaryCity: "Bangalore",
  physicalClinicAddress: "",
  googleMapsUrl: "",
  serviceAreasSummary:
    "Serving major Bangalore neighborhoods (HSR Layout, Indiranagar, Koramangala, Whitefield, JP Nagar, Jayanagar, Bellandur, Sarjapur Road, Hebbal, Malleswaram, Electronic City & Yelahanka) + Pan-India Virtual Tele-Rehab.",

  instagramUrl: "",
  youtubeUrl: "",
  linkedinUrl: "",
  facebookUrl: "",
  googleReviewUrl: "",

  showSmartCareQuiz: true,
  showTeamSection: true,
  showTestimonialsSection: true,
  showBlogSection: true,
  showJoinNetworkForm: true,
  showFloatingWhatsApp: true,
};

export const DEFAULT_TEAM_MEMBERS: TeamMemberItem[] = [
  {
    id: "founder-vishal",
    name: "Dr. Vishal (PT)",
    credential: "Founder & Lead Physiotherapist",
    role: "Clinical Director — Runlife Specialist Network",
    department: "Multi-Specialty Clinical Triage & Rehab",
    experience: "Bangalore & Online",
    bio: "Leads Runlife Physio's specialist physiotherapy network—connecting every patient with a dedicated MPT Specialist in Orthopedics, Neurology, Sports, Pediatrics, or Women's Health.",
    published: true,
    createdAt: "2026-11-09T08:00:00.000Z",
  },
];

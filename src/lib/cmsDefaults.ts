import { SITE_CONFIG } from "@/config/site";
import type { DynamicSiteSettings, TeamMemberItem } from "@/types/cms";

export const DEFAULT_SITE_SETTINGS: DynamicSiteSettings = {
  clinicName: SITE_CONFIG.name,
  tagline: SITE_CONFIG.tagline,
  announcementEnabled: true,
  announcementText:
    "Serving Bangalore & Salem • Home Physiotherapy Visits & Online Consultations",

  heroBadgeText: "Bangalore & Salem's Multi-Specialty Physiotherapy Platform",
  heroTitlePrimary: "Specialized Physiotherapy Team —",
  heroTitleHighlight: "Under One Platform.",
  heroSubtitle:
    "Orthopedic, Neurological, Sports, Pediatric, and Women's Health physiotherapy led by dedicated specialists — available through Home Visits in Bangalore & Salem, Online Consultations, or By Appointment.",
  primaryCtaText: "Book for Consultation",
  heroStats: [],

  phoneDisplay: SITE_CONFIG.contact.phoneDisplay,
  phoneE164: SITE_CONFIG.contact.phoneE164,
  whatsappNumber: SITE_CONFIG.contact.whatsappNumber,
  whatsappGreeting:
    "Hello Runlife Physio! I would like to book for a physiotherapy consultation.",
  email: SITE_CONFIG.contact.email,
  operatingHours: "Mon – Sun: Home Visit & Consultation Slots Available",
  callbackPromise: "Our care desk will call you shortly to confirm your consultation",
  consultationFeeNote: "",

  founderName: "Dr. Vishal (PT)",
  founderCredentials: "Founder & Lead Physiotherapist",
  founderRole: "Founder & Clinical Lead — Runlife Physio",
  founderBio: SITE_CONFIG.founder.bio,
  primaryCity: "Bangalore & Salem",
  physicalClinicAddress: "",
  googleMapsUrl: "",
  serviceAreasSummary:
    "Home Visits & Consultations across Bangalore (HSR Layout, Indiranagar, Koramangala, Whitefield, JP Nagar, Jayanagar, Hebbal, Electronic City) and Salem (Fairlands, Alagapuram, Hasthampatti, Suramangalam, Five Roads, Seelanaickenpatti) + Online Consultations across India.",

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
    role: "Clinical Lead — Runlife Physio",
    department: "Multi-Specialty Physiotherapy Care",
    experience: "Bangalore & Salem",
    bio: "Leads Runlife Physio—connecting every patient with the right specialist physiotherapist in Orthopedics, Neurology, Sports, Pediatrics, or Women's Health across Bangalore, Salem, and Online.",
    published: true,
    createdAt: "2026-11-09T08:00:00.000Z",
  },
];

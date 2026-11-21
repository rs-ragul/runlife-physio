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

  founderName: "Dr. Vishal S, PT",
  founderCredentials: "MPT (Neurology & Neurosurgery) • MIAP Reg. No. L-60915",
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
    name: "Dr. Vishal S, PT",
    credential: "MPT (Neurology & Neurosurgery)",
    registration: "MIAP Reg. No. L-60915",
    role: "Founder & Clinical Lead",
    department: "Neurology, Neurosurgery & Multi-Specialty Rehab",
    experience: "Bangalore & Salem",
    bio: "Founded Runlife Physio (REHAB · RECOVER · RUN) to connect every patient with the right specialist physiotherapist across Orthopedics, Neurology, Sports, Pediatrics and Women's Health.",
    image: "/images/dr-vishal.jpg",
    published: true,
    createdAt: "2026-11-09T08:00:00.000Z",
  },
  {
    id: "dr-gokul-m-b",
    name: "Dr. Gokul M B (PT)",
    credential: "MPT (Musculoskeletal)",
    registration: "MIAP Reg. No. 67647",
    role: "Senior Physiotherapist",
    department: "Musculoskeletal & Orthopedic Rehab",
    experience: "Bangalore & Salem",
    bio: "Senior musculoskeletal physiotherapist with advanced manual therapy and dry needling training, focused on spine, joint and post-injury rehabilitation.",
    extraCertifications:
      "CMP · CIASTM · CDNT · CMET · CAfRT · CAFPCT · CTTP",
    published: true,
    createdAt: "2026-11-09T08:10:00.000Z",
  },
  {
    id: "dr-sushma",
    name: "Dr. Sushma (PT)",
    credential: "MPT (Musculoskeletal)",
    role: "Senior Consultant — Women's Health",
    department: "Women's Health & Pelvic Floor Physiotherapy",
    experience: "Bangalore & Salem",
    bio: "Senior consultant and women's health counsellor specialising in pelvic floor physiotherapy — antenatal, postnatal, pelvic pain and incontinence care.",
    extraCertifications: "CIASTM · CDNT · CCT",
    published: true,
    createdAt: "2026-11-09T08:20:00.000Z",
  },
  {
    id: "dr-arikarasuthan",
    name: "Dr. Arikarasuthan (PT)",
    credential: "Senior Consultant Physiotherapist",
    role: "Senior Consultant & Treating Therapist",
    department: "Neuro Developmental Therapy & Myofascial Release",
    experience: "Bangalore & Salem",
    bio: "Senior consultant and treating therapist working across neurological and musculoskeletal rehabilitation.",
    extraCertifications: "CNDT · CMFRT",
    published: true,
    createdAt: "2026-11-09T08:30:00.000Z",
  },
  {
    id: "dr-p-bhuvaneshwaran",
    name: "Dr. P. Bhuvaneshwaran (PT)",
    credential: "MPT (Orthopedics)",
    role: "Senior Consultant & Senior Physiotherapist",
    department: "Orthopedic Rehab & Kinesiology Taping",
    experience: "Chennai",
    bio: "Senior orthopedic physiotherapist with a special interest in kinesiology taping and return-to-function rehabilitation for joint and soft-tissue injuries.",
    extraCertifications: "Kinesiology Taping",
    published: true,
    createdAt: "2026-11-09T08:40:00.000Z",
  },
];

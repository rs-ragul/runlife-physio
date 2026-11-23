export const SITE_CONFIG = {
  name: "Runlife Physio",
  legalName: "Runlife Physiotherapy",
  tagline: "REHAB · RECOVER · RUN",
  subtitle: "Specialized Physiotherapy Team Under One Platform",
  founder: {
    name: "Dr. Vishal S, PT",
    shortName: "Dr. Vishal",
    role: "Founder & Lead Physiotherapist — Runlife Physio",
    credentials: "MPT (Neurology & Neurosurgery) • MIAP Reg. No. L-60915",
    qualification: "MPT — Neurology & Neurosurgery",
    registration: "MIAP Reg. No. L-60915",
    photo: "/images/profiles/dr-vishal.jpg",
    bio: "Dr. Vishal S, PT — MPT (Neurology & Neurosurgery), MIAP Reg. No. L-60915 — founded Runlife Physio (REHAB · RECOVER · RUN) to bring dedicated specialist physiotherapists across Orthopedics, Neurology, Sports & Running Rehab, Pediatrics, and Women's Health together under one platform. Serving patients across Bangalore, Salem and Chennai through home visits, scheduled consultations, and online tele-rehabilitation.",
  },
  contact: {
    phoneRaw: "9187679723",
    phoneE164: "+919187679723",
    phoneDisplay: "+91 91876 79723",
    whatsappNumber: "919187679723",
    email: "runlifephysio@gmail.com",
    hours: "Mon – Sun: Appointment & Home Visit Slots Available",
    responsePromise: "Our care coordinator will call you back shortly to confirm your slot",
  },
  location: {
    primaryCity: "Bangalore, Salem & Chennai",
    cities: ["Bangalore", "Salem", "Chennai"],
    state: "Karnataka & Tamil Nadu",
    country: "India",
    countryCode: "IN",
    serviceModelLabel:
      "Home Visits in Bangalore, Salem & Chennai + Online Video Consultations & Tele-Rehab",
    coordinates: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    flagshipHubNote:
      "Serving patients at home and by appointment across Bangalore (Indiranagar, HSR Layout, Koramangala, Whitefield, JP Nagar, Jayanagar, Hebbal, Electronic City) and Salem (Fairlands, Alagapuram, Hasthampatti, Suramangalam, Five Roads, Seelanaickenpatti), plus Online Tele-Rehab across India.",
  },
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.runlifephysio.com").replace(
    /\/$/,
    ""
  ),
  careModes: [
    {
      id: "home-care",
      title: "Home Visit Physiotherapy",
      shortTitle: "Home Visit",
      badge: "Bangalore, Salem & Chennai",
      summary:
        "Our physiotherapist visits your home for 1-on-1 hands-on treatment, post-surgery rehab, and guided recovery exercises.",
      bestFor: "Post-op knee/hip/ACL rehab, Stroke & Neuro care, Seniors, Back pain, Postnatal & Pediatric care",
      duration: "45 – 60 mins 1-on-1",
    },
    {
      id: "tele-rehab",
      title: "Virtual / Tele-Rehabilitation",
      shortTitle: "Virtual Tele-Rehab",
      badge: "Live Guided Sessions",
      summary:
        "Supervised live video exercise sessions with real-time posture correction, progressive strengthening, and regular recovery tracking.",
      bestFor: "Running injuries, Spine & shoulder rehab, Busy working professionals & outstation patients",
      duration: "40 – 50 mins Live Video",
    },
    {
      id: "online-consultation",
      title: "Online Video Consultation",
      shortTitle: "Online Consultation",
      badge: "Anywhere in India",
      summary:
        "1-on-1 video consultation with the right specialist—including X-ray/MRI report review, clear explanation of your condition, and home exercise plan.",
      bestFor: "First consultation, Second opinion before surgery, Neck/back pain & outstation patients",
      duration: "30 – 45 mins Video",
    },
    {
      id: "clinic-appointment",
      title: "By-Appointment In-Person Visit",
      shortTitle: "By-Appointment Visit",
      badge: "Prior Appointment",
      summary:
        "Scheduled 1-on-1 in-person physiotherapy consultation focused on manual therapy, movement testing, and return-to-sport recovery.",
      bestFor: "Sports & running gait evaluation, Return-to-sport testing, Joint mobilization",
      duration: "45 – 60 mins Scheduled",
    },
  ],
} as const;

export type CareModeId = (typeof SITE_CONFIG.careModes)[number]["id"];

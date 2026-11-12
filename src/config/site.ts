export const SITE_CONFIG = {
  name: "Runlife Physio",
  legalName: "Runlife Specialist Physiotherapy Network",
  tagline: "REHAB · RECOVER · RUN",
  subtitle: "Specialized Physiotherapy Team Under One Platform",
  founder: {
    name: "Dr. Vishal (PT)",
    shortName: "Dr. Vishal",
    role: "Founder & Clinical Director — Runlife Specialist Physiotherapy Network",
    bio: "Runlife Physio was founded by Dr. Vishal with a clear clinical conviction: every body system deserves a Master-trained specialist, not a one-size-fits-all routine. By uniting dedicated MPT Specialists across Orthopedics, Neurology, Sports & Running Biomechanics, Pediatrics, and Women's Health under one coordinated platform in Bangalore, Runlife delivers hospital-grade specialist rehabilitation at your home, online via tele-rehab, or by scheduled clinic appointment.",
  },
  contact: {
    phoneRaw: "9187679723",
    phoneE164: "+919187679723",
    phoneDisplay: "+91 91876 79723",
    whatsappNumber: "919187679723",
    email: "runlifephysio@gmail.com",
    hours: "Mon – Sun: 7:00 AM – 9:00 PM IST (Prior Appointment & Home Visits)",
    responsePromise: "MPT Specialist callback within 15–30 minutes during care hours",
  },
  location: {
    primaryCity: "Bangalore",
    state: "Karnataka",
    country: "India",
    countryCode: "IN",
    serviceModelLabel:
      "Bangalore-Wide Home Care & Partner Clinics (By Appointment) + Pan-India Virtual Tele-Rehab",
    coordinates: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    // Easily editable when Dr. Vishal adds a flagship street clinic address
    flagshipHubNote:
      "Serving all major Bangalore residential & tech corridors (Indiranagar, HSR Layout, Koramangala, Whitefield, JP Nagar, Jayanagar, Bellandur, Sarjapur Road, Hebbal, Malleswaram, Electronic City & Yelahanka) via Specialist Home Visits & By-Appointment Partner Studios.",
  },
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://www.runlifephysio.com").replace(
    /\/$/,
    ""
  ),
  careModes: [
    {
      id: "home-care",
      title: "Home Care Physiotherapy",
      shortTitle: "Home Care (Bangalore)",
      badge: "Most Popular in Bangalore",
      summary:
        "Dedicated MPT Specialist visits your home anywhere in Bangalore with portable assessment, manual therapy & progressive loading equipment.",
      bestFor: "Post-op TKR/THR/ACL, Stroke & Neuro recovery, Seniors, Acute back pain, Postpartum & Pediatric care",
      duration: "45 – 60 mins 1-on-1",
    },
    {
      id: "tele-rehab",
      title: "Virtual / Tele-Rehabilitation",
      shortTitle: "Virtual Tele-Rehab",
      badge: "Live Guided Exercise",
      summary:
        "Supervised real-time video rehabilitation sessions with live movement correction, progressive exercise programming & milestone tracking.",
      bestFor: "Running rehab, Return-to-sport S&C, Spine & shoulder rehab, Busy Bangalore tech professionals & NRIs",
      duration: "40 – 50 mins Live HD",
    },
    {
      id: "online-consultation",
      title: "Online Specialist Consultation",
      shortTitle: "Online Consultation",
      badge: "Pan-India & Global",
      summary:
        "1-on-1 diagnostic video assessment with the right MPT Specialist—including MRI/X-ray report review, root-cause diagnosis & structured recovery plan.",
      bestFor: "First evaluation, Second opinion before surgery, Ergonomic pain, Outstation patients",
      duration: "30 – 45 mins Video",
    },
    {
      id: "clinic-appointment",
      title: "Appointment-Based In-Person Session",
      shortTitle: "By-Appointment Visit",
      badge: "Zero Waiting Room",
      summary:
        "Pre-scheduled 1-on-1 clinical & biomechanical sessions by prior appointment—focused entirely on hands-on therapy and return-to-sport testing.",
      bestFor: "Running gait & agility testing, Return-to-sport clearance, Manual orthopedic mobilization",
      duration: "45 – 60 mins Scheduled",
    },
  ],
} as const;

export type CareModeId = (typeof SITE_CONFIG.careModes)[number]["id"];

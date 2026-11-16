export interface ServiceLocationZone {
  id: string;
  city: "Bangalore" | "Salem" | "Online";
  zoneName: string;
  responseTime: string;
  description: string;
  neighborhoods: string[];
  popularServices: string[];
}

export const BANGALORE_ZONES: ServiceLocationZone[] = [
  {
    id: "salem-city",
    city: "Salem",
    zoneName: "Salem — Home Visits & Consultations",
    responseTime: "Home Visits & Scheduled Slots",
    description:
      "Dedicated home physiotherapy visits and scheduled 1-on-1 consultations across major residential areas in Salem.",
    neighborhoods: [
      "Fairlands",
      "Alagapuram",
      "Hasthampatti",
      "Suramangalam",
      "Five Roads",
      "Meyyanur",
      "Seelanaickenpatti",
      "Ammapet",
      "Shevapet / Gugai",
    ],
    popularServices: [
      "Post-Surgery Knee, Hip & Fracture Rehab",
      "Stroke, Paralysis & Senior Mobility Care",
      "Back Pain, Neck Pain & Sports Injuries",
    ],
  },
  {
    id: "bangalore-south",
    city: "Bangalore",
    zoneName: "South & Central Bangalore",
    responseTime: "Morning & Evening Home Visits",
    description:
      "Doorstep physiotherapy and rehabilitation across residential neighborhoods in South and Central Bengaluru.",
    neighborhoods: [
      "HSR Layout",
      "Koramangala",
      "JP Nagar",
      "Jayanagar",
      "BTM Layout",
      "Bannerghatta Road",
      "Banashankari",
      "MG Road / Malleswaram",
    ],
    popularServices: [
      "Post-Op Knee Replacement & ACL Rehab",
      "Running & Sports Injury Recovery",
      "Stroke & Senior Home Physiotherapy",
    ],
  },
  {
    id: "bangalore-east-north",
    city: "Bangalore",
    zoneName: "East & North Bangalore",
    responseTime: "Flexible Daily Appointments",
    description:
      "Home visits and consultations for families, athletes, and working professionals across East & North Bengaluru.",
    neighborhoods: [
      "Indiranagar",
      "Whitefield",
      "Bellandur",
      "Sarjapur Road",
      "Marathahalli",
      "Hebbal",
      "Yelahanka",
      "Kalyan Nagar",
    ],
    popularServices: [
      "Neck, Back & Shoulder Pain Relief",
      "Pregnancy & Postnatal Physiotherapy",
      "Pediatric Milestone Therapy",
    ],
  },
  {
    id: "electronic-online",
    city: "Online",
    zoneName: "Electronic City & Online Video Consultations",
    responseTime: "Home Visits + Live Video Care",
    description:
      "Home visits across Electronic City corridors plus live 1-on-1 video consultations and guided tele-rehabilitation anywhere in India.",
    neighborhoods: [
      "Electronic City Phase 1 & 2",
      "Haralur / Kudlu Gate",
      "Chennai, Coimbatore & Rest of Tamil Nadu (Online)",
      "Across Karnataka & Pan-India (Online Video)",
    ],
    popularServices: [
      "Online Video Physiotherapy Consultation",
      "Guided Live Tele-Rehabilitation",
      "X-Ray / MRI Report Review & Recovery Plan",
    ],
  },
];

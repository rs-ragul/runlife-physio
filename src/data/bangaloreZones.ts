export interface BangaloreZoneGroup {
  id: string;
  zoneName: string;
  responseTime: string;
  description: string;
  neighborhoods: string[];
  popularServices: string[];
}

export const BANGALORE_ZONES: BangaloreZoneGroup[] = [
  {
    id: "south-central",
    zoneName: "South & South-East Bangalore",
    responseTime: "Same-Day / Next-Morning Home Visits",
    description:
      "Full doorstep MPT coverage across residential communities and running hubs around Agara Lake, Lalbagh & Bannerghatta.",
    neighborhoods: [
      "HSR Layout",
      "Koramangala",
      "JP Nagar",
      "Jayanagar",
      "BTM Layout",
      "Bannerghatta Road",
      "Banashankari",
      "Kanakapura Road",
    ],
    popularServices: ["Post-Op TKR/ACL Home Rehab", "Running & Marathon Injury Rehab", "Stroke & Senior Neuro Care"],
  },
  {
    id: "east-tech",
    zoneName: "East Bangalore & IT Corridors",
    responseTime: "Flexible Morning & Evening Slots (7 AM – 9 PM)",
    description:
      "Designed for active tech professionals, athletes, and young families across ORR, Whitefield & Sarjapur gated communities.",
    neighborhoods: [
      "Indiranagar",
      "Whitefield",
      "Bellandur",
      "Sarjapur Road",
      "Marathahalli",
      "Domlur",
      "CV Raman Nagar",
      "KR Puram / Hoodi",
    ],
    popularServices: ["Spine, Ergonomic & Shoulder Rehab", "Antenatal & Postnatal Home Care", "Pediatric Milestone Therapy"],
  },
  {
    id: "north-west",
    zoneName: "North, Central & West Bangalore",
    responseTime: "Scheduled Specialist Dispatch",
    description:
      "Coordinated MPT Specialist network visits across heritage neighborhoods, Cubbon Park runners' corridor & North Bangalore townships.",
    neighborhoods: [
      "Malleswaram",
      "Hebbal",
      "Yelahanka",
      "Kalyan Nagar",
      "Sadashivanagar",
      "Rajajinagar",
      "Nagarbhavi",
      "MG Road / Central",
    ],
    popularServices: ["Geriatric & Parkinson's Home Rehab", "Total Joint Replacement Recovery", "Sports & S&C Coaching"],
  },
  {
    id: "electronic-south-corridor",
    zoneName: "Electronic City & Pan-India Tele-Rehab",
    responseTime: "Home Visits + Instant HD Video Sessions",
    description:
      "Hybrid care combining scheduled home visits in South corridors with live HD Virtual Tele-Rehabilitation across India & NRI timezones.",
    neighborhoods: [
      "Electronic City Phase 1 & 2",
      "Haralur / Kudlu Gate",
      "Begur",
      "Mysore Road",
      "Pan-India Online (Chennai, Mumbai, Delhi, Hyderabad)",
      "Global NRI Tele-Rehab (UAE, UK, USA, Singapore)",
    ],
    popularServices: ["Live Virtual Tele-Rehabilitation", "Online MRI/Report Second Opinion", "Return-to-Run Remote Programming"],
  },
];

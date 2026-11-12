export interface BodyRegionItem {
  id: string;
  label: string;
  category: "anatomical" | "specialist-track";
  specialistBadge: string;
  specialtySlug: string;
  headline: string;
  description: string;
  commonConditions: {
    name: string;
    slug: string;
  }[];
  watchSigns: string[];
  recommendedMode: string;
  hotspot?: { cx: number; cy: number };
}

export const BODY_REGIONS: BodyRegionItem[] = [
  {
    id: "neck-cervical",
    label: "Neck & Cervical",
    category: "anatomical",
    specialistBadge: "MPT (Ortho & Neuro Specialist)",
    specialtySlug: "orthopedic-msk-rehabilitation",
    headline: "Neck Stiffness, Tech-Neck & Radiating Arm Tingling",
    description:
      "Prolonged laptop posture and cervical disc/facet irritation cause neck pain, cervicogenic headaches, and nerve tingling down the arm.",
    commonConditions: [
      { name: "Cervical Spondylosis & Radiculopathy", slug: "spine-neck-joint-pain" },
      { name: "Nerve Tingling & Numbness", slug: "multiple-sclerosis-neuro-pain" },
      { name: "Upper Trapezius & Scapular Strain", slug: "shoulder-rehab-rotator-cuff-frozen-shoulder" },
    ],
    watchSigns: ["Pins & needles in fingers", "Morning neck lock", "Headaches behind one eye/occiput"],
    recommendedMode: "Online Consultation / Home Care",
    hotspot: { cx: 140, cy: 76 },
  },
  {
    id: "shoulder",
    label: "Shoulder & Arm",
    category: "anatomical",
    specialistBadge: "MPT (Ortho & Sports Specialist)",
    specialtySlug: "orthopedic-msk-rehabilitation",
    headline: "Frozen Shoulder, Rotator Cuff & Overhead Pain",
    description:
      "Night pain lying on your side, difficulty reaching overhead or behind your back, or overhead racket/gym impingement.",
    commonConditions: [
      { name: "Frozen Shoulder & Rotator Cuff Rehab", slug: "shoulder-rehab-rotator-cuff-frozen-shoulder" },
      { name: "Post-Op Shoulder Arthroscopy Rehab", slug: "post-operative-rehabilitation" },
      { name: "Overhead Sports Strain & S&C", slug: "strength-and-conditioning-sports-injury" },
    ],
    watchSigns: ["Painful arc between 70°–120°", "Night ache disturbing sleep", "Loss of behind-back reach"],
    recommendedMode: "Home Care / By-Appointment Visit",
    hotspot: { cx: 96, cy: 108 },
  },
  {
    id: "spine-back",
    label: "Lower Back & Spine",
    category: "anatomical",
    specialistBadge: "MPT (Ortho Specialist)",
    specialtySlug: "orthopedic-msk-rehabilitation",
    headline: "Lower Back Pain, Disc Bulge & Sciatica",
    description:
      "Mechanical lumbar pain during sitting, bending, lifting, or driving—with or without sciatic nerve pain into the glute and leg.",
    commonConditions: [
      { name: "Sciatica, Disc Bulge & Lumbar Pain", slug: "spine-neck-joint-pain" },
      { name: "Post-Spine Surgery Rehabilitation", slug: "post-operative-rehabilitation" },
      { name: "Pregnancy / Postnatal Back Pain", slug: "antenatal-postnatal-pregnancy-rehab" },
    ],
    watchSigns: ["Shooting leg pain on sitting/coughing", "Stiffness standing up after desk work", "Recurring back spasms"],
    recommendedMode: "Home Care (Bangalore) / Tele-Rehab",
    hotspot: { cx: 140, cy: 175 },
  },
  {
    id: "hip-pelvis",
    label: "Hip & Pelvic Floor",
    category: "anatomical",
    specialistBadge: "MPT (Ortho & Women's Health)",
    specialtySlug: "womens-health-pelvic-rehabilitation",
    headline: "Hip Joint Pain, THR Recovery & Pelvic Floor Health",
    description:
      "Covers orthopedic hip impingement, piriformis pain, and Total Hip Replacement—plus confidential prenatal, postpartum & pelvic floor rehab.",
    commonConditions: [
      { name: "Pelvic Floor & Core Rehabilitation", slug: "pelvic-floor-rehabilitation" },
      { name: "Antenatal & Postnatal Recovery", slug: "antenatal-postnatal-pregnancy-rehab" },
      { name: "Total Hip Replacement (THR) Rehab", slug: "tkr-thr-joint-replacement-rehab" },
    ],
    watchSigns: ["Groin/lateral hip ache on stairs", "Postpartum core gap or sneeze leakage", "Post-THR gait limp"],
    recommendedMode: "Private Home Care / Confidential Online",
    hotspot: { cx: 140, cy: 222 },
  },
  {
    id: "knee-acl",
    label: "Knee & ACL / PCL",
    category: "anatomical",
    specialistBadge: "MPT (Ortho & Sports Specialist)",
    specialtySlug: "orthopedic-msk-rehabilitation",
    headline: "ACL / PCL Tears, Runner's Knee, Osteoarthritis & TKR",
    description:
      "Our highest-volume musculoskeletal specialty—from marathoner Runner's Knee and ACL sports rehab to senior Total Knee Replacement recovery.",
    commonConditions: [
      { name: "ACL / PCL Ligament Rehab", slug: "acl-pcl-ligament-injury" },
      { name: "Knee Pain & Osteoarthritis", slug: "knee-pain-osteoarthritis" },
      { name: "TKR (Total Knee Replacement) Rehab", slug: "tkr-thr-joint-replacement-rehab" },
      { name: "Runner's Knee & ITB Syndrome", slug: "return-to-sport-running-rehab" },
    ],
    watchSigns: ["Knee giving way or locking", "Stair descent pain", "Post-op swelling or loss of straightening"],
    recommendedMode: "Home Care / Sports RTS Session",
    hotspot: { cx: 118, cy: 305 },
  },
  {
    id: "ankle-running",
    label: "Ankle, Foot & Running",
    category: "anatomical",
    specialistBadge: "MPT (Sports Specialist)",
    specialtySlug: "sports-running-rehabilitation",
    headline: "Achilles, Plantar Fasciitis, Shin Splints & Ankle Sprains",
    description:
      "Biomechanical load & gait management for runners and field athletes dealing with heel pain, calf pulls, shin splints, or rolled ankles.",
    commonConditions: [
      { name: "Running Rehab & Gait Biomechanics", slug: "return-to-sport-running-rehab" },
      { name: "Calf Strains, Cramps & Ankle Sprains", slug: "strength-and-conditioning-sports-injury" },
      { name: "Post-Fracture Ankle Mobilization", slug: "tkr-thr-joint-replacement-rehab" },
    ],
    watchSigns: ["First-step morning heel stab", "Achilles stiffness starting a run", "Repeated ankle rolling"],
    recommendedMode: "By-Appointment / Virtual Tele-Rehab",
    hotspot: { cx: 118, cy: 388 },
  },
  {
    id: "neuro-system",
    label: "Brain, Nerve & Balance",
    category: "specialist-track",
    specialistBadge: "MPT (Neuro Specialist)",
    specialtySlug: "neurological-rehabilitation",
    headline: "Stroke, Parkinson's, SCI, GBS, MS & Neuropathy",
    description:
      "Dedicated neurological motor relearning at home in Bangalore to restore walking, hand function, balance confidence, and nerve comfort.",
    commonConditions: [
      { name: "Stroke (CVA) Home Rehabilitation", slug: "stroke-cva-rehabilitation" },
      { name: "Parkinson's Gait & Balance Rehab", slug: "parkinsons-disease-rehab" },
      { name: "Guillain-Barré Syndrome (GBS)", slug: "guillain-barre-syndrome-gbs" },
      { name: "Spinal Cord Injury & MS / Neuropathy", slug: "spinal-cord-injury-rehab" },
    ],
    watchSigns: ["One-sided weakness or foot drop", "Freezing steps or balance falls", "Persistent limb numbness/tingling"],
    recommendedMode: "Home Care (Bangalore) — Specialist Neuro Visit",
  },
  {
    id: "pediatric-care",
    label: "Child & Milestones",
    category: "specialist-track",
    specialistBadge: "MPT (Pediatric Specialist)",
    specialtySlug: "pediatric-rehabilitation",
    headline: "Pediatric Milestones, CP, Autism Motor & GDD",
    description:
      "Joyful, play-based pediatric physiotherapy in your child's familiar home setting to build sitting, standing, walking, and coordination.",
    commonConditions: [
      { name: "Cerebral Palsy (CP) Rehabilitation", slug: "cerebral-palsy-pediatric-rehab" },
      { name: "Autism (ASD) & GDD Milestone Therapy", slug: "autism-gdd-developmental-therapy" },
      { name: "Spina Bifida, Hydrocephalus & MD", slug: "spina-bifida-hydrocephalus-muscular-dystrophy" },
    ],
    watchSigns: ["Delayed sitting, crawling or walking", "Persistent toe-walking or low muscle tone", "Balance & playground clumsiness"],
    recommendedMode: "Home Care (Bangalore) — Child Comfort Visit",
  },
];

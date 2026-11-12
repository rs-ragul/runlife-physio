export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  specialistTag: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image: string;
  relatedSpecialtySlug: string;
  sections: {
    heading: string;
    paragraphs: string[];
    bullets?: string[];
  }[];
  keyTakeaway: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "acl-surgery-first-12-weeks-return-to-running-guide",
    title: "The First 12 Weeks After ACL Surgery: Why Criteria Beat the Calendar",
    excerpt:
      "Counting weeks after ACL reconstruction isn't enough. Learn the exact extension, swelling, and single-leg strength benchmarks our MPT Ortho & Sports specialists require before your first running stride.",
    category: "Ortho & Sports Rehab",
    specialistTag: "MPT (Ortho & Sports)",
    author: "Dr. Vishal (PT) & Runlife Sports Rehab Team",
    publishedAt: "2026-10-28",
    readTime: "6 min read",
    image: "/images/ortho-acl-postop-rehab.jpg",
    relatedSpecialtySlug: "sports-running-rehabilitation",
    sections: [
      {
        heading: "Why 'Wait 3 Months and Jog' Fails So Many Athletes",
        paragraphs: [
          "Every week in Bangalore, we meet recreational footballers, badminton players, and marathoners who started jogging at week 12 after ACL surgery purely because the calendar turned—only to develop stubborn anterior knee pain or persistent swelling.",
          "Modern sports physiotherapy replaces arbitrary calendar dates with objective functional gates. Your reconstructed ligament is still undergoing biological ligamentization while your quadriceps muscle recovers from arthrogenic muscle inhibition (AMI)—a protective neural shutdown triggered by joint swelling.",
        ],
      },
      {
        heading: "4 Non-Negotiable Milestones in Weeks 1 to 6",
        paragraphs: [
          "The foundation of a clean Return-to-Run starts in the very first fortnight at home:",
        ],
        bullets: [
          "Full 0° passive and active knee extension (even a 3°–5° extension lag overloads the kneecap on every step).",
          "Quiet, cool knee joint with minimal effusion (measured via the sweep test—swelling shuts down your VMO quad).",
          "Crisp, independent straight-leg raise without quad lag and normalized heel-to-toe walking without a limp.",
          "Progressive flexion tracking smoothly from 90° by week 2–3 toward 125°+ per meniscus/graft protocol.",
        ],
      },
      {
        heading: "Passing the Week 12+ Return-to-Run Readiness Gate",
        paragraphs: [
          "Before transitioning onto the treadmill or track in our RUN phase, Runlife MPT Sports specialists verify pain-free knee motion, zero trace swelling, >80% quadriceps & calf strength symmetry, and controlled single-leg squat & pogo mechanics. When you earn the right to run, every subsequent phase feels confident and pain-free.",
        ],
      },
    ],
    keyTakeaway:
      "Early home physiotherapy in weeks 1–4 plus objective strength testing at week 12 cuts secondary knee pain and re-injury risk dramatically.",
  },
  {
    slug: "first-90-days-after-stroke-home-neuro-rehabilitation",
    title: "The Golden 90 Days After Stroke: Why Home Neuro Rehab Multiplies Recovery",
    excerpt:
      "After a Stroke (CVA), the brain's capacity for rewiring peaks in the first three months. Discover how task-specific MPT Neuro rehabilitation inside your own home accelerates walking and arm recovery.",
    category: "Neuro Rehabilitation",
    specialistTag: "MPT (Neurology)",
    author: "Runlife Neuro Rehabilitation Team",
    publishedAt: "2026-10-19",
    readTime: "5 min read",
    image: "/images/neuro-gait-balance-rehab.jpg",
    relatedSpecialtySlug: "neurological-rehabilitation",
    sections: [
      {
        heading: "Understanding Activity-Dependent Neuroplasticity",
        paragraphs: [
          "When a stroke interrupts blood flow to motor areas of the brain, neighboring healthy neural networks have an extraordinary ability to take over lost functions—provided they receive structured, meaningful, high-repetition movement signals.",
          "Passive bed exercises alone (" +
            "'bending the leg 10 times'" +
            ") prevent joint stiffness, but true cortical rewiring requires active, task-oriented challenges: weight-shifting while sitting, reaching for a cup, rising from your own dining chair, and stepping cleanly across your living room floor.",
        ],
      },
      {
        heading: "Why Practicing Inside Your Bangalore Home Works Faster",
        paragraphs: [
          "For stroke survivors, spending 90 minutes in city traffic drains precious neurological energy before the session even starts. Home-based MPT Neuro therapy invests 100% of your energy into recovery:",
        ],
        bullets: [
          "Real-context learning: bed height, bathroom thresholds, and hallway widths match daily life.",
          "Protective care for the hemiplegic shoulder—preventing painful subluxation during family transfers.",
          "Hands-on caregiver coaching so family members reinforce safe movement 24/7 instead of compensating.",
        ],
      },
    ],
    keyTakeaway:
      "Consistent, specialist-guided neuroplastic repetition at home transforms hospital discharge into real-world walking and daily dignity.",
  },
  {
    slug: "runners-knee-shin-splints-bangalore-runners-guide",
    title: "Runner's Knee & Shin Splints: Why Complete Rest Rarely Fixes Running Pain",
    excerpt:
      "Taking 3 weeks off running makes pain vanish—until kilometer 3 of your comeback run. Here is how MPT Sports biomechanics and Heavy Slow Resistance solve tendon & joint overload.",
    category: "Sports & Running",
    specialistTag: "MPT (Sports)",
    author: "Dr. Vishal (PT)",
    publishedAt: "2026-10-08",
    readTime: "5 min read",
    image: "/images/sports-agility-return-to-run.jpg",
    relatedSpecialtySlug: "sports-running-rehabilitation",
    sections: [
      {
        heading: "The Rest-and-Relapse Trap",
        paragraphs: [
          "Whether you train around Cubbon Park, Agara Lake, or Sankey Tank, the story sounds familiar: knee or shin pain flares up during marathon prep, you rest for two weeks, feel 100% pain-free walking around the house, lace up again—and the exact same pain returns within 20 minutes.",
          "Why? Because rest lowers tissue irritation, but it ALSO lowers tendon stiffness and muscle load capacity. Without rebuilding capacity, running forces quickly exceed tolerance again.",
        ],
      },
      {
        heading: "3 Levers Our MPT Sports Specialists Pull Immediately",
        paragraphs: [
          "Instead of blanket rest, we adjust load and mechanics simultaneously:",
        ],
        bullets: [
          "Soleus & Glute Medius Capacity: The bent-knee soleus muscle absorbs up to 6x–8x bodyweight during mid-stance!",
          "Cadence Optimization: A subtle 5%–7% increase in step rate reduces braking over-stride and patellofemoral stress by up to 20%.",
          "Smart Volume Modulation: Keeping you safely active below the 24-hour symptom flare threshold while strength builds.",
        ],
      },
    ],
    keyTakeaway:
      "You don't stop running because of age—you upgrade your kinetic chain capacity to match the miles you love.",
  },
  {
    slug: "postpartum-pelvic-floor-diastasis-recti-recovery",
    title: "Beyond Kegels: A Mother's Clinical Guide to Postpartum Core & Pelvic Recovery",
    excerpt:
      "C-section tightness, abdominal doming (diastasis recti), or leakage when sneezing is common—never 'just something to live with.' Learn how MPT Women's Health rehab restores deep core synergy.",
    category: "Women's Health",
    specialistTag: "MPT (OBG / Women's Health)",
    author: "Runlife Women's Health Specialist Team",
    publishedAt: "2026-09-25",
    readTime: "6 min read",
    image: "/images/womens-health-antenatal-rehab.jpg",
    relatedSpecialtySlug: "womens-health-pelvic-rehabilitation",
    sections: [
      {
        heading: "Why Random Ab Workouts & Generic Kegels Can Backfire",
        paragraphs: [
          "After nine months of abdominal stretching and delivery (vaginal or Cesarean), jumping straight into planks, crunches, or breath-holding exercises pushes downward intra-abdominal pressure onto a healing pelvic floor and linea alba.",
          "Equally important: nearly 30% of women with pelvic symptoms actually have a tight, over-recruited pelvic floor that needs lengthening and 360° ribcage breath coordination BEFORE strengthening!",
        ],
      },
      {
        heading: "What Private Postnatal Physiotherapy Covers",
        paragraphs: [
          "Our female MPT Women's Health specialist assesses your posture, breathing mechanics, abdominal tension, and C-section scar mobility privately at home or online:",
        ],
        bullets: [
          "Exhale-on-exertion pressure management while lifting your baby, stroller, or weights.",
          "Gentle C-section scar desensitization and fascial gliding (once fully healed externally) to ease lower-belly pulling.",
          "Step-by-step postpartum Return-to-Exercise & Return-to-Running impact readiness screening.",
        ],
      },
    ],
    keyTakeaway:
      "Postpartum rehab is timeless—whether you delivered 6 weeks ago or 6 years ago, targeted pelvic & core therapy transforms daily comfort.",
  },
  {
    slug: "early-pediatric-physiotherapy-motor-milestones-guide",
    title: "Understanding Pediatric Motor Milestones: When Play-Based Physio Helps Most",
    excerpt:
      "Every child develops at their own rhythm—yet certain motor signs benefit immensely from early, joyful pediatric physiotherapy. Here is a calm, reassuring guide for parents.",
    category: "Pediatric Rehab",
    specialistTag: "MPT (Pediatrics)",
    author: "Runlife Pediatric Rehab Team",
    publishedAt: "2026-09-14",
    readTime: "5 min read",
    image: "/images/pediatric-balance-milestone-rehab.jpg",
    relatedSpecialtySlug: "pediatric-rehabilitation",
    sections: [
      {
        heading: "Turning Clinical Neuro-Development Into Joyful Play",
        paragraphs: [
          "Parents often worry that physiotherapy for an infant or toddler will involve crying or rigid exercises. Modern MPT Pediatric Rehabilitation looks completely different: through colorful balance domes, reaching games, sensory mats, and parent-held positions, children build trunk stability, weight-shifting, and motor planning while smiling and playing.",
        ],
      },
      {
        heading: "Signs Worth Checking Early With an MPT Pediatric Specialist",
        paragraphs: [
          "An early checkup provides peace of mind and practical home play ideas if you notice:",
        ],
        bullets: [
          "Difficulty holding head steady by 4 months or strong preference for looking only to one side (torticollis).",
          "Not sitting independently by 9 months, skipping symmetrical movement, or not walking by 16–18 months.",
          "Persistent tiptoe walking, unusually stiff or floppy limb tone, or frequent playground falls in toddlers.",
        ],
      },
    ],
    keyTakeaway:
      "Early play-based guidance harnesses peak childhood brain adaptability while empowering parents with confidence every single day.",
  },
  {
    slug: "home-physiotherapy-vs-tele-rehab-vs-clinic-bangalore",
    title: "Home Physiotherapy vs. Tele-Rehab vs. Clinic Visits in Bangalore: How to Choose",
    excerpt:
      "Not every recovery stage needs a commute across Silk Board or ORR! Compare when hands-on Home Care beats travel—and when live Virtual Tele-Rehab delivers identical clinical results.",
    category: "Patient Guide",
    specialistTag: "Runlife Care Network",
    author: "Dr. Vishal (PT)",
    publishedAt: "2026-09-02",
    readTime: "4 min read",
    image: "/images/tele-rehab-online-consultation.jpg",
    relatedSpecialtySlug: "orthopedic-msk-rehabilitation",
    sections: [
      {
        heading: "Matching the Care Format to Your Biological Stage",
        paragraphs: [
          "At Runlife Physio, many of our fastest-recovering patients in Bangalore actually blend two care modes across their REHAB → RECOVER → RUN journey! For example, starting with 2–3 weeks of Home Care right after knee surgery or acute back spasm, then transitioning seamlessly to Virtual Tele-Rehab or periodic Return-to-Sport sessions.",
        ],
        bullets: [
          "Choose Home Care (Bangalore) for post-op TKR/THR/ACL, Stroke, Parkinson's, Pediatric play therapy, Postpartum care, or severe acute pain.",
          "Choose Virtual Tele-Rehab & Online Consultation for MRI/X-ray reviews, ergonomic spine/shoulder rehab, progressive running S&C, and outstation/NRI care.",
          "Choose By-Appointment Sessions for hands-on sports manual therapy, agility ladder drills, and Return-to-Sport clearance batteries.",
        ],
      },
    ],
    keyTakeaway:
      "Consistency beats commute stress—having all 4 care modes under one MPT Specialist platform ensures zero missed rehab sessions.",
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

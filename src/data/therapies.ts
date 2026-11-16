export interface TherapyItem {
  slug: string;
  title: string;
  shortTitle: string;
  categoryBadge: string;
  image: string;
  shortSummary: string;
  overview: string;
  bestFor: string[];
  sessionSteps: {
    title: string;
    detail: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const THERAPIES: TherapyItem[] = [
  {
    slug: "dry-needling",
    title: "Dry Needling Therapy",
    shortTitle: "Dry Needling",
    categoryBadge: "Trigger Point & Pain Relief",
    image: "/images/therapy-dry-needling.jpg",
    shortSummary:
      "Targeted release of deep muscle knots and myofascial trigger points using sterile, ultra-thin filaments to relieve stubborn pain and stiffness.",
    overview:
      "Dry Needling is a precise physiotherapy technique used to release tight muscle bands (myofascial trigger points) that cause persistent neck, shoulder, back, hip, or calf pain. Using sterile, single-use hair-thin filaments without any medication, our certified physiotherapists calm overactive muscle spasms, improve local blood flow, and restore pain-free joint movement—followed by gentle stretching and active strengthening.",
    bestFor: [
      "Chronic neck, upper back & trapezius tightness",
      "Lower back spasm, glute pain & sciatica-like tension",
      "Tennis elbow, golfer's elbow & forearm strain",
      "Runner's calf cramps, IT band tightness & plantar heel pain",
      "Shoulder impingement & restricted overhead reach",
    ],
    sessionSteps: [
      {
        title: "1. Muscle & Trigger Point Check",
        detail:
          "Your physiotherapist examines posture, movement restrictions, and locates the exact tight muscle bands causing your pain.",
      },
      {
        title: "2. Sterile Single-Use Dry Needling",
        detail:
          "Ultra-fine sterile filaments gently release deep trigger points, easing muscle guarding within minutes.",
      },
      {
        title: "3. Mobility & Strengthening Follow-Up",
        detail:
          "Guided stretching and simple corrective exercises lock in your new range of motion so tightness doesn't return.",
      },
    ],
    faqs: [
      {
        question: "Does Dry Needling hurt?",
        answer:
          "The filaments are ultra-thin—much finer than a normal injection needle. You may feel a brief twitch or mild dull ache for a few seconds as the tight muscle knot releases, followed by noticeable lightness and relief.",
      },
      {
        question: "Is Dry Needling safe?",
        answer:
          "Yes. We use 100% sterile, single-use disposable filaments with strict hygiene standards, after screening your medical history.",
      },
    ],
  },
  {
    slug: "chiropractic-care",
    title: "Chiropractic Care & Spinal Alignment",
    shortTitle: "Chiropractic Care",
    categoryBadge: "Spine, Posture & Joint Mobility",
    image: "/images/therapy-chiropractic.jpg",
    shortSummary:
      "Gentle hands-on spinal and joint mobilization to relieve back and neck stiffness, improve posture, and restore smooth movement.",
    overview:
      "Our Chiropractic Care & Spinal Mobilization sessions focus on relieving mechanical joint restrictions across the neck, mid-back, lower back, and pelvis. Before any hands-on adjustment or mobilization, our clinician evaluates your spine movement, muscle balance, and nerve symptoms—combining safe manual joint techniques with posture correction and core stabilization so relief lasts.",
    bestFor: [
      "Neck stiffness, desk posture strain & tension headaches",
      "Mechanical lower back stiffness & facet joint locking",
      "Mid-back (thoracic) tightness from long laptop/driving hours",
      "Pelvic & sacroiliac (SI) joint imbalance",
      "Postural alignment & everyday spinal mobility",
    ],
    sessionSteps: [
      {
        title: "1. Spine & Posture Evaluation",
        detail:
          "Careful screening of spinal mobility, nerve signs, and posture to ensure hands-on care is completely safe and appropriate for you.",
      },
      {
        title: "2. Controlled Joint Mobilization & Alignment",
        detail:
          "Targeted, comfortable manual techniques to unlock restricted spinal and extremity joints and ease muscle tension.",
      },
      {
        title: "3. Posture & Core Support Plan",
        detail:
          "Simple ergonomic habits and strengthening drills to keep your spine supported during work, travel, and workouts.",
      },
    ],
    faqs: [
      {
        question: "Is Chiropractic Care safe for everyone?",
        answer:
          "Every session begins with a thorough clinical check. If you have acute disc herniation, osteoporosis, or nerve compression where high-velocity manipulation isn't advised, we use gentle, low-force mobilization techniques tailored to your body.",
      },
      {
        question: "How many sessions will I need?",
        answer:
          "Many patients feel lighter movement in 1–3 sessions, while long-standing posture or back issues benefit from a short structured plan combined with strengthening.",
      },
    ],
  },
  {
    slug: "kinesiology-taping",
    title: "Kinesiology & Athletic Taping",
    shortTitle: "Kinesiology Taping",
    categoryBadge: "Joint Support & Injury Recovery",
    image: "/images/therapy-taping.jpg",
    shortSummary:
      " Breathable elastic therapeutic taping to support sore joints, reduce swelling, offload strained tendons, and keep you moving confidently.",
    overview:
      "Kinesiology & Athletic Taping provides lightweight, skin-friendly support to muscles, ligaments, and tendons without restricting natural movement. Applied using biomechanical tension patterns, taping gently lifts skin tissue to assist lymphatic drainage, eases pressure on irritated pain receptors, and gives joints extra proprioceptive stability during daily movement, running, or sport.",
    bestFor: [
      "Runner's knee, patellar tracking pain & ligament support",
      "Shoulder rotator cuff strain & scapular posture support",
      "Ankle sprains, Achilles tendonitis & shin splints",
      "Neck, upper back & lumbar muscle fatigue",
      "Post-injury swelling reduction & match-day athletic support",
    ],
    sessionSteps: [
      {
        title: "1. Movement & Joint Stability Check",
        detail:
          "We identify which muscle, tendon, or ligament needs offloading or directional support.",
      },
      {
        title: "2. Precision Biomechanical Tape Application",
        detail:
          "Hypoallergenic, sweat-resistant kinesiology or rigid sports tape applied at the exact tension required.",
      },
      {
        title: "3. Multi-Day Active Support",
        detail:
          "Stays comfortably in place for 3–5 days (even through showers and workouts) while you continue your rehab exercises.",
      },
    ],
    faqs: [
      {
        question: "Can I shower or exercise with Kinesiology Tape on?",
        answer:
          "Yes! Quality kinesiology tape is water-resistant and breathable. Simply pat it dry with a towel after showering and it typically lasts 3 to 5 days.",
      },
      {
        question: "Is taping a standalone cure?",
        answer:
          "Taping works best alongside targeted physiotherapy exercises and manual therapy—helping you move with less pain while your tissues strengthen.",
      },
    ],
  },
  {
    slug: "cupping-therapy",
    title: "Cupping Therapy (Myofascial Decompression)",
    shortTitle: "Cupping Therapy",
    categoryBadge: "Circulation & Deep Tissue Release",
    image: "/images/therapy-cupping.jpg",
    shortSummary:
      "Controlled suction decompression to lift tight fascia, boost local blood flow, ease sore muscles, and speed up post-workout recovery.",
    overview:
      "Modern clinical Cupping Therapy (myofascial decompression) uses controlled vacuum cups—instead of downward pressure—to gently lift restricted skin and fascia layers. This decompression increases fresh blood circulation, eases deep muscular tightness across the back, shoulders, hamstrings, or calves, and helps athletes and desk workers recover faster from stiffness and soreness.",
    bestFor: [
      "Upper back, shoulder & neck stiffness from desk work",
      "Tight lower back, glutes, hamstrings & calves",
      "Post-marathon, gym & sports muscle soreness (DOMS)",
      "Myofascial restrictions & restricted shoulder/hip mobility",
      "General muscular recovery & tension relief",
    ],
    sessionSteps: [
      {
        title: "1. Soft-Tissue Assessment",
        detail:
          "Your therapist locates areas of fascial tightness and selects gentle static or gliding cupping based on your comfort.",
      },
      {
        title: "2. Controlled Vacuum Decompression",
        detail:
          "Clean clinical suction cups are applied for 5–12 minutes (often combined with gentle active movements) to release restricted tissue.",
      },
      {
        title: "3. Gentle Mobility & Hydration Advice",
        detail:
          "Followed by light stretching so your loosened muscles move smoothly and comfortably.",
      },
    ],
    faqs: [
      {
        question: "Are the circular marks after cupping bruises?",
        answer:
          "No—they are temporary circulation marks from increased local blood flow, usually painless, and fade naturally within 4 to 7 days.",
      },
      {
        question: "Is Cupping Therapy painful?",
        answer:
          "Not at all. Suction intensity is adjusted to your comfort level so it feels like a deep, relieving stretch.",
      },
    ],
  },
  {
    slug: "sports-massage",
    title: "Clinical Sports Massage & Recovery",
    shortTitle: "Sports Massage",
    categoryBadge: "Muscle Recovery & Performance",
    image: "/images/therapy-sports-massage.jpg",
    shortSummary:
      "Deep-tissue and sports-specific manual therapy to flush muscle fatigue, prevent overuse injuries, and keep runners and athletes performing at their best.",
    overview:
      "Clinical Sports Massage goes far beyond a spa massage—it is performed by trained sports physiotherapists who understand muscle anatomy, training load, and biomechanics. Using targeted deep-tissue release, myofascial techniques, and assisted stretching, Sports Massage relieves heavy legs, clears training stiffness, and prepares your body for upcoming races, matches, or intense gym blocks.",
    bestFor: [
      "Runners preparing for or recovering from 10K, Half & Full Marathons",
      "HYROX, CrossFit, football, badminton, cricket & gym athletes",
      "Heavy legs, tight quads, hamstrings, calves & hip flexors",
      "Pre-event muscle activation & post-event recovery flush",
      "Active individuals dealing with recurring workout tightness",
    ],
    sessionSteps: [
      {
        title: "1. Training Load & Muscle Check",
        detail:
          "We check your recent training volume, upcoming events, and specific areas of muscular tightness or asymmetry.",
      },
      {
        title: "2. Targeted Deep-Tissue & Myofascial Release",
        detail:
          "Hands-on sports massage focused on overworked muscle groups—adjusted to the right depth for pre-event or post-event recovery.",
      },
      {
        title: "3. Assisted Stretching & Mobility",
        detail:
          "PNF and dynamic mobility stretches so you leave feeling loose, light, and ready for your next session.",
      },
    ],
    faqs: [
      {
        question: "When should I book Sports Massage before a race or event?",
        answer:
          "For deep-tissue sports massage, 3 to 5 days before race day is ideal. For post-race recovery flush, 24 to 72 hours after your event works best.",
      },
      {
        question: "Do I need to be a competitive athlete to book Sports Massage?",
        answer:
          "Not at all! Anyone who runs, goes to the gym, plays weekend sports, or carries heavy muscle tension benefits from clinical sports massage.",
      },
    ],
  },
  {
    slug: "hyrox-training",
    title: "HYROX Training & Physio Conditioning",
    shortTitle: "HYROX Training",
    categoryBadge: "Endurance, Strength & Race Prep",
    image: "/images/therapy-hyrox-training.jpg",
    shortSummary:
      "Physiotherapist-guided HYROX strength, running endurance, movement efficiency, and injury-proof race preparation for beginners to competitive athletes.",
    overview:
      "HYROX combines 8 km of running with 8 demanding functional workout stations—SkiErg, Sled Push, Sled Pull, Burpee Broad Jumps, Rowing, Farmers Carry, Sandbag Lunges, and Wall Balls. At Runlife Physio, our Sports Physiotherapists blend biomechanical coaching, joint-safe strength & conditioning, running pacing, and proactive recovery so you smash your HYROX goals without knee, back, or shoulder flare-ups.",
    bestFor: [
      "First-time HYROX Solo, Doubles & Relay participants",
      "Experienced athletes chasing a faster HYROX personal best",
      "Compromised running mechanics & pacing between heavy sled/lunge stations",
      "Preventing knee, lower back, Achilles & shoulder overload during prep",
      "Post-HYROX race recovery & mobility reset",
    ],
    sessionSteps: [
      {
        title: "1. Movement, Strength & Running Baseline",
        detail:
          "We assess your single-leg stability, hip/ankle mobility, grip endurance, pushing/pulling mechanics, and compromised-running form.",
      },
      {
        title: "2. Station Efficiency & Strength Conditioning",
        detail:
          "Targeted programming for Sled Push/Pull leverage, lunge knee stability, wall-ball squat depth, and aerobic threshold endurance.",
      },
      {
        title: "3. Integrated Recovery (Sports Massage, Cupping & Taping)",
        detail:
          "Built-in recovery support during peak training weeks so you arrive at the start line fresh, resilient, and injury-free.",
      },
    ],
    faqs: [
      {
        question: "I've never done a HYROX race before—can I join?",
        answer:
          "Absolutely! Physiotherapist-led HYROX conditioning is ideal for beginners because we build your foundational strength, joint stability, and running stamina safely step by step.",
      },
      {
        question: "Can I train for HYROX if I have old knee, shoulder, or back pain?",
        answer:
          "Yes—that is our specialty. Because your conditioning is guided by sports physiotherapists, we modify loads, fix movement faults, and rehab old niggles while building your race fitness.",
      },
    ],
  },
];

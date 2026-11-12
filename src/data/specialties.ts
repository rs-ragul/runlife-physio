export interface SpecialtyItem {
  slug: string;
  id: string;
  shortName: string;
  title: string;
  specialistCredential: string;
  specialistGuarantee: string;
  accentColor: string;
  badgeBg: string;
  heroImage: string;
  secondaryImage: string;
  tagline: string;
  shortDescription: string;
  clinicalOverview: string;
  whySpecialistMatters: string;
  pdfConditionsHighlighted: string[];
  conditionSlugs: string[];
  modalities: {
    name: string;
    detail: string;
  }[];
  phases: {
    rehab: string;
    recover: string;
    run: string;
  };
  idealModes: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const SPECIALTIES: SpecialtyItem[] = [
  {
    slug: "orthopedic-msk-rehabilitation",
    id: "ortho",
    shortName: "Orthopedic & MSK",
    title: "Orthopedic & Musculoskeletal (MSK) Rehabilitation",
    specialistCredential: "MPT (Orthopedics Specialist)",
    specialistGuarantee: "All Orthopedic & MSK conditions are treated exclusively by an MPT (Ortho Specialist).",
    accentColor: "#136EA8",
    badgeBg: "bg-sky-50 text-sky-800 border-sky-200",
    heroImage: "/images/ortho-manual-knee-therapy.jpg",
    secondaryImage: "/images/ortho-acl-postop-rehab.jpg",
    tagline: "Precision joint biomechanics, post-surgical protocols & lasting pain resolution.",
    shortDescription:
      "Evidence-based manual therapy and graded mechanical loading for ACL/PCL tears, knee & shoulder pain, TKR/THR joint replacements, fractures, and spine disorders.",
    clinicalOverview:
      "Musculoskeletal pain rarely originates exactly where it hurts. A painful knee often stems from hip abductor weakness or ankle stiffness; recurring shoulder impingement frequently traces back to scapular dyskinesis and thoracic rigidity. At Runlife Physio, our MPT (Orthopedics) specialists perform a comprehensive biomechanical chain evaluation—combining hands-on joint mobilization, soft-tissue release, and surgeon-aligned post-operative loading protocols so tissues heal stronger than before.",
    whySpecialistMatters:
      "Post-surgical grafts (ACL/PCL), total joint prostheses (TKR/THR), and healing fractures follow strict biological healing timelines. Loading too aggressively risks graft laxity; loading too timidly causes arthrofibrosis (joint stiffness) and quadriceps shutdown. An MPT Orthopedic Specialist calibrates load week by week using objective range-of-motion and strength criteria.",
    pdfConditionsHighlighted: [
      "ACL / PCL Ligament Reconstruction & Conservative Rehab",
      "Acute & Chronic Knee Pain (Osteoarthritis, Patellofemoral, Meniscus)",
      "Shoulder Rehab (Rotator Cuff, Frozen Shoulder, Labral & Impingement)",
      "Structured Post-Operative Orthopedic Rehabilitation",
      "TKR / THR (Total Knee & Total Hip Replacement) & Fracture Rehab",
      "Cervical, Lumbar Spine & Multi-Joint Pain Management",
    ],
    conditionSlugs: [
      "acl-pcl-ligament-injury",
      "knee-pain-osteoarthritis",
      "shoulder-rehab-rotator-cuff-frozen-shoulder",
      "post-operative-rehabilitation",
      "tkr-thr-joint-replacement-rehab",
      "spine-neck-joint-pain",
    ],
    modalities: [
      {
        name: "Maitland & Mulligan Joint Mobilization",
        detail: "Hands-on arthrokinematic glides that restore pain-free joint capsule mobility without forceful snapping.",
      },
      {
        name: "Surgeon-Aligned Post-Op Milestones",
        detail: "Phase-wise ACL/PCL, TKR, THR, and fracture protocols synchronized directly with your orthopedic surgeon's operative notes.",
      },
      {
        name: "Myofascial & Neurodynamic Release",
        detail: "Targeted soft-tissue mobilization and nerve gliding to calm protective muscle guarding and radiating pain.",
      },
      {
        name: "Graded Tendon & Joint Loading",
        detail: "Isometric-to-eccentric progressive strengthening that stimulates collagen remodeling in tendons, ligaments, and cartilage.",
      },
    ],
    phases: {
      rehab: "Settle joint effusion, acute inflammation, and protective spasm while restoring full passive & active range of motion safely.",
      recover: "Rebuild symmetrical muscle strength, joint proprioception, stair-climbing mechanics, and load tolerance for daily life.",
      run: "Lock in high-capacity joint resilience, ergonomic mastery, and return to pain-free recreation, travel, or athletics.",
    },
    idealModes: ["Home Care (Bangalore)", "By-Appointment Clinic", "Virtual Tele-Rehab"],
    faqs: [
      {
        question: "How soon after TKR, THR, or ACL surgery should home physiotherapy start?",
        answer:
          "Ideally within 24–72 hours after hospital discharge (per your surgeon's clearance). Early guided ankle pumps, patellar mobilization, extension restoration, and quadriceps activation prevent stiffness and accelerate independent walking.",
      },
      {
        question: "Can knee osteoarthritis or an ACL partial tear improve without surgery?",
        answer:
          "Yes—international orthopedic guidelines recommend structured MPT-led progressive strengthening, neuromuscular control, and load management as first-line care for knee osteoarthritis and many grade I–II ligament/meniscal injuries.",
      },
    ],
  },
  {
    slug: "neurological-rehabilitation",
    id: "neuro",
    shortName: "Neuro Rehab",
    title: "Neurological Rehabilitation",
    specialistCredential: "MPT (Neurology Specialist)",
    specialistGuarantee: "All Neurological conditions are treated exclusively by an MPT (Neuro Specialist).",
    accentColor: "#0284C7",
    badgeBg: "bg-cyan-50 text-cyan-900 border-cyan-200",
    heroImage: "/images/neuro-gait-balance-rehab.jpg",
    secondaryImage: "/images/tele-rehab-online-consultation.jpg",
    tagline: "Harnessing neuroplasticity to retrain balance, gait, coordination & daily independence.",
    shortDescription:
      "Task-specific neuroplastic retraining for Stroke (CVA), Spinal Cord Injury, Guillain-Barré Syndrome (GBS), Parkinson's, Multiple Sclerosis (MS), and neuropathic pain.",
    clinicalOverview:
      "After a neurological event or diagnosis, the nervous system retains a remarkable ability to rewire pathways—known clinically as activity-dependent neuroplasticity. Our MPT (Neurology) specialists design high-repetition, task-oriented motor retraining programs delivered right in your Bangalore home environment—where real-world transfers, doorway navigation, balance confidence, and family caregiver training matter most.",
    whySpecialistMatters:
      "Neurological rehab is fundamentally different from general exercise. Managing spasticity vs. flaccidity after Stroke, pacing fatigue in Multiple Sclerosis and Guillain-Barré Syndrome (GBS), or using external cueing for Parkinsonian freezing of gait requires specialized MPT Neuro clinical training.",
    pdfConditionsHighlighted: [
      "Stroke / Cerebrovascular Accident (CVA) Hemiplegia Recovery",
      "Spinal Cord Injury (SCI) Functional & Transfer Rehab",
      "Guillain-Barré Syndrome (GBS) Paced Motor Recovery",
      "Parkinson's Disease Gait, Cueing & Fall-Prevention Rehab",
      "Multiple Sclerosis (MS) Balance & Energy-Conserving Mobility",
      "Neurological Pain & Peripheral Neuropathy (Numbness, Tingling / Paresthesia)",
    ],
    conditionSlugs: [
      "stroke-cva-rehabilitation",
      "spinal-cord-injury-rehab",
      "guillain-barre-syndrome-gbs",
      "parkinsons-disease-rehab",
      "multiple-sclerosis-neuro-pain",
    ],
    modalities: [
      {
        name: "Bobath / NDT & Task-Specific Motor Relearning",
        detail: "Facilitating functional sit-to-stand, bed mobility, reaching, and hand dexterity through repetitive cortical engagement.",
      },
      {
        name: "Progressive Gait & Dynamic Balance Retraining",
        detail: "Structured transition from parallel/walker support to cane and independent multi-surface walking with fall-prevention drills.",
      },
      {
        name: "Auditory & Visual Cueing (Parkinson's Protocol)",
        detail: "LSVT-inspired big-amplitude movements and rhythmic cueing to overcome bradykinesia and gait freezing.",
      },
      {
        name: "Sensory Re-education & Neuropathic Desensitization",
        detail: "Targeted neural mobilization and proprioceptive training for numbness, tingling sensations, and radicular nerve pain.",
      },
    ],
    phases: {
      rehab: "Prevent secondary contractures, manage tone/spasticity, establish safe bed-to-chair transfers, and activate early neural pathways.",
      recover: "Build standing endurance, assisted-to-independent gait symmetry, upper-limb functional reach, and dynamic balance.",
      run: "Maximize community ambulation, stair navigation, fall resilience, and long-term self-efficacy for patient and family.",
    },
    idealModes: ["Home Care (Bangalore)", "Online Caregiver & Specialist Consultation", "Virtual Tele-Rehab"],
    faqs: [
      {
        question: "Why is home-based neuro physiotherapy in Bangalore often better for Stroke & Parkinson's patients?",
        answer:
          "Eliminating stressful city traffic preserves the patient's energy for actual therapy—and practicing bed transfers, bathroom safety, and walking inside the exact home layout produces faster real-life carryover.",
      },
      {
        question: "How is Guillain-Barré Syndrome (GBS) rehab paced differently?",
        answer:
          "Over-fatiguing recovering peripheral nerves in GBS can cause post-exertional weakness. Our MPT Neuro specialists use strict sub-maximal pacing and graded anti-gravity progression to rebuild strength safely.",
      },
    ],
  },
  {
    slug: "sports-running-rehabilitation",
    id: "sports",
    shortName: "Sports & Running",
    title: "Sports & Running Rehabilitation",
    specialistCredential: "MPT (Sports Specialist)",
    specialistGuarantee: "All Sports & Running conditions are treated exclusively by an MPT (Sports Specialist).",
    accentColor: "#85B925",
    badgeBg: "bg-lime-50 text-lime-900 border-lime-300",
    heroImage: "/images/sports-agility-return-to-run.jpg",
    secondaryImage: "/images/sports-onfield-assessment.jpg",
    tagline: "Criteria-driven Return-to-Sport, running gait biomechanics & elite S&C.",
    shortDescription:
      "Built for marathoners, weekend athletes & competitive players: ACL/PCL sports rehab, Return-to-Sport (RTS) testing, running injury biomechanics, and Strength & Conditioning (S&C).",
    clinicalOverview:
      "True to our name—Runlife Physio—sports and running rehabilitation sits at the heart of our clinical identity. Stopping activity until pain fades only deconditions tendons and muscles, setting up an immediate flare-up on your next 5K, marathon block, badminton match, or football game. Our MPT (Sports) specialists combine kinetic-chain biomechanics, cadence & running gait correction, and objective Limb Symmetry Index (LSI > 90%) testing so you return to sport faster, stronger, and injury-resilient.",
    whySpecialistMatters:
      "Time alone does NOT clear an athlete for sport. Whether recovering from ACL reconstruction, Achilles tendinopathy, runner's knee, or a hamstring tear, an MPT Sports Specialist measures single-leg hop ratios, eccentric deceleration, reactive agility, and sport-specific energy systems before clearing your return.",
    pdfConditionsHighlighted: [
      "Athletic ACL / PCL Reconstruction & Non-Operative Sports Rehab",
      "Objective Return-to-Sport (RTS) Testing & Clearance",
      "Running Rehab (Runner's Knee, Shin Splints, ITB, Plantar Fasciitis, Achilles)",
      " Rehab-Integrated Strength & Conditioning (S&C)",
      "Acute & Overuse Sports Injuries (Muscle Strains, Cramps, Myofascial Tightness)",
    ],
    conditionSlugs: [
      "acl-pcl-ligament-injury",
      "return-to-sport-running-rehab",
      "strength-and-conditioning-sports-injury",
      "shoulder-rehab-rotator-cuff-frozen-shoulder",
    ],
    modalities: [
      {
        name: "Running Gait & Lower-Limb Biomechanical Analysis",
        detail: "Evaluating stride over-striding, pelvic drop, foot strike, cadence, and calf-soleus load capacity for Bangalore runners.",
      },
      {
        name: "Criteria-Based Return-to-Sport (RTS) Battery",
        detail: "Single-leg triple hop, Y-balance, deceleration mechanics, and psychological readiness testing—never guesswork.",
      },
      {
        name: "Clinical Strength & Conditioning (S&C)",
        detail: "Heavy slow resistance (HSR) for tendinopathies, eccentric hamstring protocols, plyometrics, and rotational core power.",
      },
      {
        name: "Acute Strain, Cramp & Myofascial Recovery",
        detail: "Soft-tissue release, sports taping, neuromuscular resetting, and hydration/load periodization to stop recurring tightness.",
      },
    ],
    phases: {
      rehab: "Calm acute tendon/muscle overload while maintaining pain-free cross-training fitness so you never lose cardiovascular base.",
      recover: "Build heavy eccentric strength, single-leg stability, and progressive plyometric shock absorption.",
      run: "Execute walk-run intervals, agility ladder & sport-specific drills, pass RTS benchmarks, and hit new personal bests.",
    },
    idealModes: ["By-Appointment Session", "Virtual Tele-Rehab & S&C Coaching", "Home Care (Bangalore)"],
    faqs: [
      {
        question: "Do I have to stop running completely when I have runner's knee or shin pain?",
        answer:
          "In many cases, no! Instead of complete rest, our MPT Sports Specialist modifies weekly mileage, cadence, surface, and tendon load while fixing hip/calf deficits—keeping you safely active.",
      },
      {
        question: "What is Strength & Conditioning (S&C) inside physiotherapy?",
        answer:
          "S&C bridges the gap between being 'pain-free on a treatment couch' and surviving the 3x–6x bodyweight forces of running, jumping, cricket, football, or racket sports.",
      },
    ],
  },
  {
    slug: "pediatric-rehabilitation",
    id: "pediatric",
    shortName: "Pediatric Rehab",
    title: "Pediatric Rehabilitation",
    specialistCredential: "MPT (Pediatrics Specialist)",
    specialistGuarantee: "All Pediatric conditions are treated exclusively by an MPT (Pediatric Specialist).",
    accentColor: "#7C3AED",
    badgeBg: "bg-violet-50 text-violet-900 border-violet-200",
    heroImage: "/images/pediatric-balance-milestone-rehab.jpg",
    secondaryImage: "/images/tele-rehab-online-consultation.jpg",
    tagline: "Play-led early intervention & motor milestone development for infants, toddlers & children.",
    shortDescription:
      "Compassionate, family-centered pediatric therapy for Cerebral Palsy (CP), Autism motor coordination, Global Developmental Delay (GDD), Hydrocephalus, Spina Bifida, and Muscular Dystrophy.",
    clinicalOverview:
      "Children are not miniature adults—their developing brains, growth plates, sensory profiles, and emotional world require play-based, joyful therapeutic engagement. At Runlife Physio, our MPT (Pediatrics) specialists turn structured neuro-developmental and postural goals into engaging games using balance domes, sensory-motor circuits, and parent coaching right in the comfort and safety of your child's home.",
    whySpecialistMatters:
      "Early childhood carries peak neuroplastic potential. An MPT Pediatric Specialist recognizes subtle postural asymmetries, abnormal muscle tone, sensory-motor integration challenges, and orthotic/seating needs early—empowering parents with daily play routines that multiply therapy gains.",
    pdfConditionsHighlighted: [
      "Cerebral Palsy (CP) — Tone, Posture, Gait & Functional Independence",
      "Autism Spectrum Disorder (ASD) — Gross Motor Planning, Balance & Coordination",
      "Global Developmental Delay (GDD) — Head Control, Sitting, Crawling & Walking Milestones",
      "Hydrocephalus — Post-Shunt Motor & Balance Rehabilitation",
      "Spina Bifida — Lower-Limb Strengthening, Orthotic Gait & Mobility",
      "Muscular Dystrophy (MD) — Gentle Functional Preservation, Respiratory & Contracture Care",
    ],
    conditionSlugs: [
      "cerebral-palsy-pediatric-rehab",
      "autism-gdd-developmental-therapy",
      "spina-bifida-hydrocephalus-muscular-dystrophy",
    ],
    modalities: [
      {
        name: "Neuro-Developmental Therapy (NDT) & Milestone Facilitation",
        detail: "Gentle hands-on facilitation guiding rolling, sitting balance, quadruped crawling, pull-to-stand, and independent steps.",
      },
      {
        name: "Play-Based Sensory-Motor & Balance Integration",
        detail: "Obstacle courses, balance pods, vestibular swings, and ball play tailored for children with ASD, GDD, and coordination delays.",
      },
      {
        name: "Gait, Orthotic (AFO) & Postural Alignment Coaching",
        detail: "Optimizing bone and joint alignment during growth spurts and training confident walking with or without assistive devices.",
      },
      {
        name: "Structured Parent & Family Home-Play Empowerment",
        detail: "Teaching parents practical 15-minute daily carryover positioning and play activities that fit effortlessly into family routines.",
      },
    ],
    phases: {
      rehab: "Establish warm child-therapist trust, gentle muscle length/tone comfort, midline head & trunk stability, and parent alignment.",
      recover: "Unlock sequential motor milestones—sitting, transitions, standing balance, and coordinated bilateral play.",
      run: "Build school-readiness mobility, playground confidence, peer participation, and lifelong functional independence.",
    },
    idealModes: ["Home Care (Bangalore — Child's Comfort Zone)", "Online Parent Coaching", "By-Appointment Session"],
    faqs: [
      {
        question: "Why do children respond so well to home-based pediatric physiotherapy?",
        answer:
          "Infants and neurodivergent children often feel anxious in unfamiliar hospital settings. In their own home surrounded by familiar toys, children relax, engage joyfully, and learn skills directly where they live and play.",
      },
      {
        question: "When should parents seek a pediatric physiotherapy milestone check?",
        answer:
          "If an infant shows persistent head lag past 4 months, isn't sitting unsupported by 8–9 months, isn't walking by 16–18 months, walks persistently on toes, or has an existing NICU/neurological diagnosis, early assessment is highly beneficial.",
      },
    ],
  },
  {
    slug: "womens-health-pelvic-rehabilitation",
    id: "womens-health",
    shortName: "Women's Health & OBG",
    title: "Gynecology, Women's Health & Pelvic Rehabilitation",
    specialistCredential: "MPT (OBG / Women's Health Specialist)",
    specialistGuarantee: "All Women's Health & Pelvic conditions are treated by an MPT (Women's Health Specialist).",
    accentColor: "#DB2777",
    badgeBg: "bg-pink-50 text-pink-900 border-pink-200",
    heroImage: "/images/womens-health-antenatal-rehab.jpg",
    secondaryImage: "/images/tele-rehab-online-consultation.jpg",
    tagline: "Dignified, private antenatal, postpartum & pelvic floor rehabilitation for every stage of motherhood.",
    shortDescription:
      "Confidential, specialist female-led physiotherapy for Antenatal (Prenatal) comfort & birth prep, Postnatal (Postpartum) C-section/vaginal recovery, Diastasis Recti, and Pelvic Floor rehabilitation.",
    clinicalOverview:
      "Pregnancy, childbirth, and hormonal transitions place extraordinary biomechanical demands on a woman's spine, ribcage, abdominal wall, and pelvic floor. Yet too many mothers are told back pain, C-section scar tightness, diastasis recti, or leakage when sneezing/running is 'just normal after delivery.' Our MPT (Women's Health / OBG) specialists provide empathetic, private 1-on-1 care—at home in Bangalore or via confidential online video sessions—to restore core integrity and pelvic confidence.",
    whySpecialistMatters:
      "Generic 'Kegels' or crunches can actually worsen an overactive (hypertonic) pelvic floor or widen diastasis recti! An MPT Women's Health Specialist evaluates breathing-diaphragm-pelvic-floor synergy so your core heals safely from the inside out.",
    pdfConditionsHighlighted: [
      "Antenatal / Prenatal Rehab (Pregnancy Back/Pelvic Girdle Pain, Mobility & Labor Prep)",
      "Postnatal / Postpartum Recovery (Vaginal & C-Section Scar, Core & Posture Restoration)",
      "Pelvic Floor Rehabilitation (Stress Incontinence, Pelvic Heaviness, Relaxation & Strength)",
      "Diastasis Recti (Abdominal Separation) & Safe Return-to-Running Postpartum",
    ],
    conditionSlugs: [
      "antenatal-postnatal-pregnancy-rehab",
      "pelvic-floor-rehabilitation",
    ],
    modalities: [
      {
        name: "Antenatal Pelvic Girdle & Labor Mobility Prep",
        detail: "Safe trimester-specific stability ball exercises, sacroiliac pain relief, hip opening, and breathing mechanics for smoother delivery.",
      },
      {
        name: "360° Diaphragm & Pelvic Floor Neuromuscular Retraining",
        detail: "Coordinating deep transverse abdominis, ribcage breathing, and pelvic floor lift-and-release—beyond generic Kegels.",
      },
      {
        name: "Postpartum C-Section & Diastasis Recti Protocol",
        detail: "Gentle scar tissue mobilization, progressive abdominal tension restoration, and ergonomic baby-feeding/lifting posture.",
      },
      {
        name: "Postpartum Return-to-Exercise & Running Clearance",
        detail: "Evidence-based postnatal impact readiness checks so mothers return to gym, yoga, or running without pelvic symptoms.",
      },
    ],
    phases: {
      rehab: "Relieve pregnancy/postpartum lumbo-pelvic pain, reconnect 360° breath with deep pelvic floor, and protect healing tissues.",
      recover: "Close functional abdominal gap (diastasis), rebuild glute & postural endurance for pain-free baby care and daily life.",
      run: "Achieve leak-free, confident high-impact strength, fitness, and lifelong pelvic health.",
    },
    idealModes: ["Private Home Care (Bangalore)", "Confidential Online Video Session", "Virtual Tele-Rehab"],
    faqs: [
      {
        question: "When can I start postnatal physiotherapy after a normal delivery or C-section?",
        answer:
          "Gentle breathwork, circulation, posture comfort, and pelvic floor awareness can start in the early weeks, while structured core and scar rehab typically begins after your 6-week obstetric checkup (or earlier for back/neck feeding pain).",
      },
      {
        question: "Can pelvic floor physiotherapy be done comfortably at home or online?",
        answer:
          "Absolutely. New mothers love avoiding Bangalore traffic with a newborn—our female MPT Women's Health specialist visits privately at home or guides external posture, breath, and pelvic synergy clearly via confidential video consultation.",
      },
    ],
  },
];

export function getSpecialtyBySlug(slug: string): SpecialtyItem | undefined {
  return SPECIALTIES.find((s) => s.slug === slug);
}

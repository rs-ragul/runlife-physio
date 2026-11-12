export interface ConditionItem {
  slug: string;
  title: string;
  shortTitle: string;
  specialtySlug: string;
  specialtyLabel: string;
  specialistBadge: string;
  bodyArea: string;
  heroImage: string;
  summary: string;
  clinicalExplanation: string;
  commonSymptoms: string[];
  whenToSeeSpecialist: string[];
  rehabRoadmap: {
    phase1: string;
    phase2: string;
    phase3: string;
  };
  recoveryTimelineNote: string;
}

export const CONDITIONS: ConditionItem[] = [
  {
    slug: "acl-pcl-ligament-injury",
    title: "ACL & PCL Ligament Injury Rehabilitation",
    shortTitle: "ACL / PCL Rehab",
    specialtySlug: "orthopedic-msk-rehabilitation",
    specialtyLabel: "Orthopedic & Sports Rehab",
    specialistBadge: "MPT (Ortho & Sports Specialist)",
    bodyArea: "Knee & Lower Limb",
    heroImage: "/images/ortho-acl-postop-rehab.jpg",
    summary:
      "Pre-hab, post-reconstruction graft protection, and criteria-led Return-to-Sport rehabilitation for Anterior & Posterior Cruciate Ligament (ACL / PCL) injuries.",
    clinicalExplanation:
      "Whether you are preparing for ACL/PCL arthroscopic reconstruction, recovering week-by-week post-surgery, or pursuing structured conservative (non-surgical) management as a 'coper', cruciate ligament recovery hinges on restoring full terminal knee extension, eliminating arthrogenic quadriceps inhibition, and building >90% single-leg strength symmetry before pivoting or running.",
    commonSymptoms: [
      "Knee giving way or instability during pivoting, stairs, or sudden deceleration",
      "Post-injury or post-surgical joint effusion (swelling) and difficulty straightening the knee fully",
      "Quadriceps muscle wasting and hesitation bearing full weight on one leg",
      "Loss of confidence returning to running, football, badminton, cricket, or gym",
    ],
    whenToSeeSpecialist: [
      "Immediately after MRI diagnosis (2–4 weeks of 'Pre-Hab' dramatically improves post-op outcomes)",
      "Within 48–72 hours after ACL/PCL reconstruction for phase-1 home physiotherapy in Bangalore",
      "At months 3–9 post-op to transition safely into running, agility, and Return-to-Sport testing",
    ],
    rehabRoadmap: {
      phase1: "Graft protection, swelling control, patellar glides, 0° full knee extension, and quad reactivation.",
      phase2: "Closed-kinetic-chain strength, single-leg neuromuscular balance, hamstring-quad co-contraction, and gait mastery.",
      phase3: "Progressive walk-run program, deceleration plyometrics, agility ladder drills & Limb Symmetry Index clearance.",
    },
    recoveryTimelineNote: "Daily walking independence: 3–6 weeks | Return-to-running: ~12–16 weeks (criteria-based) | Full pivot sport: 7–9+ months.",
  },
  {
    slug: "knee-pain-osteoarthritis",
    title: "Knee Pain, Osteoarthritis & Patellofemoral Rehab",
    shortTitle: "Knee Pain & OA",
    specialtySlug: "orthopedic-msk-rehabilitation",
    specialtyLabel: "Orthopedic & MSK Rehab",
    specialistBadge: "MPT (Ortho Specialist)",
    bodyArea: "Knee & Hip",
    heroImage: "/images/ortho-manual-knee-therapy.jpg",
    summary:
      "Targeted biomechanical unloading, manual joint mobilization, and glute-quad strengthening to relieve chronic knee pain, stair pain, and osteoarthritis.",
    clinicalExplanation:
      "Wear-and-tear on an X-ray does NOT doom you to lifelong pain or immediate surgery. Knee cartilage thrives on healthy cyclic compression and strong surrounding shock-absorbers (quadriceps, gluteus medius, and soleus). Our MPT Orthopedic specialists identify faulty patellar tracking and hip-ankle mechanics to reduce joint stress rapidly.",
    commonSymptoms: [
      "Sharp or aching pain around/behind the kneecap while climbing or descending stairs",
      "Morning knee stiffness lasting 15–30 minutes or crepitus (grinding sensation)",
      "Pain after prolonged sitting ('theater sign'), squatting, or sitting cross-legged",
      "Swelling or medial joint-line tenderness after walking",
    ],
    whenToSeeSpecialist: [
      "Knee pain persisting longer than 10–14 days or limiting daily walks and stairs",
      "When advised to 'strengthen knees' to delay or avoid knee replacement surgery",
      "Recurring anterior knee pain in runners, cyclists, or gym-goers",
    ],
    rehabRoadmap: {
      phase1: "Pain-modulating manual mobilization, taping, isometric quad holds, and swelling reduction.",
      phase2: "Hip posterolateral strengthening, step-up mechanics, and pain-free squat/stair progression.",
      phase3: "Long-term joint load resilience, brisk walking/hiking readiness, and self-management mastery.",
    },
    recoveryTimelineNote: "Noticeable pain relief typically within 2–3 weeks; structural strength remodeling over 6–10 weeks.",
  },
  {
    slug: "shoulder-rehab-rotator-cuff-frozen-shoulder",
    title: "Shoulder Rehab — Rotator Cuff, Frozen Shoulder & Impingement",
    shortTitle: "Shoulder Rehab",
    specialtySlug: "orthopedic-msk-rehabilitation",
    specialtyLabel: "Orthopedic & MSK Rehab",
    specialistBadge: "MPT (Ortho Specialist)",
    bodyArea: "Neck & Shoulder",
    heroImage: "/images/tele-rehab-online-consultation.jpg",
    summary:
      "Stage-matched capsular mobilization and scapular-cuff neuromuscular retraining for Frozen Shoulder (Adhesive Capsulitis), Rotator Cuff tears, and overhead pain.",
    clinicalExplanation:
      "The shoulder is the body's most mobile joint—relying on precise teamwork between four rotator cuff muscles, the shoulder blade (scapula), and the upper back (thoracic spine). Treating a 'freezing' stage Frozen Shoulder aggressively worsens night pain, whereas under-mobilizing a 'thawing' capsule leaves stiffness behind. Stage-specific MPT Ortho care solves both.",
    commonSymptoms: [
      "Deep night pain disturbing sleep when lying on the affected shoulder",
      "Painful arc lifting the arm overhead, reaching behind the back, or dressing",
      "Progressive stiffness in Frozen Shoulder (especially diabetics & ages 40–65)",
      "Weakness or clicking during racket sports, swimming, or gym pressing",
    ],
    whenToSeeSpecialist: [
      "Night pain or progressive loss of overhead/behind-back reach",
      "Following rotator cuff repair, Bankart labral surgery, or shoulder dislocation",
      "Desk-related neck-shoulder blade pain not resolving with rest",
    ],
    rehabRoadmap: {
      phase1: "Calm subacromial/capsular irritability, gentle grade I–II glides, and thoracic posture unlocking.",
      phase2: "Progressive capsular stretching, serratus/lower-trapezius control, and external rotation loading.",
      phase3: "Full overhead reach, heavy resistance/throwing mechanics, and recurrence prevention.",
    },
    recoveryTimelineNote: "Impingement/cuff tendinopathy: 4–8 weeks | Frozen shoulder: stage-guided relief & steady mobility recovery.",
  },
  {
    slug: "post-operative-rehabilitation",
    title: "Post-Operative Orthopedic Rehabilitation",
    shortTitle: "Post-Operative Rehab",
    specialtySlug: "orthopedic-msk-rehabilitation",
    specialtyLabel: "Orthopedic & MSK Rehab",
    specialistBadge: "MPT (Ortho Specialist)",
    bodyArea: "Multi-Joint / Surgical",
    heroImage: "/images/ortho-acl-postop-rehab.jpg",
    summary:
      "Surgeon-coordinated doorstep & clinical rehabilitation after ligament repairs, spine surgery, arthroscopy, tendon repairs, and trauma fixation.",
    clinicalExplanation:
      "A successful surgery is only 50% of your outcome—the other 50% is structured, milestone-guided post-operative physiotherapy. Our MPT Orthopedic team reviews your discharge summary and surgical notes to protect healing sutures/hardware while preventing scar adhesions, DVT stiffness, and muscle atrophy right in your Bangalore home.",
    commonSymptoms: [
      "Post-surgical joint stiffness, protective muscle guarding, and incision tightness",
      "Fear of moving the operated limb or uncertainty about weight-bearing rules",
      "Swelling, gait limping, and difficulty with stairs or bathroom transfers",
    ],
    whenToSeeSpecialist: [
      "Before hospital discharge so Day-1 home physiotherapy in Bangalore is seamlessly scheduled",
      "After cast or brace removal when a joint feels 'stuck' or weak",
    ],
    rehabRoadmap: {
      phase1: "Edema control, safe transfers, scar care, protected range-of-motion, and isometric muscle firing.",
      phase2: "Normalized crutch-to-independent gait, progressive closed-chain strengthening, and joint stability.",
      phase3: "Full occupational, recreational, and athletic functional restoration.",
    },
    recoveryTimelineNote: "Customized strictly to surgical procedure and tissue healing biology (6–24 weeks).",
  },
  {
    slug: "tkr-thr-joint-replacement-rehab",
    title: "TKR, THR (Knee & Hip Replacement) & Fracture Rehabilitation",
    shortTitle: "TKR / THR / Fractures",
    specialtySlug: "orthopedic-msk-rehabilitation",
    specialtyLabel: "Orthopedic & MSK Rehab",
    specialistBadge: "MPT (Ortho Specialist)",
    bodyArea: "Knee, Hip & Bone",
    heroImage: "/images/ortho-manual-knee-therapy.jpg",
    summary:
      "Specialized Bangalore home-visit rehabilitation for Total Knee Replacement (TKR), Total Hip Replacement (THR), and post-fracture ORIF/cast recovery.",
    clinicalExplanation:
      "The first 6 weeks after TKR or THR define your long-term bend, extension, and walking stride. Traveling in traffic right after joint replacement or lower-limb fracture fixation is painful and risky—which is why Runlife's MPT Ortho specialists come directly to your home to achieve 0°–120°+ knee flexion, hip precaution safety, and confident walker-to-unaided walking.",
    commonSymptoms: [
      "Difficulty bending or fully straightening a newly replaced knee (TKR)",
      "Uncertainty around hip dislocation precautions, bed height, and stair climbing after THR",
      "Severe joint stiffness and muscle wasting after plaster cast removal or ORIF plate/rod surgery",
    ],
    whenToSeeSpecialist: [
      "Immediately post-discharge from hospital for daily/alternate-day home rehab",
      "Within 48 hours of orthopedic surgeon clearing post-fracture mobilization",
    ],
    rehabRoadmap: {
      phase1: "Swelling control, circulation drills, safe walker gait, and target ROM milestones.",
      phase2: "Transition from walker to stick to independent stride, stair mastery, and quad/glute strength.",
      phase3: "Outdoor community walking, balance confidence, and pain-free active living.",
    },
    recoveryTimelineNote: "Independent indoor walking: 2–4 weeks | Confident stairs & outdoor walks: 6–12 weeks.",
  },
  {
    slug: "spine-neck-joint-pain",
    title: "Back Pain, Sciatica, Cervical Spondylosis & Joint Pain",
    shortTitle: "Spine & Joint Pain",
    specialtySlug: "orthopedic-msk-rehabilitation",
    specialtyLabel: "Orthopedic & MSK Rehab",
    specialistBadge: "MPT (Ortho Specialist)",
    bodyArea: "Spine, Neck & Joints",
    heroImage: "/images/tele-rehab-online-consultation.jpg",
    summary:
      "Root-cause mechanical diagnosis, directional preference therapy, and ergonomic spinal stabilization for disc bulges, sciatica, tech-neck, and multi-joint pain.",
    clinicalExplanation:
      "Long hours coding or commuting in Bangalore make lumbar disc irritation, sciatica, and cervical radiculopathy epidemic. Passive heat packs or painkillers only mask symptoms temporarily. Our MPT Orthopedic specialists combine McKenzie directional assessment, neural mobilization, and deep spinal motor control to resolve mechanical compression sustainably.",
    commonSymptoms: [
      "Lower back ache or sharp radiating leg pain (sciatica) aggravated by sitting or bending",
      "Neck stiffness with radiating pain or tingling into the shoulder blade, arm, or fingers",
      "Recurring multi-joint stiffness in hips, ankles, elbows, or wrists",
    ],
    whenToSeeSpecialist: [
      "Back or neck pain accompanied by arm/leg tingling, heaviness, or morning stiffness",
      "Recurring flare-ups every few months during desk work, driving, or gym workouts",
    ],
    rehabRoadmap: {
      phase1: "Centralize radiating nerve symptoms, directional unloading, and manual segmental mobilization.",
      phase2: "Deep core & deep neck flexor endurance, hip mobility unlocking, and desk ergonomic setup.",
      phase3: "Deadlift/hinge confidence, travel tolerance, and flare-up-proof spinal resilience.",
    },
    recoveryTimelineNote: "Acute relief frequently begins in 1–3 sessions; full core endurance built over 4–6 weeks.",
  },
  {
    slug: "stroke-cva-rehabilitation",
    title: "Stroke (CVA) Neuro Rehabilitation at Home",
    shortTitle: "Stroke (CVA) Rehab",
    specialtySlug: "neurological-rehabilitation",
    specialtyLabel: "Neurological Rehabilitation",
    specialistBadge: "MPT (Neuro Specialist)",
    bodyArea: "Neurological / Full Body",
    heroImage: "/images/neuro-gait-balance-rehab.jpg",
    summary:
      "Intensive neuroplastic motor relearning at home in Bangalore—retraining hemiplegic arm function, trunk balance, spasticity control, and independent walking after Stroke.",
    clinicalExplanation:
      "Following an ischemic or hemorrhagic Stroke (CVA), the brain enters a heightened window of neuroplasticity—especially in the first 3 to 6 months, though meaningful gains continue for years with task-specific repetition. Our MPT (Neurology) specialists guide structured weight-shifting, gait symmetry, and upper-limb functional recovery right in your home.",
    commonSymptoms: [
      "One-sided weakness or paralysis (hemiparesis/hemiplegia) in the arm, hand, or leg",
      "Foot drop, knee hyperextension, or fear of falling while standing or walking",
      "Muscle tightness/spasticity in the elbow, wrist, fingers, or calf, or shoulder subluxation",
    ],
    whenToSeeSpecialist: [
      "Immediately upon hospital discharge to maximize the golden 90-day neuroplastic recovery window",
      "Even months or years post-stroke to overcome compensatory limping, stiffness, or balance decline",
    ],
    rehabRoadmap: {
      phase1: "Safe bed mobility, shoulder protection, sitting trunk balance, and early weight-bearing activation.",
      phase2: "Sit-to-stand repetition, assisted-to-independent gait training, and functional hand/reach tasks.",
      phase3: "Stair & uneven-surface walking, dual-task balance, and caregiver-supported independence.",
    },
    recoveryTimelineNote: "Continuous milestone progression tracked every 2 weeks across Barthel & Berg Balance benchmarks.",
  },
  {
    slug: "spinal-cord-injury-rehab",
    title: "Spinal Cord Injury (SCI) Functional Rehabilitation",
    shortTitle: "Spinal Cord Injury",
    specialtySlug: "neurological-rehabilitation",
    specialtyLabel: "Neurological Rehabilitation",
    specialistBadge: "MPT (Neuro Specialist)",
    bodyArea: "Neurological / Spine",
    heroImage: "/images/neuro-gait-balance-rehab.jpg",
    summary:
      "Goal-driven neurological rehabilitation for incomplete & complete Spinal Cord Injuries—maximizing motor recovery, transfer mastery, standing frame/gait training, and independence.",
    clinicalExplanation:
      "Every Spinal Cord Injury is unique depending on neurological level and completeness (ASIA grade). Our MPT Neuro specialists focus relentlessly on activating spared neural pathways below the lesion, building upper-body & core transfer power, preventing joint contractures and pressure sores, and training upright standing or orthotic gait where indicated.",
    commonSymptoms: [
      "Paraparesis or quadriparesis affecting trunk stability, standing, and lower-limb control",
      "Muscle spasms, neuropathic discomfort, and postural hypotension when sitting upright",
      "Need for safe bed-to-wheelchair transfer training and home accessibility adaptation",
    ],
    whenToSeeSpecialist: [
      "Post-acute hospital rehab discharge for structured, consistent home neuro physiotherapy",
      "Whenever transitioning to new orthoses, walkers, or higher independence goals",
    ],
    rehabRoadmap: {
      phase1: "Respiratory expansion, passive/active-assisted joint preservation, mat rolling & sitting balance.",
      phase2: "Transfer independence, upper-limb & core strengthening, and supported standing/weight-bearing.",
      phase3: "Gait training (for incomplete SCI) or advanced community mobility & lifelong fitness.",
    },
    recoveryTimelineNote: "Structured long-term milestone blocks with measurable monthly functional reviews.",
  },
  {
    slug: "guillain-barre-syndrome-gbs",
    title: "Guillain-Barré Syndrome (GBS) Recovery & Paced Rehab",
    shortTitle: "GBS Rehabilitation",
    specialtySlug: "neurological-rehabilitation",
    specialtyLabel: "Neurological Rehabilitation",
    specialistBadge: "MPT (Neuro Specialist)",
    bodyArea: "Peripheral Nervous System",
    heroImage: "/images/neuro-gait-balance-rehab.jpg",
    summary:
      "Fatigue-calibrated peripheral nerve recovery after Guillain-Barré Syndrome (GBS)—restoring anti-gravity strength, foot-drop control, balance, and endurance safely.",
    clinicalExplanation:
      "Guillain-Barré Syndrome recovery requires clinical finesse: pushing recovering motor units to exhaustion triggers 'overwork weakness', yet too little stimulation slows functional return. Our MPT Neuro specialists monitor perceived exertion and heart rate closely, progressing seamlessly from gravity-eliminated movement to full walking and stair climbing.",
    commonSymptoms: [
      "Ascending leg and arm weakness, heavy limbs, and rapid muscular fatigue after hospitalization",
      "Distal ankle weakness (foot drop), hand grip difficulty, and unsteady balance",
      "Residual tingling, pins-and-needles, or deep aching nerve sensitivity",
    ],
    whenToSeeSpecialist: [
      "Right after IVIG/plasmapheresis hospital discharge once neurologically stabilized",
      "During the sub-acute recovery months to rebuild normal gait and return to work",
    ],
    rehabRoadmap: {
      phase1: "Gentle contracture prevention, respiratory capacity, sensory comfort, and sub-maximal activation.",
      phase2: "Graded anti-gravity strengthening, ankle-hip balance strategies, and walker-to-independent gait.",
      phase3: "Stamina building, fine hand coordination, and complete return to work & recreation.",
    },
    recoveryTimelineNote: "Steady, paced strength gains over 8–24+ weeks with strict fatigue-guarded programming.",
  },
  {
    slug: "parkinsons-disease-rehab",
    title: "Parkinson's Disease Mobility, Balance & Cueing Rehab",
    shortTitle: "Parkinson's Rehab",
    specialtySlug: "neurological-rehabilitation",
    specialtyLabel: "Neurological Rehabilitation",
    specialistBadge: "MPT (Neuro Specialist)",
    bodyArea: "Neurological / Balance",
    heroImage: "/images/neuro-gait-balance-rehab.jpg",
    summary:
      "High-amplitude movement training, rhythmic gait cueing, postural extension, and fall-prevention physiotherapy for Parkinson's Disease.",
    clinicalExplanation:
      "Exercise is neuroprotective medicine in Parkinson's Disease—working synergistically alongside your neurologist's medication ('ON' window optimization). Our MPT Neuro specialists use visual floor markers, metronome cadence cueing, rotational trunk mobility, and dual-task balance drills to counter shuffling steps, stooped posture, and freezing of gait.",
    commonSymptoms: [
      "Small shuffling steps, reduced arm swing, or sudden 'freezing' in doorways and turns",
      "Stooped forward posture, trunk rigidity, and difficulty turning in bed or rising from low chairs",
      "Balance hesitancy or near-falls when multitasking",
    ],
    whenToSeeSpecialist: [
      "Early upon diagnosis ('pre-hab' slows motor decline dramatically!), not only after falls occur",
      "Whenever walking speed slows, posture stoops, or freezing episodes begin",
    ],
    rehabRoadmap: {
      phase1: "Medication-timed baseline gait & fall-risk audit, thoracic extension, and big-amplitude drills.",
      phase2: "External cueing mastery for turns/doorways, reactive stepping balance, and strength.",
      phase3: "Sustained daily home exercise routine, brisk walking confidence, and family safety setup.",
    },
    recoveryTimelineNote: "Noticeable stride & confidence gains in 3–4 weeks; ongoing maintenance preserves independence.",
  },
  {
    slug: "multiple-sclerosis-neuro-pain",
    title: "Multiple Sclerosis (MS) & Neurological Pain / Neuropathy Rehab",
    shortTitle: "MS & Neuro Pain",
    specialtySlug: "neurological-rehabilitation",
    specialtyLabel: "Neurological Rehabilitation",
    specialistBadge: "MPT (Neuro Specialist)",
    bodyArea: "Nervous System & Sensory",
    heroImage: "/images/neuro-gait-balance-rehab.jpg",
    summary:
      "Cooling-paced mobility for Multiple Sclerosis (MS) and targeted neural rehabilitation for numbness, tingling (paresthesia), radiculopathy, and peripheral neuropathy.",
    clinicalExplanation:
      "Both Multiple Sclerosis and peripheral neuropathic conditions (diabetic neuropathy, nerve compression, burning/tingling paresthesia) disrupt sensory feedback from the feet and hands to the brain. Our MPT Neuro specialists combine heat-sensitive energy conservation, proprioceptive balance retraining, and gentle neurodynamic gliding to restore steady footing and calm nerve hypersensitivity.",
    commonSymptoms: [
      "Numbness, pins-and-needles tingling, burning sensations, or 'walking on cotton wool' feeling",
      "MS-related fatigue, leg heaviness, spasticity, or unsteadiness in dim lighting",
      "Radiating nerve pain from cervical or lumbar nerve root irritation",
    ],
    whenToSeeSpecialist: [
      "Persistent numbness/tingling affecting hand grip, sleep, or walking balance",
      "Post-relapse MS recovery or proactive fatigue-smart strength preservation",
    ],
    rehabRoadmap: {
      phase1: "Sensory mapping, gentle neural sliders, spasticity relief, and energy-budget pacing.",
      phase2: "Proprioceptive balance pads, cool-environment interval strengthening, and gait stability.",
      phase3: "Fall-proof daily mobility and self-paced neuro-fitness routine.",
    },
    recoveryTimelineNote: "Individualized to symptom pattern with measurable balance & sensory comfort tracking.",
  },
  {
    slug: "return-to-sport-running-rehab",
    title: "Running Rehab, Gait Biomechanics & Return-to-Sport (RTS)",
    shortTitle: "Running & Return-to-Sport",
    specialtySlug: "sports-running-rehabilitation",
    specialtyLabel: "Sports & Running Rehab",
    specialistBadge: "MPT (Sports Specialist)",
    bodyArea: "Lower Limb & Full Kinetic Chain",
    heroImage: "/images/sports-agility-return-to-run.jpg",
    summary:
      "Specialized rehab for Bangalore marathoners, runners & competitive athletes—solving Runner's Knee, ITB, Shin Splints, Plantar Fasciitis, Achilles pain & RTS clearance.",
    clinicalExplanation:
      "Every running stride sends 2.5x to 3x bodyweight through your soleus, Achilles, shin, and knee—nearly 1,500 times per kilometer! Most running injuries stem from a 'training load > tissue capacity' mismatch combined with subtle cadence or hip-control deficits. Our MPT Sports specialists fix both your tissue capacity AND your running mechanics so you return to Cubbon Park, Lalbagh, or race day stronger than ever.",
    commonSymptoms: [
      "Lateral or front knee pain appearing at kilometer 3–5 of a run (ITB / Runner's Knee)",
      "Morning heel pain on first steps (Plantar Fasciitis) or stiff mid-portion Achilles tendon",
      "Medial shin soreness (Medial Tibial Stress Syndrome / Shin Splints) during speed/mileage build-ups",
      "Post-injury uncertainty on whether your knee, ankle, or shoulder is truly ready for competitive play",
    ],
    whenToSeeSpecialist: [
      "Any running pain that alters your stride or lingers >24 hours after a run",
      "Before returning to football, badminton, basketball, or marathon training after an injury",
    ],
    rehabRoadmap: {
      phase1: "Tendon isometric pain relief, training volume smart-modification (avoiding zero-activity deconditioning).",
      phase2: "Heavy Slow Resistance (soleus, quads, glute medius) + cadence/stride biomechanics tuning.",
      phase3: "Structured walk-run progression, plyometric stiffness, and objective Return-to-Sport testing.",
    },
    recoveryTimelineNote: "Most runners resume modified pain-managed running within 1–3 weeks alongside progressive S&C.",
  },
  {
    slug: "strength-and-conditioning-sports-injury",
    title: "Sports Injuries (Strains, Cramps, Tightness) & Clinical S&C",
    shortTitle: "Sports Injury & S&C",
    specialtySlug: "sports-running-rehabilitation",
    specialtyLabel: "Sports & Running Rehab",
    specialistBadge: "MPT (Sports Specialist)",
    bodyArea: "Muscles, Tendons & Athletic Power",
    heroImage: "/images/sports-onfield-assessment.jpg",
    summary:
      "Rapid rehabilitation for hamstring/calf/groin muscle strains, recurring cramps, chronic tightness, ankle sprains, and rehab-integrated Strength & Conditioning (S&C).",
    clinicalExplanation:
      "Why do hamstring strains, calf pulls, and chronic muscle tightness keep coming back? Because passive stretching and massage feel good for 24 hours, while true protection comes from eccentric muscle length-tension strength! Remember: muscles often feel 'tight' because they are overworked and weak—our MPT Sports specialists combine targeted myofascial release with progressive S&C to end the injury cycle permanently.",
    commonSymptoms: [
      "Sudden hamstring, calf, quad, or groin pull during sprinting, lunging, or kicking",
      "Recurring exercise-associated muscle cramps or persistent hamstring/hip-flexor tightness",
      "Lateral ankle sprains, tennis/golfer's elbow, or gym lifting strains",
    ],
    whenToSeeSpecialist: [
      "Within 24–72 hours of an acute muscle strain or ankle sprain (PEACE & LOVE protocol beats prolonged ice/rest!)",
      "If you stretch constantly yet still feel tight or suffer repeat pulls every season",
    ],
    rehabRoadmap: {
      phase1: "Protected optimal loading, soft-tissue mobilization, swelling control & pain-free activation.",
      phase2: "Eccentric strengthening (Nordics, calf raises, Copenhagen planks) & kinetic-chain power.",
      phase3: "High-speed sprint exposure, reactive agility, and sport-specific Strength & Conditioning.",
    },
    recoveryTimelineNote: "Grade I strains: 2–3 weeks | Grade II strains: 4–8 weeks with eccentric remodeling.",
  },
  {
    slug: "cerebral-palsy-pediatric-rehab",
    title: "Cerebral Palsy (CP) Pediatric Physiotherapy",
    shortTitle: "Cerebral Palsy (CP)",
    specialtySlug: "pediatric-rehabilitation",
    specialtyLabel: "Pediatric Rehabilitation",
    specialistBadge: "MPT (Pediatric Specialist)",
    bodyArea: "Pediatric Neuro-Motor",
    heroImage: "/images/pediatric-balance-milestone-rehab.jpg",
    summary:
      "Playful, evidence-based NDT, gait optimization, spasticity management, and functional independence therapy for children with Cerebral Palsy.",
    clinicalExplanation:
      "Every child with Cerebral Palsy (spastic diplegia, hemiplegia, dyskinetic, or ataxic) has tremendous potential for motor learning and joyful independence. Our MPT Pediatric specialists partner closely with parents, pediatric neurologists, and orthotists—focusing on active task-oriented movement, hip/ankle alignment during growth, and confident mobility at home and school.",
    commonSymptoms: [
      "Delayed sitting, crawling, or standing milestones with stiff (spastic) or fluctuating muscle tone",
      "Scissoring legs, persistent toe-walking, crouch gait, or asymmetric preference for one hand",
      "Balance challenges on uneven ground or fatigue during play",
    ],
    whenToSeeSpecialist: [
      "As early as infancy upon NICU follow-up or developmental concern—early neuroplasticity is powerful",
      "During childhood growth spurts or post-Botox/orthopedic intervention to lock in functional gains",
    ],
    rehabRoadmap: {
      phase1: "Postural alignment, gentle active muscle elongation, trunk control & AFO/seating review.",
      phase2: "Task-oriented sit-to-stand, balance dome circuits, bilateral hand play & gait training.",
      phase3: "School & playground participation, endurance, and parent-embedded daily routines.",
    },
    recoveryTimelineNote: "Goal-focused 8–12 week developmental blocks celebrating clear functional milestones.",
  },
  {
    slug: "autism-gdd-developmental-therapy",
    title: "Autism (ASD) & Global Developmental Delay (GDD) Motor Therapy",
    shortTitle: "Autism & GDD Rehab",
    specialtySlug: "pediatric-rehabilitation",
    specialtyLabel: "Pediatric Rehabilitation",
    specialistBadge: "MPT (Pediatric Specialist)",
    bodyArea: "Pediatric Sensory-Motor",
    heroImage: "/images/pediatric-balance-milestone-rehab.jpg",
    summary:
      "Warm, sensory-attuned pediatric physiotherapy for Global Developmental Delay (GDD) milestones and Autism Spectrum gross-motor coordination, balance & body awareness.",
    clinicalExplanation:
      "Many children on the Autism Spectrum experience hypotonia (low muscle tone), toe-walking, dyspraxia (motor planning difficulty), and vestibular/proprioceptive seeking—while infants and toddlers with GDD need structured, encouraging facilitation to unlock rolling, sitting, crawling, and walking. Our MPT Pediatric specialists make every home session feel like their favorite play hour.",
    commonSymptoms: [
      "Delayed head control, rolling, unsupported sitting, crawling, or first independent steps (GDD)",
      "Clumsiness, frequent tripping, difficulty jumping/catching a ball, or core slouching",
      "Habitual idiopathic or sensory toe-walking and low postural stamina",
    ],
    whenToSeeSpecialist: [
      "Whenever gross motor milestones lag behind pediatric age charts",
      "Alongside speech/occupational therapy in ASD to build core stability, regulation, and playground skills",
    ],
    rehabRoadmap: {
      phase1: "Sensory-safe rapport, core postural activation, ankle flexibility, and midline play.",
      phase2: "Sequential milestone transitions, obstacle course motor planning, and balance pods.",
      phase3: "Jumping, running, ball skills, tricycle/stairs mastery & confident peer play.",
    },
    recoveryTimelineNote: "Visible posture, engagement, and milestone momentum typically emerge within 3–6 weeks.",
  },
  {
    slug: "spina-bifida-hydrocephalus-muscular-dystrophy",
    title: "Spina Bifida, Hydrocephalus & Muscular Dystrophy Pediatric Rehab",
    shortTitle: "Spina Bifida, Hydrocephalus & MD",
    specialtySlug: "pediatric-rehabilitation",
    specialtyLabel: "Pediatric Rehabilitation",
    specialistBadge: "MPT (Pediatric Specialist)",
    bodyArea: "Pediatric Specialized Care",
    heroImage: "/images/pediatric-balance-milestone-rehab.jpg",
    summary:
      "Specialized pediatric neurological & neuromuscular physiotherapy for Spina Bifida, post-shunt Hydrocephalus balance, and Muscular Dystrophy functional preservation.",
    clinicalExplanation:
      "Complex pediatric conditions require deep specialist precision: in Spina Bifida and Hydrocephalus, we build upper-trunk strength, head/postural equilibrium, and orthotic-assisted mobility; in Muscular Dystrophy (such as Duchenne/Becker), we strictly avoid eccentric muscle-damaging overload—using gentle sub-maximal play, respiratory exercises, and contracture prevention to preserve walking and quality of life.",
    commonSymptoms: [
      "Lower-limb weakness or sensory loss requiring targeted strengthening and orthotic gait in Spina Bifida",
      "Head control, visual-motor balance, and milestone delays following Hydrocephalus management",
      "Gowers' sign (using hands on thighs to stand), calf pseudohypertrophy, or fatigue in Muscular Dystrophy",
    ],
    whenToSeeSpecialist: [
      "Early multidisciplinary coordination alongside your child's pediatric neurologist/neurosurgeon",
      "For safe, infection-free home care in Bangalore tailored to your child's exact energy levels",
    ],
    rehabRoadmap: {
      phase1: "Gentle joint symmetry, respiratory play, head/trunk balance, and family handling guidance.",
      phase2: "Condition-specific functional mobility, orthotic standing/walking, and safe play endurance.",
      phase3: "Long-term growth monitoring, ergonomic comfort, and joyful daily participation.",
    },
    recoveryTimelineNote: "Ongoing compassionate specialist partnership adapted at every developmental stage.",
  },
  {
    slug: "antenatal-postnatal-pregnancy-rehab",
    title: "Antenatal (Prenatal) & Postnatal (Postpartum) Rehabilitation",
    shortTitle: "Antenatal & Postnatal Care",
    specialtySlug: "womens-health-pelvic-rehabilitation",
    specialtyLabel: "Women's Health & OBG Rehab",
    specialistBadge: "MPT (Women's Health Specialist)",
    bodyArea: "Maternal Core, Spine & Pelvis",
    heroImage: "/images/womens-health-antenatal-rehab.jpg",
    summary:
      "Trimester-safe pregnancy pain relief & labor mobility preparation, followed by structured postpartum core, C-section scar, and diastasis recti recovery.",
    clinicalExplanation:
      "During pregnancy (antenatal), shifting center of gravity and relaxin hormone often trigger Pelvic Girdle Pain (PGP), sciatica, and rib/back ache—all highly treatable without medication! Post-delivery (postnatal), whether vaginal or C-section, mothers deserve structured rehabilitation just like any major athletic event to heal abdominal separation (diastasis recti), C-section scar adhesions, and feeding-related neck/back strain.",
    commonSymptoms: [
      "Pregnancy sacroiliac (SI joint), pubic symphysis, lower back, or wrist carpal tunnel pain",
      "Postpartum abdominal doming/gap (Diastasis Recti) or core weakness lifting your baby",
      "C-section scar numbness, pulling tightness, or upper-back/neck pain from nursing postures",
    ],
    whenToSeeSpecialist: [
      "From the 2nd trimester (with OB-GYN clearance) for pain-free pregnancy & birth preparation",
      "Postpartum—early gentle comfort from week 2–3, and full core/pelvic check from 6 weeks onward (even years later!)",
    ],
    rehabRoadmap: {
      phase1: "Pain relief, 360° diaphragmatic breathing, gentle pelvic alignment & feeding ergonomics.",
      phase2: "Deep transverse abdominis & glute restoration, diastasis tensioning & scar mobility.",
      phase3: "Full return to strength workouts, yoga, running, and active pain-free motherhood.",
    },
    recoveryTimelineNote: "Immediate postural relief; progressive core & pelvic rebuilding over 6–12 weeks.",
  },
  {
    slug: "pelvic-floor-rehabilitation",
    title: "Pelvic Floor Rehabilitation & Core Dysfunction",
    shortTitle: "Pelvic Floor Rehab",
    specialtySlug: "womens-health-pelvic-rehabilitation",
    specialtyLabel: "Women's Health & OBG Rehab",
    specialistBadge: "MPT (Women's Health Specialist)",
    bodyArea: "Pelvic Floor & Deep Core",
    heroImage: "/images/womens-health-antenatal-rehab.jpg",
    summary:
      "Confidential, evidence-based pelvic floor physiotherapy for stress urinary leakage, urgency, pelvic heaviness/prolapse support, and pelvic pain.",
    clinicalExplanation:
      "Up to 1 in 3 women experience urinary leakage while coughing, sneezing, laughing, jumping, or running—it is common, NOT normal, and has an 80%+ success rate with specialist pelvic floor physiotherapy! Crucially, some women have an underactive pelvic floor needing strength, while others have a tense/overactive pelvic floor needing relaxation first. Our MPT Women's Health specialist tailors your exact program privately.",
    commonSymptoms: [
      "Leakage of urine during coughing, sneezing, laughing, lifting, or running (Stress Incontinence)",
      "Sudden frequent urges to rush to the restroom or feeling of pelvic heaviness/dragging",
      "Deep pelvic, tailbone (coccydynia), or lower abdominal discomfort",
    ],
    whenToSeeSpecialist: [
      "At the first sign of leakage or pelvic heaviness—whether postpartum, athletic, or perimenopausal",
      "Before resuming high-impact HIIT, badminton, or marathon running after childbirth",
    ],
    rehabRoadmap: {
      phase1: "Private symptom assessment, rib-diaphragm-pelvic floor coordination & relaxation/lift cueing.",
      phase2: "Endurance & quick-flick reflex pelvic contractions integrated into squats, lifts & coughs ('The Knack').",
      phase3: "Impact & load testing so you laugh, sneeze, lift, and run with 100% confidence.",
    },
    recoveryTimelineNote: "Significant symptom reduction typically achieved within 4–8 weeks of guided practice.",
  },
];

export function getConditionBySlug(slug: string): ConditionItem | undefined {
  return CONDITIONS.find((c) => c.slug === slug);
}

export function getConditionsBySpecialty(specialtySlug: string): ConditionItem[] {
  return CONDITIONS.filter((c) => c.specialtySlug === specialtySlug);
}

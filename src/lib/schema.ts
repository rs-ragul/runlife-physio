import { SITE_CONFIG } from "@/config/site";
import { SPECIALTIES } from "@/data/specialties";
import { joinCitiesNatural } from "@/lib/cities";
import { DEFAULT_SITE_SETTINGS } from "@/lib/cmsDefaults";

export function buildMedicalOrganizationSchema(
  citiesInput?: { id: string; name: string; areas: string[]; active: boolean }[]
) {
  const activeCities =
    citiesInput && citiesInput.length > 0
      ? citiesInput.filter((c) => c.active && c.name.trim())
      : DEFAULT_SITE_SETTINGS.serviceCities.filter((c) => c.active && c.name.trim());
  const citiesLabel = joinCitiesNatural(activeCities);
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalBusiness", "MedicalClinic", "LocalBusiness"],
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: SITE_CONFIG.legalName,
    slogan: SITE_CONFIG.tagline,
    description: `Runlife Physio is a specialized MPT Physiotherapy Network in ${citiesLabel} led by Dr. Vishal S, PT — MPT (Neurology & Neurosurgery), MIAP Reg. No. L-60915 — providing Home Care Physiotherapy, Virtual Tele-Rehabilitation, Online Consultations, and By-Appointment sessions across Orthopedic, Neurological, Sports & Running, Pediatric, and Women's Health Rehabilitation.`,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/runlife-logo-card.jpg`,
    image: `${SITE_CONFIG.url}/images/og-image.png`,
    telephone: SITE_CONFIG.contact.phoneE164,
    email: SITE_CONFIG.contact.email,
    priceRange: "₹₹",
    founder: {
      "@type": "Person",
      name: SITE_CONFIG.founder.name,
      jobTitle: SITE_CONFIG.founder.role,
      description: `Dr. Vishal S, PT — MPT (Neurology & Neurosurgery), MIAP Reg. No. L-60915. Founder & Clinical Lead, Runlife Physio (REHAB · RECOVER · RUN), ${citiesLabel}.`,
      image: `${SITE_CONFIG.url}/images/profiles/dr-vishal.jpg`,
      url: `${SITE_CONFIG.url}/about`,
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "degree",
          name: "MPT (Neurology & Neurosurgery)",
        },
        {
          "@type": "EducationalOccupationalCredential",
          credentialCategory: "license",
          name: "MIAP Reg. No. L-60915",
          identifier: "L-60915",
        },
      ],
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE_CONFIG.location.primaryCity,
      addressRegion: SITE_CONFIG.location.state,
      addressCountry: SITE_CONFIG.location.countryCode,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.location.coordinates.latitude,
      longitude: SITE_CONFIG.location.coordinates.longitude,
    },
    areaServed: [
      ...Array.from(
        new Set([
          ...activeCities.map((c) => c.name.trim()),
          // "Bengaluru" is the official name for Bangalore — helps local search
          ...activeCities.some((c) => c.name.trim() === "Bangalore")
            ? ["Bengaluru"]
            : [],
        ])
      ).map((city) => ({ "@type": "City" as const, name: city })),
      { "@type": "Country" as const, name: "India" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "07:00",
        closes: "21:00",
      },
    ],
    medicalSpecialty: [
      "Physiotherapy",
      "Musculoskeletal",
      "Neurologic",
      "Pediatric",
      "Obstetric",
      "SportsMedicine",
    ],
    availableService: SPECIALTIES.map((s) => ({
      "@type": "MedicalTherapy",
      name: s.title,
      description: s.shortDescription,
      url: `${SITE_CONFIG.url}/services/${s.slug}`,
    })),
  };
}

export function buildFaqSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(
  items: { name: string; path: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

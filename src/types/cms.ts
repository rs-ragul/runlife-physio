export interface HeroStatItem {
  value: string;
  label: string;
}

export interface DynamicSiteSettings {
  // Brand & Top Banner
  clinicName: string;
  tagline: string;
  announcementEnabled: boolean;
  announcementText: string;

  // Hero Customization
  heroBadgeText: string;
  heroTitlePrimary: string;
  heroTitleHighlight: string;
  heroSubtitle: string;
  primaryCtaText: string;
  heroStats: HeroStatItem[];

  // Contact & Operations
  phoneDisplay: string;
  phoneE164: string;
  whatsappNumber: string;
  whatsappGreeting: string;
  email: string;
  operatingHours: string;
  callbackPromise: string;
  consultationFeeNote: string;

  // Founder & Location
  founderName: string;
  founderCredentials: string;
  founderRole: string;
  founderBio: string;
  primaryCity: string;
  physicalClinicAddress: string;
  googleMapsUrl: string;
  serviceAreasSummary: string;

  // Social & External Review Links
  instagramUrl: string;
  youtubeUrl: string;
  linkedinUrl: string;
  facebookUrl: string;
  googleReviewUrl: string;

  // Feature / Section Visibility Toggles
  showSmartCareQuiz: boolean;
  showTeamSection: boolean;
  showTestimonialsSection: boolean;
  showBlogSection: boolean;
  showJoinNetworkForm: boolean;
  showFloatingWhatsApp: boolean;

  updatedAt?: string;
}

export interface TestimonialItem {
  id: string;
  patientName: string;
  context: string;
  specialty: string;
  rating: number;
  quote: string;
  published: boolean;
  createdAt: string;
}

export interface TeamMemberItem {
  id: string;
  name: string;
  credential: string;
  role: string;
  department: string;
  experience: string;
  bio: string;
  image?: string;
  registration?: string;
  extraCertifications?: string;
  published: boolean;
  createdAt: string;
}

export interface CustomBlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  specialistTag: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image: string;
  bodyParagraphs: string[];
  keyTakeaway: string;
  published: boolean;
}

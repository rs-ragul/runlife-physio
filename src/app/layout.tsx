import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import "./globals.css";
import { SITE_CONFIG } from "@/config/site";
import { SiteCmsProvider } from "@/context/SiteSettingsContext";
import { BookingModalProvider } from "@/context/BookingModalContext";
import { TopUtilityBar } from "@/components/layout/TopUtilityBar";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FloatingActionDock } from "@/components/layout/FloatingActionDock";
import { TouchAndNetworkFeedback } from "@/components/layout/TouchAndNetworkFeedback";
import { BookingDrawerModal } from "@/components/booking/BookingDrawerModal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMedicalOrganizationSchema } from "@/lib/schema";
import { getServerCities, getServerCitiesLabel } from "@/lib/serverCities";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DEFAULT_SITE_SETTINGS } from "@/lib/cmsDefaults";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

// City changes made in /admin must reach page metadata (titles, descriptions,
// schema, sitemap wording) without a redeploy. Every page revalidates in the
// background at most once every 5 minutes — cheap on Vercel's free Hobby tier.
export const revalidate = 300;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F1D35",
};

export async function generateMetadata(): Promise<Metadata> {
  const cities = (await getServerCitiesLabel()) || DEFAULT_SITE_SETTINGS.primaryCity;
  const cityKeywords = (await getServerCities()).filter(
    (c) => c.active && c.name.trim()
  );
  return {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `Runlife Physio ${cities} | Specialized MPT Physiotherapy — Home Care, Tele-Rehab & Sports`,
    template: `%s | Runlife Physio ${cities}`,
  },
  description:
      `Runlife Physio (REHAB · RECOVER · RUN) is ${cities}'s specialized MPT Physiotherapy Network led by Dr. Vishal S, PT — MPT (Neurology & Neurosurgery), MIAP Reg. No. L-60915. Dedicated Ortho, Neuro, Sports & Running, Pediatric, and Women's Health MPT Specialists—at Home, Virtual Tele-Rehab, or By Appointment.`,
  keywords: [
    "Runlife Physio",
    ...cityKeywords.flatMap((c) => [
      `Physiotherapy in ${c.name}`,
      `Home Physiotherapy ${c.name}`,
      `Sports Physiotherapy ${c.name}`,
      `Neuro Rehabilitation at Home ${c.name}`,
      `Pediatric Physiotherapy ${c.name}`,
    ]),
    "Tele Rehabilitation India",
    "Dr Vishal Physiotherapist",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `Runlife Physio | Specialized MPT Physiotherapy Network — ${cities} & Online`,
    description: `REHAB · RECOVER · RUN — Dedicated MPT Specialists in Orthopedics, Neurology, Sports, Pediatrics & Women's Health. Home Visits across ${cities} & Live Tele-Rehab.`,
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: `Runlife Physio — Specialized MPT Physiotherapy Network in ${cities}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Runlife Physio | Specialized MPT Physiotherapy Network",
    description:
      `Ortho • Neuro • Sports • Pediatric • Women's Health MPT Specialists in ${cities} & Online.`,
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      }
    : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schemaCities = await getServerCities();
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased overflow-x-hidden">
        <JsonLd data={buildMedicalOrganizationSchema(schemaCities)} />
        <SiteCmsProvider>
          <BookingModalProvider>
            <TouchAndNetworkFeedback />
            <TopUtilityBar />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <FloatingActionDock />
            <BookingDrawerModal />
          </BookingModalProvider>
        </SiteCmsProvider>

        {/* Vercel Speed Insights — real-user Core Web Vitals.
            Free on the Hobby plan, no config needed once deployed. */}
        <SpeedInsights />
      </body>
    </html>
  );
}

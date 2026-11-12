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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F1D35",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default:
      "Runlife Physio Bangalore | Specialized MPT Physiotherapy — Home Care, Tele-Rehab & Sports",
    template: "%s | Runlife Physio Bangalore",
  },
  description:
    "Runlife Physio (REHAB · RECOVER · RUN) is Bangalore's specialized MPT Physiotherapy Network led by Dr. Vishal (PT). Dedicated Ortho, Neuro, Sports & Running, Pediatric, and Women's Health MPT Specialists—at Home in Bangalore, Virtual Tele-Rehab, or By Appointment.",
  keywords: [
    "Runlife Physio",
    "Physiotherapy in Bangalore",
    "Home Physiotherapy Bangalore",
    "Sports Physiotherapy Bangalore",
    "ACL Rehab Bangalore",
    "Running Injury Physiotherapist Bangalore",
    "Stroke Neuro Rehabilitation at Home Bangalore",
    "Pediatric Physiotherapy Bangalore",
    "Pelvic Floor Postnatal Physiotherapy Bangalore",
    "Tele Rehabilitation India",
    "Dr Vishal Physiotherapist Bangalore",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title:
      "Runlife Physio | Specialized MPT Physiotherapy Network — Bangalore & Online",
    description:
      "REHAB · RECOVER · RUN — Dedicated MPT Specialists in Orthopedics, Neurology, Sports, Pediatrics & Women's Health. Home Visits across Bangalore & Live Tele-Rehab.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Runlife Physio — Specialized MPT Physiotherapy Network in Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Runlife Physio | Specialized MPT Physiotherapy Network",
    description:
      "Ortho • Neuro • Sports • Pediatric • Women's Health MPT Specialists in Bangalore & Online.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={`${jakarta.variable} ${outfit.variable}`}>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900 antialiased overflow-x-hidden">
        <JsonLd data={buildMedicalOrganizationSchema()} />
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
      </body>
    </html>
  );
}

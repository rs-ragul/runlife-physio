# Runlife Physio — Specialist Network Physiotherapy Platform (V2 Dynamic CMS + Mobile-First)

**REHAB · RECOVER · RUN**  
**Clinical Founder:** Dr. Vishal (PT)  
**Primary Hub:** Bangalore Specialist Network (Home Care • Online Video Consultation • Virtual Tele-Rehab • By-Appointment Visits)  
**Contact:** `+91 91876 79723` | `runlifephysio@gmail.com`

---

## Key Highlights

1. **Mobile-First Patient UX**:
   - Thumb-friendly `44px–52px` touch targets, `16px` mobile form inputs (preventing iOS/Android browser auto-zoom), express 3-tap booking flow, mobile bottom-sheet drawer, horizontal pill body-map selector, and safe-area sticky bottom CTA dock.
2. **Zero Fake / Placeholder Data**:
   - Zero fake reviews, zero seeded fake bookings, and zero unverified claims. Testimonials section automatically hides until real verified patient stories are published in `/admin`.
3. **Complete Dynamic Admin & CMS (`/admin`)**:
   - **Appointments CRM**: Search/filter, 1-click Call & WhatsApp, status workflow, internal clinical notes, manual phone/walk-in logging, CSV export.
   - **Inquiries & MPT Recruitment**: View/reply/delete patient questions and MPT doctor applications.
   - **Live Website Customizer**: Edit top announcement banner, hero headlines & 4 trust stat cards, phone/WhatsApp/email/working hours/fee notes, founder credentials & bio, physical clinic address & Google Maps URL, social/Google review URLs, and 7 section visibility toggles—live without touching code.
   - **Testimonials, Team & Blog Publishers**: Add/publish/hide/delete verified patient reviews, MPT specialist doctors, and custom clinical guides directly from `/admin`.
   - **Backend Diagnostics**: 1-click live API & persistence health check.
4. **100% Free-Tier Production Stack**:
   - Next.js 16 (App Router + TypeScript + Tailwind v4) on **Vercel Free Tier**
   - **Firebase Spark Plan (Free Tier)**: Cloud Firestore (`site_settings`, `testimonials`, `team_members`, `blog_posts`, `appointments`, `inquiries`) + Firebase Email/Password Auth
   - **Free Email Alerts**: Gmail SMTP (`GMAIL_APP_PASSWORD`) or Resend free tier (`RESEND_API_KEY`) to `runlifephysio@gmail.com`

---

## Quick Deployment Guide (GitHub → Vercel → Firebase → Google Search Console)

### 1. Local Development
```bash
npm install
cp .env.example .env.local
npm run dev
```
*(In local preview mode before adding Firebase keys, `/admin` unlocks with preview PIN `runlife2026` and persists cleanly via `/api/cms`, `/api/appointments`, and `/api/contact`.)*

### 2. Firebase Free Tier Setup (Spark Plan — ₹0/month)
1. Go to [Firebase Console](https://console.firebase.google.com/) → **Create a Project** (stay on Spark Free Plan).
2. Enable **Cloud Firestore** (`asia-south1` Mumbai) and paste the contents of `firestore.rules` into **Firestore → Rules → Publish**.
3. Enable **Authentication → Sign-in method → Email/Password** and add `runlifephysio@gmail.com`.
4. Copy your Web App SDK config values from **Project Settings → Your Apps**.

### 3. Deploy to Vercel
1. Push this repository to GitHub and import into [Vercel](https://vercel.com/new).
2. Add the environment variables from `.env.example` (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_FIREBASE_*`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`) and click **Deploy**.

### 4. Submit to Google Search Console
1. Add your domain in [Google Search Console](https://search.google.com/search-console).
2. Submit `/sitemap.xml` (`https://yourdomain.com/sitemap.xml`) to index all 40+ static clinical & condition pages.

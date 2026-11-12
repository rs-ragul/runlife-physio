# Runlife Physio — GitHub + Firebase Free Tier + Vercel + Google Indexing Playbook

This guide is tailored to your exact launch workflow:
**Extract ZIP → Push to GitHub → Firebase Free Setup → Deploy on Vercel → Index on Google Search Console.**

---

## Step 1: Extract ZIP & Push to GitHub

```bash
unzip runlife-physio-website.zip -d runlife-physio
cd runlife-physio
git init
git add .
git commit -m "Initial launch: Runlife Physio full-stack Next.js + Firebase + SEO platform"
git branch -M main
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/runlife-physio.git
git push -u origin main
```

---

## Step 2: Set Up Firebase Spark Plan (100% Free — ₹0/mo, No Credit Card Needed)

1. Go to **[https://console.firebase.google.com](https://console.firebase.google.com)** (sign in with `runlifephysio@gmail.com` or your Google account).
2. Click **Create a project** → Name it `runlife-physio` → Disable Google Analytics if you want 1-click setup → **Create Project**. *(Stays on **Spark Free Plan** automatically!)*
3. **Register Web App:**
   - On Project Overview, click the **`</>` (Web)** icon → App nickname: `Runlife Website` → Click **Register app**.
   - Copy the 6 values from `firebaseConfig` (`apiKey`, `authDomain`, `projectId`, `storageBucket`, `messagingSenderId`, `appId`).
4. **Enable Cloud Firestore (Free Database):**
   - Left sidebar → **Build → Firestore Database** → **Create database** → Choose location `asia-south1 (Mumbai)` (fastest for Bangalore!) → Start in **Production mode** → **Create**.
   - Click the **Rules** tab, paste the exact contents of `firestore.rules` from this repo, and click **Publish**.
5. **Enable Firebase Authentication (For `/admin` Doctor Portal):**
   - Left sidebar → **Build → Authentication** → **Get started**.
   - Enable **Google** sign-in (and/or **Email/Password** — add `runlifephysio@gmail.com` under the *Users* tab if using password login).
   - Once your Vercel domain is live, go to **Authentication → Settings → Authorized domains** and add your Vercel/custom domain (e.g., `runlifephysio.vercel.app` and `www.runlifephysio.com`).

---

## Step 3: Deploy on Vercel (100% Free Hobby Plan)

1. Go to **[https://vercel.com/new](https://vercel.com/new)** → Import your `runlife-physio` GitHub repository.
2. Under **Environment Variables**, add the variables from `.env.example`:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://www.runlifephysio.com` *(or your `https://your-project.vercel.app` URL initially)* |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | From Firebase Web App config |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `your-project-id` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `your-project.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Numeric sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:...:web:...` |
| `NEXT_PUBLIC_ADMIN_EMAILS` | `runlifephysio@gmail.com` |
| `GMAIL_USER` *(Optional Free Email Alerts)* | `runlifephysio@gmail.com` |
| `GMAIL_APP_PASSWORD` *(Optional)* | 16-char Google App Password (from Google Account → Security → 2-Step Verification → App Passwords) |

3. Click **Deploy**!
   - *(Note: Even if you click Deploy BEFORE adding Firebase keys, the site builds cleanly with zero errors and runs in Preview Sandbox mode!)*

---

## Step 4: Google Search Console & Fast Google Indexing

Your website already auto-generates:
- **`/sitemap.xml`** — All 35+ static, MPT Specialty, Condition, Bangalore Local SEO, and Blog URLs!
- **`/robots.txt`** — Allows Googlebot on all public pages and protects `/admin` & `/api/`.
- **Server-Rendered Schema.org JSON-LD** — `MedicalBusiness`, `MedicalClinic`, `FAQPage`, `Article`, `MedicalWebPage`, and `BreadcrumbList`.

### How to Index on Google in 5 Minutes:
1. Open **[Google Search Console](https://search.google.com/search-console)** → **Add Property**.
   - **Option A (Custom Domain — Recommended):** Choose **Domain** (`runlifephysio.com`) and add the TXT record in your domain DNS.
   - **Option B (HTML Tag Method — Works on `.vercel.app` too!):** Choose **URL Prefix**, select **HTML tag**, copy ONLY the `content="..."` code, paste it into Vercel Env Vars as `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, redeploy, and click **Verify**!
2. In Search Console left menu → click **Sitemaps** → Enter `sitemap.xml` → Click **Submit**.
3. Use the top **URL Inspection** bar on these 5 priority URLs and click **Request Indexing**:
   - `/` (Homepage)
   - `/services`
   - `/conditions`
   - `/bangalore`
   - `/book`
4. **Bonus Local SEO Boost:** Create/link **Google Business Profile** for *Runlife Physio (Bangalore)* using `+91 91876 79723` and set the Appointment URL to `https://<your-domain>/book`.

---

## Where to Edit Clinic Info Later (1 File!)
Open `src/config/site.ts` to update:
- Physical clinic address in Bangalore (whenever Dr. Vishal opens a physical studio)
- Phone / WhatsApp number or operating hours
- Additional doctor / founder bio details

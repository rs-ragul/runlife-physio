import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.apiKey !== "your-api-key"
);

let appInstance: FirebaseApp | null = null;
let dbInstance: Firestore | null = null;
let authInstance: Auth | null = null;

export function getFirebaseClient(): {
  app: FirebaseApp | null;
  db: Firestore | null;
  auth: Auth | null;
} {
  if (!isFirebaseConfigured) {
    return { app: null, db: null, auth: null };
  }
  try {
    appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    dbInstance = getFirestore(appInstance);
    authInstance = getAuth(appInstance);
    return { app: appInstance, db: dbInstance, auth: authInstance };
  } catch (err) {
    console.error("Firebase initialization warning:", err);
    return { app: null, db: null, auth: null };
  }
}

export const googleProvider = new GoogleAuthProvider();

export function isAuthorizedAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  const rawAllowed =
    process.env.NEXT_PUBLIC_ADMIN_EMAILS || "runlifephysio@gmail.com";
  const allowedList = rawAllowed
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  return allowedList.includes(email.trim().toLowerCase());
}

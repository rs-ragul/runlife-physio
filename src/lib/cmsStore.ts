import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { getFirebaseClient, isFirebaseConfigured } from "@/lib/firebase";
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TEAM_MEMBERS,
} from "@/lib/cmsDefaults";
import type {
  DynamicSiteSettings,
  TestimonialItem,
  TeamMemberItem,
  CustomBlogItem,
} from "@/types/cms";


async function cmsFetch(
  input: string,
  init?: RequestInit
): Promise<Record<string, unknown>> {
  const res = await fetch(input, init);
  if (!res.ok) {
    let detail = "";
    try {
      const body = await res.json();
      detail = String(body?.error || "");
    } catch {
      detail = "";
    }
    throw new Error(detail || `Server responded ${res.status}`);
  }
  return res.json();
}

export interface FullCmsPayload {
  siteSettings: DynamicSiteSettings;
  testimonials: TestimonialItem[];
  teamMembers: TeamMemberItem[];
  customBlogs: CustomBlogItem[];
}

export async function fetchFullCmsClient(): Promise<FullCmsPayload> {
  const { db } = getFirebaseClient();

  if (isFirebaseConfigured && db) {
    try {
      const [settingsSnap, revSnap, teamSnap, blogSnap] = await Promise.all([
        getDoc(doc(db, "site_settings", "main")),
        getDocs(query(collection(db, "testimonials"), orderBy("createdAt", "desc"))),
        getDocs(query(collection(db, "team_members"), orderBy("createdAt", "asc"))),
        getDocs(query(collection(db, "blog_posts"), orderBy("publishedAt", "desc"))),
      ]);

      const siteSettings: DynamicSiteSettings = settingsSnap.exists()
        ? {
            ...DEFAULT_SITE_SETTINGS,
            ...(settingsSnap.data() as Partial<DynamicSiteSettings>),
          }
        : DEFAULT_SITE_SETTINGS;

      const testimonials: TestimonialItem[] = revSnap.docs.map((d) => ({
        ...(d.data() as TestimonialItem),
        id: d.id,
      }));

      const teamMembers: TeamMemberItem[] =
        teamSnap.docs.length > 0
          ? teamSnap.docs.map((d) => ({
              ...(d.data() as TeamMemberItem),
              id: d.id,
            }))
          : DEFAULT_TEAM_MEMBERS;

      const customBlogs: CustomBlogItem[] = blogSnap.docs.map((d) => ({
        ...(d.data() as CustomBlogItem),
        id: d.id,
      }));

      return { siteSettings, testimonials, teamMembers, customBlogs };
    } catch (err) {
      console.warn("Firestore CMS read fallback:", err);
    }
  }

  const res = await fetch("/api/cms", { cache: "no-store" });
  const data = await res.json();
  return {
    siteSettings: { ...DEFAULT_SITE_SETTINGS, ...(data.siteSettings || {}) },
    testimonials: data.testimonials || [],
    teamMembers: data.teamMembers || DEFAULT_TEAM_MEMBERS,
    customBlogs: data.customBlogs || [],
  };
}

export async function saveSiteSettingsClient(
  settings: DynamicSiteSettings
): Promise<DynamicSiteSettings> {
  const updated: DynamicSiteSettings = {
    ...settings,
    updatedAt: new Date().toISOString(),
  };
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, "site_settings", "main"), updated, { merge: true });
  }
  await fetch("/api/cms", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ siteSettings: updated }),
  });
  return updated;
}

export async function resetSiteSettingsClient(): Promise<DynamicSiteSettings> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, "site_settings", "main"), DEFAULT_SITE_SETTINGS);
  }
  await fetch("/api/cms", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reset: true }),
  });
  return { ...DEFAULT_SITE_SETTINGS };
}

// --- Testimonials CRUD ---
export async function createTestimonialClient(
  input: Omit<TestimonialItem, "id" | "createdAt">
): Promise<TestimonialItem> {
  const payload = {
    ...input,
    createdAt: new Date().toISOString(),
  };
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    const ref = await addDoc(collection(db, "testimonials"), payload);
    return { ...payload, id: ref.id };
  }
  const res = await fetch("/api/cms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity: "testimonial", item: payload }),
  });
  const data = await res.json();
  return data.item;
}

export async function updateTestimonialClient(
  id: string,
  updates: Partial<TestimonialItem>
): Promise<void> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, "testimonials", id), updates);
    return;
  }
  await fetch("/api/cms", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity: "testimonial", id, updates }),
  });
}

export async function deleteTestimonialClient(id: string): Promise<void> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "testimonials", id));
    return;
  }
  await fetch(`/api/cms?entity=testimonial&id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

// --- Team Members CRUD ---
export async function createTeamMemberClient(
  input: Omit<TeamMemberItem, "id" | "createdAt">
): Promise<TeamMemberItem> {
  const payload = {
    ...input,
    createdAt: new Date().toISOString(),
  };
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    const ref = await addDoc(collection(db, "team_members"), payload);
    return { ...payload, id: ref.id };
  }
  const data = await cmsFetch("/api/cms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity: "teamMember", item: payload }),
  });
  if (!data.item) {
    throw new Error("Server did not confirm the new specialist.");
  }
  return data.item as unknown as TeamMemberItem;
}

export async function updateTeamMemberClient(
  id: string,
  updates: Partial<TeamMemberItem>
): Promise<void> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    await setDoc(doc(db, "team_members", id), updates, { merge: true });
    return;
  }
  await cmsFetch("/api/cms", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity: "teamMember", id, updates }),
  });
}

export async function deleteTeamMemberClient(id: string): Promise<void> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "team_members", id));
    return;
  }
  await cmsFetch(
    `/api/cms?entity=teamMember&id=${encodeURIComponent(id)}`,
    { method: "DELETE" }
  );
}

// --- Custom Blog Posts CRUD ---
export async function createCustomBlogClient(
  input: Omit<CustomBlogItem, "id">
): Promise<CustomBlogItem> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    const ref = await addDoc(collection(db, "blog_posts"), input);
    return { ...input, id: ref.id };
  }
  const res = await fetch("/api/cms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity: "customBlog", item: input }),
  });
  const data = await res.json();
  return data.item;
}

export async function updateCustomBlogClient(
  id: string,
  updates: Partial<CustomBlogItem>
): Promise<void> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    await updateDoc(doc(db, "blog_posts", id), updates);
    return;
  }
  await fetch("/api/cms", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ entity: "customBlog", id, updates }),
  });
}

export async function deleteCustomBlogClient(id: string): Promise<void> {
  const { db } = getFirebaseClient();
  if (isFirebaseConfigured && db) {
    await deleteDoc(doc(db, "blog_posts", id));
    return;
  }
  await fetch(`/api/cms?entity=customBlog&id=${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

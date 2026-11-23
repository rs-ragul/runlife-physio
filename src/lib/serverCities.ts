import type { ServiceCityItem } from "@/types/cms";
import { DEFAULT_SITE_SETTINGS } from "@/lib/cmsDefaults";
import { isFirebaseConfigured } from "@/lib/firebase";
import { readDemoStore } from "@/lib/serverDemoStore";

/**
 * Server-side city lookup for page metadata (server components can't use the
 * client CMS context).
 *
 * `site_settings/main` is publicly readable in firestore.rules ("allow read:
 * if true"), so this uses the Firestore REST API instead of the web SDK — no
 * firebase-admin, no service account, still 100% free tier.
 *
 * If Firebase isn't configured, or the request fails for any reason, we fall
 * back to DEFAULT_SITE_SETTINGS so the build never breaks.
 */
export async function getServerCities(): Promise<ServiceCityItem[]> {
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

  // Local / preview without Firebase: mirror /api/cms and read the demo store.
  if (!projectId || !apiKey || !isFirebaseConfigured) {
    try {
      const store = readDemoStore();
      const cities = store.siteSettings?.serviceCities;
      if (Array.isArray(cities) && cities.length > 0) return cities;
    } catch {
      /* fall through to defaults */
    }
    return DEFAULT_SITE_SETTINGS.serviceCities;
  }

  try {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/site_settings/main?key=${apiKey}`;
    const res = await fetch(url, {
      // Cache for 5 minutes: new cities appear fast, and we don't hammer the API.
      next: { revalidate: 300 },
    });
    if (!res.ok) return DEFAULT_SITE_SETTINGS.serviceCities;

    const json = await res.json();
    const citiesField = json?.fields?.serviceCities?.arrayValue?.values;
    if (!Array.isArray(citiesField) || citiesField.length === 0) {
      return DEFAULT_SITE_SETTINGS.serviceCities;
    }

    const cities: ServiceCityItem[] = citiesField.map(
      (entry: Record<string, any>, index: number) => {
        const f = entry?.mapValue?.fields || {};
        return {
          id: f.id?.stringValue || `city-${index}`,
          name: f.name?.stringValue || "",
          areas: (f.areas?.arrayValue?.values || []).map(
            (a: Record<string, any>) => a?.stringValue || ""
          ),
          active: f.active?.booleanValue !== false,
        };
      }
    );

    const active = cities.filter((c) => c.active && c.name.trim());
    return active.length > 0 ? cities : DEFAULT_SITE_SETTINGS.serviceCities;
  } catch {
    return DEFAULT_SITE_SETTINGS.serviceCities;
  }
}

/** Ready-to-use metadata string, e.g. "Bangalore, Salem & Chennai". */
export async function getServerCitiesLabel(): Promise<string> {
  const cities = await getServerCities();
  return joinCitiesNaturalServer(cities);
}

/** Same rules as lib/cities.ts joinCitiesNatural, usable on the server. */
export function joinCitiesNaturalServer(cities: ServiceCityItem[]): string {
  const names = cities
    .filter((c) => c.active && c.name.trim())
    .map((c) => c.name.trim());
  if (names.length === 0) return DEFAULT_SITE_SETTINGS.serviceCities
    .filter((c) => c.active)
    .map((c) => c.name)
    .join(", ");
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

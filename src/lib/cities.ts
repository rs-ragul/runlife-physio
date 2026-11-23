import type { ServiceCityItem } from "@/types/cms";

/**
 * Single source of truth for how city names are written across the site.
 *
 * Cities are managed entirely from /admin → Website Customizer → Service
 * Cities. Nothing here is hardcoded to Bangalore/Salem — adding a city in the
 * admin instantly updates the navbar, hero, footer, schema and copy.
 */

/** Active cities only (the ones patients can actually book). */
export function getActiveCities(
  cities: ServiceCityItem[] | undefined
): ServiceCityItem[] {
  return (cities || []).filter((c) => c.active && c.name.trim());
}

/** "Bangalore & Salem & Chennai" → for sentences and labels. */
export function joinCities(
  cities: ServiceCityItem[] | undefined,
  separator = " & "
): string {
  const names = getActiveCities(cities).map((c) => c.name.trim());
  return names.join(separator);
}

/** "Bangalore, Salem & Chennai" → natural reading for 3+ cities. */
export function joinCitiesNatural(cities: ServiceCityItem[] | undefined): string {
  const names = getActiveCities(cities).map((c) => c.name.trim());
  if (names.length === 0) return "";
  if (names.length === 1) return names[0];
  if (names.length === 2) return `${names[0]} & ${names[1]}`;
  return `${names.slice(0, -1).join(", ")} & ${names[names.length - 1]}`;
}

/** "Home Visit (Bangalore, Salem & Chennai)" → booking care-mode label. */
export function homeVisitLabel(cities: ServiceCityItem[] | undefined): string {
  const joined = joinCitiesNatural(cities);
  return joined ? `Home Visit (${joined})` : "Home Visit";
}

/** Short nav / footer label: "Bangalore, Salem & Chennai". */
export function citiesShortLabel(cities: ServiceCityItem[] | undefined): string {
  return joinCitiesNatural(cities);
}

/**
 * Default city name for prefills and fallbacks.
 * Returns the first active city, or an empty string.
 */
export function defaultCityName(
  cities: ServiceCityItem[] | undefined,
  fallback = ""
): string {
  const first = getActiveCities(cities)[0];
  return first ? first.name.trim() : fallback;
}

/**
 * Lets admin-editable copy stay accurate as cities change.
 *
 * Any text field in the Website Customizer may contain the token `{cities}`.
 * It is replaced at render time with the live city list, e.g.
 *   "Serving {cities} • Home Physiotherapy"
 *   → "Serving Bangalore, Salem & Chennai • Home Physiotherapy"
 *
 * Adding or hiding a city in /admin therefore updates headline copy too,
 * with no code change and no need to retype the text.
 */
export function withCities(
  text: string | undefined,
  cities: ServiceCityItem[] | undefined
): string {
  if (!text) return "";
  if (!text.includes("{cities}")) return text;
  const label = joinCitiesNatural(cities);
  return label ? text.split("{cities}").join(label) : text.split("{cities}").join("");
}

/**
 * Navbar label. Shows the live city list while it stays short enough to sit on
 * one line; falls back to "Locations" once a lot of cities are added, so the
 * header never wraps or breaks layout.
 */
export function navCitiesLabel(
  cities: ServiceCityItem[] | undefined,
  maxLength = 26
): string {
  const label = joinCitiesNatural(cities);
  if (!label) return "Locations";
  return label.length <= maxLength ? label : "Locations";
}

/**
 * Rewrites city names out of older saved copy.
 *
 * Dr. Vishal's CMS already has announcement / subtitle text saved that was
 * written before cities became dynamic (e.g. "Serving Bangalore & Salem").
 * Since that stored text never contains the `{cities}` token, it would stay
 * stale forever. This detects a hardcoded city pair in the stored string and
 * swaps it for the live list, so old copy self-corrects without anyone having
 * to retype it in the admin panel.
 */
// There is deliberately NO hardcoded list of city names in this file. The
// vocabulary for cleanup comes from the CMS city list on every call, so adding
// a city in /admin automatically makes old copy recognise it.

/**
 * Repairs legacy saved copy that still names cities by hand, e.g. an
 * announcement saved as "Serving Bangalore & Salem" before cities were dynamic.
 *
 * The city vocabulary comes from the CMS, so this keeps working when new cities
 * are added. It only rewrites a *group* of two or more cities, so single-city
 * phrases like "Physiotherapy in Bangalore" are left alone.
 */
export function normalizeCityCopy(
  text: string | undefined,
  cities: ServiceCityItem[] | undefined
): string {
  if (!text) return "";

  const names = Array.from(
    new Set(
      getActiveCities(cities)
        .map((c) => c.name.trim())
        .filter(Boolean)
    )
  );
  const label = joinCitiesNatural(cities);
  if (names.length === 0 || !label) return text;

  // Longest first so "Tiruchirappalli" wins over a shorter prefix match.
  const escaped = names
    .sort((a, b) => b.length - a.length)
    .map((n) => n.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));

  const group = new RegExp(
    `\b(?:${escaped.join("|")})(?:\s*(?:,|&|and|\+)\s*(?:${escaped.join("|")}))+`,
    "g"
  );

  return text.replace(group, label);
}

/**
 * One call for every CMS text field: resolves the {cities} token first, then
 * repairs any hardcoded city list left over from older saved copy.
 */
export function resolveCityText(
  text: string | undefined,
  cities: ServiceCityItem[] | undefined
): string {
  if (!text) return "";
  // The {cities} token is always correct — leave it alone.
  if (text.includes("{cities}")) return withCities(text, cities);
  // Otherwise only legacy hand-written city lists get repaired.
  return normalizeCityCopy(text, cities);
}

import fs from "fs";
import path from "path";
import type { AppointmentRecord, InquiryRecord } from "@/lib/appointmentsStore";
import type {
  DynamicSiteSettings,
  TestimonialItem,
  TeamMemberItem,
  CustomBlogItem,
} from "@/types/cms";
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TEAM_MEMBERS,
} from "@/lib/cmsDefaults";

const DB_FILE = path.join("/tmp", "runlife-physio-clean-store-v4.json");

export interface ServerStoreShape {
  appointments: AppointmentRecord[];
  inquiries: InquiryRecord[];
  siteSettings: DynamicSiteSettings;
  testimonials: TestimonialItem[];
  teamMembers: TeamMemberItem[];
  customBlogs: CustomBlogItem[];
}

// 100% CLEAN INITIAL STORE — Zero fake patients, zero fake reviews, zero fake inquiries!
const CLEAN_INITIAL_STORE: ServerStoreShape = {
  appointments: [],
  inquiries: [],
  siteSettings: DEFAULT_SITE_SETTINGS,
  testimonials: [],
  teamMembers: DEFAULT_TEAM_MEMBERS,
  customBlogs: [],
};


/**
 * Keeps the seeded default doctors (founder + core team) present even if the
 * saved store predates them, without ever duplicating or resurrecting a
 * doctor that was deliberately deleted.
 */
function mergeTeamMembers(
  stored: TeamMemberItem[] | undefined
): TeamMemberItem[] {
  if (!stored || stored.length === 0) return DEFAULT_TEAM_MEMBERS;
  const storedIds = new Set(stored.map((m) => m.id));
  const storedNames = new Set(
    stored.map((m) => m.name.trim().toLowerCase())
  );
  const missing = DEFAULT_TEAM_MEMBERS.filter(
    (d) => !storedIds.has(d.id) && !storedNames.has(d.name.trim().toLowerCase())
  );
  return [...missing, ...stored].sort((a, b) =>
    (a.createdAt || "").localeCompare(b.createdAt || "")
  );
}

export function readDemoStore(): ServerStoreShape {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(
        DB_FILE,
        JSON.stringify(CLEAN_INITIAL_STORE, null, 2),
        "utf8"
      );
      return structuredClone(CLEAN_INITIAL_STORE);
    }
    const raw = fs.readFileSync(DB_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<ServerStoreShape>;
    return {
      appointments: parsed.appointments || [],
      inquiries: parsed.inquiries || [],
      siteSettings: {
        ...DEFAULT_SITE_SETTINGS,
        ...(parsed.siteSettings || {}),
      },
      testimonials: parsed.testimonials || [],
      teamMembers: mergeTeamMembers(parsed.teamMembers),
      customBlogs: parsed.customBlogs || [],
    };
  } catch {
    return structuredClone(CLEAN_INITIAL_STORE);
  }
}

export function writeDemoStore(data: ServerStoreShape): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.warn("Local store write warning:", err);
  }
}

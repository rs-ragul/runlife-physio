"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_TEAM_MEMBERS,
} from "@/lib/cmsDefaults";
import { fetchFullCmsClient } from "@/lib/cmsStore";
import type {
  DynamicSiteSettings,
  TestimonialItem,
  TeamMemberItem,
  CustomBlogItem,
} from "@/types/cms";

interface SiteCmsContextValue {
  settings: DynamicSiteSettings;
  testimonials: TestimonialItem[];
  teamMembers: TeamMemberItem[];
  customBlogs: CustomBlogItem[];
  hydrated: boolean;
  refreshCms: () => Promise<void>;
}

const SiteCmsContext = createContext<SiteCmsContextValue>({
  settings: DEFAULT_SITE_SETTINGS,
  testimonials: [],
  teamMembers: DEFAULT_TEAM_MEMBERS,
  customBlogs: [],
  hydrated: false,
  refreshCms: async () => {},
});

export function SiteCmsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<DynamicSiteSettings>(
    DEFAULT_SITE_SETTINGS
  );
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>([]);
  const [teamMembers, setTeamMembers] =
    useState<TeamMemberItem[]>(DEFAULT_TEAM_MEMBERS);
  const [customBlogs, setCustomBlogs] = useState<CustomBlogItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  const refreshCms = useCallback(async () => {
    try {
      const payload = await fetchFullCmsClient();
      setSettings(payload.siteSettings);
      setTestimonials(payload.testimonials);
      setTeamMembers(payload.teamMembers);
      setCustomBlogs(payload.customBlogs);
    } catch (err) {
      console.warn("CMS hydration warning:", err);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    refreshCms();
  }, [refreshCms]);

  return (
    <SiteCmsContext.Provider
      value={{
        settings,
        testimonials,
        teamMembers,
        customBlogs,
        hydrated,
        refreshCms,
      }}
    >
      {children}
    </SiteCmsContext.Provider>
  );
}

export function useSiteCms() {
  return useContext(SiteCmsContext);
}

import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { SPECIALTIES } from "@/data/specialties";
import { CONDITIONS } from "@/data/conditions";
import { BLOG_POSTS } from "@/data/blogPosts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date("2026-11-09T08:00:00.000Z");

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/conditions`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/care-modes`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/bangalore`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/book`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const specialtyPages: MetadataRoute.Sitemap = SPECIALTIES.map((spec) => ({
    url: `${baseUrl}/services/${spec.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const conditionPages: MetadataRoute.Sitemap = CONDITIONS.map((cond) => ({
    url: `${baseUrl}/conditions/${cond.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticPages, ...specialtyPages, ...conditionPages, ...blogPages];
}

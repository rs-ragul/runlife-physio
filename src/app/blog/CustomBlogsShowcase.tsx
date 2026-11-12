"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, BookOpen } from "lucide-react";
import { useSiteCms } from "@/context/SiteSettingsContext";
import type { CustomBlogItem } from "@/types/cms";

export function CustomBlogsShowcase() {
  const { customBlogs } = useSiteCms();
  const [selected, setSelected] = useState<CustomBlogItem | null>(null);

  const published = customBlogs.filter((b) => b.published);
  if (published.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#85B925] mb-4">
        <BookOpen className="h-4 w-4" />
        Latest Clinic Updates &amp; Guides
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {published.map((post) => (
          <article
            key={post.id}
            className="flex flex-col overflow-hidden rounded-3xl border-2 border-sky-200 bg-white shadow-sm hover:shadow-xl transition"
          >
            <div className="relative h-48 w-full bg-slate-100">
              <Image
                src={post.image || "/images/ortho-acl-postop-rehab.jpg"}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top"
              />
            </div>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#136EA8]">
                  <span>{post.specialistTag}</span>
                  <span className="text-slate-400">{post.readTime}</span>
                </div>
                <h2 className="mt-2 font-display text-xl font-extrabold text-[#0F1D35]">
                  {post.title}
                </h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{post.author}</span>
                <button
                  type="button"
                  onClick={() => setSelected(post)}
                  className="font-bold text-[#136EA8] hover:underline cursor-pointer"
                >
                  Read Full Guide →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/65 p-4 backdrop-blur-xs"
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[88dvh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 sm:p-8 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="rounded-full bg-sky-100 px-3 py-0.5 text-xs font-bold text-[#136EA8]">
                  {selected.specialistTag} • {selected.publishedAt}
                </span>
                <h3 className="mt-2 font-display text-2xl font-extrabold text-[#0F1D35]">
                  {selected.title}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  By {selected.author}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-xl bg-slate-100 p-2 text-slate-700 hover:bg-slate-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 text-sm leading-relaxed text-slate-700 pt-2 border-t border-slate-100">
              {selected.bodyParagraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {selected.keyTakeaway && (
              <div className="rounded-2xl border-l-4 border-[#85B925] bg-lime-50 p-4 text-xs sm:text-sm font-semibold text-slate-800">
                {selected.keyTakeaway}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

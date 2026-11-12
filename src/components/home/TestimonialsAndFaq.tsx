"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Quote,
  ChevronDown,
  Star,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import { HOME_FAQS } from "@/data/faqs";
import { useSiteCms } from "@/context/SiteSettingsContext";

export function TestimonialsAndFaqSection() {
  const [openFaq, setOpenFaq] = useState<number>(0);
  const { settings, testimonials, customBlogs } = useSiteCms();

  const publishedReviews = testimonials.filter((t) => t.published);
  const publishedCustomBlogs = customBlogs.filter((b) => b.published);

  // Combine admin-created blog guides first, then built-in clinical articles
  const combinedGuides = [
    ...publishedCustomBlogs.map((b) => ({
      slug: b.slug,
      title: b.title,
      excerpt: b.excerpt,
      specialistTag: b.specialistTag,
      readTime: b.readTime,
      image: b.image || "/images/ortho-acl-postop-rehab.jpg",
      isCustom: true,
    })),
    ...BLOG_POSTS.map((p) => ({
      slug: p.slug,
      title: p.title,
      excerpt: p.excerpt,
      specialistTag: p.specialistTag,
      readTime: p.readTime,
      image: p.image,
      isCustom: false,
    })),
  ].slice(0, 3);

  return (
    <>
      {/* Dynamic Verified Patient Testimonials (Zero Fake Reviews!) */}
      {settings.showTestimonialsSection && publishedReviews.length > 0 && (
        <section className="py-14 lg:py-22 bg-white border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
                  Verified Patient Feedback
                </span>
                <h2 className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold text-[#0F1D35]">
                  Patient Recovery Stories
                </h2>
              </div>
              {settings.googleReviewUrl && (
                <a
                  href={settings.googleReviewUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-[#136EA8] hover:underline"
                >
                  View Google Reviews <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publishedReviews.map((story) => (
                <div
                  key={story.id}
                  className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {[...Array(story.rating || 5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400" />
                        ))}
                      </div>
                      <span className="rounded-full bg-white border border-slate-200 px-3 py-1 text-[11px] font-bold text-[#136EA8]">
                        {story.specialty}
                      </span>
                    </div>
                    <Quote className="mt-4 h-6 w-6 text-sky-200" />
                    <p className="mt-2 text-sm leading-relaxed text-slate-700">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        {story.patientName}
                      </div>
                      <div className="text-xs text-slate-500">
                        {story.context}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-lime-800">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#85B925]" />
                      Verified
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clinical Knowledge Hub Preview */}
      {settings.showBlogSection && (
        <section className="py-14 lg:py-20 bg-slate-50 border-b border-slate-200/70">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-9">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
                  Evidence-Based Recovery Guides
                </span>
                <h2 className="mt-1.5 font-display text-2xl sm:text-3xl font-extrabold text-[#0F1D35]">
                  Insights From Our MPT Specialist Team
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-bold text-[#136EA8] hover:underline"
              >
                Read All Clinical Guides →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {combinedGuides.map((post) => (
                <Link
                  key={post.slug}
                  href={post.isCustom ? `/blog` : `/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs hover:shadow-lg transition"
                >
                  <div className="relative h-46 sm:h-48 w-full bg-slate-100 overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top group-hover:scale-105 transition duration-500"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-bold text-[#136EA8]">
                        <span>{post.specialistTag}</span>
                        <span className="text-slate-400 font-medium">
                          {post.readTime}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-base sm:text-lg font-extrabold text-[#0F1D35] group-hover:text-[#136EA8] transition line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 inline-flex items-center gap-1 text-xs font-bold text-[#0F1D35]">
                      Read Clinical Guide <ArrowRight className="h-3.5 w-3.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Clinical FAQ Accordion */}
      <section className="py-14 lg:py-22 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-9">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
              Before You Book
            </span>
            <h2 className="mt-1.5 font-display text-2xl sm:text-4xl font-extrabold text-[#0F1D35]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {HOME_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-4 px-4 sm:px-5 py-4 text-left text-sm sm:text-base font-bold text-[#0F1D35] hover:bg-slate-100/70 transition cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#136EA8] shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-3 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

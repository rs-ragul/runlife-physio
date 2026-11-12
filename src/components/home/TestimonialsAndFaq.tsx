"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Quote, ChevronDown, Star, ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import { HOME_FAQS } from "@/data/faqs";

const RECOVERY_STORIES = [
  {
    name: "Arjun Menon",
    context: "Marathon Runner • Indiranagar, Bangalore",
    specialty: "MPT Sports & Running Rehab",
    quote:
      "After months of nagging runner's knee that kept coming back every time I crossed 8 km, Runlife's MPT Sports specialist analyzed my cadence and soleus strength instead of telling me to stop running. Just completed my pain-free half marathon!",
  },
  {
    name: "Smt. Padmavathi & Family",
    context: "Post-TKR Home Care • Jayanagar, Bangalore",
    specialty: "MPT Orthopedic Rehab",
    quote:
      "Avoiding Bangalore traffic right after my mother's Total Knee Replacement made all the difference. The MPT Ortho specialist visited punctually, achieved 120° painless knee bend by week 5, and got her climbing stairs independently.",
  },
  {
    name: "Rohan & Priya Deshpande",
    context: "Stroke Home Neuro Rehab • Whitefield, Bangalore",
    specialty: "MPT Neuro Specialist",
    quote:
      "After my father's stroke discharge, having a dedicated MPT Neurology specialist—not a general therapist—retrain his balance and walking right inside our apartment gave our whole family clarity and steady bi-weekly milestones.",
  },
  {
    name: "Sneha Kulkarni",
    context: "Postpartum Core & Pelvic Rehab • HSR Layout",
    specialty: "MPT Women's Health",
    quote:
      "Private home sessions with Runlife's female MPT Women's Health specialist resolved my post-C-section back pain and diastasis recti gently while my baby slept nearby. Truly empathetic, science-backed care.",
  },
];

export function TestimonialsAndFaqSection() {
  const [openFaq, setOpenFaq] = useState<number>(0);

  return (
    <>
      {/* Recovery Stories */}
      <section className="py-16 lg:py-24 bg-white border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
              Patient Recovery Outcomes
            </span>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-extrabold text-[#0F1D35]">
              Real Movement Restored Across Bangalore Homes &amp; Tracks
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {RECOVERY_STORIES.map((story) => (
              <div
                key={story.name}
                className="rounded-3xl border border-slate-200 bg-slate-50/60 p-6 sm:p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-0.5 text-amber-400">
                      {[...Array(5)].map((_, i) => (
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

                <div className="mt-5 pt-4 border-t border-slate-200/80">
                  <div className="font-bold text-sm text-slate-900">
                    {story.name}
                  </div>
                  <div className="text-xs text-slate-500">{story.context}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinical Knowledge Hub Preview */}
      <section className="py-16 lg:py-20 bg-slate-50 border-b border-slate-200/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
                Evidence-Based Recovery Guides
              </span>
              <h2 className="mt-1.5 font-display text-3xl font-extrabold text-[#0F1D35]">
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
            {BLOG_POSTS.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xs hover:shadow-lg transition"
              >
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
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

      {/* Clinical FAQ Accordion */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#136EA8]">
              Before You Book
            </span>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-extrabold text-[#0F1D35]">
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
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm sm:text-base font-bold text-[#0F1D35] hover:bg-slate-100/70 transition cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`h-5 w-5 text-[#136EA8] shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm leading-relaxed text-slate-600 border-t border-slate-100 pt-3 bg-white">
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

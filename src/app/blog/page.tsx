import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { BLOG_POSTS } from "@/data/blogPosts";
import { CustomBlogsShowcase } from "./CustomBlogsShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Clinical Recovery Guides & Physiotherapy Blog",
  description:
    "Evidence-based physiotherapy articles by Dr. Vishal S, PT & Runlife's MPT Specialists on ACL surgery recovery, Stroke neuro rehab, Runner's Knee, Postpartum Pelvic Floor & Pediatric Milestones.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Recovery Guides", path: "/blog" },
        ])}
      />

      <section className="bg-[#0F1D35] bg-navy-grid text-white py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#9AD634]">
            Runlife Clinical Knowledge Hub
          </span>
          <h1 className="mt-2 font-display text-3xl sm:text-5xl font-extrabold max-w-4xl">
            Evidence-Based Recovery &amp; Movement Science Guides
          </h1>
          <p className="mt-3 text-sm sm:text-lg text-slate-300 max-w-2xl">
            Written by Master-qualified specialists—clear, practical guidance to
            help you understand your body and recover with confidence.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <CustomBlogsShowcase />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xs hover:shadow-xl transition"
          >
            <Link
              href={`/blog/${post.slug}`}
              className="relative h-52 w-full overflow-hidden bg-slate-100"
            >
              <Image
                src={post.image}
                alt={post.title}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover object-top group-hover:scale-105 transition duration-500"
              />
            </Link>
            <div className="flex flex-1 flex-col justify-between p-6">
              <div>
                <div className="flex items-center justify-between text-xs font-bold text-[#136EA8]">
                  <span>{post.specialistTag}</span>
                  <span className="text-slate-400 font-medium">
                    {post.readTime}
                  </span>
                </div>
                <h2 className="mt-2.5 font-display text-xl font-extrabold text-[#0F1D35] group-hover:text-[#136EA8] transition">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-slate-600">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">{post.author}</span>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 font-bold text-[#0F1D35] hover:text-[#136EA8]"
                >
                  Read <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </article>
        ))}
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, CalendarCheck, ArrowLeft } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blogPosts";
import { getSpecialtyBySlug } from "@/data/specialties";
import { OpenModalButton } from "@/components/booking/OpenModalButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildBreadcrumbSchema } from "@/lib/schema";
import { SITE_CONFIG } from "@/config/site";

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const relatedSpec = getSpecialtyBySlug(post.relatedSpecialtySlug);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    image: [`${SITE_CONFIG.url}${post.image}`],
    author: {
      "@type": "Person",
      name: SITE_CONFIG.founder.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/images/runlife-logo-card.jpg`,
      },
    },
  };

  return (
    <div className="bg-slate-50 pb-20">
      <JsonLd
        data={[
          buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Recovery Guides", path: "/blog" },
            { name: post.title, path: `/blog/${post.slug}` },
          ]),
          articleSchema,
        ]}
      />

      <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-10">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#136EA8] hover:underline"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to All Recovery Guides
        </Link>

        <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-sky-100 px-3 py-1 font-bold text-[#136EA8]">
            {post.specialistTag}
          </span>
          <span className="text-slate-500">{post.publishedAt}</span>
          <span className="text-slate-400">•</span>
          <span className="text-slate-500">{post.readTime}</span>
        </div>

        <h1 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0F1D35] leading-tight">
          {post.title}
        </h1>
        <p className="mt-2 text-xs sm:text-sm font-semibold text-slate-500">
          Reviewed by {post.author}
        </p>

        <div className="relative mt-7 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-slate-200 shadow-md">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 896px"
            className="object-cover object-top"
          />
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 space-y-8 shadow-2xs">
          {post.sections.map((sec) => (
            <section key={sec.heading} className="space-y-3">
              <h2 className="font-display text-xl sm:text-2xl font-extrabold text-[#0F1D35]">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  className="text-sm sm:text-base leading-relaxed text-slate-700"
                >
                  {p}
                </p>
              ))}
              {sec.bullets && (
                <ul className="space-y-2 pt-1">
                  {sec.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-start gap-2.5 text-sm text-slate-700"
                    >
                      <CheckCircle2 className="h-4 w-4 text-[#85B925] shrink-0 mt-1" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* Clinical Takeaway */}
          <div className="rounded-2xl border-l-4 border-[#85B925] bg-lime-50/70 p-5">
            <div className="text-xs font-extrabold uppercase tracking-wider text-lime-900">
              MPT Clinical Takeaway
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-800">
              {post.keyTakeaway}
            </p>
          </div>

          {/* CTA Box */}
          <div className="rounded-2xl bg-[#0F1D35] p-6 sm:p-8 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl font-extrabold">
                Need Personalized Guidance From Our {post.specialistTag} Team?
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-300">
                Available at home across Bangalore or live via Virtual
                Tele-Rehab.
              </p>
            </div>
            <OpenModalButton
              prefill={{
                specialty: relatedSpec?.title,
                conditionOrPain: post.title,
                source: `Blog Post CTA (${post.slug})`,
              }}
              className="shrink-0 inline-flex items-center justify-center gap-2 rounded-xl bg-[#85B925] px-5 py-3.5 text-xs sm:text-sm font-extrabold text-slate-950 hover:bg-[#9AD634] transition cursor-pointer"
            >
              <CalendarCheck className="h-4 w-4" />
              Book Specialist
            </OpenModalButton>
          </div>
        </div>
      </article>
    </div>
  );
}

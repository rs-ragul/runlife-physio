import { NextRequest, NextResponse } from "next/server";
import { readDemoStore, writeDemoStore } from "@/lib/serverDemoStore";
import { DEFAULT_SITE_SETTINGS } from "@/lib/cmsDefaults";
import type {
  DynamicSiteSettings,
  TestimonialItem,
  TeamMemberItem,
  CustomBlogItem,
} from "@/types/cms";

export async function GET() {
  const store = readDemoStore();
  return NextResponse.json({
    siteSettings: store.siteSettings,
    testimonials: store.testimonials,
    teamMembers: store.teamMembers,
    customBlogs: store.customBlogs,
  });
}

// PUT /api/cms -> Save or Reset siteSettings
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const store = readDemoStore();

    if (body.reset === true) {
      store.siteSettings = { ...DEFAULT_SITE_SETTINGS };
    } else {
      const incoming = (body.siteSettings || {}) as Partial<DynamicSiteSettings>;
      store.siteSettings = {
        ...store.siteSettings,
        ...incoming,
        updatedAt: new Date().toISOString(),
      };
    }

    writeDemoStore(store);
    return NextResponse.json({ ok: true, siteSettings: store.siteSettings });
  } catch {
    return NextResponse.json(
      { error: "Failed to save site settings." },
      { status: 500 }
    );
  }
}

// POST /api/cms -> Create a testimonial, teamMember, or customBlog
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entity = String(body.entity || "");
    const item = body.item || {};
    const store = readDemoStore();

    if (entity === "testimonial") {
      const newReview: TestimonialItem = {
        id: item.id || `rev-${Date.now()}`,
        patientName: String(item.patientName || "Verified Patient").trim(),
        context: String(item.context || "Bangalore").trim(),
        specialty: String(item.specialty || "MPT Physiotherapy").trim(),
        rating: Math.min(5, Math.max(1, Number(item.rating) || 5)),
        quote: String(item.quote || "").trim(),
        published: item.published !== false,
        createdAt: item.createdAt || new Date().toISOString(),
      };
      store.testimonials.unshift(newReview);
      writeDemoStore(store);
      return NextResponse.json({ ok: true, item: newReview });
    }

    if (entity === "teamMember") {
      const newMember: TeamMemberItem = {
        id: item.id || `doc-${Date.now()}`,
        name: String(item.name || "").trim(),
        credential: String(item.credential || "MPT Specialist").trim(),
        role: String(item.role || "Specialist Physiotherapist").trim(),
        department: String(item.department || "Orthopedic & MSK Rehab").trim(),
        experience: String(item.experience || "Bangalore").trim(),
        bio: String(item.bio || "").trim(),
        image: item.image ? String(item.image).trim() : undefined,
        published: item.published !== false,
        createdAt: item.createdAt || new Date().toISOString(),
      };
      store.teamMembers.push(newMember);
      writeDemoStore(store);
      return NextResponse.json({ ok: true, item: newMember });
    }

    if (entity === "customBlog") {
      const slugBase = String(item.slug || item.title || `guide-${Date.now()}`)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      const newPost: CustomBlogItem = {
        id: item.id || `blog-${Date.now()}`,
        slug: slugBase || `guide-${Date.now()}`,
        title: String(item.title || "").trim(),
        excerpt: String(item.excerpt || "").trim(),
        category: String(item.category || "Clinical Guide").trim(),
        specialistTag: String(item.specialistTag || "MPT Specialist").trim(),
        author: String(item.author || "Dr. Vishal S, PT").trim(),
        publishedAt:
          item.publishedAt || new Date().toISOString().slice(0, 10),
        readTime: String(item.readTime || "4 min read").trim(),
        image: String(
          item.image || "/images/ortho-acl-postop-rehab.jpg"
        ).trim(),
        bodyParagraphs: Array.isArray(item.bodyParagraphs)
          ? item.bodyParagraphs
          : String(item.bodyText || "")
              .split(/\n\s*\n/)
              .map((p) => p.trim())
              .filter(Boolean),
        keyTakeaway: String(item.keyTakeaway || "").trim(),
        published: item.published !== false,
      };
      store.customBlogs.unshift(newPost);
      writeDemoStore(store);
      return NextResponse.json({ ok: true, item: newPost });
    }

    return NextResponse.json({ error: "Invalid entity" }, { status: 400 });
  } catch {
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

// PATCH /api/cms -> Update testimonial, teamMember, or customBlog
export async function PATCH(req: NextRequest) {
  try {
    const { entity, id, updates } = await req.json();
    const store = readDemoStore();

    if (entity === "testimonial") {
      const idx = store.testimonials.findIndex((t) => t.id === id);
      if (idx !== -1) {
        store.testimonials[idx] = { ...store.testimonials[idx], ...updates };
        writeDemoStore(store);
      }
    } else if (entity === "teamMember") {
      const idx = store.teamMembers.findIndex((t) => t.id === id);
      if (idx !== -1) {
        store.teamMembers[idx] = { ...store.teamMembers[idx], ...updates };
        writeDemoStore(store);
      }
    } else if (entity === "customBlog") {
      const idx = store.customBlogs.findIndex((b) => b.id === id);
      if (idx !== -1) {
        store.customBlogs[idx] = { ...store.customBlogs[idx], ...updates };
        writeDemoStore(store);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

// DELETE /api/cms?entity=...&id=...
export async function DELETE(req: NextRequest) {
  try {
    const entity = req.nextUrl.searchParams.get("entity");
    const id = req.nextUrl.searchParams.get("id");
    if (!entity || !id) {
      return NextResponse.json({ error: "Missing params" }, { status: 400 });
    }

    const store = readDemoStore();
    if (entity === "testimonial") {
      store.testimonials = store.testimonials.filter((t) => t.id !== id);
    } else if (entity === "teamMember") {
      store.teamMembers = store.teamMembers.filter((t) => t.id !== id);
    } else if (entity === "customBlog") {
      store.customBlogs = store.customBlogs.filter((b) => b.id !== id);
    }
    writeDemoStore(store);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

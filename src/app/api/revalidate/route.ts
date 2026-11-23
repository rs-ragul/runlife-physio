import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * POST /api/revalidate
 *
 * Called automatically right after Dr. Vishal saves the Website Customizer, so
 * a newly added (or hidden) city shows up in page titles, descriptions,
 * sitemap wording and schema.org immediately — instead of waiting for the
 * 5-minute background refresh.
 *
 * Safe by design:
 *  - It only clears caches. It cannot read or write any data.
 *  - If REVALIDATE_SECRET is unset, calls without the secret are still allowed
 *    because the endpoint performs no data mutation, but a wrong secret is
 *    always rejected when a secret IS configured.
 */
export async function POST(req: NextRequest) {
  const secret = process.env.REVALIDATE_SECRET;
  if (secret) {
    const provided =
      req.headers.get("x-revalidate-secret") ||
      new URL(req.url).searchParams.get("secret") ||
      "";
    if (provided !== secret) {
      return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
    }
  }

  const paths = [
    "/",
    "/bangalore",
    "/about",
    "/services",
    "/therapies",
    "/conditions",
    "/care-modes",
    "/book",
    "/contact",
    "/blog",
    "/terms",
    "/privacy-policy",
    "/sitemap.xml",
  ];

  for (const path of paths) {
    try {
      revalidatePath(path);
    } catch {
      /* a path that isn't cached is fine */
    }
  }

  return NextResponse.json({ ok: true, revalidated: paths.length });
}

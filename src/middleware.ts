import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";
import shoesData from "@/data/shoes.json";
import { Shoe } from "@/types/shoes";
import stringsData from "@/data/strings.json";
import { StringProduct } from "@/types/strings";
import gripsData from "@/data/grip.json";
import { Grip } from "@/types/grip";
import shuttlecockData from "@/data/shuttlecock.json";
import { Shuttlecock } from "@/types/shuttlecock";

// Helper function to generate product ID (matching productHelpers.ts)
function generateProductId(name: string, index: number): string {
  if (!name || typeof name !== "string") {
    return `product-${index}`;
  }

  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  return `${slug}-${index}`;
}

// Get all valid racket IDs
const allRacketIds = new Set((rackets as Racket[]).map((r) => r.id));

// Get all valid product IDs for other categories (using generated IDs)
const allShoeIds = new Set((shoesData as Shoe[]).map((s, index) => generateProductId(s.name, index)));
const allStringIds = new Set((stringsData as StringProduct[]).map((s, index) => generateProductId(s.name, index)));
const allGripIds = new Set((gripsData as Grip[]).map((g, index) => generateProductId(g.name, index)));
const allShuttlecockIds = new Set((shuttlecockData as Shuttlecock[]).map((s, index) => generateProductId(s.name, index)));

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the path matches /rackets/[single-segment] (not /rackets/[...multiple])
  const singleSegmentMatch = pathname.match(/^\/rackets\/([^/]+)$/);

  if (singleSegmentMatch) {
    const segment = decodeURIComponent(singleSegmentMatch[1]);

    // If it's not a valid racket ID, rewrite internally to force [...filterPath] route matching
    // We do this by rewriting to a path that Next.js will match to the catch-all route
    if (!allRacketIds.has(segment)) {
      const url = request.nextUrl.clone();
      // Rewrite to the filter route by using the catch-all pattern
      // We add a special prefix that we'll handle in the filter route
      url.pathname = `/rackets/filter/${segment}`;
      return NextResponse.rewrite(url);
    }
  }

  // Handle shoes routes
  const shoesMatch = pathname.match(/^\/shoes\/([^/]+)$/);
  if (shoesMatch) {
    const segment = decodeURIComponent(shoesMatch[1]);
    if (!allShoeIds.has(segment)) {
      const url = request.nextUrl.clone();
      url.pathname = `/shoes/filter/${segment}`;
      return NextResponse.rewrite(url);
    }
  }

  // Handle strings routes
  const stringsMatch = pathname.match(/^\/strings\/([^/]+)$/);
  if (stringsMatch) {
    const segment = decodeURIComponent(stringsMatch[1]);
    if (!allStringIds.has(segment)) {
      const url = request.nextUrl.clone();
      url.pathname = `/strings/filter/${segment}`;
      return NextResponse.rewrite(url);
    }
  }

  // Handle grips routes
  const gripsMatch = pathname.match(/^\/grips\/([^/]+)$/);
  if (gripsMatch) {
    const segment = decodeURIComponent(gripsMatch[1]);
    if (!allGripIds.has(segment)) {
      const url = request.nextUrl.clone();
      url.pathname = `/grips/filter/${segment}`;
      return NextResponse.rewrite(url);
    }
  }

  // Handle shuttlecock routes
  const shuttlecockMatch = pathname.match(/^\/shuttlecock\/([^/]+)$/);
  if (shuttlecockMatch) {
    const segment = decodeURIComponent(shuttlecockMatch[1]);
    if (!allShuttlecockIds.has(segment)) {
      const url = request.nextUrl.clone();
      url.pathname = `/shuttlecock/filter/${segment}`;
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/rackets/:path*", "/shoes/:path*", "/strings/:path*", "/grips/:path*", "/shuttlecock/:path*"],
};

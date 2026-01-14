import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";

// Get all valid racket IDs
const allRacketIds = new Set((rackets as Racket[]).map((r) => r.id));

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

  return NextResponse.next();
}

export const config = {
  matcher: "/rackets/:path*",
};

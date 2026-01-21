"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import RacketSidebar from "@/components/rackets/RacketSidebar";
import { SortProvider, useSort } from "@/contexts/SortContext";

function NavbarContent({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean | ((prev: boolean) => boolean)) => void;
}) {
  return (
    <>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`relative inline-flex items-center gap-2 transition-all duration-300 text-medium font-semibold text-slate-100 hover:text-emerald-300 px-3 py-1.5 rounded-lg hover:bg-emerald-800/30 ${
          open
            ? "underline decoration-emerald-400 decoration-2 underline-offset-4"
            : ""
        }`}
      >
        <span className="text-xl">☰</span> Filters
      </button>

      <Link
        href="/"
        className="text-medium font-semibold text-slate-50 hover:text-emerald-300 transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-emerald-800/30"
      >
        Home
      </Link>
      <Link
        href="/rackets"
        className="text-medium font-semibold text-slate-50 hover:text-emerald-300 transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-emerald-800/30"
      >
        Catalogue
      </Link>
    </>
  );
}

export default function RacketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Show navbar on filter/search results pages, hide on detail pages
  // Strategy: Show navbar on ALL /rackets/* paths EXCEPT confirmed detail pages
  // Detail pages are /rackets/[id] where id is a product ID (typically has multiple hyphens like "yonex-astrox-100zz")
  // Filter pages can be: /rackets/for-beginners, /rackets/yonex, /rackets/under-5000, etc.

  // Check if path is definitely a detail page:
  // - Single segment under /rackets/
  // - Contains multiple hyphens (product IDs like "yonex-astrox-100zz" have 2+ hyphens)
  // - Does NOT contain filter keywords
  const lastSegment = pathname?.split("/").pop() || "";
  const isDetailPage =
    pathname?.match(/^\/rackets\/[^/]+$/) &&
    !pathname.includes("for-") &&
    !pathname.includes("under-") &&
    !pathname.match(/\/rackets\/(brand|4u|3u|5u)(-|$)/) &&
    // Product IDs typically have 2+ hyphens (e.g., "yonex-astrox-100zz")
    lastSegment.split("-").length >= 3;

  // Show navbar on base /rackets page and ALL /rackets/* paths that are NOT detail pages
  // This ensures navbar shows when filter menu is used (even for single-word filters like "yonex")
  const showNavbar =
    pathname === "/rackets" ||
    (pathname?.startsWith("/rackets/") && !isDetailPage);

  return (
    <SortProvider>
      {/* Fixed navbar - shown on base page and filter pages, hidden on detail pages */}
      {showNavbar && (
        <header className="fixed inset-x-0 top-0 z-40 border-b border-emerald-800/40 bg-gradient-to-r from-emerald-700/95 via-emerald-600/90 to-emerald-700/95 backdrop-blur-xl shadow-lg">
          <div className="max-w-7xl mx-auto px-3 h-16 flex items-center gap-6">
            <NavbarContent open={open} setOpen={setOpen} />
          </div>
        </header>
      )}

      {/* Main content - adjust padding based on navbar visibility */}
      <div
        className={`max-w-7xl mx-auto px-6 ${showNavbar ? "pt-20" : "pt-10"} pb-10`}
      >
        {/* Dynamic grid - only show sidebar on pages with navbar */}
        {showNavbar ? (
          <div
            className={`grid gap-8 transition-all duration-300 ease-in-out ${
              open ? "grid-cols-[260px_1fr]" : "grid-cols-1"
            }`}
          >
            {/* Sidebar (only when open) */}
            {open && (
              <aside className="transition-all duration-300">
                <RacketSidebar />
              </aside>
            )}

            {/* Main content */}
            <section>{children}</section>
          </div>
        ) : (
          <section>{children}</section>
        )}
      </div>
    </SortProvider>
  );
}

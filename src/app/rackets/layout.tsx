"use client";

import { useState } from "react";
import Link from "next/link";
import RacketSidebar from "@/components/rackets/RacketSidebar";

export default function RacketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fixed navbar visible on all racket pages */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-emerald-800/40 bg-gradient-to-r from-emerald-900/95 via-emerald-900/90 to-emerald-900/95 backdrop-blur-xl shadow-lg">
        <div className="max-w-7xl mx-auto px-3 h-16 flex items-center gap-6">
          <button
            onClick={() => setOpen((prev) => !prev)}
            className={`relative inline-flex items-center gap-2 transition-all duration-300 text-medium font-semibold text-slate-100 hover:text-emerald-300 px-3 py-1.5 rounded-lg hover:bg-emerald-800/30 ${
              open ? "underline decoration-emerald-400 decoration-2 underline-offset-4" : ""
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
        </div>
      </header>

      {/* Main content pushed below fixed navbar */}
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Dynamic grid */}
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
      </div>
    </>
  );
}

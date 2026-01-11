"use client";

import { useState } from "react";
import RacketSidebar from "@/components/rackets/RacketSidebar";

export default function RacketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Toggle button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-sm font-semibold"
      >
        ☰ Filters
      </button>

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
  );
}

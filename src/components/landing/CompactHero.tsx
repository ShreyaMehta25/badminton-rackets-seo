"use client";
import Link from "next/link";
export default function CompactHero() {
  return (
    <section className="bg-white pt-12 pb-8">
      <div className="max-w-[1400px] mx-auto px-6">
        <Link rel="stylesheet" href="/rackets">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-bold leading-tight">
            <span className="text-slate-700">Find Your Perfect </span>
            <span className="text-emerald-600">Badminton Racket</span>
          </h1>
        </Link>
      </div>
    </section>
  );
}

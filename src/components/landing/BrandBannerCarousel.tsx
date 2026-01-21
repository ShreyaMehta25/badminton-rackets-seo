"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import rackets from "@/data/rackets.json";

export default function BrandBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const brands = (() => {
    const map = new Map<string, number>();
    rackets.forEach((r) => {
      map.set(r.brand, (map.get(r.brand) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  })();

  const totalSlides = brands.length;

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const i = setInterval(
      () => setCurrentSlide((p) => (p + 1) % totalSlides),
      4500,
    );
    return () => clearInterval(i);
  }, [isPaused, totalSlides]);

  return (
    <section
      className="bg-slate-50"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Title */}
      <div className="max-w-[1400px] mx-auto px-6 pt-10 pb-6">
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900">
          Explore Leading Badminton Brands
        </h3>
        <p className="text-slate-600 mt-2">
          Discover rackets trusted by players across all skill levels
        </p>
      </div>

      {/* Carousel */}
      <div className="relative">
        <button
          onClick={() =>
            setCurrentSlide((p) => (p === 0 ? totalSlides - 1 : p - 1))
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-md"
        >
          <ChevronLeft />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {brands.map(({ brand, count }) => (
              <div key={brand} className="w-full flex-shrink-0">
                <div className="max-w-[1400px] mx-auto px-6">
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-6 h-[420px]">
                    {/* LEFT BIG CARD */}
                    <div className="md:col-span-3 rounded-2xl p-8 bg-gradient-to-br from-emerald-50 to-emerald-100 flex flex-col justify-between">
                      <div>
                        <span className="inline-block text-xs font-semibold text-emerald-700 bg-emerald-200 px-3 py-1 rounded-full mb-4">
                          Featured Brand
                        </span>
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">
                          {brand}
                        </h2>
                        <p className="text-slate-700 text-lg mb-6">
                          {count} rackets designed for precision, power, and
                          control — from beginner-friendly to
                          professional-grade.
                        </p>
                      </div>

                      <a
                        href={`/rackets?brand=${encodeURIComponent(brand)}`}
                        className="inline-flex items-center gap-2 text-emerald-700 font-semibold"
                      >
                        Explore {brand} rackets →
                      </a>
                    </div>

                    {/* RIGHT STACKED PROMOS */}
                    <div className="md:col-span-2 grid grid-rows-2 gap-6">
                      <div className="rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between">
                        <h4 className="font-semibold text-lg text-slate-900">
                          Popular with club players
                        </h4>
                        <p className="text-sm text-slate-600">
                          Balanced rackets for regular training and match play.
                        </p>
                        <span className="text-emerald-600 font-medium text-sm">
                          View collection →
                        </span>
                      </div>

                      <div className="rounded-2xl p-6 bg-white shadow-sm flex flex-col justify-between">
                        <h4 className="font-semibold text-lg text-slate-900">
                          Built for competition
                        </h4>
                        <p className="text-sm text-slate-600">
                          Advanced rackets focused on speed, power, and
                          precision.
                        </p>
                        <span className="text-emerald-600 font-medium text-sm">
                          Explore performance →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => setCurrentSlide((p) => (p + 1) % totalSlides)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow-md"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 py-6">
        {brands.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all ${
              i === currentSlide
                ? "w-8 h-2 bg-emerald-600 rounded-full"
                : "w-2 h-2 bg-slate-300 rounded-full"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

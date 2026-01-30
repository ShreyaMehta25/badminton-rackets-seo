"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import rackets from "@/data/rackets.json";
import { Play, Pause } from "lucide-react";

/* ✅ ADD / EDIT IMAGE URLS HERE */
const brandImages: Record<string, string> = {
  Yonex:
    "https://yonex.com.mx/cdn/shop/collections/Captura_web_25-8-2021_114015_badmintonbites.com.jpg?v=1737413199",
  "Li-Ning":
    "https://scssports.in/cdn/shop/files/LiningCG42BlkBlu2.jpg?v=1737196886&width=1500",
  Apacs:
    "https://www.directbadminton.co.uk/images/Gallery2/Apa_AP140TRNBKOR.jpg",
  Lingmei:
    "https://image.made-in-china.com/202f0j00UhTqfrsbuukE/Lining-Shuttlecock-Quality-Competitive-Price-and-Durable-Badminton-Lingmei-Brand-Shuttlecock-for-Sale.webp",
  Victor:
    "https://www.cappellasports.com/cdn/shop/files/premium-products-listing-woodstock-_Racket_c9c251e0-50f1-4e38-b9a2-c687992dd1e5.jpg?v=1729504328",
  Maspro:
    "https://rukminim2.flixcart.com/image/480/480/j83d8cw0/racquet/d/g/e/g4-mp318-strung-1-318-350-badminton-racquet-maspro-original-imaey4w6pehxzy9s.jpeg?q=90",

  Hundred:
    "https://in.hndrd.co/cdn/shop/files/1_d57f548fe2.png?v=1749011293&width=1200",
};

/* ✅ SHORT ITALIC DESCRIPTIONS */
const brandDescriptions: Record<string, string> = {
  Yonex:
    "A globally dominant Japanese brand renowned for precision engineering, cutting-edge materials, and rackets trusted by Olympic medalists and world champions across generations.",

  "Li-Ning":
    "A powerhouse in modern badminton, Li-Ning blends explosive power, bold design, and advanced technology, making it a favorite among elite international players.",

  Apacs:
    "Known for delivering high-performance rackets at exceptional value, Apacs is widely respected for its balance of power, control, and durability among competitive players.",

  Lingmei:
    "An emerging badminton brand gaining attention for its aggressive play-oriented designs, Lingmei focuses on performance-driven construction for fast, attacking gameplay.",

  Victor:
    "A professional-grade brand celebrated for speed, control, and aerodynamic innovation, Victor rackets are engineered for players who demand precision at the highest level.",

  Maspro:
    "Built for reliability and solid performance, Maspre offers well-crafted rackets designed for consistency, making it a dependable choice for developing and club-level players.",

  Hundred:
    "A modern performance brand emphasizing power, stability, and bold aesthetics, Hundred rackets are designed for attacking players who thrive on fast-paced rallies.",
};

export default function BrandBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const brands = (() => {
    const brandMap = new Map<string, number>();
    rackets.forEach((racket) => {
      brandMap.set(racket.brand, (brandMap.get(racket.brand) || 0) + 1);
    });
    return Array.from(brandMap.entries())
      .map(([brand, count]) => ({ brand, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 7); // all requested brands
  })();

  const totalSlides = brands.length;

  useEffect(() => {
    if (isPaused || totalSlides <= 1) return;
    const interval = setInterval(
      () => setCurrentSlide((prev) => (prev + 1) % totalSlides),
      3750,
    );
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  return (
    <section
      className="bg-white relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Title */}

      {/* Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() =>
            setCurrentSlide((p) => (p === 0 ? totalSlides - 1 : p - 1))
          }
          className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white border border-slate-200 p-2 md:p-3 rounded-full shadow hover:shadow-md transition-shadow"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-300 " />
        </button>

        {/* Slides */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-400 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {brands.map(({ brand }) => (
              <div key={brand} className="w-full flex-shrink-0">
                {/* MOBILE: Stack vertically | DESKTOP: Diagonal overlay */}
                <div className="relative h-[480px] md:h-[420px] overflow-hidden bg-white">
                  {/* Diagonal Image - Hidden on mobile, shows on md+ */}
                  <div
                    className="hidden md:block absolute right-0 top-0 h-full w-[50%]"
                    style={{
                      backgroundImage: `url(${brandImages[brand] || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Mobile Image - Shows only on mobile, full width */}
                  <div
                    className="md:hidden absolute top-0 left-0 w-full h-48"
                    style={{
                      backgroundImage: `url(${brandImages[brand] || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/30" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10     max-w-[1600px] mx-auto     pl-14 pr-6 md:pl-20 md:pr-10    h-full flex items-end md:items-center     pt-48 md:pt-0 pb-6 md:pb-0  ">
                    <div className="w-full max-w-[560px] lg:max-w-[620px]">
                      <span className="inline-block px-3 md:px-4 py-1.5 md:py-2 bg-emerald-100 text-emerald-700 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-6">
                        Featured Brand
                      </span>

                      <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-slate-900">
                        {brand}
                      </h2>

                      {/* Description */}
                      <p className="mt-2 md:mt-3 mb-4 md:mb-8 text-sm md:text-lg italic text-slate-600 line-clamp-3 md:line-clamp-none">
                        {brandDescriptions[brand]}
                      </p>

                      <a
                        href={`/rackets?brand=${encodeURIComponent(brand)}`}
                        className="inline-block border border-slate-300 bg-slate-200 hover:bg-slate-300 text-slate-800 text-sm md:text-lg font-semibold px-6 md:px-10 py-3 md:py-4 rounded-lg shadow"
                      >
                        Explore {brand} Collection →
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => setCurrentSlide((p) => (p + 1) % totalSlides)}
          className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white border border-slate-200 p-2 md:p-3 rounded-full shadow hover:shadow-md transition-shadow"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-300 " />
        </button>
      </div>
      {/* Play / Pause Control */}
      <div className="absolute left-1/2 bottom-14 md:bottom-16 -translate-x-1/2 z-30">
        <button
          onClick={() => setIsPaused((p) => !p)}
          className="flex items-center justify-center
               w-8 h-8 md:w-9 md:h-9 rounded-full
               bg-white/90 backdrop-blur
               shadow-md hover:shadow-lg
               hover:scale-105 transition"
          aria-label={isPaused ? "Play carousel" : "Pause carousel"}
        >
          {isPaused ? (
            <Play className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-700" />
          ) : (
            <Pause className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-700" />
          )}
        </button>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-1.5 md:gap-2 py-4 md:py-6">
        {brands.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all ${
              currentSlide === i
                ? "w-6 md:w-8 h-2 md:h-3 bg-emerald-600 rounded-full"
                : "w-2 md:w-3 h-2 md:h-3 bg-slate-300 rounded-full hover:bg-slate-400"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import rackets from "@/data/rackets.json";

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
      4000,
    );
    return () => clearInterval(interval);
  }, [isPaused, totalSlides]);

  return (
    <section
      className="bg-slate-50 relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Section Title */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-4">
        <h3 className="text-2xl md:text-3xl font-bold italic text-slate-900">
          Explore Leading Badminton Brands
        </h3>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() =>
            setCurrentSlide((p) => (p === 0 ? totalSlides - 1 : p - 1))
          }
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow"
        >
          <ChevronLeft />
        </button>

        {/* Slides */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {brands.map(({ brand }) => (
              <div key={brand} className="w-full flex-shrink-0">
                <div className="relative h-[360px] md:h-[420px] overflow-hidden bg-white">
                  {/* Diagonal Image */}
                  <div
                    className="absolute right-0 top-0 h-full w-[55%]"
                    style={{
                      backgroundImage: `url(${brandImages[brand] || ""})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      clipPath: "polygon(18% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/20" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10 max-w-[1400px] mx-auto px-6 h-full flex items-center">
                    <div className="max-w-xl ml-8 md:ml-16">
                      <span className="inline-block px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-semibold mb-6">
                        Featured Brand
                      </span>

                      <h2 className="text-5xl md:text-6xl font-bold text-slate-900">
                        {brand}
                      </h2>

                      {/* ✅ NEW ITALIC DESCRIPTION */}
                      <p className="mt-3 mb-8 text-lg italic text-slate-600">
                        {brandDescriptions[brand]}
                      </p>

                      <a
                        href={`/rackets?brand=${encodeURIComponent(brand)}`}
                        className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white text-lg font-semibold px-10 py-4 rounded-lg shadow"
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
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white p-3 rounded-full shadow"
        >
          <ChevronRight />
        </button>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 py-6">
        {brands.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`transition-all ${
              currentSlide === i
                ? "w-8 h-3 bg-emerald-600 rounded-full"
                : "w-3 h-3 bg-slate-300 rounded-full"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

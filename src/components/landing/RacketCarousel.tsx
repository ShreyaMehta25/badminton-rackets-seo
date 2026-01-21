"use client";

import { useState, useEffect, useRef } from "react";
import { Racket } from "@/types/racket";
import RacketCard from "@/components/rackets/RacketCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RacketCarouselProps {
  rackets: Racket[];
  title?: string;
  description?: string;
  showPagination?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  cardsPerView?: { desktop: number; tablet: number; mobile: number };
}

export default function RacketCarousel({
  rackets,
  title,
  description,
  showPagination = true,
  autoPlay = false,
  autoPlayInterval = 5000,
  cardsPerView = { desktop: 4, tablet: 2, mobile: 1.5 },
}: RacketCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(cardsPerView.desktop);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Update cards visible based on screen size
  useEffect(() => {
    const updateCardsVisible = () => {
      if (window.innerWidth >= 1024) {
        setCardsVisible(cardsPerView.desktop);
      } else if (window.innerWidth >= 768) {
        setCardsVisible(cardsPerView.tablet);
      } else {
        setCardsVisible(cardsPerView.mobile);
      }
    };

    updateCardsVisible();
    window.addEventListener("resize", updateCardsVisible);
    return () => window.removeEventListener("resize", updateCardsVisible);
  }, [cardsPerView]);

  const maxIndex = Math.max(0, rackets.length - Math.floor(cardsVisible));
  const totalPages = Math.ceil(rackets.length / Math.floor(cardsVisible));

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused || rackets.length <= cardsVisible) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [
    autoPlay,
    isPaused,
    maxIndex,
    autoPlayInterval,
    rackets.length,
    cardsVisible,
  ]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const goToPage = (pageIndex: number) => {
    const newIndex = Math.min(pageIndex * Math.floor(cardsVisible), maxIndex);
    setCurrentIndex(newIndex);
  };

  if (rackets.length === 0) return null;

  return (
    <div
      className="space-y-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {title && (
        <div className="space-y-2">
          <h3 className="text-2xl md:text-3xl font-bold text-slate-100">
            {title}
          </h3>
          {description && <p className="text-slate-400">{description}</p>}
        </div>
      )}

      <div className="relative">
        {/* Left Arrow */}
        {currentIndex > 0 && (
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Carousel Container */}
        <div ref={containerRef} className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out gap-5"
            style={{
              transform: `translateX(-${(currentIndex * 100) / cardsVisible}%)`,
            }}
          >
            {rackets.map((racket, index) => (
              <div
                key={`${racket.id}-${index}`}
                className="flex-shrink-0"
                style={{
                  width: `calc(${100 / cardsVisible}% - ${(20 * (cardsVisible - 1)) / cardsVisible}px)`,
                }}
              >
                <RacketCard racket={racket} />
              </div>
            ))}
          </div>
        </div>

        {/* Right Arrow */}
        {currentIndex < maxIndex && (
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-emerald-500 hover:bg-emerald-400 text-white p-3 rounded-full shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Pagination Dots */}
      {showPagination && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={goToPrevious}
            disabled={currentIndex === 0}
            className="p-1.5 text-emerald-500 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageStartIndex = index * Math.floor(cardsVisible);
              const isActive =
                currentIndex >= pageStartIndex &&
                currentIndex < pageStartIndex + Math.floor(cardsVisible);

              return (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    isActive
                      ? "bg-emerald-500 scale-125"
                      : "bg-slate-600 hover:bg-slate-500"
                  }`}
                  aria-label={`Go to page ${index + 1}`}
                />
              );
            })}
          </div>

          <button
            onClick={goToNext}
            disabled={currentIndex >= maxIndex}
            className="p-1.5 text-emerald-500 disabled:text-slate-600 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}

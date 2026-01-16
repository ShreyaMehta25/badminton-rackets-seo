"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Racket } from "@/types/racket";
import RacketGrid from "./RacketGrid";
import {
  parseFilters,
  isAllowedCombination,
  buildCanonicalUrl,
} from "@/seo/eligibility";
import { players } from "@/data/players";

export default function RacketSearch({ rackets }: { rackets: Racket[] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  /**
   * Normalize search input:
   * - Convert to lowercase
   * - Remove punctuation
   * - Replace spaces with "-"
   */
  function normalizeQuery(input: string): string {
    return input
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // Remove punctuation
      .trim()
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
  }

  /**
   * Check if query exactly matches a product name or ID
   */
  function findExactProductMatch(normalizedQuery: string, originalQuery: string): Racket | null {
    // Try exact ID match first (normalized)
    const byId = rackets.find(
      (r) => r.id.toLowerCase() === normalizedQuery
    );
    if (byId) return byId;

    // Try exact name match (case-insensitive, with/without hyphens)
    const byName = rackets.find((r) => {
      const normalizedName = normalizeQuery(r.name);
      const lowerName = r.name.toLowerCase();
      const queryWithSpaces = normalizedQuery.replace(/-/g, " ");
      
      return (
        normalizedName === normalizedQuery ||
        lowerName === queryWithSpaces ||
        lowerName === originalQuery.toLowerCase()
      );
    });
    if (byName) return byName;

    return null;
  }

  /**
   * Detect if query contains player intent keywords
   */
  function hasPlayerIntent(query: string): boolean {
    const lowerQuery = query.toLowerCase();
    const playerKeywords = [
      "player",
      "used by",
      "racket used by",
      "plays with",
      "endorsed by",
      "what racket does",
      "racket does",
      "uses",
    ];

    return playerKeywords.some((keyword) => lowerQuery.includes(keyword));
  }

  /**
   * Extract player name from query by removing intent keywords
   */
  function extractPlayerName(query: string): string {
    let cleaned = query.toLowerCase();

    // Remove intent keywords
    const keywords = [
      "racket used by",
      "racket does",
      "what racket does",
      "used by",
      "plays with",
      "endorsed by",
      "player",
      "uses",
      "racket",
      "rackets",
    ];

    // Remove keywords (longest first to avoid partial matches)
    keywords.sort((a, b) => b.length - a.length);
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, "gi");
      cleaned = cleaned.replace(regex, "");
    });

    // Normalize: trim, remove punctuation, convert spaces to hyphens
    cleaned = cleaned
      .replace(/[^\w\s-]/g, "") // Remove punctuation
      .trim()
      .replace(/\s+/g, "-"); // Replace spaces with hyphens

    return cleaned;
  }

  /**
   * Find player by slug (id) or name
   */
  function findPlayerMatch(playerSlug: string): string | null {
    // Try exact ID match first
    const byId = players.find(
      (p) => p.id.toLowerCase() === playerSlug && p.isActive
    );
    if (byId) return byId.id;

    // Try name match (normalized)
    const byName = players.find((p) => {
      if (!p.isActive) return false;
      const normalizedName = normalizeQuery(p.name);
      return normalizedName === playerSlug || p.name.toLowerCase().replace(/\s+/g, "-") === playerSlug;
    });
    if (byName) return byName.id;

    return null;
  }

  /**
   * Handle search submission
   */
  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!query.trim()) return;

    const normalized = normalizeQuery(query);

    // Step 1: Check for exact product match (unchanged)
    const exactMatch = findExactProductMatch(normalized, query);
    if (exactMatch) {
      router.push(`/rackets/${exactMatch.id}`);
      return;
    }

    // Step 2: Check for player intent search
    if (hasPlayerIntent(query)) {
      const playerSlug = extractPlayerName(query);
      if (playerSlug) {
        const playerId = findPlayerMatch(playerSlug);
        if (playerId) {
          router.push(`/players/${playerId}`);
          return;
        }
      }
      // If player intent detected but no valid player found, fall through to SEO search
    }

    // Step 3: Treat as SEO filter intent search (unchanged)
    // Parse filters from normalized query
    const parsedFilters = parseFilters(normalized);

    // Check if any filters were found
    const hasFilters = Object.keys(parsedFilters).length > 0;

    if (hasFilters) {
      // Validate filter combination
      if (isAllowedCombination(parsedFilters)) {
        // Build SEO URL and redirect
        const filterUrl = buildCanonicalUrl(parsedFilters);
        router.push(`/rackets/${filterUrl}`);
        return;
      }
    }

    // If no valid filters or invalid combination, redirect to base rackets page
    router.push("/rackets");
  }

  // For live filtering (existing behavior)
  const filtered = rackets.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <form onSubmit={handleSearch} className="relative mb-8 group">
        <input
          type="text"
          placeholder="Search Rackets..."
          className="w-full p-4 pl-12 rounded-xl bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all duration-300 text-slate-100 placeholder:text-slate-500 shadow-lg hover:shadow-xl"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-emerald-400 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </form>
      <RacketGrid rackets={filtered} />
    </>
  );
}

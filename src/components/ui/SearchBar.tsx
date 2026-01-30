"use client";

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Search } from 'lucide-react';

// interface SearchBarProps {
//   placeholder?: string;
//   onSearch?: (query: string) => void;
// }

// export default function SearchBar({
//   placeholder = "What are you looking for?",
//   onSearch
// }: SearchBarProps) {
//   const [query, setQuery] = useState('');
//   const router = useRouter();

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (query.trim()) {
//       if (onSearch) {
//         onSearch(query);
//       } else {
//         router.push(`/rackets?search=${encodeURIComponent(query.trim())}`);
//       }
//     }
//   };

//   return (
//     <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder={placeholder}
//         className="w-full px-4 py-2.5 pr-12 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
//       />
//       <button
//         type="submit"
//         className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-emerald-600 transition-colors"
//         aria-label="Search"
//       >
//         <Search className="w-5 h-5" />
//       </button>
//     </form>
//   );
// }

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

// helper: normalize search → URL-safe filter segment
const normalizeToSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/₹/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export default function SearchBar({
  placeholder = "What are you looking for?",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = query.trim();
    if (!trimmed) return;

    // If parent wants custom handling, respect it
    if (onSearch) {
      onSearch(trimmed);
      return;
    }

    // Intelligent category routing based on keywords
    const lowerQuery = trimmed.toLowerCase();

    // Check for strings (highest priority for "string" keyword)
    if (lowerQuery.includes('string')) {
      router.push('/strings');
      return;
    }

    // Check for shoes
    if (lowerQuery.includes('shoe')) {
      router.push('/shoes');
      return;
    }

    // Check for grips
    if (lowerQuery.includes('grip')) {
      router.push('/grips');
      return;
    }

    // Check for shuttlecock (matches "shuttle", "shuttlecock", "shuttle cock")
    if (lowerQuery.includes('shuttle')) {
      router.push('/shuttlecock');
      return;
    }

    const slug = normalizeToSlug(trimmed);

    // Fallback to rackets filter-based page
    router.push(`/rackets/${slug}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 pr-12 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-slate-500 hover:text-emerald-600 transition-colors"
        aria-label="Search"
      >
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
}

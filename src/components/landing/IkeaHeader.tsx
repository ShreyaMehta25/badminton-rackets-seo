"use client";

// import Link from "next/link";
// import SearchBar from "@/components/ui/SearchBar";

// export default function IkeaHeader() {
//   return (
//     <header className=" top-0 z-50 bg-gray-50 backdrop-blur border-b border-slate-200 max-w-[1440px] mx-auto">
//       <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
//         {/* Brand */}
//         <Link href="/" className="flex-shrink-0">
//           <h1 className="text-lg md:text-xl font-semibold tracking-tight text-slate-900">
//             Badminton Rackets
//             <span className="text-slate-600"> Directory</span>
//           </h1>
//         </Link>

//         {/* Search */}
//         <div className="w-full max-w-xl">
//           <SearchBar placeholder="What are you looking for?" />
//         </div>
//       </div>
//     </header>
//   );
// }

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import SearchBar from "@/components/ui/SearchBar";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import RacketSidebar to avoid SSR issues
const RacketSidebar = dynamic(
  () => import("@/components/rackets/RacketSidebar"),
  { ssr: false }
);

const normalize = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");

export default function IkeaHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if we're on a rackets page (show filters in mobile menu)
  const isRacketsPage = pathname?.startsWith("/rackets") && pathname !== "/rackets/[id]";

  const handleSearch = (query: string) => {
    if (!query) return;

    const normalized = normalize(query);

    // Route directly to filter-based page
    router.push(`/rackets/${normalized}`);
    setIsMobileMenuOpen(false); // Close mobile menu after search
  };

  return (
    <>
    <header className="sticky top-0 z-50 bg-white backdrop-blur border-b border-slate-200 max-w-[1920px] mx-auto">
      <div className="w-full px-3 md:px-6 h-14 md:h-16 flex items-center gap-2 md:gap-4">
        {/* Brand & Navigation */}
        <div className="flex items-center gap-3 md:gap-6 lg:gap-9 flex-shrink-0">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-lg md:text-2xl lg:text-4xl font-bold tracking-tight text-slate-700">
              SmashSelect
            </h1>
          </Link>
          <Link href="/" className="hidden sm:block flex-shrink-0">
            <h1 className="text-sm md:text-base lg:text-lg tracking-tight text-slate-900 hover:text-emerald-600 transition-colors">
              Home
            </h1>
          </Link>
          <Link href="/rackets" className="hidden sm:block flex-shrink-0">
            <h1 className="text-sm md:text-base lg:text-lg tracking-tight text-slate-900 hover:text-emerald-600 transition-colors">
              Catalogue
            </h1>
          </Link>
        </div>

        {/* Desktop Search - hidden on mobile */}
        <div className="hidden sm:block ml-auto w-full max-w-xs md:max-w-lg">
          <SearchBar
            placeholder="What are you looking for?"
            onSearch={handleSearch}
          />
        </div>

        {/* Mobile Hamburger Menu Button - visible only on mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden ml-auto p-2 text-slate-700 hover:text-slate-900 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
    </header>

    {/* Mobile Menu Overlay - visible only on mobile when open */}
    {isMobileMenuOpen && (
      <>
        {/* Backdrop */}
        <div
          className="sm:hidden fixed inset-0 bg-black/20 z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Drawer */}
        <div className="sm:hidden fixed top-14 left-0 right-0 bg-white border-b border-slate-200 z-40 shadow-lg max-h-[calc(100vh-3.5rem)] overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-4">
            {/* Home */}
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-slate-900 hover:text-emerald-600 transition-colors py-2"
            >
              Home
            </Link>

            {/* Catalogue */}
            <Link
              href="/rackets"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-base font-medium text-slate-900 hover:text-emerald-600 transition-colors py-2"
            >
              Catalogue
            </Link>

            {/* Search */}
            <div className="pt-2 border-t border-slate-200">
              <p className="text-xs text-slate-500 mb-2">Search</p>
              <SearchBar
                placeholder="What are you looking for?"
                onSearch={handleSearch}
              />
            </div>

            {/* Filters - only show on rackets pages */}
            {isRacketsPage && (
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
                  Filters
                </p>
                <RacketSidebar showSort={false} />
              </div>
            )}
          </nav>
        </div>
      </>
    )}
    </>
  );
}

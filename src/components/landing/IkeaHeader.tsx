"use client";

// import Link from "next/link";
// import SearchBar from "@/components/ui/SearchBar";

// export default function IkeaHeader() {
//   return (
//     <header className=" top-0 z-50 bg-gray-50 backdrop-blur border-b border-slate-200">
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
import { useRouter } from "next/navigation";
import SearchBar from "@/components/ui/SearchBar";

const normalize = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, "-");

export default function IkeaHeader() {
  const router = useRouter();

  const handleSearch = (query: string) => {
    if (!query) return;

    const normalized = normalize(query);

    // Route directly to filter-based page
    router.push(`/rackets/${normalized}`);
  };

  return (
    <header className="sticky top-0 z-50 bg-white backdrop-blur border-b border-slate-200 ">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center">
        {/* Brand */}
        <div className="flex items-center gap-9">
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-8xl md:text-4xl font-bold tracking-tight text-slate-700">
              SmashSelect
            </h1>
          </Link>
          <Link href="/" className="flex-shrink-0 ">
            <h1 className="text-lg md:text-lg  tracking-tight text-slate-900">
              Home
            </h1>
          </Link>
          <Link href="/rackets" className="flex-shrink-0 ">
            <h1 className="text-lg md:text-lg tracking-tight text-slate-900">
              Catalogue
            </h1>
          </Link>
        </div>

        {/* Search */}
        <div className="ml-auto w-full max-w-lg">
          <SearchBar
            placeholder="What are you looking for?"
            onSearch={handleSearch}
          />
        </div>
      </div>
    </header>
  );
}

"use client";

// import Link from "next/link";

// const categories = [
//   {
//     name: "Shoes",
//     href: "/shoes",
//     imageUrl: "", // User will provide later
//   },
//   {
//     name: "Strings",
//     href: "/strings",
//     imageUrl: "", // User will provide later
//   },
//   {
//     name: "Grips",
//     href: "/grips",
//     imageUrl: "", // User will provide later
//   },
//   {
//     name: "Shuttlecock",
//     href: "/shuttlecock",
//     imageUrl: "", // User will provide later
//   },
// ];

// function CategoryCard({ category }: { category: (typeof categories)[0] }) {
//   return (
//     <Link
//       href={category.href}
//       className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 block border border-slate-200 hover:border-emerald-300 hover:-translate-y-0.5"
//     >
//       {/* Image */}
//       <div className="h-44 bg-slate-50 flex items-center justify-center">
//         {category.imageUrl ? (
//           <img
//             src={category.imageUrl}
//             alt={category.name}
//             className="h-full object-contain p-2 group-hover:scale-105 transition-transform"
//           />
//         ) : (
//           <div className="text-slate-300 text-sm">Image placeholder</div>
//         )}
//       </div>

//       {/* Content */}
//       <div className="p-3">
//         <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors text-center">
//           {category.name}
//         </h3>
//       </div>
//     </Link>
//   );
// }

// export default function ProductCategories() {
//   return (
//     <section className="py-12 md:py-24 lg:py-36 bg-white">
//       <div className="px-4 md:px-6">
//         {/* Header */}
//         <div className="mb-4 md:mb-6">
//           <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
//             Gear up, play sharp
//           </h2>
//           <p className="text-sm md:text-base text-slate-600 mt-1">
//             Everything you need to elevate your game
//           </p>
//         </div>

//         {/* Category Cards */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
//           {categories.map((category) => (
//             <CategoryCard key={category.name} category={category} />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";
import { ArrowRight } from "lucide-react";

const categories = [
  {
    name: "Shoes",
    href: "/shoes",
    imageUrl:
      "https://thegodofsports.com/wp-content/uploads/2024/12/YONEX-Power-Cushion-SHB-39-Badminton-Shoes-White_Blue-scaled.webp",
  },
  {
    name: "Strings",
    href: "/strings",
    imageUrl: "https://cdn.store-assets.com/s/964873/f/9791796.png?width=1200",
  },
  {
    name: "Grips",
    href: "/grips",
    imageUrl:
      "https://down-ph.img.susercontent.com/file/ph-11134207-7r98q-lzazajsex4ouda",
  },
  {
    name: "Shuttlecock",
    href: "/shuttlecock",
    imageUrl:
      "https://nwscdn.com/media/catalog/product/cache/h900xw900/1/y/1y1a0180.jpeg",
  },
];

function CategoryCard({ category }: { category: (typeof categories)[0] }) {
  return (
    <div className="group">
      {/* Card — SAME STRUCTURE AS CompactRacketCard */}
      <Link
        href={category.href}
        className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 block border border-slate-200 hover:border-emerald-300 hover:-translate-y-0.5"
      >
        {/* IMAGE — ABSOLUTE, FILLS ENTIRE CARD */}
        <img
          src={category.imageUrl}
          alt={category.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* ORIGINAL IMAGE SLOT (kept for structure) */}
        <div className="h-44 bg-transparent relative z-10" />

        {/* ORIGINAL CONTENT SLOT (kept ONLY for height) */}
        <div className="p-3 space-y-2 opacity-0 select-none pointer-events-none">
          <div className="h-8" />
          <div className="h-6" />
          <div className="h-4" />
          <div className="h-6" />
        </div>
      </Link>

      {/* TEXT + ARROW BELOW CARD */}
      <Link
        href={category.href}
        className="mt-2 flex items-center justify-between text-sm font-medium text-slate-900 hover:text-emerald-700 transition-colors"
      >
        <span className="text-lg transition-transform group-hover:translate-x-1">
          {category.name} →
        </span>
      </Link>
    </div>
  );
}

export default function ProductCategories() {
  return (
    <section className="py-12 md:py-24 lg:py-36 bg-white">
      <div className="px-4 md:px-6">
        {/* Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
            Gear up, play sharp
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-1">
            Everything you need to elevate your game
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {categories.map((category) => (
            <CategoryCard key={category.name} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
}

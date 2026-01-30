// "use client";

// import Link from "next/link";
// import { Users, Target, Trophy } from "lucide-react";

// export default function SkillLevelGuide() {
//   return (
//     <section id="skill-level-guide" className="py-14 bg-slate-50">
//       <div className="max-w-[1400px] mx-auto px-6">
//         {/* Section Header */}
//         <div className="mb-10">
//           <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
//             What level of racket are you looking for?
//           </h2>
//         </div>

//         {/* Main Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] bg-white">
//           {/* LEFT 70% — IKEA-style grid */}
//           <div className="grid grid-cols-2 gap-3 p-4 bg-amber-50">
//             {/* BEGINNER — BIG CARD */}
//             <Link
//               href="/rackets/for-beginners"
//               className="col-span-1 row-span-2 relative p-6 flex flex-col justify-end text-white"
//               style={{
//                 backgroundImage: `url('https://us.123rf.com/450wm/zaikina/zaikina1603/zaikina160300052/56231295-shuttlecock-and-badminton-racket-on-green-grass.jpg')`, // <-- replace later
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               {/* Overlay */}
//               <div className="absolute inset-0 bg-black/45"></div>

//               <div className="relative z-10 max-w-md">
//                 <div className="flex items-center gap-3 mb-3">
//                   <div className="w-10 h-10 bg-white/20 flex items-center justify-center">
//                     <Users className="w-5 h-5 text-white" />
//                   </div>
//                   <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">
//                     Easy to start
//                   </span>
//                 </div>

//                 <h3 className="text-2xl font-bold mb-3">Beginner</h3>

//                 <p className="text-sm text-white/90 mb-2">
//                   Forgiving, lightweight rackets designed to help you learn
//                   technique and control without strain.
//                 </p>

//                 <p className="text-xs text-white/70 mb-4">
//                   Ideal for new players, casual games & coaching sessions
//                 </p>

//                 <span className="text-emerald-300 font-semibold text-sm">
//                   Explore beginner rackets →
//                 </span>
//               </div>
//             </Link>

//             {/* INTERMEDIATE — SMALL CARD */}
//             <Link
//               href="/rackets/for-intermediate"
//               className="relative p-5 flex flex-col justify-end text-white"
//               style={{
//                 backgroundImage: `url('/images/skill-intermediate.jpg')`, // <-- replace later
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <div className="absolute inset-0 bg-black/45"></div>

//               <div className="relative z-10">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-9 h-9 bg-white/20 flex items-center justify-center">
//                     <Target className="w-4 h-4 text-white" />
//                   </div>
//                   <span className="text-xs font-semibold uppercase text-blue-300">
//                     Skill building
//                   </span>
//                 </div>

//                 <h3 className="text-lg font-bold mb-2">Intermediate</h3>

//                 <p className="text-sm text-white/85 mb-3">
//                   Balanced rackets offering control and power as your game
//                   improves.
//                 </p>

//                 <span className="text-emerald-300 text-sm font-semibold">
//                   Explore intermediate →
//                 </span>
//               </div>
//             </Link>

//             {/* ADVANCED — SMALL CARD */}
//             <Link
//               href="/rackets/for-advanced"
//               className="relative p-5 flex flex-col justify-end text-white"
//               style={{
//                 backgroundImage: `url('/images/skill-advanced.jpg')`, // <-- replace later
//                 backgroundSize: "cover",
//                 backgroundPosition: "center",
//               }}
//             >
//               <div className="absolute inset-0 bg-black/45"></div>

//               <div className="relative z-10">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="w-9 h-9 bg-white/20 flex items-center justify-center">
//                     <Trophy className="w-4 h-4 text-white" />
//                   </div>
//                   <span className="text-xs font-semibold uppercase text-amber-300">
//                     Match ready
//                   </span>
//                 </div>

//                 <h3 className="text-lg font-bold mb-2">Advanced</h3>

//                 <p className="text-sm text-white/85 mb-3">
//                   Precision-focused rackets for fast swings and elite control.
//                 </p>

//                 <span className="text-emerald-300 text-sm font-semibold">
//                   Explore professional →
//                 </span>
//               </div>
//             </Link>
//           </div>

//           {/* RIGHT 30% — Quote */}
//           <div className="hidden lg:flex items-center justify-center bg-slate-50 p-10">
//             <div className="max-w-sm">
//               <div className="border-l-4 border-emerald-500 pl-6">
//                 <blockquote className="text-3xl font-light text-slate-700 leading-relaxed">
//                   “Your racket should evolve as your game evolves.”
//                 </blockquote>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Link from "next/link";
import { Users, Target, Trophy } from "lucide-react";

export default function SkillLevelGuide() {
  return (
    <section id="skill-level-guide" className="bg-white mt-0 py-12 md:py-0">
      <div className="px-4 md:px-6">
        {/* Section Header */}
        <div className="mb-4 md:mb-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
            What level of racket are you looking for?
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-1">
            Play better with the right level.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[70%_30%] bg-white">
          {/* LEFT 70% */}
          <div
            className="
              grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 p-2 md:p-4
              bg-white
              h-auto md:h-[700px]
            "
          >
            {/* BEGINNER — BIG CARD */}
            <Link
              href="/rackets/for-beginners"
              className="
                col-span-1 md:row-span-2
                relative flex flex-col justify-end
                text-white
                transition-transform duration-300
                hover:scale-[1.01]
                min-h-[280px] md:min-h-0
              "
              style={{
                backgroundImage:
                  "url('https://us.123rf.com/450wm/zaikina/zaikina1603/zaikina160300052/56231295-shuttlecock-and-badminton-racket-on-green-grass.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/45" />

              <div className="relative z-10 p-4 md:p-6 max-w-md">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 flex items-center justify-center">
                    <Users className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold uppercase tracking-wide text-white">
                    Easy to start
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3">
                  Beginner
                </h3>

                <p className="text-sm md:text-lg text-white/90 mb-1 md:mb-2">
                  Forgiving, lightweight rackets designed to help you learn
                  technique and control without strain.
                </p>

                <p className="text-xs md:text-med text-white/70 mb-3 md:mb-4">
                  Ideal for new players, casual games & coaching sessions
                </p>

                <span className="text-white font-semibold text-xs md:text-sm">
                  Explore Beginner Rackets →
                </span>
              </div>
            </Link>

            {/* INTERMEDIATE — TOP RIGHT */}
            <Link
              href="/rackets/for-intermediate"
              className="
                relative flex flex-col justify-end
                text-white
                transition-transform duration-300
                hover:scale-[1.02]
                min-h-[220px] md:min-h-0
              "
              style={{
                backgroundImage:
                  "url('https://oriamscotland.com/wp-content/uploads/2023/05/Badminton-Play-Badminton-at-Oriam-Edinburgh-min.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/45" />

              <div className="relative z-10 p-4 md:p-5">
                <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-white/20 flex items-center justify-center">
                    <Target className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold uppercase text-white">
                    Skill building
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-1.5 md:mb-2">
                  Intermediate
                </h3>

                <p className="text-sm md:text-med text-white/85 mb-2 md:mb-3">
                  Balanced rackets offering control and power as your game
                  improves.
                </p>

                <span className="text-white text-xs md:text-sm font-semibold">
                  Explore Intermediate Rackets→
                </span>
              </div>
            </Link>

            {/* ADVANCED — BOTTOM RIGHT */}
            <Link
              href="/rackets/for-advanced"
              className="
                relative flex flex-col justify-end
                text-white
                transition-transform duration-300
                hover:scale-[1.02]
                min-h-[220px] md:min-h-0
              "
              style={{
                backgroundImage:
                  "url('https://www.comarsport.be/wp-content/uploads/2024/11/Badminton-e1731600201744.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black/45" />

              <div className="relative z-10 p-4 md:p-5">
                <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                  <div className="w-8 h-8 md:w-9 md:h-9 bg-white/20 flex items-center justify-center">
                    <Trophy className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold uppercase text-white">
                    Match ready
                  </span>
                </div>

                <h3 className="text-xl md:text-2xl font-bold mb-1.5 md:mb-2">
                  Advanced
                </h3>

                <p className="text-sm md:text-med text-white/85 mb-2 md:mb-3">
                  Precision-focused rackets for fast swings and elite control.
                </p>

                <span className="text-white text-xs md:text-sm font-semibold">
                  Explore Professional Rackets→
                </span>
              </div>
            </Link>
          </div>

          {/* RIGHT 30% — Quote */}
          <div className="hidden lg:flex items-center justify-center bg-white p-10">
            <div className="max-w-sm">
              <div className="border-l-4 border-emerald-500 pl-6">
                <blockquote className="text-3xl font-light italic  text-slate-700 leading-relaxed">
                  “Your racket should evolve as your game evolves.”
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

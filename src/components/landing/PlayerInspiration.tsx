"use client";

// import Link from "next/link";
// import { players } from "@/data/players";
// import rackets from "@/data/rackets.json";

// const categoryLabels: Record<string, string> = {
//   "mens-singles": "Men's Singles",
//   "womens-singles": "Women's Singles",
//   "mens-doubles": "Men's Doubles",
//   "womens-doubles": "Women's Doubles",
//   mixed: "Mixed Doubles",
// };

// function getBackgroundImage(name: string) {
//   // You can later map real images per player
//   return `/images/player-bg/${name.toLowerCase().replace(/\s/g, "-")}.jpg`;
// }

// export default function PlayerInspiration() {
//   const activePlayers = players.filter((p) => p.isActive).slice(0, 8);

//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-[1400px] mx-auto px-6">
//         {/* Header */}
//         <div className="mb-10">
//           <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
//             Want to see what players use?
//           </h2>
//           <p className="text-lg text-slate-600">
//             Discover the rackets chosen by world-class badminton players
//           </p>
//         </div>

//         {/* Collage Grid */}
//         <div className="grid grid-cols-12 grid-rows-6 gap-6 h-[900px]">
//           {activePlayers.map((player, index) => {
//             const racketUsed = player.racketsUsed.find(
//               (r) => r.usageType === "current",
//             );
//             const racket = racketUsed
//               ? rackets.find((r) => r.id === racketUsed.racketId)
//               : null;

//             const layoutClasses = [
//               "col-span-6 row-span-4", // 1 BIG
//               "col-span-3 row-span-2", // 2 MED
//               "col-span-3 row-span-2", // 3 SMALL
//               "col-span-3 row-span-2", // 4 SMALL
//               "col-span-3 row-span-2", // 5 MED
//               "col-span-6 row-span-2", // 6 WIDE
//               "col-span-4 row-span-2", // 7 SMALL
//               "col-span-2 row-span-2", // 8 SMALL
//             ][index];

//             return (
//               <Link
//                 key={player.id}
//                 href={`/players/${player.id}`}
//                 className={`group relative rounded-md overflow-hidden ${layoutClasses}`}
//               >
//                 {/* Background Image */}
//                 <div
//                   className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
//                   style={{
//                     backgroundImage: `url(${getBackgroundImage(player.name)})`,
//                   }}
//                 />

//                 {/* Overlay */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

//                 {/* Content */}
//                 <div className="relative z-10 h-full p-6 flex flex-col justify-end">
//                   <h3 className="text-xl md:text-2xl font-bold text-white">
//                     {player.name}
//                   </h3>

//                   <p className="text-sm text-white/80 mb-2">
//                     {categoryLabels[player.category]}
//                   </p>

//                   <div className="flex flex-wrap gap-2 mb-3">
//                     {player.playStyle.slice(0, 2).map((style) => (
//                       <span
//                         key={style}
//                         className="px-2 py-1 text-xs rounded bg-white/20 text-white backdrop-blur"
//                       >
//                         {style}
//                       </span>
//                     ))}
//                   </div>

//                   {racket && (
//                     <div className="flex items-center gap-3 bg-white/90 rounded-lg p-3">
//                       <img
//                         src={racket.imageUrl}
//                         alt={racket.name}
//                         className="w-12 h-12 object-contain"
//                       />
//                       <div>
//                         <p className="text-sm font-semibold text-slate-900">
//                           {racket.name}
//                         </p>
//                         <p className="text-xs text-slate-600">{racket.brand}</p>
//                       </div>
//                     </div>
//                   )}

//                   <span className="mt-3 text-sm font-semibold text-emerald-300">
//                     View player →
//                   </span>
//                 </div>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//     </section>
//   );
// }

import Link from "next/link";
import { players } from "@/data/players";
import rackets from "@/data/rackets.json";

const categoryLabels: Record<string, string> = {
  "mens-singles": "Men's Singles",
  "womens-singles": "Women's Singles",
  "mens-doubles": "Men's Doubles",
  "womens-doubles": "Women's Doubles",
  mixed: "Mixed Doubles",
};

export default function PlayerInspiration() {
  const activePlayers = players.filter((p) => p.isActive).slice(0, 8);

  return (
    <section className=" bg-white pt-36">
      <div className="w-full px-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-1">
            Want to see what players use?
          </h2>
          <p className="text-lg text-slate-600">
            Discover the rackets chosen by world-class badminton players
          </p>
        </div>

        {/* Collage Grid */}
        <div className="grid grid-cols-12 grid-rows-6 gap-1.5 h-[900px] ">
          {activePlayers.map((player, index) => {
            const racketUsed = player.racketsUsed.find(
              (r) => r.usageType === "current",
            );
            const racket = racketUsed
              ? rackets.find((r) => r.id === racketUsed.racketId)
              : null;

            const layoutClasses = [
              "col-span-6 row-span-4",
              "col-span-3 row-span-2",
              "col-span-3 row-span-2",
              "col-span-3 row-span-2",
              "col-span-3 row-span-2",
              "col-span-6 row-span-2",
              "col-span-4 row-span-2",
              "col-span-2 row-span-2",
            ][index];

            return (
              <Link
                key={player.id}
                href={`/players/${player.id}`}
                className={`group relative  overflow-hidden border border-slate-200 ${layoutClasses}`}
              >
                {/* 🔴 ONLY CHANGE IS HERE */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.06]"
                  style={{
                    backgroundImage:
                      index === 0
                        ? "url(https://khelnow.com/_next/image?url=https%3A%2F%2Fassets.khelnow.com%2Fnews%2Fuploads%2F2025%2F08%2Fviktor-axelsen-1.jpg&w=1920&q=75)"
                        : index === 1
                          ? "url(https://img.etimg.com/thumb/msid-53735222,width-480,height-360,imgsize-484541,resizemode-75/pv-sindhu-all-you-want-to-know-about-the-badminton-star.jpg)"
                          : index === 2
                            ? "url(https://c.ndtvimg.com/2024-08/8gql5hbo_lakshya-sen_625x300_02_August_24.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605)"
                            : index === 3
                              ? "url(https://us.yonex.com/cdn/shop/files/202501_Shi_2.jpg?v=1740995446&width=3840)"
                              : index === 4
                                ? "url(https://english.news.cn/20240301/92b2fa552f61431d910cfbb5c3794a77/2024030192b2fa552f61431d910cfbb5c3794a77_20240301193bfdc7add14cbf949f64311f9a4845.jpg)"
                                : index === 5
                                  ? "url(https://assets.laliga.com/assets/201704/855x481_16115854carolina-marin.jpg)"
                                  : index === 6
                                    ? "url(https://images.news18.com/ibnlive/uploads/2021/07/1625475682_chirag-shetty-1200-afp.jpg)"
                                    : "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWaXL8QxiYcpYRHlrGiONxclgtWQ5vIgOVCw&s)",
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {/* Content */}
                <div className="relative z-10 h-full p-6 flex flex-col justify-end">
                  <h3 className="text-xl md:text-2xl font-bold text-white">
                    {player.name}
                  </h3>

                  <p className="text-sm text-white/80 mb-2">
                    {categoryLabels[player.category]}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {player.playStyle.slice(0, 2).map((style) => (
                      <span
                        key={style}
                        className="px-2 py-1 text-xs rounded bg-white/20 text-white backdrop-blur"
                      >
                        {style}
                      </span>
                    ))}
                  </div>

                  {racket && (
                    <div className="flex items-center gap-3 bg-white/90 rounded-lg p-3">
                      <img
                        src={racket.imageUrl}
                        alt={racket.name}
                        className="w-12 h-12 object-contain"
                      />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">
                          {racket.name}
                        </p>
                        <p className="text-xs text-slate-600">{racket.brand}</p>
                      </div>
                    </div>
                  )}

                  <span className="mt-3 text-sm font-semibold text-emerald-300">
                    View player →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

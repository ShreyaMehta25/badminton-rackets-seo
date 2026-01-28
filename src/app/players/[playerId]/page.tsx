// import { players, type Player } from "@/data/players";
// import rackets from "@/data/rackets.json";
// import { Racket } from "@/types/racket";
// import type { Metadata } from "next";
// import Script from "next/script";
// import { notFound } from "next/navigation";
// import Link from "next/link";
// import ComparisonTable from "@/components/rackets/ComparisonTable";

// const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

// type Props = {
//   params: Promise<{ playerId: string }>;
// };

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { playerId } = await params;
//   const player = players.find((p) => p.id === playerId);

//   if (!player || !player.isActive || player.racketsUsed.length === 0) {
//     return {
//       title: "Player Not Found",
//     };
//   }

//   const title = `Rackets Used by ${player.name} (2026)`;
//   const description = `Discover the badminton rackets used by ${player.name} from ${player.country}, including specifications, play style fit, and comparisons.`;

//   return {
//     title,
//     description,
//     keywords: [
//       `${player.name} badminton racket`,
//       `badminton racket used by ${player.name}`,
//       `${player.name} racket`,
//       "badminton rackets",
//       "professional badminton players",
//       player.country,
//       player.category,
//     ],
//     robots: {
//       index: true,
//       follow: true,
//     },
//     alternates: {
//       canonical: `${SITE_URL}/players/${playerId}`,
//     },
//     openGraph: {
//       title,
//       description,
//       url: `/players/${playerId}`,
//       siteName: "Badminton Rackets Directory",
//       locale: "en_US",
//       type: "profile",
//     },
//     twitter: {
//       card: "summary",
//       title,
//       description,
//     },
//   };
// }

// export default async function PlayerPage({ params }: Props) {
//   const { playerId } = await params;
//   const player = players.find((p) => p.id === playerId);

//   // Indexing safety: Only show active players with rackets
//   if (!player || !player.isActive || player.racketsUsed.length === 0) {
//     notFound();
//   }

//   // Get racket data for all rackets used by this player
//   type PlayerRacket = {
//     racket: Racket;
//     usageType: "current" | "previous" | "backup";
//   };

//   const playerRackets: PlayerRacket[] = player.racketsUsed
//     .map((racketUsage): PlayerRacket | null => {
//       const racket = (rackets as Racket[]).find(
//         (r) => r.id === racketUsage.racketId
//       );
//       if (!racket) return null;
//       return {
//         racket,
//         usageType: racketUsage.usageType as "current" | "previous" | "backup"
//       };
//     })
//     .filter((item): item is PlayerRacket => item !== null)
//     .sort((a, b) => {
//       // Sort: current first, then backup, then previous
//       const order = { current: 0, backup: 1, previous: 2 };
//       return order[a.usageType] - order[b.usageType];
//     });

//   // If no valid rackets found, show not found
//   if (playerRackets.length === 0) {
//     notFound();
//   }

//   const currentRackets = playerRackets.filter((pr) => pr.usageType === "current");
//   const otherRackets = playerRackets.filter((pr) => pr.usageType !== "current");

//   // Build schema
//   const profileSchema = {
//     "@context": "https://schema.org",
//     "@graph": [
//       {
//         "@type": "ProfilePage",
//         name: `Badminton Rackets Used by ${player.name}`,
//         description: `Information about badminton rackets used by ${player.name}, a professional badminton player from ${player.country}.`,
//         url: `${SITE_URL}/players/${playerId}`,
//         mainEntity: {
//           "@type": "Person",
//           name: player.name,
//           nationality: {
//             "@type": "Country",
//             name: player.country,
//           },
//         },
//       },
//       {
//         "@type": "BreadcrumbList",
//         itemListElement: [
//           {
//             "@type": "ListItem",
//             position: 1,
//             name: "Home",
//             item: SITE_URL,
//           },
//           {
//             "@type": "ListItem",
//             position: 2,
//             name: "Players",
//             item: `${SITE_URL}/players`,
//           },
//           {
//             "@type": "ListItem",
//             position: 3,
//             name: player.name,
//             item: `${SITE_URL}/players/${playerId}`,
//           },
//         ],
//       },
//       {
//         "@type": "ItemList",
//         name: `Badminton Rackets Used by ${player.name}`,
//         numberOfItems: playerRackets.length,
//         itemListElement: playerRackets.map((pr, index) => ({
//           "@type": "ListItem",
//           position: index + 1,
//           item: {
//             "@type": "Product",
//             name: pr.racket.name,
//             url: `${SITE_URL}/rackets/${pr.racket.id}`,
//           },
//         })),
//       },
//     ],
//   };

//   const categoryLabels: Record<string, string> = {
//     "mens-singles": "Men's Singles",
//     "womens-singles": "Women's Singles",
//     "mens-doubles": "Men's Doubles",
//     "womens-doubles": "Women's Doubles",
//     mixed: "Mixed Doubles",
//   };

//   return (
//     <>
//       <Script
//         id="player-schema"
//         type="application/ld+json"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: JSON.stringify(profileSchema),
//         }}
//       />

//       <main className="max-w-7xl mx-auto px-6 py-10">
//         {/* Back to Rackets Button */}
//         <div className="mb-6">
//           <Link
//             href="/rackets"
//             className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors group"
//           >
//             <svg
//               className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
//               />
//             </svg>
//             <span className="font-medium">Go to Rackets</span>
//           </Link>
//         </div>

//         {/* H1 */}
//         <h1 className="text-4xl font-extrabold mb-6">
//           Badminton Rackets Used by {player.name}
//         </h1>

//         {/* Player Overview Section */}
//         <section className="mb-8 bg-slate-800/50 rounded-lg p-6 border border-slate-700">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <h2 className="text-xl font-bold mb-3 text-slate-100">Player Information</h2>
//               <div className="space-y-2 text-slate-300">
//                 <p>
//                   <span className="font-semibold">Name:</span> {player.name}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Country:</span> {player.country}
//                 </p>
//                 <p>
//                   <span className="font-semibold">Category:</span>{" "}
//                   {categoryLabels[player.category] || player.category}
//                 </p>
//               </div>
//             </div>
//             <div>
//               <h2 className="text-xl font-bold mb-3 text-slate-100">Play Style</h2>
//               <div className="flex flex-wrap gap-2">
//                 {player.playStyle.map((style) => (
//                   <span
//                     key={style}
//                     className="px-3 py-1 rounded-lg bg-emerald-600/20 border border-emerald-500/30 text-emerald-200 text-sm"
//                   >
//                     {style.charAt(0).toUpperCase() + style.slice(1)}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Rackets Section */}
//         <section className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">
//             Rackets Used by {player.name}
//           </h2>

//           {currentRackets.length > 0 && (
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-3 text-slate-300">
//                 Current Rackets
//               </h3>
//               <ComparisonTable
//                 rackets={currentRackets.map((pr) => pr.racket)}
//               />
//             </div>
//           )}

//           {otherRackets.length > 0 && (
//             <div>
//               <h3 className="text-lg font-semibold mb-3 text-slate-300">
//                 Other Rackets
//               </h3>
//               <ComparisonTable rackets={otherRackets.map((pr) => pr.racket)} />
//             </div>
//           )}

//           {/* Contextual Explanation */}
//           <div className="mt-6 bg-slate-800/50 rounded-lg p-6 border border-slate-700">
//             <h3 className="text-lg font-semibold mb-3 text-slate-100">
//               Why These Rackets Suit {player.name}
//             </h3>
//             <p className="text-slate-300 leading-relaxed">
//               {player.name} from {player.country} competes in{" "}
//               {categoryLabels[player.category] || player.category} and is known
//               for a {player.playStyle.join(" and ")} playing style. The rackets
//               used by {player.name} are selected to match their{" "}
//               {player.playStyle.join(", ")} approach, providing the optimal
//               balance of power, control, and speed required for competitive play
//               at the highest level.
//             </p>
//           </div>
//         </section>

//         {/* Internal Links Section */}
//         <section className="mt-8 pt-6 border-t border-slate-700">
//           <h2 className="text-xl font-bold mb-4">Related Links</h2>
//           <div className="space-y-2">
//             <div>
//               <h3 className="font-semibold mb-2 text-slate-300">Racket Pages</h3>
//               <ul className="flex flex-wrap gap-2">
//                 {playerRackets.map((pr) => (
//                   <li key={pr.racket.id}>
//                     <Link
//                       href={`/rackets/${pr.racket.id}`}
//                       className="text-blue-400 hover:text-blue-300 underline"
//                     >
//                       {pr.racket.name}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         </section>
//       </main>
//     </>
//   );
// }
import { players } from "@/data/players";
import rackets from "@/data/rackets.json";
import { Racket } from "@/types/racket";
import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import Link from "next/link";
import ComparisonTable from "@/components/rackets/ComparisonTable";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.com";

type Props = {
  params: Promise<{ playerId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { playerId } = await params;
  const player = players.find((p) => p.id === playerId);

  if (!player || !player.isActive || player.racketsUsed.length === 0) {
    return { title: "Player Not Found" };
  }

  return {
    title: `Rackets Used by ${player.name} (2026)`,
    description: `Discover the badminton rackets used by ${player.name}.`,
    alternates: {
      canonical: `${SITE_URL}/players/${playerId}`,
    },
  };
}

export default async function PlayerPage({ params }: Props) {
  const { playerId } = await params;
  const player = players.find((p) => p.id === playerId);

  if (!player || !player.isActive || player.racketsUsed.length === 0) {
    notFound();
  }

  const playerRackets = player.racketsUsed
    .map((ru) => {
      const racket = (rackets as Racket[]).find((r) => r.id === ru.racketId);
      if (!racket) return null;
      return { racket, usageType: ru.usageType };
    })
    .filter(Boolean) as { racket: Racket; usageType: string }[];

  const currentRackets = playerRackets.filter((r) => r.usageType === "current");
  const otherRackets = playerRackets.filter((r) => r.usageType !== "current");

  const categoryLabels: Record<string, string> = {
    "mens-singles": "Men's Singles",
    "womens-singles": "Women's Singles",
    "mens-doubles": "Men's Doubles",
    "womens-doubles": "Women's Doubles",
    mixed: "Mixed Doubles",
  };

  return (
    <>
      <main className="max-w-[1920px] mx-auto px-6 py-8">
        {/* Back */}
        <Link
          href="/rackets"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 mb-5"
        >
          ← Go to Rackets
        </Link>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
          Badminton Rackets Used by {player.name}
        </h1>

        {/* Player Overview */}
        <section className="mb-8 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Player Info */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                Player Information
              </h2>
              <div className="space-y-1.5 text-slate-700">
                <p>
                  <span className="font-semibold">Name:</span> {player.name}
                </p>
                <p>
                  <span className="font-semibold">Country:</span>{" "}
                  {player.country}
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {categoryLabels[player.category] || player.category}
                </p>
              </div>
            </div>

            {/* Play Style */}
            <div>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                Play Style
              </h2>
              <div className="flex flex-wrap gap-2">
                {player.playStyle.map((style) => (
                  <span
                    key={style}
                    className="px-3 py-1 rounded-md bg-emerald-100 text-emerald-700 text-sm font-medium border border-emerald-200"
                  >
                    {style.charAt(0).toUpperCase() + style.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Rackets */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">
            Rackets Used by {player.name}
          </h2>

          {currentRackets.length > 0 && (
            <div className="mb-6">
              <h3 className="text-base font-semibold text-slate-700 mb-2">
                Current Rackets
              </h3>
              <ComparisonTable rackets={currentRackets.map((r) => r.racket)} />
            </div>
          )}

          {otherRackets.length > 0 && (
            <div>
              <h3 className="text-base font-semibold text-slate-700 mb-2">
                Other Rackets
              </h3>
              <ComparisonTable rackets={otherRackets.map((r) => r.racket)} />
            </div>
          )}
        </section>

        {/* Explanation */}
        <section className="bg-slate-50 border border-slate-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-3">
            Why These Rackets Suit {player.name}
          </h3>
          <p className="text-slate-700 leading-relaxed">
            {player.name} competes in{" "}
            {categoryLabels[player.category] || player.category} and is known
            for a {player.playStyle.join(" and ")} playing style. These rackets
            are chosen to support that approach with the right balance of power,
            control, and speed at a professional level.
          </p>
        </section>
      </main>
    </>
  );
}

// import Link from "next/link";

// export default function Footer() {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-slate-100 border-t border-slate-200 mt-8">
//       <div className="max-w-7xl mx-auto px-6 py-12">
//         {/* Top Section - 4 Columns */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
//           {/* Brand Column */}
//           <div>
//             <h3 className="font-semibold text-slate-700 mb-3">SmashSelect</h3>
//             <p className="text-sm text-slate-600 leading-relaxed">
//               Expert-curated guides and comparisons to help you find the perfect
//               racket for your game.
//             </p>
//           </div>

//           {/* Explore Column */}
//           <div>
//             <h4 className="font-medium text-slate-900 mb-3">Explore</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="/rackets"
//                   className="text-slate-600 hover:text-slate-900 transition-colors"
//                 >
//                   All Rackets
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/rackets"
//                   className="text-slate-600 hover:text-slate-900 transition-colors"
//                 >
//                   Compare Rackets
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/#expert-picks"
//                   className="text-slate-600 hover:text-slate-900 transition-colors"
//                 >
//                   Expert Picks
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/#playstyle-guide"
//                   className="text-slate-600 hover:text-slate-900 transition-colors"
//                 >
//                   Playstyle Guide
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/#weight-guide"
//                   className="text-slate-600 hover:text-slate-900 transition-colors"
//                 >
//                   Weight Guide
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* Learn Column */}
//           <div>
//             <h4 className="font-medium text-slate-900 mb-3">Learn</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="/#buying-guide"
//                   className="text-slate-600 hover:text-slate-900 transition-colors"
//                 >
//                   Buying Guide
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/#faq"
//                   className="text-slate-600 hover:text-slate-900 transition-colors"
//                 >
//                   FAQs
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/#educational"
//                   className="text-slate-600 hover:text-slate-900 transition-colors"
//                 >
//                   Blog / Guides
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* About Column */}
//           <div>
//             <h4 className="font-medium text-slate-900 mb-3">About</h4>
//             <ul className="space-y-2 text-sm">
//               <li>
//                 <Link
//                   href="/#about"
//                   className="text-slate-600 hover:text-slate-900 transition-colors"
//                 >
//                   About Us
//                 </Link>
//               </li>
//               <li>
//                 <Link
//                   href="/#contact"
//                   className="text-slate-600 hover:text-slate-900 transition-colors"
//                 >
//                   Contact
//                 </Link>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="pt-8 border-t border-slate-200">
//           <p className="text-sm text-slate-500 text-center">
//             © {currentYear} Badminton Rackets Directory
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// }
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 border-t border-slate-200 mt-9">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* ONE ROW */}
        <div className="flex items-start justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-xs">
            <h3 className="font-semibold text-slate-900 mb-3">SmashSelect</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              A badminton racket discovery platform built to simplify decisions.
              Compare rackets by skill level, playstyle, weight, and real
              performance — without marketing noise.
            </p>
          </div>

          {/* Skill Level */}
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Choose by Skill</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/rackets/beginner"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Beginner
                </Link>
              </li>
              <li>
                <Link
                  href="/rackets/intermediate"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Intermediate
                </Link>
              </li>
              <li>
                <Link
                  href="/rackets/advanced"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Advanced
                </Link>
              </li>
            </ul>
          </div>

          {/* Playstyle & Specs */}
          <div>
            <h4 className="font-medium text-slate-900 mb-3">
              Playstyle & Specs
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/rackets/power"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Power / Smash
                </Link>
              </li>
              <li>
                <Link
                  href="/rackets/control"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Control
                </Link>
              </li>
              <li>
                <Link
                  href="/rackets/speed"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Speed
                </Link>
              </li>
              <li>
                <Link
                  href="/rackets/head-heavy"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Head-Heavy
                </Link>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-medium text-slate-900 mb-3">Explore</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/rackets"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Full Catalogue
                </Link>
              </li>
              <li>
                <Link
                  href="/#expert-picks"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Expert Picks
                </Link>
              </li>
              <li>
                <Link
                  href="/#playstyle-guide"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Playstyle Guide
                </Link>
              </li>
              <li>
                <Link
                  href="/#weight-guide"
                  className="text-slate-600 hover:text-slate-900"
                >
                  Weight Guide
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-slate-200">
          <p className="text-sm text-slate-500">
            © {currentYear} SmashSelect — Built for badminton players.
          </p>
        </div>
      </div>
    </footer>
  );
}

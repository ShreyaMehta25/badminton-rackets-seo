'use client';

import { players } from '@/data/players';
import rackets from '@/data/rackets.json';
import Link from 'next/link';
import { User } from 'lucide-react';

interface PlayerShowcaseProps {
  maxPlayers?: number;
}

const categoryLabels: Record<string, string> = {
  'mens-singles': "Men's Singles",
  'womens-singles': "Women's Singles",
  'mens-doubles': "Men's Doubles",
  'womens-doubles': "Women's Doubles",
  'mixed': "Mixed Doubles"
};

const countryFlags: Record<string, string> = {
  'Denmark': '🇩🇰',
  'India': '🇮🇳',
  'China': '🇨🇳',
  'Taiwan': '🇹🇼',
  'Spain': '🇪🇸',
  'Indonesia': '🇮🇩',
  'Japan': '🇯🇵',
  'Malaysia': '🇲🇾',
  'Thailand': '🇹🇭',
  'Korea': '🇰🇷'
};

// Generate avatar color based on player name
function getAvatarColor(name: string): string {
  const colors = [
    'bg-emerald-500',
    'bg-blue-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-orange-500',
    'bg-teal-500'
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export default function PlayerShowcase({ maxPlayers = 9 }: PlayerShowcaseProps) {
  const activePlayers = players.filter(p => p.isActive).slice(0, maxPlayers);

  if (activePlayers.length === 0) return null;

  return (
    <div className="py-16 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100">
            Rackets Used by Professional Players
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Discover the rackets chosen by world-class badminton players
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activePlayers.map((player) => {
            const currentRacket = player.racketsUsed.find(r => r.usageType === 'current');
            const racketData = currentRacket
              ? rackets.find(r => r.id === currentRacket.racketId)
              : null;

            return (
              <div
                key={player.id}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 hover:border-emerald-500/50 transition-all hover:-translate-y-1 group"
              >
                {/* Player Avatar/Image */}
                <div className="relative h-48 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                  <div className={`w-24 h-24 rounded-full ${getAvatarColor(player.name)} flex items-center justify-center text-4xl font-bold text-white shadow-xl`}>
                    {player.name.charAt(0)}
                  </div>

                  {/* Country Flag */}
                  <div className="absolute top-4 right-4 text-4xl">
                    {countryFlags[player.country] || '🏳️'}
                  </div>
                </div>

                {/* Player Info */}
                <div className="p-6 space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                      {player.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <span>{countryFlags[player.country] || '🏳️'}</span>
                      <span>{player.country}</span>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-500 text-white">
                      {categoryLabels[player.category] || player.category}
                    </span>
                  </div>

                  {/* Play Style Tags */}
                  <div className="flex flex-wrap gap-2">
                    {player.playStyle.map((style) => (
                      <span
                        key={style}
                        className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-700 text-slate-300 capitalize"
                      >
                        {style}
                      </span>
                    ))}
                  </div>

                  {/* Current Racket */}
                  {racketData && (
                    <div className="pt-4 border-t border-slate-700 space-y-2">
                      <p className="text-xs text-slate-500 uppercase tracking-wide">
                        Current Racket
                      </p>
                      <Link
                        href={`/rackets/${racketData.id}`}
                        className="block group/racket"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-16 bg-slate-900 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={racketData.imageUrl}
                              alt={racketData.name}
                              className="w-full h-full object-contain p-1 group-hover/racket:scale-110 transition-transform"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-slate-200 group-hover/racket:text-emerald-400 transition-colors truncate">
                              {racketData.brand}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                              {racketData.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  )}

                  {/* View Profile Link */}
                  <Link
                    href={`/players/${player.id}`}
                    className="block w-full text-center bg-emerald-500 hover:bg-emerald-400 text-white font-semibold py-3 px-4 rounded-lg transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40"
                  >
                    View Player Profile →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

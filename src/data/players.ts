export type Player = {
  id: string;
  name: string;
  country: string;
  category: "mens-singles" | "womens-singles" | "mens-doubles" | "womens-doubles" | "mixed";
  racketsUsed: {
    racketId: string; // must match racket.id from rackets.json
    usageType: "current" | "previous" | "backup";
  }[];
  playStyle: string[];
  isActive: boolean;
};

export const players: Player[] = [
  {
    id: "viktor-axelsen",
    name: "Viktor Axelsen",
    country: "Denmark",
    category: "mens-singles",
    racketsUsed: [
      {
        racketId: "yonex-astrox-100zz",
        usageType: "current",
      },
    ],
    playStyle: ["power", "attacking", "singles"],
    isActive: true,
  },
  {
    id: "pv-sindhu",
    name: "PV Sindhu",
    country: "India",
    category: "womens-singles",
    racketsUsed: [
      {
        racketId: "yonex-arcsaber-11-pro",
        usageType: "current",
      },
    ],
    playStyle: ["power", "attacking", "singles"],
    isActive: true,
  },
  {
    id: "lakshya-sen",
    name: "Lakshya Sen",
    country: "India",
    category: "mens-singles",
    racketsUsed: [
      {
        racketId: "yonex-nanoflare-1000z",
        usageType: "current",
      },
    ],
    playStyle: ["speed", "control", "singles"],
    isActive: true,
  },
  {
    id: "shi-yu-qi",
    name: "Shi Yu Qi",
    country: "China",
    category: "mens-singles",
    racketsUsed: [
      {
        racketId: "yonex-astrox-100zz",
        usageType: "current",
      },
    ],
    playStyle: ["power", "attacking", "singles"],
    isActive: true,
  },
  {
    id: "chou-tien-chen",
    name: "Chou Tien Chen",
    country: "Taiwan",
    category: "mens-singles",
    racketsUsed: [
      {
        racketId: "yonex-astrox-100zz",
        usageType: "current",
      },
    ],
    playStyle: ["control", "defensive", "singles"],
    isActive: true,
  },
  {
    id: "carolina-marin",
    name: "Carolina Marín",
    country: "Spain",
    category: "womens-singles",
    racketsUsed: [
      {
        racketId: "yonex-nanoflare-1000z",
        usageType: "current",
      },
    ],
    playStyle: ["power", "attacking", "singles"],
    isActive: true,
  },
  {
    id: "chirag-shetty",
    name: "Chirag Shetty",
    country: "India",
    category: "mens-doubles",
    racketsUsed: [
      {
        racketId: "yonex-astrox-88d-pro",
        usageType: "current",
      },
    ],
    playStyle: ["power", "doubles", "attacking"],
    isActive: true,
  },
  {
    id: "hs-prannoy",
    name: "HS Prannoy",
    country: "India",
    category: "mens-singles",
    racketsUsed: [
      {
        racketId: "yonex-duora-10",
        usageType: "current",
      },
      {
        racketId: "yonex-nanoflare-700-pro",
        usageType: "backup",
      },
    ],
    playStyle: ["power", "control", "singles"],
    isActive: true,
  },
  {
    id: "lee-zii-jia",
    name: "Lee Zii Jia",
    country: "Malaysia",
    category: "mens-singles",
    racketsUsed: [
      {
        racketId: "yonex-astrox-100zz",
        usageType: "current",
      },
      {
        racketId: "yonex-nanoflare-1000z",
        usageType: "backup",
      },
    ],
    playStyle: ["power", "attacking", "singles"],
    isActive: true,
  },
  {
    id: "anders-antonsen",
    name: "Anders Antonsen",
    country: "Denmark",
    category: "mens-singles",
    racketsUsed: [
      {
        racketId: "yonex-astrox-100zz",
        usageType: "current",
      },
    ],
    playStyle: ["control", "defensive", "singles"],
    isActive: true,
  },
  {
    id: "chen-long",
    name: "Chen Long",
    country: "China",
    category: "mens-singles",
    racketsUsed: [
      {
        racketId: "yonex-arcsaber-11-pro",
        usageType: "current",
      },
    ],
    playStyle: ["control", "defensive", "singles"],
    isActive: true,
  },
];

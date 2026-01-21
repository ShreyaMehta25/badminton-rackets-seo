export type Racket = {
  id: string;
  name: string;
  brand: string;
  price: number;
  weight: string;
  balance: "head-heavy" | "even" | "head-light";
  flex: string;
  playerLevel: "beginner" | "intermediate" | "advanced";
  bestFor: string[];
  playStyles: string[];
  imageUrl: string;
  reviewScore: number;
  pros: string[];
  cons: string[];
  affiliateUrl: string;
  description?: string;
};

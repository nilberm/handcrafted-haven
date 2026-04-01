export type ProductReview = {
  id: string;
  author: string;
  rating: number;
  body: string;
  createdAt: string;
};

const reviewsByProduct: Record<string, ProductReview[]> = {
  "desert-mug": [
    {
      id: "r1",
      author: "Jordan P.",
      rating: 5,
      body: "Feels substantial in the hand and the glaze is even prettier in person. My daily coffee mug now.",
      createdAt: "2026-02-14",
    },
    {
      id: "r2",
      author: "Sam K.",
      rating: 4,
      body: "Lovely piece. Slightly smaller than I pictured but still holds a full pour. Packed with care.",
      createdAt: "2026-01-03",
    },
  ],
  "moon-bowl": [
    {
      id: "r3",
      author: "Alex M.",
      rating: 5,
      body: "The rim detail is subtle and elegant. We use it for yogurt and small salads.",
      createdAt: "2026-03-01",
    },
  ],
  "mesa-vase": [
    {
      id: "r4",
      author: "Riley T.",
      rating: 5,
      body: "Perfect for a single stem. The matte outside / glossy inside is a nice contrast.",
      createdAt: "2025-11-20",
    },
  ],
  "walnut-board": [
    {
      id: "r5",
      author: "Chris D.",
      rating: 5,
      body: "Heavy, flat, and the juice groove actually helps. Re-oiled once so far—easy.",
      createdAt: "2026-02-28",
    },
    {
      id: "r6",
      author: "Pat N.",
      rating: 4,
      body: "Beautiful grain. Rubber feet keep it steady. Would buy again.",
      createdAt: "2025-12-10",
    },
  ],
  "maple-spoon": [
    {
      id: "r7",
      author: "Morgan L.",
      rating: 5,
      body: "Smooth finish, comfortable handle. Great for deglazing the pan.",
      createdAt: "2026-01-18",
    },
  ],
};

export function getReviewsForProduct(productId: string): ProductReview[] {
  return reviewsByProduct[productId] ?? [];
}

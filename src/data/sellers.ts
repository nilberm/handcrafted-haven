export type ProductGalleryImage = {
  src: string;
  alt: string;
};

export type SellerProduct = {
  id: string;
  title: string;
  description: string;
  priceCents: number;
  imageSrc: string;
  imageAlt: string;
  gallery?: ProductGalleryImage[];
};

export type SellerProfile = {
  id: string;
  displayName: string;
  tagline: string;
  story: string;
  location: string;
  memberSince: string;
  avatarSrc: string;
  avatarAlt: string;
  products: SellerProduct[];
};

const sellers: Record<string, SellerProfile> = {
  "elena-vega": {
    id: "elena-vega",
    displayName: "Elena Vega",
    tagline: "Ceramic artist · small-batch glazes inspired by the desert",
    story:
      "I started throwing clay in my garage ten years ago and never stopped. Each piece is fired in my home studio and finished with glazes I mix by hand. I care about pieces that feel good in the hand and last for everyday rituals—morning coffee, shared meals, quiet evenings.",
    location: "Santa Fe, NM",
    memberSince: "2019",
    avatarSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop",
    avatarAlt: "Portrait of ceramic artist Elena Vega smiling in her studio",
    products: [
      {
        id: "desert-mug",
        title: "Desert glaze mug",
        description:
          "Speckled stoneware mug with a soft sage exterior and toasted rim. Holds about 12 oz; dishwasher-safe.",
        priceCents: 3800,
        imageSrc:
          "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop",
        imageAlt: "Handmade ceramic mug with sage green glaze on a wooden table",
        gallery: [
          {
            src: "https://images.unsplash.com/photo-1610701596007-11502849dc13?w=600&h=600&fit=crop",
            alt: "Close-up of ceramic mug rim and glaze texture",
          },
          {
            src: "https://images.unsplash.com/photo-1578749556568-b2d01cd5128e?w=600&h=600&fit=crop",
            alt: "Mug beside matching ceramic pieces on a shelf",
          },
        ],
      },
      {
        id: "moon-bowl",
        title: "Moonlit cereal bowl",
        description:
          "Shallow bowl with a satin white interior and iron-rich rim detail. Great for breakfast or small sides.",
        priceCents: 4200,
        imageSrc:
          "https://images.unsplash.com/photo-1610701596007-11502849dc13?w=600&h=600&fit=crop",
        imageAlt: "Minimal white ceramic bowl with dark rim on neutral background",
      },
      {
        id: "mesa-vase",
        title: "Mesa bud vase",
        description:
          "Slim vase for a single stem or dried bundle. Unglazed exterior with a glossy interior for easy cleaning.",
        priceCents: 2900,
        imageSrc:
          "https://images.unsplash.com/photo-1578749556568-b2d01cd5128e?w=600&h=600&fit=crop",
        imageAlt: "Tall narrow ceramic vase with matte finish",
      },
    ],
  },
  "marcus-cho": {
    id: "marcus-cho",
    displayName: "Marcus Cho",
    tagline: "Woodworker · heirloom cutting boards and kitchen staples",
    story:
      "I work with locally sourced hardwoods and oil finishes that are food-safe and easy to refresh. My goal is simple: tools and boards that age gracefully and stay in your kitchen for decades, not seasons.",
    location: "Portland, OR",
    memberSince: "2021",
    avatarSrc:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    avatarAlt: "Portrait of woodworker Marcus Cho in his workshop",
    products: [
      {
        id: "walnut-board",
        title: "Walnut edge-grain board",
        description:
          "Edge-grain construction with juice groove and rubber feet. Finished with mineral oil and beeswax.",
        priceCents: 8900,
        imageSrc:
          "https://images.unsplash.com/photo-1602874801006-8e0c8e4b0b0e?w=600&h=600&fit=crop",
        imageAlt: "Dark walnut wooden cutting board on a kitchen counter",
        gallery: [
          {
            src: "https://images.unsplash.com/photo-1584990347449-a8b2917adc0e?w=600&h=600&fit=crop",
            alt: "Wooden kitchen tools and board from the same maker",
          },
        ],
      },
      {
        id: "maple-spoon",
        title: "Carved maple cooking spoon",
        description:
          "Comfortable handle, slightly deeper bowl for stirring sauces. Sanded silky smooth and oiled.",
        priceCents: 2400,
        imageSrc:
          "https://images.unsplash.com/photo-1584990347449-a8b2917adc0e?w=600&h=600&fit=crop",
        imageAlt: "Hand-carved wooden spoon on linen cloth",
      },
    ],
  },
};

export function getSellerById(id: string): SellerProfile | undefined {
  return sellers[id];
}

export function listSellerIds(): string[] {
  return Object.keys(sellers);
}

export function findProductWithSeller(
  productId: string,
): { seller: SellerProfile; product: SellerProduct } | undefined {
  for (const seller of Object.values(sellers)) {
    const product = seller.products.find((p) => p.id === productId);
    if (product) return { seller, product };
  }
  return undefined;
}

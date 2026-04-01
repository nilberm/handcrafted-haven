export type CartLineItem = {
  productId: string;
  title: string;
  priceCents: number;
  imageSrc: string;
  imageAlt: string;
  sellerId: string;
  sellerName: string;
  quantity: number;
};

export type AddToCartInput = Omit<CartLineItem, "quantity"> & {
  quantity?: number;
};

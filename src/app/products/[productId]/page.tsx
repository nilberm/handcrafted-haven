import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductGallery } from "@/components/product-gallery";
import { ProductReviewSection } from "@/components/product-review-section";
import { getReviewsForProduct } from "@/data/product-reviews";
import { findProductWithSeller } from "@/data/sellers";
import { formatUsd } from "@/lib/format-money";

type PageProps = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params;
  const found = findProductWithSeller(productId);
  if (!found) {
    return { title: "Product not found · Handcrafted Haven" };
  }
  const { product, seller } = found;
  return {
    title: `${product.title} · Handcrafted Haven`,
    description: `${product.description.slice(0, 155)}… Sold by ${seller.displayName}.`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { productId } = await params;
  const found = findProductWithSeller(productId);
  if (!found) notFound();

  const { seller, product } = found;
  const galleryImages = [
    { src: product.imageSrc, alt: product.imageAlt },
    ...(product.gallery ?? []),
  ];
  const initialReviews = getReviewsForProduct(product.id);

  return (
    <div className="min-h-screen bg-[#e3e6e6] text-neutral-900">
      <a
        href="#product-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[#375e21] focus:px-3 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
      >
        Skip to product
      </a>

      <main
        id="product-main"
        className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
      >
        <nav className="mb-8 text-sm text-neutral-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href={`/profile/${seller.id}`}
                className="font-medium text-[#375e21] underline-offset-2 hover:underline"
              >
                {seller.displayName}
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="text-neutral-800">{product.title}</li>
          </ol>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
          <div>
            <ProductGallery images={galleryImages} priority />
          </div>
          <div>
            <p className="text-sm font-medium text-[#375e21]">Handcrafted item</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-[#2d4f1b]">
              <span className="sr-only">Price </span>
              {formatUsd(product.priceCents)}
            </p>
            <p className="mt-6 leading-relaxed text-neutral-800">{product.description}</p>
            <p className="mt-6 text-sm text-neutral-600">
              Sold by{" "}
              <Link
                href={`/profile/${seller.id}`}
                className="font-medium text-[#375e21] underline-offset-2 hover:underline"
              >
                {seller.displayName}
              </Link>
              <span className="text-neutral-500"> · {seller.location}</span>
            </p>
            <AddToCart
              product={{
                productId: product.id,
                title: product.title,
                priceCents: product.priceCents,
                imageSrc: product.imageSrc,
                imageAlt: product.imageAlt,
                sellerId: seller.id,
                sellerName: seller.displayName,
              }}
            />
          </div>
        </div>

        <ProductReviewSection productId={product.id} initialReviews={initialReviews} />
      </main>
    </div>
  );
}

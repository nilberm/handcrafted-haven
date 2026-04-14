import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AddToCart } from "@/components/add-to-cart";
import { ProductGallery } from "@/components/product-gallery";
import { ProductReviewSection } from "@/components/product-review-section";
import { getReviewsForProduct } from "@/lib/supabase/reviews";
import { createClient } from "@/lib/supabase/server";
import { getProduct } from "@/lib/supabase/queries";
import { formatUsd } from "@/lib/format-money";
import { ProductWithSeller } from "@/types/database";

type PageProps = {
  params: Promise<{ productId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { productId } = await params;
  try {
    const product = await getProduct(productId) as ProductWithSeller;
    return {
      title: `${product.name} · Handcrafted Haven`,
      description: `${product.description?.slice(0, 155)}… Sold by ${product.profiles.full_name}.`,
    };
  } catch {
    return { title: "Product not found · Handcrafted Haven" };
  }
}

export default async function ProductPage({ params }: PageProps) {
  const { productId } = await params;
  
  let product: ProductWithSeller;
  try {
    product = await getProduct(productId) as unknown as ProductWithSeller;
  } catch {
    notFound();
  }

  const seller = product.profiles;
  const galleryImages = [
    { src: product.image_url || '', alt: product.name },
  ];

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const initialReviews = await getReviewsForProduct(product.id);

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-neutral-900">
      <a
        href="#product-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[#375e21] focus:px-3 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
      >
        Skip to product
      </a>

      <main
        id="product-main"
        className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8"
      >
        <nav className="mb-8 text-sm text-neutral-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2">
            <li>
              <Link
                href={`/profile/${seller.id}`}
                className="font-bold text-[#375e21] uppercase tracking-widest text-[10px] hover:underline"
              >
                {seller.full_name}
              </Link>
            </li>
            <li aria-hidden className="text-gray-300">/</li>
            <li className="text-gray-400 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
          <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
            <ProductGallery images={galleryImages} priority />
          </div>
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="text-xs font-bold text-[#375e21] uppercase tracking-[0.2em]">Handcrafted Treasure</p>
              <h1 className="text-4xl font-extrabold tracking-tight text-[#375e21] sm:text-5xl">
                {product.name}
              </h1>
            </div>
            
            <p className="text-3xl font-bold text-[#375e21]">
              <span className="sr-only">Price </span>
              {formatUsd(product.price)}
            </p>

            <div className="prose prose-neutral">
              <p className="leading-relaxed text-gray-600 text-lg">{product.description}</p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
               <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 relative">
                  {seller.avatar_url && <Image src={seller.avatar_url} alt={seller.full_name || ''} fill className="object-cover" />}
               </div>
               <div>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sold by Artisan</p>
                  <Link 
                    href={`/profile/${seller.id}`}
                    className="text-lg font-bold text-[#375e21] hover:underline"
                  >
                    {seller.full_name}
                  </Link>
               </div>
            </div>

            <AddToCart
              product={{
                productId: product.id,
                title: product.name,
                priceCents: product.price,
                imageSrc: product.image_url || '',
                imageAlt: product.name,
                sellerId: seller.id,
                sellerName: seller.full_name || 'Artisan',
              }}
            />
          </div>
        </div>

        <div className="mt-24 border-t border-gray-100 pt-16">
          <ProductReviewSection
            productId={product.id}
            initialReviews={initialReviews}
            currentUserId={user?.id ?? null}
          />
        </div>
      </main>
    </div>
  );
}

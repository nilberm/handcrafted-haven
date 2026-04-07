import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProfile, getSellerProducts } from "@/lib/supabase/queries";
import { formatUsd } from "@/lib/format-money";

type PageProps = {
  params: Promise<{ sellerId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sellerId } = await params;
  try {
    const seller = await getProfile(sellerId);
    return {
      title: `${seller.full_name || 'Artisan'} · Seller profile · Handcrafted Haven`,
      description: seller.bio || `Explore unique creations from ${seller.full_name}`,
    };
  } catch {
    return { title: "Seller not found · Handcrafted Haven" };
  }
}

export default async function SellerProfilePage({ params }: PageProps) {
  const { sellerId } = await params;
  
  let seller;
  let products;
  
  try {
    seller = await getProfile(sellerId);
    products = await getSellerProducts(sellerId);
  } catch {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-neutral-900">
      <a
        href="#profile-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[#375e21] focus:px-3 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
      >
        Skip to profile content
      </a>

      <main
        id="profile-main"
        className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8"
      >
        <header className="mb-10 flex flex-col gap-6 border-b border-neutral-300 pb-10 sm:flex-row sm:items-start">
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md ring-1 ring-neutral-200 bg-gray-100">
            {seller.avatar_url && (
              <Image
                src={seller.avatar_url}
                alt={seller.full_name || 'Artisan'}
                fill
                className="object-cover"
                sizes="128px"
                priority
              />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-[#375e21] uppercase tracking-widest text-[10px]">Artisan Profile</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {seller.full_name || 'Anonymous Artisan'}
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-neutral-700 font-medium">
              {seller.bio}
            </p>
            {seller.username && (
              <p className="mt-1 text-sm text-gray-400 font-mono">@{seller.username}</p>
            )}
          </div>
        </header>

        <section
          className="mb-12 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm"
          aria-labelledby="about-heading"
        >
          <h2
            id="about-heading"
            className="text-xl font-bold text-[#375e21]"
          >
            Story &amp; craft
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-neutral-800 whitespace-pre-wrap">
            {seller.craft_story || 'This artisan is still crafting their story. Check back soon!'}
          </p>
        </section>

        <section aria-labelledby="shop-heading">
          <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="shop-heading"
              className="text-2xl font-bold text-[#375e21]"
            >
              Handcrafted items
            </h2>
            <p className="text-sm font-bold text-gray-300">
              {products.length}{" "}
              {products.length === 1 ? "listing" : "listings"}
            </p>
          </div>

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id}>
                <article className="group h-full flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
                  <Link
                    href={`/products/${product.id}`}
                    className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#375e21] focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-square w-full bg-neutral-100">
                      {product.image_url && (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover transition group-hover:opacity-95"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold text-[#375e21] group-hover:text-[#2d4f1b]">
                        {product.name}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-gray-500">
                        {product.description}
                      </p>
                      <p className="mt-6 pt-4 border-t border-gray-50 text-base font-bold text-[#375e21] flex justify-between items-center">
                        <span className="text-gray-300 text-[10px] uppercase tracking-widest font-bold">Price</span>
                        {formatUsd(product.price)}
                      </p>
                    </div>
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSellerById } from "@/data/sellers";
import { formatUsd } from "@/lib/format-money";

type PageProps = {
  params: Promise<{ sellerId: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { sellerId } = await params;
  const seller = getSellerById(sellerId);
  if (!seller) {
    return { title: "Seller not found · Handcrafted Haven" };
  }
  return {
    title: `${seller.displayName} · Seller profile · Handcrafted Haven`,
    description: `${seller.tagline} ${seller.story.slice(0, 140)}…`,
  };
}

export default async function SellerProfilePage({ params }: PageProps) {
  const { sellerId } = await params;
  const seller = getSellerById(sellerId);
  if (!seller) notFound();

  return (
    <div className="min-h-screen bg-[#e3e6e6] text-neutral-900">
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
          <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-white shadow-md ring-1 ring-neutral-200">
            <Image
              src={seller.avatarSrc}
              alt={seller.avatarAlt}
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-[#375e21]">Seller profile</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
              {seller.displayName}
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-neutral-700">
              {seller.tagline}
            </p>
            <dl className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-neutral-600">
              <div>
                <dt className="sr-only">Location</dt>
                <dd>{seller.location}</dd>
              </div>
              <div>
                <dt className="sr-only">Member since</dt>
                <dd>Member since {seller.memberSince}</dd>
              </div>
            </dl>
          </div>
        </header>

        <section
          className="mb-12"
          aria-labelledby="about-heading"
        >
          <h2
            id="about-heading"
            className="text-xl font-semibold text-[#2d4f1b]"
          >
            Story &amp; craft
          </h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-neutral-800">
            {seller.story}
          </p>
        </section>

        <section aria-labelledby="shop-heading">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <h2
              id="shop-heading"
              className="text-xl font-semibold text-[#2d4f1b]"
            >
              Handcrafted items
            </h2>
            <p className="text-sm text-neutral-600">
              {seller.products.length}{" "}
              {seller.products.length === 1 ? "listing" : "listings"}
            </p>
          </div>

          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {seller.products.map((product) => (
              <li key={product.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-lg border border-neutral-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                  <Link
                    href={`/products/${product.id}`}
                    className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#375e21] focus-visible:ring-offset-2"
                  >
                    <div className="relative aspect-square w-full bg-neutral-100">
                      <Image
                        src={product.imageSrc}
                        alt={product.imageAlt}
                        fill
                        className="object-cover transition group-hover:opacity-95"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="text-lg font-semibold text-neutral-900 group-hover:text-[#375e21]">
                        {product.title}
                      </h3>
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                        {product.description}
                      </p>
                      <p className="mt-auto pt-4 text-base font-semibold text-[#2d4f1b]">
                        <span className="sr-only">Price </span>
                        {formatUsd(product.priceCents)}
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

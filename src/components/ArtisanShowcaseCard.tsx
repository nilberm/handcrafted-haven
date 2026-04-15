import Link from "next/link";
import Image from "next/image";
import { Profile, Product } from "@/types/database";
import { formatUsd } from "@/lib/format-money";
import { ArrowRight, User } from "lucide-react";

interface Props {
  artisan: Profile & { products: Product[] };
}

export function ArtisanShowcaseCard({ artisan }: Props) {
  // Limit showcase to 4 products
  const featuredProducts = artisan.products.slice(0, 4);

  return (
    <div className="group bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden transition-all hover:shadow-xl flex flex-col lg:flex-row min-h-[400px]">
      {/* Artisan Identity Section */}
      <div className="lg:w-1/3 p-8 md:p-10 bg-[#375e21]/5 border-r border-neutral-50 flex flex-col justify-between">
        <Link href={`/profile/${artisan.id}`} className="block group/link">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-white mb-6">
            {artisan.avatar_url ? (
              <Image
                src={artisan.avatar_url}
                alt={artisan.full_name || "Artisan"}
                fill
                className="object-cover transition-transform group-hover/link:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-[#375e21]">
                <User className="w-10 h-10" />
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#375e21] group-hover/link:underline decoration-[#bdd2ff] underline-offset-4">
              {artisan.full_name || "Anonymous Artisan"}
            </h2>
            {artisan.username && (
              <p className="text-sm text-neutral-400 font-mono mt-1">@{artisan.username}</p>
            )}
          </div>
          <p className="mt-6 text-neutral-600 line-clamp-4 leading-relaxed font-medium">
            {artisan.bio || "Crafting unique treasures and sharing stories through handmade art."}
          </p>
        </Link>
        <Link
          href={`/profile/${artisan.id}`}
          className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#375e21] hover:gap-3 transition-all uppercase tracking-widest"
        >
          View Full Profile <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Product Showcase Section */}
      <div className="flex-1 p-8 md:p-10 flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#375e21]/40 italic">
            Featured Handcrafted Items
          </h3>
          <span className="text-xs font-bold text-neutral-300">
            {artisan.products.length} {artisan.products.length === 1 ? 'Listing' : 'Listings'}
          </span>
        </div>

        {featuredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
            {featuredProducts.map((product) => (
              <Link
                key={product.id}
                href={`/products/${product.id}`}
                className="group/product flex flex-col"
              >
                <div className="relative aspect-square rounded-xl overflow-hidden bg-neutral-100 border border-neutral-100 mb-3">
                  {product.image_url ? (
                    <Image
                      src={product.image_url}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform group-hover/product:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-300">
                      ?
                    </div>
                  )}
                </div>
                <h4 className="text-xs font-bold text-[#375e21] line-clamp-1 mb-1">
                  {product.name}
                </h4>
                <p className="text-[10px] font-bold text-neutral-400">
                  {formatUsd(product.price)}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-neutral-300 border-2 border-dashed border-neutral-100 rounded-2xl">
            <p className="text-sm font-medium">No items listed yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

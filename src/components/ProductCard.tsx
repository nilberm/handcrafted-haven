import Link from "next/link";
import Image from "next/image";
import { ProductWithSeller } from "@/types/database";
import { formatUsd } from "@/lib/format-money";

export function ProductCard({ product }: { product: ProductWithSeller }) {
  return (
    <article className="group h-full flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
      <Link
        href={`/products/${product.id}`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#375e21] focus-visible:ring-offset-2"
      >
        <div className="relative aspect-square w-full bg-neutral-100">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover transition group-hover:opacity-95"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-neutral-300">
               No image
             </div>
          )}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[10px] font-bold uppercase tracking-wider text-[#375e21] shadow-sm">
              {product.category}
            </span>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-[#375e21] group-hover:text-[#2d4f1b] line-clamp-1">
              {product.name}
            </h3>
            <p className="mt-1 text-xs text-neutral-400 font-medium">
              by <span className="text-neutral-600 underline decoration-neutral-200">{product.profiles?.full_name || 'Artisan'}</span>
            </p>
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-gray-500">
              {product.description}
            </p>
          </div>
          <p className="mt-6 pt-4 border-t border-gray-50 text-base font-bold text-[#375e21] flex justify-between items-center">
            <span className="text-gray-300 text-[10px] uppercase tracking-widest font-bold">Price</span>
            {formatUsd(product.price)}
          </p>
        </div>
      </Link>
    </article>
  );
}

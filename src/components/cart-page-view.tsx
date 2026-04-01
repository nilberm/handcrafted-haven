"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-provider";
import { formatUsd } from "@/lib/format-money";

export function CartPageView() {
  const { items, hydrated, subtotalCents, setQuantity, removeItem } = useCart();

  if (!hydrated) {
    return (
      <p className="text-neutral-600" role="status">
        Loading cart…
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-neutral-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#375e21]">Your cart is empty</h1>
        <p className="mt-3 text-neutral-600">
          Browse seller profiles and product pages to add handcrafted items.
        </p>
        <Link
          href="/profile/elena-vega"
          className="mt-6 inline-block rounded-md bg-[#375e21] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d4f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] focus-visible:ring-offset-2"
        >
          Shop artisans
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-neutral-900">Shopping cart</h1>
      <p className="mt-2 text-neutral-600">
        Review your items before{" "}
        <Link href="/checkout" className="font-medium text-[#375e21] underline-offset-2 hover:underline">
          checkout
        </Link>
        .
      </p>

      <ul className="mt-8 space-y-6" role="list">
        {items.map((line) => {
          const lineTotal = line.priceCents * line.quantity;
          return (
            <li key={line.productId}>
              <article className="flex flex-col gap-4 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
                <Link
                  href={`/products/${line.productId}`}
                  className="relative h-28 w-full shrink-0 overflow-hidden rounded-md bg-neutral-100 sm:h-24 sm:w-24"
                >
                  <Image
                    src={line.imageSrc}
                    alt={line.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 6rem"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-semibold text-neutral-900">
                    <Link
                      href={`/products/${line.productId}`}
                      className="hover:text-[#375e21] hover:underline"
                    >
                      {line.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-neutral-600">
                    Sold by{" "}
                    <Link
                      href={`/profile/${line.sellerId}`}
                      className="font-medium text-[#375e21] underline-offset-2 hover:underline"
                    >
                      {line.sellerName}
                    </Link>
                  </p>
                  <p className="mt-2 text-sm text-neutral-800">
                    {formatUsd(line.priceCents)} each
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 sm:flex-col sm:items-end">
                  <div>
                    <label
                      htmlFor={`qty-${line.productId}`}
                      className="sr-only"
                    >
                      Quantity for {line.title}
                    </label>
                    <input
                      id={`qty-${line.productId}`}
                      type="number"
                      min={1}
                      max={99}
                      value={line.quantity}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (Number.isNaN(n)) return;
                        setQuantity(line.productId, n);
                      }}
                      className="w-20 rounded-md border border-neutral-300 px-2 py-1.5 text-center text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
                    />
                  </div>
                  <p className="min-w-[5rem] text-right font-semibold text-[#2d4f1b]">
                    {formatUsd(lineTotal)}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeItem(line.productId)}
                    className="text-sm font-medium text-red-700 underline-offset-2 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-red-600 focus-visible:ring-offset-2"
                  >
                    Remove
                  </button>
                </div>
              </article>
            </li>
          );
        })}
      </ul>

      <div className="mt-10 flex flex-col gap-4 border-t border-neutral-300 pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-lg text-neutral-800">
          Subtotal{" "}
          <span className="font-bold text-[#2d4f1b]">{formatUsd(subtotalCents)}</span>
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-md border border-neutral-400 bg-white px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#375e21] focus-visible:ring-offset-2"
          >
            Continue shopping
          </Link>
          <Link
            href="/checkout"
            className="rounded-md bg-[#375e21] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d4f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] focus-visible:ring-offset-2"
          >
            Proceed to checkout
          </Link>
        </div>
      </div>
    </>
  );
}

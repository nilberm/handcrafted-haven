"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/cart-provider";
import type { AddToCartInput } from "@/lib/cart-types";

type Props = {
  product: Omit<AddToCartInput, "quantity">;
};

export function AddToCart({ product }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [announce, setAnnounce] = useState("");

  function handleAdd() {
    addItem({ ...product, quantity: qty });
    setAnnounce(`Added ${qty} ${qty === 1 ? "item" : "items"} to cart`);
    setTimeout(() => setAnnounce(""), 3500);
  }

  return (
    <div className="mt-8 border-t border-neutral-300 pt-8">
      <h2 className="text-lg font-semibold text-[#2d4f1b]">Purchase</h2>
      <div className="mt-4 flex flex-wrap items-end gap-4">
        <div>
          <label htmlFor="add-qty" className="block text-sm font-medium text-neutral-800">
            Quantity
          </label>
          <input
            id="add-qty"
            type="number"
            min={1}
            max={99}
            value={qty}
            onChange={(e) => {
              const n = Number(e.target.value);
              if (Number.isNaN(n)) return;
              setQty(Math.min(99, Math.max(1, Math.floor(n))));
            }}
            className="mt-1 w-24 rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 shadow-sm focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
          />
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="rounded-md bg-[#375e21] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2d4f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] focus-visible:ring-offset-2"
        >
          Add to cart
        </button>
      </div>
      <p className="mt-3 text-sm text-neutral-600">
        <Link
          href="/cart"
          className="font-medium text-[#375e21] underline-offset-2 hover:underline"
        >
          View cart
        </Link>
        {" · "}
        <Link
          href="/checkout"
          className="font-medium text-[#375e21] underline-offset-2 hover:underline"
        >
          Checkout
        </Link>
      </p>
      {announce ? (
        <p className="mt-3 text-sm font-medium text-[#2d4f1b]" role="status" aria-live="polite">
          {announce}
        </p>
      ) : null}
    </div>
  );
}

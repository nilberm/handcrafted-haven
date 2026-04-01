"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/cart-provider";
import { formatUsd } from "@/lib/format-money";

export function CheckoutPageView() {
  const { items, hydrated, subtotalCents, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  if (!hydrated) {
    return (
      <p className="text-neutral-600" role="status">
        Loading…
      </p>
    );
  }

  if (placed) {
    return (
      <div className="mx-auto max-w-lg rounded-lg border border-neutral-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#375e21]">Thank you for your order</h1>
        <p className="mt-3 text-neutral-600">
          This is a demo checkout. No payment was processed. Your cart has been cleared.
        </p>
        <Link
          href="/profile/elena-vega"
          className="mt-8 inline-block rounded-md bg-[#375e21] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d4f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] focus-visible:ring-offset-2"
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-lg rounded-lg border border-neutral-200 bg-white p-10 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[#375e21]">Your cart is empty</h1>
        <p className="mt-3 text-neutral-600">Add items to your cart before checking out.</p>
        <Link
          href="/cart"
          className="mt-6 inline-block rounded-md bg-[#375e21] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d4f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] focus-visible:ring-offset-2"
        >
          View cart
        </Link>
      </div>
    );
  }

  const estimatedTaxCents = Math.round(subtotalCents * 0.065);
  const totalCents = subtotalCents + estimatedTaxCents;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    clearCart();
    setPlaced(true);
  }

  return (
    <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
      <div className="lg:col-span-3">
        <h1 className="text-3xl font-bold text-neutral-900">Checkout</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Demo only — do not enter real payment or personal data you wish to keep private.
        </p>

        <form className="mt-8 space-y-10" onSubmit={handleSubmit}>
          <fieldset className="space-y-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <legend className="text-lg font-semibold text-[#2d4f1b]">
              Shipping address
            </legend>
            <div>
              <label htmlFor="ship-name" className="block text-sm font-medium text-neutral-800">
                Full name
              </label>
              <input
                id="ship-name"
                name="shipName"
                type="text"
                autoComplete="name"
                required
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
              />
            </div>
            <div>
              <label htmlFor="ship-email" className="block text-sm font-medium text-neutral-800">
                Email
              </label>
              <input
                id="ship-email"
                name="shipEmail"
                type="email"
                autoComplete="email"
                required
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
              />
            </div>
            <div>
              <label htmlFor="ship-line1" className="block text-sm font-medium text-neutral-800">
                Address line 1
              </label>
              <input
                id="ship-line1"
                name="shipLine1"
                type="text"
                autoComplete="address-line1"
                required
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
              />
            </div>
            <div>
              <label htmlFor="ship-line2" className="block text-sm font-medium text-neutral-800">
                Address line 2{" "}
                <span className="font-normal text-neutral-500">(optional)</span>
              </label>
              <input
                id="ship-line2"
                name="shipLine2"
                type="text"
                autoComplete="address-line2"
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="sm:col-span-1">
                <label htmlFor="ship-city" className="block text-sm font-medium text-neutral-800">
                  City
                </label>
                <input
                  id="ship-city"
                  name="shipCity"
                  type="text"
                  autoComplete="address-level2"
                  required
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="ship-state" className="block text-sm font-medium text-neutral-800">
                  State
                </label>
                <input
                  id="ship-state"
                  name="shipState"
                  type="text"
                  autoComplete="address-level1"
                  required
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
                />
              </div>
              <div className="sm:col-span-1">
                <label htmlFor="ship-zip" className="block text-sm font-medium text-neutral-800">
                  ZIP code
                </label>
                <input
                  id="ship-zip"
                  name="shipZip"
                  type="text"
                  autoComplete="postal-code"
                  required
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-4 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
            <legend className="text-lg font-semibold text-[#2d4f1b]">
              Payment <span className="text-sm font-normal text-neutral-500">(demo)</span>
            </legend>
            <p className="text-sm text-neutral-600">
              In production, card data would be handled by a secure payment provider. These fields are
              for layout only.
            </p>
            <div>
              <label htmlFor="pay-card" className="block text-sm font-medium text-neutral-800">
                Card number
              </label>
              <input
                id="pay-card"
                name="payCard"
                type="text"
                inputMode="numeric"
                autoComplete="off"
                placeholder="0000 0000 0000 0000"
                className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pay-exp" className="block text-sm font-medium text-neutral-800">
                  Expiration
                </label>
                <input
                  id="pay-exp"
                  name="payExp"
                  type="text"
                  autoComplete="off"
                  placeholder="MM / YY"
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
                />
              </div>
              <div>
                <label htmlFor="pay-cvc" className="block text-sm font-medium text-neutral-800">
                  CVC
                </label>
                <input
                  id="pay-cvc"
                  name="payCvc"
                  type="text"
                  autoComplete="off"
                  placeholder="123"
                  className="mt-1 w-full rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
                />
              </div>
            </div>
          </fieldset>

          <button
            type="submit"
            className="w-full rounded-md bg-[#375e21] px-4 py-3 text-sm font-semibold text-white hover:bg-[#2d4f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] focus-visible:ring-offset-2 sm:w-auto sm:px-8"
          >
            Place order
          </button>
        </form>
      </div>

      <aside className="lg:col-span-2">
        <div className="sticky top-8 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#2d4f1b]">Order summary</h2>
          <ul className="mt-4 space-y-4" role="list">
            {items.map((line) => (
              <li key={line.productId} className="flex gap-3">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-neutral-100">
                  <Image
                    src={line.imageSrc}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-neutral-900 line-clamp-2">{line.title}</p>
                  <p className="text-sm text-neutral-600">Qty {line.quantity}</p>
                  <p className="text-sm font-medium text-[#2d4f1b]">
                    {formatUsd(line.priceCents * line.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-6 space-y-2 border-t border-neutral-200 pt-4 text-sm">
            <div className="flex justify-between text-neutral-700">
              <dt>Subtotal</dt>
              <dd>{formatUsd(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between text-neutral-700">
              <dt>Estimated tax (6.5%)</dt>
              <dd>{formatUsd(estimatedTaxCents)}</dd>
            </div>
            <div className="flex justify-between border-t border-neutral-200 pt-2 text-base font-semibold text-neutral-900">
              <dt>Total</dt>
              <dd className="text-[#2d4f1b]">{formatUsd(totalCents)}</dd>
            </div>
          </dl>
          <Link
            href="/cart"
            className="mt-6 block text-center text-sm font-medium text-[#375e21] underline-offset-2 hover:underline"
          >
            Edit cart
          </Link>
        </div>
      </aside>
    </div>
  );
}

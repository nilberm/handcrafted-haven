import type { Metadata } from "next";
import { CartPageView } from "@/components/cart-page-view";

export const metadata: Metadata = {
  title: "Shopping cart · Handcrafted Haven",
  description: "Review items in your Handcrafted Haven cart before checkout.",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#e3e6e6] text-neutral-900">
      <a
        href="#cart-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[#375e21] focus:px-3 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
      >
        Skip to cart
      </a>
      <main id="cart-main" className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <CartPageView />
      </main>
    </div>
  );
}

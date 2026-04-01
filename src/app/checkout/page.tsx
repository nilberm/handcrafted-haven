import type { Metadata } from "next";
import { CheckoutPageView } from "@/components/checkout-page-view";

export const metadata: Metadata = {
  title: "Checkout · Handcrafted Haven",
  description: "Complete your Handcrafted Haven order — shipping and payment (demo).",
};

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#e3e6e6] text-neutral-900">
      <a
        href="#checkout-main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-[#375e21] focus:px-3 focus:py-2 focus:text-white focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
      >
        Skip to checkout
      </a>
      <main
        id="checkout-main"
        className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"
      >
        <CheckoutPageView />
      </main>
    </div>
  );
}

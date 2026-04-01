import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="min-h-screen bg-[#e3e6e6] px-4 py-16 text-neutral-900">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold text-[#375e21]">Product not found</h1>
        <p className="mt-3 text-neutral-700">
          We couldn&apos;t find that listing. Check the link or browse a seller profile.
        </p>
        <p className="mt-6 text-sm text-neutral-600">
          Try{" "}
          <Link
            href="/profile/elena-vega"
            className="font-medium text-[#375e21] underline underline-offset-2 hover:text-[#2d4f1b]"
          >
            Elena Vega&apos;s shop
          </Link>
          {" or "}
          <Link
            href="/profile/marcus-cho"
            className="font-medium text-[#375e21] underline underline-offset-2 hover:text-[#2d4f1b]"
          >
            Marcus Cho&apos;s shop
          </Link>
          .
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-md bg-[#375e21] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d4f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] focus-visible:ring-offset-2"
        >
          Home
        </Link>
      </div>
    </div>
  );
}

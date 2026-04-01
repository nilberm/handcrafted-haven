import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="min-h-screen bg-[#e3e6e6] px-4 py-16 text-neutral-900">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold text-[#375e21]">Seller not found</h1>
        <p className="mt-3 text-neutral-700">
          We couldn&apos;t find a profile for that link. Try another seller ID or
          return home.
        </p>
        <p className="mt-6 text-sm text-neutral-600">
          Demo URLs:{" "}
          <Link
            href="/profile/elena-vega"
            className="font-medium text-[#375e21] underline underline-offset-2 hover:text-[#2d4f1b]"
          >
            /profile/elena-vega
          </Link>
          {" · "}
          <Link
            href="/profile/marcus-cho"
            className="font-medium text-[#375e21] underline underline-offset-2 hover:text-[#2d4f1b]"
          >
            /profile/marcus-cho
          </Link>
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

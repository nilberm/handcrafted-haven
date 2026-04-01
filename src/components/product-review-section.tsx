"use client";

import { useMemo, useState } from "react";
import type { ProductReview } from "@/data/product-reviews";

function Stars({ value, label }: { value: number; label: string }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const ids = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  return (
    <span className="inline-flex items-center gap-0.5" role="img" aria-label={label}>
      {ids.map((i) => {
        const filled = i < full || (i === full && half);
        return (
          <svg
            key={i}
            className={`h-5 w-5 ${filled ? "text-amber-500" : "text-neutral-300"}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </span>
  );
}

type Props = {
  productId: string;
  initialReviews: ProductReview[];
};

export function ProductReviewSection({ productId, initialReviews }: Props) {
  const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);

  const average = useMemo(() => {
    if (reviews.length === 0) return null;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / reviews.length) * 10) / 10;
  }, [reviews]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const author = String(fd.get("author") ?? "").trim();
    const body = String(fd.get("body") ?? "").trim();
    const ratingRaw = Number(fd.get("rating"));
    if (!author || !body || Number.isNaN(ratingRaw) || ratingRaw < 1 || ratingRaw > 5) {
      return;
    }
    const next: ProductReview = {
      id: `local-${productId}-${Date.now()}`,
      author,
      rating: ratingRaw,
      body,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setReviews((prev) => [next, ...prev]);
    form.reset();
  }

  return (
    <section className="mt-14 border-t border-neutral-300 pt-10" aria-labelledby="reviews-heading">
      <h2 id="reviews-heading" className="text-xl font-semibold text-[#2d4f1b]">
        Reviews &amp; ratings
      </h2>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {average != null ? (
          <>
            <Stars value={average} label={`Average ${average} out of 5 stars`} />
            <span className="text-neutral-800">
              <span className="font-semibold">{average}</span>
              <span className="text-neutral-600"> / 5</span>
              <span className="text-neutral-600"> · {reviews.length} reviews</span>
            </span>
          </>
        ) : (
          <p className="text-neutral-600">No reviews yet. Be the first to rate this item.</p>
        )}
      </div>

      <ul className="mt-8 space-y-6">
        {reviews.map((r) => (
          <li key={r.id}>
            <article className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-neutral-900">{r.author}</p>
                <time className="text-sm text-neutral-500" dateTime={r.createdAt}>
                  {r.createdAt}
                </time>
              </div>
              <div className="mt-2">
                <Stars
                  value={r.rating}
                  label={`${r.rating} out of 5 stars from ${r.author}`}
                />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">{r.body}</p>
            </article>
          </li>
        ))}
      </ul>

      <div className="mt-10 rounded-lg border border-dashed border-[#375e21]/40 bg-white/80 p-6">
        <h3 className="text-lg font-semibold text-neutral-900">Write a review</h3>
        <p className="mt-1 text-sm text-neutral-600">
          Demo: submissions are saved in the browser session only until the backend is connected.
        </p>
        <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="review-author" className="block text-sm font-medium text-neutral-800">
              Your name
            </label>
            <input
              id="review-author"
              name="author"
              type="text"
              required
              autoComplete="name"
              className="mt-1 w-full max-w-md rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 shadow-sm focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
            />
          </div>
          <div>
            <fieldset>
              <legend className="text-sm font-medium text-neutral-800">Rating</legend>
              <div className="mt-2 flex flex-wrap gap-4">
                {[5, 4, 3, 2, 1].map((n) => (
                  <label key={n} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input type="radio" name="rating" value={n} required className="text-[#375e21]" />
                    {n} {n === 1 ? "star" : "stars"}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>
          <div>
            <label htmlFor="review-body" className="block text-sm font-medium text-neutral-800">
              Review
            </label>
            <textarea
              id="review-body"
              name="body"
              required
              rows={4}
              className="mt-1 w-full max-w-xl rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 shadow-sm focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-[#375e21] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d4f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] focus-visible:ring-offset-2"
          >
            Submit review
          </button>
        </form>
      </div>
    </section>
  );
}

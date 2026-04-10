"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import {
  createReview,
  updateReview,
  deleteReview,
  type ActionResult,
} from "@/app/products/[productId]/actions";
import type { ReviewWithAuthor } from "@/lib/supabase/reviews";

function Stars({ value, label }: { value: number; label: string }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  const ids = useMemo(() => Array.from({ length: 5 }, (_, i) => i), []);

  return (
    <span
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={label}
    >
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

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return iso.slice(0, 10);
  }
}

type Props = {
  productId: string;
  initialReviews: ReviewWithAuthor[];
  currentUserId: string | null;
};

export function ProductReviewSection({
  productId,
  initialReviews,
  currentUserId,
}: Props) {
  const ownReview = useMemo(
    () =>
      currentUserId
        ? initialReviews.find((r) => r.user_id === currentUserId) ?? null
        : null,
    [initialReviews, currentUserId]
  );

  const otherReviews = useMemo(
    () =>
      ownReview
        ? initialReviews.filter((r) => r.id !== ownReview.id)
        : initialReviews,
    [initialReviews, ownReview]
  );

  const average = useMemo(() => {
    if (initialReviews.length === 0) return null;
    const sum = initialReviews.reduce((acc, r) => acc + r.rating, 0);
    return Math.round((sum / initialReviews.length) * 10) / 10;
  }, [initialReviews]);

  return (
    <section
      className="mt-14 border-t border-neutral-300 pt-10"
      aria-labelledby="reviews-heading"
    >
      <h2
        id="reviews-heading"
        className="text-xl font-semibold text-[#2d4f1b]"
      >
        Reviews &amp; ratings
      </h2>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {average != null ? (
          <>
            <Stars
              value={average}
              label={`Average ${average} out of 5 stars`}
            />
            <span className="text-neutral-800">
              <span className="font-semibold">{average}</span>
              <span className="text-neutral-600"> / 5</span>
              <span className="text-neutral-600">
                {" "}
                · {initialReviews.length}{" "}
                {initialReviews.length === 1 ? "review" : "reviews"}
              </span>
            </span>
          </>
        ) : (
          <p className="text-neutral-600">
            No reviews yet. Be the first to rate this item.
          </p>
        )}
      </div>

      <ul className="mt-8 space-y-6">
        {ownReview && (
          <li key={ownReview.id}>
            <OwnReviewCard review={ownReview} productId={productId} />
          </li>
        )}
        {otherReviews.map((r) => (
          <li key={r.id}>
            <ReviewCard review={r} />
          </li>
        ))}
      </ul>

      <div className="mt-10">
        {currentUserId == null ? (
          <SignInPrompt />
        ) : ownReview ? (
          <p className="rounded-lg border border-dashed border-[#375e21]/40 bg-white/80 p-6 text-sm text-neutral-700">
            You&apos;ve reviewed this product. Use the Edit button above to
            change your rating or text.
          </p>
        ) : (
          <NewReviewForm productId={productId} />
        )}
      </div>
    </section>
  );
}

function SignInPrompt() {
  return (
    <div className="rounded-lg border border-dashed border-[#375e21]/40 bg-white/80 p-6">
      <h3 className="text-lg font-semibold text-neutral-900">
        Share your experience
      </h3>
      <p className="mt-1 text-sm text-neutral-600">
        <Link
          href="/login"
          className="font-medium text-[#375e21] underline hover:text-[#2d4f1b]"
        >
          Sign in
        </Link>{" "}
        to leave a rating and review.
      </p>
    </div>
  );
}

function ReviewCard({ review }: { review: ReviewWithAuthor }) {
  const author = review.profiles?.full_name ?? "Anonymous";
  return (
    <article className="rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium text-neutral-900">{author}</p>
        <time
          className="text-sm text-neutral-500"
          dateTime={review.created_at}
        >
          {formatDate(review.created_at)}
        </time>
      </div>
      <div className="mt-2">
        <Stars
          value={review.rating}
          label={`${review.rating} out of 5 stars from ${author}`}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-700 whitespace-pre-wrap">
        {review.body}
      </p>
    </article>
  );
}

function OwnReviewCard({
  review,
  productId,
}: {
  review: ReviewWithAuthor;
  productId: string;
}) {
  const [mode, setMode] = useState<"view" | "edit">("view");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const author = review.profiles?.full_name ?? "You";

  function handleDelete() {
    if (!confirm("Delete your review? This cannot be undone.")) return;
    setError(null);
    startTransition(async () => {
      const result: ActionResult = await deleteReview({
        reviewId: review.id,
        productId,
      });
      if (!result.ok) {
        setError(
          result.error === "unauthorized"
            ? "Please sign in to delete your review."
            : result.message ?? "Something went wrong. Please try again."
        );
      }
    });
  }

  if (mode === "edit") {
    return (
      <EditReviewForm
        review={review}
        productId={productId}
        onCancel={() => setMode("view")}
        onSaved={() => setMode("view")}
      />
    );
  }

  return (
    <article className="rounded-lg border-2 border-[#375e21]/30 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium text-neutral-900">
          {author}{" "}
          <span className="ml-2 rounded bg-[#375e21]/10 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-[#375e21]">
            Your review
          </span>
        </p>
        <time
          className="text-sm text-neutral-500"
          dateTime={review.created_at}
        >
          {formatDate(review.created_at)}
        </time>
      </div>
      <div className="mt-2">
        <Stars
          value={review.rating}
          label={`${review.rating} out of 5 stars`}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-neutral-700 whitespace-pre-wrap">
        {review.body}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setMode("edit")}
          disabled={isPending}
          className="rounded-md border border-[#375e21] px-3 py-1.5 text-sm font-medium text-[#375e21] hover:bg-[#375e21]/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] disabled:opacity-50"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={isPending}
          className="rounded-md border border-red-600 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-300 disabled:opacity-50"
        >
          {isPending ? "Deleting…" : "Delete"}
        </button>
      </div>

      {error && (
        <p
          className="mt-3 text-sm text-red-600"
          role="alert"
          aria-live="polite"
        >
          {error}
        </p>
      )}
    </article>
  );
}

function NewReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState<number>(0);
  const [body, setBody] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
      return;
    }
    if (body.trim().length === 0) {
      setError("Please write a short review.");
      return;
    }
    startTransition(async () => {
      const result = await createReview({ productId, rating, body });
      if (!result.ok) {
        setError(
          result.error === "unauthorized"
            ? "Please sign in to leave a review."
            : result.message ?? "Something went wrong. Please try again."
        );
        return;
      }
      setRating(0);
      setBody("");
    });
  }

  return (
    <div className="rounded-lg border border-dashed border-[#375e21]/40 bg-white/80 p-6">
      <h3 className="text-lg font-semibold text-neutral-900">Write a review</h3>
      <p className="mt-1 text-sm text-neutral-600">
        Share what you think about this item. One review per product.
      </p>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-sm font-medium text-neutral-800">
            Rating
          </legend>
          <div className="mt-2 flex flex-wrap gap-4">
            {[5, 4, 3, 2, 1].map((n) => (
              <label
                key={n}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  name="rating"
                  value={n}
                  checked={rating === n}
                  onChange={() => setRating(n)}
                  className="text-[#375e21]"
                />
                {n} {n === 1 ? "star" : "stars"}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label
            htmlFor="review-body"
            className="block text-sm font-medium text-neutral-800"
          >
            Review
          </label>
          <textarea
            id="review-body"
            name="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={4}
            maxLength={1000}
            className="mt-1 w-full max-w-xl rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 shadow-sm focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
          />
          <p className="mt-1 text-xs text-neutral-500">
            {body.length}/1000
          </p>
        </div>

        {error && (
          <p
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-[#375e21] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d4f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] focus-visible:ring-offset-2 disabled:opacity-60"
        >
          {isPending ? "Submitting…" : "Submit review"}
        </button>
      </form>
    </div>
  );
}

function EditReviewForm({
  review,
  productId,
  onCancel,
  onSaved,
}: {
  review: ReviewWithAuthor;
  productId: string;
  onCancel: () => void;
  onSaved: () => void;
}) {
  const [rating, setRating] = useState<number>(review.rating);
  const [body, setBody] = useState(review.body);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (rating < 1 || rating > 5) {
      setError("Please select a rating between 1 and 5 stars.");
      return;
    }
    if (body.trim().length === 0) {
      setError("Review text is required.");
      return;
    }
    startTransition(async () => {
      const result = await updateReview({
        reviewId: review.id,
        productId,
        rating,
        body,
      });
      if (!result.ok) {
        setError(
          result.error === "unauthorized"
            ? "Please sign in to edit your review."
            : result.message ?? "Something went wrong. Please try again."
        );
        return;
      }
      onSaved();
    });
  }

  return (
    <article className="rounded-lg border-2 border-[#375e21]/30 bg-white p-4 shadow-sm">
      <h3 className="text-sm font-semibold uppercase tracking-wide text-[#375e21]">
        Edit your review
      </h3>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <fieldset>
          <legend className="text-sm font-medium text-neutral-800">
            Rating
          </legend>
          <div className="mt-2 flex flex-wrap gap-4">
            {[5, 4, 3, 2, 1].map((n) => (
              <label
                key={n}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <input
                  type="radio"
                  name="edit-rating"
                  value={n}
                  checked={rating === n}
                  onChange={() => setRating(n)}
                  className="text-[#375e21]"
                />
                {n} {n === 1 ? "star" : "stars"}
              </label>
            ))}
          </div>
        </fieldset>
        <div>
          <label
            htmlFor={`edit-body-${review.id}`}
            className="block text-sm font-medium text-neutral-800"
          >
            Review
          </label>
          <textarea
            id={`edit-body-${review.id}`}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            rows={4}
            maxLength={1000}
            className="mt-1 w-full max-w-xl rounded-md border border-neutral-300 px-3 py-2 text-neutral-900 shadow-sm focus:border-[#375e21] focus:outline-none focus:ring-2 focus:ring-[#bdd2ff]"
          />
          <p className="mt-1 text-xs text-neutral-500">{body.length}/1000</p>
        </div>

        {error && (
          <p
            className="text-sm text-red-600"
            role="alert"
            aria-live="polite"
          >
            {error}
          </p>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-md bg-[#375e21] px-4 py-2 text-sm font-medium text-white hover:bg-[#2d4f1b] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] focus-visible:ring-offset-2 disabled:opacity-60"
          >
            {isPending ? "Saving…" : "Save changes"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            disabled={isPending}
            className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#bdd2ff] disabled:opacity-60"
          >
            Cancel
          </button>
        </div>
      </form>
    </article>
  );
}

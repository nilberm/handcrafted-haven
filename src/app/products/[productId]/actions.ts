'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export type ActionResult =
  | { ok: true }
  | {
      ok: false
      error: 'unauthorized' | 'validation' | 'server'
      message?: string
    }

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

function validateRatingAndBody(
  rating: number,
  body: string
): { ok: true; body: string } | { ok: false; message: string } {
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { ok: false, message: 'Rating must be a whole number between 1 and 5.' }
  }
  const trimmed = body.trim()
  if (trimmed.length < 1) {
    return { ok: false, message: 'Review text is required.' }
  }
  if (trimmed.length > 1000) {
    return { ok: false, message: 'Review must be 1000 characters or fewer.' }
  }
  return { ok: true, body: trimmed }
}

export async function createReview(input: {
  productId: string
  rating: number
  body: string
}): Promise<ActionResult> {
  if (!UUID_RE.test(input.productId)) {
    return { ok: false, error: 'validation', message: 'Invalid product.' }
  }
  const v = validateRatingAndBody(input.rating, input.body)
  if (!v.ok) return { ok: false, error: 'validation', message: v.message }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'unauthorized' }

  const { error } = await supabase.from('reviews').upsert(
    {
      product_id: input.productId,
      user_id: user.id,
      rating: input.rating,
      body: v.body,
    },
    { onConflict: 'product_id,user_id' }
  )

  if (error) return { ok: false, error: 'server', message: error.message }

  revalidatePath(`/products/${input.productId}`)
  return { ok: true }
}

export async function updateReview(input: {
  reviewId: string
  productId: string
  rating: number
  body: string
}): Promise<ActionResult> {
  if (!UUID_RE.test(input.reviewId) || !UUID_RE.test(input.productId)) {
    return { ok: false, error: 'validation', message: 'Invalid review.' }
  }
  const v = validateRatingAndBody(input.rating, input.body)
  if (!v.ok) return { ok: false, error: 'validation', message: v.message }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'unauthorized' }

  const { error } = await supabase
    .from('reviews')
    .update({ rating: input.rating, body: v.body })
    .eq('id', input.reviewId)

  if (error) return { ok: false, error: 'server', message: error.message }

  revalidatePath(`/products/${input.productId}`)
  return { ok: true }
}

export async function deleteReview(input: {
  reviewId: string
  productId: string
}): Promise<ActionResult> {
  if (!UUID_RE.test(input.reviewId) || !UUID_RE.test(input.productId)) {
    return { ok: false, error: 'validation', message: 'Invalid review.' }
  }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { ok: false, error: 'unauthorized' }

  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', input.reviewId)

  if (error) return { ok: false, error: 'server', message: error.message }

  revalidatePath(`/products/${input.productId}`)
  return { ok: true }
}

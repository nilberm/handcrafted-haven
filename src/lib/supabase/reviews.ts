import { createClient } from './server'

export type ReviewWithAuthor = {
  id: string
  product_id: string
  user_id: string
  rating: number
  body: string
  created_at: string
  updated_at: string
  profiles: {
    full_name: string | null
    avatar_url: string | null
  } | null
}

export async function getReviewsForProduct(
  productId: string
): Promise<ReviewWithAuthor[]> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select('*, profiles(full_name, avatar_url)')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data ?? []) as ReviewWithAuthor[]
}

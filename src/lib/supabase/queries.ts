import { createClient } from './client'
import { Profile, Product, ProductWithSeller } from '@/types/database'

const supabase = createClient()

export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  
  if (error) throw error
  return data as Profile
}

export async function updateProfile(userId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single()
  
  if (error) throw error
  return data as Profile
}

export async function getSellerProducts(sellerId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('seller_id', sellerId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Product[]
}

export async function getProducts(filters: { category?: string; minPrice?: number; maxPrice?: number; search?: string } = {}) {
  let query = supabase
    .from('products')
    .select('*, profiles(full_name)')

  if (filters.category && filters.category !== 'All') {
    query = query.eq('category', filters.category)
  }

  if (filters.minPrice != null) {
    query = query.gte('price', filters.minPrice)
  }

  if (filters.maxPrice != null) {
    query = query.lte('price', filters.maxPrice)
  }

  if (filters.search) {
    query = query.ilike('name', `%${filters.search}%`)
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw error
  return data as ProductWithSeller[]
}

export async function getProduct(productId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*, profiles(*)')
    .eq('id', productId)
    .single()
  
  if (error) throw error
  return data
}

export async function createProduct(product: Omit<Product, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single()
  
  if (error) throw error
  return data as Product
}

export async function deleteProduct(productId: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) throw error
}

export async function updateProduct(productId: string, product: Partial<Omit<Product, 'id' | 'created_at'>>) {
  const { data, error } = await supabase
    .from('products')
    .update(product)
    .eq('id', productId)
    .select()
    .single()

  if (error) throw error
  return data as Product
}

export async function getSellersWithProducts() {
  const { data, error } = await supabase
    .from('profiles')
    .select('*, products(*)')
    .eq('role', 'seller')
    .order('full_name')

  if (error) throw error
  return data as (Profile & { products: Product[] })[]
}

export async function uploadImage(file: File, path: string) {
  const fileExt = file.name.split('.').pop()
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
  const filePath = `${path}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('handcrafted-haven')
    .upload(filePath, file)

  if (uploadError) throw uploadError

  const { data } = supabase.storage
    .from('handcrafted-haven')
    .getPublicUrl(filePath)

  return data.publicUrl
}

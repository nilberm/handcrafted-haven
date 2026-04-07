import { createClient } from './client'
import { Profile, Product } from '@/types/database'

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

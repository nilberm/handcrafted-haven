'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createProduct, updateProduct, uploadImage } from '@/lib/supabase/queries'
import { Product } from '@/types/database'
import { ImagePlus, Loader2, X } from 'lucide-react'
import Image from 'next/image'

interface ProductFormProps {
  sellerId: string
  initialData?: Product
  onSuccess?: () => void
}

export default function ProductForm({ sellerId, initialData, onSuccess }: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image_url || null)
  
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    price: initialData ? (initialData.price / 100).toString() : '',
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      let imageUrl = initialData?.image_url || ''

      if (imageFile) {
        imageUrl = await uploadImage(imageFile, `products/${sellerId}`)
      }

      const productData = {
        seller_id: sellerId,
        name: formData.name,
        description: formData.description,
        price: Math.round(parseFloat(formData.price) * 100),
        image_url: imageUrl,
      }

      if (initialData) {
        await updateProduct(initialData.id, productData)
      } else {
        await createProduct(productData)
      }

      if (onSuccess) {
        onSuccess()
      } else {
        router.push('/dashboard/products')
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Failed to save product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-[#375e21] mb-1">Product Image</label>
          <div className="relative group flex items-center justify-center w-full aspect-video border-2 border-dashed border-gray-200 rounded-xl overflow-hidden hover:border-[#375e21]/50 transition-colors bg-gray-50">
            {imagePreview ? (
              <>
                <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 p-1.5 bg-white/80 backdrop-blur-sm rounded-full text-red-500 hover:bg-white transition-opacity opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-2 p-6">
                <ImagePlus className="w-8 h-8 text-gray-400" />
                <span className="text-sm font-medium text-gray-500">Click to upload photo</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} required={!initialData} />
              </label>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-bold text-[#375e21] mb-1">Product Name</label>
          <input
            id="name"
            type="text"
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#375e21]/20 focus:border-[#375e21] outline-none transition-all"
            placeholder="e.g. Hand-thrown Ceramic Mug"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-bold text-[#375e21] mb-1">Price (USD)</label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">$</span>
              <input
                id="price"
                type="number"
                step="0.01"
                required
                className="w-full pl-7 pr-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#375e21]/20 focus:border-[#375e21] outline-none transition-all"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-bold text-[#375e21] mb-1">Description</label>
          <textarea
            id="description"
            rows={4}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#375e21]/20 focus:border-[#375e21] outline-none transition-all resize-none"
            placeholder="Tell customers about the craftsmanship, materials, and unique features..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-[#375e21] text-white font-bold rounded-lg hover:bg-[#2d4f1b] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-md"
      >
        {loading ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving Product...
          </>
        ) : (
          initialData ? 'Update Product' : 'List Handcrafted Item'
        )}
      </button>
    </form>
  )
}

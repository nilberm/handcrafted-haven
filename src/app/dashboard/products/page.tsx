'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { getSellerProducts } from '@/lib/supabase/queries'
import { Product } from '@/types/database'
import { ShoppingBag, Plus, Loader2, Package, Search, LayoutGrid, List } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import ProductForm from '@/components/ProductForm'

export default function ProductsDashboard() {
  const router = useRouter()
  const { user, profile, loading: authLoading } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      if (user) {
        try {
          const data = await getSellerProducts(user.id)
          setProducts(data)
        } catch (error) {
          console.error('Error fetching products:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    if (!authLoading) fetchProducts()
  }, [user, authLoading])

  if (authLoading || loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
      <Loader2 className="w-8 h-8 animate-spin text-[#375e21]" />
    </div>
  )

  if (!user || profile?.role !== 'seller') {
    router.push('/settings')
    return null
  }

  const handleSuccess = () => {
    setShowAddForm(false)
    router.refresh()
    // Re-fetch products
    getSellerProducts(user.id).then(setProducts)
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#375e21] font-bold uppercase text-xs tracking-widest">
              <Package className="w-4 h-4" />
              Inventory Management
            </div>
            <h1 className="text-4xl font-extrabold text-[#375e21] tracking-tight">Artisan Shop</h1>
          </div>
          
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[#375e21] text-white font-bold rounded-xl hover:bg-[#2d4f1b] transition-all shadow-lg hover:-translate-y-0.5 active:scale-95"
          >
            {showAddForm ? 'View Inventory' : (
              <>
                <Plus className="w-5 h-5" />
                List New Item
              </>
            )}
          </button>
        </div>

        {showAddForm ? (
          <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4">
            <h2 className="text-2xl font-bold text-[#375e21] mb-6">New Craft Piece</h2>
            <ProductForm sellerId={user.id} onSuccess={handleSuccess} />
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            {products.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border-2 border-dashed border-gray-200 space-y-4">
                <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-gray-400">Your shop is empty</h3>
                <p className="text-gray-400 max-w-xs mx-auto text-sm">
                  Start showcasing your craftsmanship by listing your first handcrafted item today.
                </p>
                <button
                  onClick={() => setShowAddForm(true)}
                  className="mt-4 text-[#375e21] font-bold hover:underline"
                >
                  Create your first listing →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                    <div className="relative aspect-square">
                      {product.image_url && (
                        <Image
                          src={product.image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[#375e21] font-bold text-sm shadow-sm ring-1 ring-black/5">
                        ${(product.price / 100).toFixed(2)}
                      </div>
                    </div>
                    <div className="p-6 space-y-2">
                        <h3 className="text-lg font-bold text-[#375e21] leading-tight group-hover:text-[#2d4f1b] transition-colors">{product.name}</h3>
                        <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                        <div className="pt-4 flex items-center justify-between border-t border-gray-50 mt-4">
                           <div className="text-[10px] text-gray-300 font-bold uppercase tracking-widest">
                             Listed {new Date(product.created_at).toLocaleDateString()}
                           </div>
                           <Link 
                            href={`/profile/${user.id}`}
                            className="text-[#375e21] text-xs font-bold hover:underline decoration-dotted"
                           >
                            View Live
                           </Link>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

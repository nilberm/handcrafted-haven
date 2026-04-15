import { Metadata } from 'next'
import { getProducts } from '@/lib/supabase/queries'
import { ProductCard } from '@/components/ProductCard'
import Link from 'next/link'
import { Filter, SlidersHorizontal, SearchX } from 'lucide-react'

export const metadata: Metadata = {
  title: 'All Handcrafted Items · Handcrafted Haven',
  description: 'Browse our collection of unique, one-of-a-kind handcrafted treasures from local artisans.',
}

type Props = {
  searchParams: Promise<{
    category?: string
    minPrice?: string
    maxPrice?: string
    q?: string
  }>
}

const CATEGORIES = ["All", "Jewelry", "Woodwork", "Pottery", "Textiles", "Paintings", "Home Decor"]

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  const category = params.category || 'All'
  const minPrice = params.minPrice ? parseFloat(params.minPrice) : undefined
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined
  const search = params.q

  let products: any[] = []
  let errorOccurred = false

  try {
    products = await getProducts({
      category,
      minPrice,
      maxPrice,
      search
    })
  } catch (err) {
    console.error("Failed to fetch products:", err)
    errorOccurred = true
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] pb-24">
      {/* Header */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-[#375e21] tracking-tight">
            Explore the Collection
          </h1>
          <p className="mt-4 text-lg text-neutral-600 max-w-2xl">
            Discover one-of-a-kind treasures crafted with passion and precision by independent artisans.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div>
              <h2 className="flex items-center gap-2 text-sm font-bold text-[#375e21] uppercase tracking-wider mb-4">
                <Filter className="w-4 h-4" />
                Categories
              </h2>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <Link
                    key={cat}
                    href={{
                      pathname: '/products',
                      query: { ...params, category: cat }
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      category === cat
                        ? 'bg-[#375e21] text-white shadow-md'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100 border border-neutral-200'
                    }`}
                  >
                    {cat}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-neutral-200">
              <h2 className="flex items-center gap-2 text-sm font-bold text-[#375e21] uppercase tracking-wider mb-4">
                <SlidersHorizontal className="w-4 h-4" />
                Price Range
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={{
                    pathname: '/products',
                    query: { ...params, minPrice: '0', maxPrice: '50' }
                  }}
                  className="px-3 py-2 bg-white border border-neutral-200 rounded-md text-xs font-semibold text-center text-neutral-600 hover:border-[#bdd2ff] transition-colors"
                >
                  Under $50
                </Link>
                <Link
                  href={{
                    pathname: '/products',
                    query: { ...params, minPrice: '50', maxPrice: '150' }
                  }}
                  className="px-3 py-2 bg-white border border-neutral-200 rounded-md text-xs font-semibold text-center text-neutral-600 hover:border-[#bdd2ff] transition-colors"
                >
                  $50 - $150
                </Link>
                <Link
                  href={{
                    pathname: '/products',
                    query: { ...params, minPrice: '150' }
                  }}
                  className="col-span-2 px-3 py-2 bg-white border border-neutral-200 rounded-md text-xs font-semibold text-center text-neutral-600 hover:border-[#bdd2ff] transition-colors"
                >
                  $150 & Above
                </Link>
              </div>
              {(minPrice != null || maxPrice != null) && (
                <Link
                  href={{
                    pathname: '/products',
                    query: { ...params, minPrice: undefined, maxPrice: undefined }
                  }}
                  className="mt-4 block text-center text-xs font-bold text-red-500 hover:underline"
                >
                  Clear Price Filters
                </Link>
              )}
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-neutral-500">
                Showing <span className="font-bold text-neutral-900">{products.length}</span> items
                {search && (
                  <> for &quot;<span className="italic">{search}</span>&quot;</>
                )}
              </p>
            </div>

            {errorOccurred ? (
              <div className="flex flex-col items-center justify-center py-24 bg-red-50 rounded-3xl border-2 border-dashed border-red-200">
                <SearchX className="w-12 h-12 text-red-300 mb-4" />
                <h3 className="text-xl font-bold text-red-900">Database connection issue</h3>
                <p className="mt-2 text-red-700 max-w-xs text-center font-medium">
                  We&apos;re currently updating our catalog schema. This should only take a moment. 
                </p>
                <div className="mt-8 p-4 bg-white rounded-lg border border-red-100 text-xs text-red-800 font-mono">
                  Tip: Ensure the &apos;category&apos; column exists in Supabase.
                </div>
              </div>
            ) : products.length > 0 ? (
              <ul className="grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 bg-white rounded-3xl border-2 border-dashed border-neutral-200">
                <SearchX className="w-12 h-12 text-neutral-300 mb-4" />
                <h3 className="text-xl font-bold text-neutral-900">No items found</h3>
                <p className="mt-2 text-neutral-500 max-w-xs text-center">
                  We couldn&apos;t find any items matching your current filters. Try adjusting your search or category.
                </p>
                <Link
                  href="/products"
                  className="mt-8 px-6 py-2 bg-[#375e21] text-white rounded-lg font-bold hover:bg-[#2d4f1b] transition-all"
                >
                  Clear All Filters
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

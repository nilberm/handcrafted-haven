import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import { 
  Hammer, 
  MapPin, 
  Calendar, 
  MessageSquare, 
  Share2, 
  ShoppingBag,
  Star,
  Award,
  BookOpen
} from 'lucide-react'
import Link from 'next/link'

interface SellerProfileProps {
  params: {
    id: string
  }
}

export default async function SellerProfilePage({ params }: SellerProfileProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !profile || profile.role !== 'seller') {
    notFound()
  }

  const products = [
    { id: '1', name: 'Hand-Carved Walnut Bowl', price: 45, image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?q=80&w=640' },
    { id: '2', name: 'Ceramic Glazed Mug', price: 24, image: 'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?q=80&w=640' },
    { id: '3', name: 'Woven Linen Tote Bag', price: 32, image: 'https://images.unsplash.com/photo-1544816153-12ad5d713312?q=80&w=640' },
  ]

  return (
    <div className="min-h-screen pb-20">
      <div className="relative h-64 md:h-96 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/20 to-black/80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=2000" 
          alt="Workshop" 
          className="w-full h-full object-cover scale-110 blur-sm"
        />
        
        <div className="absolute bottom-0 left-0 right-0 z-20 p-8 max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-3xl bg-black border-4 border-emerald-500/30 overflow-hidden shadow-2xl relative">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.full_name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-emerald-500/10">
                <Hammer className="w-16 h-16 text-emerald-400/50" />
              </div>
            )}
            <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-wider">
              Verified Artisan
            </div>
          </div>
          
          <div className="flex-grow space-y-2 mb-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              {profile.full_name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <span className="flex items-center gap-1.5 text-sm">
                <MapPin className="w-4 h-4 text-emerald-400" />
                Artisan Village
              </span>
              <span className="flex items-center gap-1.5 text-sm">
                <Calendar className="w-4 h-4 text-emerald-400" />
                Joined March 2026
              </span>
              <div className="flex items-center gap-1 ml-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                ))}
                <span className="text-xs text-gray-400 ml-1">(12 Reviews)</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mb-4">
            <button className="px-6 py-3 rounded-xl glass border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10 transition-all font-medium flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Contact
            </button>
            <button className="px-6 py-3 rounded-xl bg-emerald-500 text-black hover:bg-emerald-400 transition-all font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20">
              <Award className="w-4 h-4" />
              Follow
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1 space-y-8">
          <div className="glass p-6 rounded-3xl space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Hammer className="w-5 h-5 text-emerald-400" />
              Artisan Bio
            </h2>
            <p className="text-gray-300 leading-relaxed text-sm">
              {profile.bio || "This artisan hasn't shared their bio yet, but their work speaks volumes about their dedication to the craft."}
            </p>
          </div>

          <div className="glass p-6 rounded-3xl space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-400" />
              My Craft Story
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm whitespace-pre-wrap italic">
              "{profile.craft_story || "Every piece I create has a story. From the raw materials to the finishing touches, I pour my heart and soul into every handcrafted item."}"
            </p>
            <div className="pt-4 flex gap-2">
              <Share2 className="w-4 h-4 text-emerald-400" />
              <span className="text-xs text-gray-500 font-medium uppercase tracking-widest">Share this shop</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-emerald-400" />
              Curated Collection
            </h2>
            <div className="text-sm text-gray-400">3 Items</div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <div key={p.id} className="group glass rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-all hover:translate-y-[-4px]">
                <div className="aspect-square relative overflow-hidden">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <p className="absolute top-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-emerald-400 font-bold text-sm">
                    ${p.price}
                  </p>
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-bold text-lg group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{p.name}</h3>
                  <button className="w-full py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500 hover:text-black hover:border-emerald-500 transition-all font-bold text-sm">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-12 text-center">
            <button className="px-12 py-4 rounded-2xl glass border-white/10 hover:border-emerald-500/30 text-gray-400 hover:text-emerald-400 transition-all font-bold">
              Show More Items
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

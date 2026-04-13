'use client'

import Link from 'next/link'
import { useAuth } from './AuthProvider'
import { LogOut, User as UserIcon, Search, ShoppingCart } from 'lucide-react'

export default function Navbar() {
  const { user, profile, loading, signOut } = useAuth()

  return (
    <header className="w-full">
      <div className="bg-[#375e21] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 gap-4">
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <div className="text-[#bdd2ff] font-bold text-xl tracking-tight transition-transform group-hover:scale-105">
                Handcrafted Haven
              </div>
            </Link>

            <div className="grow max-w-2xl hidden md:flex">
              <div className="flex w-full group overflow-hidden rounded-md bg-white border-2 border-transparent focus-within:border-[#bdd2ff] transition-all">
                <input
                  type="text"
                  placeholder="Search handcrafted items..."
                  className="grow px-4 py-2 text-sm text-[#333] outline-none"
                />
                <button className="bg-[#bdd2ff] text-[#375e21] px-6 flex items-center justify-center hover:bg-[#a6c1fb] transition-colors">
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm font-medium">
              {!loading && user ? (
                <div className="flex items-center gap-6">
                  <Link
                    href="/settings"
                    className="flex items-center gap-2 text-white hover:text-[#bdd2ff] transition-colors"
                  >
                    <UserIcon className="w-4 h-4" />
                    <span>{profile?.full_name || 'My Profile'}</span>
                  </Link>

                  {profile?.role === 'seller' && (
                    <Link
                      href="/dashboard/products"
                      className="px-3 py-1 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
                    >
                      Seller Hub
                    </Link>
                  )}

                  <button
                    onClick={() => signOut()}
                    className="text-white/70 hover:text-red-300 transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-4">
                  <Link href="/login" className="hover:text-[#bdd2ff] transition-colors">Sign In</Link>
                  <Link href="/login?signup=true" className="text-[#bdd2ff] hover:text-white transition-colors">Join as Artisan</Link>
                </div>
              )}

              <Link href="/cart" className="flex items-center gap-1 hover:text-[#bdd2ff] transition-colors ml-2">
                <ShoppingCart className="w-5 h-5" />
                <span>Cart</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="bg-[#2d4f1b] border-t border-black/5 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6 h-8 overflow-x-auto no-scrollbar">
            {["All Categories", "Jewelry", "Woodwork", "Pottery", "Textiles", "Paintings", "Home Decor", "Artisans", "About"].map((label) => (
              <a 
                key={label} 
                href="#" 
                className="text-white/80 hover:text-white text-[12px] uppercase font-bold tracking-wider whitespace-nowrap transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

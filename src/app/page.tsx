'use client'

import { Hammer, ShoppingBag, Zap, User as UserIcon, ShieldCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fdfbf7]">
      <section className="bg-white border-b border-gray-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 animate-in fade-in slide-in-from-left duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#375e21]/5 border border-[#375e21]/10 text-[#375e21] text-xs font-bold uppercase tracking-widest">
               <span className="w-2 h-2 rounded-full bg-[#375e21] animate-pulse"></span>
               New Artisan Collection
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-[#375e21] leading-[1.1] tracking-tight">
              Discover Unique <br />
              Handcrafted Treasures <br />
              <span className="text-[#375e21] underline decoration-[#bdd2ff] decoration-8 underline-offset-8">for Your Haven.</span>
            </h1>
            <p className="text-gray-600 text-lg max-w-md font-medium leading-relaxed">
              Support independent artisans and find one-of-a-kind items made with passion and precision.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link href="/products">
                <button className="px-10 py-4 bg-[#375e21] text-white font-bold rounded-lg hover:bg-[#2d4f1b] transition-all shadow-lg hover:-translate-y-0.5 active:scale-95">
                  Shop the Collection
                </button>
              </Link>
              <Link href="/artisans">
                <button className="px-10 py-4 bg-[#bdd2ff] text-[#375e21] font-bold rounded-lg hover:bg-[#a6c1fb] transition-all shadow-md">
                  Meet the Artisans
                </button>
              </Link>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-2xl animate-in fade-in zoom-in duration-1000">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-6 space-y-3">
                <div className="aspect-3/4 bg-[#f9f7f2] rounded-3xl overflow-hidden border-2 border-dashed border-[#375e21]/10 group hover:border-[#bdd2ff] transition-all relative">
                   <Image 
                     src="/images/hero_ceramic.webp" 
                     alt="Artisan Ceramic" 
                     fill
                     className="object-cover transition-transform duration-500 group-hover:scale-110"
                   />
                   <div className="absolute top-4 left-4 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <ShoppingBag className="w-4 h-4 text-[#375e21]" />
                   </div>
                </div>
                <div className="text-xs text-[#375e21]/60 font-bold italic pl-2">Hand-thrown ceramic vase</div>
              </div>
              
              <div className="col-span-6 space-y-6">
                <div className="space-y-3">
                  <div className="aspect-5/3 bg-[#f9f7f2] rounded-3xl overflow-hidden border-2 border-dashed border-[#375e21]/10 group hover:border-[#bdd2ff] transition-all relative">
                    <Image 
                      src="/images/hero_wooden_bowl.webp" 
                      alt="Carved wooden bowl" 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="text-xs text-[#375e21]/60 font-bold italic pl-2">Carved wooden bowl</div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="aspect-square bg-[#f9f7f2] rounded-3xl overflow-hidden border-2 border-dashed border-[#375e21]/10 group hover:border-[#bdd2ff] transition-all relative">
                      <Image 
                        src="/images/hero_textile.webp" 
                        alt="Woven textile" 
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="text-[10px] text-[#375e21]/40 font-bold italic text-center">Woven textile</div>
                  </div>
                  <div className="space-y-3">
                    <div className="aspect-square bg-[#f9f7f2] rounded-3xl overflow-hidden border-2 border-dashed border-[#375e21]/10 group hover:border-[#bdd2ff] transition-all relative">
                      <Image 
                        src="/images/hero_jewelry.webp" 
                        alt="Artisan jewelry" 
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="text-[10px] text-[#375e21]/40 font-bold italic text-center">Artisan jewelry</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#fdfbf7] py-24 pb-32">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              icon: <Zap className="w-8 h-8 stroke-[1.5]" />, 
              title: "Quick Shipping", 
              desc: "Deliver to ship your artisan on quick shipping." 
            },
            { 
              icon: <Hammer className="w-8 h-8 stroke-[1.5]" />, 
              title: "Quality Craft", 
              desc: "Prememmed high quality quality craft customers." 
            },
            { 
              icon: <UserIcon className="w-8 h-8 stroke-[1.5]" />, 
              title: "Artisan First", 
              desc: "Join your artisan through out in and flourishing lives." 
            },
            { 
              icon: <ShieldCheck className="w-8 h-8 stroke-[1.5]" />, 
              title: "Secure Shop", 
              desc: "Secure shop of handcrafted conversation items." 
            }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-10 rounded-2xl text-center space-y-6 shadow-sm border border-gray-100 hover:shadow-md transition-all hover:-translate-y-1 group">
              <div className="inline-flex p-4 rounded-xl bg-[#375e21]/5 text-[#375e21] group-hover:bg-[#375e21] group-hover:text-white transition-all">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-[#375e21] tracking-tight">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-50 mx-auto">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#375e21] py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10 space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Ready to showcasing <br className="hidden md:block" />
            your craftsmanship?
          </h2>
          <p className="text-[#bdd2ff] text-xl font-medium max-w-2xl mx-auto opacity-90 leading-relaxed">
            Join our community of over 500+ independent artisans selling their handcrafted treasures.
          </p>
          <div className="pt-8">
            <button className="bg-white text-[#375e21] px-12 py-4 rounded-xl font-extrabold hover:bg-[#bdd2ff] transition-all shadow-2xl hover:-translate-y-0.5 active:scale-95 text-lg">
              Start Selling Today
            </button>
          </div>
        </div>
        
        <div className="absolute right-[-10%] bottom-[-30%] opacity-10 rotate-[-15deg] transition-transform hover:rotate-0 duration-2000">
          <Hammer className="w-150 h-150 text-white" />
        </div>
      </section>

      <footer className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-12 border-t border-gray-100 pt-16">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
               <span className="text-[#375e21] font-bold text-3xl tracking-tighter italic">Handcrafted Haven</span>
            </div>
            <p className="text-gray-400 text-xs uppercase tracking-[0.2em] font-bold">
              Celebrating independent artisans since 2026
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="gap-6 text-[#375e21]/40 text-[10px] font-bold uppercase tracking-[0.25em] lg:pl-12 lg:border-l border-gray-100 hidden lg:flex">
               <a href="#" className="hover:text-[#375e21] transition-colors">Privacy</a>
               <a href="#" className="hover:text-[#375e21] transition-colors">Terms</a>
               <a href="#" className="hover:text-[#375e21] transition-colors">Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

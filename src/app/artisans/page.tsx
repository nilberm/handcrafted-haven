import { Metadata } from "next";
import { getSellersWithProducts } from "@/lib/supabase/queries";
import { ArtisanShowcaseCard } from "@/components/ArtisanShowcaseCard";
import { Hammer } from "lucide-react";

export const metadata: Metadata = {
  title: "Meet the Artisans · Handcrafted Haven",
  description: "Discover the passionate creators behind our unique handcrafted goods and explore their unique stories.",
};

export default async function ArtisansPage() {
  const artisans = await getSellersWithProducts();

  return (
    <div className="min-h-screen bg-[#fdfbf7] pb-32">
      {/* Hero Section */}
      <div className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#375e21]/5 border border-[#375e21]/10 text-[#375e21] text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
            <Hammer className="w-3 h-3" />
            The People Behind the Craft
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-[#375e21] tracking-tight leading-tight">
            Meet Our <br className="hidden sm:block" />
            <span className="text-[#375e21] underline decoration-[#bdd2ff] decoration-8 underline-offset-8">Distinguished Artisans.</span>
          </h1>
          <p className="mt-8 text-lg text-neutral-600 max-w-2xl font-medium leading-relaxed">
            Every piece in our haven has a story. Get to know the talented hands and creative minds dedicated to preserving traditional craftsmanship.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="space-y-12">
          {artisans.length > 0 ? (
            artisans.map((artisan) => (
              <ArtisanShowcaseCard key={artisan.id} artisan={artisan} />
            ))
          ) : (
            <div className="bg-white p-20 rounded-3xl border-2 border-dashed border-neutral-200 text-center">
              <p className="text-xl font-bold text-neutral-400">Our artisan community is currently growing. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

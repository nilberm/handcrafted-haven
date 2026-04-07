'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/components/AuthProvider'
import { updateProfile, uploadImage } from '@/lib/supabase/queries'
import { Settings, User, Camera, ShieldCheck, Loader2, Hammer } from 'lucide-react'
import Image from 'next/image'

export default function SettingsPage() {
  const router = useRouter()
  const { user, profile, loading } = useAuth()
  const [updating, setUpdating] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    full_name: '',
    bio: '',
    craft_story: '',
  })

  useEffect(() => {
    if (profile) {
      setFormData({
        full_name: profile.full_name || '',
        bio: profile.bio || '',
        craft_story: profile.craft_story || '',
      })
      setAvatarPreview(profile.avatar_url || null)
    }
  }, [profile])

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
      <Loader2 className="w-8 h-8 animate-spin text-[#375e21]" />
    </div>
  )

  if (!user) {
    router.push('/login')
    return null
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && user) {
      try {
        setUpdating(true)
        const publicUrl = await uploadImage(file, `avatars/${user.id}`)
        await updateProfile(user.id, { avatar_url: publicUrl })
        setAvatarPreview(publicUrl)
      } catch (error) {
        console.error('Error uploading avatar:', error)
      } finally {
        setUpdating(false)
      }
    }
  }

  const handleSave = async () => {
    if (!user) return
    setUpdating(true)
    try {
      await updateProfile(user.id, formData)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile.')
    } finally {
      setUpdating(false)
    }
  }

  const handleSwitchToSeller = async () => {
    if (!user) return
    setUpdating(true)
    try {
      await updateProfile(user.id, { role: 'seller' })
      alert('Congratulations! You are now a registered Artisan.')
      router.refresh()
    } catch (error) {
      console.error('Error switching to seller:', error)
      alert('Failed to update role.')
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#fdfbf7] py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 bg-[#375e21]/5 rounded-xl text-[#375e21]">
            <Settings className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold text-[#375e21] tracking-tight">Account Settings</h1>
        </div>

        <div className="grid gap-8">
          {/* Profile Basics */}
          <section className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner relative bg-gray-100">
                  {avatarPreview ? (
                    <Image src={avatarPreview} alt="Avatar" fill className="object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-gray-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity">
                  <Camera className="w-6 h-6" />
                  <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                </label>
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-bold text-[#375e21]">{profile?.full_name || 'User Name'}</h2>
                <p className="text-sm text-gray-500 font-medium">{user.email}</p>
                <div className="flex items-center gap-2 pt-2">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    profile?.role === 'seller' ? 'bg-[#375e21] text-white' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {profile?.role || 'User'} Account
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-[#375e21] mb-1">Full Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#375e21]/20 focus:border-[#375e21] outline-none transition-all"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                />
              </div>

              {profile?.role === 'seller' && (
                <>
                  <div>
                    <label className="block text-sm font-bold text-[#375e21] mb-1">Professional Bio</label>
                    <textarea
                      rows={3}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#375e21]/20 focus:border-[#375e21] outline-none transition-all resize-none"
                      placeholder="Brief summary of your expertise..."
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-[#375e21] mb-1">Craftsmanship Story</label>
                    <textarea
                      rows={5}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#375e21]/20 focus:border-[#375e21] outline-none transition-all resize-none"
                      placeholder="Share your passion, process, and inspirations with the world..."
                      value={formData.craft_story}
                      onChange={(e) => setFormData({ ...formData, craft_story: e.target.value })}
                    />
                  </div>
                </>
              )}
            </div>

            <button
              onClick={handleSave}
              disabled={updating}
              className="px-8 py-3 bg-[#375e21] text-white font-bold rounded-lg hover:bg-[#2d4f1b] transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Changes'}
            </button>
          </section>

          {/* Role Upgrade */}
          {profile?.role !== 'seller' && (
            <section className="bg-[#375e21] rounded-2xl p-8 text-white relative overflow-hidden group">
              <div className="relative z-10 space-y-4 max-w-md">
                <div className="flex items-center gap-2 text-[#bdd2ff] font-bold uppercase text-xs tracking-widest">
                  <ShieldCheck className="w-4 h-4" />
                  Become an Artisan
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Ready to sell your crafts?</h2>
                <p className="text-[#bdd2ff] opacity-90 text-sm leading-relaxed">
                  Join our community of makers. As a seller, you'll get a dedicated profile page,
                  inventory management tools, and direct connection to handcrafted lovers.
                </p>
                <button
                  onClick={handleSwitchToSeller}
                  disabled={updating}
                  className="mt-4 bg-white text-[#375e21] px-8 py-3 rounded-lg font-bold hover:bg-[#bdd2ff] transition-all hover:-translate-y-0.5 active:scale-95 shadow-xl disabled:opacity-50"
                >
                  Switch to Seller Account
                </button>
              </div>
              <Hammer className="absolute right-[-20px] bottom-[-20px] w-48 h-48 opacity-10 rotate-[-15deg] group-hover:rotate-0 transition-transform duration-1000" />
            </section>
          )}
        </div>
      </div>
    </div>
  )
}

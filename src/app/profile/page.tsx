'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { createClient } from '@/lib/supabase/client'
import { 
  User, 
  Settings, 
  Save, 
  ExternalLink, 
  Loader2, 
  Hammer, 
  BookOpen, 
  Camera,
  CheckCircle2
} from 'lucide-react'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, profile, loading } = useAuth()
  const [updating, setUpdating] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')
  const [craftStory, setCraftStory] = useState('')

  const supabase = createClient()

  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || '')
      setUsername(profile.username || '')
      setBio(profile.bio || '')
      setCraftStory(profile.craft_story || '')
    }
  }, [profile])

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setUpdating(true)
    setMessage(null)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          username: username,
          bio: bio,
          craft_story: craftStory,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user?.id)

      if (error) throw error
      setMessage('Profile updated successfully!')
      setTimeout(() => setMessage(null), 3000)
    } catch (err: any) {
      console.error(err)
      setMessage('Error updating profile: ' + err.message)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-emerald-500" />
    </div>
  )

  if (!user) return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center space-y-4">
      <h1 className="text-2xl font-bold">Please sign in to view your profile</h1>
      <Link href="/login" className="btn-primary">Sign In</Link>
    </div>
  )

  const isSeller = profile?.role === 'seller'

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center overflow-hidden">
                {profile?.avatar_url ? (
                  <img src={profile.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <User className="w-12 h-12 text-emerald-400/50" />
                )}
              </div>
              <button className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-black border border-white/10 text-emerald-400 hover:text-emerald-300 transition-colors shadow-lg">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{fullName || 'Artisan Name'}</h1>
                {isSeller && (
                  <span className="px-2 py-0.5 text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full flex items-center gap-1">
                    <Hammer className="w-3 h-3" />
                    Artisan
                  </span>
                )}
              </div>
              <p className="text-gray-400">@{username || 'username'}</p>
              <p className="text-gray-500 text-sm">{user.email}</p>
            </div>
          </div>
          
          {isSeller && (
            <Link 
              href={`/seller/${user.id}`}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium"
            >
              View Public Shop
              <ExternalLink className="w-4 h-4" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/10 text-emerald-400 font-medium text-left border border-emerald-500/20">
              <User className="w-5 h-5" />
              Personal Info
            </button>
            {isSeller && (
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all text-left">
                <Hammer className="w-5 h-5" />
                Craft & Story
              </button>
            )}
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 text-gray-400 hover:text-white transition-all text-left">
              <Settings className="w-5 h-5" />
              Settings
            </button>
          </div>

          <div className="lg:col-span-2">
            <form onSubmit={handleUpdate} className="glass p-6 rounded-3xl space-y-6">
              <div className="space-y-4">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-400" />
                  Account Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500/50 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Username</label>
                    <input 
                      type="text" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500/50 outline-none transition-all"
                      placeholder="artisan_handle"
                    />
                  </div>
                </div>
              </div>

              {isSeller && (
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-emerald-400" />
                    Artisan Story
                  </h2>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Bio (Quick Intro)</label>
                    <textarea 
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500/50 outline-none transition-all min-h-[100px]"
                      placeholder="Briefly describe who you are..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">The Story of Your Craft</label>
                    <textarea 
                      value={craftStory}
                      onChange={(e) => setCraftStory(e.target.value)}
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500/50 outline-none transition-all min-h-[200px]"
                      placeholder="Share the passion and process behind your handcrafted items..."
                    />
                  </div>
                </div>
              )}

              <div className="pt-6 flex items-center justify-between gap-4">
                {message && (
                  <p className="text-emerald-400 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    {message}
                  </p>
                )}
                <div className="flex-grow"></div>
                <button 
                  type="submit" 
                  disabled={updating}
                  className="btn-primary flex items-center gap-2 px-8"
                >
                  {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

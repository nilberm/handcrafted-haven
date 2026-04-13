'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Hammer, User, Mail, Lock, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react'
import { signIn, signUp } from './actions'

function LoginContent() {
  const searchParams = useSearchParams()
  const isSignupParam = searchParams.get('signup') === 'true'
  
  const [isSignup, setIsSignup] = useState(isSignupParam)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [role, setRole] = useState<'user' | 'seller'>('user')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setMessage(null)

    try {
      if (isSignup) {
        const result = await signUp(email, password, fullName, role)
        if (result?.error) setError(result.error)
        else setMessage(result?.message ?? 'Check your email to confirm your account!')
      } else {
        const result = await signIn(email, password)
        if (result?.error) {
          setError(result.error)
        } else {
          window.location.href = '/'
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass p-8 rounded-2xl shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
              <Hammer className="w-8 h-8 text-emerald-400" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight">
              {isSignup ? 'Create account' : 'Welcome back'}
            </h1>
            <p className="text-gray-400">
              {isSignup 
                ? 'Join our community of handcrafted excellence' 
                : 'Sign in to your Handcrafted Haven account'}
            </p>
          </div>

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignup && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                />
              </div>
            </div>

            {isSignup && (
              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-gray-300">I want to...</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('user')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      role === 'user' 
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <User className="w-5 h-5" />
                    <span className="text-xs font-semibold">Buy Items</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('seller')}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                      role === 'seller' 
                        ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
                        : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    <ShieldCheck className="w-5 h-5" />
                    <span className="text-xs font-semibold">Sell Goods</span>
                  </button>
                </div>
              </div>
            )}

            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            {message && (
              <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm">
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isSignup ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center">
            <button
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
            >
              {isSignup 
                ? 'Already have an account? Sign in' 
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-emerald-500" /></div>}>
      <LoginContent />
    </Suspense>
  )
}

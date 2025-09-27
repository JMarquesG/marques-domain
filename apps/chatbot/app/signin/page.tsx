'use client'

import { useEffect, useState } from 'react'
import { createClient } from '../../utils/supabase/client'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()
  const supabase = createClient()

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    })
    console.log('error', error)
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Check your email for the magic link!')
    }
    
    setLoading(false)
  }

  // Check if already logged in and avoid duplicate subscriptions
  useEffect(() => {
    let isMounted = true
    supabase.auth.getUser().then(({ data }) => {
      if (!isMounted) return
      if (data.user) router.push('/')
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      if (session) router.push('/')
    })

    return () => {
      isMounted = false
      listener.subscription.unsubscribe()
    }
  }, [router, supabase])

  return (
    <main className="max-w-md mx-auto p-6 mt-20">
      <h1 className="text-2xl font-bold mb-6">Sign In</h1>
      
      {message && (
        <div className="mb-4 p-3 rounded text-sm">
          {message}
        </div>
      )}
      
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          required
        />
        
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Sending...' : 'Send Magic Link'}
        </button>
      </form>
    </main>
  )
}
'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabaseBrowser } from '@packages/db/src/supabase-browser'

export default function SignInPage(){
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = supabaseBrowser()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    const code = searchParams.get('code')
    const tokenHash = searchParams.get('token_hash')
    const typeParam = searchParams.get('type')
    const err = searchParams.get('error_description') || searchParams.get('error')
    if (err) setMessage(decodeURIComponent(err.replace(/\+/g, ' ')))

    // Handle OAuth PKCE callback
    if (code) {
      supabase.auth.exchangeCodeForSession(window.location.href)
        .then(({ error }) => {
          if (error) {
            const msg = error.message || ''
            if (/code[_ ]?verifier/i.test(msg)) {
              setMessage('This link can\'t be verified here. Open it in the same browser where you requested it, or request a new magic link below.')
            } else {
              setMessage(msg)
            }
            return
          }
          router.replace('/')
        })
    }

    // Handle magic link / email OTP callback
    if (tokenHash) {
      const type = (typeParam === 'recovery') ? 'recovery' : (typeParam || 'magiclink')
      // @ts-expect-error: type union is broader at runtime
      supabase.auth.verifyOtp({ type, token_hash: tokenHash })
        .then(({ error }) => {
          if (error) {
            setMessage(error.message)
            return
          }
          router.replace('/')
        })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const redirectTo = typeof window !== 'undefined' ? `${window.location.origin}/signin` : undefined

  async function sendMagicLink(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: redirectTo, shouldCreateUser: true }
    })
    if (error) setMessage(error.message)
    else setMessage('Check your email for the magic link.')
    setLoading(false)
  }

  return (
    <main className="max-w-md mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      {message && (
        <div className="text-sm text-red-600">{message}</div>
      )}
      <form className="space-y-3" onSubmit={sendMagicLink}>
        <input
          type="email"
          className="w-full rounded-md border px-3 py-2"
          placeholder="you@example.com"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          required
        />
        <button className="w-full rounded-md bg-blue-600 text-white py-2 disabled:opacity-50" disabled={loading}>
          Send magic link
        </button>
      </form>
      <p className="text-sm text-muted-foreground">
        After signing in, you will be redirected back here.
      </p>
    </main>
  )
}



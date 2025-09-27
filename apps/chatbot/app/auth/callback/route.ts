import { NextResponse } from 'next/server'
import { createClient as createServerClient } from '../../../utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  // If no code, just redirect to sign-in
  if (!code) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  const supabase = await createServerClient()

  // This will read/write cookies via the server helper and set the session
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    // On error, send back to sign-in with a hint
    const url = new URL('/signin', request.url)
    url.searchParams.set('error', 'auth_failed')
    return NextResponse.redirect(url)
  }

  // Success: redirect to home (which will now see an authenticated user)
  return NextResponse.redirect(new URL('/', request.url))
}



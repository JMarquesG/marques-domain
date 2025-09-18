import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function requireVerifiedUser(){
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (k)=>cookieStore.get(k)?.value } }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if(!user) throw new Response('Unauthorized', { status: 401 })
  if(!user.email_confirmed_at) throw new Response('Email not verified', { status: 403 })
  return { supabase, user }
}


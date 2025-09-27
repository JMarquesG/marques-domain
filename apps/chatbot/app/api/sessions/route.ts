import { NextResponse } from 'next/server'
import { getUser } from '@/src/lib/auth'
import { supabaseServer } from '@packages/db/src/supabase-server'

export async function POST(){
  const user = await getUser()
  const supa = supabaseServer()
  const { data, error } = await supa.from('sessions').insert({ user_id: user!.id }).select('id, channel').single()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ sessionId: data.id, channel: data.channel })
}


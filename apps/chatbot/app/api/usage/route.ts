import { getUser } from '@/src/lib/auth'
import { supabaseServer } from '@packages/db/src/supabase-server'
import { NextResponse } from 'next/server'

export async function GET(){
  const user = await getUser()
  const supa = supabaseServer()
  const { data } = await supa.from('token_usage').select('*').eq('user_id', user!.id).maybeSingle()
  const ceil = parseFloat(process.env.CHAT_COST_CEIL_USD || '0.30')
  return NextResponse.json({ usage: data ?? { usd_spent: 0, input_tokens:0, output_tokens:0, embed_tokens:0 }, ceilUSD: ceil })
}


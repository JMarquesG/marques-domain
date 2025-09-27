import { NextResponse } from 'next/server'
import { getUser } from '@/src/lib/auth'
import { supabaseServer } from '@packages/db/src/supabase-server'
import { createClient as createServerClient } from '../../../../../utils/supabase/server'

export async function POST(req: Request, { params }: { params: { id: string } }){
  const user = await getUser()
  const supa = supabaseServer()
  const { data: session } = await supa.from('sessions').select('id, user_id').eq('id', params.id).single()
  if (!session || session.user_id !== user!.id) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const storage = supa.storage.from('session-uploads')
  const { data: list } = await storage.list(`${params.id}`)
  if (list?.length) await storage.remove(list.map(f => `${params.id}/${f.name}`))

  await supa.rpc('close_session', { p_session: params.id })
  const supabase = await createServerClient()
  await supabase.auth.signOut()
  return NextResponse.redirect(new URL('/', req.url))
}


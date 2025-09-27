import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/src/lib/auth'
import { supabaseServer } from '@packages/db/src/supabase-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }){
  const user = await getUser()
  const supa = supabaseServer()
  const { data: session } = await supa.from('sessions').select('id, user_id, alive').eq('id', params.id).single()
  if (!session || session.user_id !== user!.id || !session.alive) return NextResponse.json({ error: 'Invalid session' }, { status: 404 })

  const { data: docs, error } = await supa.from('session_docs')
    .select('id, filename, storage_path, pages, created_at')
    .eq('session_id', params.id)
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  const storage = supa.storage.from('session-uploads')
  const signed = await Promise.all((docs ?? []).map(async (d: any) => {
    const sig = await storage.createSignedUrl(d.storage_path, 60 * 60)
    return {
      id: d.id as string,
      filename: d.filename as string,
      pages: d.pages as number,
      url: sig.data?.signedUrl || null,
    }
  }))

  return NextResponse.json({ docs: signed })
}



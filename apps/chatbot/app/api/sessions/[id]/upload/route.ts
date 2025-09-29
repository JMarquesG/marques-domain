import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/src/lib/auth'
import { supabaseServer } from '@packages/db/src/supabase-server'
import { chunkByTokens } from '@/src/lib/chunk'
import { embedChunks } from '@/src/lib/rag'
import { dollarsFromTokens } from '@/src/lib/pricing'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest, { params }: { params: { id: string } }){
  const user = await getUser()
  const supa = supabaseServer()
  // Enforce budget cap before indexing
  const { data: usage } = await supa.from('token_usage').select('usd_spent').eq('user_id', user!.id).maybeSingle()
  const spent = Number(usage?.usd_spent || 0)
  const ceil = parseFloat(process.env.CHAT_COST_CEIL_USD || '0.30')
  if (spent >= ceil) return NextResponse.json({ error: 'Budget exceeded' }, { status: 402 })
  const form = await req.formData()
  const file = form.get('file') as File
  if (!file) return NextResponse.json({ error: 'No file' }, { status: 400 })

  const { data: session } = await supa.from('sessions').select('id, user_id, alive').eq('id', params.id).single()
  if (!session || session.user_id !== user!.id || !session.alive) return NextResponse.json({ error: 'Invalid session' }, { status: 404 })

  const buf = Buffer.from(await file.arrayBuffer())
  const pdf = (await import('pdf-parse')).default as any
  const parsed = await pdf(buf)
  if (parsed.numpages > parseInt(process.env.MAX_UPLOAD_PAGES || '50'))
    return NextResponse.json({ error: 'Too many pages' }, { status: 400 })

  const path = `${params.id}/${crypto.randomUUID()}_${file.name}`
  const storage = supa.storage.from('session-uploads')
  const up = await storage.upload(path, buf, { contentType: (file as any).type || 'application/pdf' })
  if (up.error) return NextResponse.json({ error: up.error.message }, { status: 500 })

  // Create a short-lived signed URL for client-side viewing
  const signed = await storage.createSignedUrl(path, 60 * 60)

  const { data: doc, error: docErr } = await supa.from('session_docs')
    .insert({ session_id: params.id, filename: file.name, storage_path: path, pages: parsed.numpages })
    .select('id').single()
  if (docErr) return NextResponse.json({ error: docErr.message }, { status: 500 })

  const chunks = chunkByTokens(parsed.text).map((content, idx) => ({ content, idx }))
  const { embedTokens } = await embedChunks(params.id, doc.id, chunks)

  const embedUSD = dollarsFromTokens('embed-in', embedTokens)
  await supa.rpc('bump_usage', { p_user: user!.id, p_in: 0, p_out: 0, p_emb: embedTokens, p_usd: embedUSD })

  return NextResponse.json({ ok: true, docId: doc.id, chunks: chunks.length, viewerUrl: signed.data?.signedUrl })
}


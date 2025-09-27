import OpenAI from 'openai'
import { supabaseServer } from '@packages/db/src/supabase-server'

function getOpenAI(){
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
}

export async function embedChunks(sessionId: string, docId: string, chunks: {content:string, idx:number, pageFrom?:number, pageTo?:number}[]) {
  const supa = supabaseServer()
  const inputs = chunks.map(c => c.content)
  const { data } = await getOpenAI().embeddings.create({ model: 'text-embedding-3-small', input: inputs })
  const vectors = data.map(d => d.embedding as unknown as number[])
  const rows = chunks.map((c, i) => ({
    session_id: sessionId,
    doc_id: docId,
    chunk_index: c.idx,
    content: c.content,
    embedding: vectors[i],
    tokens: 0,
    page_from: c.pageFrom ?? null,
    page_to: c.pageTo ?? null
  }))
  const { error } = await supa.from('session_chunks').insert(rows as any)
  if (error) throw error
  const embedTokens = inputs.reduce((a,s)=>a + Math.ceil(s.split(/\s+/).length*1.3),0)
  return { embedTokens }
}

export async function retrieve(sessionId: string, query: string, k=8) {
  const supa = supabaseServer()
  const { data: emb } = await getOpenAI().embeddings.create({ model: 'text-embedding-3-small', input: query })
  const vector = emb[0].embedding as unknown as number[]
  const { data, error } = await supa.rpc('match_chunks', { p_session: sessionId, p_query: vector, p_k: k })
  if (error) throw error
  return data as { content:string }[]
}

export async function topK(sessionId: string, embedding: number[], k=8) {
  const supa = supabaseServer()
  const { data, error } = await supa
    .from('session_chunks')
    .select('content, embedding, page_from, page_to, doc_id')
    .eq('session_id', sessionId)
    .order('embedding <-> ' + JSON.stringify(embedding))
    .limit(k)
  if (error) throw error
  return (data ?? []).map(r => ({
    content: (r as any).content as string,
    pageFrom: (r as any).page_from as number | null,
    pageTo: (r as any).page_to as number | null,
    docId: (r as any).doc_id as string | null,
  }))
}


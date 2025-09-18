import { NextRequest } from 'next/server'
import { requireVerifiedUser } from '@/src/lib/auth'
import { supabaseServer } from '@packages/db/src/supabase-server'
import { streamText } from 'ai'
import { openai as aiOpenAI } from '@ai-sdk/openai'
import OpenAI from 'openai'
import { topK } from '@/src/lib/rag'

export const runtime = 'nodejs'

function getOpenAI(){
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })
}

async function checkBudgetOrThrow(supa: ReturnType<typeof supabaseServer>, userId: string) {
  const { data } = await supa.from('token_usage').select('usd_spent').eq('user_id', userId).maybeSingle()
  const spent = Number(data?.usd_spent || 0)
  const ceil = parseFloat(process.env.CHAT_COST_CEIL_USD || '0.30')
  if (spent >= ceil) throw new Response('Budget exceeded', { status: 402 })
}

export async function POST(req: NextRequest){
  const { user } = await requireVerifiedUser()
  const supa = supabaseServer()
  await checkBudgetOrThrow(supa, user.id)

  const { sessionId, message } = await req.json() as { sessionId: string; message: string }
  const { data: session } = await supa.from('sessions').select('id, user_id, alive').eq('id', sessionId).single()
  if (!session || session.user_id !== user.id || !session.alive) throw new Response('Invalid session', { status: 404 })

  const emb = await getOpenAI().embeddings.create({ model: 'text-embed-small', input: message })
  const contexts = await topK(sessionId, emb.data[0].embedding as any, 8)
  const contextText = contexts.map(c => c.content).join('\n---\n')

  const system = `You answer user questions strictly from the provided CONTEXT.
If the answer is not in CONTEXT, say you don't know.
Keep answers concise and cite page ranges when available.
CONTEXT:
${contextText}`

  // store user message immediately
  await supa.from('session_messages').insert({ session_id: sessionId, role: 'user', content: message })

  const result = await streamText({
    model: aiOpenAI('gpt-5-mini'),
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: message }
    ],
  })

  return result.toAIStreamResponse()
}


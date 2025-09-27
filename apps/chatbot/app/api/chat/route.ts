import { NextRequest } from 'next/server'
import { getUser } from '@/src/lib/auth'
import { supabaseServer } from '@packages/db/src/supabase-server'
import { streamText, tool } from 'ai'
import { openai as aiOpenAI } from '@ai-sdk/openai'
import OpenAI from 'openai'
import { topK } from '@/src/lib/rag'
import { z } from 'zod'

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
  const user = await getUser()
  const supa = supabaseServer()
  await checkBudgetOrThrow(supa, user!.id)

  const { sessionId, message } = await req.json() as { sessionId: string; message: string }
  const { data: session } = await supa.from('sessions').select('id, user_id, alive').eq('id', sessionId).single()
  if (!session || session.user_id !== user!.id || !session.alive) throw new Response('Invalid session', { status: 404 })

  const system = `You are a helpful assistant for answering questions about uploaded PDFs.
You may use the "rag" tool to retrieve relevant passages if needed. Only use it when the user's question requires information from the PDFs.
When citing sources, prefer the format [source](page) or [source](pageStart-pageEnd). Keep answers concise.`

  // store user message immediately
  await supa.from('session_messages').insert({ session_id: sessionId, role: 'user', content: message })

  const rag = tool({
    description: 'Retrieve the most relevant PDF chunks from the current session to ground your answer',
    parameters: z.object({
      query: z.string().describe('The semantic query to search for in the user\'s PDFs'),
      k: z.number().int().min(1).max(12).optional().default(8)
    }),
    execute: async ({ query, k }) => {
      const emb = await getOpenAI().embeddings.create({ model: 'text-embedding-3-small', input: query })
      const contexts = await topK(sessionId, emb.data[0].embedding as any, k)
      // Return compact context with page hints for citation
      const items = contexts.map((c) => ({
        content: c.content,
        pageFrom: c.pageFrom ?? null,
        pageTo: c.pageTo ?? null,
        docId: c.docId ?? null,
      }))
      return { contexts: items }
    }
  })

  const result = await streamText({
    model: aiOpenAI('gpt-5-mini'),
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: message }
    ],
    tools: { rag },
    toolChoice: 'auto'
  })

  return result.toDataStreamResponse()
}


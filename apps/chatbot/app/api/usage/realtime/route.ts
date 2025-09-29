import { NextRequest, NextResponse } from 'next/server'
import { getUser } from '@/src/lib/auth'
import { supabaseServer } from '@packages/db/src/supabase-server'

export const runtime = 'nodejs'

export async function POST(req: NextRequest) {
  try {
    const user = await getUser()
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { sessionId } = await req.json()
    const supa = supabaseServer()
    
    // Validate session
    const { data: session } = await supa
      .from('sessions')
      .select('id, user_id, channel')
      .eq('id', sessionId)
      .single()

    if (!session || session.user_id !== user.id) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 404 })
    }

    const channelName = session.channel || `session_${sessionId}`
    
    // Get current usage
    const { data: usage } = await supa
      .from('token_usage')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle()

    const ceil = parseFloat(process.env.CHAT_COST_CEIL_USD || '0.30')

    // Broadcast usage update
    await supa.channel(channelName).send({
      type: 'broadcast',
      event: 'chat',
      payload: {
        type: 'usage',
        usage: usage ?? {
          usd_spent: 0,
          input_tokens: 0,
          output_tokens: 0,
          embed_tokens: 0
        },
        ceilUSD: ceil
      }
    })

    return NextResponse.json({ 
      success: true,
      usage: usage ?? {
        usd_spent: 0,
        input_tokens: 0,
        output_tokens: 0,
        embed_tokens: 0
      },
      ceilUSD: ceil
    })
  } catch (error: any) {
    console.error('Usage fetch error:', error)
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch usage' },
      { status: 500 }
    )
  }
}

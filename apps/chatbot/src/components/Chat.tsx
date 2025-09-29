'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageList from './MessageList'
import { LogOut, Plus, AlertTriangle } from 'lucide-react'
import { getSupabaseClient } from '../lib/supabase-client'

export default function Chat({ sessionId }: { sessionId: string }) {
  const { 
    addMessage, 
    updateMessageContent, 
    appendMessageContent, 
    appendToolLog, 
    setUsage, 
    usageUSD, 
    messages 
  } = useChatStore()
  
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [ceilUSD, setCeilUSD] = useState<number>(0.3)
  const endRef = useRef<HTMLDivElement | null>(null)
  const channelRef = useRef<any>(null)
  const usageIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const supabaseRef = useRef(getSupabaseClient())

  useEffect(() => {
    // Subscribe to the session channel for real-time updates
    const channelName = `session_${sessionId}`
    const supabase = supabaseRef.current
    const channel = supabase
      .channel(channelName)
      .on('broadcast', { event: 'chat' }, (payload) => {
        const msg = payload.payload
        console.log('[CLIENT] Received broadcast:', msg.type, msg)
        
        if (msg.type === 'usage') {
          setUsage(Number(msg?.usage?.usd_spent || 0))
          setCeilUSD(msg?.ceilUSD ?? 0.3)
        } else if (msg.type === 'text' && msg.messageId) {
          // Handle streaming chunks by appending deltas
          if (msg.delta) {
            appendMessageContent(msg.messageId, msg.delta)
          } else if (msg.value) {
            // Fallback for full content updates
            updateMessageContent(msg.messageId, msg.value)
          }
        } else if (msg.type === 'tool-call' && msg.messageId) {
          appendToolLog(msg.messageId, {
            id: msg.id || crypto.randomUUID(),
            name: msg.name,
            args: msg.args,
            ts: new Date().toISOString()
          })
        } else if (msg.type === 'tool-result' && msg.messageId) {
          appendToolLog(msg.messageId, {
            id: msg.id || crypto.randomUUID(),
            name: msg.name,
            args: msg.args,
            result: msg.result,
            ts: new Date().toISOString()
          })
        } else if (msg.type === 'done') {
          setIsLoading(false)
        } else if (msg.type === 'error') {
          setIsLoading(false)
          addMessage({
            id: crypto.randomUUID(),
            role: 'assistant',
            content: msg.message || 'An error occurred',
            createdAt: new Date().toISOString()
          })
        }
      })
      .subscribe()

    channelRef.current = channel

    // Fetch initial usage and set up periodic updates
    fetchUsage()
    usageIntervalRef.current = setInterval(fetchUsage, 5000)

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
      }
      if (usageIntervalRef.current) {
        clearInterval(usageIntervalRef.current)
      }
    }
  }, [sessionId, setUsage, updateMessageContent, appendMessageContent, appendToolLog, addMessage])

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages])

  async function fetchUsage() {
    try {
      const response = await fetch('/api/usage/realtime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId })
      })
      
      if (response.ok) {
        const data = await response.json()
        setUsage(Number(data?.usage?.usd_spent || 0))
        setCeilUSD(data?.ceilUSD ?? 0.3)
      }
    } catch (error) {
      console.error('Failed to fetch usage:', error)
    }
  }

  async function onSend(e: FormEvent) {
    e.preventDefault()
    const content = input.trim()
    if (!content || isLoading) return

    // Add user message
    const userMsgId = crypto.randomUUID()
    addMessage({
      id: userMsgId,
      role: 'user',
      content,
      createdAt: new Date().toISOString()
    })
    setInput('')
    setIsLoading(true)

    // Add assistant message placeholder
    const assistantMsgId = crypto.randomUUID()
    addMessage({
      id: assistantMsgId,
      role: 'assistant',
      content: '',
      createdAt: new Date().toISOString(),
      toolLogs: []
    })

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          message: content,
          messageId: assistantMsgId
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to send message')
      }
    } catch (error: any) {
      setIsLoading(false)
      updateMessageContent(assistantMsgId, '')
      addMessage({
        id: crypto.randomUUID(),
        role: 'assistant',
        content: error?.message || 'Failed to send message. Please try again.',
        createdAt: new Date().toISOString()
      })
    }
  }

  const budgetReached = ceilUSD !== null && usageUSD >= ceilUSD

  return (
    <div className="flex flex-col gap-4 h-full max-h-[calc(100vh-8rem)] overflow-hidden">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="text-sm opacity-70">
          Usage: {((usageUSD / ceilUSD) * 100).toFixed(1)}%
        </div>
        <div className="flex gap-2">
          <form action={`/api/sessions/${sessionId}/end`} method="post">
            <button
              title="Logout & End"
              className="px-2 py-2 rounded border inline-flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </form>
          <button
            onClick={() => window.location.reload()}
            className="px-2 py-2 rounded border inline-flex items-center gap-2"
          >
            <Plus size={16} />
            New chat
          </button>
        </div>
      </div>

      {budgetReached && (
        <div className="rounded-md border border-amber-300 bg-amber-50 text-amber-900 p-3 flex items-start gap-2">
          <AlertTriangle className="mt-0.5" size={18} />
          <div>
            <div className="font-medium">Demo budget reached</div>
            <div className="text-sm">
              Email{' '}
              <a
                className="underline"
                href="mailto:jordi.marques.godo@gmail.com"
              >
                jordi.marques.godo@gmail.com
              </a>{' '}
              for more credits or to schedule a demo.
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 min-h-0 max-h-full overflow-y-auto pr-1">
        <MessageList />
        <div ref={endRef} />
      </div>
      
      <form
        onSubmit={onSend}
        className="flex gap-2 mt-auto sticky bottom-0 bg-transparent pt-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={isLoading || budgetReached}
          className="flex-1 border rounded-xl p-2 bg-white text-black placeholder:text-gray-500 disabled:opacity-50"
          placeholder={
            budgetReached
              ? 'Budget reached'
              : isLoading
              ? 'Processing...'
              : 'Ask about your PDF…'
          }
        />
        <button
          disabled={isLoading || budgetReached}
          className="px-3 py-2 rounded-xl border disabled:opacity-50"
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
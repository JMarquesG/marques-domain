'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageList from './MessageList'
import { LogOut, Plus, AlertTriangle } from 'lucide-react'

export default function Chat({ sessionId }:{sessionId:string}){
  const { addMessage, updateMessageContent, appendToolLog, setUsage, usageUSD } = useChatStore()
  const [input, setInput] = useState('')
  const abortRef = useRef<AbortController|null>(null)
  const [ceilUSD, setCeilUSD] = useState<number>(0.3)

  useEffect(()=>{
    const t = setInterval(async ()=>{
      const res = await fetch('/api/usage')
      const { usage, ceilUSD } = await res.json()
      setUsage(Number(usage?.usd_spent || 0))
      setCeilUSD(ceilUSD ?? null)
    }, 4000)
    return ()=>clearInterval(t)
  }, [setUsage])

  async function onSend(e: FormEvent){
    e.preventDefault()
    const content = input.trim(); if(!content) return
    addMessage({ id: crypto.randomUUID(), role:'user', content, createdAt: new Date().toISOString() })
    setInput('')
    abortRef.current?.abort()
    abortRef.current = new AbortController()

    const res = await fetch('/api/chat', {
      method:'POST',
      body: JSON.stringify({ sessionId, message: content }),
      headers: { 'Content-Type':'application/json' },
      signal: abortRef.current.signal
    })
    if(!res.ok){ addMessage({ id: crypto.randomUUID(), role:'assistant', content: 'Error or budget exceeded.', createdAt:new Date().toISOString() }); return; }

    const reader = res.body!.getReader()
    const decoder = new TextDecoder()
    const msgId = crypto.randomUUID()
    addMessage({ id: msgId, role:'assistant', content: '', createdAt:new Date().toISOString(), toolLogs: [] })
    let buffer = ''
    for(;;){
      const { done, value } = await reader.read()
      if(done) break
      buffer += decoder.decode(value, { stream: true })
      // The ai-sdk data stream emits JSON lines starting with "data:"
      const lines = buffer.split(/\n/)
      buffer = lines.pop() || ''
      for(const line of lines){
        const trimmed = line.trim()
        if(!trimmed.startsWith('data:')) continue
        const payloadStr = trimmed.slice(5).trim()
        if(payloadStr === '[DONE]') continue
        try{
          const evt = JSON.parse(payloadStr)
          if(evt.type === 'text'){ // incremental text
            updateMessageContent(msgId, (evt.value || ''))
          } else if(evt.type === 'tool-call'){ // tool called with args
            appendToolLog(msgId, { id: evt.id || crypto.randomUUID(), name: evt.name, args: evt.args, ts: new Date().toISOString() })
          } else if(evt.type === 'tool-result'){
            appendToolLog(msgId, { id: evt.id || crypto.randomUUID(), name: evt.name, args: evt.args, result: evt.result, ts: new Date().toISOString() })
          }
        }catch(_e){ /* ignore parse errors */ }
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between border-b pb-3">
        <div className="text-sm opacity-70">Usage: { usageUSD/ceilUSD * 100}%</div>
        <div className="flex gap-2">
          <form action={`/api/sessions/${sessionId}/end`} method="post">
            <button title="Logout & End" className="px-2 py-2 rounded border inline-flex items-center gap-2"><LogOut size={16}/>Logout</button>
          </form>
          <button onClick={()=>window.location.reload()} className="px-2 py-2 rounded border inline-flex items-center gap-2"><Plus size={16}/>New chat</button>
        </div>
      </div>

      {ceilUSD !== null && usageUSD >= ceilUSD && (
        <div className="rounded-md border border-amber-300 bg-amber-50 text-amber-900 p-3 flex items-start gap-2">
          <AlertTriangle className="mt-0.5" size={18} />
          <div>
            <div className="font-medium">Demo budget reached</div>
            <div className="text-sm">Email <a className="underline" href="mailto:jordi.marques.godo@gmail.com">jordi.marques.godo@gmail.com</a> for more credits or to schedule a demo.</div>
          </div>
        </div>
      )}

      <MessageList />
      <form onSubmit={onSend} className="flex gap-2 mt-auto">
        <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 border rounded-xl p-2 bg-white text-black placeholder:text-gray-500" placeholder="Ask about your PDF…" />
        <button className="px-3 py-2 rounded-xl border">Send</button>
      </form>
    </div>
  )
}


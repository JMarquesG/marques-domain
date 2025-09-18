'use client'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore'
import MessageList from './MessageList'

export default function Chat({ sessionId }:{sessionId:string}){
  const { messages, addMessage, setUsage } = useChatStore()
  const [input, setInput] = useState('')
  const abortRef = useRef<AbortController|null>(null)

  useEffect(()=>{
    const t = setInterval(async ()=>{
      const res = await fetch('/api/usage')
      const { usage } = await res.json()
      setUsage(Number(usage?.usd_spent || 0))
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
    let acc = ''
    for(;;){
      const { done, value } = await reader.read()
      if(done) break
      acc += new TextDecoder().decode(value)
      addMessage({ id: crypto.randomUUID(), role:'assistant', content: acc, createdAt:new Date().toISOString() })
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="text-sm opacity-60">Budget cap: $0.30</div>
      <MessageList />
      <form onSubmit={onSend} className="flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} className="flex-1 border rounded-xl p-2" placeholder="Ask about your PDF…" />
        <button className="px-3 py-2 rounded-xl border">Send</button>
      </form>
    </div>
  )
}


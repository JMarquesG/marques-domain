'use client'
import { useChatStore } from '../store/useChatStore'

export default function MessageList(){
  const { messages } = useChatStore()
  return (
    <div className="space-y-3">
      {messages.map(m=> (
        <div key={m.id} className={`p-3 rounded-xl ${m.role==='user'?'bg-gray-100':'bg-white border'}`}>
          <div className="text-xs opacity-60">{m.role}</div>
          <div className="whitespace-pre-wrap">{m.content}</div>
        </div>
      ))}
    </div>
  )
}


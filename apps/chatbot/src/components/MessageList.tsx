'use client'
import { useChatStore } from '../store/useChatStore'
import { useState } from 'react'

export default function MessageList(){
  const { messages } = useChatStore()
  return (
    <div className="space-y-3">
      {messages.map(m=> (
        <MessageBubble key={m.id} role={m.role} content={m.content} toolLogs={m.toolLogs} />
      ))}
    </div>
  )
}

function MessageBubble({ role, content, toolLogs }: { role: 'user'|'assistant'; content: string; toolLogs?: any[] }){
  const [open, setOpen] = useState(false)
  const { setPdfPage } = useChatStore()

  const contentWithLinks = content.replace(/\[source\]\((\d+)(?:-(\d+))?\)/g, (_m, p1) => {
    const page = parseInt(p1, 10)
    return `<a href="#" data-page="${page}" class="underline">[source](${page})</a>`
  })

  const isLoading = role === 'assistant' && !content && (!toolLogs || toolLogs.length === 0)
  const hasToolsRunning = role === 'assistant' && toolLogs && toolLogs.length > 0 && !content

  return (
    <div className={`p-3 rounded-xl ${role==='user'?'bg-gray-100':'bg-white border'} text-black`}>
      <div className="text-xs opacity-60 text-black">{role}</div>
      {isLoading ? (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
          <span>Thinking...</span>
        </div>
      ) : hasToolsRunning ? (
        <div className="flex items-center gap-2 text-gray-500">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500"></div>
          <span>Searching documents...</span>
        </div>
      ) : (
        <div
          className="whitespace-pre-wrap text-black"
          dangerouslySetInnerHTML={{ __html: contentWithLinks }}
          onClick={(e)=>{
            const target = e.target as HTMLElement
            const pageStr = target.getAttribute('data-page')
            if(pageStr){ e.preventDefault(); setPdfPage(parseInt(pageStr,10)); }
          }}
        />
      )}
      {!!toolLogs?.length && (
        <div className="mt-2">
          <button onClick={()=>setOpen(v=>!v)} className="text-xs underline">{open? 'Hide':'Show'} tool activity</button>
          {open && (
            <div className="mt-2 text-xs bg-gray-50 border rounded p-2 text-black">
              {toolLogs.map((t:any)=> (
                <div key={t.id} className="mb-2">
                  <div className="font-medium">{t.name}</div>
                  <div className="opacity-70">args: {JSON.stringify(t.args)}</div>
                  {t.result !== undefined && (<div>result: {JSON.stringify(t.result)}</div>)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


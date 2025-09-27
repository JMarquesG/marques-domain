'use client'
import { useEffect, useMemo, useState } from 'react'
import { useChatStore } from '../store/useChatStore'

type Doc = { id: string; filename: string; pages: number; url: string | null }

export default function PdfViewer({ sessionId }:{ sessionId: string }){
  const [docs, setDocs] = useState<Doc[]>([])
  const [activeDoc, setActiveDoc] = useState<Doc | null>(null)
  const [page, setPage] = useState<number>(1)
  const { pdfPage } = useChatStore()

  useEffect(()=>{
    ;(async()=>{
      const res = await fetch(`/api/sessions/${sessionId}/docs`)
      const data = await res.json()
      setDocs(data.docs || [])
      setActiveDoc((data.docs || [])[0] || null)
      setPage(1)
    })()
  }, [sessionId])

  function goToPage(p: number){
    if(!activeDoc) return
    const clamped = Math.min(Math.max(1, p), activeDoc.pages)
    setPage(clamped)
  }

  useEffect(()=>{
    if(typeof pdfPage === 'number'){
      goToPage(pdfPage)
    }
  }, [pdfPage])

  return (
    <div className="h-full flex flex-col border rounded-lg overflow-hidden">
      <div className="p-2 border-b flex items-center gap-2 bg-white">
        <select className="border rounded px-2 py-1"
          value={activeDoc?.id || ''}
          onChange={(e)=>{
            const d = docs.find(x=>x.id===e.target.value) || null
            setActiveDoc(d)
            setPage(1)
          }}
        >
          {docs.map(d=> (
            <option key={d.id} value={d.id}>{d.filename}</option>
          ))}
        </select>
        {activeDoc && (
          <div className="ml-auto flex items-center gap-2 text-sm">
            <button className="border rounded px-2 py-1" onClick={()=>goToPage(page-1)}>&lt;</button>
            <span>Page {page} / {activeDoc.pages}</span>
            <button className="border rounded px-2 py-1" onClick={()=>goToPage(page+1)}>&gt;</button>
          </div>
        )}
      </div>
      <div className="flex-1 bg-gray-50">
        {activeDoc?.url ? (
          <iframe key={`${activeDoc.id}-${page}`} src={`${activeDoc.url}#page=${page}`} className="w-full h-full bg-white" />
        ) : (
          <div className="p-4 text-sm text-gray-600">No document loaded</div>
        )}
      </div>
    </div>
  )
}



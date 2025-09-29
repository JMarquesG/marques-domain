'use client'
import { useState } from 'react'
import { useChatStore } from '../store/useChatStore'

export default function PdfDropzone({ sessionId }:{sessionId:string}){
  const [uploading, setUploading] = useState(false)
  const { setPdfUrl } = useChatStore()
  return (
    <div className={`border-dashed border rounded-xl p-4 ${uploading ? 'cursor-progress' : ''}`}>
      <div className="text-sm mb-2">Upload a PDF to ground the chat</div>
      <input
        type="file" accept="application/pdf"
        onChange={async (e)=>{
          const f = e.target.files?.[0]; if(!f) return;
          setUploading(true)
          const fd = new FormData(); fd.append('file', f)
          const res = await fetch(`/api/sessions/${sessionId}/upload`, { method:'POST', body: fd })
          setUploading(false)
          if(!res.ok){ alert('Upload failed'); return; }
          const json = await res.json()
          if(json.viewerUrl){ setPdfUrl(json.viewerUrl) }
        }}
      />
      {uploading && <p>Uploading & indexing…</p>}
    </div>
  )
}


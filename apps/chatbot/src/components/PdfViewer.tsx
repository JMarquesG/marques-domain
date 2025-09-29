'use client'
import { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'

export default function PdfViewer({ sessionId }:{ sessionId: string }){
  const { pdfUrl, pdfPage } = useChatStore()
  const iframeRef = useRef<HTMLIFrameElement|null>(null)

  useEffect(()=>{
    if(iframeRef.current && pdfUrl){
      iframeRef.current.src = pdfUrl
    }
  }, [pdfUrl])

  useEffect(()=>{
    if(iframeRef.current && pdfUrl && pdfPage){
      const url = new URL(pdfUrl)
      url.hash = `page=${pdfPage}`
      iframeRef.current.src = url.toString()
    }
  }, [pdfPage, pdfUrl])

  if(!pdfUrl){
    return (
      <div className="h-full border rounded-xl flex items-center justify-center text-sm opacity-70">
        Upload a PDF to preview it here
      </div>
    )
  }

  return (
    <div className="h-full border rounded-xl overflow-hidden flex">
      <iframe ref={iframeRef} className="w-full h-full bg-white block" />
    </div>
  )
}



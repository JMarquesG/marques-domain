import React from 'react'
import '../src/index.css'
import type { Metadata, Viewport } from 'next'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export const metadata: Metadata = {
  title: 'Marques - Home',
  description: 'Marques - Home',
  authors: [{ name: 'Marques' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
} 
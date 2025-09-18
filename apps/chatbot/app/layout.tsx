import type { ReactNode } from 'react'
import '@packages/ui/index.css'

export default function RootLayout({ children }:{ children: ReactNode }){
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}


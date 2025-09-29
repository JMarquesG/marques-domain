import type { ReactNode } from 'react'
import '@packages/ui/index.css'

export const metadata = {
  title: "Jordi Marqués – Software Engineer",
  description: "Professional CV and portfolio of Jordi Marqués.",
  icons: {
    icon: "/logo.png",
  },
};


export default function RootLayout({ children }:{ children: ReactNode }){
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        {children}
      </body>
    </html>
  )
}


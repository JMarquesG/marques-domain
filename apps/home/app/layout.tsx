import "../src/index.css";
import React from "react";
import { LanguageProvider } from "@/context/LanguageContext";

export const metadata = {
  title: "Jordi Marqués – Software Engineer",
  description: "Professional CV and portfolio of Jordi Marqués.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}



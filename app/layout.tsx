import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Script from "next/script"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Eric Zaleta - Unity Developer & Game Designer",
  description:
    "Over 6 years of Unity development experience creating immersive VR/AR applications, interactive games, and enterprise solutions. Led 15+ game development projects with award-winning results.",
  keywords:
    "Unity Developer, Game Designer, VR, AR, XR Designer, Interactive Applications, Game Development, Eric Zaleta",
  authors: [{ name: "Eric Zaleta" }],
  viewport: "width=device-width, initial-scale=1",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta name="theme-color" content="#0e0e10" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster />
        <Script src="/translator.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}

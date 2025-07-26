import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Eric Z. - Unity Developer & Game Designer",
  description:
    "Creative portfolio showcasing Unity development and game design expertise with a focus on immersive experiences and innovative gameplay systems.",
  keywords: "Unity Developer, Game Designer, VR, AR, Game Development, Interactive Design",
  authors: [{ name: "Eric Z." }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

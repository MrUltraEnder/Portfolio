"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Code, Gamepad2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

export function RoleSwitcher() {
  const pathname = usePathname()

  if (pathname === "/") return null

  const isUnityDev = pathname === "/unity-developer"
  const isGameDesigner = pathname === "/game-designer"

  return (
    <div className="fixed bottom-6 left-6 z-30">
      <div className="bg-[#232329]/90 backdrop-blur-sm rounded-xl border border-[#232329] p-2 flex items-center space-x-2">
        <span className="text-xs text-[#F4F4F5]/60 px-2">Switch Role:</span>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className={`${
            isUnityDev
              ? "bg-[#7EE787]/20 text-[#7EE787] border border-[#7EE787]/30"
              : "text-[#F4F4F5]/60 hover:text-[#7EE787] hover:bg-[#7EE787]/10"
          }`}
          title="Unity Developer"
        >
          <Link href="/unity-developer">
            <Code className="w-4 h-4" />
          </Link>
        </Button>

        <Button
          asChild
          variant="ghost"
          size="sm"
          className={`${
            isGameDesigner
              ? "bg-[#A970FF]/20 text-[#A970FF] border border-[#A970FF]/30"
              : "text-[#F4F4F5]/60 hover:text-[#A970FF] hover:bg-[#A970FF]/10"
          }`}
          title="Game Designer"
        >
          <Link href="/game-designer">
            <Gamepad2 className="w-4 h-4" />
          </Link>
        </Button>

        <div className="w-px h-6 bg-[#232329] mx-1" />

        <Button
          asChild
          variant="ghost"
          size="sm"
          className="text-[#F4F4F5]/60 hover:text-[#7EE787] hover:bg-[#7EE787]/10"
          title="Back to Home"
        >
          <Link href="/">
            <RotateCcw className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  )
}

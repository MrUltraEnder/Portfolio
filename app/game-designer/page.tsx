"use client"

import { Button } from "@/components/ui/button"
import { Navigation } from "@/components/navigation"

export default function GameDesignerPage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#F4F4F5]">
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#A970FF] to-[#7EE787] bg-clip-text text-transparent">
            Game Designer Portfolio
          </h1>
          <p className="text-lg mb-8 text-[#F4F4F5]/70">
            This section is temporarily under construction. Please check back soon!
          </p>
          <Button 
            onClick={() => window.history.back()} 
            variant="outline"
            className="bg-[#232329]/80 border-[#7EE787]/20 text-[#F4F4F5] hover:bg-[#7EE787]/10"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}

import Link from "next/link"
import { ArrowRight, Code, Gamepad2 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#F4F4F5] overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7EE787]/10 via-transparent to-[#A970FF]/10"></div>
        <div className="floating-particles"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main title */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent">
              Eric Z.
            </h1>
            <p className="text-xl md:text-2xl text-[#F4F4F5]/80 font-light">Choose your adventure</p>
          </div>

          {/* Role selection cards */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            <Link href="/unity-developer" className="group">
              <div className="role-card bg-[#232329]/50 backdrop-blur-sm border border-[#232329] rounded-2xl p-8 transition-all duration-500 hover:border-[#7EE787]/50 hover:bg-[#7EE787]/5 hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-[#7EE787]/20 rounded-xl mb-6 mx-auto group-hover:bg-[#7EE787]/30 transition-colors">
                  <Code className="w-8 h-8 text-[#7EE787]" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-[#7EE787]">Unity Developer</h2>
                <p className="text-[#F4F4F5]/70 mb-6">Engineering immersive gameplay, systems & tools in Unity</p>
                <div className="flex items-center justify-center text-[#7EE787] group-hover:translate-x-2 transition-transform">
                  <span className="mr-2">Explore Code</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>

            <Link href="/game-designer" className="group">
              <div className="role-card bg-[#232329]/50 backdrop-blur-sm border border-[#232329] rounded-2xl p-8 transition-all duration-500 hover:border-[#A970FF]/50 hover:bg-[#A970FF]/5 hover:scale-105">
                <div className="flex items-center justify-center w-16 h-16 bg-[#A970FF]/20 rounded-xl mb-6 mx-auto group-hover:bg-[#A970FF]/30 transition-colors">
                  <Gamepad2 className="w-8 h-8 text-[#A970FF]" />
                </div>
                <h2 className="text-2xl font-bold mb-4 text-[#A970FF]">Game Designer</h2>
                <p className="text-[#F4F4F5]/70 mb-6">
                  Designing meaningful interactions, systems, and player experiences
                </p>
                <div className="flex items-center justify-center text-[#A970FF] group-hover:translate-x-2 transition-transform">
                  <span className="mr-2">Explore Design</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          </div>

          {/* Quick links */}
          <div className="mt-16 flex flex-wrap justify-center gap-4 text-sm text-[#F4F4F5]/60">
            <a href="#" className="hover:text-[#7EE787] transition-colors">
              LinkedIn
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#7EE787] transition-colors">
              GitHub
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#7EE787] transition-colors">
              Itch.io
            </a>
            <span>•</span>
            <a href="#" className="hover:text-[#7EE787] transition-colors">
              Email
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

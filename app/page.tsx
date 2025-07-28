import Link from "next/link"
import { ArrowRight, Code, Gamepad2, Linkedin, Mail, Phone, Star, Award, Users, Zap } from "lucide-react"
import { Navigation } from "@/components/navigation"
import { ProgressIndicator } from "@/components/progress-indicator"
import { LanguageToggle } from "@/components/language-toggle"

export default function HomePage() {
  const stats = [
    { icon: Award, label: "Years Experience", value: "6+" },
    { icon: Users, label: "Team Members Led", value: "20+" },
    { icon: Star, label: "Projects Completed", value: "15+" },
    { icon: Zap, label: "Apps Developed", value: "20+" },
  ]

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#F4F4F5]">
      <ProgressIndicator />
      <Navigation />
      <LanguageToggle />

      {/* Background effects */}
      <div className="fixed inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-[#7EE787]/10 via-transparent to-[#A970FF]/10"></div>
        <div className="floating-particles"></div>
      </div>

      <main id="main-content" className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className="text-center max-w-5xl mx-auto">
            {/* Main title */}
            <div className="mb-12 animate-fade-in">
              <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent">
                Eric Zaleta
              </h1>
              <p className="text-xl md:text-2xl text-[#F4F4F5]/80 font-light mb-8">Unity Developer & Game Designer</p>
              <p className="text-lg text-[#F4F4F5]/60 max-w-2xl mx-auto leading-relaxed">
                Creating immersive experiences and meaningful interactions through code and design. Choose your path to
                explore my work.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 animate-slide-up">
              {stats.map((stat, index) => {
                const Icon = stat.icon
                return (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#232329]/50 rounded-xl mb-3">
                      <Icon className="w-6 h-6 text-[#7EE787]" />
                    </div>
                    <div className="text-2xl font-bold text-[#F4F4F5] mb-1">{stat.value}</div>
                    <div className="text-sm text-[#F4F4F5]/60">{stat.label}</div>
                  </div>
                )
              })}
            </div>

            {/* Role selection cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <Link href="/unity-developer" className="group">
                <div className="role-card bg-[#232329]/50 backdrop-blur-sm border border-[#232329] rounded-2xl p-8 h-80 flex flex-col justify-between transition-all duration-500 hover:border-[#7EE787]/50 hover:bg-[#7EE787]/5 hover:scale-105 focus-within:ring-2 focus-within:ring-[#7EE787] focus-within:ring-offset-2 focus-within:ring-offset-[#0e0e10]">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="flex items-center justify-center w-16 h-16 bg-[#7EE787]/20 rounded-xl mb-6 group-hover:bg-[#7EE787]/30 transition-colors">
                      <Code className="w-8 h-8 text-[#7EE787]" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-2xl font-bold mb-4 text-[#7EE787] text-center">Unity Developer</h2>
                      <p className="text-[#F4F4F5]/70 mb-6 leading-relaxed">
                        Engineering immersive gameplay, VR/AR experiences, and interactive applications with
                        cutting-edge technology
                      </p>
                    </div>
                    <div className="flex items-center justify-center text-[#7EE787] group-hover:translate-x-2 transition-transform">
                      <span className="mr-2 font-medium">Explore Code</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>

              <Link href="/game-designer" className="group">
                <div className="role-card bg-[#232329]/50 backdrop-blur-sm border border-[#232329] rounded-2xl p-8 h-80 flex flex-col justify-between transition-all duration-500 hover:border-[#A970FF]/50 hover:bg-[#A970FF]/5 hover:scale-105 focus-within:ring-2 focus-within:ring-[#A970FF] focus-within:ring-offset-2 focus-within:ring-offset-[#0e0e10]">
                  <div className="flex flex-col items-center text-center h-full">
                    <div className="flex items-center justify-center w-16 h-16 bg-[#A970FF]/20 rounded-xl mb-6 group-hover:bg-[#A970FF]/30 transition-colors">
                      <Gamepad2 className="w-8 h-8 text-[#A970FF]" />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-2xl font-bold mb-4 text-[#A970FF] text-center">Game Designer</h2>
                      <p className="text-[#F4F4F5]/70 mb-6 leading-relaxed">
                        Designing meaningful interactions, player experiences, and systems that create lasting
                        engagement
                      </p>
                    </div>
                    <div className="flex items-center justify-center text-[#A970FF] group-hover:translate-x-2 transition-transform">
                      <span className="mr-2 font-medium">Explore Design</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Quick contact */}
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <a
                href="https://linkedin.com/in/ericzaleta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#F4F4F5]/60 hover:text-[#7EE787] transition-colors p-3 rounded-lg hover:bg-[#7EE787]/10 focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:ericzaleta@gmail.com"
                className="inline-flex items-center text-[#F4F4F5]/60 hover:text-[#7EE787] transition-colors px-4 py-3 rounded-lg hover:bg-[#7EE787]/10 focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
              >
                <Mail className="w-5 h-5 mr-2" />
                ericzaleta@gmail.com
              </a>
              <a
                href="https://grimoire-games.itch.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#F4F4F5]/60 hover:text-[#7EE787] transition-colors px-4 py-3 rounded-lg hover:bg-[#7EE787]/10 focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
              >
                Itch.io Portfolio
              </a>
              <a
                href="tel:+524811124012"
                className="inline-flex items-center text-[#F4F4F5]/60 hover:text-[#7EE787] transition-colors p-3 rounded-lg hover:bg-[#7EE787]/10 focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                aria-label="Call +52 481 112 4012"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-[#232329] mt-20">
        <div className="max-w-4xl mx-auto text-center text-[#F4F4F5]/60">
          <p>Eric Zaleta © {new Date().getFullYear()} • Crafted with passion and precision</p>
        </div>
      </footer>
    </div>
  )
}

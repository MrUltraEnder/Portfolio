"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight, Code, Gamepad2, Mail, Phone, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { LanguageToggle } from "@/components/language-toggle"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-[#0e0e10] text-[#F4F4F5]">
      <Navigation />
      <LanguageToggle />

      <main id="main-content" className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#7EE787]/5 via-transparent to-[#A970FF]/5" />
          <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32">
            <div className="text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent">
                    Eric Zaleta
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-[#F4F4F5]/80 max-w-3xl mx-auto">
                  Unity Developer & Game Designer with 6+ years of experience creating immersive VR/AR applications and
                  interactive games
                </p>
              </div>

              {/* Role Selection Cards */}
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
                <Card className="group bg-[#1a1a1f] border-[#232329] hover:border-[#7EE787]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#7EE787]/10">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center space-y-6">
                      <div className="p-4 rounded-full bg-[#7EE787]/10 group-hover:bg-[#7EE787]/20 transition-colors">
                        <Code className="w-8 h-8 text-[#7EE787]" />
                      </div>
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-[#F4F4F5]">Unity Developer</h2>
                        <p className="text-[#F4F4F5]/70">
                          Explore my technical expertise in Unity development, VR/AR applications, and enterprise
                          solutions
                        </p>
                      </div>
                      <Button
                        asChild
                        className="w-full bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90 group-hover:scale-105 transition-all duration-200"
                      >
                        <Link href="/unity-developer">
                          View Developer Portfolio
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group bg-[#1a1a1f] border-[#232329] hover:border-[#A970FF]/50 transition-all duration-300 hover:shadow-lg hover:shadow-[#A970FF]/10">
                  <CardContent className="p-8">
                    <div className="flex flex-col items-center text-center space-y-6">
                      <div className="p-4 rounded-full bg-[#A970FF]/10 group-hover:bg-[#A970FF]/20 transition-colors">
                        <Gamepad2 className="w-8 h-8 text-[#A970FF]" />
                      </div>
                      <div className="space-y-3">
                        <h2 className="text-2xl font-bold text-[#F4F4F5]">Game Designer</h2>
                        <p className="text-[#F4F4F5]/70">
                          Discover my creative approach to game design, user experience, and interactive storytelling
                        </p>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-[#A970FF]/30 text-[#A970FF] hover:bg-[#A970FF]/10 group-hover:scale-105 transition-all duration-200 bg-transparent"
                      >
                        <Link href="/game-designer">
                          View Design Portfolio
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Contact */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#7EE787]/30 text-[#7EE787] hover:bg-[#7EE787]/10 bg-transparent"
                  asChild
                >
                  <a href="mailto:ericzaleta@gmail.com">
                    <Mail className="w-5 h-5 mr-2" />
                    ericzaleta@gmail.com
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#232329] text-[#F4F4F5] hover:bg-[#232329] bg-transparent"
                  asChild
                >
                  <a href="https://linkedin.com/in/ericzaleta" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5 mr-2" />
                    LinkedIn
                  </a>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#232329] text-[#F4F4F5] hover:bg-[#232329] bg-transparent"
                  asChild
                >
                  <a href="tel:+1234567890">
                    <Phone className="w-5 h-5 mr-2" />
                    Contact
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-16 bg-[#1a1a1f]/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-bold text-[#7EE787]">6+</div>
                <div className="text-sm text-[#F4F4F5]/70">Years Experience</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-[#7EE787]">15+</div>
                <div className="text-sm text-[#F4F4F5]/70">Projects Completed</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-[#7EE787]">3</div>
                <div className="text-sm text-[#F4F4F5]/70">Award-Winning Games</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-bold text-[#7EE787]">100K+</div>
                <div className="text-sm text-[#F4F4F5]/70">Users Reached</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

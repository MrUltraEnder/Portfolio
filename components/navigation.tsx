"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Code, Gamepad2, User, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LanguageToggle } from "@/components/language-toggle"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [darkMode, setDarkMode] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: User },
    { href: "/unity-developer", label: "Unity Developer", icon: Code },
    { href: "/game-designer", label: "Game Designer", icon: Gamepad2 },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <>
      {/* Skip to main content - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-[#7EE787] text-[#0e0e10] px-4 py-2 rounded-md z-50 font-medium"
      >
        Skip to main content
      </a>

      {/* Desktop Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? "bg-[#0e0e10]/95 backdrop-blur-md border-b border-[#232329]" : "bg-transparent"
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 items-center w-full">
            {/* Logo */}
            <div className="flex justify-start">
              <Link
                href="/"
                className="text-xl font-bold bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10] rounded-md px-3 py-1.5 h-8 flex items-center"
                aria-label="Eric Zaleta - Home"
              >
                Eric Zaleta
              </Link>
            </div>

            {/* Desktop Menu - Centered */}
            <div className="hidden md:flex items-center justify-center space-x-2 lg:space-x-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 md:px-4 lg:px-6 xl:px-8 py-1.5 h-8 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10] whitespace-nowrap ${
                      isActive(item.href)
                        ? "bg-[#7EE787]/20 text-[#7EE787] border border-[#7EE787]/30"
                        : "text-[#F4F4F5]/80 hover:text-[#7EE787] hover:bg-[#7EE787]/10"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <Icon className="w-4 h-4 mr-1.5" />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center justify-end space-x-1 lg:space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="border-[#7EE787]/30 text-[#7EE787] hover:bg-[#7EE787]/10 bg-transparent px-2 md:px-3 lg:px-4 py-1.5 h-8 text-xs md:text-sm"
                asChild
              >
                <a href="mailto:ericzaleta@gmail.com">
                  <Mail className="w-4 h-4 mr-1 md:mr-1.5" />
                  <span className="hidden lg:inline">Contact</span>
                  <span className="lg:hidden">Contact</span>
                </a>
              </Button>
              <Button 
                size="sm" 
                className="bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90 px-2 md:px-3 lg:px-4 py-1.5 h-8 text-xs md:text-sm"
                asChild
              >
                <a
                  href="/Portfolio/Eric-Zaleta-Unity-Developer-Resume.pdf"
                  download="Eric-Zaleta-Unity-Developer-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-1 md:mr-1.5" />
                  <span className="hidden lg:inline">Resume</span>
                  <span className="lg:hidden">CV</span>
                </a>
              </Button>
              <LanguageToggle className="static h-8" />
            </div>

            {/* Mobile Menu Button - Only visible on mobile */}
            <div className="col-span-2 md:hidden flex justify-end">
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#F4F4F5] hover:bg-[#232329]"
                    aria-label="Open navigation menu"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-[#0e0e10] border-[#232329] w-80">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-lg font-bold bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent">
                      Navigation
                    </span>
                  </div>

                  {/* Mobile Menu Items */}
                  <div className="flex flex-col space-y-2 mb-8">
                    {navItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-4 py-1 rounded-lg text-base font-medium transition-all duration-200 ${
                            isActive(item.href)
                              ? "bg-[#7EE787]/20 text-[#7EE787] border border-[#7EE787]/30"
                              : "text-[#F4F4F5]/80 hover:text-[#7EE787] hover:bg-[#7EE787]/10"
                          }`}
                        >
                          <Icon className="w-5 h-5 mr-3" />
                          {item.label}
                        </Link>
                      )
                    })}
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="mt-auto space-y-3">
                    <Button
                      variant="outline"
                      className="w-full border-[#7EE787]/30 text-[#7EE787] hover:bg-[#7EE787]/10 bg-transparent"
                      asChild
                    >
                      <a href="mailto:ericzaleta@gmail.com">
                        <Mail className="w-4 h-4 mr-2" />
                        Contact Me
                      </a>
                    </Button>
                    <Button className="w-full bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90" asChild>
                      <a
                        href="/Portfolio/Eric-Zaleta-Unity-Developer-Resume.pdf"
                        download="Eric-Zaleta-Unity-Developer-Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Resume
                      </a>
                    </Button>
                    <div className="w-full">
                      <LanguageToggle className="static w-full" />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          </div>
        </div>
      </nav>
    </>
  )
}

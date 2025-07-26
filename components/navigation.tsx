"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Code, Gamepad2, User, Mail, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

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
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10] rounded-md px-2 py-1"
              aria-label="Eric Zaleta - Home"
            >
              Eric Zaleta
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10] ${
                      isActive(item.href)
                        ? "bg-[#7EE787]/20 text-[#7EE787] border border-[#7EE787]/30"
                        : "text-[#F4F4F5]/80 hover:text-[#7EE787] hover:bg-[#7EE787]/10"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                )
              })}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                className="border-[#7EE787]/30 text-[#7EE787] hover:bg-[#7EE787]/10 bg-transparent"
                asChild
              >
                <a href="mailto:ericzaleta@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </Button>
              <Button size="sm" className="bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90">
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
              <button
                type="button"
                className="language-toggle px-3 py-2 rounded-md text-sm font-medium text-[#F4F4F5] hover:bg-[#232329] focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                aria-label="Toggle language"
              >ES</button>
            </div>

            {/* Mobile Menu Button */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden text-[#F4F4F5] hover:bg-[#232329]"
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
                          className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${
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
                    <Button className="w-full bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90">
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume
                    </Button>
                    <button
                      type="button"
                      className="language-toggle w-full px-4 py-2 rounded-md text-sm font-medium text-[#F4F4F5] hover:bg-[#232329] focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10]"
                      aria-label="Toggle language"
                    >ES</button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}

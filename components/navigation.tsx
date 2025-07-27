"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Code, Gamepad2, User, Mail, Download, Globe, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [currentLang, setCurrentLang] = useState<"en" | "es">("en")
  const [isTranslating, setIsTranslating] = useState(false)
  const pathname = usePathname()
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    // Check if page was already translated
    const isTranslated = document.documentElement.getAttribute("data-translated")
    if (isTranslated === "true") {
      setCurrentLang("es")
    }
  }, [])

  const navItems = [
    { href: "/", label: "Home", icon: User },
    { href: "/unity-developer", label: "Unity Developer", icon: Code },
    { href: "/game-designer", label: "Game Designer", icon: Gamepad2 },
  ]

  const isActive = (href: string) => pathname === href

  const translatePage = async () => {
    setIsTranslating(true)

    try {
      if (currentLang === "en") {
        // Translate to Spanish
        await translateAllContent("en", "es")
        setCurrentLang("es")
        document.documentElement.setAttribute("data-translated", "true")
        toast({
          title: "Traducción completada",
          description: "La página ha sido traducida al español.",
        })
      } else {
        // Reload page to reset to English
        window.location.reload()
      }
    } catch (error: any) {
      console.error("Translation error:", error)

      // Show specific error message based on the error type
      if (error.message.includes("API key not configured")) {
        toast({
          title: "API Key requerida",
          description: "Configura tu Google Cloud Translation API key en .env.local para usar la traducción.",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error de traducción",
          description: error.message || "No se pudo traducir la página. Verifica la configuración de la API.",
          variant: "destructive",
        })
      }
    } finally {
      setIsTranslating(false)
    }
  }

  const translateAllContent = async (source: string, target: string) => {
    // Get all text nodes from the page
    const textNodes = getTextNodes(document.body)
    const textsToTranslate: string[] = []

    // Filter out empty or very short texts and collect unique texts
    textNodes.forEach((node) => {
      const text = node.textContent?.trim()
      if (text && text.length > 1 && !isNumericOrSymbol(text)) {
        textsToTranslate.push(text)
      }
    })

    // Remove duplicates
    const uniqueTexts = [...new Set(textsToTranslate)]

    if (uniqueTexts.length === 0) return

    try {
      // For GitHub Pages (static export), call Google Translate API directly
      // The API key is embedded during build time as a public environment variable
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY

      if (!API_KEY) {
        throw new Error("Translation API key not configured for production build")
      }

      // Translate texts in batches
      const batchSize = 20
      const translations: { [key: string]: string } = {}

      for (let i = 0; i < uniqueTexts.length; i += batchSize) {
        const batch = uniqueTexts.slice(i, i + batchSize)

        // Call Google Translate API directly
        const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            q: batch,
            source,
            target,
            format: "text",
          }),
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error("Google Translate API Error:", {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
          })
          throw new Error(`Translation API error: ${response.status}`)
        }

        const data = await response.json()

        if (data.data && data.data.translations) {
          data.data.translations.forEach((translation: any, index: number) => {
            translations[batch[index]] = translation.translatedText
          })
        }
      }

      // Apply translations to the page
      textNodes.forEach((node) => {
        const originalText = node.textContent?.trim()
        if (originalText && translations[originalText]) {
          node.textContent = translations[originalText]
        }
      })
    } catch (error) {
      console.error("Translation error:", error)
      throw error
    }
  }

  const getTextNodes = (element: Element): Text[] => {
    const textNodes: Text[] = []
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) => {
        // Skip script and style elements
        const parent = node.parentElement
        if (parent && ["SCRIPT", "STYLE", "NOSCRIPT"].includes(parent.tagName)) {
          return NodeFilter.FILTER_REJECT
        }
        return NodeFilter.FILTER_ACCEPT
      },
    })

    let node
    while ((node = walker.nextNode())) {
      textNodes.push(node as Text)
    }

    return textNodes
  }

  const isNumericOrSymbol = (text: string): boolean => {
    // Skip numbers, single characters, and common symbols
    return (
      /^[\d\s+\-.%$€£¥$$$$[\]{}|\\/<>@#&*]+$/.test(text) ||
      text.length === 1 ||
      /^[\w\-.]+@[\w\-.]+\.\w+$/.test(text) || // email
      /^https?:\/\//.test(text) || // URLs
      /^[A-Z]{2,3}$/.test(text)
    ) // Language codes like EN, ES
  }

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
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link
              href="/"
              className="text-xl font-bold bg-gradient-to-r from-[#7EE787] to-[#A970FF] bg-clip-text text-transparent hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10] rounded-md px-2 py-1 flex-shrink-0"
              aria-label="Eric Zaleta - Home"
            >
              Eric Zaleta
            </Link>

            {/* Desktop Menu - Centered */}
            <div className="hidden lg:flex items-center space-x-1 flex-1 justify-center max-w-md mx-8">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10] whitespace-nowrap ${
                      isActive(item.href)
                        ? "bg-[#7EE787]/20 text-[#7EE787] border border-[#7EE787]/30"
                        : "text-[#F4F4F5]/80 hover:text-[#7EE787] hover:bg-[#7EE787]/10"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    <span className="hidden xl:inline">{item.label}</span>
                    <span className="xl:hidden">{item.label.split(" ")[0]}</span>
                  </Link>
                )
              })}
            </div>

            {/* Tablet Menu - Simplified */}
            <div className="hidden md:flex lg:hidden items-center space-x-1 flex-1 justify-center max-w-xs mx-4">
              {navItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center justify-center p-2 rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10] ${
                      isActive(item.href)
                        ? "bg-[#7EE787]/20 text-[#7EE787] border border-[#7EE787]/30"
                        : "text-[#F4F4F5]/80 hover:text-[#7EE787] hover:bg-[#7EE787]/10"
                    }`}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    title={item.label}
                  >
                    <Icon className="w-4 h-4" />
                  </Link>
                )
              })}
            </div>

            {/* Action Buttons - Right Side */}
            <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
              <Button
                variant="outline"
                size="sm"
                className="border-[#7EE787]/30 text-[#7EE787] hover:bg-[#7EE787]/10 bg-transparent whitespace-nowrap hidden lg:flex"
                asChild
              >
                <a href="mailto:ericzaleta@gmail.com">
                  <Mail className="w-4 h-4 mr-2" />
                  Contact
                </a>
              </Button>

              {/* Contact Icon Only for Tablet */}
              <Button
                variant="outline"
                size="sm"
                className="border-[#7EE787]/30 text-[#7EE787] hover:bg-[#7EE787]/10 bg-transparent lg:hidden"
                asChild
                title="Contact"
              >
                <a href="mailto:ericzaleta@gmail.com">
                  <Mail className="w-4 h-4" />
                </a>
              </Button>

              <Button
                size="sm"
                className="bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90 whitespace-nowrap hidden lg:flex"
                asChild
              >
                <a
                  href="/Eric-Zaleta-Unity-Developer-Resume.pdf"
                  download="Eric-Zaleta-Unity-Developer-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Resume
                </a>
              </Button>

              {/* Resume Icon Only for Tablet */}
              <Button
                size="sm"
                className="bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90 lg:hidden"
                asChild
                title="Download Resume"
              >
                <a
                  href="/Eric-Zaleta-Unity-Developer-Resume.pdf"
                  download="Eric-Zaleta-Unity-Developer-Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4" />
                </a>
              </Button>

              {/* Language Toggle - Desktop & Tablet */}
              <Button
                onClick={translatePage}
                disabled={isTranslating}
                variant="ghost"
                size="sm"
                className="text-[#F4F4F5] hover:bg-[#232329] hover:text-[#7EE787] focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10] transition-all duration-200 min-w-[50px] whitespace-nowrap border border-transparent hover:border-[#7EE787]/20"
                aria-label={`Switch to ${currentLang === "en" ? "Spanish" : "English"}`}
              >
                {isTranslating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Globe className="w-4 h-4 mr-1" />
                    <span className="font-medium text-xs">{currentLang.toUpperCase()}</span>
                  </>
                )}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 md:hidden">
              {/* Language Toggle - Mobile Header */}
              <Button
                onClick={translatePage}
                disabled={isTranslating}
                variant="ghost"
                size="sm"
                className="text-[#F4F4F5] hover:bg-[#232329] hover:text-[#7EE787] focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#0e0e10] transition-all duration-200 min-w-[44px] p-2"
                aria-label={`Switch to ${currentLang === "en" ? "Spanish" : "English"}`}
              >
                {isTranslating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
              </Button>

              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#F4F4F5] hover:bg-[#232329] p-2"
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
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-[#F4F4F5]/60">
                          {currentLang === "en" ? "English" : "Español"}
                        </span>
                        <div className="w-2 h-2 rounded-full bg-[#7EE787]"></div>
                      </div>
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
                      <Button className="w-full bg-[#7EE787] text-[#0e0e10] hover:bg-[#7EE787]/90" asChild>
                        <a
                          href="/Eric-Zaleta-Unity-Developer-Resume.pdf"
                          download="Eric-Zaleta-Unity-Developer-Resume.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download Resume
                        </a>
                      </Button>

                      {/* Language Toggle - Mobile Menu */}
                      <div className="pt-4 border-t border-[#232329]">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-[#F4F4F5]">Language</span>
                          <span className="text-xs text-[#F4F4F5]/60">
                            {currentLang === "en" ? "English" : "Español"}
                          </span>
                        </div>
                        <Button
                          onClick={translatePage}
                          disabled={isTranslating}
                          variant="outline"
                          className="w-full border-[#232329] text-[#F4F4F5] hover:bg-[#232329] hover:text-[#7EE787] hover:border-[#7EE787]/30 bg-transparent transition-all duration-200"
                          aria-label={`Switch to ${currentLang === "en" ? "Spanish" : "English"}`}
                        >
                          {isTranslating ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              <span className="font-medium">Translating...</span>
                            </>
                          ) : (
                            <>
                              <Globe className="w-4 h-4 mr-2" />
                              <span className="font-medium">
                                Switch to {currentLang === "en" ? "Español" : "English"}
                              </span>
                            </>
                          )}
                        </Button>
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

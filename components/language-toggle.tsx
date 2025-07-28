"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Globe, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LanguageToggleProps {
  className?: string
}

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const [currentLang, setCurrentLang] = useState<'en' | 'es'>('en')
  const [isTranslating, setIsTranslating] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if page was already translated
    const isTranslated = document.documentElement.getAttribute('data-translated')
    if (isTranslated === 'true') {
      setCurrentLang('es')
    }
  }, [])

  const translatePage = async () => {
    setIsTranslating(true)
    
    try {
      if (currentLang === 'en') {
        // Translate to Spanish
        await translateAllContent('en', 'es')
        setCurrentLang('es')
        document.documentElement.setAttribute('data-translated', 'true')
        toast({
          title: "Traducción completada",
          description: "La página ha sido traducida al español.",
        })
      } else {
        // Reload page to reset to English
        window.location.reload()
      }
    } catch (error: any) {
      console.error('Translation error:', error)
      
      // Show specific error message based on the error type
      if (error.message.includes('API key not configured')) {
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
    textNodes.forEach(node => {
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
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY;
      
      if (!API_KEY) {
        throw new Error('Translation API key not configured for production build')
      }
      
      // Translate texts in batches
      const batchSize = 20
      const translations: { [key: string]: string } = {}
      
      for (let i = 0; i < uniqueTexts.length; i += batchSize) {
        const batch = uniqueTexts.slice(i, i + batchSize)
        
        // Call Google Translate API directly
        const response = await fetch(
          `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              q: batch,
              source,
              target,
              format: 'text'
            }),
          }
        )

        if (!response.ok) {
          const errorText = await response.text()
          console.error('Google Translate API Error:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText
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
      textNodes.forEach(node => {
        const originalText = node.textContent?.trim()
        if (originalText && translations[originalText]) {
          node.textContent = translations[originalText]
        }
      })

    } catch (error) {
      console.error('Translation error:', error)
      throw error
    }
  }

  const getTextNodes = (element: Element): Text[] => {
    const textNodes: Text[] = []
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node) => {
          // Skip script and style elements
          const parent = node.parentElement
          if (parent && ['SCRIPT', 'STYLE', 'NOSCRIPT'].includes(parent.tagName)) {
            return NodeFilter.FILTER_REJECT
          }
          return NodeFilter.FILTER_ACCEPT
        }
      }
    )

    let node
    while (node = walker.nextNode()) {
      textNodes.push(node as Text)
    }

    return textNodes
  }

  const isNumericOrSymbol = (text: string): boolean => {
    // Skip numbers, single characters, and common symbols
    return /^[\d\s\+\-\.\%\$\€\£\¥\(\)\[\]\{\}\|\\\/<>@#&\*]+$/.test(text) || 
           text.length === 1 ||
           /^[\w\-\.]+@[\w\-\.]+\.\w+$/.test(text) || // email
           /^https?:\/\//.test(text) || // URLs
           /^[A-Z]{2,3}$/.test(text) // Language codes like EN, ES
  }

  return (
    <div className={`${className.includes('static') ? '' : 'fixed top-4 left-4 z-50'} ${className}`}>
      <Button
        onClick={translatePage}
        disabled={isTranslating}
        variant="outline"
        size="sm"
        className={`language-toggle bg-[#232329]/80 backdrop-blur-sm border-[#7EE787]/20 text-[#F4F4F5] hover:bg-[#7EE787]/10 hover:border-[#7EE787]/40 transition-all duration-200 ${
          className.includes('w-full') ? 'w-full' : ''
        } ${
          className.includes('h-8') ? 'h-8 px-2 md:px-3 lg:px-4 py-1.5 text-xs md:text-sm' : ''
        }`}
      >
        {isTranslating ? (
          <Loader2 className="w-4 h-4 mr-1 md:mr-1.5 animate-spin" />
        ) : (
          <Globe className="w-4 h-4 mr-1 md:mr-1.5" />
        )}
        {currentLang.toUpperCase()}
      </Button>
    </div>
  )
}

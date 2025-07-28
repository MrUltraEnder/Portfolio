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
  const [isInitializing, setIsInitializing] = useState(true)
  const { toast } = useToast()

  // Words that should never be translated
  const PROTECTED_WORDS = [
    'C#', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Unity', 'WebGL',
    'HTML', 'CSS', 'API', 'REST', 'JSON', 'Git', 'GitHub', 'VS Code',
    'Node.js', 'npm', 'pnpm', 'MongoDB', 'SQL', 'NoSQL', 'AWS', 'Docker',
    'Kubernetes', 'DevOps', 'CI/CD', 'OAuth', 'JWT', 'HTTPS', 'HTTP',
    'Eric Zaleta', 'Portfolio', 'VR', 'AR', 'XR', 'iOS', 'Android',
    'Windows', 'macOS', 'Linux', 'Steam', 'Itch.io', 'PlayStation', 'Xbox', 'C'
  ]

  useEffect(() => {
    initializeLanguage()
  }, [])

  const initializeLanguage = async () => {
    setIsInitializing(true)
    
    try {
      // Restore saved language state from localStorage
      const savedLang = localStorage.getItem('portfolio-language') as 'en' | 'es' | null
      const isTranslated = document.documentElement.getAttribute('data-translated')
      
      if (savedLang) {
        setCurrentLang(savedLang)
        
        // If we have a saved Spanish state but page is not translated, translate it
        if (savedLang === 'es' && isTranslated !== 'true') {
          await translateToSpanish()
        } else if (savedLang === 'en' && isTranslated === 'true') {
          // If saved as English but page is marked as translated, translate back to English
          await translateToEnglish()
        }
      } else {
        // First time load: detect current language and normalize to English
        const detectedLang = await detectPageLanguage()
        
        if (detectedLang === 'es') {
          // Page has Spanish content, translate to English as default
          await translateToEnglish()
          setCurrentLang('en')
          localStorage.setItem('portfolio-language', 'en')
          document.documentElement.removeAttribute('data-translated')
          
          toast({
            title: "Content normalized",
            description: "Page content has been standardized to English.",
          })
        } else {
          // Page is already in English
          setCurrentLang('en')
          localStorage.setItem('portfolio-language', 'en')
          document.documentElement.removeAttribute('data-translated')
        }
      }
    } catch (error) {
      console.warn('Language initialization failed:', error)
      // Default to English if initialization fails
      setCurrentLang('en')
      localStorage.setItem('portfolio-language', 'en')
    } finally {
      setIsInitializing(false)
    }
  }

  const detectPageLanguage = async (): Promise<'en' | 'es'> => {
    try {
      // Sample some text from the page to detect language
      const textNodes = getTextNodes(document.body)
      const sampleTexts: string[] = []
      
      // Get first few meaningful text samples
      textNodes.slice(0, 15).forEach(node => {
        const text = node.textContent?.trim()
        if (text && text.length > 10 && !isNumericOrSymbol(text) && !isProtectedWord(text)) {
          sampleTexts.push(text)
        }
      })

      if (sampleTexts.length === 0) return 'en'

      // Use Google Translate API to detect language
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY
      if (!API_KEY) return 'en'

      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2/detect?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: sampleTexts.slice(0, 5) // Check first 5 samples
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        if (data.data && data.data.detections) {
          // Check if majority of samples are detected as Spanish
          const spanishDetections = data.data.detections.filter((detection: any) => 
            detection[0]?.language === 'es' && detection[0]?.confidence > 0.7
          )
          
          if (spanishDetections.length > data.data.detections.length / 2) {
            return 'es'
          }
        }
      }
      return 'en'
    } catch (error) {
      console.warn('Language detection failed:', error)
      return 'en'
    }
  }

  const translateToEnglish = async () => {
    try {
      await translateAllContent('es', 'en')
    } catch (error) {
      console.error('Auto-translation to English failed:', error)
    }
  }

  const translateToSpanish = async () => {
    try {
      await translateAllContent('en', 'es')
      setCurrentLang('es')
      localStorage.setItem('portfolio-language', 'es')
      document.documentElement.setAttribute('data-translated', 'true')
    } catch (error) {
      console.error('Auto-translation to Spanish failed:', error)
    }
  }

  const isProtectedWord = (text: string): boolean => {
    return PROTECTED_WORDS.some(word => 
      text.toLowerCase().includes(word.toLowerCase()) ||
      word.toLowerCase().includes(text.toLowerCase())
    )
  }

  const translatePage = async () => {
    setIsTranslating(true)
    
    try {
      if (currentLang === 'en') {
        // Translate to Spanish
        await translateAllContent('en', 'es')
        setCurrentLang('es')
        localStorage.setItem('portfolio-language', 'es')
        document.documentElement.setAttribute('data-translated', 'true')
        toast({
          title: "Traducción completada",
          description: "La página ha sido traducida al español.",
        })
      } else {
        // Translate back to English or reload page
        const currentContent = getPageTextContent()
        
        // Check if content appears to be in Spanish
        if (await isContentInSpanish(currentContent)) {
          await translateAllContent('es', 'en')
          setCurrentLang('en')
          localStorage.setItem('portfolio-language', 'en')
          document.documentElement.removeAttribute('data-translated')
          toast({
            title: "Translation completed",
            description: "Page has been translated to English.",
          })
        } else {
          // Content is already in English, just reload to be safe
          localStorage.setItem('portfolio-language', 'en')
          window.location.reload()
        }
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

  const getPageTextContent = (): string[] => {
    const textNodes = getTextNodes(document.body)
    const texts: string[] = []
    
    textNodes.forEach(node => {
      const text = node.textContent?.trim()
      if (text && text.length > 10 && !isNumericOrSymbol(text)) {
        texts.push(text)
      }
    })
    
    return texts.slice(0, 5) // Sample first 5 meaningful texts
  }

  const isContentInSpanish = async (textSamples: string[]): Promise<boolean> => {
    try {
      const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_TRANSLATE_API_KEY
      if (!API_KEY || textSamples.length === 0) return false

      const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2/detect?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: textSamples.slice(0, 3)
          }),
        }
      )

      if (response.ok) {
        const data = await response.json()
        if (data.data && data.data.detections) {
          // Check if majority of samples are detected as Spanish
          const spanishDetections = data.data.detections.filter((detection: any) => 
            detection[0]?.language === 'es' && detection[0]?.confidence > 0.5
          )
          return spanishDetections.length > data.data.detections.length / 2
        }
      }
      return false
    } catch (error) {
      console.warn('Language detection failed:', error)
      return false
    }
  }

  const translateAllContent = async (source: string, target: string) => {
    // Get all text nodes from the page
    const textNodes = getTextNodes(document.body)
    const textsToTranslate: string[] = []
    const originalTextsMap = new Map<string, string>()
    
    // Filter out empty or very short texts and collect unique texts
    textNodes.forEach(node => {
      const text = node.textContent?.trim()
      if (text && text.length > 1 && !isNumericOrSymbol(text)) {
        // Protect specific words before translation
        const protectedText = protectWords(text)
        textsToTranslate.push(protectedText)
        originalTextsMap.set(protectedText, text) // Store mapping
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
      const batchSize = 15 // Reduced batch size for better handling
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
            const protectedOriginal = batch[index]
            let translatedText = translation.translatedText
            
            // Restore protected words
            translatedText = restoreProtectedWords(translatedText)
            
            translations[protectedOriginal] = translatedText
          })
        }
        
        // Small delay between batches to avoid rate limiting
        if (i + batchSize < uniqueTexts.length) {
          await new Promise(resolve => setTimeout(resolve, 100))
        }
      }

      // Apply translations to the page
      textNodes.forEach(node => {
        const originalText = node.textContent?.trim()
        if (originalText) {
          const protectedOriginal = protectWords(originalText)
          if (translations[protectedOriginal]) {
            node.textContent = translations[protectedOriginal]
          }
        }
      })

    } catch (error) {
      console.error('Translation error:', error)
      throw error
    }
  }

  const protectWords = (text: string): string => {
    let protectedText = text
    
    PROTECTED_WORDS.forEach((word, index) => {
      const placeholder = `__PROTECTED_${index}__`
      // Create case-insensitive regex that matches whole words
      const regex = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi')
      protectedText = protectedText.replace(regex, placeholder)
    })
    
    return protectedText
  }

  const restoreProtectedWords = (text: string): string => {
    let restoredText = text
    
    PROTECTED_WORDS.forEach((word, index) => {
      const placeholder = `__PROTECTED_${index}__`
      // Replace all instances of the placeholder with the original word
      const regex = new RegExp(placeholder, 'gi')
      restoredText = restoredText.replace(regex, word)
    })
    
    return restoredText
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
        disabled={isTranslating || isInitializing}
        variant="outline"
        size="sm"
        className={`language-toggle bg-[#232329]/80 backdrop-blur-sm border-[#7EE787]/20 text-[#F4F4F5] hover:bg-[#7EE787]/10 hover:border-[#7EE787]/40 transition-all duration-200 ${
          className.includes('w-full') ? 'w-full' : ''
        } ${
          className.includes('h-8') ? 'h-8 px-2 md:px-3 lg:px-4 py-1.5 text-xs md:text-sm' : ''
        }`}
      >
        {isTranslating || isInitializing ? (
          <Loader2 className="w-4 h-4 mr-1 md:mr-1.5 animate-spin" />
        ) : (
          <Globe className="w-4 h-4 mr-1 md:mr-1.5" />
        )}
        {isInitializing ? 'INIT' : currentLang.toUpperCase()}
      </Button>
    </div>
  )
}

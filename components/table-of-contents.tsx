"use client"

import { useState, useEffect } from "react"
import { List } from "lucide-react"

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  items: TOCItem[]
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0% -35% 0%" },
    )

    items.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [items])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-30 hidden xl:block">
      <div className="bg-[#232329]/80 backdrop-blur-sm rounded-xl border border-[#232329] p-4 max-w-xs">
        <div className="flex items-center mb-3">
          <List className="w-4 h-4 text-[#7EE787] mr-2" />
          <span className="text-sm font-medium text-[#F4F4F5]">Contents</span>
        </div>
        <nav aria-label="Table of contents">
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollToSection(item.id)}
                  className={`text-left text-xs w-full py-1 px-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-[#7EE787] focus:ring-offset-2 focus:ring-offset-[#232329] ${
                    activeId === item.id ? "text-[#7EE787] bg-[#7EE787]/10" : "text-[#F4F4F5]/60 hover:text-[#7EE787]"
                  } ${item.level === 2 ? "pl-4" : ""}`}
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

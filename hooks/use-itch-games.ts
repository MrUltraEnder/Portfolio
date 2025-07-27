"use client"

import { useState, useEffect } from 'react'

interface ItchGame {
  title: string
  short_text: string
  cover_url: string
  url: string
  published_at: string
}

interface Project {
  name: string
  description: string
  tech?: string[]
  focus?: string[]
  metrics: Record<string, string>
  video: string
  featured: boolean
  url?: string
  type: 'static' | 'itch'
}

export function useItchGames() {
  const [itchGames, setItchGames] = useState<ItchGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadItchGames() {
      try {
        // Try to load the JSON data first
        const jsonResponse = await fetch('/Portfolio/itch-games.json')
        if (jsonResponse.ok) {
          const data = await jsonResponse.json()
          setItchGames(data.games || [])
          return
        }

        // Fallback to parsing HTML if JSON is not available
        const response = await fetch('/Portfolio/itch-games.html')
        if (!response.ok) {
          throw new Error('Failed to load Itch.io games')
        }
        
        const html = await response.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(html, 'text/html')
        
        // Extract game data from the HTML
        const gameCards = doc.querySelectorAll('.game-card')
        const games: ItchGame[] = []
        
        gameCards.forEach(card => {
          const titleElement = card.querySelector('h3')
          const descElement = card.querySelector('p')
          const linkElement = card.querySelector('a[href*="itch.io"]')
          const imgElement = card.querySelector('img')
          
          if (titleElement && descElement && linkElement) {
            games.push({
              title: titleElement.textContent || '',
              short_text: descElement.textContent || '',
              cover_url: imgElement?.getAttribute('src') || '/placeholder.svg',
              url: linkElement.getAttribute('href') || '',
              published_at: new Date().toISOString() // Fallback date
            })
          }
        })
        
        setItchGames(games)
      } catch (err) {
        console.warn('Could not load Itch.io games:', err)
        setError('Failed to load games')
      } finally {
        setLoading(false)
      }
    }

    loadItchGames()
  }, [])

  // Convert Itch.io games to project format
  const convertToProjects = (role: 'unity' | 'designer'): Project[] => {
    return itchGames.slice(0, 3).map(game => ({
      name: game.title,
      description: game.short_text || 'Interactive game developed with Unity',
      tech: role === 'unity' 
        ? ['Unity', 'C#', 'WebGL', 'Game Development']
        : undefined,
      focus: role === 'designer'
        ? ['Game Design', 'Player Experience', 'Interactive Systems', 'Gameplay Mechanics']
        : undefined,
      metrics: {
        platform: 'Itch.io',
        type: 'Game',
        status: 'Published'
      },
      video: game.cover_url,
      featured: true,
      url: game.url,
      type: 'itch' as const
    }))
  }

  return {
    itchGames,
    loading,
    error,
    convertToProjects
  }
}

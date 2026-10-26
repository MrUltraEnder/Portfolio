"use client"

import { useState, useEffect } from 'react'
import { loadItchGames as loadCatalog } from '@/lib/load-itch-games.mjs'

interface ItchGame {
  title: string
  short_text: string
  cover_url: string
  url: string
  published_at: string
  platforms?: string[]
  primary_platform?: string
}

export interface Project {
  name: string
  description: string
  tech?: string[]
  focus?: string[]
  metrics: Record<string, string>
  video: string
  featured: boolean
  url?: string
  type: 'static' | 'itch'
  published_date?: string
  platform?: string
}

/**
 * Generates platform tag with emoji based on platforms array
 * @param platforms - Array of platform strings from Itch.io API
 * @returns Platform tag with emoji
 */
function getPlatformTag(platforms: string[]): string {
  if (!platforms || platforms.length === 0) {
    return '' // No tag if no platforms
  }
  
  // Priority order: WebGL > Windows > Android > others
  if (platforms.includes('WebGL')) {
    return '🕹️ WebGL'
  }
  
  if (platforms.includes('Windows')) {
    return '🖥️ Windows'
  }
  
  if (platforms.includes('Android')) {
    return '📱 Android'
  }
  
  // Fallback to first platform with appropriate emoji
  const platform = platforms[0]
  switch (platform) {
    case 'macOS':
      return '🍎 macOS'
    case 'Linux':
      return '🐧 Linux'
    default:
      return `🎮 ${platform}`
  }
}

export function useItchGames() {
  const [itchGames, setItchGames] = useState<ItchGame[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    async function loadItchGames() {
      try {
        setItchGames(await loadCatalog())
      } catch (err) {
        console.warn('Could not load Itch.io games:', err)
        setError('Failed to load games')
      } finally {
        setLoading(false)
      }
    }

    loadItchGames()
  }, [])

  // Filter games based on search term
  const filteredGames = itchGames.filter(game => 
    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (game.short_text && game.short_text.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  // Convert Itch.io games to project format
  const convertToProjects = (role: 'unity' | 'designer'): Project[] => {
    return filteredGames.map(game => {
      const publishedDate = new Date(game.published_at)
      const formattedDate = publishedDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      })
      
      return {
        name: game.title,
        description: game.short_text || 'Interactive game developed with Unity',
        tech: role === 'unity' 
          ? ['Unity', 'C#', getPlatformTag(game.platforms || []), 'Game Development'].filter(Boolean)
          : undefined,
        focus: role === 'designer'
          ? ['Game Design', 'Player Experience', 'Interactive Systems', 'Gameplay Mechanics']
          : undefined,
        metrics: {
          platform: 'Itch.io',
          published: formattedDate,
          status: 'Live',
          type: 'Indie Game'
        },
        video: game.cover_url,
        featured: true,
        url: game.url,
        type: 'itch' as const,
        published_date: game.published_at,
        platform: game.primary_platform || 'Unknown'
      }
    })
  }

  return {
    itchGames,
    loading,
    error,
    convertToProjects,
    searchTerm,
    setSearchTerm,
    filteredGames
  }
}

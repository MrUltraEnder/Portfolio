import { publicAsset } from './public-path.mjs'

/**
 * @returns {Promise<Array<{title: string, short_text: string, cover_url: string,
 * url: string, published_at: string, platforms?: string[], primary_platform?: string}>>}
 */
export async function loadItchGames() {
  try {
    const response = await fetch(publicAsset('/itch-games.json'))
    if (response.ok) {
      const data = await response.json()
      if (!data.error && Array.isArray(data.games)) {
        return data.games
      }
    }
  } catch {
    // A missing or malformed JSON catalog may still have a usable HTML backup.
  }

  const response = await fetch(publicAsset('/itch-games.html'))
  if (!response.ok) {
    throw new Error('Projects are temporarily unavailable')
  }

  const doc = new DOMParser().parseFromString(await response.text(), 'text/html')
  const games = []
  for (const card of doc.querySelectorAll('.game-card')) {
    const title = card.querySelector('h3')
    const description = card.querySelector('p')
    const link = card.querySelector('a[href*="itch.io"]')
    if (title && description && link) {
      games.push({
        title: title.textContent?.trim() || '',
        short_text: description.textContent?.trim() || '',
        cover_url: card.querySelector('img')?.getAttribute('src') || publicAsset('/placeholder.svg'),
        url: link.getAttribute('href') || '',
        published_at: new Date().toISOString(),
      })
    }
  }
  if (games.length === 0) {
    throw new Error('Projects are temporarily unavailable')
  }
  return games
}

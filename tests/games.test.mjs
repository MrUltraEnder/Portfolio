import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { createRequire } from 'node:module'
import test from 'node:test'

const require = createRequire(import.meta.url)
const { generateHTML } = require('../scripts/fetch-itch-games.js')

test('page routes and public assets resolve at the custom-domain root in every build mode', () => {
  const script = "import assert from 'node:assert/strict'; import config from './next.config.mjs'; import { publicAsset } from './lib/public-path.mjs'; assert.equal(config.basePath, ''); console.log(publicAsset('/itch-games.json')); console.log(publicAsset('/Eric-Zaleta-Unity-Developer-Resume.pdf'))"
  for (const [mode, expected] of [
    ['development', ['/itch-games.json', '/Eric-Zaleta-Unity-Developer-Resume.pdf']],
    ['production', ['/itch-games.json', '/Eric-Zaleta-Unity-Developer-Resume.pdf']],
  ]) {
    const result = spawnSync(process.execPath, ['--input-type=module', '-e', script], {
      cwd: new URL('../', import.meta.url),
      env: { ...process.env, NODE_ENV: mode },
      encoding: 'utf8',
    })
    assert.equal(result.status, 0, result.stderr)
    assert.deepEqual(result.stdout.trim().split(/\r?\n/), expected)
  }
})

test('the catalog loader keeps valid JSON game data', async (t) => {
  const { loadItchGames } = await import('../lib/load-itch-games.mjs')
  const game = { title: 'My game', short_text: 'A puzzle', url: 'https://example.itch.io/game' }
  t.mock.method(globalThis, 'fetch', async () => Response.json({ games: [game] }))
  assert.deepEqual(await loadItchGames(), [game])
})

test('an intentionally empty catalog remains a valid result', async (t) => {
  const { loadItchGames } = await import('../lib/load-itch-games.mjs')
  t.mock.method(globalThis, 'fetch', async () => Response.json({ games: [] }))
  assert.deepEqual(await loadItchGames(), [])
})

test('an error-marked JSON catalog falls back to the generated HTML', async (t) => {
  const { DOMParser } = await import('linkedom')
  const { loadItchGames } = await import('../lib/load-itch-games.mjs')
  const originalParser = globalThis.DOMParser
  globalThis.DOMParser = DOMParser
  t.after(() => { globalThis.DOMParser = originalParser })
  const html = generateHTML([{ title: 'Recovered game', short_text: 'Recovered description', url: 'https://example.itch.io/game' }])
  t.mock.method(globalThis, 'fetch', async (url) => String(url).endsWith('.json')
    ? Response.json({ games: [], error: 'Development mode - no API key' })
    : new Response(html))
  const games = await loadItchGames()
  assert.equal(games.length, 1)
  assert.equal(games[0].title, 'Recovered game')
  assert.equal(games[0].short_text, 'Recovered description')
  assert.equal(games[0].url, 'https://example.itch.io/game')
})

test('a missing JSON catalog still falls back to HTML', async (t) => {
  const { DOMParser } = await import('linkedom')
  const { loadItchGames } = await import('../lib/load-itch-games.mjs')
  const originalParser = globalThis.DOMParser
  globalThis.DOMParser = DOMParser
  t.after(() => { globalThis.DOMParser = originalParser })
  const html = generateHTML([{ title: 'HTML game', short_text: 'HTML description', url: 'https://example.itch.io/game' }])
  t.mock.method(globalThis, 'fetch', async (url) => String(url).endsWith('.json')
    ? new Response('', { status: 404 })
    : new Response(html))
  assert.equal((await loadItchGames())[0].title, 'HTML game')
})

test('an unavailable catalog is reported instead of pretending there are no games', async (t) => {
  const { DOMParser } = await import('linkedom')
  const { loadItchGames } = await import('../lib/load-itch-games.mjs')
  const originalParser = globalThis.DOMParser
  globalThis.DOMParser = DOMParser
  t.after(() => { globalThis.DOMParser = originalParser })
  t.mock.method(globalThis, 'fetch', async (url) => String(url).endsWith('.json')
    ? Response.json({ games: [], error: 'Development mode - no API key' })
    : new Response(generateHTML([])))
  await assert.rejects(loadItchGames(), /unavailable/i)
})

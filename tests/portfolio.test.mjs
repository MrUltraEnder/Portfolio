import assert from 'node:assert/strict'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import test from 'node:test'
import config from '../next.config.mjs'

const root = fileURLToPath(new URL('../', import.meta.url))
const fetchScript = path.join(root, 'scripts/fetch-itch-games.js')

test('the English-only static site has no translation entry points', () => {
  for (const file of ['app/api/translate/route.ts', 'components/language-toggle.tsx', 'public/translator.js']) {
    assert.equal(existsSync(path.join(root, file)), false, `${file} must be removed`)
  }
  assert.doesNotMatch(readFileSync(path.join(root, 'app/layout.tsx'), 'utf8'), /translator\.js/)
  assert.doesNotMatch(readFileSync(path.join(root, 'components/navigation.tsx'), 'utf8'), /LanguageToggle/)
})

test('static builds do not ignore TypeScript or lint failures', () => {
  assert.notEqual(config.typescript?.ignoreBuildErrors, true)
  assert.notEqual(config.eslint?.ignoreDuringBuilds, true)
  assert.equal(config.output, 'export')
})

test('fetch-games keeps a valid cached catalog when no API key is configured', (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'portfolio-cache-test-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  mkdirSync(path.join(directory, 'public'))
  const catalog = JSON.stringify({ games: [{ title: 'Existing game', url: 'https://example.itch.io/game' }], count: 1 })
  writeFileSync(path.join(directory, 'public/itch-games.json'), catalog)
  writeFileSync(path.join(directory, 'public/itch-games.html'), 'existing catalog')
  const result = spawnSync(process.execPath, [fetchScript], {
    cwd: directory,
    env: { ...process.env, ITCH_API_KEY: '', NODE_ENV: 'development' },
    encoding: 'utf8',
  })
  assert.equal(result.status, 0, result.stderr)
  assert.equal(readFileSync(path.join(directory, 'public/itch-games.json'), 'utf8'), catalog)
  assert.equal(readFileSync(path.join(directory, 'public/itch-games.html'), 'utf8'), 'existing catalog')
})

test('fetch-games fails without replacing files when no usable catalog or API key exists', (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'portfolio-cache-test-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  mkdirSync(path.join(directory, 'public'))
  const catalog = JSON.stringify({ games: [], error: 'Development mode - no API key' })
  writeFileSync(path.join(directory, 'public/itch-games.json'), catalog)
  const result = spawnSync(process.execPath, [fetchScript], {
    cwd: directory,
    env: { ...process.env, ITCH_API_KEY: '', NODE_ENV: 'development' },
    encoding: 'utf8',
  })
  assert.equal(result.status, 1)
  assert.equal(readFileSync(path.join(directory, 'public/itch-games.json'), 'utf8'), catalog)
  assert.equal(existsSync(path.join(directory, 'public/itch-games.html')), false)
})

test('an upstream failure preserves the last catalog in development', (t) => {
  const directory = mkdtempSync(path.join(tmpdir(), 'portfolio-cache-test-'))
  t.after(() => rmSync(directory, { recursive: true, force: true }))
  mkdirSync(path.join(directory, 'public'))
  const catalog = JSON.stringify({ games: [{ title: 'Existing game' }], count: 1 })
  writeFileSync(path.join(directory, 'public/itch-games.json'), catalog)
  writeFileSync(path.join(directory, 'public/itch-games.html'), 'existing catalog')
  const preload = path.join(directory, 'block-network.cjs')
  writeFileSync(preload, "require('node:https').get = () => { throw new Error('Fixture upstream failure; network disabled') }")
  const result = spawnSync(process.execPath, ['--require', preload, fetchScript], {
    cwd: directory,
    env: { ...process.env, ITCH_API_KEY: 'local-fixture-only', NODE_ENV: 'development' },
    encoding: 'utf8',
  })
  assert.equal(result.status, 1)
  assert.equal(readFileSync(path.join(directory, 'public/itch-games.json'), 'utf8'), catalog)
  assert.equal(readFileSync(path.join(directory, 'public/itch-games.html'), 'utf8'), 'existing catalog')
})

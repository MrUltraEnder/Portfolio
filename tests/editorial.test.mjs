import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { createRequire } from 'node:module'
import test from 'node:test'
import vm from 'node:vm'
import { parseHTML } from 'linkedom'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import ts from 'typescript'
import { publicAsset } from '../lib/public-path.mjs'

const require = createRequire(import.meta.url)
const game = (name, url) => ({ name, url, video: 'https://example.com/cover.png', description: `${name} description`, metrics: { published: 'Jan 2025' }, platform: 'Windows' })
const games = [game('BubbleWare', 'https://tboxfinn.itch.io/bubbleware'), game('Orrery Ready', 'https://grimoirestudios.itch.io/orreryready')]

function loadPortfolio(hook) {
  const source = readFileSync(new URL('../components/editorial-portfolio.tsx', import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true } })
  const compiledModule = { exports: {} }
  vm.runInNewContext(outputText, { module: compiledModule, exports: compiledModule.exports, window: globalThis.window, require: id => {
    if (id === '@/hooks/use-itch-games') return { useItchGames: () => hook }
    if (id === '@/lib/public-path.mjs') return { publicAsset }
    if (id === 'next/font/local') return { __esModule: true, default: () => ({ variable: 'font-variable' }) }
    if (id === 'next/link') return { __esModule: true, default: ({ children, ...props }) => React.createElement('a', props, children) }
    if (id.endsWith('.module.css')) return { __esModule: true, default: new Proxy({}, { get: (_, key) => key }) }
    return require(id)
  } })
  return compiledModule.exports.default
}

function fixture(overrides = {}) {
  return { convertToProjects: () => games, loading: false, error: null, searchTerm: '', setSearchTerm: () => {}, ...overrides }
}

function render(overrides) {
  const Component = loadPortfolio(fixture(overrides))
  return parseHTML(`<html><body>${renderToStaticMarkup(React.createElement(Component))}</body></html>`).document
}

test('editorial portfolio retains recruiter content, real destinations and anchors', () => {
  const doc = render()
  assert.match(doc.querySelector('h1').textContent, /Unity\s*developer\./)
  assert.equal(doc.querySelectorAll('h1').length, 1)
  for (const id of ['main-content', 'about', 'projects', 'experience', 'skills', 'contact']) assert.ok(doc.getElementById(id), id)
  for (const text of ['Eric Zaleta', 'interactive applications', 'Inmersys', 'FUSE People & Technology', 'Grimoire Games']) assert.ok(doc.body.textContent.includes(text) || doc.textContent.includes(text), text)
  const links = [...doc.querySelectorAll('a')].map(a => a.getAttribute('href'))
  for (const href of ['mailto:ericzaleta@gmail.com', 'tel:+524811124012', 'https://linkedin.com/in/ericzaleta', publicAsset('/Eric-Zaleta-Unity-Developer-Resume.pdf')]) assert.ok(links.includes(href), href)
  for (const link of doc.querySelectorAll('a[href^="#"]')) assert.ok(doc.getElementById(link.getAttribute('href').slice(1)))
  const ids = [...doc.querySelectorAll('[id]')].map(el => el.id)
  assert.equal(ids.length, new Set(ids).size)
})

test('catalog data, not prototype-only fixtures, controls the project index', () => {
  const custom = game('New catalog release', 'https://studio.itch.io/new-release')
  const doc = render({ convertToProjects: () => [custom] })
  assert.equal(doc.querySelector('[data-project-title]').textContent, custom.name)
  assert.equal(doc.querySelector('[data-project-link]').getAttribute('href'), custom.url)
  assert.ok(doc.querySelector('label[for="project-search"]'))
})

test('loading, errors, empty catalogs and unmatched searches remain distinct', () => {
  assert.match(render({ loading: true }).querySelector('[role="status"]').textContent, /Loading/)
  assert.match(render({ error: 'Failed' }).querySelector('[role="status"]').textContent, /temporarily unavailable/)
  assert.match(render({ convertToProjects: () => [] }).querySelector('[role="status"]').textContent, /No published projects/)
  assert.match(render({ convertToProjects: () => [], searchTerm: 'missing' }).querySelector('[role="status"]').textContent, /No projects match/)
})

test('project switching synchronizes screenshot, caption, link and pressed state', async () => {
  const { window } = parseHTML('<html><body><div id="root"></div></body></html>')
  const previous = Object.fromEntries(['window', 'document', 'navigator', 'IS_REACT_ACT_ENVIRONMENT'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  globalThis.window = window
  globalThis.document = window.document
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { userAgent: 'node' } })
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  window.matchMedia = () => ({ matches: true })
  const { createRoot } = await import('react-dom/client')
  const root = createRoot(window.document.getElementById('root'))
  try {
    const Component = loadPortfolio(fixture())
    await React.act(async () => root.render(React.createElement(Component)))
    const doc = window.document
    const choices = [...doc.querySelectorAll('[data-project-choice]')]
    const target = choices.find(button => button.textContent.includes('Orrery Ready'))
    await React.act(async () => target.dispatchEvent(new window.Event('click', { bubbles: true })))
    assert.equal(target.getAttribute('aria-pressed'), 'true')
    assert.equal(doc.querySelector('[data-project-title]').textContent, 'Orrery Ready')
    assert.match(doc.querySelector('[data-project-image]').getAttribute('src'), /orrery-world/)
    assert.match(doc.querySelector('[data-project-image]').alt, /Orrery Ready/)
    assert.equal(doc.querySelector('[data-project-link]').getAttribute('href'), games[1].url)
    let cancellations = 0
    const image = doc.querySelector('[data-project-image]')
    image.getAnimations = () => [{ cancel: () => cancellations++ }]
    const first = [...doc.querySelectorAll('[data-project-choice]')].find(button => button.textContent === 'BubbleWare')
    await React.act(async () => first.dispatchEvent(new window.Event('click', { bubbles: true })))
    assert.equal(cancellations, 1, 'keyboard selection cancels any in-progress pointer animation')
    assert.equal(doc.querySelector('[data-project-title]').textContent, 'BubbleWare')
    await React.act(async () => root.render(React.createElement(loadPortfolio(fixture({ convertToProjects: () => [games[0]] })))))
    assert.equal(doc.querySelector('[data-project-title]').textContent, 'BubbleWare')
  } finally {
    await React.act(async () => root.unmount())
    for (const [key, descriptor] of Object.entries(previous)) {
      if (descriptor === undefined) delete globalThis[key]
      else Object.defineProperty(globalThis, key, descriptor)
    }
  }
})

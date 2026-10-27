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
import { animatePortfolio } from '../lib/editorial-motion.mjs'

const require = createRequire(import.meta.url)
const game = (name, url) => ({ name, url, video: 'https://example.com/cover.png', description: `${name} description`, metrics: { published: 'Jan 2025' }, platform: 'Windows' })
const games = [game('BubbleWare', 'https://tboxfinn.itch.io/bubbleware'), game('Orrery Ready', 'https://grimoirestudios.itch.io/orreryready')]
const imageCandidates = image => image.getAttribute('srcset') ?? image.getAttribute('srcSet')
const mockMotion = new Proxy({}, {
  get(target, tag) {
    if (!target[tag]) target[tag] = React.forwardRef(({ children, initial, animate, exit, transition, whileInView, viewport, ...props }, ref) => React.createElement(tag, { ...props, ref }, children))
    return target[tag]
  },
})

function loadPortfolio(hook, runtime = {}) {
  const source = readFileSync(new URL('../components/editorial-portfolio.tsx', import.meta.url), 'utf8')
  const { outputText } = ts.transpileModule(source, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.CommonJS, esModuleInterop: true } })
  const compiledModule = { exports: {} }
  vm.runInNewContext(outputText, { module: compiledModule, exports: compiledModule.exports, window: globalThis.window, ...runtime.globals, require: id => {
    if (runtime.modules?.[id]) return runtime.modules[id]
    if (id === 'framer-motion') return { motion: mockMotion, AnimatePresence: ({ children }) => children, MotionConfig: ({ children }) => children, useReducedMotion: () => true }
    if (id === '@/hooks/use-itch-games') return { useItchGames: () => hook }
    if (id === '@/lib/public-path.mjs') return { publicAsset }
    if (id === '@/lib/editorial-motion.mjs') return { animatePortfolio }
    if (id === '@/components/ui/skeleton') return { Skeleton: props => React.createElement('div', props) }
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
  assert.equal(doc.querySelector('h1').textContent.trim(), 'Eric Zaleta')
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
  const image = doc.querySelector('[data-project-image]')
  assert.equal(image.closest('[data-media]').getAttribute('data-media'), 'cover')
  assert.equal(image.getAttribute('width'), null, 'unknown cover dimensions must not force enlargement')
  assert.equal(image.getAttribute('height'), null)
  assert.equal(image.getAttribute('srcset'), null, 'do not invent larger cover sources')
})

test('gameplay uses native dimensions and real responsive image candidates', () => {
  const doc = render()
  const image = doc.querySelector('[data-project-image]')
  assert.equal(image.getAttribute('width'), '1920')
  assert.equal(image.getAttribute('height'), '1080')
  assert.match(imageCandidates(image), /bubble-world-640\.webp 640w/)
  assert.match(imageCandidates(image), /bubble-world-1280\.webp 1280w/)
  assert.match(imageCandidates(image), /bubble-world\.webp 1920w/)
  for (const element of [...doc.querySelectorAll('img')].filter(imageCandidates)) {
    assert.ok(element.getAttribute('sizes'))
    for (const candidate of imageCandidates(element).split(', ')) {
      const [src] = candidate.split(' ')
      assert.ok(readFileSync(new URL(`../public${src}`, import.meta.url)).length > 0, src)
    }
  }
})

test('gameplay files preserve available native resolution without upsampling', () => {
  for (const [name, width, height] of [['bubble-world', 1920, 1080], ['bubble-play', 1920, 1080], ['orrery-world', 950, 593], ['orrery-detail', 948, 590]]) {
    const data = readFileSync(new URL(`../public/images/projects/${name}.webp`, import.meta.url))
    assert.equal(data.toString('ascii', 12, 16), 'VP8 ')
    assert.equal(data.readUInt16LE(26) & 0x3fff, width, name)
    assert.equal(data.readUInt16LE(28) & 0x3fff, height, name)
  }
})

test('loading, errors, empty catalogs and unmatched searches remain distinct', () => {
  assert.match(render({ loading: true }).querySelector('[role="status"]').textContent, /Loading/)
  assert.match(render({ error: 'Failed' }).querySelector('[role="status"]').textContent, /temporarily unavailable/)
  assert.match(render({ convertToProjects: () => [] }).querySelector('[role="status"]').textContent, /No published projects/)
  assert.match(render({ convertToProjects: () => [], searchTerm: 'missing' }).querySelector('[role="status"]').textContent, /No projects match/)
})

test('catalog loading has accessible, non-interactive project and index skeletons', () => {
  const doc = render({ loading: true, convertToProjects: () => [] })
  const skeleton = doc.querySelector('[data-project-skeleton]')
  assert.ok(skeleton)
  assert.equal(skeleton.getAttribute('role'), 'status')
  assert.equal(skeleton.getAttribute('aria-busy'), 'true')
  assert.match(skeleton.textContent, /Loading projects from Itch.io/)
  assert.ok(skeleton.querySelector('[aria-hidden="true"] .skeletonImage'))
  assert.equal(doc.querySelectorAll('[data-index-skeleton] li').length, 6)
  assert.equal(doc.querySelector('[data-index-skeleton]').getAttribute('aria-hidden'), 'true')
  assert.ok(doc.querySelector('#project-search').hasAttribute('disabled'))
  assert.equal(doc.querySelector('[data-project-choice]'), null)
  for (const state of [{}, { error: 'Failed' }, { convertToProjects: () => [] }]) {
    const settled = render(state)
    assert.equal(settled.querySelector('[data-project-skeleton]'), null)
    assert.equal(settled.querySelector('[data-index-skeleton]'), null)
    assert.equal(settled.querySelector('#project-search').hasAttribute('disabled'), false)
  }
})

test('project switching synchronizes screenshot, caption, link and pressed state', async () => {
  const { window } = parseHTML('<html><body><div id="root"></div></body></html>')
  const previous = Object.fromEntries(['window', 'document', 'navigator', 'HTMLElement', 'IS_REACT_ACT_ENVIRONMENT'].map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  globalThis.window = window
  globalThis.document = window.document
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { userAgent: 'node' } })
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  window.matchMedia = () => ({ matches: true })
  const { createRoot } = await import('react-dom/client')
  const root = createRoot(window.document.getElementById('root'))
  try {
    const hook = fixture({ loading: true, convertToProjects: () => [] })
    const Component = loadPortfolio(hook)
    await React.act(async () => root.render(React.createElement(Component)))
    const doc = window.document
    assert.ok(doc.querySelector('[data-project-skeleton]'))
    Object.assign(hook, { loading: false, convertToProjects: () => games })
    await React.act(async () => root.render(React.createElement(Component)))
    assert.equal(doc.querySelector('[data-project-skeleton]'), null)
    assert.equal(doc.querySelector('[data-index-skeleton]'), null)
    assert.equal(doc.querySelector('#project-search').hasAttribute('disabled'), false)
    const choices = [...doc.querySelectorAll('[data-project-choice]')]
    const target = choices.find(button => button.textContent.includes('Orrery Ready'))
    await React.act(async () => target.dispatchEvent(new window.Event('click', { bubbles: true })))
    assert.equal(target.getAttribute('aria-pressed'), 'true')
    assert.equal(doc.querySelector('[data-project-title]').textContent, 'Orrery Ready')
    assert.match(doc.querySelector('[data-project-image]').getAttribute('src'), /orrery-world/)
    assert.match(doc.querySelector('[data-project-image]').alt, /Orrery Ready/)
    assert.equal(doc.querySelector('[data-project-image]').getAttribute('width'), '950')
    assert.equal(doc.querySelector('[data-project-image]').getAttribute('height'), '593')
    assert.match(imageCandidates(doc.querySelector('[data-project-image]')), /orrery-world\.webp 950w/)
    assert.equal(doc.querySelector('[data-media]').style.maxWidth, '950px')
    assert.equal(doc.querySelector('[data-project-link]').getAttribute('href'), games[1].url)
    const dialog = doc.querySelector('dialog')
    await React.act(async () => doc.querySelector('[data-exploration-item]').dispatchEvent(new window.Event('click', { bubbles: true })))
    assert.ok(dialog.hasAttribute('open'))
    assert.equal(dialog.querySelector('img').alt, 'BubbleWare soda minigame gameplay')
    await React.act(async () => dialog.querySelector('[aria-label="Close image"]').dispatchEvent(new window.Event('click', { bubbles: true })))
    assert.equal(dialog.hasAttribute('open'), false)
    assert.equal(dialog.querySelector('figure'), null)
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

test('dark landing presents real portfolio content, media and navigation', () => {
  const projects = [...games, game('Pacomixtle', 'https://grimoirestudios.itch.io/juego-ceart'), game('The adventures of Roby', 'https://tboxfinn.itch.io/the-adventures-of-roby')]
  const doc = render({ convertToProjects: () => projects })

  assert.equal(doc.querySelector('h1').textContent.trim(), 'Eric Zaleta')
  for (const id of ['home', 'projects', 'journal', 'explorations', 'about', 'experience', 'skills', 'contact']) assert.ok(doc.getElementById(id), id)
  assert.equal(doc.querySelectorAll('[data-featured-card]').length, 4)
  assert.equal(doc.querySelectorAll('[data-journal-item]').length, 4)
  assert.equal(doc.querySelector('#journal').getAttribute('aria-label'), 'Project archive')
  assert.match(doc.querySelector('#journal h2').textContent, /From the archive/)
  assert.equal(doc.querySelectorAll('[data-exploration-item]').length, 6)
  const videos = [...doc.querySelectorAll('video')]
  assert.equal(videos.length, 2)
  for (const video of videos) for (const attribute of ['muted', 'loop', 'playsInline']) assert.ok(video.hasAttribute(attribute), attribute)
  assert.ok(doc.querySelector('[aria-label="Loading portfolio"]'))
  for (const text of ['BubbleWare', 'Orrery Ready', 'Pacomixtle', 'Grimoire Games']) assert.ok(doc.body.textContent.includes(text), text)
  assert.doesNotMatch(doc.body.textContent, /Michael Smith|Automotive Motion|200% Satisfied Clients/)
})


test('loader completes and offscreen videos do not start after a late HLS import', async () => {
  const { window } = parseHTML('<html><body><div id="root"></div></body></html>')
  const keys = ['window', 'document', 'navigator', 'HTMLElement', 'IS_REACT_ACT_ENVIRONMENT']
  const previous = Object.fromEntries(keys.map(key => [key, Object.getOwnPropertyDescriptor(globalThis, key)]))
  const proto = window.HTMLElement.prototype
  const methods = Object.fromEntries(['canPlayType', 'play', 'pause'].map(key => [key, Object.getOwnPropertyDescriptor(proto, key)]))
  let plays = 0
  let attachments = 0
  let destroyed = 0
  let frame
  const observers = []
  class Observer {
    constructor(callback) { this.callback = callback; observers.push(this) }
    observe() { this.callback([{ isIntersecting: true }]); this.callback([{ isIntersecting: false }]) }
    disconnect() {}
  }
  class Hls {
    static isSupported() { return true }
    loadSource() {}
    attachMedia() { attachments++ }
    destroy() { destroyed++ }
  }
  Object.assign(proto, { canPlayType: () => '', play: () => { plays++; return Promise.resolve() }, pause: () => {} })
  globalThis.window = window
  globalThis.document = window.document
  globalThis.HTMLElement = window.HTMLElement
  Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { userAgent: 'node' } })
  globalThis.IS_REACT_ACT_ENVIRONMENT = true
  window.matchMedia = () => ({ matches: false })
  const { createRoot } = await import('react-dom/client')
  const root = createRoot(window.document.getElementById('root'))
  try {
    const Component = loadPortfolio(fixture(), {
      globals: { IntersectionObserver: Observer, performance: { now: () => 0 }, requestAnimationFrame: callback => { frame = callback; return 1 }, cancelAnimationFrame: () => {} },
      modules: { 'hls.js': { __esModule: true, default: Hls } },
    })
    await React.act(async () => root.render(React.createElement(Component)))
    const loader = window.document.querySelector('[aria-label="Loading portfolio"]')
    assert.equal(loader.getAttribute('aria-valuenow'), '0')
    await React.act(async () => frame(1350))
    assert.equal(loader.getAttribute('aria-valuenow'), '50')
    assert.ok(loader.textContent.includes('050'))
    await React.act(async () => frame(2700))
    assert.equal(loader.getAttribute('aria-valuenow'), '100')
    await React.act(async () => new Promise(resolve => setTimeout(resolve, 450)))
    assert.equal(window.document.querySelector('[aria-label="Loading portfolio"]'), null)
    assert.equal(observers.length, 2)
    assert.equal(plays, 0, 'the late import must not play a video that left the viewport')
    assert.equal(attachments, 0, 'autoplay cannot start an offscreen attached video')
    await React.act(async () => observers[0].callback([{ isIntersecting: true }]))
    assert.equal(attachments, 1, 'the media is attached after re-entering the viewport')
    assert.equal(plays, 1, 'the video can resume after re-entering the viewport')
  } finally {
    await React.act(async () => root.unmount())
    assert.equal(destroyed, attachments)
    for (const [key, descriptor] of Object.entries(methods)) {
      if (descriptor === undefined) delete proto[key]
      else Object.defineProperty(proto, key, descriptor)
    }
    for (const [key, descriptor] of Object.entries(previous)) {
      if (descriptor === undefined) delete globalThis[key]
      else Object.defineProperty(globalThis, key, descriptor)
    }
  }
})


test('portfolio body uses the Inter font already loaded by Next.js', () => {
  const layout = readFileSync(new URL('../app/layout.tsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('../components/editorial-portfolio.module.css', import.meta.url), 'utf8')
  assert.match(layout, /Inter\(\{[^}]*variable:\s*["']--font-inter["']/)
  assert.match(layout, /inter\.variable/)
  assert.match(css, /--font-body:\s*var\(--font-inter\)/)
})


test('route entrances transition without motion for reduced-motion users', () => {
  const template = readFileSync(new URL('../app/template.tsx', import.meta.url), 'utf8')
  const css = readFileSync(new URL('../app/page-transition.module.css', import.meta.url), 'utf8')
  assert.match(template, /className=\{styles\.pageTransition\}/)
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*no-preference\)/)
  assert.match(css, /animation:\s*page-enter/)
  assert.match(css, /@keyframes\s+page-enter/)
})

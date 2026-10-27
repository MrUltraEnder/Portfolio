import assert from 'node:assert/strict'
import test from 'node:test'
import { animatePortfolio } from '../lib/editorial-motion.mjs'

function fixture({ reduced = false, observer = true } = {}) {
  const media = { matches: reduced, addEventListener: (_, fn) => { media.change = fn }, removeEventListener: () => { media.change = null } }
  const document = { hidden: false, addEventListener: (_, fn) => { document.change = fn }, removeEventListener: () => { document.change = null } }
  const calls = []
  function element(motion, intro = false) {
    return { dataset: { motion }, intro, animate: (frames, options) => {
      const animation = { cancel: () => { animation.cancelled = true } }
      calls.push({ element: motion, frames, options, animation })
      return animation
    } }
  }
  const nodes = [element('type', true), element('slice', true), element('row')]
  const observers = []
  document.defaultView = {
    matchMedia: () => media,
    IntersectionObserver: observer ? class {
      constructor(callback) { this.callback = callback; this.targets = new Set(); observers.push(this) }
      observe(node) { this.targets.add(node) }
      unobserve(node) { this.targets.delete(node) }
      disconnect() { this.targets.clear() }
    } : undefined,
  }
  const root = { ownerDocument: document, querySelectorAll: selector => selector.includes('intro') ? nodes.filter(node => node.intro) : nodes.filter(node => !node.intro) }
  return { root, media, document, calls, nodes, observers }
}

test('intro assembles in a bounded sequence and viewport motion runs once', () => {
  const f = fixture()
  const dispose = animatePortfolio(f.root)
  assert.deepEqual(f.calls.map(call => call.element), ['type', 'slice'])
  assert.ok(f.calls.every(call => call.options.duration + call.options.delay <= 1200))
  assert.ok(f.calls.every(call => call.options.fill === 'backwards'))
  assert.ok(f.calls.every(call => call.frames.at(-1).opacity === 1 && call.frames.at(-1).transform === 'none'))
  const observer = f.observers[0]
  observer.callback([{ target: f.nodes[2], isIntersecting: true }])
  observer.callback([{ target: f.nodes[2], isIntersecting: true }])
  assert.equal(f.calls.filter(call => call.element === 'row').length, 1)
  assert.equal(observer.targets.size, 0)
  dispose()
  assert.ok(f.calls.every(call => call.animation.cancelled))
  assert.equal(f.media.change, null)
  assert.equal(f.document.change, null)
})

test('reduced motion and hidden documents never start decorative movement', () => {
  const f = fixture({ reduced: true })
  const dispose = animatePortfolio(f.root)
  assert.equal(f.calls.length, 0)
  f.media.matches = false
  f.media.change()
  assert.equal(f.calls.length, 2)
  f.media.matches = true
  f.media.change()
  assert.ok(f.calls.every(call => call.animation.cancelled))
  f.media.matches = false
  f.document.hidden = true
  f.media.change()
  assert.equal(f.calls.length, 2)
  f.document.hidden = false
  f.document.change()
  assert.equal(f.calls.length, 2, 'returning to the page must not replay the intro')
  dispose()
})

test('missing viewport animation support leaves scroll content untouched', () => {
  const f = fixture({ observer: false })
  const dispose = animatePortfolio(f.root)
  assert.equal(f.calls.length, 2)
  assert.ok(f.calls.every(call => call.element !== 'row'))
  dispose()
})

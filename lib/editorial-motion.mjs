/** Assemble the gameplay strips once, then introduce editorial chapters on entry.
 * @param {HTMLElement} root
 */
export function animatePortfolio(root) {
  const document = root.ownerDocument
  const view = document.defaultView
  if (!view?.matchMedia) return () => {}
  const preference = view.matchMedia('(prefers-reduced-motion: reduce)')
  const played = new WeakSet()
  const running = new Set()
  let observer

  function stop() {
    observer?.disconnect()
    running.forEach(animation => animation.cancel())
    running.clear()
  }

  function play(element, index = 0) {
    if (preference.matches || document.hidden || played.has(element) || !element.animate) return
    played.add(element)
    const kind = element.dataset.motion
    const transform = kind === 'slice'
      ? `translate3d(${index % 2 ? -18 : 18}%, ${index % 2 ? 28 : -28}%, 0) rotate(${index % 2 ? 9 : -9}deg)`
      : kind === 'row' ? 'translate3d(24px, 0, 0)' : kind === 'letter' ? 'translate3d(0, 45%, 0) rotate(7deg)' : 'translate3d(0, 24%, 0) rotate(-1deg)'
    const animation = element.animate([
      { opacity: 0.6, transform, ...(kind === 'type' ? { clipPath: 'inset(0 0 35% 0)' } : {}) },
      { opacity: 1, transform: 'none', ...(kind === 'type' ? { clipPath: 'inset(0)' } : {}) },
    ], { duration: kind === 'row' ? 480 : 800, delay: Math.min(index * 26, 280), easing: 'cubic-bezier(.16,1,.3,1)', fill: 'backwards' })
    running.add(animation)
    animation.onfinish = () => running.delete(animation)
  }

  function start() {
    stop()
    if (preference.matches || document.hidden) return
    root.querySelectorAll('[data-motion-intro]').forEach((element, index) => play(element, index))
    if (!view.IntersectionObserver) return
    observer = new view.IntersectionObserver(entries => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        play(entry.target)
        observer.unobserve(entry.target)
      }
    }, { threshold: 0.12 })
    root.querySelectorAll('[data-motion]:not([data-motion-intro])').forEach(element => {
      if (!played.has(element)) observer.observe(element)
    })
  }

  preference.addEventListener?.('change', start)
  document.addEventListener('visibilitychange', start)
  start()
  return () => {
    stop()
    preference.removeEventListener?.('change', start)
    document.removeEventListener('visibilitychange', start)
  }
}

export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const started = performance.now()

  const destination = () => {
    const bar = document.querySelector('[data-header-bar]')
    const offset = bar?.getBoundingClientRect().bottom ?? 0
    return Math.max(0, window.scrollY + el.getBoundingClientRect().top - offset)
  }

  const run = () => {
    if (document.getElementById('mobile-nav') && performance.now() - started < 800) {
      window.requestAnimationFrame(run)
      return
    }
    window.requestAnimationFrame(() => window.requestAnimationFrame(scrollNow))
  }

  const scrollNow = () => {
    const top = destination()
    const start = window.scrollY
    if (reduced || Math.abs(top - start) < 2) {
      window.scrollTo({ top, behavior: 'auto' })
      return
    }
    window.scrollTo({ top, behavior: 'smooth' })
    window.setTimeout(() => {
      if (Math.abs(window.scrollY - start) < 2) window.scrollTo({ top: destination(), behavior: 'auto' })
    }, 120)
  }

  window.requestAnimationFrame(run)
}

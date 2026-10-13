export function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  const bar = document.querySelector('[data-header-bar]')
  const offset = bar?.getBoundingClientRect().bottom ?? 0
  const top = window.scrollY + el.getBoundingClientRect().top - offset
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: Math.max(0, top), behavior: reduced ? 'auto' : 'smooth' })
}

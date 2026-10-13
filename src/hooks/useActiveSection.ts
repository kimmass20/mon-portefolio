import { useEffect, useState } from 'react'

const sectionIds = ['accueil', 'a-propos', 'competences', 'projets', 'parcours', 'contact']

export function useActiveSection() {
  const [active, setActive] = useState('accueil')

  useEffect(() => {
    let frame = 0

    const update = () => {
      frame = 0
      const bar = document.querySelector('[data-header-bar]')
      const line = (bar?.getBoundingClientRect().bottom ?? 0) + 12
      const nearBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8
      let current = sectionIds[0]

      if (nearBottom) {
        current = 'contact'
      } else {
        for (const id of sectionIds) {
          const el = document.getElementById(id)
          if (el && el.getBoundingClientRect().top <= line) current = id
        }
      }

      setActive((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return active
}

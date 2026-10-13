import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion, useReducedMotion, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import { scrollToSection } from '../../lib/scrollTo'
import { cn } from '../../lib/cn'
import { useActiveSection } from '../../hooks/useActiveSection'
import { Button } from '../ui/Button'
import { Logo } from './Logo'
import { ThemeToggle } from './ThemeToggle'

const links = [
  { id: 'a-propos', label: 'À propos' },
  { id: 'competences', label: 'Compétences' },
  { id: 'projets', label: 'Projets' },
  { id: 'parcours', label: 'Parcours' },
  { id: 'contact', label: 'Contact' },
]

export function Header() {
  const active = useActiveSection()
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onResize = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  const go = (id: string) => {
    document.body.style.overflow = ''
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-bg/92 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md"
      initial={reduced ? false : { y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="relative">
        <div data-header-bar className="page-shell flex h-[var(--header-h)] items-center">
          <Logo onClick={() => go('accueil')} />

          <nav
            className="ml-auto hidden items-center gap-x-8 lg:flex xl:gap-x-11"
            aria-label="Principale"
          >
            {links.map((link) => {
              const current = active === link.id
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => go(link.id)}
                  aria-current={current ? 'true' : undefined}
                  className={cn(
                    'group relative px-1 py-2 font-sans text-[15px] font-medium tracking-[-0.011em] transition-colors duration-300',
                    current ? 'text-text' : 'text-muted hover:text-text',
                  )}
                >
                  {link.label}
                  {current ? (
                    <motion.span
                      layoutId="nav-current"
                      className="absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-accent"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 420, damping: 34 }
                      }
                    />
                  ) : (
                    <span className="absolute inset-x-0 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-accent/70 transition-transform duration-300 group-hover:scale-x-100" />
                  )}
                </button>
              )
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1 lg:ml-10">
            <ThemeToggle />
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-[5px] text-text hover:bg-surface lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent"
          style={{ scaleX: scrollYProgress }}
        />
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id="mobile-nav"
            className="max-h-[calc(100dvh-var(--header-h)-env(safe-area-inset-top,0px))] overflow-hidden border-t border-border bg-bg lg:hidden"
            aria-label="Mobile"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <ul className="page-shell flex flex-col overflow-y-auto py-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]">
              {links.map((link, index) => (
                <motion.li
                  key={link.id}
                  className="border-b border-border/70"
                  initial={reduced ? false : { opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduced ? 0 : 0.05 + index * 0.04, duration: 0.3 }}
                >
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    aria-current={active === link.id ? 'true' : undefined}
                    className={cn(
                      'flex min-h-14 w-full items-center text-left font-display text-[1.65rem] font-semibold tracking-[-0.02em]',
                      active === link.id ? 'text-accent' : 'text-text',
                    )}
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
              <li className="pt-5">
                <Button variant="primary" className="w-full" onClick={() => go('contact')}>
                  Discutons d&apos;un projet
                </Button>
              </li>
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}

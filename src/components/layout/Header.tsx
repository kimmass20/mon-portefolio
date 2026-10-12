import { Menu, X } from 'lucide-react'
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
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-bg/92 pt-[env(safe-area-inset-top,0px)] backdrop-blur-md">
      <div className="page-shell grid h-[var(--header-h)] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3">
        <Logo onClick={() => go('accueil')} />

        <nav className="hidden min-w-0 items-center justify-end gap-0.5 lg:flex xl:gap-1" aria-label="Principale">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              aria-current={active === link.id ? 'true' : undefined}
              className={cn(
                'relative rounded-[5px] px-2.5 py-2 font-sans text-[14.5px] font-medium transition-colors xl:px-3 xl:text-[15px]',
                active === link.id
                  ? 'text-text after:absolute after:inset-x-2.5 after:bottom-1 after:h-px after:bg-accent xl:after:inset-x-3'
                  : 'text-muted hover:text-text',
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-1">
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

      {open ? (
        <nav
          id="mobile-nav"
          className="max-h-[calc(100dvh-var(--header-h)-env(safe-area-inset-top,0px))] overflow-y-auto border-t border-border bg-bg lg:hidden"
          aria-label="Mobile"
        >
          <ul className="page-shell flex flex-col py-2 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]">
            {links.map((link) => (
              <li key={link.id} className="border-b border-border/70">
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
              </li>
            ))}
            <li className="pt-5">
              <Button variant="primary" className="w-full" onClick={() => go('contact')}>
                Discutons d&apos;un projet
              </Button>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  )
}

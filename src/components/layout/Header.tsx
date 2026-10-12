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
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    scrollToSection(id)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-bg/92 backdrop-blur-md">
      <div className="page-shell flex h-[68px] items-center justify-between gap-4">
        <Logo onClick={() => go('accueil')} />

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principale">
          {links.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => go(link.id)}
              aria-current={active === link.id ? 'true' : undefined}
              className={cn(
                'rounded-[5px] px-3 py-2 font-sans text-[15px] font-medium transition-colors',
                active === link.id ? 'text-accent' : 'text-muted hover:text-text',
              )}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-[5px] text-text hover:bg-surface md:hidden"
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
        <nav id="mobile-nav" className="border-t border-border bg-bg md:hidden" aria-label="Mobile">
          <ul className="page-shell flex flex-col py-3">
            {links.map((link) => (
              <li key={link.id}>
                <button
                  type="button"
                  onClick={() => go(link.id)}
                  className={cn(
                    'w-full py-3 text-left font-display text-[1.7rem] font-semibold tracking-[-0.02em]',
                    active === link.id ? 'text-accent' : 'text-text',
                  )}
                >
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pb-3 pt-4">
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

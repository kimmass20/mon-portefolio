import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, type ReactNode } from 'react'
import type { Project } from '../../data/projects.data'
import { cn } from '../../lib/cn'
import { ProjectGallery } from '../media/ProjectGallery'

const ease = [0.16, 1, 0.3, 1] as const

function projectLinks(project: Project) {
  const { live, github, video, gallery, caseStudy, others = [] } = project.links
  return [
    { href: live, label: 'Voir le site' },
    { href: github, label: 'Voir le code' },
    { href: video, label: 'Voir la vidéo' },
    { href: gallery, label: 'Galerie' },
    { href: caseStudy, label: 'Étude de cas' },
    ...others,
  ].filter((link): link is { href: string; label: string } => Boolean(link.href?.trim()))
}

type Props = {
  project: Project | null
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
  hasPrevious: boolean
  hasNext: boolean
}

export function ProjectDialog({ project, onClose, onPrevious, onNext, hasPrevious, hasNext }: Props) {
  const reduced = useReducedMotion()
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const opener = useRef<HTMLElement | null>(null)
  const onCloseRef = useRef(onClose)
  const presence = project ? 'open' : 'closed'

  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    if (presence !== 'open') return
    opener.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.requestAnimationFrame(() => closeRef.current?.focus())

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return
      const items = [...dialogRef.current.querySelectorAll<HTMLElement>('button, a[href]')].filter(
        (el) => !el.hasAttribute('disabled'),
      )
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
      opener.current?.focus()
    }
  }, [presence])

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center bg-bg/80 p-0 sm:items-center sm:p-6"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: reduced ? 0 : 0.25 }}
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="flex h-[100dvh] max-h-[100dvh] w-full max-w-4xl flex-col overflow-hidden bg-bg shadow-none sm:h-auto sm:max-h-[min(92dvh,56rem)] sm:border sm:border-border"
            initial={reduced ? false : { y: 28, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: 16, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.35, ease }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-3 sm:px-8">
              <p className="font-serif text-lg italic text-accent">{project.type}</p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="inline-flex min-h-11 items-center px-2 font-sans text-[15px] font-semibold text-text"
              >
                Fermer
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">
              <h2
                id={titleId}
                className="font-display text-4xl font-semibold tracking-[-0.035em] text-text sm:text-5xl"
              >
                {project.name}
              </h2>
              <p className="body-pretty mt-3 max-w-2xl text-xl leading-snug text-text/85">{project.tagline}</p>

              <dl className="mt-8 text-[17px] leading-relaxed">
                <Detail term="Problème">{project.problem}</Detail>
                <Detail term="Fonctionnalités">
                  <ul className="space-y-1.5">
                    {project.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </Detail>
                {project.role ? <Detail term="Ma contribution">{project.role}</Detail> : null}
                <Detail term="Technologies">{project.stack.join(', ')}</Detail>
                <Detail term="État">{project.statusLabel}</Detail>
              </dl>

              <ProjectGallery project={project} className="mt-8" />

              <Links project={project} />
            </div>

            <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-3 sm:px-8">
              <button
                type="button"
                onClick={onPrevious}
                disabled={!hasPrevious}
                className={cn(
                  'inline-flex min-h-11 items-center font-sans text-[15px] font-semibold',
                  hasPrevious ? 'text-text' : 'text-muted',
                )}
              >
                Projet précédent
              </button>
              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext}
                className={cn(
                  'inline-flex min-h-11 items-center font-sans text-[15px] font-semibold',
                  hasNext ? 'text-text' : 'text-muted',
                )}
              >
                Projet suivant
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function Detail({ term, children }: { term: string; children: ReactNode }) {
  return (
    <div className="grid gap-1 border-t border-border py-4 sm:grid-cols-[9.5rem_1fr] sm:gap-4">
      <dt className="font-sans text-[15px] font-medium text-muted">{term}</dt>
      <dd className="text-text">{children}</dd>
    </div>
  )
}

function Links({ project }: { project: Project }) {
  const links = projectLinks(project)
  if (!links.length) return null
  return (
    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center font-sans text-[16px] font-semibold text-accent underline decoration-accent/40 underline-offset-[0.25em]"
          >
            {link.label}
            <span className="sr-only"> de {project.name} (nouvel onglet)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

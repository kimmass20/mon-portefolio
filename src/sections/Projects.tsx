import { useEffect, useState } from 'react'
import { projects, type Project } from '../data/projects.data'
import { cn } from '../lib/cn'
import { MediaFrame } from '../components/media/MediaFrame'
import { ProjectDialog } from '../components/projects/ProjectDialog'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Button } from '../components/ui/Button'

const statusDot: Record<Project['status'], string> = {
  live: 'bg-success',
  'in-progress': 'bg-brass',
  prototype: 'bg-accent',
  concept: 'bg-muted',
}

const contribution: Record<Project['id'], string> = {
  scolaris: 'Front-end en équipe, chez Espoir Compagnie.',
  kelasi: 'Projet personnel : données, API, authentification et pages.',
  'smart-bell': 'Front-end en équipe, pour la cloche connectée.',
  auditoires: 'Projet académique : pages, authentification et planning.',
  fasichat: 'Projet académique : interfaces des rôles.',
  'km-business': 'Vitrine de catalogue et de contact, sans paiement en ligne.',
}

const previewStack: Record<Project['id'], string[]> = {
  scolaris: ['Django', 'HTML', 'JavaScript'],
  kelasi: ['Node.js', 'Express', 'SQLite'],
  'smart-bell': ['Django', 'JavaScript', 'ESP32'],
  auditoires: ['PHP', 'JavaScript', 'WebAuthn'],
  fasichat: ['PHP', 'MySQL', 'JavaScript'],
  'km-business': ['HTML', 'CSS', 'JavaScript'],
}

function hashId(id: string) {
  return `projet-${id}`
}

export function Projects() {
  const [openId, setOpenId] = useState<Project['id'] | null>(null)
  const openIndex = projects.findIndex((project) => project.id === openId)
  const openProject = openIndex >= 0 ? projects[openIndex] : null

  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.replace('#', '')
      const match = projects.find((project) => hashId(project.id) === id)
      setOpenId(match?.id ?? null)
    }
    fromHash()
    window.addEventListener('hashchange', fromHash)
    return () => window.removeEventListener('hashchange', fromHash)
  }, [])

  const open = (id: Project['id']) => {
    setOpenId(id)
    const next = `${window.location.pathname}${window.location.search}#${hashId(id)}`
    window.history.pushState(null, '', next)
  }

  const close = () => {
    setOpenId(null)
    if (window.location.hash.startsWith('#projet-')) {
      const base = `${window.location.pathname}${window.location.search}#projets`
      window.history.replaceState(null, '', base)
    }
  }

  const go = (offset: number) => {
    if (openIndex < 0) return
    const next = projects[openIndex + offset]
    if (!next) return
    setOpenId(next.id)
    const url = `${window.location.pathname}${window.location.search}#${hashId(next.id)}`
    window.history.replaceState(null, '', url)
  }

  return (
    <section id="projets" className="section">
      <div className="page-shell">
        <SectionHeading
          label="Projets"
          title="Apprendre en construisant."
          description="Chaque projet part d’une idée ou d’un besoin : faciliter la gestion d’une école, automatiser une sonnerie, organiser les échanges universitaires ou créer une vitrine pour une marque. C’est en développant ces solutions que je mets mes connaissances en pratique."
        />

        <div className="stack-gap grid gap-x-10 gap-y-14 md:grid-cols-2">
          {projects.map((project) => (
            <article key={project.id} aria-labelledby={`project-${project.id}`} className="flex flex-col">
              <MediaFrame
                image={project.images[0]}
                ratio="16 / 9"
                width={1600}
                height={900}
                placeholder={
                  <div className="absolute inset-0 flex items-end p-5">
                    <span className="font-serif text-lg italic text-muted">Aperçu à venir</span>
                  </div>
                }
              />
              <p className="mt-5 font-serif text-lg italic text-accent">{project.type}</p>
              <h3
                id={`project-${project.id}`}
                className="mt-1 font-display text-3xl font-semibold tracking-[-0.03em] text-text sm:text-4xl"
              >
                {project.name}
              </h3>
              <p className="body-pretty mt-3 text-[17px] leading-relaxed text-text">{project.problem}</p>
              <p className="mt-3 text-[16px] leading-relaxed text-muted">{contribution[project.id]}</p>
              <p className="mt-3 font-sans text-[15px] text-text">{previewStack[project.id].join(', ')}</p>
              <p className="mt-3 inline-flex items-center gap-2 text-[15px] text-muted">
                <span className={cn('h-2 w-2 rounded-full', statusDot[project.status])} aria-hidden />
                {project.statusLabel}
              </p>
              <Button variant="secondary" className="mt-5 w-full sm:w-fit" onClick={() => open(project.id)}>
                En savoir plus
              </Button>
            </article>
          ))}
        </div>
      </div>

      <ProjectDialog
        project={openProject}
        onClose={close}
        onPrevious={() => go(-1)}
        onNext={() => go(1)}
        hasPrevious={openIndex > 0}
        hasNext={openIndex >= 0 && openIndex < projects.length - 1}
      />
    </section>
  )
}

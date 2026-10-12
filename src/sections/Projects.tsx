import { ArrowUpRight } from 'lucide-react'
import { projects, type Project } from '../data/projects.data'
import { cn } from '../lib/cn'
import { ProjectGallery } from '../components/media/ProjectGallery'
import { SectionHeading } from '../components/ui/SectionHeading'

const statusDot: Record<Project['status'], string> = {
  live: 'bg-success',
  'in-progress': 'bg-brass',
  prototype: 'bg-accent',
  concept: 'bg-muted',
}

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

function ProjectLinks({ project, links }: { project: Project; links: ReturnType<typeof projectLinks> }) {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-sans text-[16px] font-semibold text-accent link-underline"
          >
            {link.label}
            <ArrowUpRight size={16} aria-hidden />
            <span className="sr-only"> de {project.name} (nouvel onglet)</span>
          </a>
        </li>
      ))}
    </ul>
  )
}

function Credits({ project }: { project: Project }) {
  const links = projectLinks(project)
  const rows = [
    { term: 'Le besoin', value: <span className="body-pretty">{project.problem}</span> },
    ...(project.role
      ? [{ term: 'Mon rôle', value: <span className="body-pretty">{project.role}</span> }]
      : []),
    { term: 'Technologies', value: project.stack.join(', ') },
    {
      term: 'Statut',
      value: (
        <span className="inline-flex items-center gap-2">
          <span className={cn('h-2 w-2 rounded-full', statusDot[project.status])} aria-hidden />
          {project.statusLabel}
        </span>
      ),
    },
    ...(links.length > 0
      ? [{ term: 'Liens', value: <ProjectLinks project={project} links={links} /> }]
      : []),
  ]

  return (
    <dl className="text-[17px] leading-relaxed">
      {rows.map((row) => (
        <div
          key={row.term}
          className="grid gap-1 border-t border-border py-4 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
        >
          <dt className="font-sans text-[15px] font-medium text-muted">{row.term}</dt>
          <dd className="text-text">{row.value}</dd>
        </div>
      ))}
    </dl>
  )
}

function ProjectTitle({ project, large }: { project: Project; large?: boolean }) {
  return (
    <div>
      <p className="font-serif text-lg italic text-accent">{project.type}</p>
      <h3
        id={`project-${project.id}`}
        className={cn(
          'mt-2 font-display font-semibold tracking-[-0.035em] text-text',
          large ? 'text-5xl sm:text-7xl' : 'text-4xl sm:text-5xl',
        )}
      >
        {project.name}
      </h3>
      <p className="body-pretty mt-4 max-w-md text-xl leading-snug text-text/85">
        {project.tagline}
      </p>
    </div>
  )
}

export function Projects() {
  const [featured, ...others] = projects

  return (
    <section id="projets" className="section">
      <div className="page-shell">
        <SectionHeading
          label="Projets"
          title="Six projets, du site vitrine à l’objet connecté."
          description="Deux plateformes scolaires, une cloche connectée, deux projets académiques et une vitrine en ligne, dont deux projets de la start-up Espoir Compagnie auxquels j’ai contribué côté front-end. Chacun est présenté tel qu’il est aujourd’hui, avec ma part exacte du travail."
        />

        <article className="stack-gap" aria-labelledby={`project-${featured.id}`}>
          <ProjectGallery project={featured} />
          <div className="mt-10 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <ProjectTitle project={featured} large />
            </div>
            <div className="lg:col-span-7">
              <Credits project={featured} />
            </div>
          </div>
        </article>

        <div className="mt-[clamp(3.25rem,6vw,4.5rem)] grid gap-16 border-t-2 border-text pt-[clamp(2.5rem,4vw,3.25rem)] lg:grid-cols-2 lg:gap-x-12 lg:gap-y-16">
          {others.map((project, index) => {
            const spansRow = others.length % 2 === 1 && index === others.length - 1

            if (spansRow) {
              return (
                <article
                  key={project.id}
                  aria-labelledby={`project-${project.id}`}
                  className="grid gap-10 border-t border-border pt-14 lg:col-span-2 lg:grid-cols-12 lg:gap-14"
                >
                  <ProjectGallery project={project} className="lg:col-span-7" />
                  <div className="lg:col-span-5">
                    <ProjectTitle project={project} />
                    <div className="mt-8">
                      <Credits project={project} />
                    </div>
                  </div>
                </article>
              )
            }

            return (
              <article key={project.id} aria-labelledby={`project-${project.id}`}>
                <ProjectTitle project={project} />
                <ProjectGallery project={project} className="my-8" />
                <Credits project={project} />
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { portfolio } from '../config/portfolio'
import { Reveal, Stagger, StaggerItem } from '../components/motion/Reveal'
import { SectionHeading } from '../components/ui/SectionHeading'

const studyAreas = [
  'Programmation',
  'Algorithmes',
  'Bases de données',
  "Modélisation des systèmes d'information",
  'Réseaux et systèmes',
  "Développement d'applications",
]

const facts = [
  { term: 'Université', value: portfolio.identity.university },
  { term: 'Faculté', value: portfolio.identity.faculty },
  { term: 'Niveau', value: portfolio.identity.level },
  { term: 'Ville', value: portfolio.identity.location },
]

export function Journey() {
  return (
    <section id="parcours" className="section border-t border-border bg-surface">
      <div className="page-shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading label="Parcours" title="Apprendre, construire, recommencer mieux." />
          <Reveal delay={0.08}>
            <p className="body-pretty mt-8 max-w-md text-lg leading-[1.7] text-muted">
              Je consolide les fondamentaux de l&apos;informatique tout en menant des projets
              personnels et collaboratifs en parallèle.
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Stagger as="dl" stagger={0.08}>
            {facts.map((fact) => (
              <StaggerItem
                key={fact.term}
                className="grid gap-1 border-t border-border py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
              >
                <dt className="font-sans text-[15px] font-medium text-muted">{fact.term}</dt>
                <dd className="font-display text-xl font-medium tracking-[-0.015em] text-text">
                  {fact.value}
                </dd>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="border-t-2 border-text pt-6" delay={0.15}>
            <h3 className="font-sans text-[15px] font-medium text-muted">Domaines étudiés</h3>
            <p className="body-pretty mt-3 text-[1.35rem] leading-snug text-text">
              {studyAreas.join(', ')}.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

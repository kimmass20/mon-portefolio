import { portfolio } from '../config/portfolio'
import { SectionHeading } from '../components/ui/SectionHeading'
import { Disclosure } from '../components/ui/Disclosure'

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
  { term: 'Études', value: portfolio.identity.level },
  { term: 'Ville', value: portfolio.identity.location },
]

export function Journey() {
  return (
    <section id="parcours" className="section border-t border-border bg-surface">
      <div className="page-shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHeading label="Parcours" title="Apprendre, construire, recommencer mieux." />
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <dl>
            {facts.map((fact) => (
              <div
                key={fact.term}
                className="grid gap-1 border-t border-border py-5 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
              >
                <dt className="font-sans text-[15px] font-medium text-muted">{fact.term}</dt>
                <dd className="font-display text-xl font-medium tracking-[-0.015em] text-text">
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
          <Disclosure openLabel="Voir les détails" className="mt-2 border-t border-border pt-5">
            <h3 className="font-sans text-[15px] font-medium text-muted">Domaines étudiés</h3>
            <p className="body-pretty mt-3 text-[1.2rem] leading-snug text-text">
              {studyAreas.join(', ')}.
            </p>
            <p className="body-pretty mt-4 max-w-md text-[17px] leading-relaxed text-muted">
              Ces cours servent de base. Les projets, personnels ou en équipe, sont l&apos;endroit
              où je les mets à l&apos;épreuve.
            </p>
          </Disclosure>
        </div>
      </div>
    </section>
  )
}

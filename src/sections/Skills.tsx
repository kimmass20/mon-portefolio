import { useState } from 'react'
import {
  skillCategories,
  skillLevelLabel,
  type SkillLevel,
} from '../data/skills.config'
import { SectionHeading } from '../components/ui/SectionHeading'

const levels: { id: SkillLevel; note: string; preview: number }[] = [
  { id: 'usedInProjects', note: 'Déjà utilisé dans un projet.', preview: 6 },
  { id: 'consolidating', note: 'Je le pratique encore pour le tenir mieux.', preview: 3 },
  { id: 'learning', note: 'Je l’apprends, sans le présenter comme acquis.', preview: 3 },
]

const byLevel = levels.map((level) => ({
  ...level,
  items: skillCategories.flatMap((cat) =>
    cat.items
      .filter((item) => item.level === level.id)
      .map((item) => ({ name: item.name, category: cat.title })),
  ),
}))

export function Skills() {
  const [expanded, setExpanded] = useState(false)
  const hiddenCount = byLevel.reduce(
    (sum, level) => sum + Math.max(0, level.items.length - level.preview),
    0,
  )

  return (
    <section id="competences" className="section bg-surface">
      <div className="page-shell">
        <SectionHeading
          label="Compétences"
          title="Déjà dans mes projets, ou encore en chemin."
          description="Ce portfolio, par exemple, est fait avec React, TypeScript, Vite et Tailwind CSS. Le niveau n’est pas le même partout."
        />

        <div className="stack-gap grid gap-10 lg:grid-cols-3 lg:gap-12">
          {byLevel.map((level) => {
            const visible = expanded ? level.items : level.items.slice(0, level.preview)
            return (
              <section key={level.id} aria-labelledby={`level-${level.id}`}>
                <div className="border-b-2 border-text pb-4">
                  <h3
                    id={`level-${level.id}`}
                    className="font-display text-2xl font-semibold tracking-[-0.02em] text-text"
                  >
                    {skillLevelLabel(level.id)}
                  </h3>
                  <p className="mt-1 text-[16px] italic text-muted">{level.note}</p>
                </div>
                <ul>
                  {visible.map((item) => (
                    <li key={item.name} className="grid gap-0.5 border-b border-border py-3.5">
                      <span className="font-sans text-[17px] font-medium text-text">{item.name}</span>
                      <span className="text-[14px] italic text-muted">{item.category}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )
          })}
        </div>

        {hiddenCount > 0 ? (
          <button
            type="button"
            aria-expanded={expanded}
            onClick={() => setExpanded((value) => !value)}
            className="mt-8 inline-flex min-h-11 items-center font-sans text-[15px] font-semibold text-accent underline decoration-accent/40 underline-offset-[0.28em] hover:decoration-accent"
          >
            {expanded ? 'Réduire la liste' : 'Voir toutes les compétences'}
          </button>
        ) : null}
      </div>
    </section>
  )
}

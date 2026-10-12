import {
  skillCategories,
  skillLevelLabel,
  type SkillLevel,
} from '../data/skills.config'
import { SectionHeading } from '../components/ui/SectionHeading'

const levels: { id: SkillLevel; note: string }[] = [
  { id: 'usedInProjects', note: 'Utilisé dans au moins un projet réalisé.' },
  { id: 'consolidating', note: 'Déjà pratiqué, encore en cours de maîtrise.' },
  { id: 'learning', note: 'Objectif d’apprentissage, pas encore une compétence.' },
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
  return (
    <section id="competences" className="scroll-mt-20 bg-surface py-24 sm:py-32">
      <div className="page-shell">
        <SectionHeading
          label="Compétences"
          title="Classées par usage réel, pas par pourcentage."
          description="Trois colonnes honnêtes : ce que j’ai déjà utilisé dans mes projets, ce que je consolide, et ce que j’apprends."
        />

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {byLevel.map((level) => (
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
                {level.items.map((item) => (
                  <li
                    key={item.name}
                    className="flex items-baseline justify-between gap-4 border-b border-border py-3"
                  >
                    <span className="font-sans text-[17px] font-medium text-text">{item.name}</span>
                    <span className="text-right text-[15px] italic text-muted">{item.category}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}

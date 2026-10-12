export type SkillLevel = 'usedInProjects' | 'consolidating' | 'learning'

export type SkillItem = {
  name: string
  level?: SkillLevel
}

export type SkillCategory = {
  id: string
  title: string
  items: SkillItem[]
}

const levelLabels: Record<SkillLevel, string> = {
  usedInProjects: 'Pratiqué en projet',
  consolidating: 'En consolidation',
  learning: 'En apprentissage',
}

export function skillLevelLabel(level: SkillLevel) {
  return levelLabels[level]
}

export const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    items: [
      { name: 'HTML5', level: 'usedInProjects' },
      { name: 'CSS3', level: 'usedInProjects' },
      { name: 'JavaScript', level: 'usedInProjects' },
      { name: 'Bootstrap', level: 'consolidating' },
    ],
  },
  {
    id: 'backend',
    title: 'Backend & applications',
    items: [
      { name: 'PHP', level: 'usedInProjects' },
      { name: 'Node.js', level: 'usedInProjects' },
      { name: 'Express.js', level: 'usedInProjects' },
      { name: 'Java', level: 'consolidating' },
    ],
  },
  {
    id: 'data',
    title: 'Bases de données',
    items: [
      { name: 'MySQL', level: 'consolidating' },
      { name: 'SQLite', level: 'usedInProjects' },
      { name: 'SQL', level: 'usedInProjects' },
    ],
  },
  {
    id: 'tools',
    title: 'Outils & environnements',
    items: [
      { name: 'Git', level: 'usedInProjects' },
      { name: 'GitHub', level: 'usedInProjects' },
      { name: 'Visual Studio Code', level: 'usedInProjects' },
      { name: 'Linux', level: 'consolidating' },
      { name: 'Environnements locaux', level: 'usedInProjects' },
    ],
  },
  {
    id: 'explore',
    title: 'Exploration & apprentissage',
    items: [
      { name: 'IA appliquée au développement', level: 'learning' },
      { name: 'Data Science', level: 'learning' },
      { name: 'Analyse de données', level: 'learning' },
      { name: 'Conception de produits numériques', level: 'consolidating' },
    ],
  },
]

import { portfolio, type ProjectId, type ProjectMedia } from '../config/portfolio'

export type ProjectStatus = 'live' | 'in-progress' | 'prototype' | 'concept'

type ProjectContent = {
  id: ProjectId
  name: string
  type: string
  tagline: string
  problem: string
  stack: string[]
  features: string[]
  status: ProjectStatus
  statusLabel: string
  /** Contexte et contribution personnelle, surtout pour les projets d'équipe. */
  role?: string
}

export type Project = ProjectContent & ProjectMedia

/**
 * Textes des projets, dans l'ordre d'affichage (le premier est mis en avant).
 * Les images et les liens sont dans `src/config/portfolio.ts`.
 */
const content: ProjectContent[] = [
  {
    id: 'scolaris',
    name: 'Scolaris',
    type: 'Projet éducatif',
    tagline:
      "Plateforme Django pour digitaliser l'administration et le suivi académique des écoles.",
    problem:
      "Centraliser élèves, classes, enseignants, notes et bulletins, avec des espaces dédiés à la direction, aux enseignants, aux élèves et aux parents.",
    stack: ['Python', 'Django', 'SQLite / PostgreSQL', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Comptes et rôles : administration, direction, enseignant, élève, parent',
      'Élèves, enseignants, classes, matières et années scolaires',
      'Inscriptions, notes et bulletins',
      'Tableau de bord et portails par rôle',
      "Vitrine publique : accueil, à propos, équipe et actualités",
    ],
    status: 'prototype',
    statusLabel: 'Prototype fonctionnel en local',
    role: "Projet de la start-up Espoir Compagnie, réalisé en équipe. Ma contribution porte sur le front-end : vitrine publique (accueil, à propos, équipe, actualités), gabarits des pages internes (barre latérale, barre supérieure, tableau de bord, modules), feuilles de style, scripts d'interface et maquettes de référence.",
  },
  {
    id: 'kelasi',
    name: 'Kelasi',
    type: 'Plateforme éducative',
    tagline: 'Application web pour classes, notes, absences et rôles admin / enseignant / élève.',
    problem:
      'Centraliser des opérations scolaires courantes dans une interface unique, avec authentification et tableaux de bord par profil.',
    stack: ['Node.js', 'Express', 'SQLite', 'bcrypt', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Auth session et rôles (admin, enseignant, élève)',
      'Gestion des classes, matières, utilisateurs et affectations (admin)',
      'Saisie des notes et des absences (enseignant)',
      'Tableaux de bord, notes et absences (élève)',
    ],
    status: 'in-progress',
    statusLabel: 'MVP, exécuté en local',
    role: 'Projet personnel, seul contributeur (mars à juillet 2026) : base de données, API Express, authentification et toutes les pages.',
  },
  {
    id: 'smart-bell',
    name: 'Smart Bell',
    type: 'Cloche scolaire connectée',
    tagline:
      "Automatiser les sonneries d'une école : horaires gérés sur le web, déclenchement par un ESP32.",
    problem:
      'Remplacer le déclenchement manuel de la cloche par des horaires programmés depuis une interface web, transmis à la cloche physique par un microcontrôleur.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Django', 'Django REST Framework', 'ESP32'],
    features: [
      'Programmation, modification et suppression des horaires',
      'Sonnerie manuelle depuis l’accueil',
      'Historique des sonneries',
      'Profil, sécurité, inscription et connexion',
    ],
    status: 'prototype',
    statusLabel: 'Prototype (mars–avril 2026)',
    role: "Projet de la start-up Espoir Compagnie, réalisé en équipe (front-end, back-end, IoT). Ma contribution porte sur le front-end, avec un autre membre : accueil, planning, ajout et modification d'horaires, historique, profil, sécurité, inscription et connexion.",
  },
  {
    id: 'auditoires',
    name: 'Gestion des Auditoires',
    type: 'Projet académique',
    tagline: 'Application PHP pour salles, promotions, cours et un planning hebdomadaire sans conflit.',
    problem:
      "Déclarer les auditoires, les promotions, les options et les cours, puis proposer des créneaux qui n’occupent ni une salle ni une promotion deux fois en même temps.",
    stack: ['PHP', 'HTML', 'CSS', 'JavaScript', 'JSON', 'WebAuthn'],
    features: [
      'Connexion par mot de passe et passkeys',
      'Ajout, modification et suppression des salles, promotions, options et cours',
      'Tableau de bord et consultation des données',
      'Génération d’un planning hebdomadaire sans conflit de salle ni de promotion',
    ],
    status: 'prototype',
    statusLabel: 'Projet académique, exécuté en local',
    role: 'Projet académique personnel : pages, authentification, fichiers JSON et générateur de planning.',
  },
  {
    id: 'fasichat',
    name: 'FasiChat Classroom',
    type: 'Projet académique',
    tagline: 'Messagerie académique par rôles : étudiants, enseignants et administration de la faculté.',
    problem:
      "Faire communiquer une promotion et l’administration selon des règles de visibilité : messages privés ou publics, mur de cours, convocations et annonces du Valve.",
    stack: ['PHP', 'POO', 'PDO', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    features: [
      'Connexion par rôle et inscription étudiant',
      'Espaces étudiant, enseignant, doyen, vice-doyen et apparitaire',
      'Messagerie, mur pédagogique et partage de fichiers',
      'Valve institutionnel et convocations de réunion',
    ],
    status: 'in-progress',
    statusLabel: 'Projet académique, interface exécutée en local',
    role: 'Projet académique de programmation web en PHP (Licence, 2025-2026) : interfaces des rôles et architecture orientée objet.',
  },
  {
    id: 'km-business',
    name: 'KM Business',
    type: 'Vitrine e-commerce',
    tagline: 'Catalogue en ligne orienté mode masculine, conçu pour présenter produits et marque.',
    problem:
      'Offrir une vitrine claire pour des vêtements et chaussures, avec navigation simple et prise de contact, sans promettre une plateforme de paiement complète.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    features: [
      'Pages accueil, boutique, à propos, contact et témoignages',
      'Catalogue produits avec descriptions et tarifs affichés',
      'Navigation multi-pages et menu responsive',
      'Coordonnées et localisation Kinshasa',
    ],
    status: 'live',
    statusLabel: 'En ligne (vitrine)',
  },
]

export const projects: Project[] = content.map((project) => ({
  ...project,
  ...portfolio.projects[project.id],
}))

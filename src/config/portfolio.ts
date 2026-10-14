/**
 * Configuration centrale du portfolio.
 *
 * C'est le seul fichier à modifier pour changer la photo, les visuels des projets,
 * les liens (GitHub, site, vidéo, galerie), les réseaux sociaux et les coordonnées.
 *
 * Règles :
 * - Une chaîne vide ('') ou un champ absent masque automatiquement le lien ou le bouton.
 * - Les images acceptent un chemin local (fichier placé dans `public/`, ex. '/assets/projects/kelasi/x.webp')
 *   ou une URL complète ('https://...').
 * - Formats conseillés : WebP ou JPG. Projets : 1600 × 900 px (16:9). Photo de profil : 1200 × 1500 px (4:5).
 */

export type ImageAsset = {
  /** Chemin local depuis `public/` (commence par '/') ou URL complète. */
  src: string
  /** Description de l'image pour les lecteurs d'écran. Obligatoire. */
  alt: string
  /** Légende affichée sous l'image (origine de la capture, contexte…). */
  caption?: string
  /** 'cover' remplit le cadre 16:9 ; 'contain' affiche l'image entière (utile si son format diffère). */
  fit?: 'cover' | 'contain'
}

export type ProjectLinks = {
  /** Dépôt GitHub. */
  github?: string
  /** Site en ligne. */
  live?: string
  /** Démonstration vidéo (YouTube, Drive, fichier .mp4…). */
  video?: string
  /** Galerie de captures externe (Drive, Figma, Behance…). */
  gallery?: string
  /** Étude de cas détaillée. */
  caseStudy?: string
  /** Liens supplémentaires (autre dépôt, prototype, documentation…). */
  others?: { label: string; href: string }[]
}

export type ProjectMedia = {
  links: ProjectLinks
  /** La première image sert de visuel principal. Liste vide : un emplacement « aperçu à venir » est affiché. */
  images: ImageAsset[]
}

export type ProjectId = 'km-business' | 'scolaris' | 'kelasi' | 'smart-bell' | 'auditoires' | 'fasichat'

type PortfolioConfig = {
  identity: {
    fullName: string
    brandName: string
    location: string
    role: string
    university: string
    faculty: string
    level: string
    /** Start-up au sein de laquelle certains projets ont été menés. */
    startup: string
  }
  /** Photo de profil. `null` : un emplacement neutre avec les initiales est affiché. */
  profilePhoto: ImageAsset | null
  socials: {
    github: string
    linkedin: string
    instagram: string
    x: string
  }
  contact: {
    email: string
    /** Format international, ex. '+243 900 000 000'. */
    phone: string
    /** Numéro international sans '+' ni espaces, ex. '243900000000'. */
    whatsapp: string
    /**
     * Adresse du service qui reçoit le formulaire.
     * Remplie : le formulaire envoie directement. Vide : il ouvre la messagerie du visiteur.
     */
    formEndpoint: string
    /** Clé publique Web3Forms. Elle désigne la boîte de réception, ce n'est pas un secret. */
    accessKey: string
  }
  projects: Record<ProjectId, ProjectMedia>
}

export const portfolio: PortfolioConfig = {
  identity: {
    fullName: 'Eliakim Massamba',
    brandName: 'Kim Mass',
    location: 'Kinshasa, RDC',
    role: 'Développeur web en progression',
    university: 'Université Protestante au Congo (UPC)',
    faculty: "FASI — Faculté des Sciences et Technologies de l'Information",
    level: 'Licence 3 en informatique',
    startup: 'Espoir Compagnie',
  },

  profilePhoto: {
    src: '/assets/profile/eliakim-massamba.webp',
    alt: 'Portrait d’Eliakim Massamba, souriant, en costume bleu, chemise blanche et cravate.',
  },

  socials: {
    github: 'https://github.com/kimmass20',
    linkedin: 'https://www.linkedin.com/in/eliakim-massamba-0aa27739a/',
    instagram: 'https://www.instagram.com/kimmass20/',
    x: 'https://x.com/kim_mass20',
  },

  contact: {
    email: 'massk0170@gmail.com',
    phone: '',
    whatsapp: '243978956023',
    formEndpoint: 'https://api.web3forms.com/submit',
    accessKey: '0312d3e8-c16c-4ad9-b424-c3c213dc41cc',
  },

  projects: {
    'km-business': {
      links: {},
      images: [
        {
          src: '/assets/projects/km-business/ecrans.webp',
          alt: "Deux pages de KM Business côte à côte : accueil avec le bandeau de bienvenue, et la grille des produits populaires.",
          caption:
            "Accueil et produits populaires, une capture par page, version en ligne sur GitHub Pages, placées côte à côte.",
          fit: 'contain',
        },
      ],
    },

    scolaris: {
      links: {},
      images: [
        {
          src: '/assets/projects/scolaris/vitrine.webp',
          alt: "Trois pages de la vitrine Scolaris côte à côte : accueil, à propos et équipe.",
          caption:
            "Vitrine publique (accueil, à propos, équipe), une capture par page, exécutée en local depuis le même dépôt.",
          fit: 'contain',
        },
        {
          src: '/assets/projects/scolaris/application.webp',
          alt: "Trois écrans Scolaris côte à côte : actualités, connexion et tableau de bord.",
          caption:
            "Actualités, connexion et tableau de bord, une capture par page, rendus localement depuis le dépôt.",
          fit: 'contain',
        },
      ],
    },

    kelasi: {
      links: {},
      images: [
        {
          src: '/assets/projects/kelasi/ecrans.webp',
          alt: "Trois écrans de Kelasi côte à côte : tableau de bord administrateur, gestion des affectations, tableau de bord enseignant.",
          caption:
            "Administration, affectations et espace enseignant (branche MVP), une capture par page, exécutés en local et placés côte à côte.",
          fit: 'contain',
        },
      ],
    },

    auditoires: {
      links: {},
      images: [
        {
          src: '/assets/projects/auditoires/ecrans.webp',
          alt: "Trois écrans de Gestion des Auditoires côte à côte : tableau de bord, aperçu des données, formulaire d’ajout d’un cours.",
          caption:
            "Tableau de bord, données et ajout d’un cours, une capture par page, exécutés en local depuis le dépôt.",
          fit: 'contain',
        },
      ],
    },

    fasichat: {
      links: {},
      images: [
        {
          src: '/assets/projects/fasichat/ecrans.webp',
          alt: "Trois écrans de FasiChat Classroom côte à côte : connexion, messagerie étudiante et espace enseignant.",
          caption:
            "Connexion, espace étudiant et espace enseignant, une capture par page, exécutés en local depuis le dépôt.",
          fit: 'contain',
        },
      ],
    },

    'smart-bell': {
      links: {},
      images: [
        {
          src: '/assets/projects/smart-bell/ecrans.webp',
          alt: "Trois écrans mobiles de Smart Bell : accueil avec le bouton de sonnerie, horaires de la journée, historique des sonneries.",
          caption: 'Trois écrans du front-end (accueil, planning, historique), rendus localement depuis le dépôt et placés côte à côte.',
          fit: 'contain',
        },
      ],
    },
  },
}

/** Préfixe les chemins locaux avec la base Vite (nécessaire sur GitHub Pages) ; laisse les URL intactes. */
export function assetUrl(src: string) {
  return src.startsWith('/') ? `${import.meta.env.BASE_URL}${src.slice(1)}` : src
}

export function whatsappHref(number: string) {
  const digits = number.replace(/\D/g, '')
  return digits ? `https://wa.me/${digits}` : ''
}

export function phoneHref(phone: string) {
  const cleaned = phone.replace(/[^\d+]/g, '')
  return cleaned ? `tel:${cleaned}` : ''
}

# Portfolio Kim Mass — Eliakim Massamba

Portfolio professionnel (React, TypeScript, Vite, Tailwind CSS, Motion, Lucide).

## Prérequis

- Node.js 20+
- npm

## Installation

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Configuration

| Fichier / variable | Rôle |
| ------------------ | ---- |
| `src/config/portfolio.ts` | **Fichier central** : identité, photo de profil, images et liens des projets, réseaux sociaux, coordonnées |
| `src/data/projects.data.ts` | Textes des projets (description, stack, statut) |
| `src/data/skills.config.ts` | Compétences et niveaux |
| `.env` → `VITE_CONTACT_ENDPOINT` | Optionnel : remplace `contact.formEndpoint` (utile pour un endpoint différent en local) |

## Recevoir les messages du formulaire par e-mail

Le formulaire envoie les messages via [Formspree](https://formspree.io) (offre gratuite : 50 messages par mois).

1. Créer un compte sur [formspree.io](https://formspree.io/register) avec l'adresse qui doit recevoir les messages, puis confirmer cette adresse.
2. Cliquer sur **New Form**, donner un nom (ex. « Portfolio »), valider.
3. Copier l'adresse du formulaire affichée, de la forme `https://formspree.io/f/abcdwxyz`.
4. La coller dans `src/config/portfolio.ts` :

```ts
contact: {
  email: 'ton.adresse@exemple.com',
  // ...
  formEndpoint: 'https://formspree.io/f/abcdwxyz',
},
```

5. Envoyer un message de test depuis le site. Formspree demande de confirmer le tout premier envoi par e-mail ; les suivants arrivent directement dans la boîte de réception. Répondre au message répond au visiteur.

Comportement du formulaire :

| `formEndpoint` | `email` | Résultat |
| -------------- | ------- | -------- |
| rempli | indifférent | envoi direct depuis le site |
| vide | rempli | ouvre la messagerie du visiteur, message prérempli |
| vide | vide | bouton désactivé |

## Photos, captures et liens

Tout se règle dans `src/config/portfolio.ts`. Un champ vide (`''`) ou absent masque automatiquement le lien ou le bouton correspondant.

```
public/assets/
├── profile/              photo de profil (1200 × 1500 px, 4:5, WebP ou JPG)
└── projects/
    ├── km-business/      captures du projet (1600 × 900 px, 16:9)
    ├── scolaris/
    ├── kelasi/
    └── smart-bell/
```

**Photo de profil** : déposer le fichier dans `public/assets/profile/`, puis :

```ts
profilePhoto: { src: '/assets/profile/eliakim-massamba.webp', alt: "Portrait d'Eliakim Massamba" },
```

Tant que `profilePhoto` vaut `null`, un emplacement neutre avec les initiales est affiché.

**Images d'un projet** : ajouter des entrées dans `projects.<id>.images`. La première est le visuel principal ; à partir de deux images, des miniatures permettent de passer de l'une à l'autre. `src` accepte un chemin local (`/assets/...`) ou une URL `https://...`. `fit: 'contain'` affiche l'image entière si son format n'est pas 16:9. Liste vide : un cadre « Aperçu à venir » est affiché. Une image introuvable est ignorée sans casser la mise en page.

**Liens d'un projet** (`projects.<id>.links`) : `github`, `live` (site en ligne), `video` (démonstration), `gallery` (galerie externe), `caseStudy`.

**Contact et réseaux** : `contact.email`, `contact.phone` (format international), `contact.whatsapp` (chiffres uniquement, ex. `243900000000`), `socials.linkedin`, `socials.instagram`, `socials.x`.

Les captures actuelles sont de vraies captures : KM Business depuis la version en ligne, Scolaris et Kelasi rendus localement depuis leurs dépôts GitHub (Kelasi avec les données de démonstration du dépôt).

## Déploiement

- **Vercel / Netlify** : connecter le dépôt, build `npm run build`, dossier `dist`.
- **GitHub Pages** : ajouter `base: '/nom-du-repo/'` dans `vite.config.ts`, puis publier `dist`.

## Informations à compléter

Tout se trouve dans `src/config/portfolio.ts` :

- [ ] E-mail professionnel (`contact.email`)
- [ ] Adresse du formulaire Formspree (`contact.formEndpoint`)
- [ ] Téléphone et WhatsApp (`contact.phone`, `contact.whatsapp`)
- [ ] LinkedIn, Instagram, X (`socials`)
- [ ] Photo de profil (`profilePhoto`)
- [ ] Vidéos de démonstration éventuelles (`projects.<id>.links.video`)
## Tests effectués

- `npm run build` (compilation TypeScript + bundle Vite)

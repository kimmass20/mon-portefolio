import { Reveal } from '../components/motion/Reveal'
import { Disclosure } from '../components/ui/Disclosure'

export function Vision() {
  return (
    <section id="vision" className="section" aria-labelledby="vision-title">
      <div className="page-shell">
        <Reveal>
          <p className="mb-6 font-serif text-xl italic text-accent">Vision</p>
          <h2
            id="vision-title"
            className="display-balance max-w-5xl font-serif text-[clamp(2rem,4.2vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-text"
          >
            La technologie n&apos;a de valeur que lorsqu&apos;elle répond à un besoin réel.
          </h2>
          <p className="body-pretty mt-6 max-w-2xl text-lg leading-[1.7] text-muted">
            Je préfère comprendre le problème avant de choisir un outil, puis construire quelque
            chose d&apos;utile avec.
          </p>
          <Disclosure openLabel="En savoir plus" className="mt-6">
            <div className="grid max-w-2xl gap-5 text-[17px] leading-relaxed text-muted">
              <p className="body-pretty">
                La création de produits numériques et l&apos;entrepreneuriat font partie de ce que
                je veux apprendre à tenir, y compris à partir de contextes locaux et africains.
              </p>
              <p className="body-pretty">
                L&apos;IA appliquée au développement m&apos;intéresse comme un moyen d&apos;aller
                plus vite sur un produit, pas comme une expertise déjà acquise. La Data Science et
                l&apos;analyse de données suivent le même chemin : je veux les approfondir une fois
                les bases mieux en place.
              </p>
              <p className="body-pretty">
                En dehors du code, la musique et la guitare restent un repère. Elles sont aussi la
                raison des cordes derrière le nom.
              </p>
            </div>
          </Disclosure>
        </Reveal>
      </div>
    </section>
  )
}

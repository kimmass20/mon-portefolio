import { portfolio } from '../config/portfolio'
import { ProfilePhoto } from '../components/media/ProfilePhoto'
import { Reveal } from '../components/motion/Reveal'
import { Disclosure } from '../components/ui/Disclosure'

export function About() {
  return (
    <section id="a-propos" className="section border-t border-border">
      <div className="page-shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-7">
          <p className="mb-6 font-serif text-xl italic text-accent">À propos</p>
          <h2 className="display-balance font-serif text-[clamp(1.85rem,3.5vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.01em] text-text">
            Je ne cherche pas à collectionner les technologies. Je cherche à comprendre ce
            qu&apos;elles permettent de créer.
          </h2>
          <p className="body-pretty mt-8 max-w-2xl text-lg leading-[1.7] text-muted">
            Étudiant en informatique à l&apos;{portfolio.identity.university}, j&apos;apprends en
            construisant des projets utiles, pas seulement en suivant des cours.
          </p>
          <Disclosure openLabel="En savoir plus sur mon parcours" className="mt-6">
            <div className="grid max-w-2xl gap-6 text-[17px] leading-relaxed text-muted">
              <p className="body-pretty">
                À la {portfolio.identity.faculty}, je suis en {portfolio.identity.level}.
                Le parcours mêle programmation, bases de données et applications, avec des projets
                menés en parallèle.
              </p>
              <p className="body-pretty">
                Devant un besoin, je commence par le cadrer. Ensuite je choisis une approche, je
                développe, je teste et je reviens sur ce qui coince.
              </p>
              <p className="body-pretty">
                Certains projets sont personnels, d&apos;autres académiques, d&apos;autres menés en
                équipe. Chez {portfolio.identity.startup}, j&apos;ai contribué au front-end de
                Scolaris et de Smart Bell, sans porter seul ces plateformes.
              </p>
              <p className="body-pretty">
                La création de produits et l&apos;entrepreneuriat m&apos;intéressent. L&apos;IA
                appliquée au développement et la Data Science sont des pistes que je veux
                approfondir, pas des domaines que je présente comme acquis.
              </p>
            </div>
          </Disclosure>
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9">
          <ProfilePhoto className="max-w-[22rem] sm:max-w-[18rem] lg:max-w-none" />
        </Reveal>
      </div>
    </section>
  )
}

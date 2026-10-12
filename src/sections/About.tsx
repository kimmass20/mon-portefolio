import { portfolio } from '../config/portfolio'
import { ProfilePhoto } from '../components/media/ProfilePhoto'

const principles = [
  {
    title: 'Apprendre en pratiquant',
    body: 'Je consolide mes bases en codant des interfaces et des applications, pas seulement en suivant des cours.',
  },
  {
    title: 'Construire des solutions utiles',
    body: "Chaque projet part d'un besoin concret : présenter une offre, organiser des données, faciliter un échange.",
  },
  {
    title: 'Évoluer grâce aux projets',
    body: 'Les retours, les contraintes techniques et les itérations guident ma progression.',
  },
]

export function About() {
  return (
    <section id="a-propos" className="section border-t border-border">
      <div className="page-shell grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <p className="mb-6 font-serif text-xl italic text-accent">À propos</p>
          <h2 className="display-balance font-serif text-[clamp(1.85rem,3.5vw,2.85rem)] font-normal leading-[1.15] tracking-[-0.01em] text-text">
            Je ne cherche pas à collectionner les technologies. Je cherche à comprendre ce
            qu&apos;elles permettent de créer.
          </h2>
          <div className="mt-10 max-w-2xl space-y-5 text-lg leading-[1.7] text-muted">
            <p className="body-pretty">
              Étudiant à l&apos;{portfolio.identity.university}, je développe mes compétences en
              programmation à travers des vitrines web, des applications et des réflexions
              produit. Chaque projet est un terrain d&apos;apprentissage : cadrer un besoin,
              choisir une approche, construire, tester et améliorer.
            </p>
            <p className="body-pretty">
              Je suis aussi développeur chez {portfolio.identity.startup}, une start-up
              pour laquelle j&apos;ai contribué au front-end de projets comme Scolaris et Smart
              Bell.
            </p>
            <p className="body-pretty">
              Mon parcours réunit le développement web, la création de solutions et une
              sensibilité entrepreneuriale. L&apos;IA et la Data Science constituent des axes
              d&apos;exploration progressifs, pas des expertises que je prétends déjà maîtriser.
            </p>
          </div>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <ProfilePhoto className="mb-10 max-w-[22rem] sm:max-w-[18rem] lg:max-w-none" />
          <dl>
            {principles.map((p) => (
              <div key={p.title} className="border-t border-border py-6">
                <dt className="font-display text-xl font-semibold tracking-[-0.015em] text-text">
                  {p.title}
                </dt>
                <dd className="body-pretty mt-2 text-[17px] leading-relaxed text-muted">
                  {p.body}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

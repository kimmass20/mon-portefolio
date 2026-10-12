const pillars = [
  {
    title: 'Comprendre les usages',
    text: "Observer les besoins réels avant de choisir une stack, surtout dans des contextes où l'accès et les habitudes diffèrent.",
  },
  {
    title: 'Produits & IA',
    text: "Explorer comment l'IA peut accélérer le développement et enrichir des produits, de manière pragmatique et responsable.",
  },
  {
    title: 'Valeur durable',
    text: 'Apprendre par la réalisation de projets concrets, avec une attention particulière aux opportunités locales et africaines.',
  },
]

export function Vision() {
  return (
    <section id="vision" className="section" aria-labelledby="vision-title">
      <div className="page-shell">
        <p className="mb-6 font-serif text-xl italic text-accent">Vision</p>
        <h2
          id="vision-title"
          className="display-balance max-w-5xl font-serif text-[clamp(2rem,4.2vw,3.5rem)] font-normal leading-[1.12] tracking-[-0.015em] text-text"
        >
          La technologie n&apos;a de valeur que lorsqu&apos;elle répond à quelque chose.
        </h2>

        <div className="stack-gap grid gap-8 md:grid-cols-3 md:gap-8">
          {pillars.map((p) => (
            <div key={p.title} className="border-t border-border pt-6">
              <h3 className="font-display text-2xl font-semibold tracking-[-0.02em] text-text">
                {p.title}
              </h3>
              <p className="body-pretty mt-3 text-[17px] leading-relaxed text-muted">{p.text}</p>
            </div>
          ))}
        </div>

        <p className="body-pretty stack-gap max-w-2xl border-l-2 border-brass pl-6 text-lg italic leading-[1.7] text-muted">
          La Data Science et l&apos;analyse de données font partie de mes objectifs
          d&apos;évolution : mieux exploiter les données pour éclairer des décisions produit, une
          fois les bases statistiques et les outils consolidés dans mon parcours.
        </p>
      </div>
    </section>
  )
}

import { Reveal } from '../components/motion/Reveal'

const items = ['Musique', 'guitare', 'technologies numériques', 'innovation']

export function Interests() {
  return (
    <section
      id="interets"
      className="section-band border-y border-border bg-surface"
      aria-labelledby="interets-title"
    >
      <div className="page-shell grid gap-4 md:grid-cols-12 md:items-baseline">
        <Reveal id="interets-title" as="h2" className="font-serif text-xl italic text-accent md:col-span-3">
          En dehors du code
        </Reveal>
        <Reveal
          as="p"
          delay={0.08}
          className="display-balance font-display text-[clamp(1.7rem,3.2vw,2.6rem)] font-semibold leading-tight tracking-[-0.025em] text-text md:col-span-9"
        >
          {items.slice(0, -1).join(', ')} et {items.at(-1)}.
        </Reveal>
      </div>
    </section>
  )
}

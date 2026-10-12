const items = ['Musique', 'guitare', 'technologies numériques', 'innovation']

export function Interests() {
  return (
    <section
      id="interets"
      className="border-y border-border bg-surface py-14 sm:py-16"
      aria-labelledby="interets-title"
    >
      <div className="page-shell grid gap-4 md:grid-cols-12 md:items-baseline">
        <h2 id="interets-title" className="font-serif text-xl italic text-accent md:col-span-3">
          En dehors du code
        </h2>
        <p className="display-balance font-display text-3xl font-semibold leading-tight tracking-[-0.025em] text-text sm:text-[2.75rem] md:col-span-9">
          {items.slice(0, -1).join(', ')} et {items.at(-1)}.
        </p>
      </div>
    </section>
  )
}

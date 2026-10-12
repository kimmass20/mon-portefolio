import { ArrowDown } from 'lucide-react'
import { portfolio } from '../config/portfolio'
import { scrollToSection } from '../lib/scrollTo'
import { Button } from '../components/ui/Button'
import { Strings } from '../components/ui/Strings'

export function Hero() {
  return (
    <section
      id="accueil"
      className="hero relative flex flex-col justify-center overflow-hidden"
    >
      <div className="page-shell flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 font-sans text-[15px] text-muted">
        <p>
          <span className="font-semibold text-text">{portfolio.identity.fullName}</span>, développeur web
          à Kinshasa
        </p>
        <p>{portfolio.identity.level}, UPC</p>
      </div>

      <div className="relative mt-8 sm:mt-10">
        <Strings />
        <div className="page-shell">
          <h1 className="pointer-events-none relative max-w-full py-[0.06em] font-display text-[clamp(3.35rem,15vw,8.75rem)] font-bold leading-[0.84] tracking-[-0.05em] text-text">
            <span className="block sm:inline">Kim</span>{' '}
            <span className="block sm:ml-[0.08em] sm:inline">Mass</span>
          </h1>
        </div>
      </div>

      <div className="page-shell stack-gap grid gap-8 md:grid-cols-12 md:items-end">
        <p className="body-pretty text-[1.4rem] leading-[1.35] text-text sm:text-[1.65rem] md:col-span-7">
          Étudiant en informatique à l&apos;UPC, je construis des sites et des applications web
          pour des besoins concrets, de la vitrine e-commerce à la gestion scolaire.
        </p>
        <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
          <Button variant="primary" onClick={() => scrollToSection('projets')}>
            Voir les projets
            <ArrowDown size={17} aria-hidden />
          </Button>
          <Button variant="secondary" onClick={() => scrollToSection('contact')}>
            Me contacter
          </Button>
        </div>
      </div>
    </section>
  )
}

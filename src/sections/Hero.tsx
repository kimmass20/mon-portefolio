import { ArrowDown } from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { portfolio } from '../config/portfolio'
import { scrollToSection } from '../lib/scrollTo'
import { Rise, RiseWord } from '../components/motion/Reveal'
import { Button } from '../components/ui/Button'
import { Strings } from '../components/ui/Strings'

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const stringsY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 70])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120])
  const copyY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 40])

  return (
    <section
      ref={sectionRef}
      id="accueil"
      className="hero relative flex flex-col justify-center overflow-hidden"
    >
      <Rise className="page-shell flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 font-sans text-[15px] text-muted">
        <p>
          <span className="font-semibold text-text">{portfolio.identity.fullName}</span>, développeur web
          à Kinshasa
        </p>
        <p>{portfolio.identity.level}, UPC</p>
      </Rise>

      <div className="relative mt-8 sm:mt-10">
        <motion.div className="absolute inset-0" style={{ y: stringsY }}>
          <Strings />
        </motion.div>
        <motion.div className="page-shell" style={{ y: titleY }}>
          <h1 className="pointer-events-none relative max-w-full py-[0.06em] font-display text-[clamp(3.35rem,15vw,8.75rem)] font-bold leading-[0.84] tracking-[-0.05em] text-text">
            <RiseWord className="block sm:inline-block" delay={0.08}>
              Kim
            </RiseWord>{' '}
            <RiseWord className="block sm:ml-[0.08em] sm:inline-block" delay={0.28}>
              Mass
            </RiseWord>
          </h1>
        </motion.div>
      </div>

      <motion.div style={{ y: copyY }}>
        <Rise delay={0.5} className="page-shell stack-gap grid gap-8 md:grid-cols-12 md:items-end">
          <p className="body-pretty text-[1.4rem] leading-[1.35] text-text sm:text-[1.65rem] md:col-span-7">
            Étudiant en informatique à l&apos;UPC, je construis des sites et des applications web
            pour des besoins concrets, de la vitrine e-commerce à la gestion scolaire.
          </p>
          <div className="flex flex-wrap gap-3 md:col-span-5 md:justify-end">
            <Button variant="primary" onClick={() => scrollToSection('projets')}>
              Voir les projets
              <ArrowDown size={17} aria-hidden className="arrow-nudge" />
            </Button>
            <Button variant="secondary" onClick={() => scrollToSection('contact')}>
              Me contacter
            </Button>
          </div>
        </Rise>
      </motion.div>
    </section>
  )
}

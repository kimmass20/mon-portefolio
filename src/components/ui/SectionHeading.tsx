import { Reveal } from '../motion/Reveal'
import { cn } from '../../lib/cn'

type Props = {
  label?: string
  title: string
  description?: string
  className?: string
  id?: string
}

export function SectionHeading({ label, title, description, className, id }: Props) {
  return (
    <Reveal as="header" className={cn('max-w-3xl', className)}>
      {label ? (
        <p className="mb-4 font-serif text-xl italic text-accent">{label}</p>
      ) : null}
      <h2
        id={id}
        className="display-balance font-display text-[clamp(2rem,4.4vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-text"
      >
        {title}
      </h2>
      {description ? (
        <p className="body-pretty mt-5 max-w-xl text-lg leading-relaxed text-muted">{description}</p>
      ) : null}
    </Reveal>
  )
}

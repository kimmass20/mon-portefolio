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
    <header className={cn('max-w-3xl', className)}>
      {label ? (
        <p className="mb-4 font-serif text-xl italic text-accent">{label}</p>
      ) : null}
      <h2
        id={id}
        className="display-balance font-display text-[2.6rem] font-semibold leading-[0.98] tracking-[-0.035em] text-text sm:text-6xl lg:text-[4.6rem]"
      >
        {title}
      </h2>
      {description ? (
        <p className="body-pretty mt-6 max-w-xl text-lg leading-relaxed text-muted">{description}</p>
      ) : null}
    </header>
  )
}

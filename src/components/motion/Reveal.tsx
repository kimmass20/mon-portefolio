import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

const ease = [0.16, 1, 0.3, 1] as const

const tags = {
  div: motion.div,
  header: motion.header,
  article: motion.article,
  li: motion.li,
  p: motion.p,
  span: motion.span,
  footer: motion.footer,
  ul: motion.ul,
  dl: motion.dl,
  section: motion.section,
  h2: motion.h2,
} as const

type Tag = keyof typeof tags

const item = {
  hidden: { opacity: 0, y: 52 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
}

type Common = {
  children: ReactNode
  className?: string
  as?: Tag
  id?: string
  'aria-labelledby'?: string
  'aria-label'?: string
}

function Plain({ as = 'div', className, children, ...rest }: Common) {
  const Comp = as
  return (
    <Comp className={className} {...rest}>
      {children}
    </Comp>
  )
}

export function Reveal({
  children,
  className,
  delay = 0,
  y = 72,
  as = 'div',
  ...rest
}: Common & { delay?: number; y?: number }) {
  const reduced = useReducedMotion()
  if (reduced) return <Plain as={as} className={className} {...rest}>{children}</Plain>
  const Comp = tags[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={{ duration: 0.95, delay, ease }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/** Joue à l'arrivée sur la page, pas au défilement. */
export function Rise({
  children,
  className,
  delay = 0,
  as = 'div',
  ...rest
}: Common & { delay?: number }) {
  const reduced = useReducedMotion()
  if (reduced) return <Plain as={as} className={className} {...rest}>{children}</Plain>
  const Comp = tags[as]
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function RiseWord({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  if (reduced) return <span className={className}>{children}</span>
  return (
    <span className={`overflow-hidden pb-[0.08em] ${className ?? ''}`}>
      <motion.span
        className="inline-block"
        initial={{ y: '130%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 1.15, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  )
}

export function Stagger({
  children,
  className,
  delay = 0,
  stagger = 0.12,
  as = 'div',
  ...rest
}: Common & { delay?: number; stagger?: number }) {
  const reduced = useReducedMotion()
  if (reduced) return <Plain as={as} className={className} {...rest}>{children}</Plain>
  const Comp = tags[as]
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

export function StaggerItem({ children, className, as = 'div', ...rest }: Common) {
  const reduced = useReducedMotion()
  if (reduced) return <Plain as={as} className={className} {...rest}>{children}</Plain>
  const Comp = tags[as]
  return (
    <Comp className={className} variants={item} {...rest}>
      {children}
    </Comp>
  )
}

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useId, useState, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

const ease = [0.16, 1, 0.3, 1] as const

type Props = {
  openLabel: string
  closeLabel?: string
  children: ReactNode
  className?: string
}

export function Disclosure({ openLabel, closeLabel = 'Réduire', children, className }: Props) {
  const [open, setOpen] = useState(false)
  const reduced = useReducedMotion()
  const panelId = useId()

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex min-h-11 items-center font-sans text-[15px] font-semibold text-accent underline decoration-accent/40 underline-offset-[0.28em] transition-colors hover:decoration-accent"
      >
        {open ? closeLabel : openLabel}
      </button>
      <AnimatePresence initial={false}>
        {open ? (
          <motion.div
            id={panelId}
            role="region"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.38, ease }}
            className="overflow-hidden"
          >
            <div className={cn('pt-6')}>{children}</div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

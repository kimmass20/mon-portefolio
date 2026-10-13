import type { PointerEvent as ReactPointerEvent } from 'react'
import { portfolio } from '../../config/portfolio'
import { cn } from '../../lib/cn'

type Props = {
  className?: string
  onClick?: () => void
  onPointerDown?: (event: ReactPointerEvent<HTMLButtonElement>) => void
}

export function Logo({ className, onClick, onPointerDown }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      onPointerDown={onPointerDown}
      className={cn('group flex items-center gap-2.5 text-left', className)}
      aria-label={`${portfolio.identity.brandName}, retour à l'accueil`}
    >
      <svg viewBox="0 0 28 20" className="h-5 w-7 shrink-0" aria-hidden>
        <g stroke="var(--color-string)" strokeLinecap="round">
          <path d="M1 3h26" strokeWidth="1" />
          <path d="M1 8h26" strokeWidth="1.25" />
          <path d="M1 13h26" strokeWidth="1.5" />
          <path d="M1 18h26" strokeWidth="1.8" />
        </g>
        <circle
          cx="17"
          cy="8"
          r="3.6"
          fill="var(--color-accent)"
          className="transition-transform duration-300 group-hover:translate-x-[-6px]"
        />
      </svg>
      <span className="font-display text-[17px] font-semibold tracking-[-0.02em] text-text">
        {portfolio.identity.brandName}
      </span>
    </button>
  )
}

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  asChild?: false
  children?: ReactNode
}

type AnchorButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'secondary' | 'ghost'
  asChild: true
  children?: ReactNode
}

const variants = {
  primary:
    'bg-accent text-on-accent hover:bg-accent-dim border border-accent hover:border-accent-dim',
  secondary:
    'bg-transparent text-text border border-text/35 hover:border-text hover:bg-text hover:text-bg',
  ghost: 'bg-transparent text-muted hover:text-text border border-transparent',
}

export function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps | AnchorButtonProps) {
  const classes = cn(
    'inline-flex min-h-11 items-center justify-center gap-2 rounded-[5px] px-5 py-2.5 font-sans text-[15px] font-semibold tracking-[-0.01em] transition-[color,background-color,border-color,transform] duration-300 hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] disabled:pointer-events-none disabled:translate-y-0 disabled:opacity-45',
    variants[variant],
    className,
  )

  if ('asChild' in props && props.asChild) {
    const { asChild: _a, ...anchorProps } = props
    return (
      <a className={classes} {...anchorProps}>
        {children}
      </a>
    )
  }

  const { variant: _, type = 'button', ...buttonProps } = props as ButtonProps
  return (
    <button type={type} className={classes} {...buttonProps}>
      {children}
    </button>
  )
}

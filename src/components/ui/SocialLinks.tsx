import type { IconDefinition } from '@fortawesome/free-brands-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub'
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram'
import { faLinkedinIn } from '@fortawesome/free-brands-svg-icons/faLinkedinIn'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons/faXTwitter'
import { portfolio, whatsappHref } from '../../config/portfolio'
import { cn } from '../../lib/cn'

const { socials } = portfolio

export function BrandIcon({ icon }: { icon: IconDefinition }) {
  const [width, height, , , path] = icon.icon
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-[1em] w-auto" fill="currentColor" aria-hidden>
      {(Array.isArray(path) ? path : [path]).map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  )
}

const links: { href: string; label: string; icon: IconDefinition }[] = [
  { href: socials.github, label: 'GitHub', icon: faGithub },
  { href: socials.linkedin, label: 'LinkedIn', icon: faLinkedinIn },
  { href: socials.instagram, label: 'Instagram', icon: faInstagram },
  { href: socials.x, label: 'X (Twitter)', icon: faXTwitter },
  { href: whatsappHref(portfolio.contact.whatsapp), label: 'WhatsApp', icon: faWhatsapp },
].filter((link) => link.href.trim())

export function SocialLinks({ size = 'md', className }: { size?: 'sm' | 'md'; className?: string }) {
  if (links.length === 0) return null

  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)}>
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} (nouvel onglet)`}
            title={link.label}
            className={cn(
              'inline-flex items-center justify-center rounded-full border border-border text-muted transition-[color,border-color,transform] duration-300 hover:-translate-y-1 hover:scale-110 hover:border-accent hover:text-accent focus-visible:border-accent focus-visible:text-accent',
              size === 'md' ? 'h-12 w-12 text-[20px]' : 'h-11 w-11 text-[17px]',
            )}
          >
            <BrandIcon icon={link.icon} />
          </a>
        </li>
      ))}
    </ul>
  )
}

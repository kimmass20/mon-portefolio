import { portfolio } from '../../config/portfolio'
import { scrollToSection } from '../../lib/scrollTo'
import { SocialLinks } from '../ui/SocialLinks'
import { Logo } from './Logo'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="page-shell flex flex-col items-start gap-8 py-[clamp(2.25rem,4vw,3.25rem)] pb-[max(clamp(2.25rem,4vw,3.25rem),env(safe-area-inset-bottom,0px))] font-sans text-[15px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <Logo onClick={() => scrollToSection('accueil')} />
        <p>
          © {year} {portfolio.identity.fullName}. Conçu et développé à Kinshasa.
        </p>
        <SocialLinks size="sm" />
      </div>
    </footer>
  )
}

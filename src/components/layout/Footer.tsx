import { portfolio } from '../../config/portfolio'
import { scrollToSection } from '../../lib/scrollTo'
import { SocialLinks } from '../ui/SocialLinks'
import { Logo } from './Logo'

const year = new Date().getFullYear()

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="page-shell flex flex-col gap-6 py-10 font-sans text-[15px] text-muted sm:flex-row sm:items-center sm:justify-between">
        <Logo onClick={() => scrollToSection('accueil')} />
        <p>
          © {year} {portfolio.identity.fullName}. Conçu et développé à Kinshasa.
        </p>
        <SocialLinks size="sm" />
      </div>
    </footer>
  )
}

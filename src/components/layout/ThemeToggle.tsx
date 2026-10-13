import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex h-11 w-11 items-center justify-center rounded-[5px] text-muted transition-colors hover:bg-surface hover:text-text"
      aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
    >
      <span key={theme} className="theme-swap inline-flex">
        {theme === 'dark' ? <Sun size={18} aria-hidden /> : <Moon size={18} aria-hidden />}
      </span>
    </button>
  )
}

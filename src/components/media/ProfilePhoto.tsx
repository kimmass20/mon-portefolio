import { portfolio } from '../../config/portfolio'
import { MediaFrame } from './MediaFrame'

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function ProfilePhoto({ className }: { className?: string }) {
  const { profilePhoto, identity } = portfolio

  return (
    <figure className={className}>
      <MediaFrame
        image={profilePhoto}
        ratio="4 / 5"
        width={1200}
        height={1500}
        placeholder={
          <div
            className="absolute inset-0 flex items-end justify-between p-5"
            role="img"
            aria-label={`Emplacement de la photo de ${identity.fullName}`}
          >
            <span className="font-display text-[5.5rem] font-bold leading-[0.8] tracking-[-0.06em] text-string">
              {initials(identity.brandName)}
            </span>
            <span className="h-3 w-3 rounded-full bg-accent" aria-hidden />
          </div>
        }
      />
      <figcaption className="mt-3 font-sans text-[15px] text-muted">
        <span className="font-semibold text-text">{identity.fullName}</span>, développeur chez{' '}
        {identity.startup}, {identity.location}
      </figcaption>
    </figure>
  )
}

import { useState } from 'react'
import { assetUrl } from '../../config/portfolio'
import type { Project } from '../../data/projects.data'
import { cn } from '../../lib/cn'
import { MediaFrame } from './MediaFrame'

function ProjectPlaceholder({ name }: { name: string }) {
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-8">
      <svg viewBox="0 0 100 60" preserveAspectRatio="none" className="absolute inset-0 h-full w-full" aria-hidden>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <line
            key={i}
            x1="0"
            x2="100"
            y1={(60 / 7) * i}
            y2={(60 / 7) * i}
            stroke="var(--color-string)"
            strokeOpacity="0.45"
            strokeWidth={0.6 + i * 0.25}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>
      <span className="relative font-display text-3xl font-semibold tracking-[-0.03em] text-text/80 sm:text-5xl">
        {name}
      </span>
      <span className="relative self-start bg-surface pr-3 font-serif text-lg italic text-muted">
        Aperçu à venir
      </span>
    </div>
  )
}

export function ProjectGallery({ project, className }: { project: Project; className?: string }) {
  const [index, setIndex] = useState(0)
  const [failed, setFailed] = useState<string[]>([])
  const images = project.images.filter((image) => image.src.trim() && !failed.includes(image.src))
  const current = images[index] ?? images[0]
  const onFail = (src: string) => {
    setFailed((list) => [...list, src])
    setIndex(0)
  }

  return (
    <figure className={className}>
      <MediaFrame
        image={current}
        ratio="16 / 9"
        width={1600}
        height={900}
        placeholder={<ProjectPlaceholder name={project.name} />}
        onFail={onFail}
      />

      {images.length > 1 ? (
        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label={`Captures de ${project.name}`}>
          {images.map((image, i) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              aria-label={`Afficher la capture ${i + 1} sur ${images.length}`}
              className={cn(
                'min-h-11 w-24 overflow-hidden rounded-[3px] border-2 transition-colors sm:w-28',
                i === index ? 'border-accent' : 'border-transparent opacity-70 hover:opacity-100',
              )}
            >
              <img
                src={assetUrl(image.src)}
                alt=""
                width={160}
                height={90}
                loading="lazy"
                onError={() => onFail(image.src)}
                className="block aspect-video w-full bg-surface object-contain"
              />
            </button>
          ))}
        </div>
      ) : null}

      {current?.caption ? (
        <figcaption className="mt-3 text-[15px] italic text-muted">{current.caption}</figcaption>
      ) : null}
    </figure>
  )
}

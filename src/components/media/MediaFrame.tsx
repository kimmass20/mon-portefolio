import { useState, type ReactNode } from 'react'
import { assetUrl, type ImageAsset } from '../../config/portfolio'
import { cn } from '../../lib/cn'

type Props = {
  image?: ImageAsset | null
  /** Ratio CSS du cadre, ex. '16 / 9'. */
  ratio: string
  width: number
  height: number
  placeholder: ReactNode
  className?: string
  eager?: boolean
  onFail?: (src: string) => void
}

/** Cadre à ratio fixe : affiche l'image, ou l'espace réservé si elle est absente ou introuvable. */
export function MediaFrame({
  image,
  ratio,
  width,
  height,
  placeholder,
  className,
  eager,
  onFail,
}: Props) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const showImage = Boolean(image?.src) && failedSrc !== image?.src

  return (
    <div
      className={cn('group relative overflow-hidden rounded-[4px] border border-border bg-surface', className)}
      style={{ aspectRatio: ratio }}
    >
      {showImage && image ? (
        <img
          key={image.src}
          src={assetUrl(image.src)}
          alt={image.alt}
          width={width}
          height={height}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => {
            setFailedSrc(image.src)
            onFail?.(image.src)
          }}
          className={cn(
            'absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.035]',
            image.fit === 'contain' ? 'object-contain' : 'object-cover object-top',
          )}
        />
      ) : (
        placeholder
      )}
    </div>
  )
}

import { motion, useReducedMotion } from 'motion/react'
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
  const reduced = useReducedMotion()
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const showImage = Boolean(image?.src) && failedSrc !== image?.src

  return (
    <div
      className={cn('group relative overflow-hidden rounded-[4px] border border-border bg-surface', className)}
      style={{ aspectRatio: ratio }}
    >
      {showImage && image ? (
        <motion.img
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
          initial={reduced ? false : { scale: 1.14 }}
          whileInView={{ scale: 1 }}
          whileHover={reduced ? undefined : { scale: 1.06, transition: { duration: 0.45 } }}
          viewport={{ once: true, margin: '0px 0px -8% 0px' }}
          transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'absolute inset-0 h-full w-full',
            image.fit === 'contain' ? 'object-contain' : 'object-cover object-top',
          )}
        />
      ) : (
        placeholder
      )}
    </div>
  )
}

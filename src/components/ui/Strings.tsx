import { useEffect, useRef, type PointerEvent } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const TUNING = ['e', 'B', 'G', 'D', 'A', 'E']
const WIDTH = 1000
const HEIGHT = 600

type Vibration = { start: number; amp: number; x: number; freq: number }

function stringY(i: number) {
  return (HEIGHT / (TUNING.length + 1)) * (i + 1)
}

function flatPath(y: number) {
  return `M0 ${y} L${WIDTH} ${y}`
}

/** Six cordes de guitare (accordage standard, notation tablature : corde aiguë en haut). */
export function Strings() {
  const reduced = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const edgeRefs = useRef<(SVGPathElement | null)[]>([])
  const vibrations = useRef<(Vibration | null)[]>(TUNING.map(() => null))
  const frame = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [])

  const tick = (now: number) => {
    let running = false
    vibrations.current.forEach((v, i) => {
      const path = pathRefs.current[i]
      const edge = edgeRefs.current[i]
      if (!v || !path || !edge) return
      const t = (now - v.start) / 1000
      const decay = Math.exp(-t * 3.2)
      const y = stringY(i)
      if (decay < 0.02) {
        const d = flatPath(y)
        path.setAttribute('d', d)
        edge.setAttribute('d', d)
        path.style.stroke = ''
        vibrations.current[i] = null
        return
      }
      running = true
      const offset = v.amp * decay * Math.sin(2 * Math.PI * v.freq * t)
      const d = `M0 ${y} Q${v.x} ${y + offset * 2} ${WIDTH} ${y}`
      path.setAttribute('d', d)
      edge.setAttribute('d', d)
      path.style.stroke = decay > 0.25 ? 'var(--color-accent)' : ''
    })
    frame.current = running ? requestAnimationFrame(tick) : null
  }

  const pluck = (i: number, e: PointerEvent<SVGPathElement>) => {
    if (reduced || !svgRef.current) return
    const rect = svgRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * WIDTH
    const direction = e.movementY < 0 ? -1 : 1
    vibrations.current[i] = {
      start: performance.now(),
      amp: direction * (16 - i),
      x: Math.min(Math.max(x, 80), WIDTH - 80),
      freq: 11 - i * 1.1,
    }
    if (frame.current === null) frame.current = requestAnimationFrame(tick)
  }

  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
    <svg
      ref={svgRef}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full overflow-visible"
    >
      {TUNING.map((note, i) => {
        const y = stringY(i)
        const wound = i >= 3
        return (
          <g key={note + i}>
            <path
              ref={(el) => {
                edgeRefs.current[i] = el
              }}
              d={flatPath(y)}
              fill="none"
              stroke="var(--color-bg)"
              strokeWidth={wound ? 7 : 5.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="string-draw"
              style={{ animationDelay: `${i * 70}ms` }}
            />
            <path
              ref={(el) => {
                pathRefs.current[i] = el
              }}
              d={flatPath(y)}
              fill="none"
              stroke={wound ? 'var(--color-brass)' : 'var(--color-text)'}
              strokeWidth={wound ? 2.7 : 1.9}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              className="string-draw"
              style={{ animationDelay: `${i * 70}ms` }}
            />
            <path
              d={flatPath(y)}
              fill="none"
              stroke="transparent"
              strokeWidth={18}
              vectorEffect="non-scaling-stroke"
              style={{ pointerEvents: 'stroke' }}
              onPointerEnter={(e) => pluck(i, e)}
              onPointerDown={(e) => pluck(i, e)}
            />
          </g>
        )
      })}
    </svg>
      {TUNING.map((note, i) => (
        <span
          key={note + i}
          className="absolute right-2 -translate-y-1/2 bg-bg pl-2 font-serif text-sm italic text-muted sm:right-5"
          style={{ top: `${(stringY(i) / HEIGHT) * 100}%` }}
        >
          {note}
        </span>
      ))}
    </div>
  )
}

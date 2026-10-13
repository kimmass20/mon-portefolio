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
  const visible = useRef(true)

  const tick = (now: number) => {
    const seconds = now / 1000
    TUNING.forEach((_, i) => {
      const path = pathRefs.current[i]
      const edge = edgeRefs.current[i]
      if (!path || !edge) return
      const y = stringY(i)
      const idle =
        Math.sin(seconds * (0.7 + i * 0.06) * Math.PI * 2 + i * 0.9) * (28 + i * 2.2)
      let offset = idle
      let accent = false
      const pluckState = vibrations.current[i]
      if (pluckState) {
        const t = (now - pluckState.start) / 1000
        const decay = Math.exp(-t * 2.6)
        if (decay < 0.02) {
          vibrations.current[i] = null
        } else {
          offset += pluckState.amp * decay * Math.sin(2 * Math.PI * pluckState.freq * t)
          accent = decay > 0.25
        }
      }
      const crest = 140 + (Math.sin(seconds * 0.32 + i * 0.7) * 0.5 + 0.5) * 720
      const d = `M0 ${y} Q${crest} ${y + offset * 2} ${WIDTH} ${y}`
      path.setAttribute('d', d)
      edge.setAttribute('d', d)
      path.style.stroke = accent ? 'var(--color-accent)' : ''
    })
  }

  const tickRef = useRef(tick)

  useEffect(() => {
    tickRef.current = tick
  })

  useEffect(() => {
    if (reduced) return
    let alive = true
    const loop = (now: number) => {
      if (!alive) return
      if (document.hidden || !visible.current) {
        frame.current = null
        return
      }
      tickRef.current(now)
      frame.current = requestAnimationFrame(loop)
    }
    const resume = () => {
      if (!document.hidden && visible.current && frame.current === null && alive) {
        frame.current = requestAnimationFrame(loop)
      }
    }
    const node = svgRef.current
    const observer = node
      ? new IntersectionObserver(
          ([entry]) => {
            visible.current = entry.isIntersecting
            resume()
          },
          { rootMargin: '120px' },
        )
      : null
    if (node && observer) observer.observe(node)
    frame.current = requestAnimationFrame(loop)
    document.addEventListener('visibilitychange', resume)
    return () => {
      alive = false
      if (frame.current !== null) cancelAnimationFrame(frame.current)
      frame.current = null
      observer?.disconnect()
      document.removeEventListener('visibilitychange', resume)
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    const timers = TUNING.map((_, i) =>
      window.setTimeout(() => {
        vibrations.current[i] = {
          start: performance.now(),
          amp: (i % 2 === 0 ? 1 : -1) * (34 - i * 2),
          x: 180 + i * 110,
          freq: 5.5 - i * 0.25,
        }
      }, 700 + i * 170),
    )
    return () => timers.forEach((timer) => window.clearTimeout(timer))
  }, [reduced])

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
                style={{ animationDelay: `${i * 140}ms` }}
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
                style={{ animationDelay: `${i * 140}ms` }}
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

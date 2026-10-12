import { useEffect, useRef, type PointerEvent } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const TUNING = ['e', 'B', 'G', 'D', 'A', 'E']
const WIDTH = 1400
const HEIGHT = 460
const NUT = 176
const BRIDGE = 1196
const STRING_Y = [196, 211, 226, 241, 256, 271]

const BODY =
  'M490 168C501.7 141.3 531.7 141.3 560 132C588.3 122.7 628.3 109 660 112C691.7 115 723.3 136 750 150C776.7 164 795 196 820 196C845 196 870 171 900 150C930 129 963.3 88 1000 70C1036.7 52 1081.7 42 1120 42C1158.3 42 1198.3 50.3 1230 70C1261.7 89.7 1292.3 133.3 1310 160C1327.7 186.7 1336 206.7 1336 230C1336 253.3 1327.7 273.3 1310 300C1292.3 326.7 1261.7 370.3 1230 390C1198.3 409.7 1158.3 418 1120 418C1081.7 418 1036.7 408 1000 390C963.3 372 930 331 900 310C870 289 845 264 820 264C795 264 776.7 296 750 310C723.3 324 691.7 345 660 348C628.3 351 588.3 337.3 560 328C531.7 318.7 501.7 318.7 490 292C478.3 265.3 478.3 194.7 490 168Z'

const HEADSTOCK =
  'M158 196C118 186 78 166 48 160C28 156 16 174 16 196L16 264C16 286 28 304 48 300C78 294 118 274 158 264Z'

type Vibration = { start: number; amp: number; x: number; freq: number }

function stringY(i: number) {
  return STRING_Y[i]
}

function flatPath(y: number) {
  return `M${NUT} ${y} L${BRIDGE} ${y}`
}

const FRETS = [188, 224, 256, 285, 311, 334, 355, 374, 391]

/** Guitare acoustique à plat : caisse à droite, manche et six cordes sous le nom. */
export function Strings() {
  const reduced = useReducedMotion()
  const svgRef = useRef<SVGSVGElement>(null)
  const lineRefs = useRef<(SVGPathElement | null)[]>([])
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
      const line = lineRefs.current[i]
      const edge = edgeRefs.current[i]
      if (!v || !line || !edge) return
      const t = (now - v.start) / 1000
      const decay = Math.exp(-t * 3.2)
      const y = stringY(i)
      if (decay < 0.02) {
        const d = flatPath(y)
        line.setAttribute('d', d)
        edge.setAttribute('d', d)
        line.style.stroke = ''
        vibrations.current[i] = null
        return
      }
      running = true
      const offset = v.amp * decay * Math.sin(2 * Math.PI * v.freq * t)
      const d = `M${NUT} ${y} Q${v.x} ${y + offset * 2} ${BRIDGE} ${y}`
      line.setAttribute('d', d)
      edge.setAttribute('d', d)
      line.style.stroke = decay > 0.25 ? 'var(--color-accent)' : ''
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
      amp: direction * (9 - i * 0.6),
      x: Math.min(Math.max(x, NUT + 40), BRIDGE - 40),
      freq: 11 - i * 1.1,
    }
    if (frame.current === null) frame.current = requestAnimationFrame(tick)
  }

  return (
    <div className="pointer-events-none relative mx-auto w-full max-w-[76rem]" aria-hidden>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="guitar-in block h-auto w-full overflow-visible"
      >
        <rect
          x="148"
          y="168"
          width="430"
          height="124"
          rx="8"
          fill="color-mix(in srgb, var(--color-brass) 18%, var(--color-bg))"
          stroke="var(--color-brass)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={HEADSTOCK}
          fill="color-mix(in srgb, var(--color-brass) 32%, var(--color-bg))"
          stroke="var(--color-brass)"
          strokeWidth="2.2"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <rect x="156" y="186" width="330" height="88" rx="3" fill="color-mix(in srgb, var(--color-text) 11%, var(--color-bg))" />
        {FRETS.map((x) => (
          <line
            key={x}
            x1={x}
            x2={x}
            y1="188"
            y2="272"
            stroke="color-mix(in srgb, var(--color-brass) 75%, var(--color-text))"
            strokeWidth="1.35"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {[256, 334, 391].map((x) => (
          <circle key={x} cx={x} cy="230" r="3.2" fill="var(--color-brass)" />
        ))}
        <path
          d={BODY}
          fill="color-mix(in srgb, var(--color-brass) 26%, var(--color-bg))"
          stroke="var(--color-brass)"
          strokeWidth="2.6"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <circle cx="1088" cy="230" r="50" fill="var(--color-bg)" />
        <circle
          cx="1088"
          cy="230"
          r="50"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="3.5"
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx="1088"
          cy="230"
          r="38"
          fill="none"
          stroke="color-mix(in srgb, var(--color-brass) 80%, transparent)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
        />
        <rect x="146" y="184" width="8" height="92" rx="1" fill="var(--color-brass)" />
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
                strokeWidth={wound ? 6.5 : 5}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="string-draw"
                style={{ animationDelay: `${i * 70}ms` }}
              />
              <path
                ref={(el) => {
                  lineRefs.current[i] = el
                }}
                d={flatPath(y)}
                fill="none"
                stroke={wound ? 'var(--color-brass)' : 'var(--color-text)'}
                strokeWidth={wound ? 2.35 : 1.7}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                className="string-draw"
                style={{ animationDelay: `${i * 70}ms` }}
              />
              <path
                d={flatPath(y)}
                fill="none"
                stroke="transparent"
                strokeWidth="16"
                vectorEffect="non-scaling-stroke"
                style={{ pointerEvents: 'stroke' }}
                onPointerEnter={(e) => pluck(i, e)}
                onPointerDown={(e) => pluck(i, e)}
              />
            </g>
          )
        })}
        <rect x="1188" y="186" width="14" height="88" rx="2" fill="var(--color-brass)" />
        {STRING_Y.map((y) => (
          <circle key={y} cx="1210" cy={y} r="3.2" fill="var(--color-bg)" stroke="var(--color-brass)" strokeWidth="1.3" />
        ))}
        {[0, 1, 2].map((i) => (
          <g key={`peg-${i}`}>
            <line x1={52 + i * 30} y1="168" x2={52 + i * 30} y2="150" stroke="var(--color-brass)" strokeWidth="3" strokeLinecap="round" />
            <circle cx={52 + i * 30} cy="146" r="8" fill="var(--color-brass)" />
            <circle cx={52 + i * 30} cy="146" r="2.4" fill="var(--color-bg)" />
            <line x1={52 + i * 30} y1="292" x2={52 + i * 30} y2="310" stroke="var(--color-brass)" strokeWidth="3" strokeLinecap="round" />
            <circle cx={52 + i * 30} cy="314" r="8" fill="var(--color-brass)" />
            <circle cx={52 + i * 30} cy="314" r="2.4" fill="var(--color-bg)" />
          </g>
        ))}
      </svg>
    </div>
  )
}

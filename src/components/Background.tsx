import type { CSSProperties } from 'react'

/**
 * Cyber-Void background — 100% CSS.
 *
 * - Deep black base (#030303) set on the `.cyber-void` layer itself.
 * - 3 massive soft radial-gradient orbs (neon green + cyan) that drift using
 *   ONLY `@keyframes` on `transform: translate3d()` + `opacity`. Zero JS.
 * - Subtle cyber grid masked to the top, film-grain noise via `mix-blend-mode: overlay`,
 *   and a vignette to keep edges dark.
 */
const orb = (o: Record<string, string | number>): CSSProperties => o as CSSProperties

export default function Background() {
  return (
    <div className="cyber-void" aria-hidden="true">
      {/* Neon green orb — top left */}
      <div
        className="cyber-orb"
        style={orb({
          width: '72vmax',
          height: '72vmax',
          left: '-18vmax',
          top: '-26vmax',
          background:
            'radial-gradient(circle, rgba(0,224,138,0.32) 0%, rgba(0,224,138,0.10) 38%, transparent 68%)',
          '--tx': '7vmax',
          '--ty': '8vmax',
          '--dur': '34s',
        })}
      />

      {/* Cyan orb — right */}
      <div
        className="cyber-orb"
        style={orb({
          width: '62vmax',
          height: '62vmax',
          right: '-18vmax',
          top: '6vmax',
          background:
            'radial-gradient(circle, rgba(34,211,238,0.26) 0%, rgba(34,211,238,0.08) 40%, transparent 70%)',
          '--tx': '-6vmax',
          '--ty': '7vmax',
          '--dur': '42s',
          '--delay': '1.5s',
        })}
      />

      {/* Soft green/cyan glow — bottom center */}
      <div
        className="cyber-orb"
        style={orb({
          width: '48vmax',
          height: '48vmax',
          left: '26vw',
          bottom: '-20vmax',
          background:
            'radial-gradient(circle, rgba(0,224,138,0.16) 0%, rgba(34,211,238,0.06) 45%, transparent 72%)',
          '--tx': '-4vmax',
          '--ty': '-5vmax',
          '--dur': '28s',
          '--delay': '3s',
        })}
      />

      {/* Cyber grid (masked to the top) */}
      <div className="cyber-grid" />

      {/* Film grain */}
      <div className="cyber-noise" />

      {/* Vignette */}
      <div className="cyber-vignette" />
    </div>
  )
}

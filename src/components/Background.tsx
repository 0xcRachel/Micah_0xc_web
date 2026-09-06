import type { CSSProperties } from 'react'
import { Feather } from './motion-art'

/**
 * LumifluxVoid background — 100% CSS, transform/opacity only (không lag).
 * Tối giản: 1 hue hồng duy nhất (đậm → nhạt → trắng), nền void #07060E.
 *  - 4 orbs hồng đơn sắc · lông vũ rơi · sao twinkle (CSS only)
 *  - Grid + noise + vignette tĩnh
 */
const orb = (o: Record<string, string | number>): CSSProperties => o as CSSProperties

const FEATHERS: Array<{ left: string; top: string; size: number; color: string; tx: string; ty: string; rot: string; dur: string; delay: string; peak: number }> = [
  { left: '10%', top: '22%', size: 16, color: '#FF7EB6', tx: '40px', ty: '-110px', rot: '40deg', dur: '12s', delay: '0s', peak: 0.35 },
  { left: '84%', top: '28%', size: 18, color: '#FFB9D5', tx: '-40px', ty: '-120px', rot: '-35deg', dur: '13s', delay: '2s', peak: 0.3 },
  { left: '18%', top: '68%', size: 13, color: '#FFF8F1', tx: '-30px', ty: '-90px', rot: '-30deg', dur: '14s', delay: '4s', peak: 0.25 },
  { left: '72%', top: '74%', size: 14, color: '#FF7EB6', tx: '35px', ty: '-100px', rot: '35deg', dur: '12s', delay: '6s', peak: 0.28 },
]

const STARS: Array<{ left: string; top: string; size: number; color: string; dur: string; delay: string; peak: number }> = [
  { left: '14%', top: '30%', size: 2, color: '#FFB9D5', dur: '3.2s', delay: '0s', peak: 0.6 },
  { left: '56%', top: '16%', size: 2, color: '#FFF8F1', dur: '3.6s', delay: '0.7s', peak: 0.5 },
  { left: '68%', top: '46%', size: 2.5, color: '#FF9CC6', dur: '3s', delay: '1.4s', peak: 0.55 },
  { left: '86%', top: '38%', size: 2, color: '#FFF8F1', dur: '3.4s', delay: '2s', peak: 0.45 },
  { left: '8%', top: '78%', size: 2.5, color: '#FF7EB6', dur: '3.3s', delay: '0.4s', peak: 0.5 },
  { left: '78%', top: '82%', size: 2, color: '#FFB9D5', dur: '3.8s', delay: '1.1s', peak: 0.5 },
]

export default function Background() {
  return (
    <div className="cyber-void" aria-hidden="true">
      {/* Remi pink — top left (chủ đạo) */}
      <div
        className="cyber-orb"
        style={orb({
          width: '70vmax',
          height: '70vmax',
          left: '-18vmax',
          top: '-26vmax',
          background:
            'radial-gradient(circle, rgba(255,126,182,0.28) 0%, rgba(255,126,182,0.08) 38%, transparent 68%)',
          '--tx': '7vmax',
          '--ty': '8vmax',
          '--dur': '34s',
        })}
      />

      {/* Hồng nhạt — right */}
      <div
        className="cyber-orb"
        style={orb({
          width: '60vmax',
          height: '60vmax',
          right: '-18vmax',
          top: '8vmax',
          background:
            'radial-gradient(circle, rgba(255,185,213,0.20) 0%, rgba(255,185,213,0.06) 40%, transparent 70%)',
          '--tx': '-6vmax',
          '--ty': '7vmax',
          '--dur': '42s',
          '--delay': '1.5s',
        })}
      />

      {/* Trắng mờ — center */}
      <div
        className="cyber-orb"
        style={orb({
          width: '52vmax',
          height: '52vmax',
          left: '24vw',
          top: '30vh',
          background:
            'radial-gradient(circle, rgba(255,248,241,0.10) 0%, rgba(255,248,241,0.03) 45%, transparent 70%)',
          '--tx': '-4vmax',
          '--ty': '5vmax',
          '--dur': '38s',
          '--delay': '2.5s',
        })}
      />

      {/* Hồng đậm — bottom */}
      <div
        className="cyber-orb"
        style={orb({
          width: '48vmax',
          height: '48vmax',
          left: '26vw',
          bottom: '-20vmax',
          background:
            'radial-gradient(circle, rgba(225,78,143,0.20) 0%, rgba(255,126,182,0.05) 45%, transparent 72%)',
          '--tx': '-4vmax',
          '--ty': '-5vmax',
          '--dur': '30s',
          '--delay': '3.5s',
        })}
      />

      {/* Lông vũ rơi — CSS only */}
      {FEATHERS.map((f, i) => (
        <div
          key={i}
          className="feather-drift absolute"
          style={orb({
            left: f.left,
            top: f.top,
            width: f.size,
            color: f.color,
            '--tx': f.tx,
            '--ty': f.ty,
            '--rot': f.rot,
            '--dur': f.dur,
            '--delay': f.delay,
            '--peak': f.peak,
          })}
        >
          <Feather className="w-full h-auto" />
        </div>
      ))}

      {/* Sao nhấp nháy — CSS only */}
      {STARS.map((s, i) => (
        <div
          key={`s-${i}`}
          className="twinkle-star"
          style={orb({
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            background: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            '--dur': s.dur,
            '--delay': s.delay,
            '--peak': s.peak,
          })}
        />
      ))}

      {/* Grid */}
      <div className="cyber-grid" />

      {/* Film grain */}
      <div className="cyber-noise" />

      {/* Vignette */}
      <div className="cyber-vignette" />
    </div>
  )
}

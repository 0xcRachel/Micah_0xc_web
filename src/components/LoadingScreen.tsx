import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/useGsap'
import { WingMark, PrismCore } from './motion-art'

/**
 * LoadingScreen v1.0.0 — Remielle Lumiflux motif.
 *  - WingMark stamp (elastic) + PrismCore pop
 *  - Counter 0→100 (object tween, không re-render lag)
 *  - Prism bar scaleX + curtain slide up (transform only)
 *  - Tổng ~1.7s, skip khi reduced-motion
 */
export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const prismRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLSpanElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.add('loaded')
      setShow(false)
      return
    }

    const ctx = gsap.context(() => {
      const counter = { v: 0 }
      const tl = gsap.timeline({
        defaults: { force3D: true },
        onComplete: () => setShow(false),
      })

      tl.fromTo(
        logoRef.current,
        { scale: 0.4, opacity: 0, y: 24 },
        { scale: 1, opacity: 1, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.45)' },
      )
        .fromTo(
          prismRef.current,
          { scale: 0, opacity: 0, rotate: -30 },
          { scale: 1, opacity: 1, rotate: 0, duration: 0.7, ease: 'back.out(1.6)' },
          '-=0.55',
        )
        .fromTo(
          lineRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
          '-=0.4',
        )
        .fromTo(
          barRef.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.9, ease: 'power2.inOut' },
          '-=0.35',
        )
        .to(
          counter,
          {
            v: 100,
            duration: 0.9,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (numRef.current) numRef.current.textContent = `${Math.round(counter.v)}`
            },
          },
          '<',
        )
        .to(containerRef.current, {
          yPercent: -100,
          duration: 0.75,
          ease: 'power4.inOut',
        }, '+=0.1')
        .call(() => document.documentElement.classList.add('loaded'))
    })

    return () => ctx.revert()
  }, [])

  if (!show) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-void flex flex-col items-center justify-center will-change-transform">
      <div
        className="absolute inset-0 opacity-100 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 42%, rgba(255,126,182,0.12) 0%, rgba(138,233,255,0.05) 50%, transparent 75%)',
        }}
      />

      <div className="text-center relative z-10 px-6">
        <div ref={logoRef} className="flex items-center justify-center gap-3" style={{ opacity: 0 }}>
          <WingMark className="w-10 h-10 text-remi -scale-x-100" />
          <h1 className="font-serif text-4xl md:text-5xl text-pearl tracking-tight">
            Micah <span className="text-gradient">0xC</span>
          </h1>
          <WingMark className="w-10 h-10 text-pearl/80" />
        </div>

        <div ref={prismRef} className="mt-5 flex justify-center" style={{ opacity: 0 }}>
          <PrismCore className="w-10 h-10 text-remi-soft" />
        </div>

        <div ref={lineRef} className="mt-5 font-mono text-[11px] tracking-[0.2em] uppercase text-mist" style={{ opacity: 0 }}>
          <span className="text-remi">◈</span> Temporal Lumiflux <span className="text-remi-soft">◈</span>
          <span className="ml-3 text-pearl/80"><span ref={numRef}>0</span>%</span>
        </div>
      </div>

      <div className="mt-7 w-48 h-[3px] bg-white/10 rounded-full overflow-hidden relative z-10">
        <div
          ref={barRef}
          className="h-full w-full origin-left rounded-full"
          style={{
            transform: 'scaleX(0)',
            background: 'linear-gradient(90deg, #E14E8F, #FF7EB6, #FFB9D5, #FFF8F1)',
          }}
        />
      </div>

      <p className="mt-4 font-mono text-[10px] tracking-[0.3em] uppercase text-mist/50 relative z-10">v1.0.0</p>
    </div>
  )
}

import { useRef, useEffect } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/useGsap'

export default function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return

    const orbs = containerRef.current.querySelectorAll('[data-bg-orb]')

    // Animate each orb with different speed and path
    orbs.forEach((orb, i) => {
      const duration = 15 + i * 5
      const xRange = 100 + i * 30
      const yRange = 80 + i * 20

      gsap.to(orb, {
        x: `random(-${xRange}, ${xRange})`,
        y: `random(-${yRange}, ${yRange})`,
        scale: `random(0.8, 1.3)`,
        duration,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
        repeatRefresh: true,
      })
    })

    // Animate grid pattern subtle movement
    const grid = containerRef.current.querySelector('[data-bg-grid]')
    if (grid) {
      gsap.to(grid, {
        backgroundPosition: '60px 60px',
        duration: 30,
        ease: 'none',
        repeat: -1,
      })
    }

    // Animate noise texture subtle shift
    const noise = containerRef.current.querySelector('[data-bg-noise]')
    if (noise) {
      gsap.to(noise, {
        x: 'random(-5, 5)',
        y: 'random(-5, 5)',
        duration: 0.5,
        ease: 'none',
        repeat: -1,
        repeatRefresh: true,
      })
    }
  }, [])

  if (prefersReducedMotion()) return null

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {/* ═══ Base gradient ═══ */}
      <div className="absolute inset-0 bg-parchment" />

      {/* ═══ Animated gradient orbs ═══ */}
      <div
        data-bg-orb
        className="absolute -top-[20%] -right-[10%] w-[600px] h-[600px] rounded-full opacity-[0.07] blur-[100px] will-change-transform"
        style={{ background: 'radial-gradient(circle, #c96442 0%, transparent 70%)' }}
      />
      <div
        data-bg-orb
        className="absolute top-[30%] -left-[15%] w-[500px] h-[500px] rounded-full opacity-[0.05] blur-[80px] will-change-transform"
        style={{ background: 'radial-gradient(circle, #d97757 0%, transparent 70%)' }}
      />
      <div
        data-bg-orb
        className="absolute bottom-[10%] right-[20%] w-[400px] h-[400px] rounded-full opacity-[0.06] blur-[90px] will-change-transform"
        style={{ background: 'radial-gradient(circle, #c2c0b6 0%, transparent 70%)' }}
      />
      <div
        data-bg-orb
        className="absolute top-[60%] left-[40%] w-[350px] h-[350px] rounded-full opacity-[0.04] blur-[70px] will-change-transform"
        style={{ background: 'radial-gradient(circle, #e8a090 0%, transparent 70%)' }}
      />
      <div
        data-bg-orb
        className="absolute top-[10%] left-[60%] w-[300px] h-[300px] rounded-full opacity-[0.03] blur-[60px] will-change-transform"
        style={{ background: 'radial-gradient(circle, #c96442 0%, transparent 70%)' }}
      />

      {/* ═══ Animated grid pattern ═══ */}
      <div
        data-bg-grid
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(20,20,19,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,20,19,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* ═══ Dot pattern ═══ */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(20,20,19,0.4) 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* ═══ Noise texture ═══ */}
      <div
        data-bg-noise
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '256px 256px',
        }}
      />

      {/* ═══ Vignette effect ═══ */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 50%, rgba(245,244,237,0.5) 100%)',
        }}
      />

      {/* ═══ Top fade ═══ */}
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-parchment to-transparent" />

      {/* ═══ Bottom fade ═══ */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-parchment to-transparent" />
    </div>
  )
}
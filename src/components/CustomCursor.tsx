import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/useGsap'

/**
 * CustomCursor v1.0.0 — Prism cursor, chống lag triệt để:
 *  - gsap.quickTo (1 ticker cho cả session, không tạo tween mỗi mousemove)
 *  - Click burst: throttle 120ms, tối đa 20 node, transform/opacity only
 *  - Màu xoay vòng các sắc hồng: remi → blush → pearl → deep
 *  - Ẩn hoàn toàn trên touch / reduced-motion
 */
const BURST_COLORS = ['255,126,182', '255,185,213', '255,248,241', '225,78,143']

export default function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return

    const ring = ringRef.current
    const dot = dotRef.current
    if (!ring || !dot) return

    gsap.set([ring, dot], { xPercent: -50, yPercent: -50, x: -100, y: -100, force3D: true })

    // 1 quickTo cho cả session → không tạo tween mới mỗi frame
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' })
    const dotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'none' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'none' })

    const onMove = (e: MouseEvent) => {
      ringX(e.clientX)
      ringY(e.clientY)
      dotX(e.clientX)
      dotY(e.clientY)
    }

    let lastBurst = 0
    let colorIdx = 0
    const onClick = (e: MouseEvent) => {
      const now = performance.now()
      if (now - lastBurst < 120) return
      lastBurst = now
      if (document.querySelectorAll('[data-cursor-particle]').length > 20) return

      const color = BURST_COLORS[colorIdx % BURST_COLORS.length]
      colorIdx += 1

      for (let i = 0; i < 5; i += 1) {
        const el = document.createElement('div')
        el.setAttribute('data-cursor-particle', '')
        const s = 3 + Math.random() * 4
        el.style.cssText = [
          'position:fixed', 'top:0', 'left:0', 'z-index:9998', 'pointer-events:none',
          'border-radius:9999px',
          `width:${s}px`, `height:${s}px`,
          `background:radial-gradient(circle, rgba(${color},1) 0%, rgba(${color},0) 100%)`,
          `box-shadow:0 0 ${s * 2}px rgba(${color},0.5)`,
          'will-change:transform,opacity',
        ].join(';')
        document.body.appendChild(el)
        gsap.set(el, { x: e.clientX, y: e.clientY, scale: 1, opacity: 0.9, force3D: true })
        gsap.to(el, {
          x: e.clientX + (Math.random() - 0.5) * 90,
          y: e.clientY + (Math.random() - 0.5) * 90,
          scale: 0,
          opacity: 0,
          duration: 0.55 + Math.random() * 0.3,
          ease: 'power3.out',
          force3D: true,
          onComplete: () => el.remove(),
        })
      }
    }

    const onEnter = () => {
      gsap.to(ring, { scale: 2.4, opacity: 0.5, duration: 0.3, ease: 'power2.out', force3D: true })
      gsap.to(dot, { scale: 0.4, duration: 0.25, force3D: true })
    }
    const onLeave = () => {
      gsap.to(ring, { scale: 1, opacity: 1, duration: 0.3, force3D: true })
      gsap.to(dot, { scale: 1, duration: 0.25, force3D: true })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('click', onClick, { passive: true })

    // delegate hover qua mouseover/mouseout (không query toàn DOM mỗi lần)
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null
      if (t && t.closest('a, button, [data-cursor-hover]')) onEnter()
    }
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement | null
      if (t && t.closest('a, button, [data-cursor-hover]')) onLeave()
    }
    document.addEventListener('mouseover', onOver, { passive: true })
    document.addEventListener('mouseout', onOut, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', onClick)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-9 h-9 rounded-full hidden lg:block"
        style={{ border: '1.5px solid rgba(255,126,182,0.65)', boxShadow: '0 0 18px rgba(255,126,182,0.25)' }}
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full hidden lg:block"
        style={{ background: 'linear-gradient(135deg, #FF7EB6, #FFB9D5)', boxShadow: '0 0 10px rgba(255,126,182,0.6)' }}
        aria-hidden
      />
    </>
  )
}

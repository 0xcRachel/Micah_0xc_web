import { useEffect, useRef, useCallback } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/useGsap'

function createParticle(x: number, y: number, hue = 'c96442') {
  const el = document.createElement('div')
  el.className = 'pointer-events-none fixed top-0 left-0 z-[9998] rounded-full'
  const size = 2 + Math.random() * 4
  el.style.cssText = `
    width:${size}px; height:${size}px;
    background:radial-gradient(circle, #${hue} 0%, transparent 100%);
    transform:translate(${x}px,${y}px);
    opacity:0.8;
    will-change:transform,opacity;
  `
  document.body.appendChild(el)

  gsap.to(el, {
    x: x + (Math.random() - 0.5) * 60,
    y: y + (Math.random() - 0.5) * 60,
    scale: 0,
    opacity: 0,
    duration: 0.5 + Math.random() * 0.3,
    ease: 'power2.out',
    onComplete: () => el.remove(),
  })
}

function burstParticles(x: number, y: number, count = 4) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createParticle(x, y), i * 40)
  }
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const spawnBurst = useCallback((e: MouseEvent) => {
    burstParticles(e.clientX, e.clientY, 6)
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return

    const cursor = cursorRef.current
    const dot = dotRef.current
    if (!cursor || !dot) return

    const onMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power3.out',
      })
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'none',
      })
    }

    const onEnterInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      gsap.to(cursor, {
        x: cx,
        y: cy,
        scale: 2.5,
        opacity: 0.5,
        duration: 0.3,
      })
      gsap.to(dot, { scale: 0, duration: 0.3 })
    }

    const onLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('click', spawnBurst)

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('click', spawnBurst)
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [spawnBurst])

  if (prefersReducedMotion()) return null

  return (
    <>
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-8 h-8 rounded-full border border-terracotta/60 -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-terracotta -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        aria-hidden
      />
    </>
  )
}

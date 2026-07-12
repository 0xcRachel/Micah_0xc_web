import { useEffect, useRef, useCallback } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/useGsap'

function createParticle(x: number, y: number, hue = 'c96442', size?: number) {
  const el = document.createElement('div')
  el.className = 'pointer-events-none fixed top-0 left-0 z-[9998] rounded-full'
  const s = size ?? (2 + Math.random() * 5)
  el.style.cssText = `
    width:${s}px; height:${s}px;
    background:radial-gradient(circle, #${hue} 0%, transparent 100%);
    transform:translate(${x}px,${y}px);
    opacity:0.9;
    will-change:transform,opacity;
    box-shadow: 0 0 ${s * 2}px rgba(201,100,66,0.4);
  `
  document.body.appendChild(el)

  gsap.to(el, {
    x: x + (Math.random() - 0.5) * 80,
    y: y + (Math.random() - 0.5) * 80,
    scale: 0,
    opacity: 0,
    duration: 0.6 + Math.random() * 0.4,
    ease: 'power3.out',
    onComplete: () => el.remove(),
  })
}

function burstParticles(x: number, y: number, count = 6) {
  for (let i = 0; i < count; i++) {
    setTimeout(() => createParticle(x, y), i * 30)
  }
}

function createTrailParticle(x: number, y: number) {
  const el = document.createElement('div')
  el.className = 'pointer-events-none fixed top-0 left-0 z-[9997] rounded-full'
  const size = 1 + Math.random() * 2
  el.style.cssText = `
    width:${size}px; height:${size}px;
    background:rgba(201,100,66,0.6);
    transform:translate(${x}px,${y}px);
    opacity:0.5;
    will-change:transform,opacity;
  `
  document.body.appendChild(el)

  gsap.to(el, {
    y: y + 10 + Math.random() * 20,
    scale: 0,
    opacity: 0,
    duration: 0.4 + Math.random() * 0.3,
    ease: 'power2.out',
    onComplete: () => el.remove(),
  })
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const lastScrollY = useRef(0)
  const lastTrailTime = useRef(0)

  const spawnBurst = useCallback((e: MouseEvent) => {
    burstParticles(e.clientX, e.clientY, 8)
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
        duration: 0.4,
        ease: 'power3.out',
      })
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.08,
        ease: 'none',
      })
    }

    // ═══ Scroll trail particles ═══
    const onScroll = () => {
      const now = Date.now()
      const scrollY = window.scrollY
      const delta = Math.abs(scrollY - lastScrollY.current)

      // Only create trail particles if scrolling fast enough
      if (delta > 5 && now - lastTrailTime.current > 50) {
        lastTrailTime.current = now
        const cursorRect = cursor!.getBoundingClientRect()
        const x = cursorRect.left + cursorRect.width / 2
        const y = cursorRect.top + cursorRect.height / 2
        createTrailParticle(x + (Math.random() - 0.5) * 20, y + (Math.random() - 0.5) * 20)
      }

      lastScrollY.current = scrollY
    }

    const onEnterInteractive = (e: Event) => {
      const target = e.currentTarget as HTMLElement
      const rect = target.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      gsap.to(cursor, {
        x: cx,
        y: cy,
        scale: 2.8,
        opacity: 0.4,
        borderColor: 'rgba(201,100,66,0.8)',
        duration: 0.35,
        ease: 'back.out(1.5)',
      })
      gsap.to(dot, { scale: 0, duration: 0.3 })
    }

    const onLeaveInteractive = () => {
      gsap.to(cursor, { scale: 1, opacity: 1, borderColor: 'rgba(201,100,66,0.6)', duration: 0.35 })
      gsap.to(dot, { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('click', spawnBurst)

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
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
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-9 h-9 rounded-full border border-terracotta/60 -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden lg:block"
        aria-hidden
      />
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-terracotta -translate-x-1/2 -translate-y-1/2 hidden lg:block"
        aria-hidden
      />
    </>
  )
}
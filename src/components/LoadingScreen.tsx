import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/useGsap'

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion()) {
      setShow(false)
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setShow(false),
      })

      // Logo stamp — scale + elastic (no blur, GPU-friendly)
      tl.fromTo(textRef.current,
        { scale: 0.3, opacity: 0, rotate: -5 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: 'elastic.out(1, 0.5)' },
      )

      // Tagline fade
      tl.fromTo('[data-load-tag]',
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
        '-=0.6',
      )

      // Progress bar
      tl.fromTo('[data-load-bar]',
        { scaleX: 0 },
        { scaleX: 1, duration: 1.0, ease: 'power2.inOut' },
        '-=0.3',
      )

      // Curtain slide up
      tl.to(containerRef.current, {
        yPercent: -100,
        duration: 0.9,
        ease: 'power4.inOut',
      }, '+=0.1')

      // Reveal main content
      gsap.to('[data-main-content]', {
        opacity: 1,
        duration: 0.6,
        delay: 0.3,
      })
    })

    return () => ctx.revert()
  }, [])

  if (!show) return null

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-ink flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <h1
          ref={textRef}
          className="font-serif text-4xl md:text-5xl text-ivory tracking-tight"
        >
          <span className="text-terracotta">&lt;</span>
          Micah
          <span className="text-terracotta"> /&gt;</span>
        </h1>
        <p data-load-tag className="mt-4 text-[11px] uppercase tracking-[0.3em] text-stone" style={{ opacity: 0 }}>
          0xC · Protocol
        </p>
      </div>
      <div className="mt-10 w-36 h-[2px] bg-ink-deep rounded-full overflow-hidden">
        <div
          data-load-bar
          className="h-full bg-gradient-to-r from-terracotta to-terracotta/40 origin-left"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>
    </div>
  )
}

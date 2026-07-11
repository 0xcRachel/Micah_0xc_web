import { useRef } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'

interface Props {
  variant?: 'warm' | 'dark' | 'gradient'
}

export default function SectionDivider({ variant = 'warm' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
          },
        })

        // Line scale in
        tl.fromTo(innerRef.current,
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 1.2, ease: 'power3.inOut', immediateRender: false },
        )

        // Glow pulse after reveal
        if (variant === 'gradient' || variant === 'warm') {
          tl.fromTo('[data-divider-glow]',
            { opacity: 0 },
            { opacity: 1, duration: 0.6, ease: 'power2.out', immediateRender: false },
            '-=0.4',
          )
        }
      }, ref)

      return () => ctx.revert()
    },
    { scope: ref, dependencies: [variant] },
  )

  const colors = {
    warm: 'from-transparent via-terracotta/20 to-transparent',
    dark: 'from-transparent via-ink/10 to-transparent',
    gradient: 'from-transparent via-terracotta/30 to-transparent',
  }

  return (
    <div ref={ref} className="flex justify-center py-6 md:py-8">
      <div className="relative w-full max-w-lg">
        <div
          ref={innerRef}
          className="h-px w-full bg-gradient-to-r rounded-full"
          style={{ background: `linear-gradient(90deg, transparent, rgba(201,100,66,0.25), transparent)`, transform: 'scaleX(0)' }}
        />
        <div
          data-divider-glow
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-12 h-8 rounded-full opacity-0 blur-xl"
          style={{ background: 'radial-gradient(ellipse, rgba(201,100,66,0.15) 0%, transparent 70%)' }}
          aria-hidden
        />
      </div>
    </div>
  )
}

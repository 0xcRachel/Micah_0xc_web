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
        // Set initial hidden state FIRST
        gsap.set(innerRef.current, { scaleX: 0, opacity: 0 })
        gsap.set('[data-divider-glow]', { opacity: 0, scale: 0.5 })

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 95%',
            end: 'top 70%',
            scrub: 0.8,
          },
        })

        // Line scale in — scrub
        tl.to(innerRef.current, {
          scaleX: 1, opacity: 1, duration: 1, ease: 'none',
        })

        // Glow — scrub
        if (variant === 'gradient' || variant === 'warm') {
          tl.to('[data-divider-glow]', {
            opacity: 1, scale: 1, duration: 0.6, ease: 'none',
          }, '-=0.3')

          // Continuous glow pulse
          gsap.to('[data-divider-glow]', {
            opacity: 0.6, scale: 1.1,
            duration: 2, ease: 'sine.inOut',
            yoyo: true, repeat: -1,
          })
        }
      }, ref)

      return () => ctx.revert()
    },
    { scope: ref, dependencies: [variant] },
  )

  return (
    <div ref={ref} className="flex justify-center py-6 md:py-8">
      <div className="relative w-full max-w-lg">
        <div
          ref={innerRef}
          className="h-px w-full rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(201,100,66,0.25), transparent)`,
            transform: 'scaleX(0)',
          }}
        />
        <div
          data-divider-glow
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-10 rounded-full opacity-0 blur-xl"
          style={{ background: 'radial-gradient(ellipse, rgba(201,100,66,0.2) 0%, transparent 70%)' }}
          aria-hidden
        />
      </div>
    </div>
  )
}
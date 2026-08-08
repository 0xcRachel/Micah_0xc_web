import { useRef } from 'react'
import { gsap, useGsapMM } from '../hooks/useGsap'

interface Props {
  variant?: 'warm' | 'dark' | 'gradient'
}

export default function SectionDivider({ variant = 'warm' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  useGsapMM(() => {
    const inner = innerRef.current
    const glow = ref.current?.querySelector('[data-divider-glow]')
    if (!inner) return

    gsap.set(inner, { scaleX: 0, opacity: 0 })
    if (glow) gsap.set(glow, { opacity: 0, scale: 0.5 })

    const tl = gsap.timeline({
      defaults: { ease: 'none', force3D: true },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 95%',
        end: 'top 70%',
        scrub: 0.8,
      },
    })

    tl.to(inner, { scaleX: 1, opacity: 1, duration: 1 })

    if (glow && (variant === 'gradient' || variant === 'warm')) {
      tl.to(glow, { opacity: 1, scale: 1, duration: 0.6 }, '-=0.3')
      gsap.to(glow, {
        opacity: 0.6, scale: 1.1,
        duration: 2, ease: 'sine.inOut',
        yoyo: true, repeat: -1, force3D: true,
      })
    }
  }, ref)

  return (
    <div ref={ref} className="flex justify-center py-6 md:py-8">
      <div className="relative w-full max-w-lg">
        <div
          ref={innerRef}
          className="h-px w-full rounded-full"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(0,224,138,0.25), transparent)`,
            transform: 'scaleX(0)',
          }}
        />
        <div
          data-divider-glow
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-10 rounded-full opacity-0 blur-xl"
          style={{ background: 'radial-gradient(ellipse, rgba(0,224,138,0.2) 0%, transparent 70%)' }}
          aria-hidden
        />
      </div>
    </div>
  )
}

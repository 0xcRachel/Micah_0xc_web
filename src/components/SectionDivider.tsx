import { useRef } from 'react'
import { gsap, useGsapMM } from '../hooks/useGsap'

interface Props {
  variant?: 'warm' | 'dark' | 'gradient'
}

/**
 * SectionDivider v1.0.0 — FeatherDivider (tự vẽ) + scaleX reveal once.
 */
export default function SectionDivider({ variant = 'warm' }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  void variant

  useGsapMM(() => {
    const line = ref.current?.querySelector('[data-divider-line]')
    const gem = ref.current?.querySelector('[data-divider-gem]')
    if (!line) return
    gsap.set(line, { scaleX: 0, opacity: 0, force3D: true })
    if (gem) gsap.set(gem, { scale: 0, opacity: 0, force3D: true })
    const tl = gsap.timeline({
      scrollTrigger: { trigger: ref.current, start: 'top 92%', once: true },
      defaults: { ease: 'power3.out', force3D: true },
    })
    tl.to(line, { scaleX: 1, opacity: 1, duration: 1 })
    if (gem) tl.to(gem, { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.8)' }, '-=0.5')
  }, ref)

  return (
    <div ref={ref} className="container-content flex items-center gap-4 py-4 md:py-6" aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-remi/50 to-remi/70" data-divider-line style={{ transformOrigin: 'right center' }} />
      <div data-divider-gem className="flex items-center gap-2.5">
        <span className="block w-8 h-px bg-gradient-to-r from-transparent to-remi-soft/60" />
        <span className="block w-2 h-2 rotate-45 bg-gradient-to-br from-remi to-remi-soft shadow-glow" />
        <span className="block w-8 h-px bg-gradient-to-l from-transparent to-remi-soft/60" />
      </div>
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-remi-soft/50 to-remi-soft/70" data-divider-line style={{ transformOrigin: 'left center' }} />
    </div>
  )
}

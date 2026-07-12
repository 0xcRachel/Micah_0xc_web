import { useRef, type ReactNode } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
  y?: number
}

export default function SectionReveal({ children, className = '', delay = 0, y = 50 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return

      // Set initial hidden state FIRST
      gsap.set(ref.current, {
        y,
        opacity: 0,
        filter: 'blur(6px)',
      })

      // Then create scrub animation
      gsap.to(ref.current, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1,
        delay,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 95%',
          end: 'top 60%',
          scrub: 0.8,
        },
      })
    },
    { scope: ref, dependencies: [] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
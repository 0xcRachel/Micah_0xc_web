import { useRef, type ReactNode } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'

interface Props {
  children: ReactNode
  className?: string
  delay?: number
}

export default function SectionReveal({ children, className = '', delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return

      gsap.fromTo(ref.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          immediateRender: false,
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    { scope: ref, dependencies: [] },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}

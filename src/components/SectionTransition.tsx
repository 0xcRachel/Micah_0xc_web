import { useRef } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'

interface Props {
  triggerRef: React.RefObject<HTMLElement>
  children: React.ReactNode
  direction?: 'up' | 'down'
}

export default function SectionTransition({ triggerRef, children, direction = 'up' }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !triggerRef.current) return

      const ctx = gsap.context(() => {
        gsap.fromTo(overlayRef.current,
          { scaleY: 1, transformOrigin: direction === 'up' ? 'bottom' : 'top' },
          {
            scaleY: 0,
            duration: 0.9,
            ease: 'power3.inOut',
            immediateRender: false,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
              onEnter: () => gsap.set(overlayRef.current, { display: 'block' }),
              onLeaveBack: () => gsap.set(overlayRef.current, { display: 'none' }),
            },
          },
        )
      }, overlayRef)

      return () => ctx.revert()
    },
    { scope: overlayRef, dependencies: [] },
  )

  return (
    <>
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-ink origin-bottom pointer-events-none z-10"
        style={{ display: 'none', transformOrigin: direction === 'up' ? 'bottom' : 'top' }}
        aria-hidden
      />
      <div className="relative z-20">{children}</div>
    </>
  )
}
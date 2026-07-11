import { useRef } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'

export default function SectionBackgroundMorph() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return

      const ctx = gsap.context(() => {
        const sections = [
          { id: 'top', color: 'transparent', start: 0, end: 1 },
          { id: 'features', color: 'rgba(245,244,237,1)', start: 0.15, end: 0.35 },
          { id: 'architecture', color: 'rgba(20,20,19,1)', start: 0.3, end: 0.55 },
          { id: 'howItWorks', color: 'rgba(245,244,237,1)', start: 0.5, end: 0.7 },
          { id: 'license', color: 'rgba(250,249,245,1)', start: 0.65, end: 0.85 },
          { id: 'download', color: 'rgba(20,20,19,1)', start: 0.8, end: 1 },
          { id: 'subscribe', color: 'rgba(245,244,237,1)', start: 0.9, end: 1 },
        ]

        sections.forEach((section, i) => {
          const el = document.getElementById(section.id)
          if (!el) return

          gsap.to(ref.current, {
            backgroundColor: section.color,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
            immediateRender: false,
          })
        })
      }, ref)

      return () => ctx.revert()
    },
    { scope: ref, dependencies: [] },
  )

  return <div ref={ref} className="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true" />
}
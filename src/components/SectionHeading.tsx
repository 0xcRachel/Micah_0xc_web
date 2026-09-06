import { useRef } from 'react'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'

interface Props {
  overline: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

/**
 * SectionHeading v1.0.0 — chống lag:
 *  - Chỉ y + opacity, trigger once (không scrub, không blur filter)
 */
export default function SectionHeading({ overline, title, subtitle, align = 'left' }: Props) {
  const root = useRef<HTMLDivElement>(null)

  useGsapMM((isMobile) => {
    const el = root.current
    if (!el) return
    const kids = markWC(el.children)
    gsap.set(el.children, { y: isMobile ? 20 : 28, opacity: 0, force3D: true })
    gsap.to(el.children, {
      y: 0,
      opacity: 1,
      duration: isMobile ? 0.6 : 0.85,
      stagger: 0.09,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onComplete: () => clearWC(kids),
    })
  }, root)

  return (
    <div ref={root} className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="overline mb-4 text-remi-soft/90">{overline}</p>
      <h2 className="font-serif text-[1.8rem] sm:text-[2.1rem] md:text-[2.6rem] leading-[1.18] text-pearl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-[1rem] md:text-[1.1rem] leading-[1.65] text-mist">{subtitle}</p>
      )}
    </div>
  )
}

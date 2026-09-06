import { useRef } from 'react'
import { gsap, useGsapMM, markWC, clearWC } from '../hooks/useGsap'

interface Props {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  stagger?: number
}

/**
 * TextReveal v1.0.0 — word mask reveal, chống lag:
 *  - y% + opacity only (bỏ rotateX gây rasterize lại)
 *  - once, không scrub
 */
export default function TextReveal({ text, className = '', tag = 'h2', delay = 0, stagger = 0.035 }: Props) {
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const elements = root.current?.querySelectorAll('[data-reveal-child]')
    if (!elements?.length) return
    const wc = markWC(elements)
    gsap.set(elements, { yPercent: 110, opacity: 0, force3D: true })
    gsap.to(elements, {
      yPercent: 0,
      opacity: 1,
      duration: isMobile ? 0.55 : 0.85,
      stagger,
      delay,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: { trigger: root.current, start: 'top 88%', once: true },
      onComplete: () => clearWC(wc),
    })
  }, root)

  const Tag = tag

  return (
    <Tag ref={root as never} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom pb-[0.08em] -mb-[0.08em]">
          <span data-reveal-child className="inline-block will-change-transform">
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}

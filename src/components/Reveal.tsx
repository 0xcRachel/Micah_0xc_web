import { useRef, type ReactNode } from 'react'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'

interface RevealProps {
  children: ReactNode
  className?: string
  /** hướng bay vào */
  from?: 'up' | 'left' | 'right' | 'scale'
  delay?: number
  y?: number
  as?: 'div' | 'article' | 'li' | 'span'
}

/**
 * Reveal v1.0.0 — reveal chuẩn toàn site, chống lag:
 *  - transform + opacity only, force3D
 *  - ScrollTrigger once (không scrub → nhẹ)
 *  - mobile: animation rút gọn
 *  - tự clear will-change sau khi xong
 */
export default function Reveal({ children, className = '', from = 'up', delay = 0, y = 36, as = 'div' }: RevealProps) {
  const root = useRef<HTMLDivElement>(null)

  useGsapMM((isMobile) => {
    const el = root.current
    if (!el) return
    const wc = markWC(el)

    const vars: Record<string, number> =
      from === 'left' ? { x: isMobile ? -20 : -48 } :
      from === 'right' ? { x: isMobile ? 20 : 48 } :
      from === 'scale' ? { scale: 0.94 } : { y: isMobile ? Math.min(y, 24) : y }

    gsap.set(el, { ...vars, opacity: 0, force3D: true })
    gsap.to(el, {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      duration: isMobile ? 0.6 : 0.9,
      delay,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        once: true,
      },
      onComplete: () => clearWC(wc),
    })
  }, root)

  const Tag = as as 'div'

  return (
    <Tag ref={root} className={className}>
      {children}
    </Tag>
  )
}

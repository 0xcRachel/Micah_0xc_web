import { useRef } from 'react'
import { gsap, useGsapMM } from '../hooks/useGsap'

interface Props {
  text: string
  className?: string
  tag?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  delay?: number
  stagger?: number
  as?: 'line' | 'word'
}

export default function TextReveal({
  text,
  className = '',
  tag = 'h2',
  delay = 0,
  stagger = 0.04,
  as = 'word',
}: Props) {
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const elements = root.current?.querySelectorAll('[data-reveal-child]')
    if (!elements?.length) return

    gsap.set(elements, { y: '120%', opacity: 0, rotateX: -50 })

    if (isMobile) {
      gsap.to(elements, {
        y: '0%', opacity: 1, rotateX: 0, duration: 0.6, stagger, ease: 'power3.out',
        delay, force3D: true,
        scrollTrigger: { trigger: root.current, start: 'top 88%', once: true },
      })
    } else {
      gsap.to(elements, {
        y: '0%', opacity: 1, rotateX: 0, duration: 1, stagger, ease: 'none',
        delay, force3D: true,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 95%',
          end: 'top 50%',
          scrub: 0.8,
        },
      })
    }
  }, root)

  const Tag = tag

  return (
    <Tag ref={root as any} className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
          <span
            data-reveal-child
            className="inline-block"
            style={{ transformOrigin: 'bottom center' }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}

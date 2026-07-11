import { useRef } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'

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

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return

      const elements = root.current.querySelectorAll('[data-reveal-child]')

      gsap.fromTo(
        elements,
        {
          y: '110%',
          opacity: 0,
          rotateX: -40,
        },
        {
          y: '0%',
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger,
          ease: 'power4.out',
          delay,
          immediateRender: false,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      )
    },
    { scope: root, dependencies: [] },
  )

  const Tag = tag

  if (as === 'line') {
    const words = text.split(' ')
    return (
      <Tag ref={root as any} className={className}>
        {words.map((word, i) => (
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

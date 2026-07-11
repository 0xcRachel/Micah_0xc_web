import { useRef } from 'react'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'

interface Props {
  text: string
  className?: string
  speed?: number
  direction?: 'left' | 'right'
  variant?: 'subtle' | 'bold'
}

export default function MarqueeText({
  text,
  className = '',
  speed = 1,
  direction = 'left',
  variant = 'subtle',
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !containerRef.current) return

      const track = containerRef.current.querySelector('[data-marquee-track]')
      if (!track) return

      const totalWidth = (track as HTMLElement).scrollWidth / 2
      const dir = direction === 'right' ? 1 : -1

      gsap.to(track, {
        x: -totalWidth * dir,
        ease: 'none',
        duration: totalWidth / (50 * speed),
        repeat: -1,
      })
    },
    { scope: containerRef, dependencies: [direction, speed] },
  )

  const repeated = Array(6).fill(text)
  const dotColor = variant === 'bold' ? 'bg-terracotta' : 'bg-terracotta/30'

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div data-marquee-track className="flex whitespace-nowrap">
        {repeated.map((t, i) => (
          <span key={i} className="flex items-center shrink-0">
            <span className={`mx-6 font-serif text-[inherit] ${variant === 'bold' ? 'opacity-8' : 'opacity-15'}`}>{t}</span>
            <span className={`w-2 h-2 rounded-full ${dotColor} shrink-0`} />
          </span>
        ))}
      </div>
    </div>
  )
}

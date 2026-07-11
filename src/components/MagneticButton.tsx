import { useRef, useState, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/useGsap'

interface Props {
  children: ReactNode
  className?: string
  strength?: number
  href?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

export default function MagneticButton({ children, className = '', strength = 0.3, href, onClick }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    if (prefersReducedMotion()) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power3.out',
    })
  }

  const handleMouseEnter = () => setIsHovered(true)

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (prefersReducedMotion()) return
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <span className="relative z-10 flex items-center gap-2.5">{children}</span>
        {isHovered && (
          <span
            className="absolute inset-0 rounded-[inherit] opacity-30 blur-xl transition-opacity duration-500 pointer-events-none"
            style={{ background: 'radial-gradient(circle at center, currentColor 0%, transparent 70%)' }}
          />
        )}
      </a>
    )
  }

  return (
    <button
      ref={ref as RefObject<HTMLButtonElement>}
      className={className}
      type="button"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
      {isHovered && (
        <span
          className="absolute inset-0 rounded-[inherit] opacity-30 blur-xl transition-opacity duration-500 pointer-events-none"
          style={{ background: 'radial-gradient(circle at center, currentColor 0%, transparent 70%)' }}
        />
      )}
    </button>
  )
}

MagneticButton.displayName = 'MagneticButton'
import { useEffect, useRef, type MouseEvent, type ReactNode, type RefObject } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/useGsap'

interface Props {
  children: ReactNode
  className?: string
  strength?: number
  href?: string
  download?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
  'aria-label'?: string
}

/**
 * MagneticButton v1.0.0 — dùng quickTo (không tạo tween mỗi mousemove → hết lag).
 * Chỉ active trên fine pointer + desktop.
 */
export default function MagneticButton({ children, className = '', strength = 0.25, href, download, onClick, ...rest }: Props) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null)
  const movers = useRef<{ x: (v: number) => void; y: (v: number) => void } | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return
    if (window.matchMedia('(pointer: coarse)').matches) return
    movers.current = {
      x: gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3.out' }),
      y: gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3.out' }),
    }
  }, [])

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const m = movers.current
    const el = ref.current
    if (!m || !el) return
    const rect = el.getBoundingClientRect()
    m.x((e.clientX - rect.left - rect.width / 2) * strength)
    m.y((e.clientY - rect.top - rect.height / 2) * strength)
  }

  const handleMouseLeave = () => {
    const m = movers.current
    const el = ref.current
    if (!m || !el) return
    m.x(0)
    m.y(0)
    gsap.fromTo(el, { scale: 1 }, { scale: 1, duration: 0.01 })
  }

  const inner = <span className="relative z-10 flex items-center gap-2.5">{children}</span>

  if (href) {
    return (
      <a
        ref={ref as RefObject<HTMLAnchorElement>}
        href={href}
        download={download}
        className={className}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        {...rest}
      >
        {inner}
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
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {inner}
    </button>
  )
}

MagneticButton.displayName = 'MagneticButton'

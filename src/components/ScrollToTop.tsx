import { useRef, useEffect } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../hooks/useGsap'
import MagneticButton from './MagneticButton'

export default function ScrollToTop() {
  const btnRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(false)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return

      const onScroll = () => {
        const shouldShow = window.scrollY > 400
        if (shouldShow === visibleRef.current) return
        visibleRef.current = shouldShow

        if (btnRef.current) {
          gsap.to(btnRef.current, {
            y: 0, opacity: 1, scale: 1,
            duration: 0.5, ease: 'back.out(1.4)',
            display: 'block',
          })
        }
      }

      const onScrollHide = () => {
        if (window.scrollY <= 400 && visibleRef.current) {
          visibleRef.current = false
          if (btnRef.current) {
            gsap.to(btnRef.current, {
              y: 20, opacity: 0, scale: 0.8,
              duration: 0.3, ease: 'power2.in',
              onComplete: () => {
                if (btnRef.current) btnRef.current.style.display = 'none'
              },
            })
          }
        }
      }

      // Initial state — hidden
      if (btnRef.current) {
        gsap.set(btnRef.current, { y: 20, opacity: 0, scale: 0.8, display: 'none' })
      }

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('scroll', onScrollHide, { passive: true })
      return () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('scroll', onScrollHide)
      }
    },
    { scope: undefined, dependencies: [] },
  )

  const scrollToTop = () => {
    if (prefersReducedMotion()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }
    gsap.to(window, { scrollTo: { y: 0, autoKill: false }, duration: 1.2, ease: 'power3.inOut' })
  }

  return (
    <div ref={btnRef} className="fixed bottom-8 right-8 z-40" style={{ display: 'none' }}>
      <MagneticButton
        onClick={scrollToTop}
        className="btn-dark w-12 h-12 p-0 justify-center"
        strength={0.2}
        aria-label="Scroll to top"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
          <path d="M18 15 12 9 6 15" />
        </svg>
      </MagneticButton>
    </div>
  )
}
import { useState } from 'react'
import { gsap, useGSAP, prefersReducedMotion } from '../hooks/useGsap'
import MagneticButton from './MagneticButton'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const onScroll = () => setVisible(window.scrollY > 400)
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      return () => window.removeEventListener('scroll', onScroll)
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

  if (!visible) return null

  return (
    <MagneticButton
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-40 btn-dark w-12 h-12 p-0 justify-center"
      strength={0.2}
      aria-label="Scroll to top"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="rotate-180">
        <path d="M18 15 12 9 6 15" />
      </svg>
    </MagneticButton>
  )
}
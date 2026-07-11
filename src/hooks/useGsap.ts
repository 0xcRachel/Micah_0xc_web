import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

// Global defaults
gsap.defaults({
  overwrite: 'auto',
})

export { gsap, ScrollTrigger, useGSAP }

/**
 * Respect prefers-reduced-motion: when set, animations are skipped so
 * content is shown immediately.
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

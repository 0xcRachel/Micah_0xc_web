import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import type { RefObject } from 'react'

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin)

// Global defaults
gsap.defaults({
  overwrite: 'auto',
  force3D: true,
})

// Ignore mobile browser chrome (URL bar) resize events → prevents layout thrash
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger, ScrollToPlugin, useGSAP }

/**
 * Respect prefers-reduced-motion: when set, animations are skipped so
 * content is shown immediately.
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Mark targets for GPU compositing (`will-change: transform, opacity`)
 * BEFORE they start moving. Returns the element list for cleanup.
 */
export const markWC = (targets: gsap.TweenTarget, scope?: Element): HTMLElement[] => {
  const els = gsap.utils.toArray(targets, scope) as HTMLElement[]
  els.forEach((el) => {
    el.style.willChange = 'transform, opacity'
  })
  return els
}

/**
 * Release compositing layers after animation completes — prevents VRAM leaks.
 */
export const clearWC = (els: HTMLElement[]) => {
  els.forEach((el) => {
    el.style.willChange = ''
  })
}

type MMScope = RefObject<HTMLElement | null>

/**
 * React hook wrapper around `gsap.matchMedia()`.
 *
 * - Runs a lightweight `setup(true)` on mobile (< 768px) and a richer
 *   `setup(false)` on desktop.
 * - Selectors inside `setup` are scoped to the section root.
 * - Everything is auto-reverted when the media state changes or on unmount.
 * - Skipped entirely under `prefers-reduced-motion`, leaving content visible.
 */
export function useGsapMM(
  setup: (isMobile: boolean) => void,
  scope: MMScope,
  deps: unknown[] = [],
) {
  useGSAP(
    () => {
      if (prefersReducedMotion() || !scope.current) return
      const mm = gsap.matchMedia()
      // NOTE: created inside useGSAP → inherits the context scope, so string
      // selectors inside `setup` resolve relative to the section root.
      mm.add('(max-width: 767px)', () => setup(true))
      mm.add('(min-width: 768px)', () => setup(false))
      return () => mm.revert()
    },
    { scope, dependencies: deps },
  )
}

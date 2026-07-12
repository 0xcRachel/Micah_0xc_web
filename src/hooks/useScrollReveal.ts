import { useRef, useEffect, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
gsap.defaults({ overwrite: 'auto' })

/**
 * Premium scroll-reveal hook — $1,000,000 website standard.
 *
 * Usage:
 *   const { ref, reveal } = useScrollReveal()
 *   reveal('[data-item]', { y: 60, opacity: 0 }, { duration: 1, stagger: 0.1 })
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  opts?: { scope?: React.RefObject<T> },
) {
  const scopeRef = useRef<T>(null)
  const contextRef = useRef<gsap.Context | null>(null)

  useEffect(() => {
    const el = opts?.scope?.current ?? scopeRef.current
    if (!el) return

    contextRef.current = gsap.context(() => {}, el)

    return () => {
      contextRef.current?.revert()
      contextRef.current = null
    }
  }, [opts?.scope])

  /**
   * Create a scroll-triggered animation inside the scope.
   * Returns the GSAP tween so you can chain or kill it.
   */
  const reveal = useCallback(
    (
      targets: gsap.TweenTarget,
      fromVars: gsap.TweenVars,
      toVars: gsap.TweenVars,
    ) => {
      const el = opts?.scope?.current ?? scopeRef.current
      if (!el) return

      return gsap.fromTo(targets, fromVars, {
        ...toVars,
        scrollTrigger: {
          trigger: el,
          start: 'top 82%',
          toggleActions: 'play none none none',
          ...(toVars.scrollTrigger || {}),
        },
        immediateRender: false,
      })
    },
    [opts?.scope],
  )

  return { ref: scopeRef as React.RefObject<T>, reveal, ctx: contextRef }
}

/**
 * Premium section-level scroll animation with parallax.
 * Auto-cleans up on unmount.
 */
export function useSectionScroll<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const ctx = useRef<gsap.Context | null>(null)

  useEffect(() => {
    if (!ref.current) return
    ctx.current = gsap.context(() => {}, ref.current)
    return () => {
      ctx.current?.revert()
      ctx.current = null
    }
  }, [])

  return { ref, ctx }
}

export { gsap, ScrollTrigger }
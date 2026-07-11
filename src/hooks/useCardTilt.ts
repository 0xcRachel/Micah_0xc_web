import { useEffect, useRef } from 'react'
import { gsap, prefersReducedMotion } from './useGsap'

interface Options {
  intensity?: number
  scale?: number
}

export function useCardTilt<T extends HTMLElement = HTMLDivElement>(options: Options = {}) {
  const { intensity = 8, scale = 1.02 } = options
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || prefersReducedMotion()) return

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5

      gsap.to(el, {
        rotateY: x * intensity,
        rotateX: -y * intensity * 0.75,
        scale,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 600,
      })
    }

    const onLeave = () => {
      gsap.to(el, {
        rotateY: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.6,
        ease: 'elastic.out(1, 0.5)',
      })
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [intensity, scale])

  return ref
}

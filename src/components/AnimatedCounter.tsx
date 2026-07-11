import { useRef, useEffect, useState } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/useGsap'

interface Props {
  value: string
  className?: string
}

export default function AnimatedCounter({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (prefersReducedMotion() || animated.current) {
      setDisplay(value)
      return
    }

    const el = ref.current
    if (!el) return

    const numMatch = value.match(/^(\d+)/)
    if (!numMatch) {
      setDisplay(value)
      return
    }

    animated.current = true
    const target = parseInt(numMatch[1], 10)
    const suffix = value.slice(numMatch[1].length)
    const obj = { val: 0 }

    gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: 'power2.out',
      delay: 0.6,
      onUpdate: () => {
        setDisplay(`${Math.round(obj.val)}${suffix}`)
      },
    })

    return () => {
      gsap.killTweensOf(obj)
    }
  }, [])

  useEffect(() => {
    if (animated.current) setDisplay(value)
  }, [value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}

import { useRef, useEffect, useState } from 'react'
import { gsap, ScrollTrigger, prefersReducedMotion } from '../hooks/useGsap'

interface Props {
  value: string
  className?: string
}

export default function AnimatedCounter({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const animated = useRef(false)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    if (prefersReducedMotion() || animated.current || !ref.current) {
      setDisplay(value)
      return
    }

    const numMatch = value.match(/^(\d+)/)
    if (!numMatch) {
      setDisplay(value)
      return
    }

    const target = parseInt(numMatch[1], 10)
    const suffix = value.slice(numMatch[1].length)
    const obj = { val: 0 }

    // Scrub-triggered counter — counts up as you scroll to it
    const tween = gsap.to(obj, {
      val: target,
      duration: 1,
      ease: 'none',
      onUpdate: () => {
        setDisplay(`${Math.round(obj.val)}${suffix}`)
      },
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        end: 'top 50%',
        scrub: 0.8,
        onEnter: () => { animated.current = true },
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      gsap.killTweensOf(obj)
    }
  }, [value])

  useEffect(() => {
    if (animated.current) setDisplay(value)
  }, [value])

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
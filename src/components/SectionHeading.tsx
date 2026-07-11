import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'
import { useRef } from 'react'

interface Props {
  overline: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  variant?: 'light' | 'dark'
}

export default function SectionHeading({
  overline,
  title,
  subtitle,
  align = 'left',
  variant = 'light',
}: Props) {
  const root = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return
      const ctx = gsap.context(() => {
        // Stagger reveal
        gsap.fromTo(root.current!.children,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: root.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          },
        )

        // Title color morph — from ink to terracotta on scroll
        if (titleRef.current && variant === 'light') {
          gsap.fromTo(titleRef.current,
            { color: '#141413' },
            {
              color: '#c96442',
              duration: 1,
              ease: 'none',
              immediateRender: false,
              scrollTrigger: {
                trigger: root.current,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 0.5,
              },
            },
          )
        }
      }, root)
      return () => ctx.revert()
    },
    { scope: root, dependencies: [variant] },
  )

  const isDark = variant === 'dark'

  return (
    <div
      ref={root}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <p className={`overline mb-4 ${isDark ? '!text-silver' : ''}`}>{overline}</p>
      <h2
        ref={titleRef}
        className={`font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] ${
          isDark ? 'text-ivory' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-[1rem] md:text-[1.125rem] leading-[1.6] ${
            isDark ? 'text-silver' : 'text-olive'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}

import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'
import { useCardTilt } from '../hooks/useCardTilt'
import TextReveal from './TextReveal'
import { featureIcons } from './icons'

function FeatureCard({ item, index }: { item: { title: string; body: string }; index: number }) {
  const tiltRef = useCardTilt<HTMLDivElement>()
  const glowRef = useRef<HTMLDivElement>(null)
  const Icon = featureIcons[index % featureIcons.length]

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = tiltRef.current
    const glow = glowRef.current
    if (!card || !glow) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    gsap.to(glow, {
      x: x - 100,
      y: y - 100,
      duration: 0.6,
      ease: 'power2.out',
    })
  }

  return (
    <article
      ref={tiltRef}
      data-feature-card
      className="card group relative overflow-hidden cursor-default"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
    >
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 w-52 h-52 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(201,100,66,0.12) 0%, transparent 70%)' }}
      />

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-terracotta/[0.04] via-transparent to-transparent" />

      <div className="relative z-10">
        <div className="w-12 h-12 rounded-generous bg-sand flex items-center justify-center text-terracotta mb-6 transition-all duration-500 group-hover:bg-terracotta group-hover:text-ivory group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-terracotta/20">
          <Icon />
        </div>
        <h3 className="font-serif text-[1.35rem] leading-[1.2] text-ink group-hover:text-terracotta transition-colors duration-300">
          {item.title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-[1.7] text-olive">{item.body}</p>

        <div className="mt-5 h-px bg-gradient-to-r from-terracotta/0 via-terracotta/20 to-terracotta/0 group-hover:via-terracotta/50 transition-all duration-500" />
      </div>
    </article>
  )
}

export default function Features() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const ctx = gsap.context(() => {
        gsap.fromTo('[data-feature-card]',
          { y: 60, opacity: 0, rotateX: -8, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '[data-feature-grid]',
              start: 'top 82%',
              toggleActions: 'play none none none',
            },
          },
        )
      }, root)
      return () => ctx.revert()
    },
    { scope: root, dependencies: [] },
  )

  return (
    <section ref={root} id="features" className="section-y relative">
      <div className="absolute inset-0 opacity-[0.015] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #141413 1px, transparent 0)', backgroundSize: '32px 32px' }} />

      <div className="container-content relative">
        <TextReveal
          text={t.features.title}
          tag="h2"
          className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] text-ink max-w-2xl"
          stagger={0.03}
        />
        <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.7] text-olive max-w-2xl">
          {t.features.subtitle}
        </p>

        <div
          data-feature-grid
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '1200px' }}
        >
          {t.features.items.map((item, i) => (
            <FeatureCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
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
    gsap.to(glow, { x: x - 120, y: y - 120, duration: 0.5, ease: 'power2.out', force3D: true })
  }

  return (
    <article
      ref={tiltRef}
      data-feature-card
      className="card group relative overflow-hidden cursor-default"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(0,224,138,0.15) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-led/[0.06] via-transparent to-transparent" />
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-generous bg-white/[0.06] flex items-center justify-center text-led mb-6 transition-all duration-500 group-hover:bg-led group-hover:text-cyber group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-led/25">
          <Icon />
        </div>
        <h3 className="font-serif text-[1.3rem] leading-[1.2] text-ivory group-hover:text-led transition-colors duration-300">
          {item.title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-[1.7] text-silver/80">{item.body}</p>
        <div className="mt-5 h-px bg-gradient-to-r from-led/0 via-led/20 to-led/0 group-hover:via-led/50 transition-all duration-500" />
      </div>
    </article>
  )
}

export default function Features() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-feature-card]')
    if (!cards.length) return
    const wc = markWC(cards)

    if (isMobile) {
      gsap.set(cards, { y: 36, opacity: 0 })
      gsap.to(cards, {
        y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'power3.out', force3D: true,
        onComplete: () => clearWC(wc),
      })
    } else {
      gsap.set(cards, { y: 70, opacity: 0, scale: 0.95 })
      gsap.to(cards, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.1, ease: 'power3.out', force3D: true,
        scrollTrigger: {
          trigger: '[data-feature-grid]',
          start: 'top 85%',
          end: 'top 55%',
          scrub: 1,
          onLeave: () => clearWC(wc),
          onEnterBack: () => cards.forEach((c) => { c.style.willChange = 'transform, opacity' }),
        },
      })
    }
  }, root)

  return (
    <section ref={root} id="features" className="section-y relative">
      <div className="container-content relative">
        <TextReveal
          text={t.features.title}
          tag="h2"
          className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] text-ivory max-w-2xl"
          stagger={0.03}
        />
        <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.7] text-silver/80 max-w-2xl">
          {t.features.subtitle}
        </p>

        <div
          data-feature-grid
          className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
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

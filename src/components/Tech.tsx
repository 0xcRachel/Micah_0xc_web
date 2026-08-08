import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
import TextReveal from './TextReveal'
import { ChipIcon } from './icons'

export default function Tech() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-tech-card]')
    if (!cards.length) return
    const wc = markWC(cards)

    if (isMobile) {
      gsap.set(cards, { y: 30, opacity: 0 })
      gsap.to(cards, {
        y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out', force3D: true,
        scrollTrigger: { trigger: '[data-tech-grid]', start: 'top 85%', once: true },
        onComplete: () => clearWC(wc),
      })
    } else {
      gsap.set(cards, { y: 50, opacity: 0, scale: 0.94 })
      gsap.to(cards, {
        y: 0, opacity: 1, scale: 1,
        duration: 1, stagger: 0.1, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: '[data-tech-grid]',
          start: 'top 90%',
          end: 'top 60%',
          scrub: 0.8,
          onLeave: () => clearWC(wc),
          onEnterBack: () => cards.forEach((c) => { c.style.willChange = 'transform, opacity' }),
        },
      })
    }
  }, root)

  return (
    <section ref={root} id="tech" className="section-dark section-y relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      <div className="pointer-events-none absolute -top-32 right-1/4 h-80 w-80 rounded-full opacity-15 blur-[90px]" style={{ background: 'radial-gradient(circle, #00e08a 0%, transparent 70%)' }} aria-hidden />

      <div className="container-content relative">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <TextReveal
              text={t.tech.title}
              tag="h2"
              className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] text-ivory max-w-2xl"
              stagger={0.03}
            />
            <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.7] text-silver max-w-2xl">
              {t.tech.subtitle}
            </p>
          </div>
          <span className="hidden lg:inline-flex items-center gap-2.5 text-silver border border-ink-deep rounded-generous px-5 py-2.5 mb-1">
            <ChipIcon className="text-led" width={18} height={18} />
            <span className="font-mono text-[0.8rem]">v{`${t.tech.items[5].value}`}</span>
          </span>
        </div>

        <div data-tech-grid className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: '1200px' }}>
          {t.tech.items.map((item, i) => (
            <div
              key={i}
              data-tech-card
              className="group relative rounded-very border border-ink-deep bg-ink-deep/40 p-6 transition-all duration-500 hover:border-led/40 hover:shadow-[0_0_30px_rgba(0,224,138,0.12)] hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-silver/60">{item.label}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-led/40 group-hover:bg-led group-hover:shadow-[0_0_10px_rgba(0,224,138,0.8)] transition-all duration-500" />
              </div>
              <div className="mt-3 font-serif text-[1.35rem] leading-[1.2] text-ivory group-hover:text-led transition-colors duration-300">
                {item.value}
              </div>
              <p className="mt-2 text-[0.875rem] leading-[1.6] text-silver">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

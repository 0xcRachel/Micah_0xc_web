import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
import TextReveal from './TextReveal'
import { ShieldIcon, LockIcon, ActivityIcon, GithubIcon } from './icons'

const SECURITY_ICONS = [ActivityIcon, ShieldIcon, LockIcon, GithubIcon]

export default function Security() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-sec-card]')
    const commitment = markWC('[data-sec-commitment]', root.current!)
    const wc = markWC(cards)

    if (isMobile) {
      gsap.set(cards, { y: 30, opacity: 0 })
      gsap.to(cards, {
        y: 0, opacity: 1, duration: 0.55, stagger: 0.06, ease: 'power3.out', force3D: true,
        scrollTrigger: { trigger: '[data-sec-grid]', start: 'top 85%', once: true },
        onComplete: () => clearWC(wc),
      })
      gsap.fromTo(commitment, { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', force3D: true,
        scrollTrigger: { trigger: commitment, start: 'top 88%', once: true },
        onComplete: () => clearWC(commitment),
      })
    } else {
      gsap.set(cards, { y: 50, opacity: 0, scale: 0.95 })
      gsap.to(cards, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: '[data-sec-grid]',
          start: 'top 90%',
          end: 'top 55%',
          scrub: 0.8,
          onLeave: () => clearWC(wc),
          onEnterBack: () => cards.forEach((c) => { c.style.willChange = 'transform, opacity' }),
        },
      })
      gsap.fromTo(commitment, { opacity: 0, y: 30, scale: 0.96 }, {
        opacity: 1, y: 0, scale: 1, duration: 1, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: commitment,
          start: 'top 96%',
          end: 'top 82%',
          scrub: 0.8,
          onLeave: () => clearWC(commitment),
        },
      })
    }
  }, root)

  return (
    <section ref={root} id="security" className="section-y relative">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <TextReveal
              text={t.security.title}
              tag="h2"
              className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] text-ivory"
              stagger={0.03}
            />
            <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.7] text-silver/80 max-w-md">
              {t.security.subtitle}
            </p>
            <div data-sec-commitment className="mt-8 inline-flex items-start gap-3 rounded-very border border-white/10 bg-white/[0.03] backdrop-blur-sm px-5 py-4 max-w-md">
              <ShieldIcon className="text-led shrink-0 mt-0.5" width={18} height={18} />
              <p className="text-[0.875rem] leading-[1.7] text-silver/80">{t.security.commitment}</p>
            </div>
          </div>

          <div data-sec-grid className="grid grid-cols-1 sm:grid-cols-2 gap-5" style={{ perspective: '1200px' }}>
            {t.security.items.map((item, i) => {
              const Icon = SECURITY_ICONS[i % SECURITY_ICONS.length]
              return (
                <article
                  key={i}
                  data-sec-card
                  className="card group relative overflow-hidden"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-led/[0.06] via-transparent to-transparent" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-generous bg-white/[0.06] flex items-center justify-center text-led mb-6 transition-all duration-500 group-hover:bg-led group-hover:text-cyber group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-led/25">
                      <Icon />
                    </div>
                    <h3 className="font-serif text-[1.2rem] leading-[1.2] text-ivory group-hover:text-led transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[0.9rem] leading-[1.7] text-silver/70">{item.body}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

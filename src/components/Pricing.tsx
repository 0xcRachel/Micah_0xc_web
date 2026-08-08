import { useRef } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
import TextReveal from './TextReveal'
import MagneticButton from './MagneticButton'
import { CheckIcon, GithubIcon, DownloadIcon } from './icons'

export default function Pricing() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const cards = gsap.utils.toArray<HTMLElement>('[data-price-card]')
    if (!cards.length) return
    const wc = markWC(cards)

    if (isMobile) {
      gsap.set(cards, { y: 30, opacity: 0 })
      gsap.to(cards, {
        y: 0, opacity: 1, duration: 0.55, stagger: 0.07, ease: 'power3.out', force3D: true,
        scrollTrigger: { trigger: '[data-price-grid]', start: 'top 85%', once: true },
        onComplete: () => clearWC(wc),
      })
    } else {
      gsap.set(cards, { y: 60, opacity: 0, scale: 0.92 })
      gsap.to(cards, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.15, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: '[data-price-grid]',
          start: 'top 90%',
          end: 'top 55%',
          scrub: 0.8,
          onLeave: () => clearWC(wc),
          onEnterBack: () => cards.forEach((c) => { c.style.willChange = 'transform, opacity' }),
        },
      })
    }
  }, root)

  return (
    <section ref={root} id="pricing" className="section-y relative overflow-hidden">
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-[42rem] max-w-full rounded-full opacity-[0.07] blur-[110px]" style={{ background: 'radial-gradient(circle, #00e08a 0%, transparent 70%)' }} aria-hidden />
      <div className="container-content relative">
        <div className="max-w-2xl mx-auto text-center">
          <TextReveal
            text={t.pricing.title}
            tag="h2"
            className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] text-ivory"
            stagger={0.03}
          />
          <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.7] text-silver/80">
            {t.pricing.subtitle}
          </p>
        </div>

        <div data-price-grid className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" style={{ perspective: '1200px' }}>
          {t.pricing.plans.map((plan, i) => (
            <article
              key={i}
              data-price-card
              className={`relative rounded-very p-8 flex flex-col transition-all duration-500 hover:-translate-y-1.5 ${
                plan.highlighted
                  ? 'bg-ink text-ivory border border-led/40 shadow-[0_0_50px_rgba(0,224,138,0.14)]'
                  : 'card'
              }`}
              style={plan.highlighted ? undefined : { transformStyle: 'preserve-3d' }}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-ink bg-led rounded-full px-4 py-1 font-semibold">
                  {t.pricing.overline}
                </span>
              )}
              <h3 className={`font-serif text-[1.35rem] ${plan.highlighted ? 'text-ivory' : 'text-ivory'}`}>{plan.name}</h3>
              <div className="mt-4 flex items-end gap-2">
                <span className={`font-serif text-4xl ${plan.highlighted ? 'text-led' : 'text-ivory'}`}>{plan.price}</span>
                <span className={`text-[0.85rem] pb-1 ${plan.highlighted ? 'text-silver' : 'text-silver/60'}`}>{plan.period}</span>
              </div>
              <p className={`mt-3 text-[0.95rem] leading-[1.7] ${plan.highlighted ? 'text-silver' : 'text-silver/70'}`}>
                {plan.description}
              </p>
              <ul className="mt-6 space-y-3 flex-1">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-3 text-[0.9rem]">
                    <span className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-led' : 'text-led'}`}>
                      <CheckIcon width={15} height={15} />
                    </span>
                    <span className={plan.highlighted ? 'text-ivory' : 'text-silver/80'}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                {plan.highlighted ? (
                  <MagneticButton href={config.REPO_URL} className="btn-led w-full justify-center" strength={0.15}>
                    <GithubIcon width={16} height={16} />
                    {plan.cta}
                  </MagneticButton>
                ) : (
                  <MagneticButton href={config.DOWNLOAD_URL} className="btn-sand w-full justify-center" strength={0.15}>
                    <DownloadIcon width={16} height={16} />
                    {plan.cta}
                  </MagneticButton>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
import TextReveal from './TextReveal'
import { ChevronDownIcon } from './icons'

export default function FAQ() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)
  const [open, setOpen] = useState<number | null>(0)

  useGsapMM((isMobile) => {
    const items = gsap.utils.toArray<HTMLElement>('[data-faq-item]')
    if (!items.length) return
    const wc = markWC(items)

    if (isMobile) {
      gsap.set(items, { y: 24, opacity: 0 })
      gsap.to(items, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out', force3D: true,
        scrollTrigger: { trigger: '[data-faq-list]', start: 'top 85%', once: true },
        onComplete: () => clearWC(wc),
      })
    } else {
      gsap.set(items, { y: 40, opacity: 0 })
      gsap.to(items, {
        y: 0, opacity: 1, duration: 0.9, stagger: 0.08, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: '[data-faq-list]',
          start: 'top 94%',
          end: 'top 55%',
          scrub: 0.8,
          onLeave: () => clearWC(wc),
          onEnterBack: () => items.forEach((el) => { el.style.willChange = 'transform, opacity' }),
        },
      })
    }
  }, root)

  return (
    <section ref={root} id="faq" className="section-y relative">
      <div className="container-content">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-14 items-start">
          <div className="lg:sticky lg:top-28">
            <TextReveal
              text={t.faq.title}
              tag="h2"
              className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] text-ivory"
              stagger={0.03}
            />
            <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.7] text-silver/80 max-w-md">
              {t.faq.subtitle}
            </p>
          </div>

          <div data-faq-list className="space-y-3">
            {t.faq.items.map((item, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  data-faq-item
                  className={`rounded-very border transition-all duration-500 overflow-hidden backdrop-blur-sm ${
                    isOpen
                      ? 'border-led/40 bg-white/[0.05] shadow-[0_0_30px_rgba(0,224,138,0.08)]'
                      : 'border-white/10 bg-white/[0.03] hover:border-white/20'
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                    aria-expanded={isOpen}
                  >
                    <span className="font-serif text-[1.05rem] leading-[1.3] text-ivory">{item.q}</span>
                    <span
                      className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isOpen ? 'bg-led text-ink rotate-180' : 'bg-white/[0.06] text-silver/60'
                      }`}
                    >
                      <ChevronDownIcon width={16} height={16} />
                    </span>
                  </button>
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-out"
                    style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-5 text-[0.95rem] leading-[1.7] text-silver/70">{item.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

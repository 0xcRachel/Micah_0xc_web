import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'

const DOTS = ['#FF7EB6', '#FFB9D5', '#FFF8F1', '#E14E8F']

export default function SocialProof() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const el = root.current
    if (!el) return
    const wc = markWC(el)
    gsap.set(el, { y: isMobile ? 12 : 16, opacity: 0, force3D: true })
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: isMobile ? 0.5 : 0.6,
      ease: 'power2.out',
      force3D: true,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      onComplete: () => clearWC(wc),
    })
    // stagger pills nhẹ
    const pills = el.querySelectorAll('[data-proof-pill]')
    if (pills.length) {
      gsap.set(pills, { y: 8, opacity: 0 })
      gsap.to(pills, {
        y: 0,
        opacity: 1,
        duration: 0.45,
        stagger: 0.06,
        ease: 'power2.out',
        delay: 0.15,
        force3D: true,
      })
    }
  }, root)

  return (
    <section ref={root} className="relative border-y border-white/10 bg-white/[0.02] py-8 md:py-10 overflow-hidden">
      <div className="container-content text-center">
        <p className="overline text-white/45 tracking-[0.2em] mb-5">{t.socialProof.title}</p>

        {/* pills — căn giữa hoàn toàn, không marquee để hết lệch */}
        <div className="flex flex-wrap justify-center items-center gap-2.5 md:gap-3 max-w-3xl mx-auto">
          {t.socialProof.items.map((item, i) => (
            <span
              key={i}
              data-proof-pill
              className="inline-flex items-center gap-2 whitespace-nowrap text-[11px] uppercase tracking-[0.16em] text-mist rounded-full border border-white/10 bg-white/[0.04] backdrop-blur px-3.5 py-2 hover:border-remi/20 hover:bg-white/[0.06] transition-colors"
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: DOTS[i % DOTS.length], boxShadow: `0 0 8px ${DOTS[i % DOTS.length]}66` }}
              />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'

export default function SocialProof() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const items = gsap.utils.toArray<HTMLElement>('[data-proof-item]')
    if (!items.length) return
    const wc = markWC(items)

    if (isMobile) {
      gsap.set(items, { y: 16, opacity: 0 })
      gsap.to(items, {
        y: 0, opacity: 1, duration: 0.45, stagger: 0.04, ease: 'power3.out', force3D: true,
        scrollTrigger: { trigger: root.current, start: 'top 90%', once: true },
        onComplete: () => clearWC(wc),
      })
    } else {
      gsap.set(items, { y: 24, opacity: 0, scale: 0.9 })
      gsap.to(items, {
        y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.08, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 98%',
          end: 'top 80%',
          scrub: 0.8,
          onLeave: () => clearWC(wc),
          onEnterBack: () => items.forEach((el) => { el.style.willChange = 'transform, opacity' }),
        },
      })
    }
  }, root)

  return (
    <section ref={root} className="relative border-y border-white/10 bg-white/[0.02] py-12 overflow-hidden">
      <div className="container-content relative flex flex-wrap items-center justify-center gap-3">
        {t.socialProof.items.map((item, i) => (
          <span
            key={i}
            data-proof-item
            className="inline-flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-silver/70 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur px-4 py-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-led shadow-[0_0_8px_rgba(0,224,138,0.6)]" />
            {item}
          </span>
        ))}
      </div>
    </section>
  )
}

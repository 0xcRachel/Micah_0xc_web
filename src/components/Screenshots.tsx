import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
import TextReveal from './TextReveal'
import { ScreenshotIcon } from './icons'

export default function Screenshots() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const section = root.current!
    const wc = markWC('[data-shot]', section)

    if (isMobile) {
      const cards = gsap.utils.toArray<HTMLElement>('[data-shot-mobile] [data-shot]')
      if (!cards.length) return
      gsap.set(cards, { y: 30, opacity: 0 })
      gsap.to(cards, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', force3D: true,
        scrollTrigger: { trigger: section, start: 'top 82%', once: true },
        onComplete: () => clearWC(wc),
      })
    } else {
      const track = section.querySelector<HTMLElement>('[data-shot-track]')
      if (!track) return
      const distance = () => track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -distance(),
        ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => '+=' + distance() * 1.2,
          scrub: 1,
          pin: section,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeave: () => clearWC(wc),
        },
      })
    }
  }, root)

  return (
    <section ref={root} id="screenshots" className="section-y relative overflow-hidden">
      {/* ═══ Desktop horizontal gallery ═══ */}
      <div className="hidden lg:block">
        <div className="container-content relative">
          <TextReveal
            text={t.screenshots.title}
            tag="h2"
            className="font-serif text-[2rem] md:text-[2.5rem] leading-[1.2] text-ivory max-w-2xl"
            stagger={0.03}
          />
          <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.7] text-silver/80 max-w-2xl">
            {t.screenshots.subtitle}
          </p>
        </div>

        <div data-shot-track className="mt-16 flex items-center gap-8 px-[10vw] will-change-transform">
          {t.screenshots.items.map((item, i) => (
            <ScreenshotCard key={i} item={item} />
          ))}
        </div>
      </div>

      {/* ═══ Mobile stacked gallery ═══ */}
      <div data-shot-mobile className="lg:hidden">
        <div className="container-content relative">
          <TextReveal
            text={t.screenshots.title}
            tag="h2"
            className="font-serif text-[1.75rem] leading-[1.2] text-ivory"
            stagger={0.03}
          />
          <p className="mt-4 text-[1rem] leading-[1.7] text-silver/80">
            {t.screenshots.subtitle}
          </p>
          <div className="mt-10 grid grid-cols-1 gap-6">
            {t.screenshots.items.map((item, i) => (
              <ScreenshotCard key={i} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ScreenshotCard({ item }: { item: { title: string; caption: string } }) {
  return (
    <figure data-shot className="card shrink-0 w-[320px] md:w-[400px] lg:w-[440px] overflow-hidden">
      <div className="relative aspect-[16/10] bg-[#0a0f0d] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <ScreenshotIcon className="w-16 h-16 text-led/40" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-cyber to-transparent" />
      </div>
      <figcaption className="p-5">
        <h3 className="font-serif text-[1.15rem] text-ivory">{item.title}</h3>
        <p className="mt-2 text-[0.9rem] leading-[1.65] text-silver/70">{item.caption}</p>
      </figcaption>
    </figure>
  )
}

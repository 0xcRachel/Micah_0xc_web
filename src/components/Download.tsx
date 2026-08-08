import { useRef } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
import { DownloadIcon } from './icons'
import MagneticButton from './MagneticButton'

export default function Download() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useGsapMM((isMobile) => {
    const container = markWC('[data-dl-container]', root.current!)
    const anims = markWC('[data-dl-anim]', root.current!)

    if (isMobile) {
      gsap.set(container, { y: 36, opacity: 0, scale: 0.96 })
      gsap.set(anims, { y: 20, opacity: 0 })
      gsap.to(container, {
        y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'power3.out', force3D: true,
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      })
      gsap.to(anims, {
        y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out', force3D: true,
        scrollTrigger: { trigger: root.current, start: 'top 82%', once: true },
        onComplete: () => clearWC([...container, ...anims]),
      })
    } else {
      gsap.set(container, { y: 60, opacity: 0, scale: 0.92 })
      gsap.set(anims, { y: 30, opacity: 0 })
      gsap.to(container, {
        y: 0, opacity: 1, scale: 1, duration: 1, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 95%',
          end: 'top 60%',
          scrub: 0.8,
          onLeave: () => clearWC(container),
        },
      })
      gsap.to(anims, {
        y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 90%',
          end: 'top 55%',
          scrub: 0.8,
          onLeave: () => clearWC(anims),
          onEnterBack: () => anims.forEach((el) => { el.style.willChange = 'transform, opacity' }),
        },
      })
    }

    // Glow breathing — tiny element, transform/opacity only
    if (glowRef.current && !isMobile) {
      gsap.to(glowRef.current, {
        scale: 1.2, opacity: 0.4, duration: 4,
        ease: 'sine.inOut', yoyo: true, repeat: -1, force3D: true,
      })
    }
  }, root)

  const comingSoon = config.DOWNLOAD_COMING_SOON

  return (
    <section ref={root} id="download" className="section-y">
      <div className="container-content">
        <div data-dl-container className="relative overflow-hidden rounded-max bg-ink text-ivory px-6 py-14 md:px-16 md:py-24 border border-white/10">
          <div ref={glowRef} className="pointer-events-none absolute -top-24 -right-12 h-96 w-96 rounded-full opacity-30 blur-[80px]" style={{ background: 'radial-gradient(circle, #00e08a 0%, transparent 70%)' }} aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full opacity-20 blur-[60px]" style={{ background: 'radial-gradient(circle, #4dffb5 0%, transparent 70%)' }} aria-hidden />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full opacity-15 blur-[50px]" style={{ background: 'radial-gradient(circle, #34d3ee 0%, transparent 70%)' }} aria-hidden />

          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative max-w-2xl">
            <p data-dl-anim className="overline !text-silver mb-4 !tracking-[0.2em]">
              {t.download.overline}
            </p>
            <h2 data-dl-anim className="font-serif text-[2rem] sm:text-[2.5rem] md:text-[3rem] leading-[1.1] text-ivory">
              {t.download.title}
            </h2>
            <p data-dl-anim className="mt-5 text-[1.0625rem] leading-[1.7] text-silver max-w-xl">
              {t.download.subtitle}
            </p>

            <div data-dl-anim className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton href={config.DOWNLOAD_URL} className="btn-led text-base !px-7 !py-3.5" strength={0.2}>
                <DownloadIcon />
                {t.download.cta}
                <span className="ml-1 text-[12px] opacity-80 font-normal">· {t.download.size}</span>
              </MagneticButton>
              <span className="text-[0.875rem] text-silver/60">
                {t.hero.versionLabel}{' '}
                <span className="font-mono text-silver">v{config.VERSION}</span>
              </span>
            </div>

            {comingSoon && (
              <p data-dl-anim className="mt-6 text-[0.875rem] text-led flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-led animate-pulse" />
                {t.download.comingSoon}
              </p>
            )}
            <p data-dl-anim className="mt-2 text-[0.8rem] text-silver/50">
              {t.download.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

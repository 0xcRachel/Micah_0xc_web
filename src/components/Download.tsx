import { useRef } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'
import { DownloadIcon } from './icons'
import MagneticButton from './MagneticButton'

export default function Download() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return

      const ctx = gsap.context(() => {
        // Set initial hidden state FIRST
        gsap.set('[data-dl-container]', { y: 60, opacity: 0, scale: 0.92, filter: 'blur(8px)' })
        gsap.set(root.current!.querySelectorAll('[data-dl-anim]'), { y: 30, opacity: 0, filter: 'blur(4px)' })

        // ═══ Container reveal — scrub ═══
        gsap.to('[data-dl-container]', {
          y: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 1, ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 95%',
            end: 'top 60%',
            scrub: 0.8,
          },
        })

        // ═══ Content stagger — scrub ═══
        gsap.to(root.current!.querySelectorAll('[data-dl-anim]'), {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 1, stagger: 0.08, ease: 'none', delay: 0.2,
          scrollTrigger: {
            trigger: root.current,
            start: 'top 90%',
            end: 'top 55%',
            scrub: 0.8,
          },
          },
        )

        // ═══ Glow breathing — continuous ═══
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            scale: 1.2, opacity: 0.4, duration: 4,
            ease: 'sine.inOut', yoyo: true, repeat: -1,
          })
        }

        // ═══ Grid pattern — continuous ═══
        gsap.to('[data-dl-grid]', {
          backgroundPosition: '40px 40px',
          duration: 20, ease: 'none', repeat: -1,
        })
      }, root)

      return () => ctx.revert()
    },
    { scope: root, dependencies: [] },
  )

  const comingSoon = config.DOWNLOAD_COMING_SOON

  return (
    <section ref={root} id="download" className="section-y">
      <div className="container-content">
        <div data-dl-container className="relative overflow-hidden rounded-max bg-ink text-ivory px-6 py-14 md:px-16 md:py-24">
          <div ref={glowRef} className="pointer-events-none absolute -top-24 -right-12 h-96 w-96 rounded-full opacity-30 blur-[80px]" style={{ background: 'radial-gradient(circle, #c96442 0%, transparent 70%)' }} aria-hidden />
          <div className="pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full opacity-20 blur-[60px]" style={{ background: 'radial-gradient(circle, #d97757 0%, transparent 70%)' }} aria-hidden />
          <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-48 w-48 rounded-full opacity-15 blur-[50px]" style={{ background: 'radial-gradient(circle, #e8a090 0%, transparent 70%)' }} aria-hidden />

          <div data-dl-grid className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

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
              <MagneticButton href={config.DOWNLOAD_URL} className="btn-terracotta text-base !px-7 !py-3.5" strength={0.2}>
                <DownloadIcon />
                {t.download.cta}
                <span className="ml-1 text-[12px] opacity-80 font-normal">· {t.download.size}</span>
              </MagneticButton>
              <span className="text-[0.875rem] text-stone">
                {t.hero.versionLabel}{' '}
                <span className="font-mono text-silver">v{config.VERSION}</span>
              </span>
            </div>

            {comingSoon && (
              <p data-dl-anim className="mt-6 text-[0.875rem] text-coral flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                {t.download.comingSoon}
              </p>
            )}
            <p data-dl-anim className="mt-2 text-[0.8rem] text-stone">
              {t.download.note}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
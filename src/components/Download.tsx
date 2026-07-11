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
      if (prefersReducedMotion()) return
      const ctx = gsap.context(() => {
        // Container reveal
        gsap.fromTo('[data-dl-container]',
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: root.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        )

        // Content stagger
        gsap.fromTo(root.current!.querySelectorAll('[data-dl-anim]'),
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.3,
            immediateRender: false,
            scrollTrigger: {
              trigger: root.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        )

        // Glow breathing
        if (glowRef.current) {
          gsap.to(glowRef.current, {
            scale: 1.15,
            opacity: 0.35,
            duration: 4,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        }
      }, root)
      return () => ctx.revert()
    },
    { scope: root, dependencies: [] },
  )

  const comingSoon = config.DOWNLOAD_COMING_SOON

  return (
    <section ref={root} id="download" className="section-y">
      <div className="container-content">
        <div
          data-dl-container
          className="relative overflow-hidden rounded-max bg-ink text-ivory px-6 py-14 md:px-16 md:py-24"
        >
          {/* Multiple glow layers */}
          <div
            ref={glowRef}
            className="pointer-events-none absolute -top-24 -right-12 h-80 w-80 rounded-full opacity-30 blur-[80px]"
            style={{ background: 'radial-gradient(circle, #c96442 0%, transparent 70%)' }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -bottom-20 -left-16 h-60 w-60 rounded-full opacity-20 blur-[60px]"
            style={{ background: 'radial-gradient(circle, #d97757 0%, transparent 70%)' }}
            aria-hidden
          />

          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

          <div className="relative max-w-2xl">
            <p data-dl-anim className="overline !text-silver mb-4 !tracking-[0.2em]">
              {t.download.overline}
            </p>
            <h2
              data-dl-anim
              className="font-serif text-[2rem] sm:text-[2.5rem] md:text-[3rem] leading-[1.1] text-ivory"
            >
              {t.download.title}
            </h2>
            <p data-dl-anim className="mt-5 text-[1.0625rem] leading-[1.7] text-silver max-w-xl">
              {t.download.subtitle}
            </p>

            <div data-dl-anim className="mt-10 flex flex-wrap items-center gap-4">
              <MagneticButton
                href={config.DOWNLOAD_URL}
                className="btn-terracotta text-base !px-7 !py-3.5"
                strength={0.2}
              >
                <DownloadIcon />
                {t.download.cta}
                <span className="ml-1 text-[12px] opacity-80 font-normal">
                  · {t.download.size}
                </span>
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

import { useRef } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
import { DownloadIcon } from './icons'
import MagneticButton from './MagneticButton'
import Reveal from './Reveal'
import { RemiEmblem } from './motion-art'

/**
 * Download v1.0.0 — panel prism lớn + emblem mini xoay chậm.
 */
export default function Download() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const panel = markWC('[data-dl-panel]', root.current!)
    gsap.set(panel, { y: isMobile ? 30 : 50, opacity: 0, scale: 0.97, force3D: true })
    gsap.to(panel, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: isMobile ? 0.7 : 1,
      ease: 'power3.out',
      force3D: true,
      scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
      onComplete: () => clearWC(panel),
    })
    if (!isMobile) {
      gsap.to('[data-dl-emblem]', {
        rotate: 360, duration: 80, ease: 'none', repeat: -1, force3D: true,
      })
    }
  }, root)

  return (
    <section ref={root} id="download" className="section-y scroll-mt-20">
      <div className="container-content">
        <div data-dl-panel className="relative overflow-hidden rounded-max border border-white/12 bg-gradient-to-b from-[#151126] to-abyss px-6 py-14 md:px-16 md:py-20">
          {/* glow tĩnh + thở */}
          <div className="breathe pointer-events-none absolute -top-28 right-0 h-96 w-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,126,182,0.4) 0%, transparent 70%)' }} />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full opacity-25" style={{ background: 'radial-gradient(circle, rgba(255,185,213,0.3) 0%, transparent 70%)' }} />
          <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-remi/70 to-transparent" />

          <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
            <div className="max-w-2xl">
              <p className="pill-prism mb-5">◈ {t.download.overline}</p>
              <h2 className="font-serif text-[2rem] sm:text-[2.5rem] md:text-[3rem] leading-[1.1] text-pearl">
                {t.download.title} <span className="text-gradient">v{config.VERSION}</span>
              </h2>
              <p className="mt-5 text-[1.03rem] leading-[1.7] text-mist max-w-xl">
                {t.download.subtitle}
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <MagneticButton href={config.DOWNLOAD_URL} download={config.DOWNLOAD_FILE} className="btn-led text-base !px-7 !py-3.5" strength={0.2}>
                  <DownloadIcon />
                  {t.download.cta}
                  <span className="ml-1 text-[12px] opacity-80 font-normal">· {t.download.size}</span>
                </MagneticButton>
                <span className="text-[0.875rem] text-mist/80">
                  {t.hero.versionLabel} <span className="font-mono text-remi-soft">v{config.VERSION}</span>
                </span>
              </div>

              <p className="mt-5 text-[0.8rem] text-mist/60">{t.download.note}</p>
            </div>

            <Reveal from="scale" className="hidden lg:flex justify-center">
              <div className="relative w-64 h-64">
                <div data-dl-emblem className="absolute inset-0">
                  <RemiEmblem className="w-full h-full" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

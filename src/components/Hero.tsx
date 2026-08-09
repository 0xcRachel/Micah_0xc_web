import { useRef } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
import { DownloadIcon, GithubIcon } from './icons'
import AnimatedCounter from './AnimatedCounter'
import MagneticButton from './MagneticButton'
import MarqueeText from './MarqueeText'

export default function Hero() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const content = markWC('[data-hero-content]', root.current!)
    const overline = markWC('[data-hero-overline]', root.current!)
    const words = markWC('[data-hero-word]', root.current!)
    const subs = markWC('[data-hero-sub]', root.current!)
    const ctas = markWC('[data-hero-cta]', root.current!)
    const stats = markWC('[data-hero-stat]', root.current!)
    const mockup = root.current!.querySelector('[data-hero-mockup]')

    // ═══ Entrance — one-time ═══
    if (isMobile) {
      gsap.timeline({ defaults: { ease: 'power3.out', force3D: true } })
        .fromTo(overline, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 })
        .fromTo(words, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, stagger: 0.025 }, '-=0.2')
        .fromTo(subs, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, '-=0.2')
        .fromTo(ctas, { y: 14, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.45, stagger: 0.06 }, '-=0.15')
        .fromTo(stats, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, stagger: 0.05 }, '-=0.15')
    } else {
      gsap.timeline({ defaults: { ease: 'power4.out', force3D: true } })
        .fromTo(overline, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.0 }, 0)
        .fromTo(words, { yPercent: 130, opacity: 0, rotateX: -45 }, { yPercent: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.06 }, '-=0.5')
        .fromTo(subs, { y: 25, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, '-=0.7')
        .fromTo(ctas, { y: 30, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.1, ease: 'elastic.out(1, 0.5)' }, '-=0.4')
        .fromTo(stats, { y: 24, opacity: 0, scale: 0.94 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'back.out(1.4)' }, '-=0.3')
        .eventCallback('onComplete', () => clearWC([...content, ...overline, ...words, ...subs, ...ctas, ...stats]))
    }

    // ═══ Continuous float — desktop only ═══
    if (!isMobile && mockup) {
      gsap.to(mockup, {
        y: -14, duration: 3.5, ease: 'sine.inOut', yoyo: true, repeat: -1, force3D: true,
      })
      const glow = mockup.querySelector('.terminal-glow')
      if (glow) {
        gsap.to(glow, { opacity: 0.7, duration: 2.5, ease: 'sine.inOut', yoyo: true, repeat: -1, force3D: true })
      }
    }

    // ═══ Scroll parallax — desktop only, scrubbed ═══
    if (!isMobile) {
      gsap.to(content, {
        y: -60, opacity: 0, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: root.current,
          start: '60% top',
          end: 'bottom top',
          scrub: 1,
          onLeave: () => clearWC(content),
        },
      })
      if (mockup) {
        gsap.to(mockup, {
          yPercent: 16, ease: 'none', force3D: true,
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
            onLeave: () => clearWC([mockup as HTMLElement]),
          },
        })
      }
      gsap.to(overline, {
        opacity: 0, y: -24, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: root.current,
          start: '20% top',
          end: '40% top',
          scrub: 0.5,
        },
      })
    }
  }, root)

  const titleWords1 = t.hero.titleLine1.split(' ')
  const titleWords2 = t.hero.titleLine2.split(' ')

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-28 pb-20 md:pt-44 md:pb-32 min-h-screen flex flex-col justify-center">
      {/* ═══ Terminal mockup — desktop only ═══ */}
      <div data-hero-mockup className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-20 pointer-events-none" style={{ perspective: '800px' }}>
        <TerminalMockup />
      </div>

      {/* ═══ Marquees ═══ */}
      <div className="absolute top-24 left-0 right-0 pointer-events-none opacity-40">
        <MarqueeText text={t.hero.overline} className="text-[10px] tracking-[0.3em] uppercase font-sans text-silver" />
      </div>
      <div className="absolute bottom-24 left-0 right-0 pointer-events-none opacity-20">
        <MarqueeText text={t.hero.overline} direction="right" speed={0.6} className="text-[9px] tracking-[0.25em] uppercase font-sans text-silver" />
      </div>

      {/* ═══ Content ═══ */}
      <div data-hero-content className="container-content relative z-10">
        <p data-hero-overline className="overline mb-6 !tracking-[0.2em]">
          {t.hero.overline}
        </p>

        <h1 className="font-serif text-[2.4rem] leading-[1.05] sm:text-[3.25rem] md:text-[4.5rem] md:leading-[1.05] text-ivory max-w-5xl" style={{ perspective: '600px' }}>
          <span className="block overflow-hidden">
            {titleWords1.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
                <span data-hero-word className="inline-block" style={{ transformOrigin: 'bottom center' }}>
                  {word}
                </span>
              </span>
            ))}
          </span>
          <span className="block overflow-hidden mt-1">
            {titleWords2.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
                <span data-hero-word className={`inline-block ${i === titleWords2.length - 1 ? 'text-led' : ''}`} style={{ transformOrigin: 'bottom center' }}>
                  {word}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p data-hero-sub className="mt-8 max-w-2xl text-[1.0625rem] md:text-[1.25rem] leading-[1.7] text-silver font-sans">
          {t.hero.subtitle}
        </p>

        <div data-hero-cta className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton href={config.DOWNLOAD_URL} download={config.DOWNLOAD_FILE} className="btn-led text-base" strength={0.25}>
            <DownloadIcon />
            {t.hero.ctaPrimary}
            {config.DOWNLOAD_COMING_SOON && (
              <span className="ml-1 text-[11px] font-normal opacity-80 bg-cyber/40 px-2 py-0.5 rounded">{t.nav.comingSoon}</span>
            )}
          </MagneticButton>
          <MagneticButton href={config.REPO_URL} className="btn-sand text-base" strength={0.25}>
            <GithubIcon />
            {t.hero.ctaSecondary}
          </MagneticButton>
        </div>

        {/* Stats */}
        <dl className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl">
          {t.hero.stats.map((stat, i) => (
            <div key={i} data-hero-stat className="pl-5 border-l border-white/10 group">
              <dt className="font-serif text-3xl text-ivory group-hover:text-led transition-colors duration-300">
                <AnimatedCounter value={stat.value} />
              </dt>
              <dd className="text-[13px] text-silver/60 mt-1.5 tracking-wide">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.2em] text-silver/60">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-silver/40 to-transparent" />
      </div>

      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-cyber" />
    </section>
  )
}

function TerminalMockup() {
  return (
    <div className="relative w-[380px] h-[260px] transform-gpu">
      <div className="terminal-glow absolute inset-0 rounded-[14px] opacity-0 blur-[30px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(0,224,138,0.25) 0%, transparent 70%)' }} />
      <div className="relative z-10 rounded-[14px] overflow-hidden bg-cyber/90 backdrop-blur-sm border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.55)]">
        <div className="flex items-center gap-2 px-3 py-2.5 bg-white/[0.04] border-b border-white/10">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(255,60,60,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(255,180,0,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(40,200,60,0.4)]" />
          <div className="flex-1 text-center font-mono text-[11px] text-silver/50 tracking-wide">micah@launcher ~ $ ./micah</div>
        </div>
        <div className="p-4 font-mono text-[12px] leading-[1.6] text-silver/90 overflow-hidden">
          <div className="mb-2"><span className="text-led">{'>'}</span><span className="ml-2 text-ivory"> Initializing Micah 0xC Protocol...</span></div>
          <div className="mb-2"><span className="text-green-400">[OK]</span><span className="ml-2"> Game library loaded · 124 titles</span></div>
          <div className="mb-2"><span className="text-green-400">[OK]</span><span className="ml-2"> System Info Card active</span></div>
          <div className="mb-2"><span className="text-green-400">[OK]</span><span className="ml-2"> Steam Manager connected</span></div>
          <div className="mb-2"><span className="text-green-400">[OK]</span><span className="ml-2"> Lua script hub ready</span></div>
          <div className="mb-3"><span className="text-led">{'>'}</span><span className="ml-2 text-ivory"> Opening hub...</span></div>
          <div className="flex items-center gap-2 text-led">
            <span className="w-1.5 h-1.5 rounded-full bg-led animate-pulse" />
            <span className="ml-2">READY</span>
          </div>
        </div>
      </div>
    </div>
  )
}

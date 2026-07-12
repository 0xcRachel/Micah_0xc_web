import { useRef } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { gsap, useGSAP, prefersReducedMotion } from '../hooks/useGsap'
import { DownloadIcon, GithubIcon } from './icons'
import AnimatedCounter from './AnimatedCounter'
import MagneticButton from './MagneticButton'
import MarqueeText from './MarqueeText'

export default function Hero() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

        // Overline with blur-to-sharp
        tl.fromTo('[data-hero-overline]',
          { y: 40, opacity: 0, filter: 'blur(8px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.0, immediateRender: false },
        )

        // Title words stagger with rotateX reveal
        const titleWords = root.current!.querySelectorAll('[data-hero-word]')
        if (titleWords.length) {
          tl.fromTo(titleWords,
            { yPercent: 130, opacity: 0, rotateX: -60, filter: 'blur(6px)' },
            { yPercent: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)', duration: 1.4, stagger: 0.07, ease: 'power4.out', immediateRender: false },
            '-=0.5',
          )
        }

        // Subtitle fade in with blur
        tl.fromTo('[data-hero-sub]',
          { y: 20, opacity: 0, filter: 'blur(4px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.8, immediateRender: false },
          '-=0.6',
        )

        // CTAs bounce in
        tl.fromTo('[data-hero-cta]',
          { y: 30, opacity: 0, scale: 0.85 },
          { y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.12, ease: 'elastic.out(1, 0.5)', immediateRender: false },
          '-=0.3',
        )

        // Stats count in with stagger
        tl.fromTo('[data-hero-stat]',
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: 'back.out(1.4)', immediateRender: false },
          '-=0.3',
        )

        // Decorative blobs breathing with scale + rotation
        const blobs = root.current!.querySelectorAll('[data-hero-parallax]')
        blobs.forEach((blob, i) => {
          gsap.to(blob, {
            scale: 1.15,
            rotation: i % 2 === 0 ? 10 : -10,
            duration: 4 + i * 0.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        })

        // Terminal mockup float + glow
        const mockup = root.current!.querySelector('[data-hero-mockup]')
        if (mockup) {
          gsap.to(mockup, {
            y: -15,
            duration: 3.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
          gsap.to(mockup.querySelector('.terminal-glow'), {
            opacity: 0.7,
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
          })
        }

        // Floating geometric shapes
        const shapes = root.current!.querySelectorAll('[data-hero-shape]')
        shapes.forEach((shape, i) => {
          gsap.to(shape, {
            y: `${(i % 2 === 0 ? -1 : 1) * 20 + i * 5}`,
            x: `${(i % 3 === 0 ? -1 : 1) * 10}`,
            rotation: i % 2 === 0 ? 360 : -360,
            duration: 8 + i * 2,
            ease: 'none',
            repeat: -1,
          })
        })

        // Parallax on scroll
        gsap.to('[data-hero-parallax]', {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
        gsap.to('[data-hero-mockup]', {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        })

        // Fade out hero on scroll
        gsap.to('[data-hero-content]', {
          y: -60,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: '60% top',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }, root)

      return () => ctx.revert()
    },
    { scope: root, dependencies: [] },
  )

  const titleWords1 = t.hero.titleLine1.split(' ')
  const titleWords2 = t.hero.titleLine2.split(' ')

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32 min-h-screen flex flex-col justify-center">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Primary blob */}
        <div
          data-hero-parallax
          className="pointer-events-none absolute -top-28 -right-28 h-[500px] w-[500px] rounded-full opacity-20 blur-[60px] will-change-transform"
          style={{ background: 'radial-gradient(circle, #d97757 0%, transparent 70%)' }}
          aria-hidden
        />
        {/* Secondary blob */}
        <div
          data-hero-parallax
          className="pointer-events-none absolute top-20 -left-36 h-[420px] w-[420px] rounded-full opacity-15 blur-[60px] will-change-transform"
          style={{ background: 'radial-gradient(circle, #c2c0b6 0%, transparent 70%)' }}
          aria-hidden
        />
        {/* Accent blob */}
        <div
          data-hero-parallax
          className="pointer-events-none absolute bottom-0 right-1/4 h-[250px] w-[250px] rounded-full opacity-15 blur-[50px] will-change-transform"
          style={{ background: 'radial-gradient(circle, #c96442 0%, transparent 70%)' }}
          aria-hidden
        />
        {/* Deep accent blob */}
        <div
          data-hero-parallax
          className="pointer-events-none absolute top-1/3 left-1/2 h-[180px] w-[180px] rounded-full opacity-10 blur-[40px] will-change-transform"
          style={{ background: 'radial-gradient(circle, #e8a090 0%, transparent 70%)' }}
          aria-hidden
        />

        {/* Floating geometric shapes */}
        <div data-hero-shape className="pointer-events-none absolute top-32 right-1/4 w-3 h-3 border border-terracotta/30 rounded-sm will-change-transform" aria-hidden />
        <div data-hero-shape className="pointer-events-none absolute top-1/2 left-16 w-2 h-2 bg-terracotta/20 rounded-full will-change-transform" aria-hidden />
        <div data-hero-shape className="pointer-events-none absolute bottom-1/3 right-16 w-4 h-4 border border-stone/20 rotate-45 will-change-transform" aria-hidden />
        <div data-hero-shape className="pointer-events-none absolute top-1/4 left-1/3 w-2 h-2 bg-ivory/30 rounded-full will-change-transform" aria-hidden />
        <div data-hero-shape className="pointer-events-none absolute bottom-1/4 left-1/2 w-3 h-3 border border-terracotta/20 rounded-full will-change-transform" aria-hidden />
      </div>

      {/* Floating terminal mockup */}
      <div
        data-hero-mockup
        className="hidden lg:block absolute right-4 top-1/2 -translate-y-1/2 z-5 pointer-events-none"
        style={{ perspective: '800px' }}
      >
        <TerminalMockup />
      </div>

      {/* Marquee at top */}
      <div className="absolute top-24 left-0 right-0 pointer-events-none opacity-40">
        <MarqueeText text={t.hero.overline} className="text-[10px] tracking-[0.3em] uppercase font-sans text-stone" />
      </div>

      {/* Second marquee below main content, opposite direction */}
      <div className="absolute bottom-24 left-0 right-0 pointer-events-none opacity-20">
        <MarqueeText text={t.hero.overline} direction="right" speed={0.6} className="text-[9px] tracking-[0.25em] uppercase font-sans text-stone" />
      </div>

      <div data-hero-content className="container-content relative z-10">
        <p data-hero-overline className="overline mb-6 !tracking-[0.2em]">
          {t.hero.overline}
        </p>

        <h1 className="font-serif text-[2.5rem] leading-[1.05] sm:text-[3.25rem] md:text-[4.5rem] md:leading-[1.05] text-ink max-w-5xl" style={{ perspective: '600px' }}>
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
                <span
                  data-hero-word
                  className={`inline-block ${i === titleWords2.length - 1 ? 'text-terracotta' : ''}`}
                  style={{ transformOrigin: 'bottom center' }}
                >
                  {word}
                </span>
              </span>
            ))}
          </span>
        </h1>

        <p
          data-hero-sub
          className="mt-8 max-w-2xl text-[1.125rem] md:text-[1.25rem] leading-[1.7] text-olive font-sans"
        >
          {t.hero.subtitle}
        </p>

        <div data-hero-cta className="mt-12 flex flex-wrap items-center gap-4">
          <MagneticButton
            href={config.DOWNLOAD_URL}
            className="btn-terracotta text-base"
            strength={0.25}
          >
            <DownloadIcon />
            {t.hero.ctaPrimary}
            {config.DOWNLOAD_COMING_SOON && (
              <span className="ml-1 text-[11px] font-normal opacity-80 bg-ink-deep/30 px-2 py-0.5 rounded">
                {t.nav.comingSoon}
              </span>
            )}
          </MagneticButton>
          <MagneticButton
            href={config.REPO_URL}
            className="btn-sand text-base"
            strength={0.25}
          >
            <GithubIcon />
            {t.hero.ctaSecondary}
          </MagneticButton>
        </div>

        {/* Stats row */}
        <dl className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl">
          {t.hero.stats.map((stat, i) => (
            <div
              key={i}
              data-hero-stat
              className="pl-5 group"
            >
              <dt className="font-serif text-3xl text-ink group-hover:text-terracotta transition-colors duration-300">
                <AnimatedCounter value={stat.value} />
              </dt>
              <dd className="text-[13px] text-stone mt-1.5 tracking-wide">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.2em] text-stone">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-stone to-transparent" />
      </div>

      {/* Soft fade at the bottom */}
      <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-parchment" />
    </section>
  )
}

function TerminalMockup() {
  return (
    <div className="relative w-[380px] h-[260px] transform-gpu">
      <div className="terminal-glow absolute inset-0 rounded-[14px] opacity-0 blur-[30px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, rgba(201,100,66,0.35) 0%, transparent 70%)' }} />
      <div className="relative z-10 rounded-[14px] overflow-hidden bg-ink/95 backdrop-blur-sm border border-ink-deep/50 shadow-[0_25px_60px_rgba(0,0,0,0.35)]">
        <div className="flex items-center gap-2 px-3 py-2.5 bg-ink-deep/50 border-b border-ink-deep/30">
          <div className="w-3 h-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(255,60,60,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(255,180,0,0.4)]" />
          <div className="w-3 h-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(40,200,60,0.4)]" />
          <div className="flex-1 text-center font-mono text-[11px] text-stone/50 tracking-wide">micah@launcher ~ $ ./micah</div>
        </div>
        <div className="p-4 font-mono text-[12px] leading-[1.6] text-silver/90 overflow-hidden">
          <div className="mb-2"><span className="text-terracotta">{'>'}</span><span className="ml-2 text-ivory"> Initializing Micah 0xC Protocol...</span></div>
          <div className="mb-2"><span className="text-green-400">[OK]</span><span className="ml-2"> Core engine loaded</span></div>
          <div className="mb-2"><span className="text-green-400">[OK]</span><span className="ml-2"> Security module active</span></div>
          <div className="mb-2"><span className="text-green-400">[OK]</span><span className="ml-2"> Network stack ready</span></div>
          <div className="mb-2"><span className="text-green-400">[OK]</span><span className="ml-2"> Plugin system initialized</span></div>
          <div className="mb-3"><span className="text-terracotta">{'>'}</span><span className="ml-2 text-ivory"> Launching launcher...</span></div>
          <div className="flex items-center gap-2 text-terracotta">
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
            <span className="ml-2">READY</span>
          </div>
        </div>
      </div>
    </div>
  )
}
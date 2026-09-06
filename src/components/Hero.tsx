import { useRef, useEffect } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
import { DownloadIcon, GithubIcon } from './icons'
import AnimatedCounter from './AnimatedCounter'
import MagneticButton from './MagneticButton'
import { WingMark } from './motion-art'

function TerminalWindow() {
  const linesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = linesRef.current
    if (!el) return
    const lines = el.querySelectorAll('[data-term-line]')
    gsap.set(lines, { opacity: 0, x: -8 })
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      gsap.set(lines, { opacity: 1, x: 0 })
      return
    }
    gsap.to(lines, {
      opacity: 1,
      x: 0,
      duration: 0.45,
      stagger: 0.12,
      ease: 'power2.out',
      delay: 0.6,
      force3D: true,
    })
  }, [])

  return (
    <div className="relative w-full max-w-[520px] rounded-[16px] overflow-hidden border border-white/10 bg-[#0D0B1A]/90 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,126,182,0.08)]">
      {/* header */}
      <div className="flex items-center gap-2 px-4 h-9 bg-white/[0.04] border-b border-white/10">
        <span className="w-3 h-3 rounded-full bg-[#FF5D5B] border border-black/10" />
        <span className="w-3 h-3 rounded-full bg-[#FFC542] border border-black/10" />
        <span className="w-3 h-3 rounded-full bg-[#2ACB45] border border-black/10" />
        <span className="ml-3 text-[11px] font-mono tracking-wide text-white/40">micah — zsh — 80×18</span>
        <span className="ml-auto hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono text-white/30">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> live
        </span>
      </div>

      {/* body */}
      <div ref={linesRef} className="p-4 sm:p-5 font-mono text-[12.5px] leading-[1.7]">
        <div data-term-line className="flex gap-2">
          <span className="text-white/25 select-none">$</span>
          <span className="text-pearl">micah</span>
          <span className="text-mist">--scan</span>
          <span className="text-remi">--profile gamer</span>
        </div>

        <div data-term-line className="mt-2 flex items-center gap-2 text-white/60">
          <span className="text-emerald-400">✔</span> library — <b className="text-pearl font-medium">127 games</b> found <span className="text-white/30">· 1.4s</span>
        </div>
        <div data-term-line className="flex items-center gap-2 text-white/60">
          <span className="text-emerald-400">✔</span> system — CPU <b className="text-pearl font-medium">18%</b> · RAM <b className="text-pearl font-medium">7.4/16 GB</b> · GPU <b className="text-pearl font-medium">64°C</b>
        </div>

        <div data-term-line className="mt-3 flex gap-2">
          <span className="text-white/25 select-none">$</span>
          <span className="text-pearl">steam.sync</span>
          <span className="text-mist">--manifest</span>
        </div>
        <div data-term-line className="ml-4 mt-1 text-white/60">
          <span className="text-white/30">↳</span> imported <b className="text-pearl font-medium">3 scripts</b> <span className="text-white/40">→ auto-applied</span> <span className="text-emerald-400">✔</span>
        </div>
        <div data-term-line className="ml-4 text-white/60">
          <span className="text-white/30">↳</span> manifest <span className="text-remi-soft">validated</span> · no restart needed
        </div>

        <div data-term-line className="mt-3 flex gap-2 items-center">
          <span className="text-white/25 select-none">$</span>
          <span className="text-pearl">micah</span>
          <span className="text-remi">--launch --optimize</span>
          <span className="ml-1 inline-block w-[7px] h-[14px] bg-remi/90 translate-y-[1px] animate-[blink_1s_steps(1)_infinite]" />
        </div>

        <div data-term-line className="mt-3 rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2.5 flex items-center justify-between">
          <span className="text-white/70">
            <span className="text-emerald-400">▶</span> Ready to play — <span className="text-pearl">press ENTER</span>
          </span>
          <span className="hidden sm:inline text-[10px] tracking-widest text-white/30 border border-white/10 rounded px-1.5 py-0.5">↵</span>
        </div>

        {/* bottom meta */}
        <div data-term-line className="mt-3 flex flex-wrap gap-2 text-[10px] font-mono">
          <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">local-first</span>
          <span className="px-2 py-1 rounded-full bg-remi/10 text-remi-soft border border-remi/20">Tauri · Rust</span>
          <span className="px-2 py-1 rounded-full bg-white/5 text-white/50 border border-white/10">v{config.VERSION}</span>
        </div>
      </div>

      {/* subtle pink glow */}
      <div className="pointer-events-none absolute -inset-px rounded-[16px] opacity-30" style={{ background: 'radial-gradient(600px 200px at 80% 0%, rgba(255,126,182,0.12), transparent 70%)' }} />
    </div>
  )
}

export default function Hero() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGsapMM((isMobile) => {
    const scope = root.current!
    const overline = markWC('[data-hero-overline]', scope)
    const words = markWC('[data-hero-word]', scope)
    const subs = markWC('[data-hero-sub]', scope)
    const ctas = markWC('[data-hero-cta]', scope)
    const stats = markWC('[data-hero-stat]', scope)
    const terminal = scope.querySelector('[data-hero-terminal]') as HTMLElement | null
    const all = [...overline, ...words, ...subs, ...ctas, ...stats]

    if (isMobile) {
      gsap.timeline({ defaults: { ease: 'power3.out', force3D: true } })
        .fromTo(overline, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 }, 0)
        .fromTo(words, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.03 }, 0.04)
        .fromTo(subs, { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45 }, 0.18)
        .fromTo(terminal, { y: 20, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' }, 0.22)
        .fromTo(ctas, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.07 }, 0.32)
        .fromTo(stats, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, stagger: 0.06 }, 0.4)
        .eventCallback('onComplete', () => clearWC([...all, ...(terminal ? [terminal] : [])]))
    } else {
      gsap.timeline({ defaults: { ease: 'power3.out', force3D: true } })
        .fromTo(overline, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 }, 0)
        .fromTo(words, { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.9, stagger: 0.05 }, 0.05)
        .fromTo(subs, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, 0.35)
        .fromTo(terminal, { y: 24, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 0.15)
        .fromTo(ctas, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power2.out' }, 0.45)
        .fromTo(stats, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.08 }, 0.6)
        .eventCallback('onComplete', () => clearWC([...all, ...(terminal ? [terminal] : [])]))
    }

    if (!terminal || isMobile) return
    // float nhẹ duy nhất — rất mượt, không parallax
    gsap.to(terminal, {
      y: -6,
      duration: 3.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
      force3D: true,
    })
  }, root)

  const titleWords1 = t.hero.titleLine1.split(' ')
  const titleWords2 = t.hero.titleLine2.split(' ')

  return (
    <section ref={root} id="top" className="relative overflow-hidden pt-28 md:pt-36 pb-12 md:pb-16">
      {/* marquee nền trên */}
      <div className="absolute top-20 left-0 right-0 pointer-events-none opacity-40 overflow-hidden" aria-hidden="true">
        <div className="marquee-track gap-8 text-[10px] tracking-[0.35em] uppercase font-sans text-mist/60" style={{ ['--marquee-dur' as string]: '36s' }}>
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-8 pr-8 whitespace-nowrap">
              {Array.from({ length: 6 }).map((_, i) => (
                <span key={i} className="flex items-center gap-8">
                  <span>Temporal Lumiflux</span>
                  <span className="text-remi">✦</span>
                  <span>Flower & Feather Dance</span>
                  <span className="text-pearl/60">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="container-content relative z-10 grid lg:grid-cols-[1.05fr_0.9fr] gap-10 lg:gap-8 items-center lg:min-h-[480px]">
        {/* content trái */}
        <div data-hero-content className="flex flex-col justify-center">
          <p data-hero-overline className="pill-prism mb-6">
            <WingMark className="w-4 h-4 -scale-x-100" />
            {t.hero.overline}
            <span className="ml-1 rounded-full bg-remi/15 border border-remi/30 px-2 py-0.5 text-[10px] tracking-widest text-remi-soft">
              v{config.VERSION}
            </span>
          </p>

          <h1 className="font-serif text-[2.5rem] leading-[1.04] sm:text-[3.4rem] lg:text-[4.2rem] text-pearl max-w-3xl">
            <span className="block overflow-hidden pb-1">
              {titleWords1.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
                  <span data-hero-word className="inline-block">{word}</span>
                </span>
              ))}
            </span>
            <span className="block overflow-hidden pb-2">
              {titleWords2.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden mr-[0.25em] align-bottom">
                  <span data-hero-word className={`inline-block ${i === titleWords2.length - 1 ? 'text-gradient text-glow-pink' : ''}`}>
                    {word}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          <p data-hero-sub className="mt-5 max-w-xl text-[1rem] md:text-[1.12rem] leading-[1.65] text-mist">
            {t.hero.subtitle}
          </p>

          <div data-hero-cta className="mt-7 flex flex-wrap items-center gap-4">
            <MagneticButton href={config.DOWNLOAD_URL} download={config.DOWNLOAD_FILE} className="btn-led text-base" strength={0.22}>
              <DownloadIcon />
              {t.hero.ctaPrimary}
            </MagneticButton>
            <MagneticButton href={config.REPO_URL} className="btn-sand text-base" strength={0.22}>
              <GithubIcon />
              {t.hero.ctaSecondary}
            </MagneticButton>
          </div>

          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-xl">
            {t.hero.stats.map((stat, i) => (
              <div key={i} data-hero-stat className="pl-5 relative group">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-remi to-transparent opacity-60" />
                <dt className="font-serif text-[1.7rem] text-pearl group-hover:text-remi-soft transition-colors duration-300">
                  <AnimatedCounter value={stat.value} />
                </dt>
                <dd className="text-[12.5px] text-mist/80 mt-1 tracking-wide">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* terminal phải — căn giữa dọc */}
        <div data-hero-terminal className="relative w-full self-center">
          <TerminalWindow />
        </div>
      </div>
    </section>
  )
}

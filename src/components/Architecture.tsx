import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'
import TextReveal from './TextReveal'

export default function Architecture() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return

      const ctx = gsap.context(() => {
        const nodes = gsap.utils.toArray<HTMLElement>('[data-arch-node]')
        const connectors = gsap.utils.toArray<HTMLElement>('[data-arch-line]')

        // Set initial hidden state FIRST
        gsap.set(nodes, { scale: 0.6, opacity: 0, filter: 'blur(12px)', y: 20 })
        gsap.set(connectors, { scaleX: 0, opacity: 0 })

        // ═══ Node reveal — scrub ═══
        gsap.to(nodes, {
          scale: 1, opacity: 1, filter: 'blur(0px)', y: 0,
          duration: 1, stagger: 0.15, ease: 'none',
          scrollTrigger: {
            trigger: '[data-arch-diagram]',
            start: 'top 95%',
            end: 'top 55%',
            scrub: 0.8,
          },
        })

        // ═══ Connector draw-in — scrub ═══
        if (connectors.length) {
          gsap.to(connectors, {
            scaleX: 1, opacity: 1,
            duration: 0.8, stagger: 0.1, transformOrigin: 'left center', ease: 'none',
            scrollTrigger: {
              trigger: '[data-arch-diagram]',
              start: 'top 85%',
              end: 'top 50%',
              scrub: 0.8,
            },
          })
        }

        // ═══ Continuous pulse on main node ═══
        const terracottaNode = nodes[0]
        if (terracottaNode) {
          gsap.to(terracottaNode, {
            scale: 1.03, duration: 2.5, ease: 'sine.inOut',
            yoyo: true, repeat: -1, transformOrigin: 'center center',
          })
        }

        // ═══ Data flow particles ═══
        const particleTl = gsap.timeline({ repeat: -1 })

        connectors.forEach((line, i) => {
          for (let p = 0; p < 4; p++) {
            const particle = document.createElement('div')
            const size = 2 + Math.random() * 5
            particle.className = 'absolute rounded-full pointer-events-none'
            particle.style.cssText = `
              width:${size}px; height:${size}px;
              background: radial-gradient(circle, rgba(201,100,66,0.9) 0%, rgba(201,100,66,0.3) 100%);
              top: 0; left: 50%; transform: translateX(-50%);
              opacity: 0; filter: blur(${Math.random() * 0.5}px);
              box-shadow: 0 0 ${size * 2}px rgba(201,100,66,0.4);
            `
            line.parentElement?.appendChild(particle)

            const delay = i * 0.3 + p * 0.35
            const speed = 0.5 + Math.random() * 0.5

            particleTl.fromTo(particle,
              { top: '0%', opacity: 0, scale: 0.3 },
              { top: '100%', opacity: 0.9, scale: 1, duration: speed, ease: 'power1.in', delay },
            )
            particleTl.to(particle, { opacity: 0, scale: 0.5, duration: 0.2, ease: 'none' }, '>-0.05')
          }
        })

        // ═══ Principle tag — scrub ═══
        gsap.fromTo('[data-arch-principle]',
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1, duration: 1, ease: 'none',
            scrollTrigger: {
              trigger: '[data-arch-principle]',
              start: 'top 95%',
              end: 'top 70%',
              scrub: 0.8,
            },
          },
        )
      }, root)

      return () => ctx.revert()
    },
    { scope: root, dependencies: [] },
  )

  const { app, api, bot, db } = t.architecture.flow

  return (
    <section ref={root} id="architecture" className="section-dark section-y relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="container-content relative">
        <TextReveal
          text={t.architecture.title}
          tag="h2"
          className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] text-ivory max-w-2xl"
          stagger={0.03}
        />
        <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.7] text-silver max-w-2xl">
          {t.architecture.subtitle}
        </p>

        <div data-arch-diagram className="mt-16 flex flex-col items-stretch gap-4 max-w-3xl">
          <ArchNode label={app.name} detail={app.detail} accent="terracotta" />
          <Connector />
          <ArchNode label={api.name} detail={api.detail} accent="center" />
          <Connector />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ArchNode label={bot.name} detail={bot.detail} accent="branch" />
            <ArchNode label={db.name} detail={db.detail} accent="branch" />
          </div>
        </div>

        <p data-arch-principle className="mt-12 inline-flex items-center gap-3 text-[0.95rem] text-silver border border-ink-deep rounded-generous px-5 py-2.5 hover:border-terracotta/30 hover:shadow-[0_0_20px_rgba(201,100,66,0.15)] transition-all duration-500">
          <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
          {t.architecture.principle}
        </p>
      </div>
    </section>
  )
}

function ArchNode({ label, detail, accent }: { label: string; detail: string; accent: 'terracotta' | 'center' | 'branch' }) {
  const nodeRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    if (prefersReducedMotion() || !nodeRef.current) return
    gsap.to(nodeRef.current, {
      scale: 1.02,
      duration: 0.3,
      ease: 'back.out(1.5)',
    })
    const dot = nodeRef.current.querySelector('.arch-dot')
    if (dot) {
      gsap.to(dot, {
        scale: 1.5,
        boxShadow: '0 0 16px rgba(201,100,66,0.7)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }

  const handleMouseLeave = () => {
    if (prefersReducedMotion() || !nodeRef.current) return
    gsap.to(nodeRef.current, {
      scale: 1,
      duration: 0.4,
      ease: 'power2.out',
    })
    const dot = nodeRef.current.querySelector('.arch-dot')
    if (dot) {
      gsap.to(dot, {
        scale: 1,
        boxShadow: accent === 'terracotta' ? '0 0 8px rgba(201,100,66,0.5)' : '0 0 6px rgba(194,192,182,0.3)',
        duration: 0.4,
        ease: 'power2.out',
      })
    }
  }

  const ring = accent === 'terracotta'
    ? 'border-terracotta/40 hover:border-terracotta/70 hover:shadow-[0_0_30px_rgba(201,100,66,0.2)]'
    : accent === 'center'
      ? 'border-silver/30 hover:border-silver/60 hover:shadow-[0_0_25px_rgba(194,192,182,0.1)]'
      : 'border-silver/20 hover:border-silver/50 hover:shadow-[0_0_20px_rgba(194,192,182,0.08)]'

  const dot = accent === 'terracotta'
    ? 'bg-terracotta shadow-[0_0_8px_rgba(201,100,66,0.5)]'
    : accent === 'center'
      ? 'bg-silver shadow-[0_0_6px_rgba(194,192,182,0.3)]'
      : 'bg-silver/60'

  return (
    <div
      ref={nodeRef}
      data-arch-node
      className={`bg-ink-deep border ${ring} rounded-very px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 transition-all duration-500 hover:translate-y-[-2px] group`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex items-center gap-3">
        <span className={`arch-dot w-2 h-2 rounded-full ${dot} transition-shadow duration-300`} />
        <span className="font-serif text-[1.15rem] text-ivory">{label}</span>
      </div>
      <span className="font-mono text-[0.8rem] text-silver group-hover:text-terracotta/80 transition-colors duration-300">{detail}</span>
    </div>
  )
}

function Connector() {
  return (
    <div className="flex justify-center" aria-hidden>
      <div data-arch-line className="w-px h-10 bg-gradient-to-b from-terracotta/40 via-silver/30 to-silver/10 relative">
        <div className="absolute inset-0 w-px bg-gradient-to-b from-terracotta/20 via-transparent to-transparent blur-[2px]" />
      </div>
    </div>
  )
}
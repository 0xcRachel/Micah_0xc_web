import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'
import TextReveal from './TextReveal'

export default function Architecture() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const ctx = gsap.context(() => {
        const nodes = gsap.utils.toArray<HTMLElement>('[data-arch-node]')
        const connectors = gsap.utils.toArray<HTMLElement>('[data-arch-line]')

        const tl = gsap.timeline({
          defaults: { ease: 'power4.out' },
          scrollTrigger: {
            trigger: '[data-arch-diagram]',
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })

        // Nodes reveal with scale + blur
        tl.fromTo(nodes,
          { scale: 0.8, opacity: 0, filter: 'blur(8px)' },
          { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.8, stagger: 0.2, immediateRender: false },
        )

        // Connectors draw in
        if (connectors.length) {
          tl.fromTo(
            connectors,
            { scaleX: 0, opacity: 0 },
            { scaleX: 1, opacity: 1, duration: 0.6, stagger: 0.15, transformOrigin: 'left center', immediateRender: false },
            '-=0.8',
          )
        }

        // Continuous pulse on terracotta node (scale+opacity, GPU-friendly)
        const terracottaNode = nodes[0]
        if (terracottaNode) {
          gsap.to(terracottaNode, {
            scale: 1.02,
            duration: 2.5,
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
            transformOrigin: 'center center',
            scrollTrigger: {
              trigger: '[data-arch-diagram]',
              start: 'top 75%',
              toggleActions: 'play pause resume pause',
            },
          })
        }

        // Data flow particles — multi-size, varying speeds
        const particleTl = gsap.timeline({
          repeat: -1,
          scrollTrigger: {
            trigger: '[data-arch-diagram]',
            start: 'top 75%',
            toggleActions: 'play pause resume pause',
          },
        })

        connectors.forEach((line, i) => {
          // 3 particles per connector at different offsets
          for (let p = 0; p < 3; p++) {
            const particle = document.createElement('div')
            const size = 2 + Math.random() * 4
            particle.className = 'absolute rounded-full pointer-events-none'
            particle.style.cssText = `
              width:${size}px; height:${size}px;
              background: radial-gradient(circle, rgba(201,100,66,0.8) 0%, rgba(201,100,66,0.2) 100%);
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              opacity: 0;
              filter: blur(${Math.random() * 1}px);
            `
            line.parentElement?.appendChild(particle)

            const delay = i * 0.3 + p * 0.4
            const speed = 0.6 + Math.random() * 0.6

            particleTl.fromTo(particle,
              { top: '0%', opacity: 0, scale: 0.5 },
              { top: '100%', opacity: 0.8, scale: 1, duration: speed, ease: 'power1.in', delay, immediateRender: false },
            )
            particleTl.to(particle, { opacity: 0, duration: 0.15, ease: 'none' }, '>-0.05')
          }
        })

        // Principle tag
        gsap.fromTo('[data-arch-principle]',
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'back.out(1.4)',
            immediateRender: false,
            scrollTrigger: {
              trigger: '[data-arch-principle]',
              start: 'top 88%',
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
      {/* Grid pattern overlay */}
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

        <div
          data-arch-diagram
          className="mt-16 flex flex-col items-stretch gap-4 max-w-3xl"
        >
          <ArchNode label={app.name} detail={app.detail} accent="terracotta" />
          <Connector />
          <ArchNode label={api.name} detail={api.detail} accent="center" />
          <Connector />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ArchNode label={bot.name} detail={bot.detail} accent="branch" />
            <ArchNode label={db.name} detail={db.detail} accent="branch" />
          </div>
        </div>

        <p
          data-arch-principle
          className="mt-12 inline-flex items-center gap-3 text-[0.95rem] text-silver border border-ink-deep rounded-generous px-5 py-2.5 hover:border-terracotta/30 transition-colors duration-300"
        >
          <span className="w-2 h-2 rounded-full bg-terracotta animate-pulse" />
          {t.architecture.principle}
        </p>
      </div>
    </section>
  )
}

function ArchNode({
  label,
  detail,
  accent,
}: {
  label: string
  detail: string
  accent: 'terracotta' | 'center' | 'branch'
}) {
  const ring =
    accent === 'terracotta'
      ? 'border-terracotta/40 hover:border-terracotta/60'
      : accent === 'center'
        ? 'border-silver/30 hover:border-silver/50'
        : 'border-silver/20 hover:border-silver/40'

  return (
    <div
      data-arch-node
      className={`bg-ink-deep border ${ring} rounded-very px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 transition-all duration-300 hover:shadow-lg hover:shadow-black/20`}
    >
      <span className="font-serif text-[1.15rem] text-ivory">{label}</span>
      <span className="font-mono text-[0.8rem] text-silver">{detail}</span>
    </div>
  )
}

function Connector() {
  return (
    <div className="flex justify-center" aria-hidden>
      <div
        data-arch-line
        className="w-px h-10 bg-gradient-to-b from-terracotta/40 via-silver/30 to-silver/10"
      />
    </div>
  )
}

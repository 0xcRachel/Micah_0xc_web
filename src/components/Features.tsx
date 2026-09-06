import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { FeatureGlyph } from './motion-art'

const TILE_ACCENTS = [
  { glow: 'rgba(255,126,182,0.16)', icon: 'from-remi/25 to-remi/5 text-remi-soft', line: 'from-remi/60' },
  { glow: 'rgba(255,185,213,0.14)', icon: 'from-remi-soft/25 to-remi-soft/5 text-remi-blush', line: 'from-remi-soft/60' },
  { glow: 'rgba(255,248,241,0.10)', icon: 'from-pearl/20 to-pearl/5 text-pearl', line: 'from-pearl/50' },
  { glow: 'rgba(225,78,143,0.16)', icon: 'from-remi-deep/30 to-remi-deep/5 text-remi-soft', line: 'from-remi-deep/60' },
  { glow: 'rgba(255,126,182,0.14)', icon: 'from-remi/25 to-remi-soft/10 text-remi-soft', line: 'from-remi/60' },
  { glow: 'rgba(255,185,213,0.12)', icon: 'from-remi-soft/25 to-pearl/10 text-remi-blush', line: 'from-remi-soft/60' },
]

function FeatureCard({ item, index }: { item: { title: string; body: string }; index: number }) {
  const glowRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLElement>(null)
  const accent = TILE_ACCENTS[index % TILE_ACCENTS.length]

  // Glow dí theo chuột — quickTo, transform only
  const handleMouseMove = (e: React.MouseEvent) => {
    const card = cardRef.current
    const glow = glowRef.current
    if (!card || !glow || window.matchMedia('(pointer: coarse)').matches) return
    const rect = card.getBoundingClientRect()
    gsap.to(glow, {
      x: e.clientX - rect.left - 128,
      y: e.clientY - rect.top - 128,
      duration: 0.5,
      ease: 'power2.out',
      force3D: true,
      overwrite: 'auto',
    })
  }

  return (
    <Reveal as="article" delay={(index % 3) * 0.08} className="h-full">
      <article
        ref={cardRef as never}
        className="card group relative overflow-hidden cursor-default h-full"
        onMouseMove={handleMouseMove}
      >
        <div
          ref={glowRef}
          className="pointer-events-none absolute top-0 left-0 w-64 h-64 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `radial-gradient(circle, ${accent.glow} 0%, transparent 70%)` }}
        />
        <span className="absolute top-5 right-6 font-mono text-[11px] tracking-[0.2em] text-mist/40">
          0{index + 1}
        </span>
        <div className="relative z-10">
          <div className={`w-12 h-12 rounded-generous bg-gradient-to-br ${accent.icon} border border-white/10 flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
            <FeatureGlyph kind={index} className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-[1.3rem] leading-[1.25] text-pearl">
            {item.title}
          </h3>
          <p className="mt-3 text-[0.93rem] leading-[1.7] text-mist">{item.body}</p>
          <div className={`mt-5 h-px bg-gradient-to-r ${accent.line} via-white/5 to-transparent`} />
        </div>
      </article>
    </Reveal>
  )
}

export default function Features() {
  const { t } = useLanguage()

  // Mỗi card tự Reveal once (nhẹ, không scrub) — không cần timeline section.

  return (
    <section id="features" className="section-y relative scroll-mt-20">
      <div className="container-content relative">
        <SectionHeading overline={t.features.overline} title={t.features.title} subtitle={t.features.subtitle} />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {t.features.items.map((item, i) => (
            <FeatureCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

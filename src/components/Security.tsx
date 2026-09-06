import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { WingMark } from './motion-art'

/**
 * Security v1.0.0 — khiên cánh tự vẽ + 4 cam kết.
 */
function ShieldWings({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} aria-hidden="true">
      <path
        d="M60 12 L92 26 V58 C92 82 78 98 60 108 C42 98 28 82 28 58 V26 Z"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M60 12 L92 26 V58 C92 82 78 98 60 108" stroke="currentColor" strokeWidth="1" opacity="0.35" />
      <path d="M46 58 L56 68 L76 46" stroke="#FFB9D5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 44 C22 36 32 30 42 27 M106 44 C98 36 88 30 78 27" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <circle cx="60" cy="26" r="2.5" fill="currentColor" />
    </svg>
  )
}

export default function Security() {
  const { t } = useLanguage()

  return (
    <section id="security" className="section-y relative scroll-mt-20">
      <div className="container-content">
        <div className="card relative overflow-hidden !p-8 md:!p-12">
          <div
            className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full opacity-25"
            style={{ background: 'radial-gradient(circle, rgba(255,126,182,0.35) 0%, transparent 70%)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-32 left-10 h-80 w-80 rounded-full opacity-20"
            style={{ background: 'radial-gradient(circle, rgba(255,185,213,0.28) 0%, transparent 70%)' }}
          />

          <div className="relative grid lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
            <div>
              <SectionHeading overline={t.security.overline} title={t.security.title} subtitle={t.security.subtitle} />
              <Reveal delay={0.15} className="mt-8 flex items-center gap-4">
                <ShieldWings className="w-20 h-20 text-remi shrink-0 float-subtle" />
                <div className="flex items-center gap-2 text-mist/80 text-[13px]">
                  <WingMark className="w-5 h-5 text-remi-soft/70" />
                  <span>Covenant-grade protection</span>
                </div>
              </Reveal>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {t.security.items.map((item, i) => (
                <Reveal key={i} delay={(i % 2) * 0.08}>
                  <div className="rounded-generous border border-white/10 bg-white/[0.03] p-5 h-full hover:border-remi/30 transition-colors duration-500">
                    <span className="inline-flex w-8 h-8 items-center justify-center rounded-full border border-remi/30 bg-remi/10 text-remi-soft font-mono text-[12px]">
                      ✓
                    </span>
                    <h3 className="mt-3 font-serif text-[1.05rem] text-pearl leading-snug">{item.title}</h3>
                    <p className="mt-2 text-[0.87rem] leading-relaxed text-mist/90">{item.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal delay={0.1}>
            <p className="relative mt-8 pt-6 border-t border-white/10 text-[0.85rem] text-mist/70 italic">
              {t.security.commitment}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

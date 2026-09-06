import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import { TimeDial } from './motion-art'

/**
 * Tech v1.0.0 — bảng stack + dial thời gian trang trí.
 */
export default function Tech() {
  const { t } = useLanguage()

  return (
    <section id="tech" className="section-y relative scroll-mt-20">
      <div className="container-content grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading overline={t.tech.overline} title={t.tech.title} subtitle={t.tech.subtitle} />
          <Reveal delay={0.15} className="mt-8 hidden lg:block">
            <div className="relative w-56 h-56">
              <div className="prism-halo absolute inset-0 rounded-full opacity-40" />
              <TimeDial className="relative w-full h-full text-remi/50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-serif text-3xl text-pearl">v1.0.0</p>
                  <p className="font-mono text-[10px] tracking-[0.25em] text-mist/70 mt-1">STABLE</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-3">
          {t.tech.items.map((item, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.2)} from={i % 2 === 0 ? 'right' : 'up'}>
              <div className="card !p-5 flex gap-5 items-start group">
                <span className="font-mono text-[11px] text-remi-soft/70 pt-1 shrink-0 w-8">0{i + 1}</span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <span className="text-[11px] uppercase tracking-[0.2em] text-mist/70">{item.label}</span>
                    <span className="font-serif text-[1.15rem] text-pearl group-hover:text-gradient">{item.value}</span>
                  </div>
                  <p className="mt-1.5 text-[0.9rem] text-mist/90 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

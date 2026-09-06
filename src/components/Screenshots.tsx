import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

/**
 * Screenshots v1.0.0 — 4 thẻ mockup tự vẽ bằng CSS/SVG
 * (dashboard · steam · lightbox · theme), Reveal once từng thẻ.
 */
function MockWindow({ kind, accent }: { kind: number; accent: string }) {
  return (
    <div className="rounded-generous overflow-hidden border border-white/10 bg-void/80">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.04] border-b border-white/10">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E14E8F]/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-remi-soft/80" />
        <span className="w-2.5 h-2.5 rounded-full bg-pearl/60" />
        <span className="flex-1 text-center font-mono text-[10px] text-mist/60">
          {['micah — home', 'micah — steam manager', 'micah — profile', 'micah — theme'][kind]}
        </span>
      </div>
      <div className="p-4 space-y-2.5 min-h-[150px]">
        {kind === 0 && (
          <>
            <div className="h-8 rounded-cozy bg-white/[0.06] flex items-center px-3 gap-2">
              <span className="w-3 h-3 rounded-full border border-white/20" />
              <span className="h-2 w-2/3 rounded-full bg-white/10" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-14 rounded-cozy border border-white/10 bg-white/[0.03] p-2">
                  <div className="h-6 rounded bg-gradient-to-br opacity-70" style={{ backgroundImage: `linear-gradient(135deg, ${accent}55, transparent)` }} />
                  <div className="mt-2 h-1.5 w-3/4 rounded-full bg-white/10" />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="h-6 flex-1 rounded-full" style={{ background: 'linear-gradient(90deg, #FF7EB6, #FFB9D5)' }} />
              <div className="h-6 w-16 rounded-full border border-white/15" />
            </div>
          </>
        )}
        {kind === 1 && (
          <>
            <div className="flex gap-1.5">
              {['Status', 'Games', 'Logs', 'Settings', 'Updater'].map((tab, i) => (
                <span key={tab} className={`text-[9px] font-mono px-2 py-1 rounded ${i === 0 ? 'text-void font-semibold' : 'text-mist border border-white/10'}`} style={i === 0 ? { background: accent } : undefined}>
                  {tab}
                </span>
              ))}
            </div>
            {[85, 60, 72].map((w, i) => (
              <div key={i} className="space-y-1">
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${w}%`, background: `linear-gradient(90deg, ${accent}, transparent)` }} />
                </div>
              </div>
            ))}
            <div className="font-mono text-[10px] text-mist/70 space-y-1 pt-1">
              <p><span style={{ color: accent }}>[OK]</span> Steam connected</p>
              <p><span style={{ color: accent }}>[OK]</span> 124 titles synced</p>
            </div>
          </>
        )}
        {kind === 2 && (
          <>
            <div className="flex gap-3">
              <div className="w-16 h-20 rounded-cozy shrink-0" style={{ background: `linear-gradient(160deg, ${accent}66, rgba(255,255,255,0.04))` }} />
              <div className="flex-1 space-y-2 pt-1">
                <div className="h-2.5 w-4/5 rounded-full bg-white/15" />
                <div className="h-2 w-3/5 rounded-full bg-white/10" />
                <div className="flex gap-1 pt-1">
                  {[0, 1, 2, 3].map((i) => (
                    <span key={i} className="text-[10px]" style={{ color: i < 3 ? accent : 'rgba(255,255,255,0.2)' }}>★</span>
                  ))}
                </div>
              </div>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10" />
            <div className="h-2 w-2/3 rounded-full bg-white/10" />
          </>
        )}
        {kind === 3 && (
          <>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-20 rounded-cozy p-2.5" style={{ background: 'linear-gradient(160deg, #14101F, #0A0812)', border: '1px solid rgba(255,255,255,0.12)' }}>
                <div className="h-2 w-1/2 rounded-full mb-2" style={{ background: accent }} />
                <div className="h-1.5 w-full rounded-full bg-white/10 mb-1.5" />
                <div className="h-1.5 w-2/3 rounded-full bg-white/10" />
              </div>
              <div className="h-20 rounded-cozy p-2.5 bg-[#FFF8F1]">
                <div className="h-2 w-1/2 rounded-full mb-2" style={{ background: accent }} />
                <div className="h-1.5 w-full rounded-full bg-black/10 mb-1.5" />
                <div className="h-1.5 w-2/3 rounded-full bg-black/10" />
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 pt-1">
              <span className="w-8 h-4 rounded-full bg-white/10 relative">
                <span className="absolute right-0.5 top-0.5 w-3 h-3 rounded-full" style={{ background: accent }} />
              </span>
              <span className="font-mono text-[10px] text-mist/60">pink accent</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const ACCENTS = ['#FF7EB6', '#FF9CC6', '#FFB9D5', '#E14E8F']

export default function Screenshots() {
  const { t } = useLanguage()

  return (
    <section id="showcase" className="section-y relative scroll-mt-20">
      <div className="container-content">
        <SectionHeading overline={t.screenshots.overline} title={t.screenshots.title} subtitle={t.screenshots.subtitle} align="center" />
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {t.screenshots.items.map((item, i) => (
            <Reveal key={i} delay={(i % 4) * 0.08}>
              <div className="group">
                <div className="transition-transform duration-500 group-hover:-translate-y-2 will-change-transform">
                  <MockWindow kind={i % 4} accent={ACCENTS[i % 4]} />
                </div>
                <h3 className="mt-4 font-serif text-[1.05rem] text-pearl">{item.title}</h3>
                <p className="mt-1.5 text-[0.85rem] leading-relaxed text-mist/85">{item.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

/**
 * FAQ v1.0.0 — accordion grid-rows (không animate height gây lag),
 * một mục mở tại một thời điểm.
 */
function FaqItem({ q, a, open, onToggle, index }: { q: string; a: string; open: boolean; onToggle: () => void; index: number }) {
  return (
    <div
      className={`rounded-generous border overflow-hidden transition-colors duration-300 ${
        open ? 'border-remi/35 bg-remi/[0.05]' : 'border-white/10 bg-white/[0.02] hover:border-white/20'
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full flex items-center gap-4 text-left px-5 md:px-6 py-4 md:py-5 min-h-[56px]"
      >
        <span className={`font-mono text-[11px] shrink-0 ${open ? 'text-remi-soft' : 'text-mist/50'}`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className={`flex-1 font-serif text-[1.02rem] md:text-[1.08rem] ${open ? 'text-pearl' : 'text-pearl/90'}`}>{q}</span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full border flex items-center justify-center text-[16px] leading-none transition-transform duration-500 will-change-transform ${
            open ? 'rotate-45 border-remi/50 text-remi-soft bg-remi/10' : 'border-white/15 text-mist'
          }`}
        >
          +
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="px-5 md:px-6 pb-5 pl-[52px] md:pl-[56px] text-[0.92rem] leading-[1.7] text-mist">{a}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section-y relative scroll-mt-20">
      <div className="container-content grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
        <div className="lg:sticky lg:top-28">
          <SectionHeading overline={t.faq.overline} title={t.faq.title} subtitle={t.faq.subtitle} />
        </div>
        <div className="space-y-3">
          {t.faq.items.map((item, i) => (
            <Reveal key={`${item.q}-${i}`} delay={Math.min(i * 0.04, 0.16)}>
              <FaqItem
                q={item.q}
                a={item.a}
                index={i}
                open={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

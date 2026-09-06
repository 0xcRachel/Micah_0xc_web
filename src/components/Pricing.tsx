import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import MagneticButton from './MagneticButton'
import { DownloadIcon } from './icons'
import { FlowerSigil } from './motion-art'

/**
 * Pricing v1.0.0 — Free / Supporter, thẻ highlight viền prism.
 */
export default function Pricing() {
  const { t } = useLanguage()

  return (
    <section id="pricing" className="section-y relative scroll-mt-20">
      <div className="container-content">
        <SectionHeading overline={t.pricing.overline} title={t.pricing.title} subtitle={t.pricing.subtitle} align="center" />
        <div className="mt-12 grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {t.pricing.plans.map((plan, i) => (
            <Reveal key={i} delay={i * 0.1} className="h-full">
              <div
                className={`relative rounded-very p-8 h-full overflow-hidden ${
                  plan.highlighted
                    ? 'border border-remi/40 bg-gradient-to-b from-remi/10 via-abyss to-abyss shadow-glow'
                    : 'card'
                }`}
              >
                {plan.highlighted && (
                  <>
                    <div className="absolute top-0 inset-x-8 h-px bg-gradient-to-r from-transparent via-remi to-transparent" />
                    <FlowerSigil className="absolute -right-8 -top-8 w-32 h-32 text-remi/15" />
                    <span className="absolute top-5 right-5 rounded-full bg-gradient-to-r from-remi to-remi-soft px-3 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-void">
                      ✦ Supporter
                    </span>
                  </>
                )}
                <h3 className="font-serif text-[1.4rem] text-pearl">{plan.name}</h3>
                <p className="mt-2 text-[0.9rem] text-mist/85">{plan.description}</p>
                <p className="mt-5">
                  <span className={`font-serif text-[2.2rem] ${plan.highlighted ? 'text-gradient' : 'text-pearl'}`}>{plan.price}</span>
                  <span className="ml-2 text-[0.85rem] text-mist/70">/ {plan.period}</span>
                </p>
                <ul className="mt-6 space-y-2.5">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2.5 text-[0.9rem] text-mist">
                      <span className={`mt-0.5 inline-flex w-5 h-5 items-center justify-center rounded-full text-[11px] shrink-0 ${plan.highlighted ? 'bg-remi/20 text-remi-soft' : 'bg-white/10 text-pearl/80'}`}>
                        ✓
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  {i === 0 ? (
                    <MagneticButton href={config.DOWNLOAD_URL} download={config.DOWNLOAD_FILE} className="btn-sand w-full justify-center" strength={0.12}>
                      <DownloadIcon />
                      {plan.cta}
                    </MagneticButton>
                  ) : (
                    <MagneticButton href={config.REPO_URL} className="btn-led w-full justify-center" strength={0.12}>
                      ♥ {plan.cta}
                    </MagneticButton>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

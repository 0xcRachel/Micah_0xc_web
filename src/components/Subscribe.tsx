import { useState } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { gsap } from '../hooks/useGsap'
import TextReveal from './TextReveal'
import Reveal from './Reveal'
import MagneticButton from './MagneticButton'
import { FeatherDivider } from './motion-art'

type Status = 'idle' | 'success' | 'error'
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Subscribe v1.0.0 — form email + thẻ Discord, reveal once.
 */
export default function Subscribe() {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setStatus('error')
      gsap.fromTo('#subscribe-form', { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)', force3D: true })
      return
    }
    setStatus('success')
    setEmail('')
    gsap.fromTo(
      '#subscribe-success',
      { opacity: 0, y: 12, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.5)', force3D: true },
    )
    setTimeout(() => setStatus('idle'), 4500)
  }

  return (
    <section id="subscribe" className="section-y relative scroll-mt-20">
      <div className="container-content">
        <div className="max-w-xl mx-auto text-center">
          <Reveal>
            <p className="overline mb-4 text-remi-soft/90">{t.subscribe.overline}</p>
          </Reveal>
          <TextReveal
            text={t.subscribe.title}
            tag="h2"
            className="font-serif text-[1.8rem] sm:text-[2.1rem] md:text-[2.5rem] leading-[1.2] text-pearl"
            stagger={0.03}
          />
          <Reveal delay={0.1}>
            <p className="mt-4 text-[1rem] md:text-[1.08rem] leading-[1.7] text-mist">
              {t.subscribe.subtitle}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <form id="subscribe-form" onSubmit={handleSubmit} className="mt-9 flex flex-col sm:flex-row gap-3 justify-center" noValidate>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle') }}
                placeholder={t.subscribe.placeholder}
                aria-label="Email"
                className={`w-full sm:w-[280px] min-h-12 rounded-[9999px] bg-white/[0.05] border px-5 py-3.5 text-[0.95rem] text-pearl placeholder:text-mist/50 focus:outline-none transition-colors duration-300 ${
                  status === 'error'
                    ? 'border-crimson/60'
                    : 'border-white/12 focus:border-remi/60'
                }`}
              />
              <MagneticButton className="btn-led shrink-0 min-h-12" strength={0.15}>
                {t.subscribe.button}
              </MagneticButton>
            </form>

            {status === 'error' && (
              <p className="mt-3 text-[0.85rem] text-crimson">{t.subscribe.error}</p>
            )}
            {status === 'success' && (
              <div id="subscribe-success" className="mt-4 inline-flex items-center gap-2.5 bg-remi/10 border border-remi/25 rounded-[9999px] px-5 py-2.5">
                <span className="text-remi-soft">✓</span>
                <p className="text-[0.875rem] text-mist">{t.subscribe.success}</p>
              </div>
            )}
          </Reveal>

          <Reveal delay={0.2}>
            <FeatherDivider className="my-9 max-w-xs mx-auto" />
            <div className="rounded-very border border-white/10 bg-white/[0.03] p-6 text-center hover:border-remi/30 transition-colors duration-500">
              <h3 className="font-serif text-[1.2rem] text-pearl">{t.subscribe.discordTitle}</h3>
              <p className="mt-2 text-[0.9rem] text-mist/90">{t.subscribe.discordBody}</p>
              <MagneticButton href={config.DISCORD_URL} className="btn-discord mt-5" strength={0.15}>
                {t.subscribe.discordCta}
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

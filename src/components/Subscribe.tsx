import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'
import TextReveal from './TextReveal'
import MagneticButton from './MagneticButton'

type Status = 'idle' | 'success' | 'error'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Subscribe() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const ctx = gsap.context(() => {
        gsap.fromTo('[data-sub-anim]',
          { y: 40, opacity: 0, scale: 0.97 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: root.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          },
        )
      }, root)
      return () => ctx.revert()
    },
    { scope: root, dependencies: [] },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setStatus('error')
      return
    }
    setStatus('success')
    if (!prefersReducedMotion() && successRef.current) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: 10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
      )
    }
    setEmail('')

    // Reset status after 4s
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section ref={root} id="subscribe" className="section-y relative">
      <div className="container-content">
        <div className="max-w-xl mx-auto text-center">
          {/* Email form */}
          <div data-sub-anim>
            <TextReveal
              text={t.subscribe.title}
              tag="h2"
              className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] text-ink"
              stagger={0.03}
            />
            <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.7] text-olive">
              {t.subscribe.subtitle}
            </p>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="mt-10 flex flex-col sm:flex-row gap-3 justify-center"
              noValidate
            >
              <div className="relative w-full sm:w-[280px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    if (status !== 'idle') setStatus('idle')
                  }}
                  placeholder={t.subscribe.placeholder}
                  aria-label="Email"
                  className="w-full rounded-pill bg-white/70 backdrop-blur-sm border border-border-warm/80 px-5 py-3.5 text-[0.95rem] text-ink placeholder:text-stone/60 focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/10 focus:bg-white transition-all duration-300 outline-none shadow-sm"
                />
              </div>
              <MagneticButton className="btn-terracotta shrink-0" strength={0.15}>
                {t.subscribe.button}
              </MagneticButton>
            </form>

            {status === 'error' && (
              <p className="mt-3 text-[0.85rem] text-crimson flex items-center gap-2 justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 shrink-0">
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
                {t.subscribe.error}
              </p>
            )}
            {status === 'success' && (
              <div
                ref={successRef}
                className="mt-4 flex items-center gap-3 bg-terracotta/5 rounded-pill px-5 py-3 mx-auto max-w-xs"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-terracotta shrink-0">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                <p className="text-[0.875rem] text-charcoal">{t.subscribe.success}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

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
      if (prefersReducedMotion() || !root.current) return

      const ctx = gsap.context(() => {
        // Set initial hidden state FIRST
        gsap.set('[data-sub-anim]', { y: 50, opacity: 0, scale: 0.94, filter: 'blur(6px)' })

        gsap.to('[data-sub-anim]', {
          y: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
          duration: 1, stagger: 0.12, ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 95%',
            end: 'top 60%',
            scrub: 0.8,
          },
        })
      }, root)

      return () => ctx.revert()
    },
    { scope: root, dependencies: [] },
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setStatus('error')
      if (!prefersReducedMotion() && formRef.current) {
        gsap.fromTo(formRef.current, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)' })
      }
      return
    }
    setStatus('success')
    if (!prefersReducedMotion() && successRef.current) {
      gsap.fromTo(successRef.current,
        { opacity: 0, y: 15, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)' },
      )
      const check = successRef.current.querySelector('.check-path')
      if (check) {
        gsap.fromTo(check,
          { strokeDashoffset: 24 },
          { strokeDashoffset: 0, duration: 0.6, delay: 0.2, ease: 'power2.out' },
        )
      }
    }
    setEmail('')
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section ref={root} id="subscribe" className="section-y relative">
      <div className="container-content">
        <div className="max-w-xl mx-auto text-center">
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

            <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col sm:flex-row gap-3 justify-center" noValidate>
              <div className="relative w-full sm:w-[280px]">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); if (status !== 'idle') setStatus('idle') }}
                  placeholder={t.subscribe.placeholder}
                  aria-label="Email"
                  className={`w-full rounded-[9999px] bg-white/70 backdrop-blur-sm border px-5 py-3.5 text-[0.95rem] text-ink placeholder:text-stone/60 focus:outline-none transition-all duration-500 shadow-sm ${
                    status === 'error'
                      ? 'border-crimson/60 focus:border-crimson/80 focus:ring-2 focus:ring-crimson/15'
                      : 'border-border-warm/80 focus:border-terracotta/50 focus:ring-2 focus:ring-terracotta/15 focus:shadow-[0_0_20px_rgba(201,100,66,0.1)]'
                  }`}
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
              <div ref={successRef} className="mt-4 flex items-center gap-3 bg-terracotta/5 rounded-[9999px] px-5 py-3 mx-auto max-w-xs">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-terracotta shrink-0">
                  <path className="check-path" d="M20 6 9 17l-5-5" style={{ strokeDasharray: 24, strokeDashoffset: 0 }} />
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
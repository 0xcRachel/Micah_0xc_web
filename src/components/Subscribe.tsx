import { useRef, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGsapMM, gsap, markWC, clearWC } from '../hooks/useGsap'
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

  useGsapMM((isMobile) => {
    const anims = markWC('[data-sub-anim]', root.current!)
    if (!anims.length) return

    if (isMobile) {
      gsap.set(anims, { y: 30, opacity: 0, scale: 0.96 })
      gsap.to(anims, {
        y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out', force3D: true,
        scrollTrigger: { trigger: root.current, start: 'top 85%', once: true },
        onComplete: () => clearWC(anims),
      })
    } else {
      gsap.set(anims, { y: 50, opacity: 0, scale: 0.94 })
      gsap.to(anims, {
        y: 0, opacity: 1, scale: 1, duration: 1, stagger: 0.12, ease: 'none', force3D: true,
        scrollTrigger: {
          trigger: root.current,
          start: 'top 95%',
          end: 'top 60%',
          scrub: 0.8,
          onLeave: () => clearWC(anims),
          onEnterBack: () => anims.forEach((el) => { el.style.willChange = 'transform, opacity' }),
        },
      })
    }
  }, root)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!EMAIL_RE.test(email)) {
      setStatus('error')
      if (formRef.current) {
        gsap.fromTo(formRef.current, { x: -8 }, { x: 0, duration: 0.5, ease: 'elastic.out(1, 0.3)', force3D: true })
      }
      return
    }
    setStatus('success')
    if (successRef.current) {
      gsap.fromTo(successRef.current,
        { opacity: 0, y: 15, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'elastic.out(1, 0.5)', force3D: true },
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
              className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] text-ivory"
              stagger={0.03}
            />
            <p className="mt-4 text-[1rem] md:text-[1.125rem] leading-[1.7] text-silver/80">
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
                  className={`w-full min-h-12 rounded-[9999px] bg-white/[0.06] backdrop-blur-sm border px-5 py-3.5 text-[0.95rem] text-ivory placeholder:text-silver/50 focus:outline-none transition-all duration-500 ${
                    status === 'error'
                      ? 'border-crimson/60 focus:border-crimson/80 focus:ring-2 focus:ring-crimson/15'
                      : 'border-white/10 focus:border-led/50 focus:ring-2 focus:ring-led/15 focus:shadow-[0_0_20px_rgba(0,224,138,0.1)]'
                  }`}
                />
              </div>
              <MagneticButton className="btn-led shrink-0 min-h-12" strength={0.15}>
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
              <div ref={successRef} className="mt-4 flex items-center gap-3 bg-led/5 border border-led/20 rounded-[9999px] px-5 py-3 mx-auto max-w-xs">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-led shrink-0">
                  <path className="check-path" d="M20 6 9 17l-5-5" style={{ strokeDasharray: 24, strokeDashoffset: 0 }} />
                </svg>
                <p className="text-[0.875rem] text-silver">{t.subscribe.success}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

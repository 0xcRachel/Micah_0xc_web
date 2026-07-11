import { useRef } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'
import TextReveal from './TextReveal'

export default function HowItWorks() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion()) return
      const ctx = gsap.context(() => {
        const steps = gsap.utils.toArray<HTMLElement>('[data-step]')

        // Progress line draw
        gsap.fromTo(
          '[data-step-line]',
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2,
            ease: 'power2.inOut',
            transformOrigin: 'top center',
            immediateRender: false,
            scrollTrigger: {
              trigger: '[data-steps]',
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          },
        )

        // Steps stagger with 3D perspective
        gsap.fromTo(steps,
          { x: -40, opacity: 0, rotateY: -5, scale: 0.97 },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power3.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '[data-steps]',
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          },
        )

        // Step numbers bounce in
        const stepNums = gsap.utils.toArray<HTMLElement>('[data-step-num]')
        stepNums.forEach((num, i) => {
          gsap.fromTo(num,
            { scale: 0, rotation: -15 },
            {
              scale: 1,
              rotation: 0,
              duration: 0.6,
              delay: 0.3 + i * 0.2,
              ease: 'back.out(2)',
              immediateRender: false,
              scrollTrigger: {
                trigger: '[data-steps]',
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            },
          )
        })

        // Step numbers parallax on scroll
        gsap.to('[data-step-num]', {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-steps]',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }, root)
      return () => ctx.revert()
    },
    { scope: root, dependencies: [] },
  )

  return (
    <section ref={root} id="howItWorks" className="section-y relative">
      <div className="container-content">
        <TextReveal
          text={t.howItWorks.title}
          tag="h2"
          className="font-serif text-[1.75rem] sm:text-[2rem] md:text-[2.5rem] leading-[1.2] text-ink max-w-2xl"
          stagger={0.03}
        />

        <ol data-steps className="mt-16 relative grid gap-8 md:gap-10" style={{ perspective: '1000px' }}>
          {/* Vertical progress line */}
          <span
            data-step-line
            className="hidden md:block absolute left-[27px] top-2 bottom-2 w-px bg-gradient-to-b from-terracotta/60 via-terracotta/20 to-border-warm origin-top"
            aria-hidden
          />
          {t.howItWorks.steps.map((step) => (
            <li
              key={step.step}
              data-step
              className="relative flex gap-5 md:gap-6 pl-0"
            >
              <div className="shrink-0">
                <span
                  data-step-num
                  className="flex items-center justify-center w-14 h-14 rounded-generous bg-sand text-terracotta font-serif text-[1.1rem] z-10 relative shadow-ring-warm hover:bg-terracotta hover:text-ivory transition-colors duration-300 cursor-default"
                >
                  {step.step}
                </span>
              </div>
              <div className="pt-1">
                <h3 className="font-serif text-[1.35rem] leading-[1.2] text-ink">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-[1.7] text-olive max-w-xl">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

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

        // Progress line draw with glow
        gsap.fromTo('[data-step-line]',
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 2.5,
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

        // Steps stagger with 3D perspective + blur
        gsap.fromTo(steps,
          { x: -60, opacity: 0, rotateY: -12, scale: 0.94, filter: 'blur(6px)' },
          {
            x: 0,
            opacity: 1,
            rotateY: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 1.1,
            stagger: 0.25,
            ease: 'power4.out',
            immediateRender: false,
            scrollTrigger: {
              trigger: '[data-steps]',
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          },
        )

        // Step numbers bounce in with rotation
        const stepNums = gsap.utils.toArray<HTMLElement>('[data-step-num]')
        stepNums.forEach((num, i) => {
          gsap.fromTo(num,
            { scale: 0, rotation: -20, filter: 'blur(4px)' },
            {
              scale: 1,
              rotation: 0,
              filter: 'blur(0px)',
              duration: 0.8,
              delay: 0.4 + i * 0.25,
              ease: 'elastic.out(1, 0.4)',
              immediateRender: false,
              scrollTrigger: {
                trigger: '[data-steps]',
                start: 'top 70%',
                toggleActions: 'play none none none',
              },
            },
          )
        })

        // Step numbers parallax on scroll — varying depths
        gsap.to('[data-step-num]', {
          yPercent: -30,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-steps]',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })

        // Step content parallax — slightly different speed for depth
        gsap.to('[data-step-content]', {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: '[data-steps]',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
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

        <ol data-steps className="mt-16 relative grid gap-8 md:gap-10" style={{ perspective: '1200px' }}>
          {/* Vertical progress line with glow */}
          <span
            data-step-line
            className="hidden md:block absolute left-[27px] top-2 bottom-2 w-px origin-top"
            aria-hidden
          >
            <span className="absolute inset-0 bg-gradient-to-b from-terracotta/60 via-terracotta/20 to-border-warm" />
            <span className="absolute inset-0 bg-gradient-to-b from-terracotta/30 via-transparent to-transparent blur-[3px]" />
          </span>

          {t.howItWorks.steps.map((step) => (
            <li
              key={step.step}
              data-step
              className="relative flex gap-5 md:gap-6 pl-0 group"
            >
              <div className="shrink-0">
                <span
                  data-step-num
                  className="flex items-center justify-center w-14 h-14 rounded-generous bg-sand text-terracotta font-serif text-[1.1rem] z-10 relative shadow-ring-warm hover:bg-terracotta hover:text-ivory hover:shadow-[0_0_25px_rgba(201,100,66,0.3)] transition-all duration-500 cursor-default group-hover:scale-110"
                >
                  {step.step}
                </span>
              </div>
              <div data-step-content className="pt-1">
                <h3 className="font-serif text-[1.35rem] leading-[1.2] text-ink group-hover:text-terracotta transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="mt-2 text-[0.95rem] leading-[1.7] text-olive max-w-xl group-hover:text-ink transition-colors duration-300">
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
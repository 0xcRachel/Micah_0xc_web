import { useRef } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { useGSAP, gsap, prefersReducedMotion } from '../hooks/useGsap'
import { GithubIcon, DiscordIcon } from './icons'

export default function Footer() {
  const { t } = useLanguage()
  const root = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return

      const ctx = gsap.context(() => {
        // Set initial hidden state FIRST
        gsap.set('[data-footer-col]', { y: 40, opacity: 0, filter: 'blur(4px)' })
        gsap.set('[data-footer-bottom]', { y: 20, opacity: 0 })

        gsap.to('[data-footer-col]', {
          y: 0, opacity: 1, filter: 'blur(0px)',
          duration: 1, stagger: 0.08, ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top 95%',
            end: 'top 70%',
            scrub: 0.8,
          },
        })

        gsap.to('[data-footer-bottom]', {
          y: 0, opacity: 1, duration: 1, ease: 'none',
          scrollTrigger: {
            trigger: '[data-footer-bottom]',
            start: 'top 98%',
            end: 'top 85%',
            scrub: 0.8,
          },
        })
      }, root)

      return () => ctx.revert()
    },
    { scope: root, dependencies: [] },
  )

  const navClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const linkClass = 'text-[0.875rem] text-silver hover:text-ivory transition-all duration-300 inline-flex items-center gap-2 group'
  const lineIndicator = <span className="w-0 group-hover:w-2.5 h-px bg-terracotta transition-all duration-[400ms] ease-out" />

  return (
    <footer ref={root} className="bg-ink text-ivory border-t border-ink-deep relative overflow-hidden">
      <div className="pointer-events-none absolute -top-32 left-1/4 h-64 w-64 rounded-full opacity-10 blur-[80px]" style={{ background: 'radial-gradient(circle, #c96442 0%, transparent 70%)' }} />

      <div className="container-content py-20 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div data-footer-col className="col-span-2 md:col-span-1">
            <a
              href="#top"
              onClick={(e) => navClick(e, 'top')}
              className="font-serif text-xl font-medium text-ivory hover:text-terracotta transition-all duration-300 inline-block hover:scale-[1.02]"
              style={{ textShadow: '0 0 20px transparent' }}
              onMouseEnter={(e) => { if (!prefersReducedMotion()) gsap.to(e.currentTarget, { textShadow: '0 0 25px rgba(201,100,66,0.4)', duration: 0.4 }) }}
              onMouseLeave={(e) => { if (!prefersReducedMotion()) gsap.to(e.currentTarget, { textShadow: '0 0 20px transparent', duration: 0.4 }) }}
            >
              {t.nav.brand}
            </a>
            <p className="mt-4 text-[0.85rem] leading-[1.7] text-silver max-w-xs">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { href: config.REPO_URL, icon: GithubIcon, label: 'GitHub' },
                { href: config.DISCORD_URL, icon: DiscordIcon, label: 'Discord' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-9 h-9 rounded-cozy bg-ink-deep flex items-center justify-center text-silver hover:text-terracotta transition-all duration-300 overflow-hidden group hover:shadow-[0_0_15px_rgba(201,100,66,0.2)]"
                  onMouseEnter={(e) => { if (!prefersReducedMotion()) gsap.to(e.currentTarget, { scale: 1.2, duration: 0.3, ease: 'back.out(1.5)' }) }}
                  onMouseLeave={(e) => { if (!prefersReducedMotion()) gsap.to(e.currentTarget, { scale: 1, duration: 0.4, ease: 'power2.out' }) }}
                >
                  <div className="absolute inset-0 bg-terracotta/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-cozy" />
                  <Icon width={16} height={16} className="relative z-10" />
                </a>
              ))}
            </div>
          </div>

          <div data-footer-col>
            <h4 className="overline !text-stone mb-5">{t.footer.sections.product}</h4>
            <ul className="space-y-3.5">
              {['features', 'howItWorks', 'download'].map((id) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={(e) => navClick(e, id)} className={linkClass}>
                    {lineIndicator}
                    {t.footer.links[id as keyof typeof t.footer.links]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div data-footer-col>
            <h4 className="overline !text-stone mb-5">{t.footer.sections.resources}</h4>
            <ul className="space-y-3.5">
              <li>
                <a href={config.REPO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <GithubIcon width={14} height={14} className="group-hover:text-terracotta transition-colors shrink-0" />
                  {t.footer.links.github}
                </a>
              </li>
              <li>
                <a href={config.DISCORD_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <DiscordIcon width={14} height={14} className="group-hover:text-terracotta transition-colors shrink-0" />
                  {t.footer.links.discord}
                </a>
              </li>
              <li>
                <a href="#architecture" onClick={(e) => navClick(e, 'architecture')} className={linkClass}>
                  {lineIndicator}
                  {t.footer.links.architecture}
                </a>
              </li>
            </ul>
          </div>

          <div data-footer-col>
            <h4 className="overline !text-stone mb-5">{t.footer.sections.legal}</h4>
            <ul className="space-y-3.5">
              <li>
                <a href="#license" onClick={(e) => navClick(e, 'license')} className={linkClass}>
                  {lineIndicator}
                  {t.footer.links.license}
                </a>
              </li>
              <li>
                <span className="text-[0.875rem] text-stone/60 cursor-default inline-flex items-center gap-2">
                  <span className="w-0.5 h-0.5 rounded-full bg-stone/30" />
                  {t.footer.links.privacy}
                </span>
              </li>
              <li>
                <span className="text-[0.875rem] text-stone/60 cursor-default inline-flex items-center gap-2">
                  <span className="w-0.5 h-0.5 rounded-full bg-stone/30" />
                  {t.footer.links.terms}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div data-footer-bottom className="mt-16 pt-8 border-t border-ink-deep flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-[0.8rem] text-stone/60">{t.footer.copyright}</p>
          <p className="text-[0.8rem] text-stone/60">{t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}
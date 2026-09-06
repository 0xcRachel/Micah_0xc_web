import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { GithubIcon, DiscordIcon } from './icons'
import Reveal from './Reveal'

/**
 * Footer v1.0.0 — abyss + prism top line, reveal once.
 */
export default function Footer() {
  const { t } = useLanguage()

  const navClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const linkClass = 'text-[0.875rem] text-mist hover:text-pearl transition-colors duration-300 inline-flex items-center gap-2 group'

  return (
    <footer className="bg-abyss text-pearl border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 inset-x-10 h-px bg-gradient-to-r from-transparent via-remi/60 via-remi-soft/50 to-transparent" />
      <div
        className="pointer-events-none absolute -top-24 left-1/3 h-64 w-64 rounded-full opacity-15"
        style={{ background: 'radial-gradient(circle, rgba(255,126,182,0.5) 0%, transparent 70%)' }}
      />

      <div className="container-content py-16 md:py-20 relative">
        <Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <div className="col-span-2 md:col-span-1">
              <a
                href="#top"
                onClick={(e) => navClick(e, 'top')}
                className="flex items-center gap-2 font-serif text-xl font-medium text-pearl hover:text-remi-soft transition-colors duration-300"
              >
                <img
                  src="/img/icon.png"
                  alt="Micah 0xC logo"
                  className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20"
                />
                {t.nav.brand}
                <span className="rounded-full border border-remi/30 bg-remi/10 px-2 py-0.5 font-sans text-[10px] font-semibold tracking-widest text-remi-soft">
                  v{config.VERSION}
                </span>
              </a>
              <p className="mt-4 text-[0.85rem] leading-[1.7] text-mist max-w-xs">
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
                    aria-label={label}
                    className="w-9 h-9 rounded-cozy bg-white/[0.05] border border-white/10 flex items-center justify-center text-mist hover:text-remi-soft hover:border-remi/40 transition-colors duration-300"
                  >
                    <Icon width={16} height={16} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="overline mb-5">{t.footer.sections.product}</h4>
              <ul className="space-y-3.5">
                {(['features', 'tech', 'download'] as const).map((id) => (
                  <li key={id}>
                    <a href={`#${id}`} onClick={(e) => navClick(e, id)} className={linkClass}>
                      <span className="w-0 group-hover:w-2.5 h-px bg-remi transition-all duration-300" />
                      {t.footer.links[id]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="overline mb-5">{t.footer.sections.resources}</h4>
              <ul className="space-y-3.5">
                <li>
                  <a href={config.REPO_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <GithubIcon width={14} height={14} className="shrink-0" />
                    {t.footer.links.github}
                  </a>
                </li>
                <li>
                  <a href="#faq" onClick={(e) => navClick(e, 'faq')} className={linkClass}>
                    <span className="w-0 group-hover:w-2.5 h-px bg-remi transition-all duration-300" />
                    {t.footer.links.faq}
                  </a>
                </li>
                <li>
                  <a href="#security" onClick={(e) => navClick(e, 'security')} className={linkClass}>
                    <span className="w-0 group-hover:w-2.5 h-px bg-remi transition-all duration-300" />
                    {t.footer.links.security}
                  </a>
                </li>
                <li>
                  <a href={config.ISSUE_URL} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    <DiscordIcon width={14} height={14} className="shrink-0" />
                    {t.footer.links.report}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="overline mb-5">{t.footer.sections.legal}</h4>
              <ul className="space-y-3.5">
                <li><span className="text-[0.875rem] text-mist/50 cursor-default">{t.footer.links.privacy}</span></li>
                <li><span className="text-[0.875rem] text-mist/50 cursor-default">{t.footer.links.terms}</span></li>
              </ul>
              <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-mist/40 uppercase">
                Temporal Lumiflux ✦ v{config.VERSION}
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-[0.8rem] text-mist/60">{t.footer.copyright}</p>
          <p className="text-[0.8rem] text-mist/60">{t.footer.builtWith} {t.footer.madeWith}</p>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { gsap, useGsapMM } from '../hooks/useGsap'
import { DownloadIcon } from './icons'
import MagneticButton from './MagneticButton'

const NAV_LINKS = [
  { id: 'features', key: 'features' as const },
  { id: 'tech', key: 'tech' as const },
  { id: 'security', key: 'security' as const },
  { id: 'pricing', key: 'pricing' as const },
  { id: 'faq', key: 'faq' as const },
]

export default function Navbar() {
  const { t, lang, toggle } = useLanguage()
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Sliding indicator — chỉ animate x (transform)
  useEffect(() => {
    const indicator = indicatorRef.current
    const links = linksRef.current
    if (!indicator || !links) return
    const activeLink = links.querySelector(`[data-nav-link="${activeSection}"]`) as HTMLElement | null
    if (!activeLink) return
    indicator.style.width = `${activeLink.offsetWidth}px`
    gsap.to(indicator, { x: activeLink.offsetLeft, duration: 0.55, ease: 'expo.out', force3D: true })
  }, [activeSection])

  useGsapMM(() => {
    gsap.fromTo(
      navRef.current,
      { y: -28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power4.out', immediateRender: false, force3D: true },
    )
    if (progressRef.current) {
      gsap.fromTo(progressRef.current, { scaleX: 0 }, {
        scaleX: 1,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      })
    }
  }, navRef)

  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer || !mobileOpen) return
    const links = drawer.querySelectorAll('a, button')
    gsap.fromTo(
      links,
      { y: -10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.32, stagger: 0.045, delay: 0.1, ease: 'power3.out', immediateRender: false, force3D: true },
    )
  }, [mobileOpen])

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-500 ${
        scrolled
          ? 'bg-void/85 border-b border-white/10 shadow-lg shadow-black/40'
          : 'bg-transparent border-b border-transparent'
      }`}
      style={scrolled ? { backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' } : undefined}
    >
      {/* Scroll progress — prism gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
        <div
          ref={progressRef}
          className="h-full origin-left relative"
          style={{ transform: 'scaleX(0)', background: 'linear-gradient(90deg, #E14E8F, #FF7EB6, #FFB9D5)' }}
        />
      </div>

      <nav className="container-content flex items-center justify-between h-16">
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="flex items-center gap-2 font-serif text-xl font-medium text-pearl tracking-tight hover:text-remi-soft transition-colors duration-300"
        >
          <img
            src="/img/icon.png"
            alt="Micah 0xC logo"
            className="w-7 h-7 rounded-full object-cover ring-1 ring-white/20 transition-transform duration-500 hover:rotate-[15deg]"
          />
          {t.nav.brand}
          <span className="hidden sm:inline-flex items-center rounded-full border border-remi/30 bg-remi/10 px-2 py-0.5 font-sans text-[10px] font-semibold tracking-widest text-remi-soft">
            v{config.VERSION}
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center relative" ref={linksRef}>
          <div
            ref={indicatorRef}
            className="absolute h-8 rounded-cozy bg-remi/10 border border-remi/20 pointer-events-none"
            style={{ top: '50%', transform: 'translateY(-50%)', width: 0 }}
          />
          <div className="flex items-center gap-1 relative">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  data-nav-link={link.id}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative px-4 py-2 text-[14px] rounded-cozy transition-colors duration-300 ${
                    isActive ? 'text-remi-soft' : 'text-mist hover:text-pearl'
                  }`}
                >
                  {t.nav[link.key]}
                </a>
              )
            })}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="text-[13px] font-medium text-mist hover:text-pearl px-3 py-2 rounded-cozy hover:bg-white/10 transition-colors duration-300"
            aria-label="Toggle language"
          >
            <span className={`transition-opacity duration-300 ${lang === 'en' ? 'opacity-100 text-pearl' : 'opacity-40'}`}>EN</span>
            <span className="mx-1 opacity-30">/</span>
            <span className={`transition-opacity duration-300 ${lang === 'vi' ? 'opacity-100 text-pearl' : 'opacity-40'}`}>VI</span>
          </button>

          <MagneticButton
            href={config.DOWNLOAD_URL}
            download={config.DOWNLOAD_FILE}
            className="hidden sm:inline-flex btn-led !px-4 !py-2 text-[14px]"
            strength={0.15}
          >
            <DownloadIcon />
            {t.nav.download}
          </MagneticButton>

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 text-pearl min-w-12 min-h-12 flex items-center justify-center"
            aria-label="Toggle menu"
          >
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {mobileOpen ? (
                <>
                  <path d="m6 6 12 12" />
                  <path d="m18 6-12 12" />
                </>
              ) : (
                <>
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        ref={drawerRef}
        className="md:hidden bg-void/95 border-t border-white/10 overflow-hidden grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: mobileOpen ? '1fr' : '0fr', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
      >
        <div className="overflow-hidden">
          <div className="container-content py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className={`py-3 px-3 min-h-12 flex items-center text-[15px] rounded-cozy transition-colors duration-200 ${
                  activeSection === link.id
                    ? 'text-remi-soft bg-remi/10 font-medium'
                    : 'text-mist hover:text-pearl hover:bg-white/10'
                }`}
              >
                {t.nav[link.key]}
              </a>
            ))}
            <MagneticButton
              href={config.DOWNLOAD_URL}
              download={config.DOWNLOAD_FILE}
              className="btn-led mt-3 w-full justify-center"
              strength={0.1}
            >
              <DownloadIcon />
              {t.nav.download} · v{config.VERSION}
            </MagneticButton>
          </div>
        </div>
      </div>
    </header>
  )
}

import { useEffect, useRef, useState } from 'react'
import { config } from '../config'
import { useLanguage } from '../i18n/LanguageContext'
import { gsap, ScrollTrigger, useGSAP } from '../hooks/useGsap'
import { DownloadIcon } from './icons'
import MagneticButton from './MagneticButton'

const NAV_LINKS = [
  { id: 'features', key: 'features' as const },
  { id: 'architecture', key: 'architecture' as const },
  { id: 'howItWorks', key: 'howItWorks' as const },
  { id: 'license', key: 'license' as const },
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

  // Track active section
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )

    sections.forEach((s) => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  // Animate sliding indicator
  useEffect(() => {
    const indicator = indicatorRef.current
    const links = linksRef.current
    if (!indicator || !links) return

    const activeLink = links.querySelector(`[data-nav-link="${activeSection}"]`) as HTMLElement | null
    if (!activeLink) return

    gsap.to(indicator, {
      x: activeLink.offsetLeft,
      width: activeLink.offsetWidth,
      duration: 0.5,
      ease: 'elastic.out(1, 0.4)',
    })
  }, [activeSection])

  useGSAP(
    () => {
      if (!navRef.current) return
      gsap.fromTo(navRef.current,
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out', immediateRender: false },
      )

      if (progressRef.current) {
        gsap.to(progressRef.current, {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.3,
          },
        })
      }
    },
    { scope: navRef, dependencies: [] },
  )

  useEffect(() => {
    const drawer = drawerRef.current
    if (!drawer) return

    if (mobileOpen) {
      gsap.set(drawer, { display: 'block', height: 0, opacity: 0 })
      const links = drawer.querySelectorAll('a, button')
      gsap.to(drawer, {
        height: 'auto',
        opacity: 1,
        duration: 0.4,
        ease: 'power3.out',
      })
      gsap.fromTo(links,
        { y: -12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, stagger: 0.05, delay: 0.12, ease: 'power3.out', immediateRender: false },
      )
    } else {
      gsap.to(drawer, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.set(drawer, { display: 'none' })
        },
      })
    }
  }, [mobileOpen])

  const handleNavClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault()
    setMobileOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header
      ref={navRef}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-parchment/90 backdrop-blur-xl border-b border-border-cream/60 shadow-sm shadow-black/[0.02]'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      {/* Scroll progress bar */}
      <div
        ref={progressRef}
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-terracotta to-terracotta/60 origin-left"
        style={{ transform: 'scaleX(0)' }}
        aria-hidden
      />
      <nav className="container-content flex items-center justify-between h-16">
        {/* Brand */}
        <a
          href="#top"
          onClick={(e) => handleNavClick(e, 'top')}
          className="font-serif text-xl font-medium text-ink tracking-tight hover:text-terracotta transition-colors duration-300"
        >
          {t.nav.brand}
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center" ref={linksRef}>
          {/* Sliding indicator */}
          <div
            ref={indicatorRef}
            className="absolute h-8 rounded-cozy bg-terracotta/10 pointer-events-none transition-none"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
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
                  className={`relative px-4 py-2 text-[14px] rounded-cozy transition-all duration-300 ${
                    isActive
                      ? 'text-terracotta'
                      : 'text-olive hover:text-ink'
                  }`}
                >
                  {t.nav[link.key]}
                </a>
              )
            })}
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            className="text-[13px] font-medium text-olive hover:text-ink px-3 py-2 rounded-cozy hover:bg-sand/60 transition-all duration-300"
            aria-label="Toggle language"
          >
            <span className={`transition-opacity duration-300 ${lang === 'en' ? 'opacity-100 text-ink' : 'opacity-40'}`}>EN</span>
            <span className="mx-1 opacity-30">/</span>
            <span className={`transition-opacity duration-300 ${lang === 'vi' ? 'opacity-100 text-ink' : 'opacity-40'}`}>VI</span>
          </button>

          <MagneticButton
            href={config.DOWNLOAD_URL}
            className="hidden sm:inline-flex btn-terracotta !px-4 !py-2 text-[14px] relative group"
            strength={0.15}
          >
            <DownloadIcon />
            {t.nav.download}
            {config.DOWNLOAD_COMING_SOON && (
              <span className="hidden md:block absolute -bottom-9 right-0 whitespace-nowrap bg-ink text-ivory text-[11px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {t.nav.comingSoon}
              </span>
            )}
          </MagneticButton>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 text-ink"
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
        className="md:hidden bg-parchment/95 backdrop-blur-xl border-t border-border-cream/60 overflow-hidden"
        style={{ display: 'none', height: 0, opacity: 0 }}
      >
        <div className="container-content py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className={`py-3 px-3 text-[15px] rounded-cozy transition-all duration-200 ${
                activeSection === link.id
                  ? 'text-terracotta bg-terracotta/5 font-medium'
                  : 'text-olive hover:text-ink hover:bg-sand/40'
              }`}
            >
              {t.nav[link.key]}
            </a>
          ))}
          <MagneticButton
            href={config.DOWNLOAD_URL}
            className="btn-terracotta mt-3 w-full justify-center"
            strength={0.1}
          >
            <DownloadIcon />
            {t.nav.download}
          </MagneticButton>
        </div>
      </div>
    </header>
  )
}

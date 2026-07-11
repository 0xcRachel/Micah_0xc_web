import { useRef } from 'react'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import Architecture from './components/Architecture'
import HowItWorks from './components/HowItWorks'
import Download from './components/Download'
import Subscribe from './components/Subscribe'
import Footer from './components/Footer'
import SectionDivider from './components/SectionDivider'
import ScrollToTop from './components/ScrollToTop'
import AmbientParticles from './components/AmbientParticles'

export default function App() {
  const mainRef = useRef<HTMLElement>(null)

  return (
    <SmoothScroll>
      <LoadingScreen />
      <CustomCursor />
      <div className="noise-overlay" />
      <AmbientParticles />
      <Navbar />
      <main ref={mainRef} data-main-content>
        <Hero />
        <SectionDivider variant="warm" />
        <Features />
        <Architecture />
        <SectionDivider variant="warm" />
        <HowItWorks />
        <SectionDivider variant="warm" />
        <Download />
        <Subscribe />
      </main>
      <Footer />
      <ScrollToTop />
    </SmoothScroll>
  )
}

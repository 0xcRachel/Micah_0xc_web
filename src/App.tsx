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
import AnimatedBackground from './components/AnimatedBackground'
import SectionReveal from './components/SectionReveal'

export default function App() {
  const mainRef = useRef<HTMLElement>(null)

  return (
    <SmoothScroll>
      <LoadingScreen />
      <AnimatedBackground />
      <CustomCursor />
      <AmbientParticles />
      <Navbar />
      <main ref={mainRef} data-main-content>
        <Hero />
        <SectionDivider variant="warm" />
        <SectionReveal>
          <Features />
        </SectionReveal>
        <SectionDivider variant="warm" />
        <SectionReveal>
          <Architecture />
        </SectionReveal>
        <SectionDivider variant="warm" />
        <SectionReveal>
          <HowItWorks />
        </SectionReveal>
        <SectionDivider variant="warm" />
        <SectionReveal>
          <Download />
        </SectionReveal>
        <SectionReveal>
          <Subscribe />
        </SectionReveal>
      </main>
      <Footer />
      <ScrollToTop />
    </SmoothScroll>
  )
}
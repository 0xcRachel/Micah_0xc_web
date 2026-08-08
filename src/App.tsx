import { useRef } from 'react'
import SmoothScroll from './components/SmoothScroll'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SocialProof from './components/SocialProof'
import Features from './components/Features'
import Screenshots from './components/Screenshots'
import Tech from './components/Tech'
import Security from './components/Security'
import Pricing from './components/Pricing'
import FAQ from './components/FAQ'
import Download from './components/Download'
import Subscribe from './components/Subscribe'
import Footer from './components/Footer'
import SectionDivider from './components/SectionDivider'
import ScrollToTop from './components/ScrollToTop'

export default function App() {
  const mainRef = useRef<HTMLElement>(null)

  return (
    <SmoothScroll>
      <Background />
      <LoadingScreen />
      <CustomCursor />
      <Navbar />
      <main ref={mainRef} data-main-content>
        <Hero />
        <SocialProof />
        <SectionDivider variant="warm" />
        <Features />
        <Screenshots />
        <Tech />
        <Security />
        <Pricing />
        <FAQ />
        <SectionDivider variant="warm" />
        <Download />
        <Subscribe />
      </main>
      <Footer />
      <ScrollToTop />
    </SmoothScroll>
  )
}

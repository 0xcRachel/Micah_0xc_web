import { useEffect, useRef, useState } from 'react'
import { gsap, prefersReducedMotion } from '../hooks/useGsap'

export default function LoadingScreen() {
  const containerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLHeadingElement>(null)
  const line1Ref = useRef<HTMLDivElement>(null)
  const line2Ref = useRef<HTMLDivElement>(null)
  const line3Ref = useRef<HTMLDivElement>(null)
  const line4Ref = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.add('loaded')
      setShow(false)
      return
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setShow(false),
      })

      // Logo stamp
      tl.fromTo(textRef.current,
        { scale: 0.2, opacity: 0, rotate: -8, y: 20 },
        { scale: 1, opacity: 1, rotate: 0, y: 0, duration: 1.0, ease: 'elastic.out(1, 0.4)' },
      )

      // Typewriter lines
      const lines = [line1Ref.current, line2Ref.current, line3Ref.current, line4Ref.current]
      lines.forEach((line, i) => {
        if (!line) return
        tl.fromTo(line,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' },
          `-=${0.3 - i * 0.05}`,
        )
      })

      // Progress bar
      tl.fromTo(barRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.2',
      )

      // Curtain slide up → reveal main content
      tl.to(containerRef.current, {
        yPercent: -100, scale: 1.05,
        duration: 0.8, ease: 'power4.inOut',
      }, '+=0.15')
        .call(() => document.documentElement.classList.add('loaded'))
    })

    return () => ctx.revert()
  }, [])

  if (!show) return null

  return (
    <div ref={containerRef} className="fixed inset-0 z-[100] bg-cyber flex flex-col items-center justify-center">
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(0,224,138,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,224,138,0.3) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="text-center relative z-10">
        <h1 ref={textRef} className="font-serif text-4xl md:text-6xl text-ivory tracking-tight">
          <span className="text-led">&lt;</span>Micah<span className="text-led"> /&gt;</span>
        </h1>

        <div className="mt-6 font-mono text-[11px] text-silver/60 space-y-1">
          <div ref={line1Ref} style={{ opacity: 0 }}><span className="text-led">{'>'}</span> Initializing 0xC Protocol...</div>
          <div ref={line2Ref} style={{ opacity: 0 }}><span className="text-green-400">[OK]</span> Core engine loaded</div>
          <div ref={line3Ref} style={{ opacity: 0 }}><span className="text-green-400">[OK]</span> Security module active</div>
          <div ref={line4Ref} style={{ opacity: 0 }}><span className="text-led">{'>'}</span> Ready</div>
        </div>
      </div>

      <div className="mt-8 w-40 h-[2px] bg-white/10 rounded-full overflow-hidden relative z-10">
        <div ref={barRef} className="h-full bg-gradient-to-r from-led via-led/80 to-led/40 origin-left" style={{ transform: 'scaleX(0)' }} />
      </div>
    </div>
  )
}

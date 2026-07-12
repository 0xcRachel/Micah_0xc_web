import { useRef, useEffect } from 'react'
import { prefersReducedMotion } from '../hooks/useGsap'

interface Particle {
  x: number
  y: number
  size: number
  opacity: number
  vx: number
  vy: number
  pulse: number
  pulseSpeed: number
  hue: number
}

export default function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particles = useRef<Particle[]>([])

  useEffect(() => {
    if (prefersReducedMotion()) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles with variety
    particles.current = []
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 12000))

    for (let i = 0; i < count; i++) {
      // Different particle types: terracotta, sand, ivory
      const type = Math.random()
      let hue: number
      if (type < 0.5) {
        hue = 14 // terracotta
      } else if (type < 0.8) {
        hue = 40 // sand
      } else {
        hue = 50 // ivory warm
      }

      particles.current.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: 0.5 + Math.random() * 2.5,
        opacity: 0.05 + Math.random() * 0.15,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.01,
        hue,
      })
    }

    const animate = () => {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach((p) => {
        // Update position
        p.x += p.vx
        p.y += p.vy

        // Pulse opacity
        p.pulse += p.pulseSpeed
        const pulseFactor = 0.7 + Math.sin(p.pulse) * 0.3

        // Wrap around edges
        if (p.x < -p.size) p.x = canvas.width + p.size
        if (p.x > canvas.width + p.size) p.x = -p.size
        if (p.y < -p.size) p.y = canvas.height + p.size
        if (p.y > canvas.height + p.size) p.y = -p.size

        // Draw particle with glow
        const alpha = p.opacity * pulseFactor
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3)
        gradient.addColorStop(0, `hsla(${p.hue}, 40%, 45%, ${alpha})`)
        gradient.addColorStop(0.5, `hsla(${p.hue}, 40%, 45%, ${alpha * 0.3})`)
        gradient.addColorStop(1, `hsla(${p.hue}, 40%, 45%, 0)`)

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = gradient
        ctx.fill()

        // Draw core
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 40%, 45%, ${alpha * 1.5})`
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [])

  if (prefersReducedMotion()) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-5 pointer-events-none"
      aria-hidden="true"
    />
  )
}
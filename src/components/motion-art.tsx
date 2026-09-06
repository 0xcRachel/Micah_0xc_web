/**
 * motion-art.tsx — Bộ Motion Design tự vẽ tay cho Micah 0xC v1.0.0
 * Concept: "Remielle Dan · Temporal Lumiflux" (ZZZ)
 *  - WingMark: cánh thiên thần cách điệu (thương hiệu)
 *  - Feather: lông vũ rơi (Flower & Feather Dance)
 *  - PrismCore: lăng kính Lumiflux (attribute)
 *  - TimeDial: vòng thời gian (Temporal / Phase Flow)
 *  - FlowerSigil: hoa 6 cánh (Invitation to Bloom)
 *  - RemiEmblem: tổ hợp trung tâm cho Hero (tự vẽ 100% SVG)
 *
 * Tất cả SVG đều stroke-based, nhẹ, animate bằng transform/opacity
 * từ bên ngoài (GSAP/CSS) → không gây lag layout.
 */

interface ArtProps {
  className?: string
  style?: React.CSSProperties
}

/* ── Cánh thiên thần cách điệu (logo) ─────────────────────── */
export function WingMark({ className = '', style }: ArtProps) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M6 30 C12 22 20 16 30 12 C26 17 24 20 23 23 C29 19 34 16 39 15 C35 19 33 22 32 24 C36 23 40 23 43 24 C36 27 28 30 22 34 C16 37 10 35 6 30 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <path
        d="M10 35 C16 32 22 30 28 29"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.6"
      />
      <circle cx="35" cy="33" r="2.2" fill="currentColor" opacity="0.9" />
      <circle cx="40" cy="29" r="1.2" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

/* ── Lông vũ đơn ──────────────────────────────────────────── */
export function Feather({ className = '', style }: ArtProps) {
  return (
    <svg viewBox="0 0 24 48" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M12 2 C18 10 19 22 12 34 C5 22 6 10 12 2 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M12 4 L12 44" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      <path d="M12 12 L16 15 M12 18 L7 21 M12 24 L16 27 M12 29 L8 31" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.55" />
    </svg>
  )
}

/* ── Lăng kính Lumiflux ───────────────────────────────────── */
export function PrismCore({ className = '', style }: ArtProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} style={style} aria-hidden="true">
      <path
        d="M32 6 L54 46 L10 46 Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M32 6 L32 46 M32 6 L22 46 M32 6 L42 46" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <path d="M18 34 L46 34" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <circle cx="32" cy="34" r="4" fill="currentColor" opacity="0.85" />
      {/* tia khúc xạ */}
      <path d="M54 46 L60 52 M10 46 L4 52 M32 46 L32 56" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
    </svg>
  )
}

/* ── Vòng thời gian Temporal ──────────────────────────────── */
export function TimeDial({ className = '', style }: ArtProps) {
  const ticks = Array.from({ length: 24 })
  return (
    <svg viewBox="0 0 120 120" fill="none" className={className} style={style} aria-hidden="true">
      <circle cx="60" cy="60" r="52" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <circle cx="60" cy="60" r="40" stroke="currentColor" strokeWidth="1" opacity="0.3" strokeDasharray="3 5" />
      {ticks.map((_, i) => {
        const a = (i * Math.PI) / 12
        const long = i % 6 === 0
        const r1 = long ? 46 : 49
        const x1 = 60 + r1 * Math.cos(a)
        const y1 = 60 + r1 * Math.sin(a)
        const x2 = 60 + 52 * Math.cos(a)
        const y2 = 60 + 52 * Math.sin(a)
        return (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth={long ? 2 : 1} opacity={long ? 0.9 : 0.45} strokeLinecap="round" />
        )
      })}
      {/* kim */}
      <line x1="60" y1="60" x2="60" y2="30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="60" x2="78" y2="68" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
      <circle cx="60" cy="60" r="3.5" fill="currentColor" />
    </svg>
  )
}

/* ── Hoa 6 cánh (Invitation to Bloom) ─────────────────────── */
export function FlowerSigil({ className = '', style }: ArtProps) {
  const petals = Array.from({ length: 6 })
  return (
    <svg viewBox="0 0 80 80" fill="none" className={className} style={style} aria-hidden="true">
      {petals.map((_, i) => (
        <ellipse
          key={i}
          cx="40"
          cy="24"
          rx="9"
          ry="16"
          stroke="currentColor"
          strokeWidth="1.6"
          opacity="0.75"
          transform={`rotate(${i * 60} 40 40)`}
        />
      ))}
      <circle cx="40" cy="40" r="6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="40" cy="40" r="2.2" fill="currentColor" />
    </svg>
  )
}

/* ── Divider lông vũ + kim cương ──────────────────────────── */
export function FeatherDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-remi/40 to-remi/60" />
      <WingMark className="w-6 h-6 text-remi/70 -scale-x-100" />
      <div className="w-2 h-2 rotate-45 bg-gradient-to-br from-remi to-remi-soft shadow-glow" />
      <WingMark className="w-6 h-6 text-pearl/60" />
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-remi-soft/40 to-remi-soft/60" />
    </div>
  )
}

/* ── Emblem trung tâm cho Hero — tự vẽ hoàn toàn ────────────
   Cấu trúc: halo conic (CSS) + TimeDial quay chậm + PrismCore +
   2 cánh đối xứng + FlowerSigil + quỹ đạo lông vũ.
   Parent animate bằng GSAP (rotate/float/parallax). */
export function RemiEmblem({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* halo */}
      <div className="prism-halo absolute inset-[6%] rounded-full opacity-60" />
      {/* vòng thời gian ngoài */}
      <div data-emblem-ring className="absolute inset-0">
        <TimeDial className="w-full h-full text-remi/50" />
      </div>
      {/* vòng dashed giữa — quay chậm */}
      <div data-emblem-orbit className="absolute inset-[13%] rounded-full border border-dashed border-remi/25 spin-slower" />
      {/* cánh trái / phải */}
      <div data-emblem-wing-l className="absolute left-[2%] top-1/2 -translate-y-1/2 w-[30%] text-pearl/80 -scale-x-100">
        <WingMark className="w-full h-auto" />
      </div>
      <div data-emblem-wing-r className="absolute right-[2%] top-1/2 -translate-y-1/2 w-[30%] text-pearl/80">
        <WingMark className="w-full h-auto" />
      </div>
      {/* lăng kính trung tâm */}
      <div data-emblem-core className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[34%]">
          <div className="absolute inset-0 blur-2xl opacity-70 bg-[radial-gradient(circle,rgba(255,126,182,0.5),rgba(255,185,213,0.22),transparent_70%)]" />
          <PrismCore className="relative w-full h-auto text-remi-soft" />
        </div>
      </div>
      {/* hoa bên dưới core */}
      <div data-emblem-flower className="absolute left-1/2 bottom-[10%] -translate-x-1/2 w-[18%] text-remi-soft/80">
        <FlowerSigil className="w-full h-auto" />
      </div>
      {/* 3 lông vũ quỹ đạo */}
        <div data-emblem-feather="1" className="absolute left-[18%] top-[16%] w-5 text-remi-soft/70">
          <Feather className="w-full h-auto" />
        </div>
        <div data-emblem-feather="2" className="absolute right-[16%] top-[24%] w-4 text-pearl/60">
          <Feather className="w-full h-auto" />
        </div>
        <div data-emblem-feather="3" className="absolute left-[30%] bottom-[22%] w-4 text-remi/60">
          <Feather className="w-full h-auto" />
        </div>
        {/* 4 sparkle */}
        <div data-emblem-spark="1" className="absolute left-[42%] top-[8%] w-1.5 h-1.5 rounded-full bg-remi-soft shadow-glow" />
        <div data-emblem-spark="2" className="absolute right-[30%] top-[55%] w-1 h-1 rounded-full bg-pearl" />
        <div data-emblem-spark="3" className="absolute left-[26%] top-[62%] w-1.5 h-1.5 rounded-full bg-remi" />
        <div data-emblem-spark="4" className="absolute right-[38%] bottom-[6%] w-1 h-1 rounded-full bg-remi-soft/70" />
    </div>
  )
}

/* ── Avatar Emblem cho Hero — ảnh icon của chủ site ────────────
   Giữ nguyên toàn bộ motion design xung quanh (halo + time dial +
   quỹ đạo + lông vũ + sparkle), chỉ thay lõi prism bằng avatar.
   Giữ nguyên các data-attribute để code GSAP ở Hero chạy như cũ. */
export function AvatarEmblem({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {/* halo */}
      <div className="prism-halo absolute inset-[6%] rounded-full opacity-60" />
      {/* vòng thời gian ngoài */}
      <div data-emblem-ring className="absolute inset-0">
        <TimeDial className="w-full h-full text-remi/50" />
      </div>
      {/* vòng dashed giữa — quay chậm */}
      <div data-emblem-orbit className="absolute inset-[13%] rounded-full border border-dashed border-remi/25 spin-slower" />

      {/* avatar ảnh + viền hồng tối giản */}
      <div data-emblem-core className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-[60%]">
          <div className="absolute -inset-8 rounded-full opacity-70 blur-2xl bg-[radial-gradient(circle,rgba(255,126,182,0.4),transparent_70%)]" />
          <div
            className="relative rounded-full p-[3px] shadow-glow"
            style={{ background: 'conic-gradient(from 0deg, #FF7EB6, #FFB9D5, #FFF8F1, #E14E8F, #FF7EB6)' }}
          >
            <img
              src="/img/icon.png"
              alt=""
              draggable={false}
              className="block w-full h-auto rounded-full object-cover bg-void select-none"
            />
          </div>
        </div>
      </div>
      {/* 3 lông vũ quỹ đạo */}
      <div data-emblem-feather="1" className="absolute left-[16%] top-[14%] w-5 text-remi-soft/70">
        <Feather className="w-full h-auto" />
      </div>
      <div data-emblem-feather="2" className="absolute right-[14%] top-[22%] w-4 text-pearl/60">
        <Feather className="w-full h-auto" />
      </div>
      <div data-emblem-feather="3" className="absolute left-[28%] bottom-[20%] w-4 text-remi/60">
        <Feather className="w-full h-auto" />
      </div>
      {/* 4 sparkle */}
      <div data-emblem-spark="1" className="absolute left-[42%] top-[6%] w-1.5 h-1.5 rounded-full bg-remi-soft shadow-glow" />
      <div data-emblem-spark="2" className="absolute right-[28%] top-[55%] w-1 h-1 rounded-full bg-pearl" />
      <div data-emblem-spark="3" className="absolute left-[24%] top-[62%] w-1.5 h-1.5 rounded-full bg-remi" />
      <div data-emblem-spark="4" className="absolute right-[36%] bottom-[5%] w-1 h-1 rounded-full bg-remi-soft/70" />
    </div>
  )
}
/* ── Icon bộ tính năng — tự vẽ, stroke đồng nhất ──────────── */
export function FeatureGlyph({ kind, className = '' }: { kind: number; className?: string }) {
  const common = {
    viewBox: '0 0 32 32',
    fill: 'none',
    className,
    'aria-hidden': true,
  } as const
  switch (kind % 6) {
    case 0: // Smart search — orb + tia
      return (
        <svg {...common}>
          <circle cx="14" cy="14" r="7" stroke="currentColor" strokeWidth="2" />
          <circle cx="14" cy="14" r="2.5" fill="currentColor" opacity="0.8" />
          <path d="M19.5 19.5 L27 27" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M24 8 L26 10 M8 22 L6 24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      )
    case 1: // Monitoring — pulse + wing
      return (
        <svg {...common}>
          <rect x="3" y="6" width="26" height="18" rx="4" stroke="currentColor" strokeWidth="2" />
          <path d="M7 15 L12 15 L14.5 10 L17.5 20 L20 15 L25 15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="27" r="1.4" fill="currentColor" />
        </svg>
      )
    case 2: // Favorites — tim + lông vũ
      return (
        <svg {...common}>
          <path d="M16 27 C10 21 5 17 5 11.5 C5 8 7.5 5.5 11 5.5 C13.4 5.5 15.2 6.8 16 8.4 C16.8 6.8 18.6 5.5 21 5.5 C24.5 5.5 27 8 27 11.5 C27 17 22 21 16 27 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M16 12 L16 20" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.6" />
        </svg>
      )
    case 3: // Steam — bánh răng + hơi
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="5.5" stroke="currentColor" strokeWidth="2" />
          <circle cx="16" cy="16" r="1.8" fill="currentColor" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="16"
              y1="5"
              x2="16"
              y2="8.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              transform={`rotate(${deg} 16 16)`}
            />
          ))}
        </svg>
      )
    case 4: // Lua — tia spark + script
      return (
        <svg {...common}>
          <path d="M17 3 L8 18 L15 18 L14 29 L24 13 L17 13 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M5 6 L7 8 M26 24 L28 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      )
    default: // Updater — vòng thời gian + mũi tên
      return (
        <svg {...common}>
          <path d="M27 16 A11 11 0 1 1 16 5 C20 5 23.5 6.8 25.8 9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M21 4 L26 9.5 L20.5 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="16" r="2" fill="currentColor" opacity="0.8" />
        </svg>
      )
  }
}

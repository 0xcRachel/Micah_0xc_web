/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ── Remielle Dan · Temporal Lumiflux palette ──
        // Nền đêm Roscaelifer
        void: '#07060E',
        abyss: '#0D0B1A',
        // Hồng tóc Remielle — màu chủ đạo
        remi: {
          DEFAULT: '#FF7EB6',
          soft: '#FF9CC6',
          blush: '#FFB9D5',
          deep: '#E14E8F',
          50: 'rgba(255,126,182,0.06)',
          100: 'rgba(255,126,182,0.12)',
          200: 'rgba(255,126,182,0.24)',
        },
        // Vàng Lumiflux — hào quang thiên thần
        lumi: {
          DEFAULT: '#FFE29A',
          soft: '#FFF0C4',
          deep: '#E8B84B',
        },
        // Cyan Lumiflux attribute
        flux: {
          DEFAULT: '#8AE9FF',
          soft: '#C2F4FF',
          deep: '#38BDF8',
        },
        // Tím prism
        prism: {
          DEFAULT: '#B79CFF',
          soft: '#D6C6FF',
          deep: '#7C5CFC',
        },
        // Trắng thiên thần + text phụ
        pearl: '#FFF8F1',
        mist: '#A7A3BE',
        // Compat cũ (map sang palette mới để không vỡ)
        ink: {
          DEFAULT: '#0D0B1A',
          deep: '#07060E',
        },
        cyber: '#07060E',
        led: {
          DEFAULT: '#FF7EB6',
          light: '#FFB9D5',
          dark: '#E14E8F',
          50: 'rgba(255,126,182,0.05)',
          100: 'rgba(255,126,182,0.1)',
          200: 'rgba(255,126,182,0.2)',
        },
        parchment: '#FFF8F1',
        ivory: '#FFF8F1',
        sand: '#FFE29A',
        charcoal: '#CFCAE2',
        olive: '#A7A3BE',
        stone: '#8B87A3',
        silver: '#C6C2D8',
        'border-cream': 'rgba(255,255,255,0.1)',
        'border-warm': 'rgba(255,255,255,0.1)',
        ring: {
          DEFAULT: '#2A2640',
          subtle: '#201D33',
          deep: '#35314E',
        },
        crimson: '#FF5D7A',
        focus: '#8AE9FF',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['4rem', { lineHeight: '1.05', fontWeight: '500' }],
        section: ['3.25rem', { lineHeight: '1.15', fontWeight: '500' }],
      },
      borderRadius: {
        cozy: '8px',
        generous: '12px',
        very: '16px',
        max: '32px',
        pill: '9999px',
      },
      boxShadow: {
        whisper: 'rgba(0,0,0,0.4) 0px 8px 32px',
        'ring-1': '0 0 0 1px rgba(255,126,182,0.25)',
        'ring-warm': '0 0 0 1px rgba(255,226,154,0.25)',
        'btn-primary': '0 1px 2px rgba(255,126,182,0.35), 0 8px 24px rgba(255,126,182,0.25)',
        'btn-primary-hover': '0 2px 6px rgba(255,126,182,0.45), 0 12px 36px rgba(255,126,182,0.35)',
        'btn-secondary': '0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)',
        'btn-secondary-hover': '0 2px 12px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)',
        'btn-dark': '0 1px 2px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'btn-dark-hover': '0 2px 12px rgba(0,0,0,0.5)',
        card: '0 1px 3px rgba(0,0,0,0.5), 0 8px 32px rgba(0,0,0,0.3)',
        'card-hover': '0 4px 16px rgba(0,0,0,0.5), 0 20px 48px rgba(0,0,0,0.4)',
        glow: '0 0 48px rgba(255,126,182,0.22)',
        'glow-gold': '0 0 48px rgba(255,226,154,0.18)',
      },
      maxWidth: {
        content: '1200px',
      },
      screens: {
        xs: '479px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        shimmer: 'shimmer 2s linear infinite',
        'spin-slow': 'spin 24s linear infinite',
        'spin-slower': 'spin 48s linear infinite reverse',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}

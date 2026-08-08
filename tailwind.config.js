/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#141413',
          deep: '#30302e',
        },
        cyber: '#030303',
        led: {
          DEFAULT: '#00e08a',
          light: '#4dffb5',
          dark: '#00b86c',
          50: 'rgba(0, 224, 138, 0.05)',
          100: 'rgba(0, 224, 138, 0.1)',
          200: 'rgba(0, 224, 138, 0.2)',
        },
        parchment: '#f5f4ed',
        ivory: '#faf9f5',
        sand: '#e8e6dc',
        charcoal: '#4d4c48',
        olive: '#5e5d59',
        stone: '#87867f',
        silver: '#b0aea5',
        'border-cream': '#f0eee6',
        'border-warm': '#e8e6dc',
        ring: {
          DEFAULT: '#d1cfc5',
          subtle: '#dedcd0',
          deep: '#c2c0b6',
        },
        crimson: '#b53333',
        focus: '#3898ec',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'Arial', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      fontSize: {
        display: ['4rem', { lineHeight: '1.1', fontWeight: '500' }],
        section: ['3.25rem', { lineHeight: '1.2', fontWeight: '500' }],
      },
      borderRadius: {
        cozy: '8px',
        generous: '12px',
        very: '16px',
        max: '32px',
        pill: '9999px',
      },
      boxShadow: {
        whisper: 'rgba(0,0,0,0.05) 0px 4px 24px',
        'ring-1': '0 0 0 1px #d1cfc5',
        'ring-warm': '0 0 0 1px #e8e6dc',
        'btn-primary': '0 1px 2px rgba(0, 224, 138, 0.3), 0 4px 12px rgba(0, 224, 138, 0.15)',
        'btn-primary-hover': '0 2px 4px rgba(0, 224, 138, 0.4), 0 8px 24px rgba(0, 224, 138, 0.25)',
        'btn-secondary': '0 1px 2px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        'btn-secondary-hover': '0 2px 8px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        'btn-dark': '0 1px 2px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        'btn-dark-hover': '0 2px 8px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.08)',
        'card': '0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.06), 0 16px 40px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 40px rgba(0, 224, 138, 0.15)',
      },
      maxWidth: {
        content: '1200px',
      },
      screens: {
        xs: '479px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
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

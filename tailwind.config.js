/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          primary: '#FAFAF8',
          secondary: '#F2F3F5',
          subtle: '#ECEEEF',
        },
        ink: {
          primary: '#111216',
          secondary: '#696B73',
          muted: '#94969F',
        },
        liquid: {
          blue: '#0284c7',
          cyan: '#06b6d4',
          ice: '#67e8f9',
          lavender: '#c084fc',
          silver: '#cbd5e1',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float-slow': 'floatSlow 7s ease-in-out infinite',
        'float-gentle': 'floatGentle 4.5s ease-in-out infinite',
        'liquid-sheen': 'liquidSheen 3s ease infinite',
        'pulse-soft': 'pulseSoft 4s ease-in-out infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.03)' },
        },
        liquidSheen: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      },
      boxShadow: {
        'liquid-sm': '0 2px 8px -2px rgba(20, 24, 35, 0.04), 0 6px 16px -4px rgba(20, 24, 35, 0.04)',
        'liquid': '0 4px 14px -2px rgba(20, 24, 35, 0.04), 0 20px 40px -8px rgba(20, 24, 35, 0.07)',
        'liquid-hover': '0 8px 24px -4px rgba(2, 132, 199, 0.08), 0 28px 60px -12px rgba(20, 24, 35, 0.12)',
        'liquid-glow': '0 0 35px -5px rgba(6, 182, 212, 0.22)',
      },
    },
  },
  plugins: [],
}

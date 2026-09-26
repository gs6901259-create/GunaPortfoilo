/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#020612', // deep void black/navy
          900: '#040b19', // main background
          850: '#071024',
          800: '#0a1633', // card background
          700: '#11224d',
        },
        electric: {
          blue: '#00f0ff',
          cyan: '#38bdf8',
          deep: '#2563eb',
          glow: 'rgba(0, 240, 255, 0.4)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        }
      },
      boxShadow: {
        'electric': '0 0 25px -5px rgba(0, 240, 255, 0.35)',
        'electric-lg': '0 0 40px -5px rgba(0, 240, 255, 0.45)',
        'electric-sm': '0 0 15px -3px rgba(0, 240, 255, 0.3)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}

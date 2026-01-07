import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'catholic': {
          'red': '#8B0000',
          'gold': '#FFD700',
          'purple': '#4A148C',
          'green': '#2E8B57',
          'blue': '#1E3A8A',
          'rose': '#FF6B8B',
          'dark-red': '#4A0000',
          'light-gold': '#FFF8E1'
        }
      },
      fontFamily: {
        'serif': ['Times New Roman', 'serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'mono': ['Courier New', 'monospace'],
      },
      backgroundImage: {
        'catholic-gradient': 'linear-gradient(135deg, #8B0000 0%, #4A0000 100%)',
        'rosary-gradient': 'linear-gradient(135deg, #2E8B57 0%, #1B5E20 100%)',
        'saints-gradient': 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
        'prayer-gradient': 'linear-gradient(135deg, #1E3A8A 0%, #4A148C 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      boxShadow: {
        'catholic': '0 4px 20px rgba(139, 0, 0, 0.15)',
        'catholic-lg': '0 10px 40px rgba(139, 0, 0, 0.2)',
        'rosary': '0 4px 20px rgba(46, 139, 87, 0.15)',
      }
    },
  },
  plugins: [],
}
export default config

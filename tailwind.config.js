/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'game-bg': '#0f172a',
          'zone-home': '#60a5fa',
          'zone-tech': '#a78bfa',
          'zone-exp': '#f59e0b',
          'zone-project': '#10b981',
          'zone-edu': '#ec4899',
          'zone-contact': '#06b6d4',
          'zone-secret': '#8b5cf6'
        },
        animation: {
          'bounce-slow': 'bounce 2s infinite',
          'pulse-slow': 'pulse 3s infinite',
          'float': 'float 3s ease-in-out infinite',
          'glow': 'glow 2s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          },
          glow: {
            '0%, 100%': { boxShadow: '0 0 5px rgba(96, 165, 250, 0.5)' },
            '50%': { boxShadow: '0 0 20px rgba(96, 165, 250, 0.8)' },
          }
        },
        fontFamily: {
          'game': ['Monaco', 'Consolas', 'monospace'],
        }
      },
    },
    plugins: [],
  }
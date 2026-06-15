/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: '#050505',
          secondaryBg: '#0F0F0F',
          primary: '#FF1E1E',
          secondary: '#D90429',
          text: '#FFFFFF',
          muted: '#A0A0A0',
          border: 'rgba(255,30,30,0.25)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        'glow-primary': '0 0 20px rgba(255, 30, 30, 0.4)',
        'glow-secondary': '0 0 20px rgba(217, 4, 41, 0.4)',
      }
    },
  },
  plugins: [],
}


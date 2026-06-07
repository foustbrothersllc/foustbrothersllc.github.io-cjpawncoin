/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#1a1a1a',
          card: '#242424',
          border: '#333333',
          red: '#dc2626',
          yellow: '#facc15',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'cursive'],
        mono: ['Share Tech Mono', 'monospace'],
        body: ['Barlow', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

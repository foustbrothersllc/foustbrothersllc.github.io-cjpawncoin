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
        navy: {
          DEFAULT: '#0f172a',
          light: '#1e293b',
        },
        gold: {
          DEFAULT: '#f59e0b',
          dark: '#d97706',
          light: '#fcd34d',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

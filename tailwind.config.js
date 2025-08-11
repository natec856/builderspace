/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // Update if using a different directory structure
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      boxShadow: {
        'bottom-slate-900': '0 4px 4px -1px rgba(15, 23, 42, 0.4)',
      },
    },
  },
  plugins: [],
}

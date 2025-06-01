/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'heading': ['var(--font-fraunces)', 'serif'],
      },
    },
  },
  plugins: [],
} 
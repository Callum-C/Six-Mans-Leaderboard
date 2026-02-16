/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // We define your brand color here once, and use it everywhere!
        'chinney-purple': '#800aed',
        'chinney-gold': '#fac524',
        'chinney-dark': '#0f0f0f', // Optional: a custom dark background if you want
      },
    },
  },
  plugins: [],
}
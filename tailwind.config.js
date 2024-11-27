/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ['Playfair Display', 'serif'], // Elegant serif font for headings
        body: ['Roboto', 'sans-serif'], // Clean sans-serif font for body text
      },
    },
  },
  plugins: [],
}

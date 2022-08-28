/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html',
            './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily:{
        anton: "'Anton', serif",
        inter: "'Inter', serif",
      }
    },
  },
  plugins: [],
}

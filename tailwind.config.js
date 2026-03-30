// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F06C25',
          medium: '#F27B36',
          light: '#F69962',
        },
        secondary: {
          black: '#000000',
          dark: '#FF6911',
          light: '#F48A4C',
        },
        neutral: {
          dark: '#FAB78E',
          medium: '#FED5BA',
          light: '#FFEFE4', 
          grey: '#828282',
        },
        black: '#000000',
        white: '#FFFEF4',
      },
    },
  },
  plugins: [],
}
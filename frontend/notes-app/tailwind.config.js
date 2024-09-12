/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Colors 
      colors: {
        primary : "#BA55D3",
        secondary :"#795C34"
      }
    },
  },
  plugins: [],
}


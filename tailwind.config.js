/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'max-xs': { 'max': '480px', },
        'max-sm': { 'max': '640px', }

      },
      colors: {
        light_Orange: "#e0d9cf",
      }
    },
  },

  plugins: [

  ],
}

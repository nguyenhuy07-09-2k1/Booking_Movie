/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing:{
        "1/2": "50%",
        "1/3": "33.33%",
        "1/4": "25%",
        "1/5": "20%",
        "1/6": "16.66%",
        "2/5": "40%",
        "1/12": "8.33%"
      },
      transitionDuration: {
        '4000': '4000ms',
      },
      translate: {
        'neg-1/2': '-50%',
      },
      zIndex: {
        '1000': '1000',
        '1010': '1010',
      }
    },
  },
  plugins: [],
}

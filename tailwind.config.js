/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    container: {
      center: true,
    },
    screens : {
      print: {'raw': 'print'},
      sm   : '600px',
      md   : '960px',
      lg   : '1280px',
      xl   : '1440px'
  },
    extend: {},
  },
  plugins: [],
}


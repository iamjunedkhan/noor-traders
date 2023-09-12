/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'hero-pattern': "url('./../public/hero-two.jpg')",
          'footer-texture': "url('/img/footer-texture.png')",
      },
      
      colors:{
        dark:'#343a40'
      },
      minHeight:{
        '80':'80vh'
      }
      ,
      height:{
        '90':'90vh',
        '91':'91vh',
        '92':'92vh',
        '93':'93vh'
      },
      width:{
        '90':'90%'
      },
      brightness: {
        25: '.25',
        35: '.35',
      }
    },
  },
  plugins: [],
}
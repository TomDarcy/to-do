const tailwindForms = require('@tailwindcss/forms');
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'logo': ['Lobster Two', 'cursive'],
        'writing': ['Amatic SC', 'cursive'],
      },
      colors: {
        deepRed: '#752228',
        pinkishRed: '#A3232B',
        yellow: '#F2C280',
        deepGreen: '#1a1F18',
        grey: '#2C2921',
      },
    },
  }
}

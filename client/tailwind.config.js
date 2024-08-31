/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        alexBrush: ['Alex Brush', 'cursive'],
        roboto: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
    // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
    require('daisyui'),
  ],
  daisyui: {
    themes: ['light', 'dark'],
  }
}
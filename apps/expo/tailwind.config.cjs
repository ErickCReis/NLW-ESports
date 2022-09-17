/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/_app.tsx'],
  theme: {
    fontFamily: false,
    fontWeight: false,
    extend: {
      colors: {
        dark: {
          500: '#2A2634',
          800: '#18181B',
          900: '#121214'
        },
      },
    },
  },
  plugins: [],
};

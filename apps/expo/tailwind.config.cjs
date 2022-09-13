/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}', './src/_app.tsx'],
  theme: {
    extend: {
      colors: {
        caption: {
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
        },
      },
      backgroundImage: {
        'game-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67%)',
      },
      fontFamily: false,
      fontWeight: false,
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        earth: {
          50: '#faf7f2',
          100: '#f3ece0',
          200: '#e5d7c0',
          300: '#d4bc9a',
          400: '#c19f72',
          500: '#b08852',
          600: '#9d7043',
          700: '#7f5638',
          800: '#684532',
          900: '#563a2b',
        },
        darkbg: {
          900: '#0b130e',
          800: '#121e17',
          700: '#1a2b22',
          600: '#243b2f',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

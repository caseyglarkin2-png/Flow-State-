/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'void': '#050505',
        'neon': '#00B4FF',
        'ember': '#FF2A00',
        'carbon': '#1A1A1A',
        'steel': '#A0A0A0',
        'steel-dim': '#707070',
      },
    },
  },
  plugins: [],
};

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
        'neon': '#00FFC2',
        'ember': '#FF2A00',
        'carbon': '#1A1A1A',
        'steel': '#888888',
      },
    },
  },
  plugins: [],
};

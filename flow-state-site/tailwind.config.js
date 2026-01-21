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
        // Core brand colors
        'void': '#050505',
        'neon': '#00B4FF',
        'ember': '#FF2A00',
        'carbon': '#1A1A1A',
        'steel': '#A0A0A0',
        'steel-dim': '#707070',
        // Variance Tax palette additions
        'ebony-clay': '#232A35',
        'freightroll-red': '#D91411',
        'cerulean': '#05ACEB',
        // Semantic aliases
        'variance': '#D91411',   // FreightRoll red - chaos/cost
        'fluidity': '#05ACEB',   // Cerulean - order/savings
      },
    },
  },
  plugins: [],
};

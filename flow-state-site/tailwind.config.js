/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette (from design tokens)
        'void': '#232A35',       // Dark background
        'void-light': '#2E3544', // Lighter void for cards
        'void-dark': '#1A1F2B',  // Darker void for sections
        'neon': '#D91411',       // Variance / alert (red)
        'neon-dark': '#B00F0D',  // Darker neon for hover
        'flow': '#05ACEB',       // Action / link (blue)
        'flow-dark': '#0488BF',  // Darker flow for hover
        'steel': '#8892A8',      // Neutral text
        'steel-light': '#A5ADBD', // Lighter steel
        'steel-dark': '#6C7688',  // Darker steel
        
        // Legacy aliases (backwards compatibility)
        'ember': '#FF2A00',
        'carbon': '#1A1A1A',
        'ebony-clay': '#232A35',
        'freightroll-red': '#D91411',
        'cerulean': '#05ACEB',
        'variance': '#D91411',
        'fluidity': '#05ACEB',
      },
      spacing: {
        'xs': '0.25rem',   // 4px
        'sm': '0.5rem',    // 8px
        'md': '1rem',      // 16px
        'lg': '1.5rem',    // 24px
        'xl': '2rem',      // 32px
        'xxl': '3rem',     // 48px
        'xxxl': '4rem',    // 64px
      },
      boxShadow: {
        'token-sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'token-md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'token-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'token-xl': '0 20px 25px rgba(0, 0, 0, 0.15)',
      },
      transitionDuration: {
        'fast': '150ms',
        'medium': '300ms',
        'slow': '500ms',
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1E3A8A',
          teal: '#14B8A6',
          light: '#E0F2FE',
        },
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 25px rgba(15, 118, 110, 0.12)',
      },
    },
  },
  plugins: [],
}


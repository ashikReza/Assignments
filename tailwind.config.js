/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'updown': 'animate-updownAnim 3s infinite alternate-reverse'
      },
      keyframes: {
        'animate-updownAnim': {
          '0%': {
            transform: 'translateY(0)'
          },
          '50%': {
            transform: 'translateY(-8%)'
          },
          '100%': {
            transform: 'translateY(0)'
          }
        }
      }
    },
  },
  plugins: [],
}


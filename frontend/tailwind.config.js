/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366F1',
          dark: '#4F46E5'
        },
        secondary: '#F59E0B',
        card: '#ffffff',
        darkCard: '#2c2f3b'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.1)',
        cardHover: '0 8px 20px rgba(0,0,0,0.15)'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(20px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.5 }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease forwards',
        slideInRight: 'slideInRight 0.5s ease forwards',
        pulseSoft: 'pulseSoft 1.5s infinite ease-in-out'
      },
      transitionTimingFunction: {
        'in-out-strong': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  plugins: [],
};

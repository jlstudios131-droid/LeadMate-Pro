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

        // Cores premium atualizadas
        background: {
          light: "#f5f6f8",
          dark: "#1a1c23",
        },
        surface: {
          light: "#ffffff",
          dark: "#262933",
        },

        // Cores que substituem card e darkCard
        card: '#ffffff',
        darkCard: '#262933',

        border: {
          light: "#e5e7eb",
          dark: "#3a3d45",
        }
      },

      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem'
      },

      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.08)',
        cardHover: '0 8px 20px rgba(0,0,0,0.12)',

        // Sombra premium estilo Facebook
        subtle: '0 1px 3px rgba(0,0,0,0.12)'
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(-6px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' }
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(14px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.55 }
        }
      },

      animation: {
        fadeIn: 'fadeIn 0.45s ease-out forwards',
        slideInRight: 'slideInRight 0.45s ease-out forwards',
        pulseSoft: 'pulseSoft 1.6s infinite ease-in-out'
      },

      transitionTimingFunction: {
        'in-out-strong': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  plugins: []
};

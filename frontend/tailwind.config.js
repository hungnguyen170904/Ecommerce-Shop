/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#F7F7F5', // Nền
          dark: '#1A1A1A', // Chữ chính
          muted: '#6B6B6B', // Chữ phụ
          cta: '#2F6FED', // Nút Mua hàng
          'cta-hover': '#1E5BB3',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Sử dụng font chữ hiện đại
      },
      boxShadow: {
        'soft': '0 4px 40px rgba(0, 0, 0, 0.04)',
        'hover': '0 10px 40px rgba(47, 111, 237, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}

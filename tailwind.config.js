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
          bg: '#FAF8F5',
          card: '#FFFFFF',
          dark: '#181513',
          espresso: '#1E1B18',
          walnut: '#5C4033',
          sheesham: '#8B5A2B',
          brass: '#B08D57',
          'brass-dark': '#8F6E3B',
          sand: '#ECE7DD',
          border: '#E8E2D9',
          muted: '#7A7570',
          whatsapp: '#25D366',
          'whatsapp-dark': '#128C7E',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0,0,0,0.03)',
        'elevated': '0 10px 30px -10px rgba(30, 27, 24, 0.08)',
        'modal': '0 25px 50px -12px rgba(24, 21, 19, 0.25)',
      }
    },
  },
  plugins: [],
}

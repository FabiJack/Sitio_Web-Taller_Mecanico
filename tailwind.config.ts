import type { Config } from 'tailwindcss';

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '1rem', md: '1.5rem' }, screens: { '2xl': '1280px' } },
    extend: {
      colors: {
        // Rojo "pit-lane" + carbono + amarillo rayo
        brand: {
          50: '#fff1f1', 100: '#ffe0e0', 200: '#ffc6c6', 300: '#ff9d9d', 400: '#ff6464',
          500: '#f83333', 600: '#e51414', 700: '#c10d0d', 800: '#a00f0f', 900: '#841414', 950: '#480404',
        },
        volt: { 300: '#ffe066', 400: '#ffd43b', 500: '#fcc419', 600: '#f59f00' },
        ink: {
          50: '#f6f7f9', 100: '#eceef2', 200: '#d5d9e2', 300: '#b0b8c9', 400: '#8592ab', 500: '#667491',
          600: '#515d78', 700: '#424b62', 800: '#2a3040', 900: '#1a1e29', 950: '#0d0f15',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgb(13 15 21 / 0.04), 0 8px 24px -12px rgb(13 15 21 / 0.12)',
        lift: '0 2px 4px rgb(13 15 21 / 0.06), 0 20px 40px -16px rgb(13 15 21 / 0.25)',
        glow: '0 0 0 1px rgb(229 20 20 / 0.25), 0 12px 40px -8px rgb(229 20 20 / 0.45)',
      },
      backgroundImage: {
        'grid-fade': 'linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': { from: { opacity: '0', transform: 'translateY(12px)' }, to: { opacity: '1', transform: 'none' } },
        shimmer: { from: { backgroundPosition: '200% 0' }, to: { backgroundPosition: '-200% 0' } },
        'speed-line': { from: { transform: 'translateX(-120%)' }, to: { transform: 'translateX(220%)' } },
      },
      animation: {
        'fade-up': 'fade-up .5s ease-out both',
        shimmer: 'shimmer 2s linear infinite',
        'speed-line': 'speed-line 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} satisfies Config;

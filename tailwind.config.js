/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#0a0a0c',
          light: '#141419',
          card: 'rgba(20, 20, 25, 0.7)',
          border: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(0, 255, 255, 0.15)',
        },
        accent: {
          cyan: '#00ffff',
          green: '#00ffaa',
          purple: '#bd00ff',
          neon: '#ff0055',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        luxury: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass-glow': '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
        'cyan-glow': '0 0 20px rgba(0, 255, 255, 0.25)',
        'green-glow': '0 0 20px rgba(0, 255, 170, 0.25)',
        'neon-glow': '0 0 20px rgba(255, 0, 85, 0.25)',
      },
      backdropBlur: {
        xs: '2px',
        md: '12px',
        xl: '24px',
      }
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          light: 'var(--color-secondary-light)',
          dark: 'var(--color-secondary-dark)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          hover: 'var(--color-accent-hover)',
        },
        background: {
          DEFAULT: 'var(--color-background)',
          secondary: 'var(--color-background-secondary)',
          tertiary: 'var(--color-background-tertiary)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        },
        card: {
          DEFAULT: 'var(--color-card)',
          hover: 'var(--color-card-hover)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          accent: 'var(--color-border-accent)',
        },
        danger: 'var(--color-danger)',
        success: 'var(--color-success)',
        surface: 'var(--color-surface)',
      },
      borderRadius: {
        'retro': '16px',
        'retro-sm': '10px',
        'retro-lg': '24px',
        'retro-xl': '32px',
      },
      boxShadow: {
        'retro': '3px 3px 0px var(--color-border)',
        'retro-sm': '2px 2px 0px var(--color-border)',
        'retro-lg': '4px 4px 0px var(--color-border)',
        'retro-accent': '3px 3px 0px var(--color-primary)',
        'retro-inset': 'inset 1px 1px 3px rgba(0,0,0,0.08)',
      },
      borderWidth: {
        '3': '3px',
      },
      fontFamily: {
        'retro': ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        'retro-mono': ['"Space Mono"', 'monospace'],
      },
      animation: {
        'slideup': 'slideup 0.4s ease-out',
        'slideright': 'slideright 0.4s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'bounce-sm': 'bounce-sm 0.5s ease-in-out',
        'spin-slow': 'spin 4s linear infinite',
      },
      keyframes: {
        slideup: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideright: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'bounce-sm': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        spin: 'spin 1s linear infinite',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'background-secondary': '#18181b',
        'background-janela-principal': '#0A0A0AA8',
        'background-janela-secundaria': '#27272a',
        'border-color': '#a1a1aa',
      },
      screens: {
        xs: '375px', // Adiciona um breakpoint extra para telas muito pequenas
        '3xl': '1920px', // Adiciona um breakpoint para telas muito grandes
      },
    },
  },
  safelist: ['inputTextColor'],
  plugins: [],
} satisfies Config;

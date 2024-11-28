import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'background-secondary': '#18181b',
        'border-color': '#a1a1aa',
      },
      screens: {
        xs: '375px', // Adiciona um breakpoint extra para telas muito pequenas
        '3xl': '1920px', // Adiciona um breakpoint para telas muito grandes
      }
    },
  },
  plugins: [],
} satisfies Config;
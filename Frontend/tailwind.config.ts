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
        'background-janela-principal': '#0A0A0AA8',
        'background-janela-secundaria': '#27272a',
        'border-color': '#a1a1aa',
      },
    },
  },
  plugins: [],
} satisfies Config;

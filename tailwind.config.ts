import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        hakgyoL: ['Hakgyoansim-L', 'sans-serif'],
        hakgyoB: ['Hakgyoansim-B', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

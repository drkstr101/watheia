const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
const themeStyle = require('./content/data/style.json');

/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    {
      pattern:
        /(m|p)(t|b|l|r)-(0|px|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96)/,
    },
  ],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.75rem' }],
      lg: ['1.125rem', { lineHeight: '1.75rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.25rem' }],
      '3xl': ['1.75rem', { lineHeight: '2.25rem' }],
      '4xl': ['2rem', { lineHeight: '2.5rem' }],
      '5xl': ['2.5rem', { lineHeight: '3rem' }],
      '6xl': ['3rem', { lineHeight: '3.5rem' }],
      '7xl': ['4rem', { lineHeight: '4.5rem' }],
    },
    extend: {
      borderRadius: {
        '4xl': '2.5rem',
      },
      colors: ({ colors }) => ({
        white: colors.slate['50'],
        black: colors.slate['950'],
        neutral: colors.slate,
        primary: colors.cyan,
        secondary: colors.indigo,
        accent: colors.teal,
        danger: colors.rose,
        warning: colors.amber,
        success: colors.emerald,
        info: colors.sky,
      }),
      fontFamily: {
        mono: ['Fira Code', ...fontFamily.mono],
        sans: ['Mona Sans', ...fontFamily.sans],
        display: [['Mona Sans', ...fontFamily.sans], { fontVariationSettings: '"wdth" 125' }],
        book: [...fontFamily.sans],
        detail: [...fontFamily.mono],
        code: [...fontFamily.mono],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
};

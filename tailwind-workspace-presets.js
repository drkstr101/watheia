const { fontFamily } = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');
// const themeStyle = require('./content/data/style.json');

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
      boxShadow: {
        header: '0px 2px 8px rgba(27, 32, 50, .08)',
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
      gridTemplateColumns: {
        16: 'repeat(16, minmax(0, 1fr))',
      },
      gridColumnStart: {
        span4: 'span 4',
      },
      gridColumnEnd: {
        neg3: '-3',
        span4: 'span 4',
      },
      maxWidth: {
        sectionBody: '846px',
      },
      padding: {
        '2/3': '66.666%',
        '3/4': '75%',
        '9/16': '56.25%',
      },
      screens: {
        xs: '480px',
      },
      width: {
        formField: 'calc(50% - 1rem)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    // plugin(function ({ addBase, addComponents, theme }) {
    //   const h1Size = themeStyle.h1.size;
    //   const adjustH1Size = ['6xl', '7xl', '8xl', '9xl'].includes(h1Size);
    //   const h2Size = themeStyle.h2.size;
    //   const adjustH2Size = ['5xl', '6xl', '7xl', '8xl', '9xl'].includes(h2Size);
    //   const h3Size = themeStyle.h3.size;
    //   const adjustH3Size = ['4xl', '5xl', '6xl', '7xl', '8xl', '9xl'].includes(h3Size);
    //   addBase({
    //     body: {
    //       fontFamily: theme(`fontFamily.${themeStyle.fontBody}`),
    //     },
    //     'h1,.h1': {
    //       ...(adjustH1Size && {
    //         fontSize: theme('fontSize.5xl'),
    //         '@media (min-width: 640px)': {
    //           fontSize: theme(`fontSize.${h1Size}`),
    //         },
    //       }),
    //       ...(!adjustH1Size && {
    //         fontSize: theme(`fontSize.${h1Size}`),
    //       }),
    //       fontWeight: theme(`fontWeight.${themeStyle.h1.weight}`),
    //       letterSpacing: theme(`letterSpacing.${themeStyle.h1.letterSpacing}`),
    //       textDecoration: themeStyle.h1.decoration,
    //       textTransform: themeStyle.h1.case,
    //     },
    //     'h2,.h2': {
    //       ...(adjustH2Size && {
    //         fontSize: theme('fontSize.4xl'),
    //         '@media (min-width: 640px)': {
    //           fontSize: theme(`fontSize.${h2Size}`),
    //         },
    //       }),
    //       ...(!adjustH2Size && {
    //         fontSize: theme(`fontSize.${h2Size}`),
    //       }),
    //       fontWeight: theme(`fontWeight.${themeStyle.h2.weight}`),
    //       letterSpacing: theme(`letterSpacing.${themeStyle.h2.letterSpacing}`),
    //       textDecoration: themeStyle.h2.decoration,
    //       textTransform: themeStyle.h2.case,
    //     },
    //     'h3,.h3': {
    //       ...(adjustH3Size && {
    //         fontSize: theme('fontSize.3xl'),
    //         '@media (min-width: 640px)': {
    //           fontSize: theme(`fontSize.${h3Size}`),
    //         },
    //       }),
    //       ...(!adjustH3Size && {
    //         fontSize: theme(`fontSize.${h3Size}`),
    //       }),
    //       fontWeight: theme(`fontWeight.${themeStyle.h3.weight}`),
    //       letterSpacing: theme(`letterSpacing.${themeStyle.h3.letterSpacing}`),
    //       textDecoration: themeStyle.h3.decoration,
    //       textTransform: themeStyle.h3.case,
    //     },
    //     'h4,.h4': {
    //       fontSize: theme(`fontSize.${themeStyle.h4.size}`),
    //       fontWeight: theme(`fontWeight.${themeStyle.h4.weight}`),
    //       letterSpacing: theme(`letterSpacing.${themeStyle.h4.letterSpacing}`),
    //       textDecoration: themeStyle.h4.decoration,
    //       textTransform: themeStyle.h4.case,
    //     },
    //     'h5,.h5': {
    //       fontSize: theme(`fontSize.${themeStyle.h5.size}`),
    //       fontWeight: theme(`fontWeight.${themeStyle.h5.weight}`),
    //       letterSpacing: theme(`letterSpacing.${themeStyle.h5.letterSpacing}`),
    //       textDecoration: themeStyle.h5.decoration,
    //       textTransform: themeStyle.h5.case,
    //     },
    //     'h6,.h6': {
    //       fontSize: theme(`fontSize.${themeStyle.h6.size}`),
    //       fontWeight: theme(`fontWeight.${themeStyle.h6.weight}`),
    //       letterSpacing: theme(`letterSpacing.${themeStyle.h6.letterSpacing}`),
    //       textDecoration: themeStyle.h6.decoration,
    //       textTransform: themeStyle.h6.case,
    //     },
    //   });
    //   addComponents({
    //     '.wa-button-primary': {
    //       fontWeight: theme(`fontWeight.${themeStyle.buttonPrimary.weight}`),
    //       letterSpacing: theme(`letterSpacing.${themeStyle.buttonPrimary.letterSpacing}`),
    //       padding: `${themeStyle.buttonPrimary.verticalPadding}px ${themeStyle.buttonPrimary.horizontalPadding}px`,
    //       textTransform: themeStyle.buttonPrimary.case,
    //     },
    //     '.wa-button-primary.wa-button-icon': {
    //       padding: `${themeStyle.buttonPrimary.verticalPadding}px`,
    //     },
    //     '.wa-button-secondary': {
    //       fontWeight: theme(`fontWeight.${themeStyle.buttonSecondary.weight}`),
    //       letterSpacing: theme(`letterSpacing.${themeStyle.buttonSecondary.letterSpacing}`),
    //       padding: `${themeStyle.buttonSecondary.verticalPadding}px ${themeStyle.buttonSecondary.horizontalPadding}px`,
    //       textTransform: themeStyle.buttonSecondary.case,
    //     },
    //     '.wa-button-secondary.wa-button-icon': {
    //       padding: `${themeStyle.buttonSecondary.verticalPadding}px`,
    //     },
    //     '.wa-link': {
    //       fontWeight: theme(`fontWeight.${themeStyle.link.weight}`),
    //       letterSpacing: theme(`letterSpacing.${themeStyle.link.letterSpacing}`),
    //       textTransform: themeStyle.link.case,
    //     },
    //   });
    // }),
  ],
};

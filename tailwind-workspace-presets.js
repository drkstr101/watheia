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
      boxShadow: {
        header: '0px 2px 8px rgba(27, 32, 50, .08)',
      },
      colors: ({ colors }) => ({
        neutral: colors.slate,
        primary: colors.cyan,
        secondary: colors.sky,
        accent: colors.teal,
        danger: colors.rose,
        warning: colors.amber,
        success: colors.emerald,
        white: colors.slate['50'],
        black: colors.slate['950'],
      }),
      fontFamily: {
        sans: ['Mona Sans', ...fontFamily.sans],
        display: [['Mona Sans', ...fontFamily.sans], { fontVariationSettings: '"wdth" 125' }],
        book: [...fontFamily.sans],
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
    plugin(function ({ addBase, addComponents, theme }) {
      addBase({
        body: {
          fontFamily: theme(`fontFamily.${themeStyle.fontBody}`),
        },
        'h1,h2,h3,h4,h5,h6,blockquote': {
          fontFamily: theme(`fontFamily.${themeStyle.fontHeadlines}`),
        },
        'h1,.h1': {
          fontSize: theme(`fontSize.${themeStyle.h1.size}`),
          fontWeight: theme(`fontWeight.${themeStyle.h1.weight}`),
          letterSpacing: theme(`letterSpacing.${themeStyle.h1.letterSpacing}`),
          textDecoration: themeStyle.h1.decoration,
          textTransform: themeStyle.h1.case,
        },
        'h2,.h2': {
          fontSize: theme(`fontSize.${themeStyle.h2.size}`),
          fontWeight: theme(`fontWeight.${themeStyle.h2.weight}`),
          letterSpacing: theme(`letterSpacing.${themeStyle.h2.letterSpacing}`),
          textDecoration: themeStyle.h2.decoration,
          textTransform: themeStyle.h2.case,
        },
        'h3,.h3': {
          fontSize: theme(`fontSize.${themeStyle.h3.size}`),
          fontWeight: theme(`fontWeight.${themeStyle.h3.weight}`),
          letterSpacing: theme(`letterSpacing.${themeStyle.h3.letterSpacing}`),
          textDecoration: themeStyle.h3.decoration,
          textTransform: themeStyle.h3.case,
        },
        'h4,.h4': {
          fontSize: theme(`fontSize.${themeStyle.h4.size}`),
          fontWeight: theme(`fontWeight.${themeStyle.h4.weight}`),
          letterSpacing: theme(`letterSpacing.${themeStyle.h4.letterSpacing}`),
          textDecoration: themeStyle.h4.decoration,
          textTransform: themeStyle.h4.case,
        },
        h5: {
          fontSize: theme(`fontSize.${themeStyle.h5.size}`),
          fontWeight: theme(`fontWeight.${themeStyle.h5.weight}`),
          letterSpacing: theme(`letterSpacing.${themeStyle.h5.letterSpacing}`),
          textDecoration: themeStyle.h5.decoration,
          textTransform: themeStyle.h5.case,
        },
        h6: {
          fontSize: theme(`fontSize.${themeStyle.h6.size}`),
          fontWeight: theme(`fontWeight.${themeStyle.h6.weight}`),
          letterSpacing: theme(`letterSpacing.${themeStyle.h6.letterSpacing}`),
          textDecoration: themeStyle.h6.decoration,
          textTransform: themeStyle.h6.case,
        },
      });
      addComponents({
        '.sb-component-button-primary': {
          borderRadius: theme(`borderRadius.${themeStyle.buttonPrimary.borderRadius}`),
          boxShadow: theme(`boxShadow.${themeStyle.buttonPrimary.shadow}`),
          fontWeight: themeStyle.buttonPrimary.weight,
          letterSpacing: theme(`letterSpacing.${themeStyle.buttonPrimary.letterSpacing}`),
          padding: `${themeStyle.buttonPrimary.verticalPadding}px ${themeStyle.buttonPrimary.horizontalPadding}px`,
          textTransform: themeStyle.buttonPrimary.case,
        },
        '.sb-component-button-secondary': {
          borderRadius: theme(`borderRadius.${themeStyle.buttonSecondary.borderRadius}`),
          boxShadow: theme(`boxShadow.${themeStyle.buttonSecondary.shadow}`),
          fontWeight: themeStyle.buttonSecondary.weight,
          letterSpacing: theme(`letterSpacing.${themeStyle.buttonSecondary.letterSpacing}`),
          padding: `${themeStyle.buttonSecondary.verticalPadding}px ${themeStyle.buttonSecondary.horizontalPadding}px`,
          textTransform: themeStyle.buttonSecondary.case,
        },
        '.sb-component-link-primary': {
          fontWeight: themeStyle.linkPrimary.weight,
          letterSpacing: theme(`letterSpacing.${themeStyle.linkPrimary.letterSpacing}`),
          textTransform: themeStyle.linkPrimary.case,
        },
        '.sb-component-link-secondary': {
          fontWeight: themeStyle.linkSecondary.weight,
          letterSpacing: theme(`letterSpacing.${themeStyle.linkSecondary.letterSpacing}`),
          textTransform: themeStyle.linkSecondary.case,
        },
      });
    }),
  ],
};

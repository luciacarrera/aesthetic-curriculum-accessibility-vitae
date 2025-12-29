/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/templates/**/*.{hbs,html}', './src/**/*.{ts,js, hbs, html}'],
  theme: {
    extend: {
      colors: {
        /* background colors */
        photo: 'rgb(var(--bg-photo))',
        aside: 'rgb(var(--bg-aside))',
        main: 'rgb(var(--bg-main))',
        header: 'rgb(var(--bg-header))',

        /* section text bg colors */
        'main-headers': 'rgb(var(--bg-main-headers))',
        'aside-headers': 'rgb(var(--bg-aside-headers))',
        name: 'rgb(var(--bg-name))',
        'brief-description': 'rgb(var(--bg-brief-description))',
        bold: 'rgb(var(--bg-bold))',
        footer: 'rgb(var(--bg-footer))',
        /* text colors */
        normal: 'rgb(var(--text-normal) / <alpha-value>)',
        soft: 'rgb(var(--text-footer) / <alpha-value>)',
      },
      spacing: {
        'page-x': 'var(--padding-page-x)',
        'page-y': 'var(--padding-page-y)',
        'content-x': 'var(--padding-content-x)',
        'content-y': 'var(--padding-content-y)',
        photo: 'var(--padding-photo)',
      },
      borderRadius: {
        'all-headers': 'var(--rounded-all-headers)',
      },
      width: {
        name: 'var(--width-name)',
        'brief-description': 'var(--width-brief-description)',
        headers: 'var(--width-headers)',
      },
    },
  },
  plugins: [],
};

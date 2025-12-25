/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/templates/**/*.{hbs,html}', './src/**/*.{ts,js, hbs, html}'],
  theme: {
    extend: {
      colors: {
        /* background colors */
        photo: 'rgb(var(--photo))',
        aside: 'rgb(var(--aside))',
        main: 'rgb(var(--main))',
        header: 'rgb(var(--header))',

        /* section text bg colors */
        'main-headers': 'rgb(var(--main-headers))',
        'aside-headers': 'rgb(var(--aside-headers))',
        name: 'rgb(var(--name))',
        'brief-description': 'rgb(var(--brief-description))',
        bold: 'rgb(var(--bold))',

        /* text colors */
        text: 'rgb(var(--text) / <alpha-value>)',
        'text-footer': 'rgb(var(--text-footer) / <alpha-value>)',
      },
    },
  },
  plugins: [],
};

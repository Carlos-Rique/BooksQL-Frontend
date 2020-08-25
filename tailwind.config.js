const plugin = require('tailwindcss/plugin')
module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      'sans': ['Roboto']
    },
    container: {
      center: true,
      padding: '1rem'
    },
    extend: {},
  },
  variants: {},
  plugins: [
    plugin(function({ addBase, config }) {
      addBase({
        'h1': { fontSize: config('theme.fontSize.3xl'),
                fontWeight: 700
              },
        'h2': { fontSize: config('theme.fontSize.2xl'),
                fontWeight: 500
              },
        'h3': { fontSize: config('theme.fontSize.x1'),
                fontWeight: 500
              },
      })
    })
  ],
}

const config = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        blue: {
          light: '#85d7ff',
          DEFAULT: '#0038FF',
          dark: '#009eeb',
        },
        pink: {
          light: '#ff7ce5',
          DEFAULT: '#ff49db',
          dark: '#ff16d1',
        },
        gray: {
          darkest: '#1f2d3d',
          dark: '#3c4858',
          DEFAULT: '#77859B',
          light: '#98A7BF',
          lightest: '#f9fafc',
        },

        green: {
          DEFAULT: '#34C759',
          light: '#25E455',
        },
      },
    },
  },
  plugins: [],
}

module.exports = config

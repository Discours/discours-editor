const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
const purgecss = require('@fullhuman/postcss-purgecss')

const mode = process.env.NODE_ENV
const dev = mode === 'development'

const config = {
  plugins: [
    tailwindcss(),
    autoprefixer(),
    purgecss({ content: ['./src/**/*.svelte'] }),
    !dev && cssnano({ preset: 'default' })
  ]
}

module.exports = config

const tailwindcss = require('tailwindcss')
const autoprefixer = require('autoprefixer')
const cssnano = require('cssnano')
// const purgecss = require('@fullhuman/postcss-purgecss')

const plugins = [
  tailwindcss(),
  autoprefixer(),
  // purgecss({ content: ['./src/**/*.svelte'] })
]

if(process.env.NODE_ENV !== 'development') plugins.push(cssnano({ preset: 'default' }))

module.exports = { plugins}

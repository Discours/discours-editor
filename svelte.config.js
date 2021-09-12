/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// eslint-disable @typescript-eslint/explicit-module-boundary-types
import { typescript } from 'svelte-preprocess-esbuild'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { postcss, globalStyle } = require('svelte-preprocess')

export default {
  preprocess: [
    postcss(
      {
        plugins: [
          require('tailwindcss')(require('./tailwind.config.cjs')),
          require('autoprefixer')(),
          require('cssnano')({ preset: 'default' }),
        ],
      },
      { name: 'postcss' }
    ),
    typescript(),
    globalStyle(),
  ],
}

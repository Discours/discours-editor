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
          require('postcss-import')(),
          require('tailwindcss')(require('./tailwind.config.cjs')),
          require('autoprefixer')(),
          require('@fullhuman/postcss-purgecss')({
            content: ['./**/*.html', './**/*.svelte'],
            defaultExtractor: (content) =>
              content.match(/[A-Za-z0-9-_:/]+/g) || [],
          }),
        ],
      },
      { name: 'postcss' }
    ),
    typescript(),
    globalStyle(),
  ],
}

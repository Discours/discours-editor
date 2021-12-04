import adapter from '@sveltejs/adapter-auto'
import { windi as windiSvelte } from 'svelte-windicss-preprocess'
import { typescript } from 'svelte-preprocess-esbuild'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { scss, globalStyle } = require('svelte-preprocess')

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [windiSvelte(), typescript(), scss(), globalStyle()],
  router: false,
  kit: {
    adapter: adapter(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
  },
  skipIntroByDefault: true,
  experimental: {
    prebundleSvelteLibraries: true,
  },
}

export default config

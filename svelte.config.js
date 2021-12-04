import adapter from '@sveltejs/adapter-auto'
import { windi as windiSvelte } from 'svelte-windicss-preprocess'
import { typescript } from 'svelte-preprocess-esbuild'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [windiSvelte(), typescript()],
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

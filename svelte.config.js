import adapter from '@sveltejs/adapter-static'
import { typescript } from 'svelte-preprocess-esbuild'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { globalStyle } = require('svelte-preprocess')

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [typescript(), globalStyle()],
  compilerOptions: {
    enableSourcemap: true,
    cssHash: ({ hash, css}) => 's-' + hash(css)
  },
  kit: {
    adapter: adapter({ failback: 'index.html' }),
    prerender: {  enabled: false },
    router: false,
    ssr: false,
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
    vite: {
      build: {
        chunkSizeWarningLimit: 777
      }
    }
  },
  skipIntroByDefault: true,
  experimental: {
    prebundleSvelteLibraries: true,
  },
}

export default config

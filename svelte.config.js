// eslint-disable @typescript-eslint/explicit-module-boundary-types
import { typescript } from 'svelte-preprocess-esbuild'
import vercel from '@sveltejs/adapter-vercel'
import node from '@sveltejs/adapter-node'
import ssr from '@sveltejs/adapter-static'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const { postcss, globalStyle } = require('svelte-preprocess')
const postcssOptions = require('./postcss.config.cjs')
const nodeAdapter = { adapt: async () => await node() }
const adapter = process.env.VERCEL ? vercel() : (process.env.SSR ? ssr() : nodeAdapter)

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    typescript(),
    postcss(postcssOptions, { name: 'postcss' }),
    globalStyle(),
  ],
  kit: {
    adapter,
    target: '#discoursio-widget',
  },
}

export default config
// Workaround until SvelteKit uses Vite 2.3.8 (and it's confirmed to fix the Tailwind JIT problem)
const mode = process.env.NODE_ENV
const dev = mode === 'development'
process.env.TAILWIND_MODE = dev ? 'watch' : 'build'

// eslint-disable @typescript-eslint/explicit-module-boundary-types
import { join } from 'path'
import { readFileSync } from 'fs'
import { cwd } from 'process'
import { typescript } from 'svelte-preprocess-esbuild'
import vercel from '@sveltejs/adapter-vercel'
import node from '@sveltejs/adapter-node'
import ssr from '@sveltejs/adapter-static'
import { createRequire } from 'module'
const require = createRequire(import.meta.url)
const { postcss, globalStyle } = require('svelte-preprocess')
const postcssOptions = require('./postcss.config.cjs')

const pkg = JSON.parse(readFileSync(join(cwd(), 'package.json')))
const nodeAdapter = { adapt: async () => await node() }
const adapter = process.env.VERCEL ? vercel() : (process.env.SSR ? ssr() : nodeAdapter)
const dev = process.env.NODE_ENV === 'development'

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
	vite: {
		ssr: {
			noExternal: dev ? [] : Object.keys(pkg.dependencies || {}),
		}
	}
  },
}

export default config

// Workaround until SvelteKit uses Vite 2.3.8 (and it's confirmed to fix the Tailwind JIT problem)
process.env.TAILWIND_MODE = dev ? 'watch' : 'build'

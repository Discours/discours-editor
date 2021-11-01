import { build } from 'esbuild'
import svelte from 'esbuild-svelte'
import { derver } from 'derver'
import fs from 'fs'

const dev = process.env.NODE_ENV != 'production'
const port = 5000
const dir = 'public'

import('./svelte.config.cjs').then(svelteConfig => {

  const options = {
    globalName: 'aho',
    format: 'iife',
    platform: 'browser',
    minifyIdentifiers: true,
    entryPoints: [`src/index.ts`],
    bundle: true,
    splitting: false,
    write: true,
    allowOverwrite: true,
    color: true,
    incremental: dev,
    outfile: dir + `/bundle.js`,
    plugins: [
      svelte({
        compileOptions: {
          dev,
          css: true,
          generate: 'dom',
        },
        ...svelteConfig,
      }),
    ],
  }
  
  if (!dev) {
    options.minify = true
    options.treeShaking = true
  }
  
  build(options)
    .then((builder) => {
      if (builder.warnings && builder.warnings.length) {
        builder.warnings.forEach((w) => console.warn(w))
        return
      }
      if (dev) {
        derver({
          dir,
          port,
          watch: [dir, 'src'],
          onwatch: async (lr, item) => {
            if (item == 'src') {
              lr.prevent()
              try {
                await builder.rebuild()
              } catch (err) {
                lr.error(err.message, 'Svelte compile error')
              }
            }
          },
        })
      } else {
        console.log(`bundle size: ${Math.round(fs.statSync(options.outfile).size/100)/10} Kb`)
        process.exit(0)
      }
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
})

import { build } from 'esbuild'
import svelte from 'esbuild-svelte'
import { derver } from 'derver'
import fs from 'fs'

const dev = process.env.NODE_ENV != 'production'
const port = 5000
const dir = 'dist'

import('./svelte.config.cjs').then(svelteConfig => {

  const options = {
    globalName: 'discours',
    format: 'iife',
    // minifyIdentifiers: true,
    entryPoints: [ 'src/Editor.svelte' ],
    bundle: true,
    splitting: false,
    write: true,
    allowOverwrite: true,
    color: true,
    // incremental: dev,
    outfile: dir + '/index.js',
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
  
  build({ ...options, outfile: dir + '/index.esm.js', format: 'esm' })
    .then((b) => {
      build(options)
        .then((builder) => {
          console.log(`index.esm.js ${Math.round(fs.statSync(dir + '/index.esm.js').size/100)/10} Kb`)
          console.log(`index.js ${Math.round(fs.statSync(dir + '/index.js').size/100)/10} Kb`)
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
          } else process.exit(0)
        })
        .catch((err) => {
          console.error(err)
          process.exit(1)
        })
    })
  })
  

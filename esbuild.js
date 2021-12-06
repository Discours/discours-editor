import { build } from 'esbuild'
import svelte from 'esbuild-svelte'
import { derver } from 'derver'
import fs from 'fs'
import autoPreprocess from 'svelte-preprocess'

const dev = process.env.NODE_ENV != 'production'
const port = 5000
const dir = 'dist'

import('./svelte.config.js').then((svelteConfig) => {
  const options = {
    globalName: 'discours',
    format: 'iife',
    // minifyIdentifiers: true,
    entryPoints: ['src/routes/index.svelte'],
    bundle: true,
    splitting: false,
    write: true,
    allowOverwrite: true,
    color: true,
    // incremental: dev,
    outfile: dir + '/editor.js',
    plugins: [
      svelte({
        compilerOptions: {
          dev,
          css: false,
          generate: 'dom',
        },
        preprocess: autoPreprocess()
      }),
    ],
  }

  if (!dev) {
    options.minify = true
    options.treeShaking = true
  }

  build({ ...options, outfile: dir + '/editor.esm.js', format: 'esm' }).then(
    (b) => {
      build(options)
        .then((builder) => {
          console.log(
            `editor.esm.js ${
              Math.round(fs.statSync(dir + '/editor.esm.js').size / 100) / 10
            } Kb`
          )
          console.log(
            `editor.js ${
              Math.round(fs.statSync(dir + '/editor.js').size / 100) / 10
            } Kb`
          )
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
    }
  )
})

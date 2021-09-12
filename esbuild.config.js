/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { build } from 'esbuild'
import svelte from 'esbuild-svelte'
import cssModules from 'esbuild-css-modules-plugin'
import { derver } from 'derver'
import svelteCfg from './svelte.config.js'

const { preprocess } = svelteCfg
const dev = process.env.NODE_ENV == 'development'
const port = 5000
const dir = 'public'

const options = {
  entryPoints: [`src/main.ts`],
  bundle: true,
  color: true,
  incremental: dev,
  outfile: dir + `/bundle.js`,
  platform: 'browser',
  plugins: [
    cssModules({ inject: false }),
    svelte({
      compileOptions: {
        dev,
        css: true,
        generate: 'dom',
      },
      preprocess,
    }),
  ]
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
      console.log('esbuild: successfully built for production')
      process.exit(0)
    }
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

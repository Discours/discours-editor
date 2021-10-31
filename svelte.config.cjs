
const { typescript } = require('svelte-preprocess-esbuild')
const { windi: windiSvelte } = require('svelte-windicss-preprocess')

module.exports = {
    preprocess: [
        windiSvelte({
          compile: false,
          config: 'tailwind.config.cjs',
          debug: true,
          globalPreflight: true, // will be deprecated soon
          globalUtility: true,
          //prefix: 'windi-',
          silent: false,
        }),
        typescript(),
      ],
}
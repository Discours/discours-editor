let preprocess = []

import('svelte-windicss-preprocess').then(({ windi }) => preprocess.push(windi({
  compile: false,
  config: 'tailwind.config.cjs',
  debug: true,
  globalPreflight: true, // will be deprecated soon
  globalUtility: true,
  //prefix: 'windi-',
  silent: false,
})))
import('svelte-preprocess-esbuild').then(({ typescript }) => preprocess.push(typescript()))

module.exports = { preprocess }
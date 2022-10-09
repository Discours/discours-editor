import {defineConfig} from 'vite'
import solidPlugin from 'vite-plugin-solid'
import process from 'process'

export default defineConfig({
  plugins: [solidPlugin()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    chunkSizeWarningLimit: 777
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "src/styles/fonts";\n@import "src/styles/imports";\n`
      }
    }
  },
  resolve: {
    alias: {
      '@': process.cwd() + '/src'
    }
  }
})

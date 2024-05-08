import nodePolyfills from 'rollup-plugin-polyfill-node'

const MODE = process.env.NODE_ENV
const development = MODE === 'development'

export default {
  // other config options
  plugins: [
    development &&
      nodePolyfills({
        include: ['node_modules/**/*.js', new RegExp('node_modules/.vite/.*js')],
        http: true,
        crypto: true
      })
  ],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      stream: 'stream-browserify',
      assert: 'assert'
    }
  },
  build: {
    rollupOptions: {
      plugins: [nodePolyfills({ crypto: true, http: true })]
    },
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
}
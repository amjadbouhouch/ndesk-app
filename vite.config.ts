import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: './src/public',
  build: {
    emptyOutDir: true
  },
  plugins: [react(), tsconfigPaths()],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'window'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        // NodeGlobalsPolyfillPlugin({
        //   buffer: true,
        // }),
      ]
    }
  },
  define: {
    global: 'window'
  }
})

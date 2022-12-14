import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // Elimina los console log en produccion
  esbuild: {
    drop: ['console', 'debugger'],
  },
  // Para mejorar los test vamos a exponer la api
  // globals: Setting this to true allows you to reference the APIs globally (describe, expect, it, should etc.), just like Jest.
  // https://vitest.dev/config/#globals
  test: {
    globals: true,
  },
})

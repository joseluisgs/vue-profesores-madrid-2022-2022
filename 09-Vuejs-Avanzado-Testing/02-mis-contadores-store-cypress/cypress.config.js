const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // busca los test de cypress a nivel de e2e web en esta carpeta
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
  },
  component: {
    // busca los test cypress de cada componente en esta carpeta
    specPattern: 'src/**/__tests__/*.{cy,spec}.{js,ts,jsx,tsx}',
    devServer: {
      framework: 'vue',
      bundler: 'vite',
    },
  },
})

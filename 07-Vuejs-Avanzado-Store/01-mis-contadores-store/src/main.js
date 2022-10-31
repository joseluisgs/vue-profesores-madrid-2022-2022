import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Instalamos pinia
app.use(createPinia())

app.mount('#app')

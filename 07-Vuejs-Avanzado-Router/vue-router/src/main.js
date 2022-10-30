import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

// Lo indicamos a nuestra app que va a usar 
// nuestro router
app.use(router)

app.mount('#app')

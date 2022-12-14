import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

import UserStore from '@/stores/users'

// Mis estilos css o sass
import '@/assets/styles/main.css'

// Cramos la aplicación
const app = createApp(App)

// Le asignamos los plugins o extras que usará
app.use(createPinia())
app.use(router)

// si queremos forzar que siempre sté logueado como situviese una sesion!
await initSesion()

// La montamos
app.mount('#app')

// Manejamos la sesión de Firebase
async function initSesion() {
  const userStore = new UserStore()
  await userStore.logIn()
}

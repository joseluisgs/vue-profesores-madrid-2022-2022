import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// Guardas
import isAuthenticatedGuard from '@/router/auth-guard'

// Mis rutas!!
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // Lazy, se carga solo cuando se accede a la ruta
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/autenticada',
      name: 'autenticada',
      // Lazy, se carga solo cuando se accede a la ruta
      component: () => import('../views/AutenticadaView.vue'),
      // Vamos a protegerla
      beforeEnter: [isAuthenticatedGuard],
    },
    // a google
    {
      path: '/google',
      name: 'google',
      beforeEnter() {
        window.open('http://www.google.com', '_blank')
      },
    },
    // Error
    {
      path: '/error', // Cualquier otra cosa
      name: 'Error',
      component: () => import('../views/ErrorView.vue'), // Lazy loading
    },
    // 404
    {
      // Cualquier cosa que no coincida con las rutas anteriores
      path: '/:pathMatch(.*)*', // Cualquier otra cosa
      name: '404',
      component: () => import('../views/404View.vue'), // Lazy loading
    },
  ],
})

export default router

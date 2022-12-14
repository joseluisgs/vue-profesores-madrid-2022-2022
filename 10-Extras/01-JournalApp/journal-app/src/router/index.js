import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
// Cargamos los router de los módulos
import dayBookRouter from '@/modules/daybook/router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Home' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: 'About' },
    },
    // DayBook
    {
      path: '/daybook',
      // name: 'daybook',
      // component: () => import('@/modules/daybook/layouts/DayBookLayout.vue'),
      // meta: { title: 'DayBook' },
      ...dayBookRouter,
    },
    {
      // Cualquier cosa que no coicida con las rutas anteriores
      path: '/:pathMatch(.*)*', // Cualquier otra cosa
      name: '404',
      component: () => import('@/views/404View.vue'), // Lazy loading
    },
  ],
})

export default router

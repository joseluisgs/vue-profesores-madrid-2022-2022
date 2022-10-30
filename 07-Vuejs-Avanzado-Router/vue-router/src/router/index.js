import { createRouter, createWebHistory } from 'vue-router'
import DetailsView from '../views/DetailsView.vue'
import HomeView from '../views/HomeView.vue'
import SubViewList from '../views/SubView/SubViewList.vue'
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
    // pagina detalle, con query!
    {
      path: '/:id',
      name: 'details',
      component: DetailsView,
      // Le pasamos props a la vista DetailsPage
      props: (route) => {
        const id = Number(route.params.id) // Si no se puede lo mandamos a 404
        return isNaN(id) ? router.push({ name: '404' }) : { id: id }
      },
      meta: { title: 'Details Page' },
    },
    {
      path: '/subview',
      name: 'subview',
      // Lazy, se carga solo cuando se accede a la ruta
      component: () => import('../views/SubView.vue'),
      children: [
        {
          path: '',
          name: 'subview-list',
          meta: { title: 'SubView List' },
          component: SubViewList,
        },
        {
          path: 'about',
          name: 'subview-about',
          component: () => import('@/views/SubView/SubViewAbout.vue'), // Lazy loading
          meta: { title: 'SubView About' },
        },
      ],
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

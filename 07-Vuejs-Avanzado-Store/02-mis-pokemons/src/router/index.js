import { createRouter, createWebHistory } from 'vue-router'
import PokemonView from '@/views/PokemonView.vue'
import PokemonDetailsView from '@/views/PokemonDetailsView.vue'

// Mis rutas!!
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: PokemonView,
    },
    {
      path: '/:id',
      name: 'PokemonDetails',
      component: PokemonDetailsView,
      // Le pasamos props a la vista DetailsPage
      props: (route) => {
        const id = Number(route.params.id) // Si no se puede lo mandamos a 404
        // Devolvemos los props del componente a usar
        return isNaN(id) ? router.push({ name: '404' }) : { id: id, query: route.query }
      },
      meta: { title: 'Pokemon Details Page' },
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

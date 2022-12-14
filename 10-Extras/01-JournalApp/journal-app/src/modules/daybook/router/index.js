// Router local

import isAuthenticatedGuard from './auth-guard'

export default {
  name: 'daybook',
  component: () => import('@/modules/daybook/layouts/DayBookLayout.vue'),
  meta: { title: 'DayBook' },
  children: [
    {
      name: 'daybook-no-entry',
      path: '',
      component: () => import('@/modules/daybook/views/NoEntryView.vue'),
      meta: { title: 'DayBook No Entry' },
    },
    {
      name: 'daybook-entry',
      path: ':id',
      component: () => import('@/modules/daybook/views/EntryView.vue'),
      meta: { title: 'DayBook Entry' },
      // Le pasamos props
      props: (route) => {
        return {
          id: route.params.id,
        }
        // const id = String(route.params.id) // Si no se puede lo mandamos a 404
        // return isNaN(id) ? router.push({ name: '404' }) : { id: id }
      },
      // Protegemos localmente la ruta si no estamos logueados
      beforeEnter: [isAuthenticatedGuard],
    },
  ],
}

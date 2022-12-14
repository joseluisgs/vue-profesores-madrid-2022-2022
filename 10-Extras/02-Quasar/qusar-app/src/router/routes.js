const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    // Rutas anidadas!!!
    children: [
      { path: '', name: 'index', component: () => import('pages/IndexPage.vue') },
      {
        path: 'typography',
        name: 'typography',
        component: () => import('pages/TypographyPage.vue'),
      },
      { path: 'flex', name: 'flex', component: () => import('pages/FlexPage.vue') },
      { path: 'dialog', name: 'dialog', component: () => import('pages/DialogPage.vue') },
      { path: 'forms', name: 'forms', component: () => import('pages/FormsPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes

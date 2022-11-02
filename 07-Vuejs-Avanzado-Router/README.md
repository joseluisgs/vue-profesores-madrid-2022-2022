# Vue.js avanzado: Vue Router

Vue Router y rutas en Vue.js


[![Vue Ready](https://img.shields.io/badge/Code-Vue.js-%2342b983)](https://es.vuejs.org/)
[![LICENSE](https://img.shields.io/badge/License-CC-%23e64545)](https://joseluisgs.github.io/docs/license/)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/vue-profesores-madrid-2022-2022)

![Vue.js](../images/vue-avanzado.jpg)

- [Vue.js avanzado: Vue Router](#vuejs-avanzado-vue-router)
  - [Acerca de](#acerca-de)
  - [Vue Router](#vue-router)
    - [SPA y las rutas](#spa-y-las-rutas)
    - [Creando rutas](#creando-rutas)
  - [Vue Router](#vue-router-1)
    - [Router Link](#router-link)
    - [Router View](#router-view)
    - [Segmentos de URL y Query Parameters](#segmentos-de-url-y-query-parameters)
    - [Navegar por código: router](#navegar-por-código-router)
    - [Pasar propiedades en base al valor del router](#pasar-propiedades-en-base-al-valor-del-router)
    - [Rutas Hijas y Multiple Router View](#rutas-hijas-y-multiple-router-view)
    - [Navigation Guards](#navigation-guards)
  - [Ejercicios](#ejercicios)
  - [Autor](#autor)
    - [Contacto](#contacto)
    - [¿Un café?](#un-café)
  - [Licencia de uso](#licencia-de-uso)

## Acerca de
Vue Router es una librería que nos permite gestionar las rutas de nuestra aplicación. Es decir, nos permite navegar entre distintas vistas o páginas de nuestra aplicación y mostrar una url personalizada para ello.

## Vue Router

[Vue Router](https://router.vuejs.org/) es la librería oficial de Vue.js para gestionar las rutas de nuestra aplicación. Con ella podemos crear rutas, navegar entre ellas, pasar parámetros, etc.

### SPA y las rutas

Una Single-Page Application (SPA) es un tipo de aplicación web que ejecuta todo su contenido en una sola página. Al ir pasando de una sección a otra, solo necesita cargar el contenido nuevo de forma dinámica si este lo requiere. Esto mejora los tiempos de respuesta y agiliza mucho la navegación, favoreciendo así a la experiencia de usuario. A su vez podemos implementar carga directa o perezosa de contenido.

Respecto a las URLs del navegador, existe la posibilidad de que se vayan modificando en la barra de direcciones a medida que intercambiamos las vistas. Como hemos dicho, no se cambia la página, pero sí el contenido. Otorgar una URL propia a cada pantalla es muy útil de cara a aspectos como la navegabilidad o para compartirla.

![img01](https://user-images.githubusercontent.com/32254689/71607747-58fdd700-2bbf-11ea-90d9-08ba4c8fea72.png)


### Creando rutas

## Vue Router

[Vue Router](https://router.vuejs.org/api/interfaces/routeroptions.html#history) es el componente de Vue que nos permite navegar entre páginas o vistas. Se define en un fichero con las rutas.

![img02](https://miro.medium.com/max/1200/1*0rItCaXRjYFvhdhtLahUXw.png)

```js
const router = createRouter({
  // Hacemos el history para la URL y sin #, si no es crteateHashHistory
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Exportación directa
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // Lazy loading, solo cuando se requiere...
    {
      path: '/about',
      name: 'about',
      // Lazy loading
      component: () => import('@/views/AboutView.vue'),
    },
    // Página a la que le pasamos parámetros
    {
      path: '/student/:id',
      name: 'student-detail',
      component: StudentPage,
      meta: { title: 'Student Details' },
    },
    // 404
    {
      // Cualquier cosa que no coincida con las rutas anteriores
      path: '/:pathMatch(.*)*', // Cualquier otra cosa
      name: '404',
      component: () => import('@/views/404View.vue'), // Lazy loading
    },
  ],
})

export default router
```

### Router Link

Nos permite crear enlaces a los componentes de Vue como si fueran etiquetas: 

```html
<a href="http://#">Mi enlace</a>
```

Es decir, nos permite navegar entre las rutas de nuestra aplicación.

```html
<nav>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>
  <!-- Si quiero usar el nombre de las vistas o de componente y no su url RECOMENDADO -->
  <RouterLink :to="{ name: 'home' }">Home Named</RouterLink>
</nav>
```

### Router View

Renderiza el componente indicado por el router en el layout donde se pone. Todos los componentes se renderizarán ahí.

```html
<template>
  <NavBar />

  <!-- Si quiero cachear las vistas usar keep alive 
  <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
-->

  <RouterView />
</template>
```

### Segmentos de URL y Query Parameters

Nos sirven para pasar información a los componentes en base a su URL por segmentos y Query Parameters

En el router, definimos el segmento variable:

```js
{
  path: '/student/:id',
  name: 'student-details',
  component: StudentPage,
  meta: { title: 'Student Details' },
},

```

En la navegación

```html
<RouterLink to="/student/1">Student 1</RouterLink>
<!-- Con nombrados -->
<RouterLink :to="{ name: 'student-details', params: { id: '2' } }">Student 2</RouterLink>
```

En el componente podemos recuperarlo con el objeto [route](https://router.vuejs.org/guide/advanced/composition-api.html).

```js
import { useRoute } from 'vue-router'
console.log(route.fullPath)
console.log(route.params.id)
console.log(route.query)
```

### Navegar por código: router

Podemos navegar por código a cualquier lugar definido por nuestro router con el objeto [router](https://router.vuejs.org/guide/advanced/composition-api.html).

```js
import { useRouter } from 'vue-router'
const goHome = () => {
  // router.push('/students')
  // o usando nombrados
  router.push({ name: 'student-list' })
}
```

### Pasar propiedades en base al valor del router

Podemos hacerlo usado [props](https://router.vuejs.org/guide/essentials/passing-props.html) en el enrutador

```js
{
      path: '/student/:id',
      name: 'student-page',
      component: StudentPage,
      // Le pasamos props a la vista StudentPage
      props: (route) => ({
        id: route.params.id,
      }),
      meta: { title: 'Student Page' },
}
```

### Rutas Hijas y Multiple Router View

Podemos renderizar una vista hija en una vista padre usando el componente [children](https://router.vuejs.org/guide/essentials/nested-routes.html) de las rutas. Estas se rederizarán dentro de un componente padre pudiéndose anidar router view.

```js
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // UserProfile will be rendered inside User's <router-view>
        // when /user/:id/profile is matched
        path: 'profile',
        component: UserProfile,
      },
      {
        // UserPosts will be rendered inside User's <router-view>
        // when /user/:id/posts is matched
        path: 'posts',
        component: UserPosts,
      },
    ],
  },
]
```

### Navigation Guards

Los [guards](https://router.vuejs.org/guide/advanced/navigation-guards.html) son condiciones que deben de cumplirse para dejar pasar a una ruta, por ejemplo que estemos autenticados, o que tengamos x permisos.

Si queremos aplicarlas solo a rutas específicas, debemos usar [beforeEnter](https://router.vuejs.org/api/interfaces/routerecordnormalized.html#beforeenter) con el nombre de la función que hace de guarda.

```js
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // Si no venimos de login y no estamos autenticados, vamos a login
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // si no pasamos a la ruta
  else next()
})
```

## Ejercicios
Este tema tiene varios ejercicios, puedes realizarlos [aquí](./EJERCICIOS.md)

## Autor

Codificado con :sparkling_heart: por [José Luis González Sánchez](https://twitter.com/joseluisgonsan). 

[![Twitter](https://img.shields.io/twitter/follow/joseluisgonsan?style=social)](https://twitter.com/joseluisgonsan)
[![GitHub](https://img.shields.io/github/followers/joseluisgs?style=social)](https://github.com/joseluisgs)

### Contacto
<p>
  Cualquier cosa que necesites házmelo saber por si puedo ayudarte 💬.
</p>
<p>
 <a href="https://joseluisgs.github.io/" target="_blank">
        <img src="https://joseluisgs.github.io/img/favicon.png" 
    height="30">
    </a>  &nbsp;&nbsp;
    <a href="https://github.com/joseluisgs" target="_blank">
        <img src="https://distreau.com/github.svg" 
    height="30">
    </a> &nbsp;&nbsp;
        <a href="https://twitter.com/joseluisgonsan" target="_blank">
        <img src="https://i.imgur.com/U4Uiaef.png" 
    height="30">
    </a> &nbsp;&nbsp;
    <a href="https://www.linkedin.com/in/joseluisgonsan" target="_blank">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png" 
    height="30">
    </a>  &nbsp;&nbsp;
    <a href="https://discordapp.com/users/joseluisgs#3560" target="_blank">
        <img src="https://logodownload.org/wp-content/uploads/2017/11/discord-logo-4-1.png" 
    height="30"> 
    </a> &nbsp;&nbsp;
    <a href="https://g.dev/joseluisgs" target="_blank">
        <img loading="lazy" src="https://googlediscovery.com/wp-content/uploads/google-developers.png" 
    height="30">
    </a>    
</p>

### ¿Un café?
<p><a href="https://www.buymeacoffee.com/joseluisgs"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" height="48" alt="joseluisgs" /></a></p><br><br><br>

## Licencia de uso

Este repositorio y todo su contenido está licenciado bajo licencia **Creative Commons**, si desea saber más, vea la [LICENSE](https://joseluisgs.github.io/docs/license/). Por favor si compartes, usas o modificas este proyecto cita a su autor, y usa las mismas condiciones para su uso docente, formativo o educativo y no comercial.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Licencia de Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">JoseLuisGS</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="https://joseluisgs.github.io/" property="cc:attributionName" rel="cc:attributionURL">José Luis González Sánchez</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Reconocimiento-NoComercial-CompartirIgual 4.0 Internacional License</a>.<br />Creado a partir de la obra en <a xmlns:dct="http://purl.org/dc/terms/" href="https://github.com/joseluisgs" rel="dct:source">https://github.com/joseluisgs</a>.
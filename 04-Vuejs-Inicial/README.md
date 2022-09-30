# Vue.js Inicial

Comenzaremos con las bases de Vue.js


[![Vue Ready](https://img.shields.io/badge/Code-Vue.js-%2342b983)](https://es.vuejs.org/)
[![LICENSE](https://img.shields.io/badge/License-CC-%23e64545)](https://joseluisgs.github.io/docs/license/)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/vue-profesores-madrid-2022-2022)

![Vue.js](../images/vuejsintro.png)

- [Vue.js Inicial](#vuejs-inicial)
  - [Acerca de](#acerca-de)
  - [Referencias](#referencias)
  - [Vue.js](#vuejs)
  - [Puntos interesantes](#puntos-interesantes)
  - [SPA](#spa)
  - [Iniciando el proyecto](#iniciando-el-proyecto)
  - [Estructura del proyecto](#estructura-del-proyecto)
  - [Ejecutando nuestra app](#ejecutando-nuestra-app)
    - [Project Setup](#project-setup)
    - [Compile and Hot-Reload for Development](#compile-and-hot-reload-for-development)
    - [Compile and Minify for Production](#compile-and-minify-for-production)
    - [Run Unit Tests with Vitest](#run-unit-tests-with-vitest)
    - [Lint with ESLint](#lint-with-eslint)
  - [Estructura de un fichero vue SFC](#estructura-de-un-fichero-vue-sfc)
    - [Estilos de uso: Options vs Composition](#estilos-de-uso-options-vs-composition)
    - [Primer componente](#primer-componente)
    - [Template](#template)
    - [Script](#script)
    - [Style](#style)
  - [Directivas de Template](#directivas-de-template)
    - [Representación declarativa](#representación-declarativa)
    - [Renderizado condicional: v-if y v-else-if y v-show](#renderizado-condicional-v-if-y-v-else-if-y-v-show)
    - [Renderizado de listas o repeticiones: v-for](#renderizado-de-listas-o-repeticiones-v-for)
    - [Enlazado a eventos: v-on](#enlazado-a-eventos-v-on)
      - [Modificadores](#modificadores)
    - [Enlazando reactividad con formularios: v-model](#enlazando-reactividad-con-formularios-v-model)
  - [Lógica del componente](#lógica-del-componente)
    - [Representación del estado: data](#representación-del-estado-data)
    - [Métodos y lógica](#métodos-y-lógica)
    - [Propiedades computadas](#propiedades-computadas)
    - [Watchers](#watchers)
  - [Ejercicios](#ejercicios)
  - [Autor](#autor)
    - [Contacto](#contacto)
    - [¿Un café?](#un-café)
  - [Licencia de uso](#licencia-de-uso)

## Acerca de
Bases de Vue.js iniciales


## Referencias 
- [Vue.js](https://vuejs.org/guide/introduction.html)

## Vue.js 
Es un framework de JavaScript que nos permite crear aplicaciones web de forma sencilla y rápida. Es un framework progresivo, lo que significa que podemos ir añadiendo funcionalidades a medida que vamos necesitándolas.


## Puntos interesantes
Algunos puntos de interes que podemos observar en Vue.js son:
- fácil de iniciar 
- versátil y escalable 
- rendimiento en el DOM (más rápido que React y Angular)
- ecosistema: vite, pinia, vue router, vitest, cypres, vue utils, quasar...
- progresiva: lo tienes todo y lo agregas según te haga falta.

## SPA
SPA (Single Page Application) es una aplicación web que se carga una sola vez y que se actualiza dinámicamente a medida que el usuario interactúa con ella. En lugar de cargar una nueva página cada vez que el usuario hace clic en un enlace, la aplicación web carga una sola página HTML y actualiza el contenido de la página según sea necesario en base al código JavaScrip. Esto permite que las aplicaciones web sean más rápidas y fluidas para el usuario.

Este es el gran poder de los frameworks de JavaScript, ya que nos permiten crear aplicaciones web de forma rápida y sencilla, además de potente.

## Iniciando el proyecto

Vamos a usar la [plantilla oficial](https://vuejs.org/guide/quick-start.html#with-build-tools) basada en [Vite](https://vitejs.dev/)(le da muchas más rapidez que el antiguo Vue CLI). Debemos tener la extensión [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) instalada

```bash
$ npm init vue@latest
```

Nos dará a elegir una plantilla de Vue.js

```bash
✔ Project name: … <your-project-name>
✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit testing? … No / Yes
✔ Add Cypress for both Unit and End-to-End testing? … No / Yes
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

Finalmente:

```bash
> cd <your-project-name>
> npm install
> npm run dev
```

En mi caso vamos a usar JS con Pinia, ESlint y Prettier.

## Estructura del proyecto

La estructura del proyecto es la siguiente:

- src: carpeta donde se encuentra el código de nuestra app
  - assets: carpeta donde se encuentran los assets o recurso estáticos de nuestra app
  - components: carpeta donde se encuentran los componentes de nuestra app. Puede tener recursos propios por cada componente o test de dichos componentes
  - views: carpeta donde se encuentran las vistas de nuestra app (opcional)
  - App.vue: archivo principal de nuestra app (como solo hay uno, no se necesita views)
  - main.js: código de inicialización de nuestra app
- test: carpeta donde se encuentran los tests de nuestra app (opcional)

## Ejecutando nuestra app

### Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Estructura de un fichero vue SFC

Un SFC o [Single File Component](https://vuejs.org/api/sfc-spec.html#sfc-syntax-specification) es una forma de encapsular los elementos de componente en base a su estructura, lógica y presentación. 
Su extensión es .vue

- templete: plantilla de la vista con el DOM
- script: código de nuestro componente siguiendo Options API o Composition API
- style: estilo de nuestro componente, puede ser scooped lo cual este estilo solo se aplica al componente en cuestión



### Estilos de uso: Options vs Composition
Cuando usamos Vue.js tenemos [dos estilos](https://vuejs.org/guide/introduction.html#api-styles), Options API y Composition API. Cada una será más adecuada según el proyecto. Comenzaremos con Options API y poco a poco iremos al Composition API. Lo veremos más adelante.

### Primer componente

Se crea un componente, es importante indicar su nombre, name. El nombre nos sirve para poder localizarlo con las Vue Developer Tools
Se importa en el destino el componente. Se incluye en el objeto components y se usa según el nombre con el que se ha importado.

```js
<template>
  <p>Init</p>
  <MyCounter />
  {{ msg }}
</template>

<script>
import MyCounter from '@/components/MyCounter.vue'

export default {
  name: 'App',

  components: {
    MyCounter,
  },

  data() {
    return {
      msg: 'Hello Vue.js',
    }
  },
}
</script>
<style scoped>
p {
  color: red;
}
</style>
```

### Template
Es la parte de HTML que se va a renderizar en base a la lógica del componente. Es la vista

### Script
Es la lógica del componente. Aquí se define el componente, se importan los componentes hijos, se definen los datos, métodos, etc. Es el controlador y modelo de la vista.

### Style
Define los estilos del componente. Puede ser scoped, lo cual significa que solo afecta al componente en cuestión. Si no se indica scoped afecta a toda la app.

## Directivas de Template
A la hora de trabajar con el Template y comunicarlo con el controlador y el modelo, tenemos las directivas. Son pequeñas instrucciones que se añaden a los elementos del DOM.

###  Representación declarativa
Podemos hacer [interpolación de texto](https://vuejs.org/guide/essentials/template-syntax.html#text-interpolation) mediante sintaxis moustache. Todo tendrá efecto en en el DIV que controlamos.
```html
  <h1>{{ title }}</h1>
  <p>{{ message }}</p>
```

### Renderizado condicional: v-if y v-else-if y v-show
Podemos renderizar un elemento condicional con la directiva [v-if](https://vuejs.org/api/built-in-directives.html#v-if) y [v-else-if](https://vuejs.org/api/built-in-directives.html#v-else) y [v-show](https://vuejs.org/api/built-in-directives.html#v-show).
```html
  <div v-if="isVisible">
    <p>Esto sólo se muestra si isVisible es true</p>
  </div>
  <div v-else-if="!isVisible">
    <p>Esto sólo se muestra si isVisible es false</p>
  </div>
  <div v-show="isVisible">
    <p>Esto sólo se muestra si isVisible es true</p>
  </div>
```

### Renderizado de listas o repeticiones: v-for
Podemos renderizar una lista de elementos con la directiva [v-for](https://vuejs.org/api/built-in-directives.html#v-for):
```html
  <ul>
    <li v-for="item in items">{{ item }}</li>
  </ul>
```

### Enlazado a eventos: v-on 
Podemos usar [eventos](https://vuejs.org/guide/essentials/event-handling.html)  y reaccionar reactivamente.
Los eventos se manejan con la directiva v-on:evento, pero se puede simplificar usando @evento
```html
  <button v-on:click="handleClick">Click me!</button>
  <button @click="handleClick">Click me!</button>
```

#### Modificadores
Podemos usar modificadores de [eventos](https://vuejs.org/guide/essentials/event-handling.html#event-modifiers), [teclas](https://vuejs.org/guide/essentials/event-handling.html#key-modifiers) o [ratón](https://vuejs.org/guide/essentials/event-handling.html#mouse-button-modifiers) para mejorar la lógica de nuestro código de una forma muy sencilla.
```html
  <input type="text" v-model.trim="message" @keyup.enter"addName" />
```

### Enlazando reactividad con formularios: v-model 
Podemos enlazar reactividad con formularios con la directiva [v-model](https://vuejs.org/api/built-in-directives.html#v-model).
```html
  <input type="text" v-model="message">
```

## Lógica del componente 

### Representación del estado: data
Podemos representado un estado y reaccionar reactivamente bajo el objeto [data](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state)
```js
  data() {
    return {
      message: "Hola Vue :)"
    }
  },
```

### Métodos y lógica
Podemos usar [eventos](https://vuejs.org/guide/essentials/event-handling.html)  y reaccionar reactivamente.
Los eventos se manejan con la directiva v-on:evento, pero se puede simplificar usando @evento
```js
  methods: {
    onClick() {
      this.message = "Has pulsado el botón :)"
    }
  }
```

### Propiedades computadas

Las [propiedades computadas](https://vuejs.org/guide/essentials/computed.html#computed-properties) son propiedades que se calculan en base a otras propiedades del objeto y su valor está cacheado en el componente. Al contrario que los métodos que siempre se ejecutan, las computed properties solo se ejecutan si detectan un cambio en el estado que les afectan, por ejemplo, si se cambia el valor de una propiedad. Muy útil para optimizar el rendimiento de nuestra app.

```js
computed: {
      counterSquare() {
        return this.counter * this.counter
      },
    },
```

### Watchers

Los [watchers](https://vuejs.org/guide/essentials/watchers.html) son métodos que se ejecutan cuando se detecta un cambio en el estado de nuestra app. Es decir son observables que reaccionan a los cambios en el estado de nuestra app y con ello mejoran la reactividad.

```js
// Mi estado
    data() {
      return {
        question: '',
      }
    },
    // Mis watchers
    watch: {
      // Observamos question
      question(newQuestion, oldQuestion) {
        // Si la pregunta cambia
        // console.log(oldQuestion, newQuestion)
          // Si la pregunta termina con un signo de interrogación
          if (newQuestion.endsWith('?') && newQuestion.length > 1) {
            // Respuesta aleatoria
            console.log('Si tiene el signo de interrogación')
          }
      },
    },
```

## Ejercicios
- [Ejercicio 1](./EJERCICIOS.md)

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
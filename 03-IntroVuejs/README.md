# Introducción a Vue.js

En este apartado veremos las bases de Vue.js como sustituto a jQuery y similares


[![Vue Ready](https://img.shields.io/badge/Code-Vue.js-%2342b983)](https://es.vuejs.org/)
[![LICENSE](https://img.shields.io/badge/License-CC-%23e64545)](https://joseluisgs.github.io/docs/license/)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/vue-profesores-madrid-2022-2022)

![Vue.js](../images/vuejsintro.png)

- [Introducción a Vue.js](#introducción-a-vuejs)
  - [Acerca de](#acerca-de)
  - [Referencias](#referencias)
  - [Vue.js](#vuejs)
  - [Puntos interesantes](#puntos-interesantes)
  - [Instalación y montaje](#instalación-y-montaje)
  - [Representación declarativa](#representación-declarativa)
  - [Estilos de uso: Options vs Composition](#estilos-de-uso-options-vs-composition)
  - [Representación del estado: data](#representación-del-estado-data)
  - [Introducción a los eventos: métodos y v-on](#introducción-a-los-eventos-métodos-y-v-on)
  - [Renderizado de listas o repeticiones: v-for](#renderizado-de-listas-o-repeticiones-v-for)
  - [Enlazando reactividad con formularios: v-model](#enlazando-reactividad-con-formularios-v-model)
  - [Modificadores](#modificadores)
  - [Renderizado condicional: v-if y v-else-if y v-show](#renderizado-condicional-v-if-y-v-else-if-y-v-show)
  - [Autor](#autor)
    - [Contacto](#contacto)
    - [¿Un café?](#un-café)
  - [Licencia de uso](#licencia-de-uso)

## Acerca de
Bases de Vue.js como sustituto de jQuery y similares


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

## Instalación y montaje
Podemos usar Vue.js desde el CDN https://unpkg.com/vue@next. A partir de aquí, creamos nuestro script app.js, y en la web decimos que parte de la web (div) queremos que controle.

## Representación declarativa
Podemos hacer [interpolación de texto](https://vuejs.org/guide/essentials/template-syntax.html#text-interpolation) mediante sintaxis moustache. Todo tendrá efecto en en el DIV que controlamos.
```html
  <h1>{{ title }}</h1>
  <p>{{ message }}</p>
```

## Estilos de uso: Options vs Composition
Cuando usamos Vue.js tenemos [dos estilos](https://vuejs.org/guide/introduction.html#api-styles), Options API y Composition API. Cada una será más adecuada según el proyecto. Comenzaremos con Options API y poco a poco iremos al Composition API. Lo veremos más adelante.

## Representación del estado: data
Podemos representado un estado y reaccionar reactivamente bajo el objeto [data](https://vuejs.org/guide/essentials/reactivity-fundamentals.html#declaring-reactive-state)
```js
  data() {
    return {
      message: "Hola Vue :)"
    }
  },
```

## Introducción a los eventos: métodos y v-on 
Podemos usar [eventos](https://vuejs.org/guide/essentials/event-handling.html)  y reaccionar reactivamente.
Los eventos se manejan con la directiva v-on:evento, pero se puede simplificar usando @evento
```js
  methods: {
    onClick() {
      this.message = "Has pulsado el botón :)"
    }
  }
```
```html
  <button v-on:click="handleClick">Click me!</button>
  <button @click="handleClick">Click me!</button>
```

## Renderizado de listas o repeticiones: v-for
Podemos renderizar una lista de elementos con la directiva [v-for](https://vuejs.org/api/built-in-directives.html#v-for):
```html
  <ul>
    <li v-for="item in items">{{ item }}</li>
  </ul>
```
## Enlazando reactividad con formularios: v-model 
Podemos enlazar reactividad con formularios con la directiva [v-model](https://vuejs.org/api/built-in-directives.html#v-model).
```html
  <input type="text" v-model="message">
```
## Modificadores
Podemos usar modificadores de [eventos](https://vuejs.org/guide/essentials/event-handling.html#event-modifiers), [teclas](https://vuejs.org/guide/essentials/event-handling.html#key-modifiers) o [ratón](https://vuejs.org/guide/essentials/event-handling.html#mouse-button-modifiers) para mejorar la lógica de nuestro código de una forma muy sencilla.
```html
  <input type="text" v-model.trim="message" @keyup.enter"addName" />
```

## Renderizado condicional: v-if y v-else-if y v-show
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
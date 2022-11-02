# Vue.js avanzado: Store

Pinia y Storage

[![Vue Ready](https://img.shields.io/badge/Code-Vue.js-%2342b983)](https://es.vuejs.org/)
[![LICENSE](https://img.shields.io/badge/License-CC-%23e64545)](https://joseluisgs.github.io/docs/license/)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/vue-profesores-madrid-2022-2022)

![Vue.js](../images/vue-avanzado.jpg)

- [Vue.js avanzado: Store](#vuejs-avanzado-store)
  - [Acerca de](#acerca-de)
  - [Storage](#storage)
  - [Store](#store)
  - [Pinia](#pinia)
    - [State](#state)
    - [Getters](#getters)
    - [Actions](#actions)
    - [Módulos](#módulos)
    - [Ejemplo](#ejemplo)
  - [Composition API y Pinia](#composition-api-y-pinia)
    - [Acceso al estado](#acceso-al-estado)
    - [Acciones](#acciones)
    - [Computed](#computed)
  - [Options API y Pinia](#options-api-y-pinia)
    - [Acceso al State](#acceso-al-state)
    - [Acciones](#acciones-1)
    - [Getters](#getters-1)
  - [Ejercicios](#ejercicios)
  - [Autor](#autor)
    - [Contacto](#contacto)
    - [¿Un café?](#un-café)
  - [Licencia de uso](#licencia-de-uso)

## Acerca de
En esta unidad vamos a ver como podemos usar el storage del navegador para almacenar datos y como podemos usar Pinia para gestionar el estado de nuestra aplicación.

## Storage
El [storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) es una forma de almacenar datos en el navegador. Estos datos se almacenan en el navegador del usuario y se pueden recuperar cuando el usuario vuelva a la página. Esto nos permite almacenar datos de forma persistente en el navegador. Podemos usarlo para guardar preferencias o información a ser recuperada en cada acceso. Se utiliza como un diccionario o mapa basado en clave-valor.

Se recomienda no abusar de éste almacenamiento y no hacer uso de él para datos sensibles, pues en cualquier momento se puede consultar desde el navegador.

```js
// Almacenar
localStorage.setItem('nombre', 'Pepe');

// Recuperar
const nombre = localStorage.getItem('nombre');

// Eliminar
localStorage.removeItem('nombre');

// Limpiar todo
localStorage.clear();
```

## Store
En Vue.js y en otros frameworks, una store central, o store, es un objeto que contiene el estado de la aplicación. Y este estado es compartido por los componentes que lo requieran.

 Con ello nos facilitan el intercambio y acceso de información sin sobrecargar propiedades y eventos cuando el nivel de jerarquía es alto, se comparten numerosas rutas o simplemente simplifica la lógica de nuestros componentes y test.

 ![img1](https://vuex.vuejs.org/flow.png)


En Vue.js, el store se basa en otros conocidos como [Flux/Redux](https://medium.com/nowports-tech/aprendiendo-a-implementar-redux-5eb8745e7552) o [Vuex](https://vuex.vuejs.org/). En este caso, vamos a usar Pinia, una librería que nos permite gestionar el estado de nuestra aplicación de forma sencilla y eficiente.

Una store está formada por:
- Estado: El estado de la aplicación o conjunto de datos que queremos gestionar.
- Mutaciones: Funciones que modifican el estado de la aplicación.
- Acciones: Funciones que realizan operaciones asíncronas y que pueden llamar a mutaciones.

![img2](https://vuex.vuejs.org/vuex.png)
****
## Pinia
[Pinia](https://pinia.vuejs.org/) es el store oficial de Vue.js que ha sustituido a Vuex, de hecho es Vuex 5 con otro nombre. Es una librería que nos permite gestionar el estado de nuestra aplicación de forma sencilla y eficiente. Además, encaja perfectamente si usamos TypeScript. Pinia se basa en el uso de un composable para manejar el estado de la aplicación.

Los elementos de una estore en Pinia son:
- State (Estado): El estado de la aplicación o conjunto de datos que queremos gestionar.
- Getters: Funciones que devuelven datos calculados a partir del estado.
- Actions (Acciones): Funciones que realizan operaciones síncronas y asíncronas y que modifican el estado de la aplicación.

### State

Es el estado reactivo compartido

```js
state: () => {
    return {
      counter: 0,
      name: 'Pepe',
      isAdmin: true,
    }
  },
```

### Getters

Son las propiedades computadas sobre elementos del estado de la store.

```js
state: () => ({
  counter: 0,
}),
getters: {
  doubleCount: (state) => state.counter * 2,
},
```

### Actions

Son funciones que pueden ser síncronas o asíncrona y que modifican el estado. De esta manera lo encapsulamos.

```js
state: () => ({
  counter: 0,
  userData: null,
}),
actions: {
  increment() {
    this.counter++
  },
  randomizeCounter() {
    this.counter = Math.round(100 * Math.random())
  },
  async registerUser(login, password) {
    try {
      this.userData = await api.post({ login, password })
    } catch (error) {
      return error
    }
  },
},
```

### Módulos

Se puede definir cada store por separado dividiendo su lógica y poder usarse una dentro de otra o en distintos componentes.

```js
import { defineStore } from 'pinia'
import { useUserStore } from './user'

export const useCartStore = defineStore('cart', {
  actions: {
    async orderCart() {
      const user = useUserStore()

      try {
        await apiOrderCart(user.token, this.items)
        this.emptyCart()
      } catch (err) {
        return err
      }
    },
  },
})
```

### Ejemplo

```js
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  // Estado de la aplicación
  state: () => ({
    count: 0,
  }),
  // Getters: Funciones que devuelven datos calculados a partir del estado.
  getters: {
    // Devuelve el doble del estado
    doubleCount(state) {
      return state.count * 2
    },
  },
  // Acciones: Funciones que realizan operaciones síncronas y asíncronas y que modifican el estado de la aplicación.
  actions: {
    // Incrementa el estado
    increment() {
      this.count++
    },
    // Elemento aleatorio
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```

Podemos usar el store en cualquier componente de la aplicación de la siguiente forma:

```js
import { useCounterStore } from '../store/counter'

const counterStore = useCounterStore()

console.log(counterStore.count) // 0
counterStore.increment()
console.log(counterStore.count) // 1
console.log(counterStore.doubleCount) // 2

```

## Composition API y Pinia

### Acceso al estado

Importamos el store como un elemento más y accedemos por sus propiedades en el state.

### Acciones

Simplemente llamamos al método, sea síncrono o asíncrono.

### Computed

Son una variable más computada más

## Options API y Pinia

### Acceso al State

Para manejar el [estado](https://pinia.vuejs.org/core-concepts/state.html#usage-with-the-options-api), usaremos mapState para opener un estado de solo lectura, o mapWritableState() para lectura escritura.

### Acciones

Usamos para manejar las [acciones](https://pinia.vuejs.org/core-concepts/actions.html#without-setup) mapActions y la acción a ejecutar ya sean síncronas o asíncronas.

### Getters

Se usa mapState

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
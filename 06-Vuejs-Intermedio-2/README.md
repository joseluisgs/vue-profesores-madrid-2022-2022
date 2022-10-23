# Vue.js Intermedio: Composition API

Composition API


[![Vue Ready](https://img.shields.io/badge/Code-Vue.js-%2342b983)](https://es.vuejs.org/)
[![LICENSE](https://img.shields.io/badge/License-CC-%23e64545)](https://joseluisgs.github.io/docs/license/)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/vue-profesores-madrid-2022-2022)

![Vue.js](../images/vue-intermedio.jpg)

- [Vue.js Intermedio: Composition API](#vuejs-intermedio-composition-api)
  - [Acerca de](#acerca-de)
  - [Composition API](#composition-api)
    - [Estructura](#estructura)
  - [Reactividad](#reactividad)
  - [Referencias computadas](#referencias-computadas)
  - [Watcher](#watcher)
  - [Hooks de ciclo de vida](#hooks-de-ciclo-de-vida)
  - [Propiedades](#propiedades)
  - [Eventos](#eventos)
  - [Exposición](#exposición)
  - [Consideraciones](#consideraciones)
  - [Script Setup](#script-setup)
    - [Eventos y Propiedades](#eventos-y-propiedades)
    - [Exposición de variables](#exposición-de-variables)
  - [Ejercicios](#ejercicios)
  - [Autor](#autor)
    - [Contacto](#contacto)
    - [¿Un café?](#un-café)
  - [Licencia de uso](#licencia-de-uso)

## Acerca de
Con la llegada de Vue 3, se ha introducido una nueva API de composición que nos permite reutilizar código y crear componentes más pequeños y reutilizables. En este curso, aprenderemos a utilizar la nueva API de composición para crear componentes más pequeños y reutilizables.

## Composition API

La Composition API es la [nueva forma](https://vuejs.org/guide/introduction.html#api-styles) en Vue.js desde la versión 3 para crear nuestros componentes. Es solo cuestión de estilos.

Options API se centra en el concepto de una "instancia de componente", que generalmente se alinea mejor con un modelo mental basado en clases para usuarios que provienen de entornos de lenguaje OOP. También es más amigable para principiantes al abstraer los detalles de reactividad y hacer cumplir la organización del código a través de grupos de opciones.

Composition API se centra en declarar variables de estado reactivas directamente en el ámbito de una función y componer el estado de varias funciones juntas para manejar la complejidad. Tiene una forma más libre y requiere una comprensión de cómo funciona la reactividad en Vue para ser utilizado de manera efectiva. A cambio, su flexibilidad permite patrones más poderosos para organizar y reutilizar la lógica.

Si es nuevo en Vue, te recomiendo:

Para propósitos de aprendizaje, elige el estilo que te parezca más fácil de entender. Una vez más, la mayoría de los conceptos básicos se comparten entre los dos estilos. Siempre puedes elegir el otro estilo más tarde.

Para uso en producción:

- Usa con la API de opciones si no está utilizando herramientas de compilación, o planea usar Vue principalmente en escenarios de baja complejidad.
- Elija Composición API + Componentes de un solo archivo si planea crear aplicaciones completas con Vue.

[Aquí una comparación](https://vuejs.org/guide/extras/composition-api-faq.html#more-flexible-code-organization)

### Estructura

A partir de ahora tenemos una función [setup](https://vuejs.org/api/composition-api-setup.html) que sirve de punto de entrada devolviendo (return) o exponiendo públicamente aquellos elementos que necesitamos en las vistas. Ademas importaremos aquellos elementos que necesitemos en todo momento (más eficiente el código).
Siempre tomamos de setup como parametrosm primero las props, y luego el contexto: setup(props, context)

```js
<script>
import { ref } from 'vue'

export default {
  setup() {
    const count = ref(0)

    // expose to template and other options API hooks, debes exponerlo para usarlo!
    return {
      count
    }
  },

  mounted() {
    console.log(count.value) // 0
  }
}
</script>
```

Si tenemos que usar props, las recibimos como parámetro de la función setup. Si no las usamos, podemos omitirlas o usar context para recoger el resto de parámetros.

```js
export default {
  setup(props, context) {
    // Attributes (Non-reactive object, equivalent to $attrs)
    console.log(context.attrs)

    // Slots (Non-reactive object, equivalent to $slots)
    console.log(context.slots)

    // Emit events (Function, equivalent to $emit)
    console.log(context.emit)

    // Expose public properties (Function)
    console.log(context.expose)
  }
}
```

Podemos usar desestructucturación para recibir solo lo que necesitamos.
```js
export default {
  setup(props, { attrs, slots, emit, expose }) {
    ...
  }
}
```

Además, tenemos la forma abreviada que es script setup, lo veremos más adelante.
```js
<script setup>
...
</script>
```


## Reactividad

Usaremos ref para crear [referencias reactivas](https://vuejs.org/api/reactivity-core.html) a elementos simples y reactive para crear referencias reactivas a elementos más complejos. Si usamos ref accedemos al valor en lectura y escritura bajo .value.

```js
const count = ref(0)
console.log(count.value) // 0

count.value++
console.log(count.value) //
```

## Referencias computadas

Usaremos [computed](https://vuejs.org/api/reactivity-core.html#computed) para crear referencias computadas de solo lectura. También podemos hacer de escritura.

```js
const count = ref(1)
const plusOne = computed(() => count.value + 1)

console.log(plusOne.value) // 2

// Ejemplo de computed de escritura
const count = ref(1)
const plusOne = computed({
  get: () => count.value + 1,
  set: (val) => {
    count.value = val - 1
  }
})
```

## Watcher

Tenemos de [distinto tipo](https://vuejs.org/api/reactivity-core.html#watch), permitiéndonos reaccionar mientras observamos cambios a variables de nuestro estado.

```js
const count = ref(0)
watch(count, (count, prevCount) => {
  console.log(count, prevCount)
})
```

## Hooks de ciclo de vida

Usaremos los siguientes [hooks](https://vuejs.org/api/composition-api-lifecycle.html#onmounted)

```js
<script setup>
import { ref, onMounted } from 'vue'

const el = ref()

onMounted(() => {
  el.value // <div>
})
</script>

<template>
  <div ref="el"></div>
</template>
```

## Propiedades

Usaremos las [propiedades](https://vuejs.org/guide/components/props.html), como siempre, para comunicarnos de padre a hijo.

```js
export default {
  props: ['foo'],
  setup(props) {
    // setup() receives props as the first argument.
    console.log(props.foo)
  },
}
```

## Eventos

Usaremos los [eventos](https://vuejs.org/guide/components/events.html#declaring-emitted-events) para comunicarnos de hijo a padre.

```js
export default {
  emits: ['inFocus', 'submit'],
  setup(props, ctx) {
    ctx.emit('submit')
  },
}
```

## Exposición
Setup es cerrado por defecto, si queremos hacer algo público fuera de los enlaces de la platilla usamos expose
```js
export default {
  // only `publicMethod` will be available on the public instance
  expose: ['publicMethod'],
  methods: {
    publicMethod() {
      // ...
    },
    privateMethod() {
      // ...
    }
  }
}
```


## Consideraciones
Puedes usar Composition u Option, e incluso en el mismo componente ambos. Puedes ir migrando poco a poco.

## Script Setup
Es la nueva forma [recomendada](https://vuejs.org/api/sfc-script-setup.html) de usar la Composition API y tienes varias ventajas:
- Código más sucinto con menos repetitivo
- Capacidad para declarar propiedades y eventos emitidos usando TypeScript puro
- Variables reactivas y componentes se exponen de manera automática (si no usa private)
- Mejor rendimiento en tiempo de ejecución (la plantilla se compila en una función de representación en el mismo ámbito, sin un proxy intermedio)
- Mejor rendimiento de inferencia de tipo IDE (menos trabajo para que el servidor de idioma extraiga tipos del código)
- Es importante tener Volar como extensión.
- Usar componentes dinámicos

```js
<script setup>
console.log('hello script setup')
</script>
```

### Eventos y Propiedades
Debes usar defineProps y defineEmits para definir las propiedades y eventos emitidos.

```js
<script setup>
const props = defineProps({
  foo: String
})

const emit = defineEmits(['change', 'delete'])
// setup code
</script>
```
### Exposición de variables
Setup es cerrado por defecto, puedes usar defineExpose para exponer
```js
<script setup>
import { ref } from 'vue'

const a = 1
const b = ref(2)

defineExpose({
  a,
  b
})
</script>
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
# Journal App

Aplicación resumen de lo visto

- [Journal App](#journal-app)
  - [Resumen](#resumen)
  - [Estilos](#estilos)
    - [Personalización de Estilos](#personalización-de-estilos)
    - [Organización de código](#organización-de-código)
    - [Keep Alive](#keep-alive)
    - [Alertas](#alertas)
    - [Manejo del estado](#manejo-del-estado)
    - [Refs](#refs)
  - [Test Unit](#test-unit)
    - [Router](#router)
    - [Pinia y Store](#pinia-y-store)
  - [Test E2E](#test-e2e)
    - [Asercciones](#asercciones)
    - [Algunos métodos útiles de Cypress](#algunos-métodos-útiles-de-cypress)
  - [Slots](#slots)

## Resumen

Aplicación resumen usando lo visto como es VueRouter y Pinia.

## Estilos

Puedes añadir cualquier [estilo a tu app](https://dev.to/kevin_odongo35/how-to-add-tailwind-css-bootstrap-vuetify-or-bulma-to-a-vue-project-3on2).

### Personalización de Estilos

- [Sass](https://sass-lang.com/), viene configurado para Vite.

Y ahora elegimos por ejemplo entre:
- [Bootstrap](https://getbootstrap.com/)
- [Bulma](https://bulma.io/)
- [Tailwind](https://tailwindcss.com/)

¡¡Importamos en nuestro main el estilo y personalizamos como queramos!!
- Ejemplo con [Bootstrap](https://github.com/joseluisgs/vue-curso-cero-experto/commit/125b246f79372002ed1276ddf5384cb8a03b14cf)
- Ejemplo con [Bulma](https://github.com/joseluisgs/vue-curso-cero-experto/commit/e7e106b1c69517000e0599156bb9f2dcc724167f)

En este ejemplo vamos a usar Tailwind con [DaisyUI](https://daisyui.com) que nos da una serie de componentes para Tailwind. Se ha usado estilos por defecto y el sistema de cambio de estilo propuesto [aquí](https://github.com/saadeghi/theme-change).

Como iconos usaremos [Iconofy](https://iconify.design/).

### Organización de código
- En los directorios globales tenemos las vistas, componentes, routes y stores genérales para toda la aplicación.
- En cada carpeta modules tienes la parte dedicada a esa sección. 
- No es una organización que comparta en gran medida, pero puedes organizar tu código como quieras, siempre que te deje ampliarlo y cambiarlo de manera poco traumática.

### Keep Alive
Con [Keep Alive](https://vuejs.org/guide/built-ins/keep-alive.html#basic-usage) conseguimos cachear el componente que estamos mostrando agilizando y manteniendo el estado del componente.

### Alertas
Se ha trabajado con dos alertas, una de ellas es un propio toast que se muestra en la parte superior de la pantalla.
La otra opciones usando la librería [SweetAlerts2](https://sweetalert2.github.io)

### Manejo del estado
Verás en el manejo del estado que hay algunos métodos que parecen iguales síncronos y asíncronos. Esto es para manejoar una pequeña caché local y no tener que recargar para visualizar los cambios. Si usas sistemas como Firebase, podrás entender como escuchar cambios en tiempo real y este código puede servirte.

### Refs
Podemos acceder a elementos del DOM usando [Templete Refs](https://vuejs.org/guide/essentials/template-refs.html). De esta manera podemos usar elementos del dom o llamarlos como se ha hecho con el input de la imagen.

## Test Unit

### Router
Las primeras pruebas son con router. Debemos tener en cuenta que como estamo susando Composition API, vamos a hacer uso de una librería
[Vue Router Mock](https://github.com/posva/vue-router-mock) que nos ayuda a mockear nuestro router.

Si no podemos hacer uso de los consejos de Vue [Test Utils](https://test-utils.vuejs.org/guide/advanced/vue-router.html) para Composition API.

### Pinia y Store
Mockeamos los datos y la store con [Pinia Testing](https://pinia.vuejs.org/cookbook/testing.html).

## Test E2E
Vamos a realizar test e2e con nuestro ejemplo. Para ello usaremos [Cypress](https://docs.cypress.io/guides/overview/why-cypress).

Con Cypress podemos testear componentes aislados de Vue, por lo que no necesitaremos VueUtils Tes si no queremos, o simular el comportamiento global E2E..

Puedes seguir mis guías:
- [testing-js-cypress](https://github.com/joseluisgs/testing-js-cypress)
- [vue-weather-testing](https://github.com/joseluisgs/vue-weather-testing)

### Asercciones
Puedes consultarlas [aquí](https://docs.cypress.io/guides/references/assertions.html). Pero se basan principalmente en [Chai](https://docs.cypress.io/guides/references/assertions.html#Chai) y [Sinon](https://docs.cypress.io/guides/references/assertions.html#Sinon-Chai).

### Algunos métodos útiles de Cypress
- visit: redirige a Chrome a la url que se le pasa por parámetro.
- get: obtiene un elemento por el identificador que le pasemos, para realizar acciones sobre él. Como hemos explicado en el apartado anterior, todos los identificadores que pasemos será obtenidos del CSS.
- children: nos permite obtener un elemento que pasamos por parámetro, que desciende del elemento que hemos obtenido con la función get.
- click: realiza un click sobre el elemento que hayamos obtenido con la función get.
- type: escribe sobre el elemento obtenido un texto que pasamos por parámetro. Por ejemplo, usamos esta función para elementos input donde queremos introducir un texto.
submit: permite enviar el contenido del formulario.
- contains: para indicar el contenido del elemento.
- have.attr: para indicar que el elemento tiene un atributo en concreto.
- include: para indicar que el atributo de un elemento incluye un texto.

A todas las funciones se les puede pasar un json con el elemento timeout. Este elemento nos permite incluir un tiempo que nos ayudará a esperar a que el elemento termine de cargar en la página.

## Slots
Finalmente nos quedan los [slots](https://vuejs.org/guide/components/slots.html#slots) los cuales nos permiten pasar un template o código html a un componente. De esta manera podemos tener un componente y nosotros pasar el aspecto que quiera. Puedes verlo en el ejemplo, cuando pulso el botón success en el modal diseñado.

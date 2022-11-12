# Vue.js avanzado: Testing

Testing con Cypress

[![Vue Ready](https://img.shields.io/badge/Code-Vue.js-%2342b983)](https://es.vuejs.org/)
[![LICENSE](https://img.shields.io/badge/License-CC-%23e64545)](https://joseluisgs.github.io/docs/license/)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/vue-profesores-madrid-2022-2022)

![Vue.js](../images/vue-avanzado.jpg)

- [Vue.js avanzado: Testing](#vuejs-avanzado-testing)
  - [Acerca de](#acerca-de)
  - [Testing Unitario en Vue.js](#testing-unitario-en-vuejs)
  - [Testing E2E en Vue.js](#testing-e2e-en-vuejs)
  - [CYPRESS](#cypress)
    - [Aserciones](#aserciones)
    - [Algunos métodos útiles de Cypress](#algunos-métodos-útiles-de-cypress)
    - [Buenas prácticas](#buenas-prácticas)
    - [Test unitarios sobre componentes](#test-unitarios-sobre-componentes)
      - [Llamando a los test unitarios](#llamando-a-los-test-unitarios)
    - [Test E2E de nuestra aplicación](#test-e2e-de-nuestra-aplicación)
      - [Llamando a los test E2E](#llamando-a-los-test-e2e)
  - [Ejercicios](#ejercicios)
  - [Autor](#autor)
    - [Contacto](#contacto)
    - [¿Un café?](#un-café)
  - [Licencia de uso](#licencia-de-uso)

## Acerca de
En esta unidad vamos a aprender a testear nuestra aplicación con Cypress con el objetivo de asegurar que nuestra aplicación funciona correctamente.

## Testing Unitario en Vue.js
Una de las grandes ventajas de Vue.js es que nos permite testear de forma sencilla y rápida. Para ello podemos hacer uso de [Vue Test Utils](https://test-utils.vuejs.org/). Esta suite de herramientas nos permite testear de forma sencilla nuestros componentes y aplicaciones y todo lo realacionado con ellos:
- Propiedades
- Eventos
- Renderizado de componentes
- Router
- Stores

Para usarlo podemos hacer uso de [Vitest](https://vitest.dev/) o [Jest](https://jestjs.io/). 

## Testing E2E en Vue.js
El testing E2E es una de las partes más importantes de cualquier aplicación. Con ello nos centramos en testear la aplicación desde el punto de vista del usuario. Para ello, en Vue.js podemos hacer uso de [Cypress](https://www.cypress.io/) para testear nuestra aplicación o componentes de forma sencilla y rápida.

## CYPRESS
[Cypress](https://www.cypress.io/) es una suite de test E2E en base a [historias de usuario](https://www.atlassian.com/es/agile/project-management/user-stories).

![img](https://panoramic.vc/wp-content/uploads/2021/02/Cypress_Logotype_Color_Light_BG-1-002.png)

### Aserciones
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

### Buenas prácticas
Es importante que tengamos [buenas prácticas](https://docs.cypress.io/guides/references/best-practices.html) para testear sin problemas. Entre ellas el manejo de selectores óptimos para nuestros elementos de la web, como pueden ser selectores de web del tipo con selectores del tipo id como son: data-testid (mi preferido para usarlo también con JEST) o data-cy.

### Test unitarios sobre componentes
Escribimos nuestro test, montando nuestro componente con Cypress en el directorio __tests__ de nuestro componente. Todos los test deben estar al menos dentro de un describe. Dentro de este describe podemos tener varios it, que serán los test que queramos realizar. Dentro de cada it podemos comprobar que el componente se renderiza correctamente, que los eventos se lanzan correctamente, que los props se pasan correctamente, etc.

```js
import Contador from '../Contador.vue'
describe('Contador component tests', () => {
it('debería abrir renderizar con la propiedad correctamente', () => {
    const valorInicial = 10
    cy.mount(Contador, {
      props: {
        valorInicial: valorInicial,
      },
    })
    // textoContador es visible
    cy.get(textoContador).should('be.visible')
    // Su valor es 10
    cy.get(textoContador).should('have.text', 'Valor: 10')
    // textoDoble es visible
    cy.get(textoDoble).should('be.visible')
    // Su valor es 20
    cy.get(textoDoble).should('have.text', 'Doble: 20')
  })
})
```
#### Llamando a los test unitarios
Para llamar a los test unitarios, podemos hacerlo de dos formas:
- npm run test:unit, para ver los resultados en la terminal.
- npm run test:unit:dev, para ejecutarlos en el entorno de Cypress.

### Test E2E de nuestra aplicación
Escribimos el test en el directorio cypress/e2e. De la misma manera, es recomendable que estén dentro de un describe. Dentro de este describe podemos tener varios it, que serán los test que queramos realizar. Dentro de cada it podemos comprobar que la aplicación se renderiza correctamente, que los eventos se lanzan correctamente, que los props se pasan correctamente, etc.

```js
describe('Home Tests', () => {
  it('debería visitar la página principal', () => {
    cy.visit('/')
    cy.contains('h1', 'Home')
  })
  it('debería renderizar el input', () => {
    cy.visit('/')
    cy.contains('h1', 'Home')
    // El input es visible
    cy.get(inputNombre).should('be.visible')
    // el texto nombre no debe estar visible
    cy.get(textoNombre).should('not.be.visible')
    // Tecleamos pepe en el input
    cy.get(inputNombre).type('pepe')
    // El texto nombre debe estar visible
    cy.get(textoNombre).should('be.visible')
    // El texto nombre debe tener el valor pepe
    cy.get(textoNombre).should('have.text', 'pepe')
  })
})
```
#### Llamando a los test E2E
Para llamar a los test E2E, podemos hacerlo de dos formas:
- npm run test:e2e, para ver los resultados en la terminal.
- npm run test:e2e:dev, para ejecutarlos en el entorno de Cypress.




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
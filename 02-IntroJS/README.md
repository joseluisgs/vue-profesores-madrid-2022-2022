# Introducción a JavaScript moderno

En esta sección vamos a ver algunos elementos de JavaScript moderno que nos van a permitir trabajar con Vue.js o Node.js más facilmente.


[![Vue Ready](https://img.shields.io/badge/Code-Vue.js-%2342b983)](https://es.vuejs.org/)
[![LICENSE](https://img.shields.io/badge/License-CC-%23e64545)](https://joseluisgs.github.io/docs/license/)
![GitHub](https://img.shields.io/github/last-commit/joseluisgs/vue-profesores-madrid-2022-2022)

![Vue.js](../images/javascript.png)

- [Introducción a JavaScript moderno](#introducción-a-javascript-moderno)
  - [Acerca de](#acerca-de)
  - [Referencias](#referencias)
  - [Desarrollo con Node.js con NPM](#desarrollo-con-nodejs-con-npm)
    - [Crear un proyecto](#crear-un-proyecto)
    - [Instalar paquetes](#instalar-paquetes)
    - [package.json](#packagejson)
    - [Linter, estilos y formateo](#linter-estilos-y-formateo)
    - [Nodemon](#nodemon)
  - [Introducción](#introducción)
    - [Tipos de datos](#tipos-de-datos)
    - [Variables y constantes](#variables-y-constantes)
    - [Template literals](#template-literals)
    - [Operadores ternarios y operadores condicionales](#operadores-ternarios-y-operadores-condicionales)
    - [Igualdad o Identidad](#igualdad-o-identidad)
    - [Salida de datos](#salida-de-datos)
  - [Programación estructurada](#programación-estructurada)
  - [Arrays](#arrays)
  - [Programación Funcional](#programación-funcional)
    - [Funciones](#funciones)
    - [Parametros por defecto](#parametros-por-defecto)
    - [Parámetros variables rest](#parámetros-variables-rest)
    - [Parámetros variables spread](#parámetros-variables-spread)
    - [API Funcional para el manejo de colecciones](#api-funcional-para-el-manejo-de-colecciones)
  - [Objetos](#objetos)
    - [Objetos literales](#objetos-literales)
    - [Objetos con constructor](#objetos-con-constructor)
    - [Objetos con clases](#objetos-con-clases)
    - [Métodos](#métodos)
    - [Herencia](#herencia)
    - [Getters y Setters](#getters-y-setters)
    - [Null checking](#null-checking)
    - [API Funcional para el manejo de objetos](#api-funcional-para-el-manejo-de-objetos)
  - [Desestructuración](#desestructuración)
    - [Desestructurar arrays](#desestructurar-arrays)
    - [Desestructurar objetos](#desestructurar-objetos)
  - [Importaciones y exportaciones](#importaciones-y-exportaciones)
  - [Asincronía](#asincronía)
    - [Promesas](#promesas)
    - [Async / Await](#async--await)
    - [Ejemplo de asincronia](#ejemplo-de-asincronia)
  - [API REST](#api-rest)
    - [Api Fetch](#api-fetch)
    - [Axios](#axios)
  - [Autor](#autor)
    - [Contacto](#contacto)
    - [¿Un café?](#un-café)
  - [Licencia de uso](#licencia-de-uso)

## Acerca de
Elementos de JavaScript moderno que nos van a permitir trabajar con Vue.js o Node.js más facilmente.


## Referencias 
- [MSDN Web Docs - JavaScript (ES6)](https://developer.mozilla.org/es/docs/Web/JavaScript)

## Desarrollo con Node.js con NPM
### Crear un proyecto
Para crear un proyecto Node.js con NPM vamos a usar el comando `npm init` que nos va a crear un fichero `package.json` con la información del proyecto. 

```bash
npm init
```
### Instalar paquetes
Para instalar paquetes vamos a usar el comando `npm install` que nos va a instalar el paquete en el directorio `node_modules` y nos va a añadir la dependencia en el fichero `package.json`. 
- Dependencias de desarrollo: `npm install --save-dev`

```bash
npm install <paquete>
```
### package.json
El fichero `package.json` es el fichero de configuración de nuestro proyecto. En él vamos a encontrar información sobre el proyecto, las dependencias, los scripts, etc. 

```json
{
  "name": "02-introjs",
  "version": "1.0.0",
  "description": "Elementos de JavaScript moderno que nos van a permitir trabajar con Vue.js o Node.js más facilmente.",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "nodemon": "nodemon src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [
    "javascript",
    "nodejs",
    "vuejs"
  ],
  "author": "José Luis González",
  "license": "CC"
}
```

### Linter, estilos y formateo
Para el linter vamos a usar [ESLint](https://eslint.org/). Para instalarlo vamos a usar el comando `npm install --save-dev eslint`.

Para el estilo vamos a usar [standardjs](https://standardjs.com/). Para instalarlo vamos a usar el comando `npm install --save-dev standard`.

Para el formateo vamos a usar [Prettier](https://prettier.io/). Para instalarlo vamos a usar el comando `npm install --save-dev prettier`.

Mi recomendacion es hacerlo con:
- https://www.npmjs.com/package/eslint-config-standard
- https://www.npmjs.com/package/prettier-config-standard
- https://www.npmjs.com/package/eslint-config-prettier

Configuraremos sus respectivos ficheros de configuración para que se apliquen en nuestro proyecto.

### Nodemon
Nos va a permitir reiniciar el servidor cada vez que hagamos un cambio en el código. Para instalarlo vamos a usar el comando `npm install --save-dev nodemon`. Solo para proyectos de Node.js

## Introducción
### Tipos de datos
Los tipos de datos en JavaScript son dinámicos, es decir, no es necesario declarar el tipo de dato que vamos a utilizar, ya que el propio lenguaje lo infiere. 

```js
let nombre = "Pepe"; // String
let edad = 34; // Number
let isAlumno = true; // Boolean
let aDatos = [1, 2, 3]; // Array
let oDatos = {nombre: "Pepe", edad: 34}; // Object
// null
// undefined
// Funcion
var suma = function(a, b) {
    return a + b;
}
```

### Variables y constantes
En JavaScript tenemos dos tipos de variables, las variables y las constantes. Las variables son aquellas que pueden cambiar de valor, mientras que las constantes no pueden cambiar de valor. 
- const: las variables constantes no pueden ser modificadas (no tienen set)
- let: pueden ser modificadas (tienen set)
- var: no tienen scope (¡No usar nunca!)

```js
const nombre = 'Pepe'
const apellido = 'Perez'
let edad = 45
// nombre = 'Peter' // error porque nombre es una constante
edad = 46 // ok porque edad es una variable
```
### Template literals
Template literals son una forma de escribir strings con interpolación de variables. Dentro de la interpolación se pueden utilizar llaves para llamar a funciones.

```js
const nombre = "Juan";
const apellido = "Perez";
const nombreCompleto = `${nombre} ${apellido}`;
console.log(nombreCompleto)
console.log(`Resultado: ${1 + 1}`)
```
### Operadores ternarios y operadores condicionales
Ternarios son una forma de escribir condicionales en una sola línea.

```js
const edad = 18
const edadMinima = 18
const esMayorDeEdad = edad >= edadMinima ? 'Es mayor de edad' : 'Es menor de edad'
console.log(esMayorDeEdad)
```

### Igualdad o Identidad
En JavaScript tenemos dos tipos de igualdad, la igualdad estricta y la igualdad débil. La igualdad estricta compara el valor y el tipo de dato, mientras que la igualdad débil solo compara el valor. 

```js
console.log(1 == '1') // true
console.log(1 === '1') // false
```

### Salida de datos
Para mostrar datos por consola podemos usar `console.log()` o similares.

```js
console.log('Hola mundo')
console.info('Hola mundo')
console.warn('Hola mundo')
console.error('Hola mundo')
console.table([{nombre: 'Pepe', edad: 34}, {nombre: 'Juan', edad: 23}])
```

## Programación estructurada
JavaScript es un lenguaje de programación estructurada, es decir, que permite la ejecución secuencial de instrucciones, la selección condicional y la repetición.

```js
// Secuencial
let a = 1
let b = 2
let c = a + b
console.log(c)

// Condicional
if (a > b) {
    console.log('a es mayor que b')
} else {
    console.log('b es mayor que a')
}

// switch
let i = 2
switch (i) {
    case 0:
        console.log('i es 0')
        break;
    case 1:
        console.log('i es 1')
        break;
    default:
        console.log('i es mayor que 1')
        break;
}

// Bucle for
for (let i = 0; i < 10; i++) {
    console.log(i)
}

// Bucle while
let i = 0
while (i < 10) {
    console.log(i)
    i++
}

// Bucle do while
let i = 0
do {
    console.log(i)
    i++
} while (i < 10)
```

## Arrays
Los arrays son una forma de definir una lista de elementos cuyo acceso queda referenciado por un índice.

```js
const numeros = [1, 2, 3, 4, 5] // o new Array(1, 2, 3, 4, 5)
numeros.push(6)
console.log(numeros)
console.log(numeros[0])
// eliminamos
numeros.pop()
console.log(numeros)
// añadimos en una posicion concreta
numeros.splice(2, 0, 3.5)
console.log(numeros)
// eliminamos en una posicion concreta
numeros.splice(2, 1)

// Operaciones con colecciones
// for
for (let i = 0; i < numeros.length; i++) {
  console.log(numeros[i])
}
// for in
for (const key in numeros) {
  console.log(numeros[key])
}
```

## Programación Funcional  
La programación funcional es un paradigma de programación que nos permite trabajar con funciones de primera clase, es decir, que podemos pasar funciones como parámetros de otras funciones, devolver funciones como resultado de otras funciones, etc.

### Funciones
Las funciones nos permiten definir fragmentos de código que podemos reutilizar.

En JS las funciones son ciudadanos de primera clase, es decir, **son un tipo**.

Las funciones flecha (arrow functions) Una expresión de función flecha es una alternativa compacta a una expresión de función tradicional. No vinculan su this con el del contexto en el que se invocan, , el objeto al que hace referencia el this en una función flecha siempre va a ser el mismo independientemente del lugar desde el que se invoque.

```js
// Funciones
function saludar(nombre) {
  return `Hola ${nombre}`
}
console.log(saludar('Pepe'))

// funciones flecha (=>)
const saludar2 = (nombre) => `Hola ${nombre}`
console.log(saludar2('Pepe'))
```

### Parametros por defecto
En JavaScript podemos definir valores por defecto para los parámetros de las funciones.

```js
function saludar(nombre = 'Pepe') {
  return `Hola ${nombre}`
}

console.log(saludar()) // Hola Pepe
console.log(saludar('Juan')) // Hola Juan
```

### Parámetros variables rest
En JavaScript podemos definir parámetros rest (número variable) para las funciones. Los parámetros rest nos permiten pasar un conjunto de parámetros y recuperarlos como una lista.

```js
function sumar(...numeros) {
  let resultado = 0
  for (let i = 0; i < numeros.length; i++) {
    resultado += numeros[i]
  }
  return resultado
}

console.log(sumar(1, 2, 3, 4, 5)) // 15
```

### Parámetros variables spread
En JavaScript podemos definir parámetros spread (número variable) para las funciones. Los parámetros spread nos permiten pasar una lista de parámetros a la función y recuperarlos en variables separadas.

```js
function sumar(a, b, c, d, e) {
  return a + b + c + d + e
}

const numeros = [1, 2, 3, 4, 5]
console.log(sumar(...numeros)) // 15
```

### API Funcional para el manejo de colecciones
Las funciones de orden superior nos permiten trabajar con colecciones de datos de forma más sencilla.

```js
// foreach - recorre el array y ejecuta una función por cada elemento
numeros.forEach(numero => console.log(numero))
// find - busca el primer elemento que cumpla la condicion
const numero = numeros.find(numero => numero === 3)
console.log(numero)
// Copiar un array
const numeros2 = [...numeros]
// map - transforma el array
const numeros3 = numeros.map(numero => numero * 2)
// filter - filtra el array
const numeros4 = numeros.filter(numero => numero > 2)
// reduce - reduce el array a un valor
const numeros5 = numeros.reduce((acumulador, numero) => acumulador + numero, 0)
// some - busca algun elemento que cumpla la condicion
const numeros6 = numeros.some(numero => numero > 2)
// every - busca que todos los elementos cumplan la condicion
const numeros7 = numeros.every(numero => numero > 2)
// findIndex - busca el indice del primer elemento que cumpla la condicion
const numeros8 = numeros.findIndex(numero => numero > 2)
```

## Objetos
Los objetos son una forma de definir una colección de propiedades y métodos.

### Objetos literales
Los objetos literales son una forma de definir un objeto en base a una expresión.
Los objetos se pasan por referencia y para clonarlos

```js
const persona = {
  nombre: 'Pepe',
  apellido: 'Perez',
  edad: 45,
  direccion: {
    ciudad: 'Madrid',
    pais: 'España'
  }
}
console.log(persona)
console.log(persona.direccion.ciudad)

// Clonando con spread, para copiar un objeto, ¡pero no clona en profundidad!
// Intenta cambiar las cosas y verás que no funciona
let persona2 = { ...persona }
persona2.nombre = 'Ana'
console.log(persona2)
console.log(persona)

// Clonando objetos con profundidad
persona2 = structuredClone(persona)
persona2.nombre = 'Alberto'
console.log(persona2)
console.log(persona)
```

### Objetos con constructor
Los objetos con constructor son una forma de definir un objeto en base a una función constructora.

```js
function Persona(nombre, apellido, edad) {
  this.nombre = nombre
  this.apellido = apellido
  this.edad = edad
}
const persona = new Persona('Pepe', 'Perez', 45)
console.log(persona)
```

### Objetos con clases
Las clases son una forma de definir un objeto en base a una clase.

```js
class Persona {
  constructor(nombre, apellido, edad) {
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
  }
}

const persona = new Persona('Pepe', 'Perez', 45)
console.log(persona)
```

### Métodos
Los métodos son funciones que se definen dentro de un objeto.

```js
const persona = {
  nombre: 'Pepe',
  apellido: 'Perez',
  edad: 45,
  saludar: function () {
    console.log(`Hola soy ${this.nombre}`)
  }
}
persona.saludar()
```

### Herencia
La herencia es una forma de reutilizar código.

```js
class Persona {
  constructor(nombre, apellido, edad) {
    this.nombre = nombre
    this.apellido = apellido
    this.edad = edad
  }
  saludar() {
    console.log(`Hola soy ${this.nombre}`)
  }
}

class Alumno extends Persona {
  constructor(nombre, apellido, edad, curso) {
    super(nombre, apellido, edad)
    this.curso = curso
  }
  saludar() {
    super.saludar()
    console.log(`Estudio ${this.curso}`)
  }
}

const alumno = new Alumno('Pepe', 'Perez', 45, 'Angular')
alumno.saludar()
```

### Getters y Setters
Los getters y setters son funciones que se definen dentro de un objeto para obtener y establecer valores.

```js
const persona = {
  nombre: 'Pepe',
  apellido: 'Perez',
  edad: 45,
  get nombreCompleto() {
    return `${this.nombre} ${this.apellido}`
  },
  set nombreCompleto(nombreCompleto) {
    const partes = nombreCompleto.split(' ')
    this.nombre = partes[0]
    this.apellido = partes[1]
  }
}

console.log(persona.nombreCompleto)
persona.nombreCompleto = 'Juan Lopez'
console.log(persona.nombre)
console.log(persona.apellido)
```
### Null checking 
Null checking es una forma de verificar si una variable es nula y es muy util para los campos de objetos.

```js
const persona = {
  nombre: 'Pepe',
  apellido: 'Perez',
}
console.log(persona.power ? persona.power : "No tiene")

```

### API Funcional para el manejo de objetos
Las funciones de orden superior nos permiten trabajar con objetos de forma más sencilla.

```js
const persona = {
  nombre: 'Pepe',
  apellido: 'Perez',
  edad: 45,
  direccion: {
    ciudad: 'Madrid',
    pais: 'España'
  }
}

// Object.keys - devuelve las claves de un objeto
console.log(Object.keys(persona))
// Object.values - devuelve los valores de un objeto
console.log(Object.values(persona))
// Object.entries - devuelve las claves y valores de un objeto
console.log(Object.entries(persona))
// Object.assign - asigna propiedades de un objeto a otro
const persona2 = Object.assign({}, persona)
persona2.nombre = 'Ana'
console.log(persona2)
console.log(persona)
// Object.freeze - congela un objeto
const persona3 = Object.freeze(persona)
persona3.nombre = 'Alberto'
console.log(persona3)
console.log(persona)
```

## Desestructuración
La desestructuración es una forma de extraer valores de un objeto o array.

### Desestructurar arrays
Desestructurar arrays es una forma de extraer valores de un array.

```js
const numeros = [1, 2, 3, 4, 5]
const [numero1, numero2, ...resto] = numeros
console.log(numero1)
console.log(numero2)
console.log(resto)
```

### Desestructurar objetos 
Desestructurar objetos es una forma de extraer valores de un objeto.

```js
const persona = {
  nombre: 'Pepe',
  apellido: 'Perez',
  edad: 45,
  direccion: {
    ciudad: 'Madrid',
    pais: 'España'
  }
}
const { nombre, apellido, edad, telefono= 'No tiene' } = persona
console.log(nombre) 
console.log(apellido)
``` 

## Importaciones y exportaciones
Importaciones y exportaciones son una forma de importar y exportar funciones, clases, variables, etc.
Podemos exportar varias funciones o clases en un solo archivo con export y usar import para importar lo que queremos.
Podemos tener una exportación por defecto con export default.

```js
// Exportar
const nombre = 'Pepe'
const apellido = 'Perez'
const lista = [1, 2, 3, 4, 5]
export { nombre, apellido }
export default lista

// Importaciones
import { nombre, apellido } from './persona.js'
import lista from './persona.js'
console.log(nombre)
console.log(apellido)
console.log(lista)
```
## Asincronía 
La asincronía es una forma de ejecutar código de forma asíncrona. 

### Promesas
Las promesas son una forma de definir una tarea que se va a realizar en el futuro (y nos sirven para gestionar código asíncrono).

```js
const promesa = new Promise((resolve, reject) => {
  // Tarea asíncrona
  if (true) {
    resolve('Tarea finalizada')
  } else {
    reject('Tarea fallida')
  }
})
promesa.then(resultado => console.log(resultado))
promesa.catch(error => console.log(error))
```

### Async / Await
Async / Await es una forma de escribir código asíncrono en una función. Es azúcar sintáctico para manejar promesas.

```js
async function obtenerPersonajes() {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character/')
    console.log('Mis datos de retorno')
    console.log(response.data)
  } catch (error) {
    console.log(error)
  }
}
obtenerPersonajes()
```

### Ejemplo de asincronia

```js
const miPromesa = () => {
    return new Promise(( resolve, reject )=> {
        setTimeout(() => {
            // resolve('Tenemos un valor en la promesa')
            reject('REJECT en miPromesa')
        }, 1000);
    })
}

const medirTiempoAsync = async() => {

    try {
        console.log('Inicio')

        const respuesta = await miPromesa()
        console.log(respuesta)

        console.log('Fin')

        return 'fin de medir tiempo async'

    } catch (error) {
        // return 'catch en medirTiempoAsync'
        throw 'Error en medirTiempoAsync'
    }
    
}


medirTiempoAsync()
    .then( valor => console.log( 'THEN Exitoso:', valor  ) )
    .catch( err => console.log( 'Error:', err ))

```

## API REST
API REST es una forma de comunicar dos aplicaciones a través de HTTP.

### Api Fetch
Api fetch es una librería que nos permite hacer peticiones a una api web.

```js
fetch('https://rickandmortyapi.com/api/character/')
    // https://developer.mozilla.org/es/docs/Web/API/Response
    .then((response) => response.json()) // Obtenemos la respuesta, pero esto es una promesa en sí, por eso hay otro then
    .then((data) => console.log(data)) // finalmente obtenemos los datos de la promesa anterior
    .catch((error) => console.log(error))

```
### Axios
[Axios](https://axios-http.com/) es una librería que nos permite hacer peticiones a una api web.
Se debe instalar el paquete axios en el proyecto.

```js
import axios from 'axios'
axios.get('https://rickandmortyapi.com/api/character/')
    .then((response) => console.log(response.data))
    .catch((error) => console.log(error))
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
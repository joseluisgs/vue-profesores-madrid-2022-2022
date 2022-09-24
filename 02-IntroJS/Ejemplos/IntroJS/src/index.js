// Nuestro ejemplo

// Vamos a importar la funcion getPersonas de data.js -- Mas adelante
// O nos podemos traer lo que necesitemos
import getPersonas, { getPersonasByCiudad, getPersonasCiudadAsync } from './data.js'
import { axiosPokemon } from './pokemons.js'

console.log('Hola JavaScript')

// Creo un array de objetos de personas con nombre y edad y ciudad y lo muestro por consola
const personas = [
  { nombre: 'Pepe', edad: 23, ciudad: 'Madrid' },
  { nombre: 'Juan', edad: 34, ciudad: 'Barcelona' },
  { nombre: 'Rosa', edad: 18, ciudad: 'Valencia' },
  { nombre: 'Luis', edad: 27, ciudad: 'Madrid' },
  { nombre: 'Ana', edad: 31, ciudad: 'Barcelona' },
  { nombre: 'Elena', edad: 25, ciudad: 'Madrid' },
]

console.log(personas)
console.log(personas.length)
console.table(personas)

// Nos quedamos con los de Madrid
const madrid = personas.filter((persona) => persona.ciudad === 'Madrid')
console.log(madrid)
console.log(madrid.length)
console.table(madrid)

// Obtenemos las personas importadas
const personasImportadas = getPersonas()
console.table(personasImportadas)

const barcelona = getPersonasByCiudad('Barcelona')
console.table(barcelona)

// Vamos a probar la promesa usando then
getPersonasCiudadAsync('Madrid')
  .then((personas) => {
    console.table(personas)
  })
  .catch((error) => {
    console.log(error)
  })

getPersonasCiudadAsync('Cazorla')
  .then((personas) => {
    console.table(personas)
  })
  .catch((error) => {
    console.log(error)
  })

// Ahora vamos a probar la promesa con async await
try {
  const personas = await getPersonasCiudadAsync('Madrid')
  console.table(personas)
} catch (error) {
  console.log(error)
}

try {
  const personas = await getPersonasCiudadAsync('Cazorla')
  console.table(personas)
} catch (error) {
  console.log(error)
}

// Vamos a probar la funcion fetchPokemon
// const pokemonFetch = fetchPokemon() // Solo si es app de navegador
// console.log(pokemonFetch)

// Vamos a probar la funcion axiosPokemon
const pokemonAxios = await axiosPokemon(25)
console.log(pokemonAxios)
console.table(pokemonAxios)

// Desestructuramos los 3 primeros elementos del array
const [primero, segundo, tercero] = pokemonAxios
console.log(primero)
console.log(segundo)
console.log(tercero)

// Buscamos todos los que empiezan por 'p' y cuya longitud sea mayor que 6 y nos quedamos con su nombre
const pokemonP = pokemonAxios
  .filter((pokemon) => pokemon.name.startsWith('p') && pokemon.name.length > 6)
  .map((pokemon) => pokemon.name)
console.table(pokemonP)


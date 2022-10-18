// Para traernos los pokemons de la API de pokemon
// function fetchPokemon() {
//   fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
//     .then((response) => response.json())
//     .then((allpokemon) => allpokemon.results)
// }

// con async await
// async function fetchPokemon() {
//   try {
//     const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
//     const allpokemon = await response.json()
//     return allpokemon.results
//   } catch (error) {
//     console.log(error)
//   }
// }

// No va a funcionar porque fecth es solo para navegar, usamos axios
import axios from 'axios'

const axiosPokemon = async (limit) => {
  try {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}`)
    return response.data.results
  } catch (error) {
    console.log(error)
  }
}

// Lo exportamos para poder usarlo en otros ficheros
export { axiosPokemon }

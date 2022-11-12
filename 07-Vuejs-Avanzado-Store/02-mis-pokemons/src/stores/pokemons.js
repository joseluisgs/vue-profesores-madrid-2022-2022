import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const usePokemonStore = defineStore('PokemonStore', () => {
  // Estado reactivo
  const pokemons = ref([])
  const pokemonsFavorites = ref([])

  const myPokemons = computed(() => {
    return pokemons.value
  })

  const myPokemonsFavorites = computed(() => {
    return pokemonsFavorites.value
  })

  // Metodos de acción
  function loadFromStorage() {
    const storage = localStorage.getItem('pokemonsFavorites')
    if (storage) {
      pokemonsFavorites.value = JSON.parse(storage)
    }
    console.table(pokemonsFavorites.value)
  }

  const saveToStorage = () => {
    localStorage.setItem('pokemonsFavorites', JSON.stringify(pokemonsFavorites.value))
  }

  const addPokemonFavorites = (pokemon) => {
    // solo si no esta en favoritos
    if (!pokemonsFavorites.value.find((p) => p.name === pokemon.name)) {
      pokemonsFavorites.value.push(pokemon)
      saveToStorage()
    }
  }

  const removePokemonFavorites = (pokemon) => {
    pokemonsFavorites.value = pokemonsFavorites.value.filter((p) => p.name !== pokemon.name)
    saveToStorage()
  }

  const existsPokemonFavorites = (pokemon) => {
    return pokemonsFavorites.value.find((p) => p.name === pokemon.name)
  }

  const removePokemon = (pokemon) => {
    pokemons.value = pokemons.value.filter((p) => p !== pokemon)
  }

  const loadPokemons = async (max = 25) => {
    try {
      // Hacer una petición a la API con Axios
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${max}`)
      // Guardar los datos en mi modelo de datos
      pokemons.value = response.data.results
      // Cargamos los favoritos del localStorage
      loadFromStorage()
    } catch (error) {
      console.log(error)
    }
  }

  const deletePokemon = (pokemonSelected) => {
    pokemons.value = pokemons.value.filter((pokemon) => pokemon.name !== pokemonSelected.name)
  }

  // Y aquí tenemos las cosas publicas
  return {
    addPokemonFavorites,
    removePokemonFavorites,
    existsPokemonFavorites,
    loadPokemons,
    deletePokemon,
    myPokemons,
    myPokemonsFavorites,
    removePokemon,
  }
})

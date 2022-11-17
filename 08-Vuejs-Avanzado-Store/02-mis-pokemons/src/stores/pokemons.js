import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import axios from 'axios'

export const usePokemonStore = defineStore('PokemonStore', () => {
  // Estado reactivo
  const pokemons = ref([])
  const pokemonsFavorites = ref([])

  // Mis getters, para leer sin modificar
  const myPokemons = computed(() => {
    return pokemons.value
  })

  const myPokemonsFavorites = computed(() => {
    return pokemonsFavorites.value
  })

  // Para pasarle parámetros a un computer, se usa computed(() => (param) =>{...})
  const pokemonsFiltered = computed(() => (pokemon) => {
    return pokemons.value.filter((p) => p.name.includes(pokemon))
  })

  // Metodos de acción, modifican el estado
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
    }
  }

  const removePokemonFavorites = (pokemon) => {
    pokemonsFavorites.value = pokemonsFavorites.value.filter((p) => p.name !== pokemon.name)
  }

  const existsPokemonFavorites = (pokemon) => {
    return pokemonsFavorites.value.find((p) => p.name === pokemon.name)
  }

  const removePokemon = (pokemon) => {
    pokemons.value = pokemons.value.filter((p) => p !== pokemon)
    // Lo borro de favoritos
    removePokemonFavorites(pokemon)
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

  watch(pokemonsFavorites, () => {
    saveToStorage()
  })

  // Y aquí tenemos las cosas publicas
  return {
    addPokemonFavorites,
    removePokemonFavorites,
    existsPokemonFavorites,
    loadPokemons,
    myPokemons,
    myPokemonsFavorites,
    removePokemon,
    pokemonsFiltered,
  }
})

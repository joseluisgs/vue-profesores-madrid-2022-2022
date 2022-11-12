<template>
  <td>{{ isFavorite }}</td>
  <td>
    <RouterLink :to="{ name: 'PokemonDetails', params: { id: pokemonId } }">{{
      pokemon.name
    }}</RouterLink>
  </td>
  <td>
    <button @click="removePokemon(pokemon)">🗑️</button>
    <button @click="investigarPokemon()">🔎</button>
    <button @click="addFavoritesPokemon(pokemon)">⭐</button>
  </td>
</template>

<script setup>
  import { computed } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'
  import { usePokemonStore } from '@/stores/pokemons'

  // Mis props, no hace falta almacenarlas porque no accedemos a ellas
  const props = defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })

  const router = useRouter()
  const pokemonStore = usePokemonStore()

  // Mis eventos
  const emit = defineEmits(['remove-pokemon', 'info-pokemon'])

  // Eliminar un pokemon, o usando function si no quiero arrow function
  // const removePokemon = (pokemon) => {
  function removePokemon(pokemon) {
    emit('remove-pokemon', pokemon)
  }

  const investigarPokemon = () => {
    router.push({
      name: 'PokemonDetails',
      params: { id: pokemonId.value },
      query: { pokemonId: pokemonId.value },
    })
  }

  const addFavoritesPokemon = (pokemon) => {
    // Si no está en favoritos, lo añado
    console.log(pokemon)
    if (!pokemonStore.existsPokemonFavorites(pokemon)) {
      pokemonStore.addPokemonFavorites(pokemon)
    } else {
      pokemonStore.removePokemonFavorites(pokemon)
    }
  }

  // Obtener id del pokemon computed
  const pokemonId = computed(() => {
    return props.pokemon.url.split('/')[6]
  })

  const isFavorite = computed(() => {
    if (pokemonStore.existsPokemonFavorites(props.pokemon)) return '⭐'
    else return ''
  })
</script>

<style scoped>
  td {
    cursor: pointer;
  }
  button {
    cursor: pointer;
    margin-left: 2px;
    margin-right: 2px;
  }
</style>

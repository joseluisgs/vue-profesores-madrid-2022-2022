<template>
  <td>
    <RouterLink :to="{ name: 'PokemonDetails', params: { id: pokemonId } }">{{
      pokemon.name
    }}</RouterLink>
  </td>
  <td>
    <button @click="removePokemon(pokemon)">-</button>
    <button @click="investigarPokemon(pokemon)">+</button>
  </td>
</template>

<script setup>
  import { computed } from 'vue'
  import { RouterLink, useRouter } from 'vue-router'

  // Mis props, no hace falta almacenarlas porque no accedemos a ellas
  const props = defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })

  const router = useRouter()

  // Mis eventos
  const emit = defineEmits(['remove-pokemon', 'info-pokemon'])

  // Eliminar un pokemon, o usando function si no quiero arrow function
  // const removePokemon = (pokemon) => {
  function removePokemon(pokemon) {
    emit('remove-pokemon', pokemon)
  }

  const investigarPokemon = (pokemon) => {
    const myId = pokemon.url.split('/')[6]
    router.push({ name: 'PokemonDetails', params: { id: myId }, query: { pokemonId: myId } })
  }

  // Obtener id del pokemon computed
  const pokemonId = computed(() => {
    return props.pokemon.url.split('/')[6]
  })
</script>

<style scoped>
  td {
    cursor: pointer;
  }
</style>

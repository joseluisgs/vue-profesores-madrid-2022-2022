<template>
  <td>
    <RouterLink :to="{ name: 'PokemonDetails', params: { id: pokemonId } }">{{
      pokemon.name
    }}</RouterLink>
  </td>
  <td>
    <button @click="removePokemon(pokemon)">-</button>
  </td>
</template>

<script setup>
  import { computed } from 'vue'
  import { RouterLink } from 'vue-router'

  // Mis props, no hace falta almacenarlas porque no accedemos a ellas
  const props = defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })
  // Mis eventos
  const emit = defineEmits(['remove-pokemon', 'info-pokemon'])

  // Eliminar un pokemon, o usando function si no quiero arrow function
  // const removePokemon = (pokemon) => {
  function removePokemon(pokemon) {
    emit('remove-pokemon', pokemon)
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

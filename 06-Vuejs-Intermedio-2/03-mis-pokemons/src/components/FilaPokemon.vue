<template>
  <td @click="infoPokemon(pokemon.url)">{{ pokemon.name }}</td>
  <td>
    <button @click="removePokemon(pokemon)">-</button>
  </td>
</template>

<script setup>
  import axios from 'axios'

  // Mis props, no hace falta almacenarlas porque no accedemos a ellas
  defineProps({
    pokemon: {
      type: Object,
      required: true,
    },
  })
  // Mis eventos
  const emit = defineEmits(['remove-pokemon', 'info-pokemon'])

  // Mis métodos
  // Mostrar información de un pokemon, con arrow function si quiero
  // async function infoPokemon(url) {
  const infoPokemon = async (url) => {
    try {
      // Hacer una petición a la API con Axios
      const response = await axios.get(url)
      // console.log(response.data)
      emit('info-pokemon', response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // Eliminar un pokemon, o usando function si no quiero arrow function
  // const removePokemon = (pokemon) => {
  function removePokemon(pokemon) {
    emit('remove-pokemon', pokemon)
  }
</script>

<style scoped>
  td {
    cursor: pointer;
  }
</style>

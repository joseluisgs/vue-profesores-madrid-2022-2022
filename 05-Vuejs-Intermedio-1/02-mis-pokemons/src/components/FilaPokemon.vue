<template>
  <td @click="infoPokemon(pokemon.url)">{{ pokemon.name }}</td>
  <td>
    <button @click="removePokemon(pokemon)">-</button>
  </td>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'FilaPokemon',
    // Mis props
    props: {
      pokemon: {
        type: Object,
        required: true,
      },
    },
    // Mis eventos
    emits: ['remove-pokemon', 'info-pokemon'],
    // Mis métodos
    methods: {
      // Mostrar información de un pokemon
      async infoPokemon(url) {
        try {
          // Hacer una petición a la API con Axios
          const response = await axios.get(url)
          // console.log(response.data)
          this.$emit('info-pokemon', response.data)
        } catch (error) {
          console.log(error)
        }
      },
      // Eliminar un pokemon
      removePokemon(pokemon) {
        this.$emit('remove-pokemon', pokemon)
      },
    },
  }
</script>

<style scoped>
  td {
    cursor: pointer;
  }
</style>

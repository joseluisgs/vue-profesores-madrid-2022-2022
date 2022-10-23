<template>
  <p>
    Filtrar:
    <input
      type="text"
      v-model="search"
      placeholder="Buscar pokemon..."
      @keyup="searchPokemon"
    />
    &nbsp;
  </p>
</template>

<script>
  export default {
    name: 'BuscadorPokemons',

    // Lo que emito
    emits: ['input-change'],
    data() {
      return {
        search: '',
      }
    },

    // Mis metodos
    methods: {
      searchPokemon() {
        this.$emit('input-change', this.search)
      },
    },

    // Mis watchers, no es necesario
    watch: {
      // Cuando cambie el valor de search
      search(newValue, oldValue) {
        console.log(newValue, oldValue)
        // Si empieza por char lo ignoro, prueba a buscar charmander :)
        if (newValue.startsWith('char')) {
          this.search = oldValue
        }
      },
    },
  }
</script>

<style scoped></style>

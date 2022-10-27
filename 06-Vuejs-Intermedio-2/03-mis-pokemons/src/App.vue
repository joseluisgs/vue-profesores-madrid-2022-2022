<template>
  <div>
    <h1>{{ message }}</h1>
    <p>{{ author }}</p>
  </div>
  <hr />
  <Pokemons />
</template>

<script setup>
  // Importo mi componente
  import Pokemons from '@/components/Pokemons.vue'
  import { ref } from 'vue'

  const message = ref('Mis Pokemons')
  const author = ref('Jose Luis GS')
</script>

<style scoped>
  h1 {
    color: blue;
  }
</style>

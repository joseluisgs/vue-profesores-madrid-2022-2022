<template>
  <p>
    Filtrar:
    <input
      type="text"
      v-model="searchInput"
      placeholder="Buscar pokemon..."
      @keyup="searchPokemon"
    />
    &nbsp;
  </p>
</template>

<script setup>
  import { ref, watch } from 'vue'

  // Lo que emito
  const emit = defineEmits(['input-change'])

  const searchInput = ref('')

  // Mis metodos
  function searchPokemon() {
    emit('input-change', searchInput.value)
  }

  watch(searchInput, (newValue, oldValue) => {
    console.log('Valor anterior: ', oldValue)
    console.log('Nuevo valor: ', newValue)
  })

  // Mis watchers, no es necesario
</script>

<style scoped></style>

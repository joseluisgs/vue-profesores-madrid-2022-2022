<template>
  <main>
    <h1>Home</h1>
    <p>Home page</p>
    <hr />
    <Contador :valorInicial="10" />
    <input
      type="text"
      v-model="nombre"
      data-cy="input-nombre"
    />
    <p data-cy="texto-nombre">{{ nombre }}</p>
  </main>
</template>

<script setup>
  import Contador from '@/components/Contador.vue'
  import { ref } from 'vue'

  const nombre = ref('')
</script>

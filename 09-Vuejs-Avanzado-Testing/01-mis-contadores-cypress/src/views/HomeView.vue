<template>
  <main>
    <h1>Home</h1>
    <p>Home page</p>
    <hr />
    <Contador :valorInicial="10" />
  </main>
</template>

<script setup>
  import Contador from '@/components/Contador.vue'
</script>

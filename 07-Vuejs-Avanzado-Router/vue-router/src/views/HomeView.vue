<template>
  <main>
    <p>Home</p>
    <p>Vamos a navegar a mano</p>
    <button @click="goToAcercaDe">Ir a Acerca De</button>
    <button @click="goToDetails(2)">Ir a detalles 2</button>
  </main>
</template>
<script setup>
  import { useRouter } from 'vue-router'

  const router = useRouter()

  const goToAcercaDe = () => router.push({ name: 'about' })
  const goToDetails = (index) => router.push({ name: 'details', params: { id: index } })
</script>

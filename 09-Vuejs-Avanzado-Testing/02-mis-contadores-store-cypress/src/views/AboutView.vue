<template>
  <main>
    <h1>About</h1>
    <p>About page</p>
    <Modal />
  </main>
</template>

<script setup>
  import Modal from '@/components/Modal.vue'
</script>

<style scoped>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
</style>

<template>
  <p>Hola: El contador vale: {{ counterStore.counter }}</p>
  <ContadorComposition />
  <hr />
  <ContadorOptions />
  <hr />
  <ContadorStoreComposable />
</template>

<script setup>
  import ContadorComposition from '@/components/ContadorComposition.vue'
  import ContadorOptions from '@/components/ContadorOptions.vue'
  import ContadorStoreComposable from '@/components/ContadorStoreComposable.vue'
  import { CounterStore } from '@/stores/counter'
  const counterStore = CounterStore()
</script>

<style scoped></style>

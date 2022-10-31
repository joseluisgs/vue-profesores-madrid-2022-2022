<template>
  <h2>Contador Store Composition API</h2>
  <p>Valor: {{ counterStore.counter }}</p>
  <p>Doble: {{ counterStore.doubleCount }}</p>
  <button @click="incrementar">+</button>
  <button @click="decrementar">-</button>
  <button
    @click="incrementarAsync"
    :disabled="loadingStore.isLoading"
  >
    Async +
  </button>
  <button
    @click="decrementarAsync"
    :disabled="loadingStore.isLoading"
  >
    Async -
  </button>
</template>

<script setup>
  import { CounterStore } from '@/stores/counter'
  import { LoadingStore } from '@/stores/loading'
  import { onUpdated } from 'vue'

  // accedemos a la store
  const counterStore = CounterStore()
  const loadingStore = LoadingStore()

  // Al cargar el componente leemos del storage
  counterStore.loadFromStorage()

  // Al acutalizar el componente guardamos en el storage
  // podriamo usar watchers
  onUpdated(() => {
    counterStore.saveToStorage()
  })

  // Encapsulamos con metodos
  const incrementar = () => {
    counterStore.increment()
  }

  const decrementar = () => {
    counterStore.decrement()
  }

  const incrementarAsync = async () => {
    // Podriamos cambiar el estado aquí, pero lo hacemos en la store
    loadingStore.setLoading(true)
    await counterStore.incrementAsync(3)
    loadingStore.setLoading(false)
  }

  const decrementarAsync = async () => {
    loadingStore.setLoading(true)
    await counterStore.decrementAsync(3)
    loadingStore.setLoading(false)
  }
</script>

<style scoped>
  button {
    margin: 0.5rem;
  }
</style>

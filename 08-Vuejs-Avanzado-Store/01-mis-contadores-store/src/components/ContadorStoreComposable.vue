<template>
  <h2>Contador Store con Composable</h2>
  <p>Valor: {{ counterStore.actualValue }}</p>
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
  import { useCounterStore } from '@/stores/counter-composable'
  import { LoadingStore } from '@/stores/loading'
  import { onUpdated } from 'vue'

  // accedemos a la store
  const counterStore = useCounterStore()
  const loadingStore = LoadingStore()

  // Al cargar el componente leemos del storage
  counterStore.loadFromStorage()

  // Al acutalizar el componente guardamos en el storage
  // podriamos usar watchers
  // onUpdated(() => {
  //   counterStore.saveToStorage()
  // })

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

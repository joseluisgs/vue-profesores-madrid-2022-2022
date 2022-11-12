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
  <p
    v-if="counterStore.actualValue < 0"
    class="rojo"
  >
    Estás en número rojos
  </p>
  <p v-else>Estás 😁</p>
  <p :class="{ verde: divisbleEntre3 }">Es divisible entre 3: {{ divisbleEntre3 }}</p>
  <p
    v-if="negativo"
    class="rojo"
  >
    No te pases que estás en negativo
  </p>
</template>

<script setup>
  import { useCounterStore } from '@/stores/counter'
  import { LoadingStore } from '@/stores/loading'
  import { ref, computed, watch } from 'vue'

  const props = defineProps({
    // Valor inicial
    valorInicial: {
      type: Number,
      default: 0,
      // Siempre mayor que 0
      validator: (valor) => valor >= 0,
    },
  })

  // accedemos a la store
  const counterStore = useCounterStore()
  const loadingStore = LoadingStore()

  const negativo = ref(false)
  const contador = ref(counterStore.actualValue)

  // Al cargar el componente leemos del storage
  if (props.valorInicial == 0) counterStore.loadFromStorage()
  else counterStore.setCounter(props.valorInicial)

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

  const divisbleEntre3 = computed(() => {
    return counterStore.actualValue % 3 === 0
  })

  // Watcher
  watch(contador, (nuevoValor, valorAnterior) => {
    console.log('nuevoValor', nuevoValor)
    console.log('valorAnterior', valorAnterior)
    if (nuevoValor < 0) {
      negativo.value = true
    } else {
      negativo.value = false
    }
  })
</script>

<style scoped>
  button {
    margin: 0.5rem;
  }
  h1 {
    color: blue;
  }

  .rojo {
    color: red;
    font-weight: bold;
  }
  .verde {
    color: green;
    font-weight: bold;
  }
</style>

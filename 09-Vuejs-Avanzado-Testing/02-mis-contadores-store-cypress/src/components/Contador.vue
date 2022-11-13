<template>
  <h2>Contador Store con Composable</h2>
  <p data-cy="contador-valor">Valor: {{ counterStore.actualValue }}</p>
  <p data-cy="contador-doble">Doble: {{ counterStore.doubleCount }}</p>
  <button
    @click="incrementar"
    data-cy="boton-incrementar"
  >
    +
  </button>
  <button
    @click="decrementar"
    data-cy="boton-decrementar"
  >
    -
  </button>
  <button
    @click="incrementarAsync"
    :disabled="loadingStore.isLoading"
    data-cy="boton-incrementar-async"
  >
    Async +
  </button>
  <button
    @click="decrementarAsync"
    :disabled="loadingStore.isLoading"
    data-cy="boton-decrementar-async"
  >
    Async -
  </button>
  <p
    v-if="counterStore.actualValue < 0"
    class="rojo"
    data-cy="numeros-rojos"
  >
    Estás en número rojos
  </p>
  <p
    v-else
    data-cy="numeros-normales"
  >
    Estás 😁
  </p>
  <p
    :class="{ verde: divisbleEntre3 }"
    data-cy="es-divisible"
  >
    Es divisible entre 3: {{ divisbleEntre3 }}
  </p>
  <p
    v-if="negativo"
    class="rojo"
    data-cy="numeros-rojos"
  >
    No te pases que estás en negativo
  </p>
</template>

<script setup>
  import { useCounterStore } from '@/stores/counter'
  import { useLoadingStore } from '@/stores/loading'
  import { computed, ref, watch } from 'vue'

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
  const loadingStore = useLoadingStore()

  counterStore.setCounter(props.valorInicial)

  const contador = ref(counterStore.actualValue)
  const negativo = ref(false)

  // Encapsulamos con metodos
  const incrementar = () => {
    counterStore.increment()
  }

  const decrementar = () => {
    counterStore.decrement()
  }

  const incrementarAsync = async () => {
    loadingStore.setLoading(true)
    await counterStore.incrementAsync()
    loadingStore.setLoading(false)
  }

  const decrementarAsync = async () => {
    loadingStore.setLoading(true)
    await counterStore.decrementAsync()
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

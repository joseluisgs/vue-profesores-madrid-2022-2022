<template>
  <h2>Contador Store con Composable</h2>
  <p data-cy="contador-valor">Valor: {{ contador }}</p>
  <p data-cy="contador-doble">Doble: {{ doubleCount }}</p>
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
    :disabled="isLoading"
    data-cy="boton-incrementar-async"
  >
    Async +
  </button>
  <button
    @click="decrementarAsync"
    :disabled="isLoading"
    data-cy="boton-decrementar-async"
  >
    Async -
  </button>
  <p
    v-if="contador < 0"
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

  const contador = ref(props.valorInicial)
  const doubleCount = computed(() => contador.value * 2)
  const negativo = ref(false)
  const isLoading = ref(false)

  // Encapsulamos con metodos
  const incrementar = () => {
    contador.value++
  }

  const decrementar = () => {
    contador.value--
  }

  const incrementarAsync = async () => {
    // Podriamos cambiar el estado aquí, pero lo hacemos en la store
    isLoading.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))
    contador.value++
    isLoading.value = false
  }

  const decrementarAsync = async () => {
    isLoading.value = true
    await new Promise((resolve) => setTimeout(resolve, 1000))
    contador.value--
    isLoading.value = false
  }

  const divisbleEntre3 = computed(() => {
    return contador.value % 3 === 0
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

<template>
  <h2>Contador Store Options API</h2>
  <p>Valor: {{ counter }}</p>
  <p>Doble: {{ doubleCount }}</p>
  <button @click="incrementar">+</button>
  <button @click="decrementar">-</button>
  <button
    @click="incrementarAsync"
    :disabled="isLoading"
  >
    Async +
  </button>
  <button
    @click="decrementarAsync"
    :disabled="isLoading"
  >
    Async -
  </button>
</template>

<script>
  import { CounterStore } from '@/stores/counter'
  import { LoadingStore } from '@/stores/loading'
  import { mapActions, mapState, mapWritableState } from 'pinia'

  export default {
    name: 'ContadorOptions',

    // Mis hooks de vida
    created() {
      this.loadFromStorage()
    },
    updated() {
      this.saveToStorage()
    },

    // Mis métodos
    methods: {
      incrementar() {
        this.increment()
      },
      decrementar() {
        this.decrement()
      },
      async incrementarAsync() {
        this.setLoading(true)
        await this.incrementAsync(3)
        this.setLoading(false)
      },
      async decrementarAsync() {
        this.setLoading(true)
        await this.decrementAsync(3)
        this.setLoading(false)
      },

      // Los importamos y los podemos usar con this
      ...mapActions(CounterStore, [
        'increment',
        'decrement',
        'incrementAsync',
        'decrementAsync',
        'loadFromStorage',
        'saveToStorage',
      ]),
      ...mapActions(LoadingStore, ['setLoading']),
    },
    computed: {
      // Lo importamos en modo lectura y escritura y podemos acceder a eĺ en base a this.counter
      // Lo hemos desestructurado... Pero es peligroso poder usarlo así, mejor encapsular!!! (acciones)
      ...mapWritableState(CounterStore, ['counter']),
      ...mapState(CounterStore, ['doubleCount']),
      ...mapState(LoadingStore, ['isLoading']),
    },
  }
</script>

<style scoped>
  button {
    margin: 0.5rem;
  }
</style>

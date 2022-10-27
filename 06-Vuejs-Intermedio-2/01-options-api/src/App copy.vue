<template>
  <p>{{ message }}</p>
  <p>Mi valor: {{ valor }}</p>
  <hr />
  <ContadorOptions
    :valorInicial="valor"
    @incrementar-valor="incrementarValor"
    @decrementar-valor="decrementarValor"
  />
  <hr />
  <ContadorCompositionA
    :valorInicial="valor"
    @incrementar-valor="incrementarValor"
    @decrementar-valor="decrementarValor"
  />
  <hr />
  <ContadorCompositionB
    :valorInicial="valor"
    @incrementar-valor="incrementarValor"
    @decrementar-valor="decrementarValor"
  />
</template>

<script>
  import ContadorCompositionA from '@/components/ContadorCompositionA.vue'
  import ContadorCompositionB from '@/components/ContadorCompositionB.vue'
  import ContadorOptions from '@/components/ContadorOptions.vue'
  export default {
    name: 'App',

    // Mis componentes
    components: {
      ContadorOptions,
      ContadorCompositionA,
      ContadorCompositionB,
    },

    // Modelo reactivo
    data() {
      return {
        message: 'Hola',
        valor: 27,
      }
    },

    // métodos
    methods: {
      incrementarValor(valor) {
        this.valor = valor
      },
      decrementarValor(valor) {
        this.valor = valor
      },
    },
  }
</script>

<style scoped></style>

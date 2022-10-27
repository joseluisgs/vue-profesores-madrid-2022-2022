<template>
  <p class="text-red-600">{{ message }}</p>
  <p class="font-extrabold">Mi valor: {{ valor }}</p>
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

<script setup>
  import ContadorCompositionA from '@/components/ContadorCompositionA.vue'
  import ContadorCompositionB from '@/components/ContadorCompositionB.vue'
  import ContadorOptions from '@/components/ContadorOptions.vue'
  import { ref } from 'vue'

  const message = 'Hola'
  const valor = ref(27)

  const incrementarValor = (valorNuevo) => {
    valor.value = valorNuevo
  }
  const decrementarValor = (valorNuevo) => {
    valor.value = valorNuevo
  }
</script>

<style scoped></style>

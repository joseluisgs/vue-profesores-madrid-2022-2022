<template>
  <p>valor: {{ valor }}</p>
  <button @click="incrementar">+</button>
  <button @click="decrementar">-</button>
  <p v-if="esPar">Es par</p>
  <p v-else>Es impar</p>
  <p v-show="esPar">Es par en DOM</p>
</template>

<script setup>
  import { computed, ref, watch } from 'vue'

  // Nos pasa valores nuestro padre con propiedades
  const props = defineProps({
    valorInicial: {
      type: Number,
      required: true,
      default: 0,
      validator(value) {
        return value >= 0
      },
    },
  })

  // Mandamos valores a nuestro padre con eventos
  const emit = defineEmits(['incrementar-valor', 'decrementar-valor'])

  const valor = ref(props.valorInicial)

  function incrementar() {
    valor.value++
    emit('incrementar-valor', valor.value)
  }

  const decrementar = () => {
    valor.value--
    emit('decrementar-valor', valor.value)
  }

  // Computed
  const esPar = computed(() => valor.value % 2 === 0)

  // Watch
  watch(valor, (valorNuevo, valorAntiguo) => {
    console.log('valor ha cambiado')
    console.log('valor antiguo:', valorAntiguo)
    console.log('valor nuevo: ', valorNuevo)
  })

  watch(
    () => props.valorInicial,
    (valorNuevo) => {
      console.log('valorInicial ha cambiado')
      console.log('valorInicial nuevo: ', valorNuevo)
      valor.value = valorNuevo
    }
  )

  // onUpdated(() => {
  //   console.log('onUpdated')
  //   valor.value = props.valorInicial
  // })
</script>

<style scoped></style>

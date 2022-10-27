<template>
  <p>valor: {{ valor }}</p>
  <button @click="incrementar">+</button>
  <button @click="decrementar">-</button>
  <p v-if="esPar">Es par</p>
  <p v-else>Es impar</p>
  <p v-show="esPar">Es par en DOM</p>
</template>

<script>
  import { computed, ref, watch } from 'vue'
  export default {
    // name: 'ContadorCompositionA',

    // Nos pasa valores nuestro padre
    props: {
      valorInicial: {
        type: Number,
        required: true,
        default: 0,
        validator(value) {
          return value >= 0
        },
      },
    },

    // Mandamos valores a nuestro padre
    emits: ['incrementar-valor', 'decrementar-valor'],

    setup(props, { emit }) {
      // Modelo reactivo
      const valor = ref(props.valorInicial)

      function incrementar() {
        valor.value++
        emit('incrementar-valor', valor.value)
      }

      const decrementar = () => {
        valor.value--
        emit('decrementar-valor', valor.value)
      }

      // computed
      const esPar = computed(() => valor.value % 2 === 0)

      // watch
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

      // Lo que devuelvo
      return {
        valor,
        incrementar,
        decrementar,
        esPar,
      }
    },
  }
</script>

<style scoped></style>

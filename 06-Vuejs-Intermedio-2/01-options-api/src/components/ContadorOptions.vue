<template>
  <p>valor: {{ valor }}</p>
  <button @click="incrementar">+</button>
  <button @click="decrementar">-</button>
  <p v-if="esPar">Es par</p>
  <p v-else>Es impar</p>
  <p v-show="esPar">Es par en DOM</p>
</template>

<script>
  export default {
    name: 'ContadorOptions',

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

    // Modelo reactivo
    data() {
      return {
        valor: this.valorInicial,
      }
    },

    // updated() {
    //   console.log('updated')
    //   console.log('valorIncial: ', this.valorInicial)
    //   this.valor = this.valorInicial
    // },

    // Metodos
    methods: {
      incrementar() {
        this.valor++
        this.$emit('incrementar-valor', this.valor)
      },
      decrementar() {
        this.valor--
        this.$emit('decrementar-valor', this.valor)
      },
    },

    // Computed
    computed: {
      // esPar
      esPar() {
        return this.valor % 2 === 0
      },
    },

    // Watch
    watch: {
      // valor
      valor(valorNuevo, valorAntiguo) {
        console.log('valor ha cambiado')
        console.log('valorAntiguo', valorAntiguo)
        console.log('valorNuevo', valorNuevo)
      },

      valorInicial(valorNuevo) {
        console.log('valorInicial ha cambiado')
        this.valor = valorNuevo
      },
    },
  }
</script>

<style scoped></style>

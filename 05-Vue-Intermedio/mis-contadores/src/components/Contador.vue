<template>
  <h1>Mis Contadores</h1>
  <h3>{{ mensaje }}</h3>
  <div>
    <p>Valor inicial:</p>
    <input
      type="number"
      v-model="contador"
    />
    <h2>Contador</h2>
    <p>{{ contador }}</p>
    <button @click="incrementar">+</button>
    <button @click="decrementar">-</button>
    <p
      v-if="contador < 0"
      class="rojo"
    >
      Estás en número rojos
    </p>
    <p v-else>Estás 😁</p>
    <p>Es divisible entre 3: {{ divisbleEntre3 }}</p>
    <p
      v-if="negativo"
      class="rojo"
    >
      No te pases que estás en negativo
    </p>
  </div>
</template>

<script>
  export default {
    name: 'Contador',
    //estado reactivo
    data() {
      return {
        contador: 10,
        mensaje: 'Hola a todos/as',
        negativo: false,
      }
    },
    // Mis métodos
    methods: {
      incrementar() {
        console.log('incrementar')
        this.contador++
      },
      decrementar() {
        console.log('decrementar')
        this.contador--
      },
    },
    // Propiedades computadas
    computed: {
      // Multiplos de 3
      divisbleEntre3() {
        return this.contador % 3 == 0
      },
    },
    // Watcher
    watch: {
      // Se debe llamarse igual que la variable del estado
      contador(nuevoValor, valorAnterior) {
        console.log('nuevoValor -> ', nuevoValor)
        console.log('valorAnterior ->', valorAnterior)
        // No me deje bajar de -5
        if (nuevoValor <= -5) {
          this.contador = -5
          this.negativo = true
        } else {
          this.negativo = false
        }
      },
    },
  }
</script>

<style scoped>
  h1 {
    color: blue;
  }

  .rojo {
    color: red;
    font-weight: bold;
  }
</style>

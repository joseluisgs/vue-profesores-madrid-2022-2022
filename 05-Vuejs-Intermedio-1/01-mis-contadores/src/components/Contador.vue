<template>
  <h1>{{ titulo }}</h1>
  <h3>{{ mensaje }}</h3>
  <div>
    <p>Valor inicial:</p>
    <input
      type="number"
      v-model="contador"
      ref="inputContador"
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
    <p :class="{ verde: divisbleEntre3 }">Es divisible entre 3: {{ divisbleEntre3 }}</p>
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

    // Propiedades
    props: {
      // Valor inicial
      valorInicial: {
        type: Number,
        default: 0,
        // Siempre mayor que 0
        validator: (valor) => valor >= 0,
      },
      titulo: {
        type: String,
        default: 'Contador',
      },
      mensaje: {
        type: String,
        default: 'Hola',
      },
    },

    // eventos que emite el componente
    emits: ['valor-actualizado'],

    //estado reactivo
    data() {
      return {
        // Las propiedades son solo de lectura, por lo que si queremos
        // Operar con ellas debemos copiarlas en el estado
        contador: this.valorInicial,
        negativo: false,
      }
    },

    // Mi ciclo de vida
    created() {
      // todas las propieades se pueden acceder con this!
      console.log('se ha creado el componente')
      console.log(this.valorInicial)
    },
    beforeMount() {
      console.log('antes de montar el componente')
    },
    mounted() {
      console.log('se ha montado el componente')
      // Ponemos el foco en el input
      this.$refs.inputContador.focus()
    },
    beforeUpdate() {
      console.log('antes de actualizar el componente')
    },
    updated() {
      console.log('se ha actualizado el componente')
    },
    beforeUnmount() {
      console.log('antes de desmontar el componente')
    },
    unmounted() {
      console.log('se ha desmontado el componente')
    },

    // Mis métodos
    methods: {
      incrementar() {
        console.log('incrementar')
        this.contador++
        // Emitimos el evento que ha cambiado el valor
        //this.$emit('valor-actualizado', this.contador)
      },
      decrementar() {
        console.log('decrementar')
        this.contador--
        // Emitimos el evento que ha cambiado el valor
        //this.$emit('valor-actualizado', this.contador)
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
        // Pase lo que pase emitimos el evento con el valor
        if (nuevoValor !== valorAnterior && nuevoValor >= 0) {
          this.$emit('valor-actualizado', this.contador)
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
  .verde {
    color: green;
    font-weight: bold;
  }
</style>

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

<script setup>
  import { computed, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue'
  // Propiedades
  const props = defineProps({
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
  })

  // eventos que emite el componente
  const emits = defineEmits(['valor-actualizado'])

  // Las propiedades son solo de lectura, por lo que si queremos
  // Operar con ellas debemos copiarlas en el estado
  const contador = ref(props.valorInicial)
  const negativo = ref(false)
  const inputContador = ref(null)

  // todas las propieades se pueden acceder con this!
  console.log('se ha creado el componente')
  console.log(props.valorInicial)

  onMounted(() => {
    console.log('se ha montado el componente')
    inputContador.value.focus()
  })

  onUpdated(() => {
    console.log('se ha actualizado el componente')
  })

  onUnmounted(() => {
    console.log('se ha desmontado el componente')
  })

  const incrementar = () => {
    console.log('incrementar')
    contador.value++
    // Emitimos el evento que ha cambiado el valor
    //emit('valor-actualizado', this.contador)
  }
  const decrementar = () => {
    console.log('decrementar')
    contador.value--
    // Emitimos el evento que ha cambiado el valor
    //emit('valor-actualizado', this.contador)
  }

  // Propiedades computadas
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
    // Emitimos el evento que ha cambiado el valor
    emits('valor-actualizado', nuevoValor)
  })
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

<template>
  <h1>Ejemplo con el contador</h1>
  <!-- Vamos a inicial el contador con una propiedad para el valor inicial 
  titulo y mensaje...
  Además recibimos un evento!!
  -->
  <p>Valor actual actualizado por el evento: {{ valorActual }}</p>
  <button @click="openModal">Abrir Modal</button>
  <hr />
  <!-- Fijate que el valor lleva : porque depende del estado
  El resto no y que pueden tener valores opcionales-->
  <Contador
    :valorInicial="valorPropiedadContador"
    titulo="Contador de ejemplo"
    mensaje="Hola contador"
    @valor-actualizado="actualizarValorActual"
  />
  <!-- Codigo del modal con slots -->
  <!-- Mi modal -->
  <Modal
    v-if="isOpen"
    title="Hola mundo"
    @on-close="closeModal"
  >
    <!-- <p>Lorem ipsum dolor sit amet consectetur adipisicing elit!</p>
        <button>Salir</button>
        <h2>Titulo del modal</h2> -->
    <template v-slot:body>
      <article class="articulo">
        <p class="">Lorem ipsum dolor sit amet consectetur adipisicing elit!</p>
      </article>
    </template>

    <template v-slot:footer>
      <div class="centrado">
        <button @click="closeModal">Salir</button>
      </div>
    </template>

    <template v-slot:header>
      <h2 class="encabezado">Titulo del modal</h2>
    </template>
    <!-- Podemos exponer variables y acceder al estado -->
    <template v-slot:exposed="{ newTitle }">
      <h2 class="nuevo-titulo">
        {{ newTitle }}
        <!-- Hola otra vez -->
      </h2>
    </template>
  </Modal>
</template>

<script>
  import Contador from '@/components/Contador.vue'
  import Modal from '@/components/Modal.vue'
  export default {
    name: 'App',
    // Componentes que uso
    components: {
      Contador,
      Modal,
    },

    // Mi estado
    data() {
      return {
        // Contador
        valorActual: 0, // Para el evento
        valorPropiedadContador: 78, // Para ever el binding
        isOpen: false, // Para el modal
      }
    },

    // Mis métodos
    methods: {
      actualizarValorActual(valorRecibido) {
        this.valorActual = valorRecibido
      },
      openModal() {
        this.isOpen = true
      },
      closeModal() {
        this.isOpen = false
      },
    },
  }
</script>

<style scoped>
  .articulo {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    color: #2563eb;
  }
  .encabezado {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    color: #a6eb25;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 700;
    line-height: 1.25rem;
    text-align: center;
  }
  .centrado {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .nuevo-titulo {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    color: #2563eb;
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 700;
    line-height: 1.25rem;
    text-align: center;
  }
</style>

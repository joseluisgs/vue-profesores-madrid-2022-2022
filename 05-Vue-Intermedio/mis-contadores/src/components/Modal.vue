<template>
  <div
    class="fade-in modal"
    @click.self="$emit('onClose')"
  >
    <div class="modal-content">
      <slot name="header" />
      <slot name="body" />
      <slot name="footer" />

      <slot
        name="exposed"
        :newTitle="newTitle"
      ></slot>

      <!-- <slot /> -->
      <!-- <slot>
                <div class="center">
                    Esto aparecerá si no tenemos contenido
                </div>
            </slot> -->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Contador',

    // Mis propiedades
    props: {
      title: {
        type: String,
        required: true,
      },
    },

    // eventos que emite el componente
    emits: ['onClose'],

    // Propiedades computadas
    computed: {
      // Multiplos de 3
      newTitle() {
        return this.title?.toUpperCase()
      },
    },
  }
</script>

<style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.801);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  modal-content {
    background-color: #f3f4f6;
    width: 33.333333%;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }
  .fade-in {
    animation: fadeIn ease-out 0.2s;
    -webkit-animation: fadeIn ease-out 0.2s;
    -moz-animation: fadeIn ease-out 0.2s;
    -o-animation: fadeIn ease-out 0.2s;
    -ms-animation: fadeIn ease-out 0.2s;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-moz-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-o-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @-ms-keyframes fadeIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>

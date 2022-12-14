<template>
  <div
    class="fade-in width-100 fixed top-0 left-0 flex h-screen w-screen items-center justify-center bg-gray-500/[.40]"
    @click.self="$emit('onClose')"
  >
    <div class="h-45 w-1/3 rounded-md bg-gray-100 shadow-md shadow-gray-600">
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

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    title: {
      type: String,
      required: true,
    },
  })

  defineEmits(['onClose'])

  const newTitle = computed(() => props.title?.toUpperCase())

  console.log(props.title, newTitle.value)
</script>

<style scoped>
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

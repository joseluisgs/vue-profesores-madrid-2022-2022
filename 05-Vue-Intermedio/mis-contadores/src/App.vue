<template>
  <Contador />
  <hr />
  <Contador />
  <hr />
  <Contador />
</template>

<script>
  import Contador from '@/components/Contador.vue'
  export default {
    name: 'App',
    // Componentes que uso
    components: {
      Contador,
    },
  }
</script>

<style lang="scss" scoped></style>

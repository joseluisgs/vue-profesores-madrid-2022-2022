<template>
  <RouterView />
</template>

<script setup>
  import { themeChange } from 'theme-change'
  import { onMounted } from 'vue'

  // Para cambiar de tema automático!!!
  // https://github.com/saadeghi/theme-change
  onMounted(() => {
    themeChange('false')
  })
</script>

<style scoped></style>

<template>
  <div>
    <RouterLink :to="{ name: 'Home' }"
      ><h1>{{ message }}</h1></RouterLink
    >
    <p>{{ author }}</p>
  </div>
  <hr />
  <!-- Si quiero cachear las vistas usar keep alive 
  <router-view v-slot="{ Component }">
  <keep-alive>
    <component :is="Component" />
  </keep-alive>
</router-view>
-->
  <RouterView />
</template>

<script setup>
  // Importo mi componente
  import { ref } from 'vue'
  import { RouterView, RouterLink } from 'vue-router'

  const message = ref('Mis Pokemons')
  const author = ref('Jose Luis GS')
</script>

<style scoped>
  h1 {
    color: blue;
  }
</style>

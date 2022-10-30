<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <!-- Si quiero usar el nombre de las vistas y no su url-->
    <RouterLink :to="{ name: 'home' }">Home Named</RouterLink>
    <!-- Externo a Google -->
    <RouterLink :to="{ name: 'google' }">Google</RouterLink>
    <!-- Autenticada-->
    <RouterLink :to="{ name: 'autenticada' }">Autenticada</RouterLink>
  </nav>
</template>

<script setup>
  import { RouterLink } from 'vue-router'
</script>

<style scoped>
  nav {
    padding: 0 30px;
  }
  nav a {
    color: #2c3e50;
    font-weight: bold;
    margin: 0 10px;
  }
  nav a {
    cursor: pointer;
  }
  /* Para el enlace activo */
  .router-link-exact-active {
    color: #42b983;
  }
</style>

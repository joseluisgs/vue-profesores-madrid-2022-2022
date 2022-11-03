<template>
  <div class="subview-layout">
    <!-- Para rutas Hijas!!! -->
    <p>Soy una SubView</p>
    <p>Aquí se verán mis hijos!!</p>

    <RouterView />
  </div>
</template>

<script setup></script>

<style scoped>
  .subview-layout {
    background-color: deeppink;
  }
</style>

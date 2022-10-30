<template>
  <NavBar />

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
  import { defineAsyncComponent } from 'vue'
  import { RouterView } from 'vue-router'
  //Así lo importo normal, como hemos hecho siempre
  // import NavBar from '@/modules/shared/components/NavBar.vue'
  // Asy lazy con script setup
  const NavBar = defineAsyncComponent(() => import('@/components/NavBar.vue'))
</script>

<style scoped></style>

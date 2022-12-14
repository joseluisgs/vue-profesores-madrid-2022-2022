<template>
  <q-page class="flex column">
    <h1>Index</h1>
    <q-btn
      color="primary"
      label="Menú lateral"
      @click="menuStore.toggleLeftDrawer()"
    />
  </q-page>
</template>

<script setup>
  import MenuStore from '../stores/menu-store'

  const menuStore = MenuStore()
</script>

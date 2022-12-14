<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="las la-bars"
          aria-label="Menu"
          @click="menuStore.toggleLeftDrawer()"
        />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="sideMenuOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <EssentialLink
          v-for="link in menuLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import EssentialLink from 'components/EssentialLink.vue'
  import { menuLinks } from '../router/link-list'
import MenuStore from '../stores/menu-store'
  import { computed } from 'vue';

  const menuStore = MenuStore()

  const sideMenuOpen = computed({
    get() {
      return menuStore.leftDrawerOpen
    },
    set() {
      menuStore.toggleLeftDrawer()
    },
  })
</script>
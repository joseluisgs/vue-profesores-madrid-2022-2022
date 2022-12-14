<template>
  <img
    alt="Vue logo"
    class="logo"
    src="@/assets/images/logo.png"
    width="50"
    height="50"
    @click="goToAbout"
  />
  <div class="fixed top-1 right-5 z-50 flex">
    <Icon
      icon="mdi:theme-light-dark"
      class="mx-1 text-2xl text-primary-focus"
    />
    <div class="form-control">
      <input
        data-toggle-theme="light,night"
        data-act-class="night"
        type="checkbox"
        class="toggle-primary toggle"
        checked
      />
    </div>
  </div>

  <!-- <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->

  <RouterView />
</template>

<script setup lang="ts">
  import { Icon } from '@iconify/vue'
  import { themeChange } from 'theme-change'
  import { onMounted } from 'vue'
  import { RouterView, useRouter } from 'vue-router'

  const router = useRouter()

  onMounted(() => {
    themeChange(false)
  })

  const goToAbout = () => {
    router.push({ name: 'about' })
  }
</script>

<style scoped>
  .logo {
    @apply fixed right-5 bottom-5 z-40 h-10 w-10 cursor-pointer;
  }
</style>

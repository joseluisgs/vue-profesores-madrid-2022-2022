<template>
  <div class="navbar rounded-md bg-primary text-primary-content shadow-md">
    <div class="navbar-start">
      <button
        data-testid="navbar-button-home"
        class="btn btn-ghost text-xl normal-case"
        @click="goToHome()"
      >
        <img
          src="@/assets/images/logo.png"
          alt="logo"
          class="mr-3 inline-block w-10 text-right"
        />
        DayBook
      </button>
    </div>
    <div class="navbar-end">
      <button
        data-testid="navbar-button-logout"
        v-if="userStore.isLoggedIn"
        class="btn btn-primary gap-2"
        @click="logOut()"
      >
        {{ userStore.user.username }}
        <Icon
          icon="material-symbols:exit-to-app-rounded"
          :inline="true"
          class="h-8 w-8"
        />
      </button>
      <button
        data-testid="navbar-button-login"
        v-else
        class="btn btn-primary gap-2"
        @click="logIn()"
      >
        <Icon
          icon="bxs:user"
          :inline="true"
          class="h-8 w-8"
        />
      </button>
    </div>
  </div>
</template>

<script setup>
  import UserStore from '@/stores/users'
  import { Icon } from '@iconify/vue'
  import { useRouter } from 'vue-router'

  const userStore = new UserStore()

  const logOut = async () => {
    await userStore.logOut()
  }

  const logIn = async () => {
    await userStore.logIn()
  }

  const router = useRouter()
  // const goToDaybook = () => router.push({ name: 'daybook-no-entry' })
  const goToHome = () => router.push({ name: 'home' })
</script>

<style lang="scss" scoped></style>

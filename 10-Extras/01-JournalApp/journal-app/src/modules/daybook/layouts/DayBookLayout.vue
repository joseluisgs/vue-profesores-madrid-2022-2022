<template>
  <NavBar />
  <!-- Div de cargando!! -->
  <div
    v-if="journalStore.isLoading"
    class="mx-auto my-2 flex w-1/3 flex-row"
  >
    <div class="alert alert-info h-12 justify-center shadow-lg">
      <button class="btn loading btn-ghost">Espere por favor</button>
    </div>
  </div>
  <div
    v-if="userStore.isLoggedIn"
    class="mx-auto my-2 flex flex-row rounded-md py-2 shadow-lg"
  >
    <div class="w-4/12">
      <EntryList />
    </div>
    <!-- Columnas, la primera empuja el máximo -->
    <div class="flex flex-1 flex-col">
      <!-- Router View que ocupe todo lo que tenemos...Lo cachemaos con keepAlive-->
      <RouterView v-slot="{ Component }">
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </RouterView>
    </div>
  </div>
  <div
    v-else
    class="m-2 mx-auto my-2 flex w-1/3 flex-row"
  >
    <div class="alert alert-error m-2 h-12 shadow-lg">
      <div>
        <Icon
          icon="carbon:user-avatar-filled"
          class="h-8 w-8"
        />
        <span>ERROR: No estás identificado.</span>
      </div>
      <div class="flex-none">
        <button
          class="btn btn-ghost btn-sm"
          @click="logIn()"
        >
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import UserStore from '@/stores/users'
  import { Icon } from '@iconify/vue'
  import { RouterView } from 'vue-router'
  import EntryList from '../components/EntryList.vue'
  import NavBar from '../components/NavBar.vue'
  import JournalStore from '../stores/journal'

  const journalStore = JournalStore()

  const userStore = new UserStore()

  const logIn = async () => {
    await userStore.logIn()
  }
</script>

<style lang="scss" scoped></style>

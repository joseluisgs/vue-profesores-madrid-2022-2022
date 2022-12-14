<template>
  <!-- Transicciones me pidde un solo div!!! -->
  <transition
    name="fade"
    mode="out-in"
  >
    <div class="flex h-full flex-col items-center justify-center">
      <h1 class="text-3xl font-bold text-primary">No hay nada seleccionado</h1>
      <Icon
        icon="codicon:note"
        class="h-16 w-16 text-primary"
      />
    </div>
  </transition>
  <FavButton
    icon="akar-icons:plus"
    class="my-3 h-12 w-12 self-end shadow-md"
    @click="newEntry()"
  />
</template>

<script setup>
  import FavButton from '@/components/FabButton.vue'
  import { Icon } from '@iconify/vue'
  import { useRouter } from 'vue-router'
  const router = useRouter()

  const newEntry = () => {
    router.push({ name: 'daybook-entry', params: { id: 'new' } })
  }
</script>

<style lang="scss" scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>

<!-- Dieño del curso!!! -->
<!-- <template>
  <div class="flex flex-col h-full dev">
    <div class="flex flex-row items-center justify-center flex-1 dev">
      <h1 class="text-3xl font-bold text-primary">No hay nada seleccionado</h1>
    </div>
    <FavButton class="self-end w-16 h-16 my-10 dev" />
  </div>
</template>

<script setup>
  import FavButton from '@/modules/daybook/components/DayBookFabButton.vue'
</script>

<style lang="scss" scoped></style> 
-->

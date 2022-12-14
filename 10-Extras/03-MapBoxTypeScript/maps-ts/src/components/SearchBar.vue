<template>
  <div
    class="search-container fixed top-5 left-5 z-50 max-w-xs rounded-lg bg-primary-content p-3 shadow-lg"
  >
    <input
      type="text"
      placeholder="Buscar"
      class="input-bordered input-primary input max-w-xs bg-primary-content"
      v-model.trim="searchText"
      @input="searchItem"
    />
    <SearchResults />
  </div>
</template>

<script setup lang="ts">
  import SearchResults from '@/components/SearchResults.vue'
  import { usePlacesStore } from '@/stores/places'
  import debounce from 'lodash/debounce'
  import { ref } from 'vue'

  const placesStore = usePlacesStore()

  const searchText = ref('')
  const searchTimeout = ref()

  // Con lodash/debounce
  const searchItem = debounce(async (value) => {
    // console.log('inputText:', value.target.value)
    searchText.value = value.target.value
    await placesStore.searchPlacesByTerm(searchText.value)
  }, 500)

  // O manual

  // const searchItem = computed({
  //   get() {
  //     return searchText.value
  //   },
  //   set(value: string) {
  //     if (searchTimeout.value) clearTimeout(searchTimeout.value)

  //     searchTimeout.value = setTimeout(async () => {
  //       searchText.value = value
  //       console.log('searchText:', searchText.value)
  //       await placesStore.searchPlacesByTerm(searchText.value)
  //     }, 500)
  //   },
  // })
</script>

<style scoped>
  .lista-item {
    @apply cursor-pointer border-primary p-2;
  }
  li.lista-item:active {
    @apply rounded bg-primary-focus text-primary-content;
  }
</style>

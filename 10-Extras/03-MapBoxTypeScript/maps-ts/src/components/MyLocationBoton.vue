<template>
  <button
    v-if="isBotonReady"
    class="btn-primary btn-square btn fixed top-11 right-6 z-50 bg-primary-content text-primary shadow-lg hover:text-primary-content"
    @click="goToMyPosition"
  >
    <Icon
      class="h-6 w-6"
      icon="material-symbols:my-location-rounded"
    />
  </button>
</template>

<script setup lang="ts">
  import { useMapStore } from '@/stores/map'
  import { usePlacesStore } from '@/stores/places'
  import { Icon } from '@iconify/vue'
  import { computed } from 'vue'

  // creo la store
  const placesStore = usePlacesStore()
  const mapStore = useMapStore()

  const isBotonReady = computed(() => {
    return placesStore.isUserLocationReady && mapStore.isMapReady
  })

  const goToMyPosition = () => {
    console.log('goToMyPosition')

    mapStore.getMap?.flyTo({
      center: placesStore.getCurrentLocation,
      zoom: 15,
    })
  }
</script>

<style scoped></style>

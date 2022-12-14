<template>
  <main>
    <SearchBar />
    <MyLocationBoton />
    <MapView />
    <TripDetails />
  </main>
</template>

<script setup lang="ts">
  import MapView from '@/components/MapView.vue'
  import MyLocationBoton from '@/components/MyLocationBoton.vue'
  import SearchBar from '@/components/SearchBar.vue'
  import TripDetails from '@/components/TripDetails.vue'
  import { usePlacesStore } from '@/stores/places'

  // creo la store
  const placesStore = usePlacesStore()

  // engancho la posición actual
  if (!placesStore.isUserLocationReady) {
    console.log('Getting user location')
    placesStore.getInitialLocation()
  }
</script>

<style scoped></style>

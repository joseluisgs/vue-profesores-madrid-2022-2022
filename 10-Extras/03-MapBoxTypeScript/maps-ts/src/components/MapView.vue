<template>
  <div
    v-if="!placesStore.isUserLocationReady"
    class="loading-map flex-col"
  >
    <h1 class="text-center text-3xl font-bold text-secondary-focus">Espere por favor</h1>
    <h2 class="text text text-center font-bold">Cargando mapa</h2>
  </div>

  <div
    v-show="placesStore.isUserLocationReady"
    class="map-container"
    ref="mapElement"
  ></div>
</template>

<script setup lang="ts">
  import { useMapStore } from '@/stores/map'
  import { usePlacesStore } from '@/stores/places'
  import Mapboxgl from 'mapbox-gl'
  import { ref, watch } from 'vue'

  // creo la store
  const placesStore = usePlacesStore()
  const mapStore = useMapStore()

  // referencia al elemento del DOM
  const mapElement = ref<HTMLDivElement | null>(null)

  const initMap = async () => {
    // creo el mapa
    if (!mapElement.value) throw new Error('No se encontró el elemento del mapa')
    if (!placesStore.getCurrentLocation) throw new Error('No se encontró la posición del usuario')

    // porque va muy rapido y no se ve el loading, por eso formzarlo
    await new Promise((resolve) => setTimeout(resolve, 50))

    const map = new Mapboxgl.Map({
      container: mapElement.value, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: placesStore.getCurrentLocation, // starting position [lng, lat]
      zoom: 15, // starting zoom
    })

    const myLocationPopup = new Mapboxgl.Popup()
      .setHTML('<h4 class="text-lg font-bold text-secondary-focus">Mi ubicación</h4>')
      .setLngLat(placesStore.getCurrentLocation)
      .addTo(map)

    new Mapboxgl.Marker()
      .setLngLat(placesStore.getCurrentLocation)
      .setPopup(myLocationPopup)
      .addTo(map)

    // guardo el mapa en la store
    mapStore.setMap(map)
  }

  // watch para este lista la posición del usuario
  watch(
    () => placesStore.isUserLocationReady,
    (isReady) => {
      if (placesStore.isUserLocationReady) return initMap()
    }
  )
</script>

<style scoped>
  .loading-map {
    @apply fixed top-0 z-40 flex h-screen w-screen items-center justify-center bg-indigo-50/50 backdrop-blur-sm backdrop-filter;
  }
  .map-container {
    @apply fixed top-0 left-0 z-0 h-screen w-screen;
  }
</style>

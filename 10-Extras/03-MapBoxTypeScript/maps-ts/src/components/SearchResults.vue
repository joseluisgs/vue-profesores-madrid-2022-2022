<template>
  <div
    class="alert alert-info my-2 shadow-lg"
    v-if="placesStore.getLoading"
  >
    <div>
      <Icon
        icon="material-symbols:search"
        class="h-5 w-5"
      />
      <span>Buscando lugares</span>
    </div>
  </div>
  <ul
    class="divide-y divide-primary-focus p-1"
    v-else-if="placesStore.getPlaces.length > 0"
  >
    <li
      v-for="place in placesStore.getPlaces"
      :key="place.id"
      class="lista-item"
      :class="{ active: place.id === activePlace }"
    >
      <div class="flex flex-row items-center">
        <div
          class="flex grow flex-col"
          @click="onePlaceClick(place)"
        >
          <h5 class="font-medium">{{ place.text_es }}</h5>
          <p class="text-xs">{{ place.place_name_es }}</p>
        </div>
        <div class="pl-2">
          <button
            class="btn-outline btn-circle btn"
            @click="onPlaceDirection(place)"
          >
            <Icon
              icon="material-symbols:assistant-direction"
              class="flex h-10 w-10 text-emerald-300 hover:text-emerald-500"
            />
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  import { directionsApi } from '@/apis'
  import type { Feature } from '@/interfaces/PlacesResponse'
  import { useMapStore } from '@/stores/map'
  import { usePlacesStore } from '@/stores/places'
  import { Icon } from '@iconify/vue'
  import { ref, watch } from 'vue'
  import type { DirectionsResponse } from '../interfaces/DirectionsResponse'

  const placesStore = usePlacesStore()
  const mapStore = useMapStore()

  const activePlace = ref('')

  const onePlaceClick = (place: Feature) => {
    activePlace.value = place.id
    const [lng, lat] = place.center
    mapStore.getMap?.flyTo({
      center: [lng, lat],
      zoom: 15,
    })
  }

  const onPlaceDirection = async (place: Feature) => {
    if (!placesStore.getCurrentLocation) return

    activePlace.value = place.id
    const [destLng, destLat] = place.center
    const [originLng, originLat] = placesStore.getCurrentLocation

    const origen: [number, number] = [originLng, originLat]
    const destino: [number, number] = [destLng, destLat]

    //console.log('origen', origen)
    //console.log('dest', destino)

    const resp = await directionsApi.get<DirectionsResponse>(
      `/${origen.join(',')};${destino.join(',')}`
    )

    console.log(resp.data.routes[0].geometry)
    console.log(resp.data.routes[0].distance)
    console.log(resp.data.routes[0].duration)

    mapStore.setDistance(resp.data.routes[0].distance)
    mapStore.setDuration(resp.data.routes[0].duration)

    mapStore.getMap?.flyTo({
      center: destino,
      zoom: 15,
    })

    mapStore.setRoutePolyline(resp.data.routes[0].geometry.coordinates)
  }

  // Cada vez que haya un cambio en places, lo metemos en markers del mapa
  watch(
    () => placesStore.getPlaces,
    (newPlaces) => {
      activePlace.value = ''
      mapStore.setMarkers(newPlaces)
    }
  )
</script>

<style scoped>
  .lista-item {
    @apply cursor-pointer border-primary p-2 hover:rounded hover:bg-primary-focus hover:text-primary-content active:rounded active:bg-secondary-focus active:text-secondary-content;
  }
  .active {
    @apply rounded bg-secondary-focus text-secondary-content;
  }
</style>

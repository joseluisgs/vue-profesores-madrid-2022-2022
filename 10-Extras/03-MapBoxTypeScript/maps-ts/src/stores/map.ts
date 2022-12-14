import type { Feature } from '@/interfaces/PlacesResponse'
import Mapboxgl from 'mapbox-gl'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export type LngLat = [number, number] // Me creo un tipo, y uno una interfaz porque es sencillo, pero si fuera más complejo, mejor interfaz

// Puedo definir el tipo!!!
export const useMapStore = defineStore('map', () => {
  // Nuestro estado, con variables sueltas reactivas
  const map: Ref<mapboxgl.Map | undefined> = ref(undefined)
  const markers: Ref<mapboxgl.Marker[]> = ref([])
  const distance: Ref<number | undefined> = ref(undefined)
  const duration: Ref<number | undefined> = ref(undefined)

  // Getters son mis computed
  const isMapReady = computed(() => !!map.value)
  const getMap = computed(() => map.value)
  const getMarkers = computed(() => markers.value)
  const getDistance = computed(() => distance.value)
  const getDuration = computed(() => duration.value)

  // Actions y mutaciones
  const setMap = (otherMap: mapboxgl.Map) => {
    map.value = otherMap
  }

  const setMarkers = (places: Feature[]) => {
    markers.value.forEach((marker) => marker.remove())
    markers.value = []

    if (!map.value) return

    places.forEach((place) => {
      const [lng, lat] = place.center
      const popup = new Mapboxgl.Popup()
        .setHTML(
          `<h4 class="text-lg font-bold text-secondary-focus">${place.text_es}</h4>
         <p class="text-sm text-secondary-focus">${place.place_name_es}</p>`
        )
        .setLngLat([lng, lat])

      const marker = new Mapboxgl.Marker().setLngLat([lng, lat]).setPopup(popup).addTo(map.value!)

      markers.value.push(marker)
    })

    // Clear polyline
    if (map.value.getLayer('RouteString')) {
      map.value.removeLayer('RouteString')
      map.value.removeSource('RouteString')
      distance.value = undefined
      duration.value = undefined
    }
  }

  const setDistance = (otherDistance: number) => {
    distance.value = Math.round((otherDistance / 1000) * 100) / 100 // Redondeo a 2 decimales kilometros
  }

  const setDuration = (otherDuration: number) => {
    duration.value = Math.floor(otherDuration / 60) // Redondeo a minutos
  }

  const setRoutePolyline = (coords: number[][]) => {
    if (!map.value) return

    const origen = coords[0]
    const destino = coords[coords.length - 1]

    // Definir los bounds
    const bounds = new Mapboxgl.LngLatBounds([origen[0], origen[1]], [destino[0], destino[1]])

    coords.forEach((coord) => {
      const newCoord: [number, number] = [coord[0], coord[1]]
      bounds.extend(newCoord)
    })

    // el mapa debe mostrar los bounds
    map.value.fitBounds(bounds, { padding: 300 })

    // polyline
    const sourceData: Mapboxgl.AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords,
            },
          },
        ],
      },
    }

    // Clear polyline
    if (map.value.getLayer('RouteString')) {
      map.value.removeLayer('RouteString')
      map.value.removeSource('RouteString')
    }

    console.log(sourceData)
    map.value.addLayer({
      id: 'RouteString',
      type: 'line',
      source: sourceData,
      layout: {
        'line-join': 'round',
        'line-cap': 'round',
      },
      paint: {
        'line-color': '#6241f2',
        'line-width': 3,
      },
    })
  }

  // Exportamos lo que queremos usar en cualquier parte de la app
  return {
    setMap,
    isMapReady,
    getMap,
    setMarkers,
    getMarkers,
    setDistance,
    setDuration,
    setRoutePolyline,
    getDistance,
    getDuration,
  }
})

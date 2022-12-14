import { searchApi } from '@/apis'
import type { PlacesResponse } from '@/interfaces/PlacesResponse'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import type { Feature } from '../interfaces/PlacesResponse'

// Puedo definir el tipo!!!
export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number] // [long, lat]
}

export const usePlacesStore = defineStore('places', () => {
  // Nuestro estado, con variables sueltas reactivas
  const isLoading: Ref<boolean> = ref(false) // Puedo dejar que infiera o definirle el tipo
  const userLocation: Ref<[number, number] | undefined> = ref(undefined) // Puedo definir el tipo!!!
  const places: Ref<Feature[]> = ref([])

  // otra forma es
  // const isLoading = ref<boolean>(false) // oponerle as Ref<Boolean>
  // const userLocation = ref<[number, number] | undefined>(undefined)
  // Lo que exporto es lo que puedo usar en cualquier parte de la app

  // getters - computed
  const isUserLocationReady = computed((): boolean => !!userLocation.value)
  const getCurrentLocation = computed((): [number, number] | undefined => userLocation.value)
  const getLoading = computed((): boolean => isLoading.value)
  const getPlaces = computed((): Feature[] => places.value)

  // actions y mutaciones
  // Setters para cambiare el estado
  const setLngLat = (coords: GeolocationCoordinates) => {
    console.log(`setLngLat: ${coords.longitude}, ${coords.latitude}`)
    userLocation.value = [coords.longitude, coords.latitude]
    isLoading.value = false
  }

  const getInitialLocation = () => {
    isLoading.value = true
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setLngLat(coords), // desestructuro el objeto position
      (err) => {
        console.error(err)
        throw new Error('No se pudo obtener la ubicación')
      }
    )
  }

  const setPlaces = (otherPlaces: Feature[]) => {
    places.value = otherPlaces
    console.log('places', places.value)
    isLoading.value = false
  }

  const searchPlacesByTerm = async (searchText: string) => {
    console.log('searchPlacesByTerm', searchText)
    isLoading.value = true
    if (searchText.length > 0 && userLocation.value) {
      const response = await searchApi.get<PlacesResponse>(`/${searchText}.json`, {
        params: {
          proximity: userLocation.value?.join(','),
        },
      })
      setPlaces(response.data.features)
    } else {
      setPlaces([])
    }
  }

  // Exportamos lo que queremos usar en cualquier parte de la app, es dcir lo que queremos que sea publico
  return {
    isUserLocationReady,
    getInitialLocation,
    getCurrentLocation,
    getLoading,
    searchPlacesByTerm,
    getPlaces,
  }
})

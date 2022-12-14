// Fichero enlace a las apis

import axios from 'axios'

const searchApi = axios.create({
  baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
  params: {
    limit: 5,
    language: 'es',
    types: 'place',
    access_token: import.meta.env.VITE_MAP_TOKEN,
  },
})

const directionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    alternatives: false,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: import.meta.env.VITE_MAP_TOKEN,
  },
})

export { searchApi, directionsApi }

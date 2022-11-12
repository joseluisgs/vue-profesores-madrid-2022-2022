<template>
  <p>Param Pokemon ID: {{ route.params.id }}</p>
  <p>Query Pokemon ID: {{ route.query }}</p>
  <p>Props Pokemon ID: {{ props.id }}</p>
  <p>Props Pokemon ID: {{ props.query }}</p>

  <div v-if="pokemonSelected.name">
    <h2 class="header">{{ pokemonSelected.name }} {{ isFavorite }}</h2>
    <article class="body">
      <p>Altura: {{ pokemonSelected.height }}</p>
      <p>Peso: {{ pokemonSelected.weight }}</p>
      <p>Experiencia base: {{ pokemonSelected.base_experience }}</p>
      <img
        :src="pokemonSelected.sprites.front_default"
        alt="imagen"
        class="pokemon-image"
      />
    </article>
    <div class="footer">
      <button
        @click="goBack"
        class="boton"
      >
        Volver
      </button>
    </div>
  </div>
</template>

<script setup>
  import axios from 'axios'
  import { ref, watch, computed } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  import { usePokemonStore } from '@/stores/pokemons'
  // Vamos a pasarle unas propiedades!!!

  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
    query: {
      type: Object,
      required: true,
    },
  })

  const router = useRouter()
  const route = useRoute()
  const pokemonStore = usePokemonStore()

  const pokemonSelected = ref({})

  const goBack = () => {
    router.push({ name: 'Home' })
  }

  const getPokemon = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.id}`)
    pokemonSelected.value = response.data
  }

  const isFavorite = computed(() => {
    if (pokemonStore.existsPokemonFavorites(pokemonSelected.value)) return '⭐'
    else return ''
  })

  getPokemon()

  // Watcher sobre una prop en concreto por si las moscas!!
  watch(
    () => props.id,
    async () => {
      await getPokemon()
    }
  )
</script>
<style scoped>
  .header {
    background-color: #f1f1f1;
    padding: 5px;
    border-radius: 5px 5px 0px 0px;
    margin: 0px;
    font-size: 40px;
    color: #030255;
    text-align: center;
  }
  .pokemon-image {
    width: 15%;
    height: auto;
    margin: 0 auto;
    /** center */
    display: block;
  }
  .body {
    padding: 5px;
    background-color: #f1f1f1;
    font-size: px;
    color: #030255;
    text-align: center;
  }
  .footer {
    background-color: #f1f1f1;
    padding: 5px;
    border-radius: 0px 0px 5px 5px;
    font-size: px;
    color: #030255;
    text-align: center;
  }
  .boton {
    background-color: #cfcfcf;
    color: rgb(34, 34, 34);
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
</style>

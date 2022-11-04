<template>
  <div v-if="pokemonSelected.name">
    <h2 class="header">{{ pokemonSelected.name }}</h2>
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
  import { watch, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import axios from 'axios'
  // Vamos a pasarle unas propiedades!!!
  const props = defineProps({
    id: {
      type: Number,
      required: true,
    },
  })

  const router = useRouter()

  const pokemonSelected = ref({})

  const goBack = () => {
    router.push({ name: 'Home' })
  }

  const getPokemon = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.id}`)
    pokemonSelected.value = response.data
  }

  getPokemon()

  // Watcher sobre una prop en concreto
  watch(
    () => props.id,
    async () => {
      await getPokemon()
      // podemos consultar una api o lo que sea por el detalle
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
    width: 25%;
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

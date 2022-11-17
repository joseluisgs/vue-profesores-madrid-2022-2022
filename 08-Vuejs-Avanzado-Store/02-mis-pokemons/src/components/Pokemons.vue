<template>
  <div>
    <h1>{{ message }} Pokemons</h1>
    <button @click="pokemonStore.loadPokemons(15)">Cargar Pokemons</button>

    <BuscadorPokemon @input-change="searchPokemon" />

    <TablaPokemons
      :pokemons="pokemonStore.pokemonsFiltered(search)"
      @remove-pokemon="removePokemon"
    />
  </div>
  <!-- Mi modal -->
  <Modal
    v-if="isModalOpen"
    title="¿Eliminar pokemon?"
    @on-close="closeModal"
  >
    <template v-slot:header>
      <h2 class="modal-header">Eliminar Pokemon</h2>
    </template>
    <template v-slot:body>
      <article class="modal-body">
        <p>Desea eliminar a {{ pokemonSelected.name }}</p>
      </article>
    </template>

    <template v-slot:footer>
      <div class="modal-footer">
        <button
          @click="deletePokemon"
          class="boton"
        >
          Eliminar
        </button>
        <button
          @click="closeModal"
          class="boton"
        >
          Cancelar
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
  import BuscadorPokemon from '@/components/BuscadorPokemon.vue'
  import TablaPokemons from '@/components/TablaPokemons.vue'
  import Modal from '@/components/Modal.vue'
  import { ref, watch } from 'vue'
  import { usePokemonStore } from '@/stores/pokemons'

  const pokemonStore = usePokemonStore()
  const message = 'Hola mundo' // No es reactiva
  const search = ref('')
  const isModalOpen = ref(false)
  const pokemonSelected = ref(null)

  // Cargamos los pokemons
  pokemonStore.loadPokemons(15)

  // Buscar pokemon
  function searchPokemon(searchBuscador) {
    search.value = searchBuscador
  }

  // Eliminar un pokemon
  const removePokemon = (pokemon) => {
    pokemonSelected.value = pokemon
    openModal()
  }

  const deletePokemon = () => {
    pokemonStore.removePokemon(pokemonSelected.value)
    closeModal()
  }

  function openModal() {
    isModalOpen.value = true
  }
  function closeModal() {
    isModalOpen.value = false
  }

  // Mis watchers
  watch(search, (newValue, oldValue) => {
    console.log('Nuevo valor: ', newValue)
    console.log('Valor anterior: ', oldValue)
  })
</script>

<style scoped>
  .modal-header {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px 5px 0px 0px;
    margin: 0px;
    font-size: 40px;
    color: #8d0000;
    text-align: center;
  }
  .pokemon-image {
    width: 100%;
    height: auto;
    /* center image */
    display: block;
  }
  .modal-body {
    padding: 10px;
    background-color: #f1f1f1;
    font-size: px;
    color: #030255;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
  .modal-footer {
    background-color: #f1f1f1;
    padding: 10px;
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

<template>
  <table v-if="numberPokemons > 0">
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Acción</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="pokemon in pokemons"
        :key="pokemon.name"
      >
        <FilaPokemon
          :pokemon="pokemon"
          @remove-pokemon="removePokemon"
        />
      </tr>
    </tbody>
  </table>

  <div>
    <p>En la lista hay {{ numberPokemons }} pokemons</p>
  </div>

  <!-- Mi modal -->
  <Modal
    v-if="isModalOpen"
    title="Información del pokemon"
    @on-close="closeModal"
  >
    <template v-slot:header>
      <h2 class="modal-header">{{ pokemonSelected.name }}</h2>
    </template>
    <template v-slot:body>
      <article class="modal-body">
        <ul>
          <li>Altura: {{ pokemonSelected.height }}</li>
          <li>Peso: {{ pokemonSelected.weight }}</li>
          <li>Experiencia base: {{ pokemonSelected.base_experience }}</li>
        </ul>
        <img
          :src="pokemonSelected.sprites.front_default"
          alt="imagen"
          class="pokemon-image"
        />
      </article>
    </template>

    <template v-slot:footer>
      <div class="modal-footer">
        <button
          @click="closeModal"
          class="boton"
        >
          Cerrar
        </button>
      </div>
    </template>
  </Modal>
</template>

<script setup>
  import FilaPokemon from '@/components/FilaPokemon.vue'
  import Modal from '@/components/Modal.vue'
  import { computed, ref } from 'vue'

  // Mis props
  const props = defineProps({
    pokemons: {
      type: Array,
      required: true,
    },
  })

  // Mis eventos
  const emit = defineEmits(['remove-pokemon'])

  const pokemonSelected = ref(null)
  const isModalOpen = ref(false)

  // Eliminar un pokemon
  const removePokemon = (pokemon) => {
    // Necesitamos emitir un evento para que el padre lo escuche
    // Y se encargue de eliminar el pokemon
    emit('remove-pokemon', pokemon)
  }

  // Mostrar información de un pokemon
  // const infoPokemon = (pokemon) => {
  //   // abrimos la modal
  //   openModal()
  //   // Guardamos el pokemon seleccionado
  //   pokemonSelected.value = pokemon
  // }

  function openModal() {
    isModalOpen.value = true
  }
  function closeModal() {
    isModalOpen.value = false
  }

  // Mis métodos computados
  const numberPokemons = computed(() => props.pokemons.length)
</script>

<style scoped>
  .modal-header {
    background-color: #f1f1f1;
    padding: 10px;
    border-radius: 5px 5px 0px 0px;
    margin: 0px;
    font-size: 40px;
    color: #030255;
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

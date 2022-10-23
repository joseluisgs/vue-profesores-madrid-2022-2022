<template>
  <div>
    <h1>Pokemons</h1>
    <button @click="loadPokemons(15)">Cargar Pokemons</button>

    <BuscadorPokemon @input-change="searchPokemon" />

    <TablaPokemons
      :pokemons="filteredPokemons"
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

<script>
  import BuscadorPokemon from '@/components/BuscadorPokemon.vue'
  import Modal from '@/components/Modal.vue'
  import TablaPokemons from '@/components/TablaPokemons.vue'
  import axios from 'axios'
  export default {
    name: 'Pokemons',
    // Mis componentes
    components: {
      BuscadorPokemon,
      TablaPokemons,
      Modal,
    },
    // Mi modelo de datos
    data() {
      return {
        message: 'Hello World',
        search: '',
        pokemons: [],
        isModalOpen: false, // Para el modal
        pokemonSelected: null, // Para el modal
      }
    },
    // Mis hooks
    created() {
      this.loadPokemons(15)
    },
    // Mis métodos
    methods: {
      // Buscar pokemon
      searchPokemon(search) {
        this.search = search
      },
      // Cargar Pokemons
      async loadPokemons(max = 25) {
        try {
          // Hacer una petición a la API con Axios
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${max}`)
          // Guardar los datos en mi modelo de datos
          this.pokemons = response.data.results
          this.search = ''
        } catch (error) {
          console.log(error)
        }
      },
      // Eliminar un pokemon
      removePokemon(pokemon) {
        this.pokemonSelected = pokemon
        this.openModal()
      },
      deletePokemon() {
        this.pokemons = this.pokemons.filter((p) => p.name !== this.pokemonSelected.name)
        this.closeModal()
      },

      openModal() {
        this.isModalOpen = true
      },
      closeModal() {
        this.isModalOpen = false
      },
    },
    // Mis métodos computados
    computed: {
      // siempre tendremos los datos filtrados
      filteredPokemons() {
        return this.pokemons
          .filter((pokemon) => pokemon.name.includes(this.search))
          .sort((a, b) => a.name.localeCompare(b.name))
      },
      // Numero de pokemons
      numberPokemons() {
        return this.filteredPokemons.length
      },
    },
    // Mis watchers
    watch: {
      // Cuando cambie el valor de search
      search(newValue, oldValue) {
        console.log(newValue, oldValue)
        // Si empieza por char lo ignoro, prueba a buscar charmander :)
        if (newValue.startsWith('char')) {
          this.search = oldValue
        }
      },
    },
  }
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

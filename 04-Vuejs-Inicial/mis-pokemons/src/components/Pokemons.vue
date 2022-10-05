<template>
  <div>
    <h1>Pokemons</h1>
    <button @click="loadPokemons(15)">Cargar Pokemons</button>

    <p>
      Filtrar:
      <input
        type="text"
        v-model="search"
        placeholder="Buscar pokemon..."
      />
      &nbsp;
    </p>

    <table v-if="numberPokemons > 0">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="pokemon in filteredPokemons"
          :key="pokemon.url"
        >
          <td @click="infoPokemon(pokemon.url)">{{ pokemon.name }}</td>
          <td>
            <button @click="removePokemon(pokemon)">-</button>
          </td>
        </tr>
      </tbody>
    </table>

    <div>
      <p>En la lista hay {{ numberPokemons }} pokemons</p>
    </div>

    <div v-if="!!pokemonSelected && numberPokemons > 0">
      <h4>Datos de último Pokemon:</h4>
      <h2>{{ pokemonSelected.name }}</h2>
      <ul>
        <li>Altura: {{ pokemonSelected.height }}</li>
        <li>Peso: {{ pokemonSelected.weight }}</li>
        <li>Experiencia base: {{ pokemonSelected.base_experience }}</li>
      </ul>
      <img
        :src="pokemonSelected.sprites.front_default"
        alt="imagen"
      />
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    name: 'Pokemons',
    // Mi modelo de datos
    data() {
      return {
        message: 'Hello World',
        search: '',
        pokemons: [],
        pokemonSelected: null,
      }
    },
    // Mis métodos
    methods: {
      // Cargar Pokemons
      async loadPokemons(max = 25) {
        try {
          // Hacer una petición a la API con Axios
          const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${max}`)
          // Guardar los datos en mi modelo de datos
          this.pokemons = response.data.results
          this.pokemonSelected = null
          this.search = ''
        } catch (error) {
          console.log(error)
        }
      },
      // Mostrar información de un pokemon
      async infoPokemon(url) {
        try {
          // Hacer una petición a la API con Axios
          const response = await axios.get(url)
          // Guardar los datos en mi modelo de datos
          console.log(response.data)
          this.pokemonSelected = response.data
        } catch (error) {
          console.log(error)
        }
      },
      // Eliminar un pokemon
      removePokemon(pokemon) {
        if (confirm(`¿Estás seguro de eliminar a ${pokemon.name}?`) === true) {
          this.pokemons = this.pokemons.filter((p) => p.name !== pokemon.name)
          if (this.pokemonSelected.name === pokemon.name) {
            this.pokemonSelected = null
          }
        }
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
  li {
    cursor: pointer;
  }
</style>

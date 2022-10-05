// Objeto de VUE!!!
// console.log(Vue)

const app = Vue.createApp({
  // Función que maneja nuestro estado y este es reactivo
  //  o se puede poner data: () => ({
  data() {
    return {
      // Lista de pokemons
      pokemons: [],
      pokemonsFiltrados: [],
      pokemonActual: null,
      pokeNombre: '',
    };
  },

  // Mis metodos
  methods: {
    async cargarPokemons(max = 25) {
      console.log(max);
      try {
        // Consultamos la api de pokemon y nos traemos los max primeros
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${max}`);
        const data = await response.json();
        this.pokemons = data.results.sort((a, b) => a.name.localeCompare(b.name));
        this.pokemonsFiltrados = this.pokemons;
      } catch (error) {
        console.log(error);
      }
    },
    infoPokemon({ url }) {
      console.log('URL: ', url);
      // Consultamos la api de pokemon y nos traemos los max primeros
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          // Los devolvemos ordenados por nombre
          // console.table(data);
          this.pokemonActual = data;
        })
        .catch((error) => console.log(error));
    },
    eliminarPokemon(url) {
      console.log('Eliminar: ', url);
      // Algo cutre, pero pido un alert para confirmar
      if (confirm('¿Estás seguro de eliminar este pokemon?')) {
        this.pokemons = this.pokemons.filter((p) => p.url !== url);
        this.pokemonActual = null;
        this.pokeNombre = '';
        this.pokemonsFiltrados = this.pokemons;
      }
      console.log(this.pokemonActual);
    },
    buscarPokemon() {
      console.log('Buscar: ', this.pokeNombre);
      // filtramos por pokeNombre
      this.pokemonsFiltrados = this.pokemons.filter((p) => p.name.includes(this.pokeNombre));
    },
  },
});

// Donde nos vamos a renderizar en el html (el div con id myApp)
// es decir, donde se monta nuestra app
app.mount('#myApp');

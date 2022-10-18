// Objeto de VUE!!!
// console.log(Vue)

const app = Vue.createApp({
  // Función que maneja nuestro estado y este es reactivo
  //  o se puede poner data: () => ({
  data() {
    return {
      message: 'Mi variable de mensaje :)',
      personas: [
        { id: 1, nombre: 'Pepe', edad: 23, ciudad: 'Madrid' },
        { id: 2, nombre: 'Juan', edad: 34, ciudad: 'Barcelona' },
        { id: 3, nombre: 'Rosa', edad: 18, ciudad: 'Valencia' },
        { id: 4, nombre: 'Luis', edad: 27, ciudad: 'Madrid' },
        { id: 5, nombre: 'Ana', edad: 31, ciudad: 'Barcelona' },
        { id: 6, nombre: 'Elena', edad: 25, ciudad: 'Madrid' },
      ],
      newPersona: '',
    };
  },

  // Mis metodos
  methods: {
    changeMessage() {
      this.message = 'Has pulsado el botón';
    },
    addPersona() {
      this.personas.push({
        id: this.personas.length + 1,
        nombre: this.newPersona,
        edad: Math.floor(Math.random() * 10) + 20,
        ciudad: 'Madrid',
      });
      this.newPersona = '';
    },
    findPersonaCity(city) {
      return this.personas.filter((persona) => persona.ciudad === city);
    },
  },
});

// Donde nos vamos a renderizar en el html (el div con id myApp)
// es decir, donde se monta nuestra app
app.mount('#myApp');

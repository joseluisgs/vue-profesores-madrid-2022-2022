// listas de personas con ciudades
const personas = [
  { nombre: 'Pepe', edad: 23, ciudad: 'Madrid' },
  { nombre: 'Juan', edad: 34, ciudad: 'Barcelona' },
  { nombre: 'Rosa', edad: 18, ciudad: 'Valencia' },
  { nombre: 'Luis', edad: 27, ciudad: 'Madrid' },
  { nombre: 'Ana', edad: 31, ciudad: 'Barcelona' },
  { nombre: 'Elena', edad: 25, ciudad: 'Madrid' },
]

// Funcion que devuelve un array de personas de una ciudad dada
// Arrow function
const getPersonasByCiudad = (ciudad) => {
  return personas.filter((persona) => persona.ciudad === ciudad)
}

// Funcion que devuelve todas las personas
// Arrow function
const getPersonas = () => {
  return personas
}

// Me defino una promesa que devuelve un array de personas
const getPersonasCiudadAsync = (ciudad) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const personasCiudad = getPersonasByCiudad(ciudad)
      if (personasCiudad.length > 0) {
        resolve(personasCiudad)
      } else {
        reject(new Error('No hay personas en la ciudad'))
      }
    }, 2000)
  })
}

// Exportamos las funciones para poder usarlas en otros ficheros
export { getPersonasByCiudad, getPersonasCiudadAsync }
// Hacemos el default para que sea la funcion que se exporta por defecto
export default getPersonas

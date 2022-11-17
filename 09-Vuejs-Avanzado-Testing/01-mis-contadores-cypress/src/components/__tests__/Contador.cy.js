// Si queremos que cargue pinia
// import { createTestingPinia } from '@pinia/testing'
import Contador from '../Contador.vue'

// Describimos la suite de tests, todos los test deben estar dentro de una suite para poder ejecutarse
// y detectarlos
describe('Contador component tests', () => {
  // Cogemos los elementos que vamos a necesitar para los tests del DOM, que hemos etiquetado
  // Si los etiquetamos así en el DOM, podemos cogerlos con el selector de Cypress
  const textoContador = '[data-cy="contador-valor"]'
  const textoDoble = '[data-cy="contador-doble"]'
  const botonIncrementar = '[data-cy="boton-incrementar"]'
  const botonDecrementar = '[data-cy="boton-decrementar"]'
  const botonIncrementarAsync = '[data-cy="boton-incrementar-async"]'
  const botonDecrementarAsync = '[data-cy="boton-decrementar-async"]'
  const textoNumerosRojos = '[data-cy="numeros-rojos"]'
  const textoNumerosNormales = '[data-cy="numeros-normales"]'
  const textoEsDivisible = '[data-cy="es-divisible"]'

  it('debería abrir y cerrar correctamente', () => {
    // Montamos el componente, como tiene pinia como dependencia, tenemos que montar el pinia
    // y pasarle el store que queremos usar
    cy.mount(Contador)
    // textoContador es visible
    cy.get(textoContador).should('be.visible')
    // textoDoble es visible
    cy.get(textoDoble).should('be.visible')
    // botonIncrementar es visible
    cy.get(botonIncrementar).should('be.visible')
    // botonDecrementar es visible
    cy.get(botonDecrementar).should('be.visible')
    // botonIncrementarAsync es visible
    cy.get(botonIncrementarAsync).should('be.visible')
  })

  it('debería abrir renderizar con la propiedad correctamente', () => {
    const valorInicial = 10
    cy.mount(Contador, {
      props: {
        valorInicial: valorInicial,
      },
    })
    // textoContador es visible
    cy.get(textoContador).should('be.visible')
    // Su valor es 10
    cy.get(textoContador).should('have.text', 'Valor: 10')
    // textoDoble es visible
    cy.get(textoDoble).should('be.visible')
    // Su valor es 20
    cy.get(textoDoble).should('have.text', 'Doble: 20')
  })

  it('debería incrementar correctamente', () => {
    const valorInicial = 10
    cy.mount(Contador, {
      props: {
        valorInicial: valorInicial,
      },
    })
    // textoContador es visible
    cy.get(textoContador).should('be.visible')
    // Su valor es 10
    cy.get(textoContador).should('have.text', 'Valor: 10')
    // textoDoble es visible
    cy.get(textoDoble).should('be.visible')
    // Su valor es 20
    cy.get(textoDoble).should('have.text', 'Doble: 20')
    // Incrementamos el contador
    cy.get(botonIncrementar).click()
    // Su valor es 11
    cy.get(textoContador).should('have.text', 'Valor: 11')
    // Su valor es 22
    cy.get(textoDoble).should('have.text', 'Doble: 22')
  })

  it('debería decrementar correctamente', () => {
    const valorInicial = 10
    cy.mount(Contador, {
      props: {
        valorInicial: valorInicial,
      },
    })
    // textoContador es visible
    cy.get(textoContador).should('be.visible')
    // Su valor es 10
    cy.get(textoContador).should('have.text', 'Valor: 10')
    // textoDoble es visible
    cy.get(textoDoble).should('be.visible')
    // Su valor es 20
    cy.get(textoDoble).should('have.text', 'Doble: 20')
    // Decrementamos el contador
    cy.get(botonDecrementar).click()
    // Su valor es 9
    cy.get(textoContador).should('have.text', 'Valor: 9')
    // Su valor es 18
    cy.get(textoDoble).should('have.text', 'Doble: 18')
  })

  it('debería incrementar correctamente con el botón async', () => {
    const valorInicial = 10
    cy.mount(Contador, {
      props: {
        valorInicial: valorInicial,
      },
    })
    // textoContador es visible
    cy.get(textoContador).should('be.visible')
    // Su valor es 10
    cy.get(textoContador).should('have.text', 'Valor: 10')
    // textoDoble es visible
    cy.get(textoDoble).should('be.visible')
    // Su valor es 20
    cy.get(textoDoble).should('have.text', 'Doble: 20')
    // Incrementamos el contador
    cy.get(botonIncrementarAsync).click()
    // Su valor es 11
    cy.get(textoContador).should('have.text', 'Valor: 11')
    // Su valor es 22
    cy.get(textoDoble).should('have.text', 'Doble: 22')
  })

  it('debería decrementar correctamente con el botón async', () => {
    const valorInicial = 10
    cy.mount(Contador, {
      props: {
        valorInicial: valorInicial,
      },
    })
    // textoContador es visible
    cy.get(textoContador).should('be.visible')
    // Su valor es 10
    cy.get(textoContador).should('have.text', 'Valor: 10')
    // textoDoble es visible
    cy.get(textoDoble).should('be.visible')
    // Su valor es 20
    cy.get(textoDoble).should('have.text', 'Doble: 20')
    // Decrementamos el contador
    cy.get(botonDecrementarAsync).click()
    // Su valor es 9
    cy.get(textoContador).should('have.text', 'Valor: 9')
    // Su valor es 18
    cy.get(textoDoble).should('have.text', 'Doble: 18')
  })

  it('debería saber si es multiplo de 3', () => {
    const valorInicial = 10
    cy.mount(Contador, {
      props: {
        valorInicial: valorInicial,
      },
    })
    // Su valor es 10
    cy.get(textoContador).should('have.text', 'Valor: 10')
    cy.get(textoEsDivisible).should('have.text', ' Es divisible entre 3: false')
    // Decrementamos el contador
    cy.get(botonDecrementar).click()
    // Su valor es 9
    cy.get(textoContador).should('have.text', 'Valor: 9')
    cy.get(textoEsDivisible).should('have.text', ' Es divisible entre 3: true')
    // Debe tener la clase verde
    cy.get(textoEsDivisible).should('have.class', 'verde')
  })

  it('deberia detectar si estamos en numeros rojos', () => {
    const valorInicial = 0
    cy.mount(Contador, {
      props: {
        valorInicial: valorInicial,
      },
    })
    cy.get(textoContador).should('have.text', 'Valor: 0')
    // texto numero normales debe estar visible
    cy.get(textoNumerosNormales).should('be.visible')
    cy.get(textoNumerosNormales).should('have.text', ' Estás 😁 ')
    // Decrementamos el contador
    cy.get(botonDecrementar).click()
    cy.get(textoContador).should('have.text', 'Valor: -1')
    // texto numero rojos debe estar visible
    cy.get(textoNumerosRojos).should('be.visible')
    // Debe tener la clase rojo
    cy.get(textoNumerosRojos).should('have.class', 'rojo')
    // tiene el texto correcto
    cy.get(textoNumerosRojos).should(
      'have.text',
      ' Estás en número rojos  No te pases que estás en negativo '
    )
  })
})

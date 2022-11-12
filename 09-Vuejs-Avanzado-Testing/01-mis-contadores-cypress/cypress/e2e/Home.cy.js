// https://docs.cypress.io/api/introduction/api.html

describe('Home Tests', () => {
  it('debería visitar la página principal', () => {
    cy.visit('/')
    cy.contains('h1', 'Home')
  })

  // podemos probar cosas del contador aquí
  const textoContador = '[data-cy="contador-valor"]'
  const textoDoble = '[data-cy="contador-doble"]'
  const botonIncrementar = '[data-cy="boton-incrementar"]'
  const botonDecrementar = '[data-cy="boton-decrementar"]'
  const botonIncrementarAsync = '[data-cy="boton-incrementar-async"]'
  const botonDecrementarAsync = '[data-cy="boton-decrementar-async"]'
  const textoEsDivisible = '[data-cy="es-divisible"]'
  const textoNombre = '[data-cy="texto-nombre"]'
  const inputNombre = '[data-cy="input-nombre"]'

  it('debería abrir y cerrar correctamente', () => {
    cy.visit('/')
    cy.contains('h1', 'Home')
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
    cy.visit('/')
    cy.contains('h1', 'Home')
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
    cy.visit('/')
    cy.contains('h1', 'Home')
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
    cy.visit('/')
    cy.contains('h1', 'Home')
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
    cy.visit('/')
    cy.contains('h1', 'Home')
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
    cy.visit('/')
    cy.contains('h1', 'Home')
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
    cy.visit('/')
    cy.contains('h1', 'Home')
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

  it('debería renderizar el input', () => {
    cy.visit('/')
    cy.contains('h1', 'Home')
    // El input es visible
    cy.get(inputNombre).should('be.visible')
    // el texto nombre no debe estar visible
    cy.get(textoNombre).should('not.be.visible')
    // Tecleamos pepe en el input
    cy.get(inputNombre).type('pepe')
    // El texto nombre debe estar visible
    cy.get(textoNombre).should('be.visible')
    // El texto nombre debe tener el valor pepe
    cy.get(textoNombre).should('have.text', 'pepe')
  })
})

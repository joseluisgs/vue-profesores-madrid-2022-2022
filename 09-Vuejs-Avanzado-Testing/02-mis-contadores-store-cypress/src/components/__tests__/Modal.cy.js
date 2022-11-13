import Modal from '../Modal.vue'

// Describimos la suite de tests, todos los test deben estar dentro de una suite para poder ejecutarse
// y detectarlos
describe('Modal component tests', () => {
  // Cogemos los elementos que vamos a necesitar para los tests del DOM, que hemos etiquetado
  // Si los etiquetamos así en el DOM, podemos cogerlos con el selector de Cypress
  const modalBodySelector = '[data-cy="modal-body"]'
  const modalContentSelector = '[data-cy="modal-content"]'
  const openButtonSelector = '[data-cy="open-button"]'
  const closeButtonSelector = '[data-cy="close-modal"]'

  it('debería abrir y cerrar correctamente', () => {
    // Montamos el componente
    cy.mount(Modal)
    // Al principio no es visible
    cy.get(modalBodySelector).should('not.be.visible')
    // Seleccionamos el botón y debe tener el texto "Abrir modal", le hacemos click
    cy.get(openButtonSelector).should('have.text', ' Abrir modal ').click()
    // Ahora sí debe estar visible
    cy.get(modalBodySelector).should('be.visible')
    // Comprobamos que el contenido del modal es el correcto
    cy.get(modalContentSelector)
      .should('be.visible')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)')
    // Cerramos el modal
    cy.get(closeButtonSelector).click()
    cy.get(modalBodySelector).should('not.be.visible')
  })

  it('debería cambiar el color dependiendo de las propiedades ', () => {
    // Montamos le modal con estas propiedades y comprobamos que el color es el correcto
    cy.mount(Modal, { props: { color: 'red' } })
    // abrimos
    cy.get(openButtonSelector).click()
    cy.get(modalContentSelector)
      .should('be.visible')
      // Comprobamos que tiene el color correcto
      .and('have.css', 'background-color', 'rgb(255, 0, 0)')
  })
})
